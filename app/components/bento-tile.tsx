"use client";

import type { ReactNode } from "react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

export type BentoTileVariant = "inset" | "raised" | "neutral";

/** Subtle glass tint — stronger hues on raised tiles read as “primary” without going flat/corporate. */
export type BentoAccent =
  | "none"
  | "amber"
  | "sky"
  | "violet"
  | "emerald"
  | "rose"
  | "teal"
  | "indigo"
  | "coral"
  | "lime";

type BentoTileProps = {
  variant?: BentoTileVariant;
  accent?: BentoAccent;
  /**
   * Specular rim (masked to the border only): light appears to sweep the edge
   * as the pointer moves, similar to iOS liquid-glass edge lighting — not a
   * flat fill over the cell.
   */
  spotlight?: boolean;
  className?: string;
  children: ReactNode;
  as?: "div" | "article" | "section";
};

const variantClass: Record<BentoTileVariant, string> = {
  inset: [
    "border-white/[0.1]",
    "bg-white/[0.04]",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_0_0_1px_rgba(0,0,0,0.35)]",
    "backdrop-blur-md",
  ].join(" "),
  raised: [
    "border-white/[0.12]",
    "bg-white/[0.07]",
    "shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_24px_56px_-28px_rgba(0,0,0,0.65),0_14px_32px_-18px_rgba(0,0,0,0.4)]",
    "backdrop-blur-xl",
  ].join(" "),
  neutral: [
    "border-white/[0.1]",
    "bg-white/[0.05]",
    "shadow-[0_10px_36px_-14px_rgba(0,0,0,0.5)]",
    "backdrop-blur-lg",
  ].join(" "),
};

const accentBorder: Record<Exclude<BentoAccent, "none">, string> = {
  amber: "border-amber-300/25 shadow-amber-500/10",
  sky: "border-sky-300/25 shadow-sky-500/10",
  violet: "border-violet-300/25 shadow-violet-500/10",
  emerald: "border-emerald-300/22 shadow-emerald-500/10",
  rose: "border-rose-300/25 shadow-rose-500/10",
  teal: "border-teal-300/22 shadow-teal-500/10",
  indigo: "border-indigo-300/22 shadow-indigo-500/10",
  coral: "border-orange-300/25 shadow-orange-400/10",
  lime: "border-lime-300/20 shadow-lime-400/10",
};

/** Gradient washes sit under content; keep opacity modest so type stays crisp. */
const accentWash: Record<Exclude<BentoAccent, "none">, string> = {
  amber:
    "bg-[radial-gradient(120%_90%_at_0%_0%,rgba(251,191,36,0.34),transparent_52%),radial-gradient(80%_60%_at_100%_100%,rgba(245,158,11,0.1),transparent)]",
  sky:
    "bg-[radial-gradient(110%_85%_at_100%_0%,rgba(56,189,248,0.3),transparent_50%),radial-gradient(70%_50%_at_0%_100%,rgba(14,165,233,0.12),transparent)]",
  violet:
    "bg-[radial-gradient(115%_90%_at_15%_-10%,rgba(167,139,250,0.32),transparent_55%),radial-gradient(60%_50%_at_95%_100%,rgba(139,92,246,0.14),transparent)]",
  emerald:
    "bg-[radial-gradient(100%_80%_at_0%_100%,rgba(52,211,153,0.22),transparent_50%),radial-gradient(90%_70%_at_100%_0%,rgba(16,185,129,0.12),transparent)]",
  rose:
    "bg-[radial-gradient(100%_85%_at_100%_0%,rgba(251,113,133,0.26),transparent_52%),radial-gradient(70%_60%_at_0%_100%,rgba(244,63,94,0.1),transparent)]",
  teal:
    "bg-[radial-gradient(95%_75%_at_0%_0%,rgba(45,212,191,0.22),transparent_50%),radial-gradient(80%_60%_at_100%_100%,rgba(20,184,166,0.1),transparent)]",
  indigo:
    "bg-[radial-gradient(100%_85%_at_50%_0%,rgba(129,140,248,0.22),transparent_55%),radial-gradient(70%_55%_at_0%_100%,rgba(99,102,241,0.1),transparent)]",
  coral:
    "bg-[radial-gradient(105%_80%_at_100%_20%,rgba(251,146,60,0.24),transparent_52%),radial-gradient(65%_55%_at_0%_80%,rgba(249,115,22,0.1),transparent)]",
  lime:
    "bg-[radial-gradient(90%_75%_at_0%_0%,rgba(190,242,100,0.2),transparent_48%),radial-gradient(75%_60%_at_100%_100%,rgba(163,230,53,0.12),transparent)]",
};

/** CSS `conic-gradient` 0deg = 12 o’clock; map vector center → pointer to that space. */
function rimAngleFromPointer(el: HTMLElement, clientX: number, clientY: number) {
  const r = el.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  const dx = clientX - cx;
  const dy = clientY - cy;
  return (Math.atan2(dx, -dy) * 180) / Math.PI;
}

export function BentoTile({
  variant = "neutral",
  accent = "none",
  spotlight = true,
  className = "",
  children,
  as: Tag = "div",
}: BentoTileProps) {
  const borderTint = accent !== "none" ? accentBorder[accent] : "";

  const reducedMotion = useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const motionOk = !reducedMotion;

  const [hover, setHover] = useState(false);
  const [rimDeg, setRimDeg] = useState(0);
  const pendingDeg = useRef(0);
  const raf = useRef<number | null>(null);

  const flush = useCallback(() => {
    raf.current = null;
    setRimDeg(pendingDeg.current);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!spotlight || !motionOk) return;
      pendingDeg.current = rimAngleFromPointer(e.currentTarget, e.clientX, e.clientY);
      if (raf.current == null) {
        raf.current = window.requestAnimationFrame(flush);
      }
    },
    [spotlight, motionOk, flush],
  );

  const onPointerEnter = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!spotlight || !motionOk) return;
      pendingDeg.current = rimAngleFromPointer(e.currentTarget, e.clientX, e.clientY);
      setRimDeg(pendingDeg.current);
      setHover(true);
    },
    [spotlight, motionOk],
  );

  const onPointerLeave = useCallback(() => {
    setHover(false);
  }, []);

  useEffect(() => {
    return () => {
      if (raf.current != null) window.cancelAnimationFrame(raf.current);
    };
  }, []);

  const rimLayer = spotlight && motionOk;

  return (
    <Tag
      className={[
        "relative isolate overflow-hidden rounded-3xl p-5 sm:p-6",
        variantClass[variant],
        borderTint,
        className,
      ].join(" ")}
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      {accent !== "none" ? (
        <div
          className={[
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-[0.95]",
            accentWash[accent],
          ].join(" ")}
          aria-hidden
        />
      ) : null}
      {rimLayer ? (
        <div
          aria-hidden
          className={[
            "pointer-events-none absolute inset-0 z-7 rounded-[inherit] p-px sm:p-[1.25px]",
            "transition-opacity duration-300 ease-out",
            hover ? "opacity-100" : "opacity-0",
          ].join(" ")}
          style={{
            background: `conic-gradient(from ${rimDeg}deg at 50% 50%, rgba(255,255,255,0.42) 0deg, rgba(255,255,255,0.12) 20deg, rgba(255,255,255,0.02) 38deg, transparent 56deg, transparent 304deg, rgba(255,255,255,0.03) 322deg, rgba(255,255,255,0.28) 352deg, rgba(255,255,255,0.42) 360deg)`,
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
          }}
        />
      ) : null}
      <div className="relative z-10 flex h-full min-h-0 flex-col">{children}</div>
    </Tag>
  );
}
