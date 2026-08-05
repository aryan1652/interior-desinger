import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { images } from "@/lib/site-data";
import { Reveal } from "./Reveal";

const stats = [
  { value: 100, suffix: "+", label: "Projects Delivered" },
  { value: 15, suffix: "+", label: "Years of Practice" },
  { value: 95, suffix: "%", label: "Client Satisfaction" },
  { value: 500, suffix: "+", label: "Luxury Spaces" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1600, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-5xl text-foreground sm:text-6xl">
      {n}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 px-6 py-28 sm:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
        <Reveal>
          <div className="relative">
            <motion.div
              initial={{ scale: 1.14 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-[2rem]"
            >
              <img
                src={images.staircase}
                alt="Sculptural limestone staircase in a private villa"
                loading="lazy"
                width={1024}
                height={1280}
                className="h-[520px] w-full object-cover sm:h-[680px]"
              />
            </motion.div>
            <div className="absolute -bottom-10 -right-4 hidden w-56 overflow-hidden rounded-3xl border border-border shadow-luxe sm:block lg:-right-12">
              <img
                src={images.decor}
                alt="Curated decor detail"
                loading="lazy"
                className="h-64 w-full object-cover"
              />
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col justify-center">
          <Reveal>
            <p className="eyebrow">The Atelier</p>
            <h2 className="mt-6 text-4xl leading-[1.1] sm:text-6xl">
              A philosophy of restraint,
              <span className="block italic text-primary">executed with obsession.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-9 space-y-5 text-[0.98rem] leading-[1.85] text-muted-foreground">
              <p>
                Maison Verre is an interior architecture practice built on a simple belief: a space
                should feel inevitable. We design luxury residences, private villas and considered
                commercial interiors where nothing is decorative for its own sake — every joint,
                reveal and shadow line is drawn, questioned and drawn again.
              </p>
              <p>
                Our work is deeply personal. We begin with how you actually live, then translate it
                into plans, material palettes and lighting schemes tailored to you alone. Stone is
                selected slab by slab, timber is matched by grain, and plaster is finished by hand
                on site.
              </p>
              <p>
                As a turnkey studio, we hold the whole chain — concept, drawings, procurement,
                execution and styling — so the design that was promised is the design that is
                delivered. That accountability is why our clients return, and why they introduce us
                to their families.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-y-10 border-t border-border pt-12">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <Counter value={s.value} suffix={s.suffix} />
                <p className="mt-2 font-accent text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
