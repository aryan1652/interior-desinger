import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { PortfolioGrid } from "@/components/site/PortfolioGrid";
import { Reveal } from "@/components/site/Reveal";
import { gallery } from "@/lib/site-data";

const title = "Portfolio — Maison Verre Luxury Interiors";
const description =
  "Browse completed luxury interiors by Maison Verre: living rooms, kitchens, bedrooms, villas, offices, restaurants and hotels.";

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

const categories = ["All", ...Array.from(new Set(gallery.map((g) => g.category)))];

function PortfolioPage() {
  const [active, setActive] = useState("All");
  const items = active === "All" ? gallery : gallery.filter((g) => g.category === active);

  return (
    <>
      <SmoothScroll />
      <Nav />
      <main className="px-6 pb-28 pt-40 sm:pt-48">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Portfolio</p>
            <h1 className="mt-6 text-5xl leading-[1.05] sm:text-7xl">
              A record of rooms
              <span className="block italic text-primary">made to last decades.</span>
            </h1>
            <p className="mt-7 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Every project below was designed, detailed and delivered by our studio — from
              apartments in the city to villas by the coast.
            </p>
          </Reveal>

          <div className="mt-14 flex flex-wrap gap-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full border px-6 py-2.5 font-accent text-[0.68rem] uppercase tracking-[0.2em] transition-all duration-500 ${
                  active === c
                    ? "border-transparent bg-foreground text-background"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-12">
            <PortfolioGrid items={items} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
