"use client";

import { useCallback, useState } from "react";
import { CONTACT_EMAIL, LINKEDIN_HREF } from "../content/site";

export function ContactCta() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, []);

  return (
    <div className="flex h-full flex-col justify-between gap-6">
      <p className="max-w-md text-lg font-medium leading-snug tracking-tight text-white/95 sm:text-xl">
        Got an idea? Don&apos;t let it rest. Let&apos;s start working on it.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-2 rounded-full bg-amber-400/18 px-4 py-2.5 text-sm font-medium text-white ring-1 ring-amber-200/30 transition hover:bg-amber-400/26 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200/50"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-90"
            aria-hidden
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <path d="m22 6-10 7L2 6" />
          </svg>
          {copied ? "Copied" : "Copy email"}
        </button>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-sm font-medium text-white/70 underline-offset-4 transition hover:text-white hover:underline"
        >
          Open mail
        </a>
        <a
          href={LINKEDIN_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-white/70 underline-offset-4 transition hover:text-white hover:underline"
        >
          LinkedIn
          <span className="sr-only"> (opens in new tab)</span>
        </a>
      </div>
    </div>
  );
}
