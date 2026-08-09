import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { transformStages } from "@/lib/portfolio-data";

function StageLayer({
  progress,
  index,
  total,
  src,
  eager,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  src: string;
  eager: boolean;
}) {
  const step = 1 / total;
  const start = index * step;
  const opacity = useTransform(
    progress,
    index === 0
      ? [0, step * 0.9, step * 1.3]
      : [start - step * 0.45, start + step * 0.15, start + step * 1.1, start + step * 1.5],
    index === 0 ? [1, 1, 0] : [0, 1, 1, index === total - 1 ? 1 : 0],
  );
  const scale = useTransform(progress, [start - step, start + step], [1.12, 1]);
  const blur = useTransform(progress, [start - step * 0.6, start + step * 0.2], [14, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden
      loading={eager ? "eager" : "lazy"}
      width={1600}
      height={1008}
      style={{ opacity, scale, filter }}
      className="absolute inset-0 h-full w-full object-cover will-change-transform"
    />
  );
}

export function TransformHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  const camScale = useTransform(p, [0, 1], [1.06, 1.16]);
  const camX = useTransform(p, [0, 0.5, 1], ["2%", "-1.5%", "1%"]);
  const camY = useTransform(p, [0, 1], ["1.5%", "-1.5%"]);
  const vignette = useTransform(p, [0, 1], [0.55, 0.18]);
  const total = transformStages.length;
  const activeIndex = useTransform(p, (v) => Math.min(total - 1, Math.floor(v * total)));
  const barScale = useTransform(p, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative h-[420vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-surface">
        <motion.div style={{ scale: camScale, x: camX, y: camY }} className="absolute inset-0">
          {transformStages.map((s, i) => (
            <StageLayer
              key={i}
              progress={p}
              index={i}
              total={total}
              src={s.img}
              eager={i === 0}
            />
          ))}
        </motion.div>

        <motion.div
          aria-hidden
          style={{ opacity: vignette }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--background)_100%)]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-background via-background/85 to-transparent" />

        {/* stage rail */}
        <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 lg:block">
          <ul className="space-y-3">
            {transformStages.map((s, i) => (
              <StageTick key={s.label} label={s.label} index={i} active={activeIndex} />
            ))}
          </ul>
        </div>

        <div className="absolute inset-x-0 bottom-0 px-6 pb-14">
          <div className="mx-auto max-w-7xl">
            <StageCaption active={activeIndex} />
            <h1 className="mt-5 max-w-3xl text-5xl leading-[1.03] sm:text-7xl">
              Our Portfolio
              <span className="block italic text-primary">from bare shell to breathtaking.</span>
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Scroll to watch an empty room resolve itself — walls, floor, ceiling, light,
              furniture, decor — the same sequence we run on every project we deliver.
            </p>
            <div className="mt-8 h-px w-full max-w-sm overflow-hidden bg-border">
              <motion.div
                style={{ scaleX: barScale }}
                className="h-full w-full origin-left bg-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StageTick({
  label,
  index,
  active,
}: {
  label: string;
  index: number;
  active: MotionValue<number>;
}) {
  const opacity = useTransform(active, (a) => (a === index ? 1 : 0.35));
  const x = useTransform(active, (a) => (a === index ? 8 : 0));
  return (
    <motion.li
      style={{ opacity, x }}
      className="flex items-center gap-3 font-accent text-[0.62rem] uppercase tracking-[0.24em] text-foreground transition-colors"
    >
      <span className="h-px w-6 bg-primary" />
      {label}
    </motion.li>
  );
}

function StageCaption({ active }: { active: MotionValue<number> }) {
  return (
    <div className="flex flex-col gap-1">
      {transformStages.map((s, i) => (
        <CaptionLine key={s.label} index={i} active={active} label={s.label} copy={s.caption} />
      ))}
    </div>
  );
}

function CaptionLine({
  index,
  active,
  label,
  copy,
}: {
  index: number;
  active: MotionValue<number>;
  label: string;
  copy: string;
}) {
  const opacity = useTransform(active, (a) => (a === index ? 1 : 0));
  const height = useTransform(active, (a) => (a === index ? "auto" : "0px"));
  return (
    <motion.p
      style={{ opacity, height }}
      className="eyebrow overflow-hidden"
      aria-hidden={undefined}
    >
      {label} — <span className="normal-case tracking-normal">{copy}</span>
    </motion.p>
  );
}
