import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Ticker } from "@/components/site/Ticker";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { Contact } from "@/components/site/Contact";
import { PortfolioGrid } from "@/components/site/PortfolioGrid";
import { Reveal } from "@/components/site/Reveal";
import { Link } from "@tanstack/react-router";
import { gallery } from "@/lib/site-data";

const title = "Maison Verre — Luxury Interior Design & Turnkey Architecture";
const description =
  "Maison Verre is a luxury interior design atelier crafting residences, villas, offices and hospitality interiors with material precision and turnkey execution.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <About />
        <Ticker />
        <Services />
        <Process />

        <section id="portfolio" className="scroll-mt-24 px-6 py-28 sm:py-40">
          <div className="mx-auto max-w-7xl">
            <Reveal className="max-w-2xl">
              <p className="eyebrow">Selected Work</p>
              <h2 className="mt-6 text-4xl leading-[1.1] sm:text-6xl">
                Spaces we have <span className="italic text-primary">quietly finished.</span>
              </h2>
            </Reveal>
            <div className="mt-16">
              <PortfolioGrid items={gallery.slice(0, 9)} />
            </div>
            <Reveal className="mt-16 flex justify-center">
              <Link
                to="/portfolio"
                className="hover-glow rounded-full bg-foreground px-10 py-4 font-accent text-[0.72rem] uppercase tracking-[0.22em] text-background"
              >
                View Full Portfolio
              </Link>
            </Reveal>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
