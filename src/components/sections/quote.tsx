"use client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function Quote() {
  const QUOTE_REVEAL_END = 0.62;
  const QUOTE_HOLD_START = 0.78;
  const QUOTE_RESET_POINT = 0.5;
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const prevProgressRef = useRef(0);
  const pauseTopRef = useRef<number | null>(null);
  const [hasContinued, setHasContinued] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Sprite launch: starts large on the record player, then flies up-left into open sky.
  const spriteX = useTransform(scrollYProgress, [0, 0.14, 0.42, 0.72], ["28vw", "24vw", "8vw", "-18vw"]);
  const spriteY = useTransform(scrollYProgress, [0, 0.14, 0.42, 0.72], ["33vh", "27vh", "2vh", "-36vh"]);
  const spriteScale = useTransform(scrollYProgress, [0, 0.14, 0.42, 0.72], [1.05, 1.14, 1.42, 1.7]);
  const spriteOpacity = useTransform(scrollYProgress, [0, 0.45, 0.64, 0.76], [1, 1, 0.35, 0]);
  const spriteRotate = useTransform(scrollYProgress, [0, 0.42, 0.72], [-18, -10, -26]);
  const spriteFlip = useTransform(scrollYProgress, [0, 1], [-1, -1]);

  // Background stays present for the launch, then clears out for the quote reveal.
  const bgOpacity = useTransform(scrollYProgress, [0, 0.44, 0.68], [1, 0.58, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 0.68], [1.07, 0.98]);
  const quoteBackdropOpacity = useTransform(scrollYProgress, [0.34, QUOTE_REVEAL_END], [0, 0.94]);

  // Quote fades in well before the section ends so it has time to fully land.
  const quoteOpacity = useTransform(scrollYProgress, [0.4, QUOTE_REVEAL_END], [0, 1]);
  const quoteY = useTransform(scrollYProgress, [0.4, QUOTE_REVEAL_END], [80, 0]);
  const quoteScale = useTransform(scrollYProgress, [0.4, QUOTE_REVEAL_END], [0.96, 1]);

  // Scroll hint fades as user starts scrolling
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const getQuoteHoldTop = () => {
    const section = ref.current;
    if (!section) {
      return null;
    }

    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = section.offsetHeight - viewportHeight;
    return sectionTop + scrollableDistance * QUOTE_HOLD_START;
  };

  const snapToQuoteHold = () => {
    const targetScrollTop = getQuoteHoldTop();
    if (targetScrollTop == null) {
      return;
    }

    pauseTopRef.current = targetScrollTop;
    window.scrollTo({ top: targetScrollTop, behavior: "auto" });
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (reduced) {
      return;
    }

    const prev = prevProgressRef.current;
    prevProgressRef.current = latest;

    if (latest < QUOTE_RESET_POINT) {
      setHasContinued(false);
      setIsPaused(false);
      pauseTopRef.current = null;
      return;
    }

    if (!hasContinued && prev < QUOTE_HOLD_START && latest >= QUOTE_HOLD_START) {
      setIsPaused(true);
      snapToQuoteHold();
    }
  });

  useEffect(() => {
    if (reduced || !isPaused || hasContinued) {
      return;
    }

    const holdTop = pauseTopRef.current;
    if (holdTop == null) {
      return;
    }

    const preventScroll = (e: Event) => {
      e.preventDefault();
    };
    const preventKeys = (e: KeyboardEvent) => {
      const blocked = [" ", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"];
      if (blocked.includes(e.key)) {
        e.preventDefault();
      }
    };
    const onScroll = () => {
      if (Math.abs(window.scrollY - holdTop) > 0.5) {
        window.scrollTo({ top: holdTop, behavior: "auto" });
      }
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventKeys);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeys);
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasContinued, isPaused, reduced]);

  const continueDown = () => {
    setHasContinued(true);
    setIsPaused(false);
    document.getElementById("experience")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (reduced) {
    return <StaticQuote />;
  }

  return (
    <section
      ref={ref}
      aria-label="Favourite quote"
      className="relative h-[360vh]"
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
          className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_rgba(255,240,221,0.08)_0%,_rgba(53,9,68,0.72)_36%,_rgba(10,3,24,0.94)_100%)]"
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
          <motion.div style={{ scaleX: spriteFlip }} className="origin-center">
            <Image
              src="/image.png"
              alt="Anson sprite launching"
              width={600}
              height={600}
              unoptimized
              priority
              sizes="(max-width: 768px) 52vw, 34vw"
              className="image-pixel h-auto w-[260px] drop-shadow-[0_0_58px_rgba(255,153,72,0.72)] md:w-[360px]"
              draggable={false}
            />
          </motion.div>
        </motion.div>

        {/* Quote — fades in as sprite exits */}
        <motion.div
          style={{ opacity: quoteOpacity, y: quoteY, scale: quoteScale }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/80">
            ★ homecoming · kanye west
          </p>
          <h2 className="mt-6 max-w-5xl font-display text-4xl font-normal leading-tight text-white [text-shadow:0_6px_34px_rgba(0,0,0,0.55)] md:text-7xl">
            Reach for the stars,
            <br />
            <em className="not-italic bg-gradient-to-r from-white via-amber-200 to-rose-200 bg-clip-text text-transparent">
              so if you fall
            </em>
            <br />
            you land on a cloud.
          </h2>
          <div className="mt-10 h-px w-24 bg-white/50" />
          <p className="mt-6 max-w-md text-sm italic text-white/90 [text-shadow:0_4px_22px_rgba(0,0,0,0.5)] md:text-base">
            The closest thing to a personal mission statement. It&apos;s why I keep shipping.
          </p>
        </motion.div>

        {!isPaused && (
          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/70"
          >
            scroll to launch ↓
          </motion.div>
        )}

        {isPaused && !hasContinued && (
          <motion.button
            type="button"
            onClick={continueDown}
            initial={false}
            animate={{ opacity: 1, y: [0, 4, 0] }}
            transition={{ duration: 1.2, ease: "easeOut", repeat: Infinity }}
            className="absolute bottom-8 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-white/12 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/90 backdrop-blur-sm transition-colors hover:bg-white/18"
          >
            continue
            <ChevronDown className="h-4 w-4" />
          </motion.button>
        )}
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
          sizes="220px"
          className="image-pixel mb-8 h-auto w-[220px] drop-shadow-[0_0_36px_rgba(255,150,80,0.55)]"
        />
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/70">
          ★ homecoming · kanye west
        </p>
        <h2 className="mt-6 font-display text-4xl font-normal leading-tight text-white md:text-7xl">
          Reach for the stars,
          <br />
          <em className="not-italic bg-gradient-to-r from-white via-amber-200 to-rose-200 bg-clip-text text-transparent">
            so if you fall
          </em>
          <br />
          you land on a cloud.
        </h2>
      </div>
    </section>
  );
}
