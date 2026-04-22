"use client";
import Image from "next/image";
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
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-6 pb-4"
          >
            <Image
              src="/sprite.png"
              alt="Anson pixel avatar"
              width={160}
              height={160}
              priority
              unoptimized
              className="image-pixel animate-float drop-shadow-[0_0_24px_rgba(255,79,163,0.55)]"
              draggable={false}
            />
            <h1 className="font-display text-5xl font-normal leading-none text-slate-900 dark:text-white md:text-7xl">
              {profile.name}
            </h1>
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
