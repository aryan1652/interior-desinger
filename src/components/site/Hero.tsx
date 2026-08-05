import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { gallery } from "@/lib/site-data";

const TUNNEL = gallery.concat(gallery).map((shot, i) => {
  const angle = (i / (gallery.length * 2)) * Math.PI * 2 * 3;
  const radius = 30 + (i % 4) * 6;
  return {
    ...shot,
    left: `${50 + Math.cos(angle) * radius}%`,
    top: `${50 + Math.sin(angle) * (radius * 0.85)}%`,
    delay: -(i * (18 / (gallery.length * 2))),
    tilt: ((i % 5) - 2) * 1.6,
    size: 200 + (i % 3) * 70,
  };
});

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const tunnelScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);

  const rotateY = useTransform(mx, [-0.5, 0.5], [8, -8]);
  const rotateX = useTransform(my, [-0.5, 0.5], [-6, 6]);

  return (
    <section
      ref={ref}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      className="relative h-screen w-full overflow-hidden bg-surface"
      aria-label="Introduction"
    >
      <motion.div
        aria-hidden
        style={{ perspective: 1100, scale: tunnelScale }}
        className="absolute inset-0"
      >
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
        >
          {TUNNEL.map((t, i) => (
            <div
              key={i}
              className="absolute overflow-hidden rounded-2xl shadow-luxe"
              style={{
                left: t.left,
                top: t.top,
                width: t.size,
                height: t.size * 1.25,
                // @ts-expect-error custom property
                "--tilt": `${t.tilt}deg`,
                animation: `tunnel-fly 18s linear infinite`,
                animationDelay: `${t.delay}s`,
                transformStyle: "preserve-3d",
              }}
            >
              <img
                src={t.src}
                alt=""
                loading={i < 4 ? "eager" : "lazy"}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_5%,var(--background)_78%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="eyebrow"
        >
          Interior Architecture &amp; Turnkey Design
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-4xl text-5xl leading-[1.03] sm:text-7xl lg:text-8xl"
        >
          Designing Spaces
          <span className="block italic text-primary">That Define Luxury.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground"
        >
          A design atelier crafting residences, villas and commercial interiors where light,
          material and proportion are resolved with quiet precision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-11 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            to="/portfolio"
            className="hover-glow rounded-full bg-foreground px-9 py-4 font-accent text-[0.72rem] uppercase tracking-[0.22em] text-background"
          >
            Explore Portfolio
          </Link>
          <Link
            to="/"
            hash="contact"
            className="hover-glow glass-panel rounded-full px-9 py-4 font-accent text-[0.72rem] uppercase tracking-[0.22em] text-foreground"
          >
            Book Consultation
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
