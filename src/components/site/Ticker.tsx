import { gallery } from "@/lib/site-data";

export function Ticker() {
  const row = [...gallery, ...gallery];
  return (
    <section aria-label="Selected interiors" className="overflow-hidden bg-surface py-20">
      <div className="group flex w-max animate-ticker gap-6 hover:[animation-play-state:paused]">
        {row.map((shot, i) => (
          <figure
            key={i}
            className="relative h-64 w-[19rem] shrink-0 overflow-hidden rounded-2xl sm:h-80 sm:w-[24rem]"
          >
            <img
              src={shot.src}
              alt={shot.label}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110"
            />
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/45 to-transparent p-5 font-accent text-[0.68rem] uppercase tracking-[0.22em] text-background">
              {shot.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
