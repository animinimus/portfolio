import { resumeGlance } from "../content/site";

export function ResumeGlanceTile() {
  const items = [
    { label: "Experience", value: resumeGlance.experience },
    { label: "Location", value: resumeGlance.location },
    { label: "Education", value: resumeGlance.education },
    { label: "Work authorization", value: resumeGlance.workAuthorization },
  ] as const;

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold tracking-tight text-white">
          At a glance
        </h2>
        <p className="text-xs font-medium text-emerald-300/90">
          {resumeGlance.availability}
        </p>
      </div>
      <p className="text-base font-medium text-white/90">{resumeGlance.role}</p>
      <dl className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3">
        {items.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-[11px] font-medium uppercase tracking-wider text-white/40">
              {label}
            </dt>
            <dd className="mt-0.5 text-sm leading-snug text-white/80">
              {value}
            </dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap gap-2 pt-1">
        {resumeGlance.highlights.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-black/25 px-3 py-1 text-xs font-medium text-white/75 ring-1 ring-white/10"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
