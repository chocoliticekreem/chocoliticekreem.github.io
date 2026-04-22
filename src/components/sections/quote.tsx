"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export function Quote() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Sprite launch: floats → flies up and out as user scrolls
  const spriteY = useTransform(scrollYProgress, [0, 0.55, 0.9], ["0%", "-160%", "-260%"]);
  const spriteScale = useTransform(scrollYProgress, [0, 0.4, 0.9], [1, 1.05, 0.7]);
  const spriteOpacity = useTransform(scrollYProgress, [0, 0.65, 0.85], [1, 1, 0]);
  const spriteRotate = useTransform(scrollYProgress, [0, 1], [0, -8]);

  // Background fades as sprite exits
  const bgOpacity = useTransform(scrollYProgress, [0, 0.6, 0.9], [1, 0.9, 0]);

  // Quote fades in toward the end
  const quoteOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);
  const quoteY = useTransform(scrollYProgress, [0.6, 0.9], [40, 0]);

  // Scroll hint fades as user starts scrolling
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  if (reduced) {
    return <StaticQuote />;
  }

  return (
    <section
      ref={ref}
      aria-label="Favourite quote"
      className="relative h-[300vh]"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-[#1a0a2e]">
        {/* Graduation-style background */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0"
        >
          <Image
            src="/graduation-bg.png"
            alt=""
            fill
            priority
            unoptimized
            className="image-pixel object-cover object-center"
            aria-hidden
          />
        </motion.div>

        {/* Sprite flying out */}
        <motion.div
          style={{
            y: spriteY,
            scale: spriteScale,
            opacity: spriteOpacity,
            rotate: spriteRotate,
          }}
          className="relative z-10 flex items-center justify-center"
        >
          <Image
            src="/sprite-launch.png"
            alt="Anson sprite launching"
            width={260}
            height={260}
            unoptimized
            priority
            className="image-pixel drop-shadow-[0_0_40px_rgba(255,150,80,0.6)]"
            draggable={false}
          />
        </motion.div>

        {/* Quote — fades in as sprite exits */}
        <motion.div
          style={{ opacity: quoteOpacity, y: quoteY }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/70">
            ★ homecoming · kanye west
          </p>
          <h2 className="mt-6 font-display max-w-5xl text-4xl font-normal leading-tight text-white md:text-7xl">
            Shoot for the stars,
            <br />
            <em className="not-italic bg-gradient-to-r from-white via-amber-200 to-rose-200 bg-clip-text text-transparent">
              so if you fall
            </em>
            <br />
            you land on the clouds.
          </h2>
          <div className="mt-10 h-px w-24 bg-white/40" />
          <p className="mt-6 max-w-md text-sm italic text-white/85 md:text-base">
            The closest thing to a personal mission statement. It&apos;s why I keep shipping.
          </p>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/70"
        >
          scroll to launch ↓
        </motion.div>
      </div>
    </section>
  );
}

function StaticQuote() {
  return (
    <section aria-label="Favourite quote" className="relative overflow-hidden bg-sunset">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-32 text-center md:py-44">
        <Image
          src="/sprite-launch.png"
          alt="Anson sprite launching"
          width={180}
          height={180}
          unoptimized
          className="image-pixel mb-8 drop-shadow-[0_0_30px_rgba(255,150,80,0.6)]"
        />
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/70">
          ★ homecoming · kanye west
        </p>
        <h2 className="mt-6 font-display text-4xl font-normal leading-tight text-white md:text-7xl">
          Shoot for the stars,
          <br />
          <em className="not-italic bg-gradient-to-r from-white via-amber-200 to-rose-200 bg-clip-text text-transparent">
            so if you fall
          </em>
          <br />
          you land on the clouds.
        </h2>
      </div>
    </section>
  );
}
