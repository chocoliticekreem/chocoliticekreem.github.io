"use client";
import Image from "next/image";

/* Decorative world layer for everything after the descent lands —
   the town you walk through: drifting pixel clouds, ambient glows,
   stars after dark, and the city skyline at the end of the street. */

const CLOUDS = [
  { left: "6%", top: "6%", w: "w-40", delay: "0s", faint: false },
  { left: "72%", top: "12%", w: "w-56", delay: "-18s", faint: true },
  { left: "30%", top: "34%", w: "w-44", delay: "-37s", faint: true },
  { left: "80%", top: "52%", w: "w-36", delay: "-9s", faint: false },
  { left: "10%", top: "66%", w: "w-52", delay: "-26s", faint: true },
];

const STARS: Array<[number, number, boolean]> = [
  [6, 4, true], [18, 9, false], [31, 3, false], [44, 7, true], [57, 2, false],
  [69, 8, false], [82, 5, true], [93, 10, false], [12, 24, false], [38, 28, true],
  [63, 22, false], [88, 27, false], [22, 47, true], [52, 44, false], [76, 49, false],
  [94, 62, true], [8, 78, false], [41, 82, true], [67, 76, false], [86, 85, false],
];

/* width is a flex-grow weight; windows are [left%, top%] pairs lit after dark */
const BUILDINGS: Array<{ grow: number; h: number; windows: Array<[number, number]>; antenna?: boolean }> = [
  { grow: 3, h: 52, windows: [[30, 30], [65, 55]] },
  { grow: 2, h: 96, windows: [[28, 18], [66, 38], [30, 62]], antenna: true },
  { grow: 4, h: 40, windows: [[20, 40], [50, 40], [78, 40]] },
  { grow: 2, h: 120, windows: [[32, 14], [64, 30], [32, 50], [64, 70]] },
  { grow: 3, h: 68, windows: [[25, 30], [60, 55]] },
  { grow: 2, h: 88, windows: [[30, 22], [62, 45], [30, 68]] },
  { grow: 5, h: 34, windows: [[18, 42], [48, 42], [76, 42]] },
  { grow: 2, h: 108, windows: [[30, 16], [64, 34], [30, 56], [64, 78]], antenna: true },
  { grow: 3, h: 58, windows: [[28, 32], [62, 58]] },
  { grow: 2, h: 84, windows: [[34, 24], [66, 48]] },
  { grow: 4, h: 46, windows: [[22, 38], [55, 38], [82, 38]] },
  { grow: 2, h: 128, windows: [[30, 12], [62, 26], [30, 44], [62, 62], [30, 80]] },
  { grow: 3, h: 72, windows: [[26, 28], [60, 52]] },
  { grow: 2, h: 100, windows: [[32, 20], [64, 42], [32, 66]] },
];

function PixelCloud({ className }: { className?: string }) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <div className="mx-auto h-3 w-1/2 bg-current" />
      <div className="h-4 w-full bg-current" />
      <div className="mx-auto h-3 w-3/4 bg-current" />
    </div>
  );
}

function Skyline() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0">
      <div className="flex items-end">
        {BUILDINGS.map((b, i) => (
          <div
            key={i}
            className="relative bg-[#b02a7f]/10 dark:bg-[#1a0a2e]"
            style={{ flexGrow: b.grow, flexBasis: 0, height: `${b.h}px` }}
          >
            {b.antenna && (
              <span className="absolute -top-4 left-1/2 h-4 w-[2px] -translate-x-1/2 bg-[#b02a7f]/15 dark:bg-white/20">
                <span className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-rose-400/40 dark:bg-rose-400/80 dark:animate-blink" />
              </span>
            )}
            {/* the builder lives in the city he built */}
            {i === 11 && (
              <Image
                src="/image.png"
                alt=""
                width={600}
                height={600}
                unoptimized
                sizes="40px"
                className="image-pixel absolute -top-12 left-1/2 h-auto w-10 -translate-x-1/2 animate-float opacity-90 drop-shadow-[0_0_10px_rgba(255,153,72,0.5)]"
                draggable={false}
              />
            )}
            {b.windows.map(([wx, wy], wi) => (
              <span
                key={wi}
                className="absolute hidden h-1 w-1 bg-amber-300/80 dark:block"
                style={{ left: `${wx}%`, top: `${wy}%`, opacity: (i + wi) % 3 === 0 ? 0.45 : 0.85 }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function GroundWorld({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-x-clip">
      {/* warm afternoon wash in daylight; deepening night after dark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#fff5ec_0%,#fff0e1_28%,#ffe9d4_58%,#ffefdd_82%,#fff5ec_100%)] dark:bg-[linear-gradient(180deg,#2a1040_0%,#261039_30%,#221036_62%,#27103d_85%,#2a1040_100%)]"
      />

      {/* ambient glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 top-[1%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(255,179,107,0.30),transparent_70%)] blur-2xl dark:bg-[radial-gradient(circle,rgba(255,79,163,0.18),transparent_70%)]" />
        <div className="absolute -left-24 top-[38%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(225,29,116,0.10),transparent_70%)] blur-2xl dark:bg-[radial-gradient(circle,rgba(130,90,220,0.18),transparent_70%)]" />
        <div className="absolute right-[8%] top-[70%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,122,89,0.12),transparent_70%)] blur-2xl dark:bg-[radial-gradient(circle,rgba(255,179,107,0.12),transparent_70%)]" />
      </div>

      {/* stars come out after dark */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden dark:block">
        {STARS.map(([x, y, tw], i) => (
          <span
            key={i}
            className={`absolute h-[2px] w-[2px] bg-white ${tw ? "animate-twinkle" : ""}`}
            style={{ left: `${x}%`, top: `${y}%`, opacity: tw ? 0.7 : 0.35, animationDelay: tw ? `${(i % 5) * 0.6}s` : undefined }}
          />
        ))}
      </div>

      {/* drifting pixel clouds */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden text-[#b02a7f]/[0.07] dark:text-white/[0.05]">
        {CLOUDS.map((c, i) => (
          <div
            key={i}
            className={`animate-drift absolute ${c.faint ? "opacity-60" : ""}`}
            style={{ left: c.left, top: c.top, animationDelay: c.delay }}
          >
            <PixelCloud className={c.w} />
          </div>
        ))}
      </div>

      <Skyline />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
