"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { profile } from "@/lib/content";

export function Hero() {
  return (
    <section id="top" className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(225,29,116,0.18),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,79,163,0.28),transparent_60%)]" />
      <ContainerScroll
        titleComponent={
          <div className="space-y-6 pb-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center"
            >
              <Image
                src="/sprite.png"
                alt="Anson pixel avatar"
                width={180}
                height={180}
                priority
                unoptimized
                className="image-pixel animate-float mx-auto drop-shadow-[0_0_24px_rgba(255,79,163,0.55)]"
                draggable={false}
              />
            </motion.div>
            <h1 className="font-display text-5xl font-semibold text-slate-900 dark:text-white md:text-6xl">
              {profile.name}
              <br />
              <span className="mt-1 inline-block bg-gradient-to-r from-fuchsia-500 via-rose-400 to-orange-300 bg-clip-text text-5xl font-bold leading-none text-transparent md:text-[6rem]">
                builds things.
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-sm text-slate-700 dark:text-slate-300 md:text-base">
              {profile.headline}
            </p>
          </div>
        }
      >
        <HeroSky />
      </ContainerScroll>
    </section>
  );
}

function HeroSky() {
  return (
    <div className="relative flex h-full w-full items-end justify-center overflow-hidden rounded-2xl bg-sunset">
      <Clouds />
      <div className="absolute inset-x-0 top-10 flex justify-center">
        <Image
          src="/sprite.png"
          alt=""
          width={140}
          height={140}
          unoptimized
          aria-hidden
          className="image-pixel animate-float drop-shadow-[0_0_30px_rgba(255,150,120,0.6)]"
          draggable={false}
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
      <div className="relative z-10 mb-8 px-6 text-center">
        <p className="font-display text-xl italic text-white/95 md:text-3xl">
          &ldquo;Shoot for the stars, so if you fall you land on the clouds.&rdquo;
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/75">
          — homecoming · kanye west
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
