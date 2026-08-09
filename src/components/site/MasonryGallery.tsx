import { Reveal } from "./Reveal";
import type { Shot } from "@/lib/site-data";

export function MasonryGallery({
  items,
  onOpen,
}: {
  items: Shot[];
  onOpen: (i: number) => void;
}) {
  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
      {items.map((shot, i) => (
        <Reveal key={shot.label + i} delay={(i % 3) * 0.05} className="break-inside-avoid">
          <button
            onClick={() => onOpen(i)}
            aria-label={`Open ${shot.label} fullscreen`}
            className="group relative block w-full overflow-hidden rounded-[1.75rem] text-left"
          >
            <img
              src={shot.src}
              alt={shot.label}
              loading="lazy"
              className="w-full object-cover transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:blur-[2px]"
              style={{ height: `${16 + (i % 4) * 4}rem` }}
            />
            <div className="absolute inset-0 bg-background/0 transition-colors duration-700 group-hover:bg-background/30" />
            <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
              <div className="glass-panel rounded-2xl px-5 py-4">
                <p className="eyebrow">{shot.category}</p>
                <p className="mt-1 font-display text-xl">{shot.label}</p>
              </div>
            </div>
          </button>
        </Reveal>
      ))}
    </div>
  );
}
