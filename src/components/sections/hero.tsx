"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { profile } from "@/lib/content";

export function Hero() {
  return (
    <section id="top" className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.15),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.22),transparent_55%)]" />
      <ContainerScroll
        titleComponent={
          <div className="space-y-6 pb-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center"
            >
              <Image
                src="/sprite.png"
                alt="Anson pixel avatar"
                width={180}
                height={180}
                priority
                unoptimized
                className="image-pixel mx-auto drop-shadow-[0_0_18px_rgba(34,197,94,0.45)]"
                draggable={false}
              />
            </motion.div>
            <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">
              {profile.name}
              <br />
              <span className="mt-1 inline-block bg-gradient-to-r from-emerald-400 via-emerald-300 to-lime-300 bg-clip-text text-4xl font-bold leading-none text-transparent md:text-[6rem]">
                builds things.
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-sm text-slate-600 dark:text-slate-400 md:text-base">
              {profile.headline}
            </p>
          </div>
        }
      >
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-[#0b0f19] text-emerald-300">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.08)_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="relative z-10 max-w-2xl p-8 font-mono text-sm md:text-base">
            <div className="mb-4 flex gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="h-3 w-3 rounded-full bg-amber-300" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <pre className="whitespace-pre-wrap leading-relaxed">
{`$ whoami
> anson_woo

$ cat focus.txt
> biomed @ imperial
> AI automations
> ML for neuroscience (y3 @ neurox)

$ ls ./building
> edu/  codewords/  speed_networknow/

$ echo $STATUS
> shipping.`}
            </pre>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
