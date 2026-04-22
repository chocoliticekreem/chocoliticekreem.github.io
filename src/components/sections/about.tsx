import { profile } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-4xl px-6 py-20 md:py-28">
      <p className="mb-6 font-mono text-xs uppercase tracking-widest text-emerald-500">
        01 · about
      </p>
      <h2 className="mb-8 text-3xl font-bold text-slate-900 dark:text-white md:text-5xl">
        Biomed student,<br />
        accidental engineer.
      </h2>
      <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 md:text-xl">
        {profile.bio}
      </p>
    </section>
  );
}
