"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { experience, type Experience as ExperienceEntry } from "@/lib/content";

type Tier = 1 | 2 | 3;

const checkpoints = experience.filter((e) => e.kind !== "education");
const groundEntry = experience.find((e) => e.kind === "education");

function tierOf(e: ExperienceEntry): Tier {
  if (e.headline) return 1;
  if (e.featured) return 2;
  if (e.kind === "society") return 3;
  return 2;
}

/* Deterministic star field — fixed coords so SSR and client render identically. */
const STARS: Array<[number, number, boolean]> = [
  [4, 2, true], [11, 6, false], [19, 3, true], [27, 8, false], [34, 2, false],
  [42, 5, true], [51, 9, false], [58, 3, false], [66, 7, true], [73, 2, false],
  [81, 6, true], [89, 4, false], [95, 9, false], [7, 13, false], [16, 17, true],
  [25, 12, false], [37, 16, false], [47, 14, true], [56, 18, false], [68, 13, false],
  [78, 17, true], [88, 12, false], [3, 24, true], [14, 28, false], [29, 23, false],
  [41, 27, true], [53, 25, false], [63, 29, false], [76, 24, true], [91, 27, false],
  [9, 36, false], [22, 33, true], [44, 38, false], [59, 34, false], [71, 39, true],
  [85, 35, false], [18, 46, false], [38, 44, true], [62, 47, false], [82, 45, false],
];

/* Sprite glide — alternating x swing down the level, smoothed by springs. */
const GLIDE_STOPS = [0, 0.11, 0.22, 0.33, 0.44, 0.55, 0.66, 0.77, 0.88, 1];
const GLIDE_X_VW = [6, -7, 7, -6, 6, -5, 5, -4, 2, 0];
const GLIDE_ROTATE = [-6, 6, -6, 5, -5, 4, -4, 3, -2, 0];

/* Trail zigzag anchors (percent of width), top → ground. */
const TRAIL_XS = [50, 36, 64, 38, 62, 40, 60, 42, 58, 44, 56, 50];
const TRAIL_D = TRAIL_XS.map((x, i) =>
  i === 0 ? `M ${x} 0` : `L ${x} ${Math.round((i / (TRAIL_XS.length - 1)) * 1000)}`
).join(" ");

const GHOST_YEARS = [
  { year: "2026", top: "26%", side: "left-[4%]", night: true },
  { year: "2025", top: "58%", side: "right-[5%]", night: false },
  { year: "2024", top: "80%", side: "left-[6%]", night: false },
];

/* Fires when the element's center band crosses mid-viewport. onPass must be stable. */
function useCenterPass(onPass: (i: number) => void, index: number) {
  const ref = useRef<HTMLLIElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) onPass(index);
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [onPass, index]);
  return ref;
}

export function Experience() {
  const reduced = useReducedMotion();
  if (reduced) return <StaticExperience />;
  return <DescentLevel />;
}

function DescentLevel() {
  const sectionRef = useRef<HTMLElement>(null);
  const [maxPassed, setMaxPassed] = useState(-1);
  const [landed, setLanded] = useState(false);

  const onPass = useCallback((i: number) => {
    setMaxPassed((prev) => (i > prev ? i : prev));
  }, []);
  const onLand = useCallback(() => setLanded(true), []);

  const { scrollYProgress: fullProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: glideProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.35", "end 0.9"],
  });

  const cloudsNearY = useTransform(fullProgress, [0, 1], ["0vh", "22vh"]);
  const cloudsFarY = useTransform(fullProgress, [0, 1], ["0vh", "12vh"]);
  const glideXVw = useSpring(useTransform(glideProgress, GLIDE_STOPS, GLIDE_X_VW), {
    stiffness: 60,
    damping: 18,
  });
  const spriteX = useTransform(glideXVw, (v) => `${v}vw`);
  const spriteRotate = useSpring(useTransform(glideProgress, GLIDE_STOPS, GLIDE_ROTATE), {
    stiffness: 60,
    damping: 18,
  });

  return (
    <section ref={sectionRef} id="experience" className="relative overflow-x-clip">
      <Backdrop />
      <StarField />
      <PixelClouds nearY={cloudsNearY} farY={cloudsFarY} />
      <TrailPath />
      <GhostYears />

      <Hud passed={maxPassed + 1} total={checkpoints.length} />

      <Header />

      <ol className="relative z-10 mx-auto max-w-5xl px-6 pb-10">
        {checkpoints.map((entry, i) => (
          <Checkpoint key={entry.company + entry.role} entry={entry} index={i} onPass={onPass} />
        ))}
      </ol>

      <p
        aria-hidden
        className="relative z-10 pb-10 text-center font-mono text-[10px] uppercase tracking-[0.35em] text-[#1a0a2e]/60 dark:text-white/50"
      >
        re-entry ↓
      </p>

      <GroundLevel onLand={onLand} landed={landed} />

      <SpriteRider x={spriteX} rotate={spriteRotate} landed={landed} />
    </section>
  );
}

