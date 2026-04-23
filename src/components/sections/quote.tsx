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

  // Sprite launch: starts low in the scene, then arcs up-left and slightly toward the viewer.
  const spriteX = useTransform(scrollYProgress, [0, 0.2, 0.58, 0.9], ["16vw", "14vw", "0vw", "-12vw"]);
  const spriteY = useTransform(scrollYProgress, [0, 0.18, 0.58, 0.9], ["28vh", "22vh", "-10vh", "-52vh"]);
  const spriteScale = useTransform(scrollYProgress, [0, 0.2, 0.58, 0.9], [0.72, 0.82, 1.16, 1.52]);
  const spriteOpacity = useTransform(scrollYProgress, [0, 0.64, 0.82, 0.92], [0.92, 1, 0.5, 0]);
  const spriteRotate = useTransform(scrollYProgress, [0, 0.58, 0.9], [10, 3, -12]);

  // Background stays present for the launch, then clears out for the quote reveal.
  const bgOpacity = useTransform(scrollYProgress, [0, 0.62, 0.9], [1, 1, 0.12]);
  const bgScale = useTransform(scrollYProgress, [0, 0.9], [1.06, 1]);
  const quoteBackdropOpacity = useTransform(scrollYProgress, [0.52, 0.86], [0, 1]);

  // Quote fades in toward the end
  const quoteOpacity = useTransform(scrollYProgress, [0.68, 0.92], [0, 1]);
  const quoteY = useTransform(scrollYProgress, [0.68, 0.92], [56, 0]);

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
          style={{ opacity: bgOpacity, scale: bgScale }}
          className="absolute inset-0"
        >
          <Image
            src="/graduation-bg.png"
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            className="image-pixel object-cover object-[56%_82%] md:object-[52%_74%]"
            aria-hidden
          />
        </motion.div>

        <motion.div
          style={{ opacity: quoteBackdropOpacity }}
          className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_rgba(255,240,221,0.2)_0%,_rgba(77,14,85,0.82)_38%,_rgba(18,5,35,0.96)_100%)]"
        />

        {/* Sprite flying out */}
        <motion.div
          style={{
            x: spriteX,
            y: spriteY,
            scale: spriteScale,
            opacity: spriteOpacity,
            rotate: spriteRotate,
          }}
          className="relative z-20 flex items-center justify-center will-change-transform"
        >
          <Image
            src="/image.png"
            alt="Anson sprite launching"
            width={600}
            height={600}
            unoptimized
            priority
            sizes="(max-width: 768px) 42vw, 28vw"
            className="image-pixel h-auto w-[180px] drop-shadow-[0_0_40px_rgba(255,150,80,0.45)] md:w-[240px]"
            draggable={false}
          />
        </motion.div>

        {/* Quote — fades in as sprite exits */}
        <motion.div
          style={{ opacity: quoteOpacity, y: quoteY }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/70">
            ★ homecoming · kanye west
          </p>
          <h2 className="mt-6 font-display max-w-5xl text-4xl font-normal leading-tight text-white md:text-7xl">
            Reach for the stars,
            <br />
            <em className="not-italic bg-gradient-to-r from-white via-amber-200 to-rose-200 bg-clip-text text-transparent">
              so if you fall
            </em>
            <br />
            you land on a cloud.
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
          src="/image.png"
          alt="Anson sprite launching"
          width={600}
          height={600}
          unoptimized
          sizes="180px"
          className="image-pixel mb-8 h-auto w-[180px] drop-shadow-[0_0_30px_rgba(255,150,80,0.45)]"
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
