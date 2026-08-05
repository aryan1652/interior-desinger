import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { processSteps } from "@/lib/site-data";

function Step({ index, title, copy }: { index: number; title: string; copy: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 45%"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.25, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 ? 40 : -40, 0]);
  const dot = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  return (
    <li ref={ref} className="relative grid grid-cols-[auto_1fr] gap-6 pb-16 sm:gap-10">
      <motion.span
        style={{ scale: dot, opacity }}
        className="relative z-10 mt-1 grid h-12 w-12 place-items-center rounded-full border border-border bg-card font-accent text-[0.7rem] tracking-widest text-primary shadow-soft"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>
      <motion.div style={{ opacity, x }}>
        <h3 className="text-3xl leading-tight">{title}</h3>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">{copy}</p>
      </motion.div>
    </li>
  );
}

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 60%"] });
  const height = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 80,
    damping: 24,
  });

  return (
    <section id="process" className="scroll-mt-24 bg-surface px-6 py-28 sm:py-40">
      <div className="mx-auto max-w-4xl">
        <p className="eyebrow">The Method</p>
        <h2 className="mt-6 text-4xl leading-[1.1] sm:text-6xl">
          Twelve steps between
          <span className="block italic text-primary">first sketch and first evening.</span>
        </h2>

        <div ref={ref} className="relative mt-20">
          <div className="absolute bottom-0 left-6 top-0 w-px bg-border" aria-hidden />
          <motion.div
            style={{ height }}
            className="absolute left-6 top-0 w-px origin-top bg-primary"
            aria-hidden
          />
          <ol className="relative">
            {processSteps.map((s, i) => (
              <Step key={s.title} index={i} title={s.title} copy={s.copy} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
