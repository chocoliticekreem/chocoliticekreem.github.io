import { experience } from "@/lib/content";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-20 md:py-28">
      <p className="mb-6 font-mono text-xs uppercase tracking-widest text-emerald-500">
        02 · experience
      </p>
      <h2 className="mb-12 text-3xl font-bold text-slate-900 dark:text-white md:text-5xl">
        What I&apos;m doing.
      </h2>
      <ol className="relative space-y-8 border-l border-slate-200 pl-6 dark:border-white/10">
        {experience.map((item) => (
          <li key={item.company + item.role} className="relative">
            <span className="absolute -left-[29px] top-2 h-3 w-3 rounded-full border-2 border-emerald-400 bg-white dark:bg-slate-950" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {item.role}{" "}
                <span className="text-slate-500 dark:text-slate-400">· {item.company}</span>
              </h3>
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                {item.period}
              </span>
            </div>
            <p className="mt-1 font-mono text-xs text-slate-500 dark:text-slate-500">
              {item.location}
              {item.current && (
                <span className="ml-2 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  current
                </span>
              )}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
