"use client";
import { motion } from "framer-motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { profile } from "@/lib/content";

export function Hero() {
  return (
    <section id="top" className="relative pt-12 md:pt-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(225,29,116,0.18),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,79,163,0.28),transparent_60%)]" />
      <ContainerScroll
        titleComponent={
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-5 pb-8"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-rose-500 dark:text-rose-300">
              London · AI builder · biosciences
            </p>
            <h1 className="font-display text-[4.6rem] font-normal leading-[0.85] text-slate-900 dark:text-white md:text-[8.5rem] lg:text-[11rem]">
              {profile.name}
            </h1>
            <div className="h-px w-28 bg-gradient-to-r from-transparent via-rose-400/70 to-transparent" />
            <p className="max-w-2xl text-balance px-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-xl">
              Building AI products, automations, and weird internet software from London.
            </p>
          </motion.div>
        }
      >
        <AboutInCard />
      </ContainerScroll>
    </section>
  );
}

function AboutInCard() {
  return (
    <div id="about" className="relative flex h-full w-full overflow-hidden rounded-2xl bg-sunset">
      <Clouds />
      <BottomAtmosphere />
      <div className="relative z-10 flex w-full flex-col justify-between p-8 md:p-14">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/80">
          01 · about
        </p>
        <div className="max-w-2xl space-y-5">
          <h2 className="font-display text-3xl font-normal leading-tight text-white md:text-5xl">
            Biomed student,
            <br />
            <em className="not-italic bg-gradient-to-r from-amber-200 via-rose-200 to-white bg-clip-text text-transparent">
              accidental engineer.
            </em>
          </h2>
          <p className="text-sm leading-relaxed text-white/90 md:text-base">
            {profile.bio}
          </p>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
          {profile.headline}
        </p>
      </div>
    </div>
  );
}

function Clouds() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute left-[8%] top-[30%] h-24 w-48 rounded-full bg-white/25 blur-2xl" />
      <div className="absolute right-[6%] top-[45%] h-28 w-60 rounded-full bg-white/20 blur-2xl" />
      <div className="absolute left-[35%] top-[55%] h-20 w-40 rounded-full bg-rose-200/30 blur-2xl" />
      <div className="absolute right-[28%] top-[18%] h-14 w-28 rounded-full bg-orange-200/40 blur-xl" />
      <div className="absolute bottom-[20%] left-[20%] h-16 w-40 rounded-full bg-white/30 blur-2xl" />
    </div>
  );
}

function BottomAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] overflow-hidden">
      <div className="absolute inset-x-[-8%] bottom-[-22%] h-[78%] rounded-[50%] bg-[radial-gradient(circle_at_50%_45%,rgba(255,183,77,0.48),rgba(255,104,141,0.28)_42%,rgba(86,15,111,0.85)_74%,rgba(33,7,58,0)_100%)] blur-xl" />
      <div className="absolute left-[10%] bottom-[18%] h-24 w-24 rounded-full border-8 border-white/55 opacity-75" />
      <div className="absolute left-[14%] bottom-[9%] h-12 w-12 rounded-full border-4 border-violet-300/70 opacity-80" />
      <div className="absolute right-[12%] bottom-[15%] h-44 w-44 rounded-[44%] bg-[radial-gradient(circle_at_50%_42%,rgba(255,250,245,0.95),rgba(255,227,118,0.95)_35%,rgba(255,102,143,0.9)_62%,rgba(78,20,109,0.15)_82%,transparent_100%)] opacity-80 blur-[2px]" />
      <div className="absolute right-[20%] bottom-[11%] h-9 w-9 rounded-sm border-4 border-amber-200/90 rotate-12" />
      <div className="absolute right-[32%] bottom-[22%] h-4 w-4 rounded-full bg-blue-400/90 shadow-[0_0_16px_rgba(59,130,246,0.9)]" />
      <div className="absolute right-[28%] bottom-[18%] h-3 w-6 rounded-full bg-rose-500/90 rotate-[-28deg]" />
      <div className="absolute left-[34%] bottom-[12%] h-24 w-24 rounded-full bg-white/15 blur-2xl" />
      <div className="absolute left-[46%] bottom-[8%] h-40 w-[32%] rounded-t-[100%] bg-gradient-to-t from-fuchsia-950/55 via-fuchsia-700/25 to-transparent blur-2xl" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#2a0b45]/60 to-transparent" />
    </div>
  );
}
