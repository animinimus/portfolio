import { RESUME_HREF } from "../content/site";

export function ResumeCtaTile() {
  return (
    <div className="flex h-full flex-col justify-between gap-5">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-white">
          Résumé
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-white/60">
          Full history — experience, impact, and education.
        </p>
      </div>
      <a
        href={RESUME_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-400/20 py-3.5 text-sm font-semibold text-white ring-1 ring-sky-300/35 transition hover:bg-sky-400/28 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/60 sm:w-auto sm:px-6"
      >
        Open PDF
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
          <path d="M7 17 17 7" />
          <path d="M7 7h10v10" />
        </svg>
        <span className="sr-only">(opens in new tab)</span>
      </a>
    </div>
  );
}
