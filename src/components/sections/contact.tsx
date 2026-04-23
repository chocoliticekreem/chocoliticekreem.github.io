import { Mail } from "lucide-react";
import { profile } from "@/lib/content";
import type { SVGProps } from "react";

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.29 0 .32.22.7.82.58A12.02 12.02 0 0024 12.5C24 5.87 18.63.5 12 .5z" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 11-.01-4.12 2.06 2.06 0 01.01 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.21 0 22.23 0z" />
    </svg>
  );
}

export function Contact() {
  const links = [
    { label: "Email", href: `mailto:${profile.email}`, Icon: Mail, text: profile.email },
    { label: "GitHub", href: profile.github, Icon: GithubIcon, text: "chocoliticekreem" },
    { label: "LinkedIn", href: profile.linkedin, Icon: LinkedinIcon, text: "ansonwoo" },
  ];

  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 py-24 md:py-32">
      <p className="mb-6 font-mono text-xs uppercase tracking-widest text-rose-500 dark:text-rose-400">
        05 · contact
      </p>
      <h2 className="font-display mb-8 text-4xl font-semibold text-slate-900 dark:text-white md:text-6xl">
        Connect with me!
      </h2>
      <p className="mb-10 max-w-2xl text-lg leading-relaxed text-slate-700 dark:text-slate-300">
        Always down to chat about AI agents, medical ML, or weird side projects. Quickest way to reach me:
      </p>
      <ul className="grid gap-3 sm:grid-cols-3">
        {links.map(({ label, href, Icon, text }) => (
          <li key={label}>
            <a
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-colors duration-200 hover:border-rose-400 hover:bg-rose-50/50 dark:border-white/10 dark:bg-white/5 dark:hover:border-rose-400/60 dark:hover:bg-rose-400/5 cursor-pointer"
            >
              <Icon className="h-5 w-5 text-slate-500 transition-colors duration-200 group-hover:text-rose-500 dark:text-rose-400 dark:text-slate-400" />
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  {label}
                </p>
                <p className="truncate text-sm text-slate-900 dark:text-white">{text}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
