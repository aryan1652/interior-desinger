import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiMaximize2 } from "react-icons/fi";
import type { Project } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";

function BeforeAfter({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] shadow-soft">
      <img
        src={after}
        alt="After completion"
        loading="lazy"
        className="h-[22rem] w-full object-cover sm:h-[30rem]"
      />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={before}
          alt="Before works began"
          loading="lazy"
          className="h-[22rem] w-[100vw] max-w-none object-cover sm:h-[30rem]"
          style={{ width: "min(1400px, 92vw)" }}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-primary"
        style={{ left: `${pos}%` }}
      />
      <div
        className="pointer-events-none absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-card shadow-soft"
        style={{ left: `${pos}%` }}
      >
        <FiArrowLeft className="text-xs" />
        <FiArrowRight className="text-xs" />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        aria-label="Compare before and after"
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
      <span className="eyebrow absolute bottom-4 left-5 rounded-full bg-card/85 px-3 py-1">
        Before
      </span>
      <span className="eyebrow absolute bottom-4 right-5 rounded-full bg-card/85 px-3 py-1">
        After
      </span>
    </div>
  );
}

function Carousel({
  images,
  name,
  onOpen,
}: {
  images: string[];
  name: string;
  onOpen: (i: number) => void;
}) {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((v) => (v + d + images.length) % images.length);

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] shadow-soft">
      <div
        className="flex transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translate3d(-${i * 100}%,0,0)` }}
      >
        {images.map((src, n) => (
          <button
            key={n}
            onClick={() => onOpen(n)}
            className="group relative h-[22rem] w-full shrink-0 sm:h-[32rem]"
            aria-label={`Open ${name} image ${n + 1} fullscreen`}
          >
            <img
              src={src}
              alt={`${name} — view ${n + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
            />
            <span className="absolute right-5 top-5 rounded-full bg-card/85 p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <FiMaximize2 />
            </span>
          </button>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
        <div className="flex gap-2">
          {images.map((_, n) => (
            <button
              key={n}
              aria-label={`Go to image ${n + 1}`}
              onClick={() => setI(n)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                n === i ? "w-8 bg-primary" : "w-3 bg-card/80"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => go(-1)}
            aria-label="Previous image"
            className="rounded-full bg-card/90 p-3 transition-colors hover:text-primary"
          >
            <FiArrowLeft />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next image"
            className="rounded-full bg-card/90 p-3 transition-colors hover:text-primary"
          >
            <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-border py-4">
      <p className="eyebrow">{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-foreground">{value}</p>
    </div>
  );
}

export function ProjectShowcase({
  project,
  index,
  onOpenImage,
}: {
  project: Project;
  index: number;
  onOpenImage: (images: string[], i: number, name: string) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      aria-label={project.name}
      className="border-t border-border px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] shadow-luxe">
            <motion.img
              style={{ y: heroY }}
              src={project.hero}
              alt={`${project.name} — ${project.type} in ${project.location}`}
              loading="lazy"
              className="h-[24rem] w-full scale-110 object-cover sm:h-[40rem]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-12">
              <p className="eyebrow">
                Project {String(index + 1).padStart(2, "0")} — {project.type}
              </p>
              <h2 className="mt-3 text-4xl leading-tight sm:text-6xl">{project.name}</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                {project.location} · {project.area} · {project.year}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[22rem_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[1.75rem] border border-border bg-card p-7 shadow-soft">
              <p className="eyebrow">Project details</p>
              <div className="mt-4">
                <Detail label="Location" value={project.location} />
                <Detail label="Type" value={project.type} />
                <Detail label="Area" value={project.area} />
                <Detail label="Completed" value={project.year} />
                <Detail label="Materials" value={project.materials.join(" · ")} />
              </div>

              <p className="eyebrow mt-7">Colour palette</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {project.palette.map((c) => (
                  <div key={c.hex} className="flex flex-col items-center gap-2">
                    <span
                      className="h-11 w-11 rounded-full border border-border"
                      style={{ backgroundColor: c.hex }}
                      aria-hidden
                    />
                    <span className="text-[0.62rem] text-muted-foreground">{c.name}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border px-3 py-1 font-accent text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-14">
            <div className="grid gap-10 sm:grid-cols-2">
              {[
                ["Client requirements", project.requirements],
                ["Design concept", project.concept],
                ["Challenges", project.challenges],
                ["Furniture", project.furniture],
                ["Lighting concept", project.lighting],
                ["Execution", project.execution],
              ].map(([label, copy]) => (
                <Reveal key={label as string}>
                  <p className="eyebrow">{label}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <p className="eyebrow mb-4">Before &amp; after</p>
              <BeforeAfter before={project.before} after={project.after} />
            </Reveal>

            <Reveal>
              <p className="eyebrow mb-4">Gallery</p>
              <Carousel
                images={project.gallery}
                name={project.name}
                onOpen={(n) => onOpenImage(project.gallery, n, project.name)}
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
