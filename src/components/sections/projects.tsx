"use client";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/lib/content";

export function Projects() {
  const reduced = useReducedMotion();
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.35em] text-rose-500 dark:text-rose-400">
        03 · projects
      </p>
      <h2 className="font-display mb-4 text-4xl font-normal text-slate-900 dark:text-white md:text-6xl">
        Things I&apos;ve built.
      </h2>
      <p className="mb-12 max-w-md text-sm italic leading-relaxed text-slate-600 dark:text-slate-300">
        World 03 — the street where the builds live. Step inside any of them.
      </p>
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={reduced ? false : { opacity: 0, y: 26 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.08 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-colors duration-200 hover:border-rose-400 hover:bg-rose-50/50 dark:border-white/10 dark:bg-white/5 dark:hover:border-rose-400/60 dark:hover:bg-rose-400/5 cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {p.name}
                </h3>
                {(p.award || p.context) && (
                  <p className="mt-1 font-mono text-xs text-rose-600 dark:text-rose-300">
                    {p.award && (
                      <span className="font-semibold text-amber-600 dark:text-amber-400">
                        {p.award}
                      </span>
                    )}
                    {p.award && p.context && " · "}
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
          </motion.a>
        ))}
      </div>
    </section>
  );
}
