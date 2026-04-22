import { skills } from "@/lib/content";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-4xl px-6 py-20 md:py-28">
      <p className="mb-6 font-mono text-xs uppercase tracking-widest text-emerald-500">
        04 · stack
      </p>
      <h2 className="mb-12 text-3xl font-bold text-slate-900 dark:text-white md:text-5xl">
        What I work with.
      </h2>

      <div className="grid gap-10 md:grid-cols-3">
        <SkillGroup title="Focus" items={skills.focus} />
        <SkillGroup title="Tools" items={skills.tools} />
        <SkillGroup title="Certs" items={skills.certs} />
      </div>
    </section>
  );
}

function SkillGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
        {title}
      </h3>
      <ul className="space-y-2 text-sm text-slate-800 dark:text-slate-200">
        {items.map((item) => (
          <li key={item} className="leading-snug">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
