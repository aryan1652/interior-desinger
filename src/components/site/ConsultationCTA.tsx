import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { stageImages } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";

export function ConsultationCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative overflow-hidden" aria-label="Book a consultation">
      <motion.img
        style={{ y }}
        src={stageImages.final}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-[120%] w-full scale-110 object-cover"
      />
      <div className="absolute inset-0 bg-background/72 backdrop-blur-[2px]" />
      <div className="relative mx-auto max-w-4xl px-6 py-32 text-center sm:py-40">
        <Reveal>
          <p className="eyebrow">Begin</p>
          <h2 className="mt-6 text-4xl leading-[1.05] sm:text-6xl">
            Your space is waiting to be
            <span className="block italic text-primary">quietly extraordinary.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Book an unhurried consultation with our design team. We will walk your space, listen
            properly, and come back with one committed direction.
          </p>
          <Link
            to="/"
            hash="contact"
            className="hover-glow mt-11 inline-block rounded-full bg-foreground px-10 py-4 font-accent text-[0.72rem] uppercase tracking-[0.22em] text-background"
          >
            Start Your Dream Project
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
