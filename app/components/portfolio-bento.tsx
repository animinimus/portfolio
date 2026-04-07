import { BentoTile } from "./bento-tile";
import { ContactCta } from "./contact-cta";
import { ResumeCtaTile } from "./resume-cta-tile";
import { ResumeGlanceTile } from "./resume-glance-tile";

function PlaceholderVisual({ label }: { label: string }) {
  return (
    <div className="flex h-full min-h-[120px] flex-1 flex-col items-center justify-center gap-2 rounded-2xl bg-black/20 ring-1 ring-white/10">
      <span className="text-xs font-medium uppercase tracking-wider text-white/40">
        {label}
      </span>
    </div>
  );
}

function IconRow({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] font-medium uppercase tracking-wider text-white/45">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="size-9 rounded-xl bg-white/10 ring-1 ring-white/15"
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}

export function PortfolioBento() {
  return (
    <div className="mesh-bg relative flex min-h-dvh w-full flex-col">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -left-[20%] -top-[30%] h-[min(90vw,720px)] w-[min(90vw,720px)] rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.16),transparent_68%)] blur-3xl" />
        <div className="absolute -right-[10%] top-[15%] h-[min(80vw,560px)] w-[min(80vw,560px)] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.2),transparent_65%)] blur-3xl" />
        <div className="absolute bottom-[-20%] left-[30%] h-[min(70vw,480px)] w-[min(90vw,640px)] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.18),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(244,114,182,0.12),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col p-3 sm:p-4 md:p-5 lg:p-6">
        <div
          className={[
            "grid min-h-0 flex-1 grid-cols-1 gap-3 sm:gap-4",
            "auto-rows-min",
            "lg:grid-cols-12 lg:grid-rows-3 lg:gap-4 lg:auto-rows-fr",
          ].join(" ")}
        >
          {/* Row 1 */}
          <BentoTile
            variant="raised"
            accent="amber"
            className="min-h-[200px] lg:col-span-4 lg:min-h-0"
          >
            <ContactCta />
          </BentoTile>

          <BentoTile
            variant="raised"
            accent="sky"
            className="min-h-[180px] lg:col-span-3 lg:min-h-0"
          >
            <ResumeCtaTile />
          </BentoTile>

          <BentoTile
            variant="inset"
            accent="rose"
            className="min-h-[160px] lg:col-span-2 lg:min-h-0"
          >
            <PlaceholderVisual label="Featured work" />
          </BentoTile>

          <BentoTile
            variant="inset"
            accent="teal"
            className="flex min-h-[200px] flex-col justify-center gap-5 lg:col-span-3 lg:min-h-0"
          >
            <IconRow title="Stack" />
            <IconRow title="Social" />
          </BentoTile>

          {/* Row 2 */}
          <BentoTile
            variant="inset"
            accent="indigo"
            className="flex min-h-[200px] flex-col lg:col-span-3 lg:row-span-2 lg:min-h-0"
          >
            <div
              className="flex flex-1 flex-col items-center justify-center rounded-2xl bg-linear-to-b from-white/12 to-white/4 p-6 ring-1 ring-white/15"
              aria-label="Portrait"
            >
              <div
                className="size-24 rounded-full bg-white/15 ring-2 ring-violet-300/25 sm:size-28"
                aria-hidden
              />
            </div>
          </BentoTile>

          <BentoTile
            variant="raised"
            accent="violet"
            className="min-h-[220px] lg:col-span-5 lg:min-h-0"
          >
            <div className="flex h-full flex-col justify-center gap-4">
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Your Name
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                Product-minded engineer building thoughtful interfaces.
              </p>
            </div>
          </BentoTile>

          <BentoTile
            variant="inset"
            accent="coral"
            className="min-h-[160px] lg:col-span-4 lg:min-h-0"
          >
            <PlaceholderVisual label="Context / process" />
          </BentoTile>

          {/* Row 3 */}
          <BentoTile
            variant="inset"
            accent="lime"
            className="min-h-[200px] lg:col-span-3 lg:col-start-4 lg:min-h-0"
          >
            <div className="grid h-full min-h-[140px] flex-1 grid-cols-2 grid-rows-2 gap-2 sm:gap-3">
              {["Sketch", "Notes", "Motion", "Desk"].map((label) => (
                <div
                  key={label}
                  className="flex items-center justify-center rounded-2xl bg-black/25 text-[10px] font-medium uppercase tracking-wider text-white/45 ring-1 ring-white/12"
                >
                  {label}
                </div>
              ))}
            </div>
          </BentoTile>

          <BentoTile
            variant="inset"
            accent="emerald"
            className="min-h-[260px] lg:col-span-6 lg:col-start-7 lg:min-h-0"
          >
            <ResumeGlanceTile />
          </BentoTile>
        </div>
      </div>
    </div>
  );
}
