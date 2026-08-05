import {
  LuArmchair,
  LuBuilding2,
  LuBriefcase,
  LuHouse,
  LuUtensils,
  LuBedDouble,
  LuSofa,
  LuLamp,
  LuRuler,
  LuHammer,
  LuKey,
  LuBox,
} from "react-icons/lu";
import { services } from "@/lib/site-data";
import { Reveal } from "./Reveal";

const icons = [
  LuHouse,
  LuBuilding2,
  LuBriefcase,
  LuArmchair,
  LuUtensils,
  LuBedDouble,
  LuSofa,
  LuLamp,
  LuRuler,
  LuHammer,
  LuKey,
  LuBox,
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 px-6 py-28 sm:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">What We Do</p>
          <h2 className="mt-6 text-4xl leading-[1.1] sm:text-6xl">
            Complete interiors, <span className="italic text-primary">end to end.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={s.title} delay={(i % 3) * 0.08}>
                <article className="hover-glow group h-full overflow-hidden rounded-[1.75rem] border border-border bg-card transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    />
                    <span className="glass-panel absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-full text-primary">
                      <Icon size={19} />
                    </span>
                  </div>
                  <div className="p-7">
                    <h3 className="text-2xl">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
