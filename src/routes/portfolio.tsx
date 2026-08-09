import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Reveal } from "@/components/site/Reveal";
import { TransformHero } from "@/components/site/TransformHero";
import { ProjectShowcase } from "@/components/site/ProjectShowcase";
import { MasonryGallery } from "@/components/site/MasonryGallery";
import { Testimonials } from "@/components/site/Testimonials";
import { ConsultationCTA } from "@/components/site/ConsultationCTA";
import { Lightbox, type LightboxItem } from "@/components/site/Lightbox";
import { gallery } from "@/lib/site-data";
import { filters, projects, galleryFilterMap } from "@/lib/portfolio-data";

const title = "Portfolio — Maison Verre Luxury Interior Design";
const description =
  "Completed luxury interiors by Maison Verre: apartments, villas, workplaces, hotels and restaurants — with concepts, materials, before-and-after and full galleries.";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [active, setActive] = useState<string>("All");
  const [box, setBox] = useState<{ items: LightboxItem[]; index: number | null }>({
    items: [],
    index: null,
  });

  const visibleProjects = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.tags.includes(active))),
    [active],
  );

  const visibleGallery = useMemo(
    () =>
      active === "All"
        ? gallery
        : gallery.filter(
            (g) => g.category === active || (galleryFilterMap[g.category] ?? []).includes(active),
          ),
    [active],
  );

  return (
    <>
      <SmoothScroll />
      <Nav />

      <main>
        <TransformHero />

        {/* Filters */}
        <section className="px-6 pt-24" aria-label="Project filters">
          <div className="mx-auto max-w-7xl">
            <Reveal className="max-w-3xl">
              <p className="eyebrow">Selected work</p>
              <h2 className="mt-6 text-4xl leading-[1.05] sm:text-6xl">
                Rooms made to last
                <span className="block italic text-primary">decades, not seasons.</span>
              </h2>
            </Reveal>

            <div className="mt-12 flex flex-wrap gap-3">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  aria-pressed={active === f}
                  className={`rounded-full border px-6 py-2.5 font-accent text-[0.66rem] uppercase tracking-[0.2em] transition-all duration-500 ${
                    active === f
                      ? "border-transparent bg-foreground text-background"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </section>

        {visibleProjects.length === 0 ? (
          <p className="mx-auto max-w-7xl px-6 py-24 text-sm text-muted-foreground">
            No case studies in this category yet — browse the gallery below.
          </p>
        ) : (
          visibleProjects.map((p, i) => (
            <ProjectShowcase
              key={p.slug}
              project={p}
              index={i}
              onOpenImage={(imgs, n, name) =>
                setBox({
                  items: imgs.map((src, k) => ({
                    src,
                    label: name,
                    category: `View ${k + 1}`,
                  })),
                  index: n,
                })
              }
            />
          ))
        )}

        {/* Premium gallery */}
        <section className="border-t border-border px-6 py-28" aria-label="Premium gallery">
          <div className="mx-auto max-w-7xl">
            <Reveal className="max-w-2xl">
              <p className="eyebrow">Gallery</p>
              <h2 className="mt-6 text-4xl leading-tight sm:text-6xl">
                A closer look at
                <span className="italic text-primary"> the detail.</span>
              </h2>
            </Reveal>

            <motion.div layout className="mt-14">
              <MasonryGallery
                items={visibleGallery}
                onOpen={(n) =>
                  setBox({
                    items: visibleGallery.map((g) => ({
                      src: g.src,
                      label: g.label,
                      category: g.category,
                    })),
                    index: n,
                  })
                }
              />
            </motion.div>
          </div>
        </section>

        <Testimonials />
        <ConsultationCTA />
      </main>

      <Footer />

      <Lightbox
        items={box.items}
        index={box.index}
        onClose={() => setBox((b) => ({ ...b, index: null }))}
        onIndexChange={(i) => setBox((b) => ({ ...b, index: i }))}
      />
    </>
  );
}
