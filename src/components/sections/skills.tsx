import { skills } from "@/lib/content";

const mainStack = [
  "TypeScript",
  "Python",
  "Next.js",
  "React",
  "Node.js",
  "FastAPI",
  "Postgres",
  "Tailwind",
  "n8n",
  "Firebase",
  "Supabase",
  "Vercel",
  "LangChain",
  "OpenAI",
  "Claude",
  "Pinecone",
  "RAG",
  "Multi-agent",
];

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto mb-12 max-w-4xl px-6">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-rose-500 dark:text-rose-400">
          04 · stack
        </p>
        <h2 className="font-display mb-8 text-4xl font-normal text-slate-900 dark:text-white md:text-6xl">
          What I work with.
        </h2>
      </div>

      <Marquee items={mainStack} />
      <Marquee items={[...mainStack].reverse()} reverse />

      <div className="mx-auto mt-16 grid max-w-4xl gap-10 px-6 md:grid-cols-2">
        <SkillGroup title="Focus" items={skills.focus} />
        <SkillGroup title="Certifications" items={skills.certs} />
      </div>
    </section>
  );
}

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className="group relative overflow-hidden py-3" aria-hidden>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div
        className={`flex w-max gap-3 ${reverse ? "animate-marquee-reverse" : "animate-marquee"} group-hover:[animation-play-state:paused]`}
      >
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="shrink-0 rounded-full border border-slate-200 bg-white/60 px-5 py-2 font-mono text-sm text-slate-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
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
