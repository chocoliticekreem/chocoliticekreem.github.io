"use client";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="fixed left-4 right-4 top-4 z-50 mx-auto max-w-6xl rounded-2xl border border-black/5 bg-white/70 px-5 py-3 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/60">
      <nav className="flex items-center justify-between gap-6">
        <Link href="#top" className="font-mono text-sm font-semibold text-slate-900 dark:text-white">
          anson.
        </Link>
        <ul className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="font-mono text-xs text-slate-600 transition-colors duration-200 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-300"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
}
