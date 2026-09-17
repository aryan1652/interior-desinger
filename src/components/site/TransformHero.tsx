import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { stageImages, transformStages } from "@/lib/portfolio-data";

const visualStages = [
  { src: stageImages.empty, start: 0, end: 0.19 },
  { src: stageImages.shell, start: 0.16, end: 0.39 },
  { src: stageImages.lit, start: 0.36, end: 0.59 },
  { src: stageImages.furnished, start: 0.56, end: 0.79 },
  { src: stageImages.final, start: 0.76, end: 1 },
];

function StageLayer({
  progress,
  index,
  src,
  eager,
  start,
  end,
}: {
  progress: MotionValue<number>;
  index: number;
  src: string;
  eager: boolean;
  start: number;
  end: number;
}) {
  const revealStart = index === 0 ? 0 : start;
  const revealEnd = index === 0 ? 0 : Math.min(start + 0.075, end);
  const clipPath = useTransform(
    progress,
    index === 0 ? [0, 1] : [revealStart, revealEnd],
    index === 0
      ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
      : ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"],
  );
  const imageScale = useTransform(progress, [start, end], [1.025, 1]);

  return (
    <motion.div style={{ clipPath }} className="absolute inset-0 overflow-hidden will-change-[clip-path]">
      <motion.img
        src={src}
        alt=""
        aria-hidden
        loading={eager ? "eager" : "lazy"}
        width={1600}
        height={1008}
        style={{ scale: imageScale }}
        className="h-full w-full object-cover will-change-transform"
      />
    </motion.div>
  );
}

export function TransformHero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 72,
    damping: 28,
    mass: 0.35,
    restDelta: 0.0005,
  });
  const p = reduceMotion ? scrollYProgress : smoothProgress;

  const camScale = useTransform(p, [0, 1], [1.02, 1.075]);
  const camY = useTransform(p, [0, 1], ["0%", "-0.75%"]);
  const vignette = useTransform(p, [0, 0.75, 1], [0.28, 0.14, 0.08]);
  const total = transformStages.length;
  const activeIndex = useTransform(p, (v) => Math.min(total - 1, Math.floor(v * total)));
  const barScale = useTransform(p, [0, 1], [0, 1]);
  const introOpacity = useTransform(p, [0, 0.12, 0.82, 0.94], [1, 1, 0.82, 0]);

  return (
    <div ref={ref} className="relative h-[560vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-surface">
        <motion.div style={{ scale: camScale, y: camY }} className="absolute inset-0">
          {visualStages.map((s, i) => (
            <StageLayer
              key={s.src}
              progress={p}
              index={i}
              src={s.img}
              start={s.start}
              end={s.end}
              eager={i === 0}
            />
          ))}
        </motion.div>

        <motion.div
          aria-hidden
          style={{ opacity: vignette }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_48%,var(--background)_125%)]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-background via-background/80 to-transparent" />

        {/* stage rail */}
        <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 lg:block">
          <ul className="space-y-3">
            {transformStages.map((s, i) => (
              <StageTick key={s.label} label={s.label} index={i} active={activeIndex} />
            ))}
          </ul>
        </div>

        <motion.div style={{ opacity: introOpacity }} className="absolute inset-x-0 bottom-0 px-6 pb-10 sm:pb-14">
          <div className="mx-auto max-w-7xl">
            <StageCaption active={activeIndex} />
            <h1 className="mt-4 max-w-3xl text-5xl leading-[1.03] sm:mt-5 sm:text-7xl">
              Our Portfolio
              <span className="block italic text-primary">from bare shell to breathtaking.</span>
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:mt-6">
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
        </motion.div>
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
  const width = useTransform(active, (a) => (a === index ? 36 : 16));
  return (
    <motion.li
      style={{ opacity, x }}
      className="flex items-center gap-3 font-accent text-[0.62rem] uppercase tracking-[0.24em] text-foreground transition-colors"
    >
      <motion.span style={{ width }} className="h-px bg-primary" />
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
