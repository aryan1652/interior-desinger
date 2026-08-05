import { Link } from "@tanstack/react-router";
import { gallery } from "@/lib/site-data";
import { Reveal } from "./Reveal";

const spans = [
  "sm:row-span-2",
  "",
  "",
  "sm:row-span-2",
  "",
  "sm:row-span-2",
  "",
  "",
  "sm:row-span-2",
  "",
  "",
  "",
];

export function PortfolioGrid({ items = gallery }: { items?: typeof gallery }) {
  return (
    <div className="grid auto-rows-[16rem] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((shot, i) => (
        <Reveal key={shot.label + i} delay={(i % 3) * 0.06} className={spans[i % spans.length] ?? ""}>
          <article className="group relative h-full overflow-hidden rounded-[1.75rem]">
            <img
              src={shot.src}
              alt={shot.label}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-background/0 transition-colors duration-700 group-hover:bg-background/25" />
            <div className="absolute inset-x-0 bottom-0 translate-y-3 p-6 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
              <div className="glass-panel rounded-2xl px-5 py-4">
                <p className="eyebrow">{shot.category}</p>
                <div className="mt-1 flex items-center justify-between gap-4">
                  <h3 className="text-xl">{shot.label}</h3>
                  <Link
                    to="/portfolio"
                    className="font-accent text-[0.65rem] uppercase tracking-[0.2em] text-primary"
                  >
                    View Project
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