/* ---------- atmosphere layers ---------- */

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* Light: night dissolves into dawn — the hero's sunset replayed in reverse. */}
      <div className="absolute inset-0 block dark:hidden bg-[linear-gradient(180deg,#0a0318_0%,#1a0a2e_8%,#2a0b45_18%,#5c1466_32%,#b02a7f_48%,#e46273_62%,#ffb08a_74%,#ffd7a8_84%,#fff5ec_93%,#fff5ec_100%)]" />
      {/* Dark: the night never ends — quote black eases into the page purple. */}
      <div className="absolute inset-0 hidden dark:block bg-[linear-gradient(180deg,#0a0318_0%,#1a0a2e_10%,#1f0c35_35%,#24103c_60%,#2a1040_80%,#2a1040_100%)]" />
    </div>
  );
}

function StarField() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,black_38%,transparent_60%)] dark:[mask-image:linear-gradient(180deg,black_68%,transparent_97%)]"
    >
      {STARS.map(([x, y, tw], i) => (
        <span
          key={i}
          className={`absolute h-[3px] w-[3px] bg-white ${tw ? "animate-twinkle" : ""}`}
          style={{
            left: `${x}%`,
            top: `${y}%`,
            opacity: tw ? 0.9 : 0.55,
            animationDelay: tw ? `${(i % 7) * 0.4}s` : undefined,
          }}
        />
      ))}
      <div className="absolute right-[10%] top-[7%] h-px w-20 bg-gradient-to-l from-white/90 to-transparent animate-shoot" />
    </div>
  );
}

function PixelCloud({ className }: { className?: string }) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <div className="mx-auto h-3 w-1/2 bg-current" />
      <div className="h-4 w-full bg-current" />
      <div className="mx-auto h-3 w-3/4 bg-current" />
    </div>
  );
}

function PixelClouds({
  nearY,
  farY,
}: {
  nearY: MotionValue<string>;
  farY: MotionValue<string>;
}) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div style={{ y: farY }} className="absolute inset-0 text-white/10 dark:text-white/[0.05]">
        <PixelCloud className="absolute left-[6%] top-[14%] w-36" />
        <PixelCloud className="absolute right-[10%] top-[34%] w-44" />
        <PixelCloud className="absolute left-[16%] top-[58%] w-32" />
      </motion.div>
      <motion.div style={{ y: nearY }} className="absolute inset-0 text-white/20 dark:text-white/[0.09]">
        <PixelCloud className="absolute right-[4%] top-[10%] w-52" />
        <PixelCloud className="absolute left-[2%] top-[40%] w-56" />
        <PixelCloud className="absolute right-[14%] top-[66%] w-40" />
      </motion.div>
    </div>
  );
}

function TrailPath() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-[12%] bottom-[8%] hidden md:block [mask-image:linear-gradient(180deg,transparent_0%,black_6%,black_94%,transparent_100%)]"
    >
      <svg className="h-full w-full" viewBox="0 0 100 1000" preserveAspectRatio="none">
        <path
          d={TRAIL_D}
          fill="none"
          stroke="#ff4fa3"
          strokeOpacity={0.45}
          strokeWidth={3}
          strokeDasharray="2 7"
          strokeLinecap="square"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

