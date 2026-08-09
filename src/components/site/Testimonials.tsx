import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { testimonials } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";

export function Testimonials() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (d: number) => {
    setDir(d);
    setI((v) => (v + d + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const t = setInterval(() => go(1), 7000);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[i]!;

  return (
    <section className="border-t border-border bg-surface px-6 py-28" aria-label="Client reviews">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="eyebrow text-center">Clients</p>
          <h2 className="mt-6 text-center text-4xl leading-tight sm:text-6xl">
            Quietly said,
            <span className="italic text-primary"> generously meant.</span>
          </h2>
        </Reveal>

        <div className="relative mt-16 min-h-[19rem] sm:min-h-[16rem]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.blockquote
              key={i}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: dir * -40, filter: "blur(8px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel rounded-[2rem] px-8 py-12 text-center shadow-soft sm:px-14"
            >
              <p className="font-display text-2xl leading-relaxed sm:text-3xl">“{t.quote}”</p>
              <footer className="mt-8">
                <p className="font-accent text-[0.72rem] uppercase tracking-[0.22em]">{t.name}</p>
                <p className="mt-2 text-sm text-muted-foreground">{t.role}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Previous review"
            className="rounded-full border border-border bg-card p-3 transition-colors hover:text-primary"
          >
            <FiArrowLeft />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, n) => (
              <button
                key={n}
                aria-label={`Review ${n + 1}`}
                onClick={() => {
                  setDir(n > i ? 1 : -1);
                  setI(n);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  n === i ? "w-8 bg-primary" : "w-3 bg-border"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Next review"
            className="rounded-full border border-border bg-card p-3 transition-colors hover:text-primary"
          >
            <FiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
