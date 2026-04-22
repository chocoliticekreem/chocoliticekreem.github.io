import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/content";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="mb-6 font-mono text-xs uppercase tracking-widest text-rose-500 dark:text-rose-400">
        03 · projects
      </p>
      <h2 className="font-display mb-12 text-4xl font-semibold text-slate-900 dark:text-white md:text-6xl">
        Things I&apos;ve built.
      </h2>
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-colors duration-200 hover:border-rose-400 hover:bg-rose-50/50 dark:border-white/10 dark:bg-white/5 dark:hover:border-rose-400/60 dark:hover:bg-rose-400/5 cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {p.name}
                </h3>
                {p.context && (
                  <p className="mt-1 font-mono text-xs text-rose-600 dark:text-rose-300">
                    {p.context}
                  </p>
                )}
              </div>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rose-500 dark:text-rose-400 dark:text-slate-500" />
            </div>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {p.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-slate-200 px-2.5 py-0.5 font-mono text-[11px] text-slate-600 dark:border-white/10 dark:text-slate-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
