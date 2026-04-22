export function Quote() {
  return (
    <section
      aria-label="Favourite quote"
      className="relative overflow-hidden"
    >
      <div className="bg-sunset">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-32 text-center md:py-44">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/70">
            ★ homecoming · kanye west
          </p>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-tight text-white md:text-7xl">
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
        </div>
      </div>
    </section>
  );
}