function GhostYears() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
      {GHOST_YEARS.map((g) => (
        <span
          key={g.year}
          className={`font-display absolute ${g.side} select-none text-[9rem] leading-none lg:text-[13rem] text-transparent ${
            g.night
              ? "[-webkit-text-stroke:1.5px_rgba(248,236,255,0.10)]"
              : "[-webkit-text-stroke:1.5px_rgba(26,10,46,0.10)] dark:[-webkit-text-stroke:1.5px_rgba(248,236,255,0.07)]"
          }`}
          style={{ top: g.top }}
        >
          {g.year}
        </span>
      ))}
    </div>
  );
}

/* ---------- HUD + header ---------- */

function Hud({ passed, total }: { passed: number; total: number }) {
  return (
    <div className="pointer-events-none sticky top-20 z-[8] -mb-8 flex h-8 justify-end px-4 md:px-6">
      <div className="flex items-center gap-2.5 rounded-md border border-white/25 bg-[#1a0a2e]/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#ffd7a8] backdrop-blur-sm">
        <span className="hidden sm:inline">world 02 · the descent</span>
        <span aria-hidden className="hidden items-center gap-[3px] sm:flex">
          {Array.from({ length: total }, (_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 ${i < passed ? "bg-rose-400" : "bg-white/25"}`}
            />
          ))}
        </span>
        <span>
          cp {String(Math.min(passed, total)).padStart(2, "0")}/{total}
        </span>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="relative z-10 mx-auto flex min-h-[52vh] max-w-5xl flex-col justify-center px-6 pt-24">
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.35em] text-rose-300">
        02 · experience
      </p>
      <h2 className="font-display text-4xl font-normal text-white md:text-6xl">
        Where I&apos;ve landed.
      </h2>
      <p className="mt-5 max-w-md text-sm italic leading-relaxed text-white/70">
        Reach → fall → land. Every checkpoint on the way down is somewhere I said yes.
      </p>
    </div>
  );
}

/* ---------- checkpoints ---------- */

function PixelFlag({ big, live }: { big?: boolean; live?: boolean }) {
  return (
    <span aria-hidden className={`relative inline-block ${big ? "h-12 w-9" : "h-9 w-7"} shrink-0`}>
      <span className={`absolute left-0 top-0 ${big ? "h-12" : "h-9"} w-[3px] bg-[#1a0a2e]/50 dark:bg-white/40`} />
      <span
        className={`absolute left-[3px] top-0 ${big ? "h-5 w-8" : "h-4 w-6"} ${
          live ? "animate-flag bg-rose-500 dark:bg-rose-400" : "bg-rose-500/35 dark:bg-rose-400/30"
        } [clip-path:polygon(0_0,100%_0,82%_50%,100%_100%,0_100%)]`}
      />
    </span>
  );
}

function QuestChip({ current, tier }: { current: boolean; tier: Tier }) {
  if (current) {
    return (
      <span
        className={`rounded-sm bg-rose-400/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-rose-600 dark:text-rose-300 ${
          tier === 1 ? "animate-blink" : ""
        }`}
      >
        active quest
      </span>
    );
  }
  return (
    <span className="rounded-sm border border-[#1a0a2e]/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#1a0a2e]/55 dark:border-white/20 dark:text-white/50">
      quest complete
    </span>
  );
}

function Checkpoint({
  entry,
  index,
  onPass,
}: {
  entry: ExperienceEntry;
  index: number;
  onPass: (i: number) => void;
}) {
  const ref = useCenterPass(onPass, index);
  const tier = tierOf(entry);
  const right = index % 2 === 1;

  return (
    <li
      ref={ref}
      className={`relative flex ${
        tier === 1 ? "min-h-[38vh]" : tier === 2 ? "min-h-[24vh]" : "min-h-[12vh]"
      } items-center ${right ? "md:justify-end" : "md:justify-start"}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="w-full md:w-auto"
      >
        {tier === 3 ? <Signpost entry={entry} /> : <Card entry={entry} tier={tier} />}
      </motion.div>
    </li>
  );
}

function Card({ entry, tier }: { entry: ExperienceEntry; tier: Tier }) {
  return (
    <div
      className={`group relative w-full border bg-[#fff5ec]/95 text-[#1a0a2e] transition-all duration-200 hover:-translate-y-0.5 hover:border-rose-400 dark:bg-[#1a0a2e]/80 dark:text-[#f8ecff] dark:backdrop-blur-[2px] dark:hover:border-rose-400/70 ${
        tier === 1
          ? "max-w-[28rem] rounded-lg border-[#1a0a2e]/25 p-6 dark:border-white/25 dark:shadow-[0_0_28px_rgba(255,79,163,0.16)]"
          : "max-w-[24rem] rounded-md border-[#1a0a2e]/20 p-4 dark:border-white/15"
      }`}
    >
      {tier === 1 && (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-2 left-5 hidden group-hover:block"
        >
          <span className="block h-2 w-2 bg-amber-400 group-hover:[animation:coinpop_0.7s_steps(4)_forwards]" />
          <span className="absolute -top-4 left-3 font-mono text-[9px] text-amber-500 group-hover:[animation:coinpop_0.7s_steps(4)_forwards] dark:text-amber-300">
            +100
          </span>
        </span>
      )}
      <div className="flex items-start gap-3">
        <PixelFlag big={tier === 1} live={entry.current} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className={`font-semibold ${tier === 1 ? "text-lg" : "text-base"}`}>
              {entry.role}
            </h3>
            <QuestChip current={entry.current} tier={tier} />
          </div>
          <p
            className={`mt-0.5 flex flex-wrap items-baseline gap-2 ${
              tier === 1
                ? "font-display text-3xl leading-tight text-rose-600 dark:text-rose-300"
                : "text-sm text-rose-600 dark:text-rose-300"
            }`}
          >
            {entry.company}
            {entry.badge && (
              <span className="rounded-sm border border-amber-600/40 bg-amber-400/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-amber-600 dark:border-amber-400/40 dark:text-amber-400">
                {entry.badge}
              </span>
            )}
          </p>
          {entry.tagline && (
            <p className="mt-1.5 text-[13px] leading-snug opacity-75">{entry.tagline}</p>
          )}
          <p className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.15em] opacity-55">
            {entry.period} · {entry.location}
          </p>
        </div>
      </div>
    </div>
  );
}

function Signpost({ entry }: { entry: ExperienceEntry }) {
  return (
    <div className="group flex w-full max-w-[24rem] items-baseline gap-3 rounded-r-md border-l-[3px] border-[#1a0a2e]/30 bg-[#fff5ec]/75 py-1.5 pl-4 pr-4 backdrop-blur-[2px] transition-colors duration-200 hover:border-rose-400 dark:border-white/30 dark:bg-transparent dark:backdrop-blur-none dark:hover:border-rose-400">
      <div className="min-w-0 flex-1">
        <p className="font-mono text-xs text-[#1a0a2e] transition-colors group-hover:text-rose-600 dark:text-[#f8ecff] dark:group-hover:text-rose-300">
          {entry.role} · {entry.company}
        </p>
        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-[#1a0a2e]/50 dark:text-white/45">
          {entry.period}
          {entry.current && <span className="ml-2 text-rose-600 dark:text-rose-300">● now</span>}
        </p>
      </div>
    </div>
  );
}

/* ---------- ground ---------- */

function GroundLevel({ onLand, landed }: { onLand: () => void; landed: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          onLand();
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [onLand]);

  return (
    <div ref={ref} className="relative z-10">
      {groundEntry && (
        <div className="mx-auto max-w-5xl px-6 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-[28rem] rounded-lg border border-[#1a0a2e]/25 bg-[#fff5ec]/95 p-5 text-[#1a0a2e] dark:border-amber-200/30 dark:bg-[#1a0a2e]/80 dark:text-[#f8ecff]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-600 dark:text-amber-300">
              ★ spawn point · where the run began
            </p>
            <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold">{groundEntry.role}</h3>
              <span className="font-mono text-[11px] opacity-55">{groundEntry.period}</span>
            </div>
            <p className="font-display text-xl text-rose-600 dark:text-rose-300">
              {groundEntry.company}
            </p>
            {groundEntry.tagline && (
              <p className="mt-1.5 text-[13px] leading-snug opacity-75">{groundEntry.tagline}</p>
            )}
          </motion.div>

          {/* landing dust puff */}
          {landed && (
            <div aria-hidden className="relative mx-auto h-0 w-0">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="absolute h-2 w-2 bg-white/80 dark:bg-white/60"
                  style={{
                    left: `${(i - 1.5) * 14}px`,
                    top: "-66px",
                    animation: `dust 0.5s steps(4) ${i * 0.06}s forwards`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* pixel terrain */}
      <div aria-hidden className="relative">
        <div className="absolute bottom-full right-[12%] hidden md:block">
          <div className="relative h-24 w-14 bg-[#b02a7f] dark:bg-[#1f0c35]">
            <span className="absolute left-2.5 top-4 hidden h-1.5 w-1.5 bg-amber-300 dark:block" />
            <span className="absolute right-2.5 top-9 hidden h-1.5 w-1.5 bg-amber-300 dark:block" />
            <span className="absolute -top-7 left-1/2 h-7 w-[3px] -translate-x-1/2 bg-[#1a0a2e]/60 dark:bg-white/40" />
            <span className="animate-flag absolute -top-7 left-1/2 h-3.5 w-5 bg-amber-400 [clip-path:polygon(0_0,100%_0,82%_50%,100%_100%,0_100%)]" />
          </div>
        </div>
        <div className="h-2.5 bg-[#ffd7a8] dark:bg-[#3a1a55]" />
        <div className="h-8 bg-[#ffb08a] dark:bg-[#1f0c35]" />
        <div className="relative h-6 bg-[#e46273] dark:bg-[#0a0318]">
          <a
            href="#projects"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.3em] text-white/90 transition-colors hover:text-amber-200"
          >
            next: world 03 · projects ↓
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------- the sprite ---------- */

function SpriteRider({
  x,
  rotate,
  landed,
}: {
  x: MotionValue<string>;
  rotate: MotionValue<number>;
  landed: boolean;
}) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-40 top-[30vh] z-[5]">
      <div className="sticky top-[38vh] flex justify-center">
        <motion.div style={{ x, rotate }} className="will-change-transform">
          <motion.div
            animate={landed ? { y: [0, -12, 0] } : { y: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 14 }}
          >
            <Image
              src="/image.png"
              alt=""
              width={600}
              height={600}
              unoptimized
              sizes="(max-width: 768px) 112px, 176px"
              className={`image-pixel h-auto w-28 md:w-44 ${
                landed
                  ? "drop-shadow-[0_0_18px_rgba(255,153,72,0.4)]"
                  : "drop-shadow-[0_0_34px_rgba(255,153,72,0.65)]"
              }`}
              draggable={false}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- reduced-motion fallback ---------- */

function StaticExperience() {
  return (
    <section id="experience" className="relative overflow-x-clip">
      {/* Static quote branch above ends on the sunset's warm #ffd7a8 — open from it, not from night. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#ffd7a8_0%,var(--background)_12%)]"
      />
      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-28">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.35em] text-rose-600 dark:text-rose-300">
          02 · experience
        </p>
        <h2 className="font-display text-4xl font-normal text-[#1a0a2e] dark:text-white md:text-6xl">
          Where I&apos;ve landed.
        </h2>
        <ol className="mt-12 space-y-4 pb-12">
          {checkpoints.map((entry) => {
            const tier = tierOf(entry);
            return (
              <li key={entry.company + entry.role}>
                {tier === 3 ? <Signpost entry={entry} /> : <Card entry={entry} tier={tier} />}
              </li>
            );
          })}
          {groundEntry && (
            <li>
              <Card entry={groundEntry} tier={2} />
            </li>
          )}
        </ol>
      </div>
      <div aria-hidden className="relative">
        <div className="h-2.5 bg-[#ffd7a8] dark:bg-[#3a1a55]" />
        <div className="h-8 bg-[#ffb08a] dark:bg-[#1f0c35]" />
        <div className="h-6 bg-[#e46273] dark:bg-[#0a0318]" />
      </div>
    </section>
  );
}
