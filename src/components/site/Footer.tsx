import { Link } from "@tanstack/react-router";
import { FiInstagram, FiLinkedin, FiFacebook } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface px-6 pb-10 pt-20">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="font-display text-3xl">Maison Verre</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Interior architecture and turnkey design for residences, villas and considered
            commercial spaces.
          </p>
        </div>

        <div>
          <p className="eyebrow">Navigate</p>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            {[
              { l: "Home", to: "/" as const, h: "" },
              { l: "About", to: "/" as const, h: "about" },
              { l: "Process", to: "/" as const, h: "process" },
              { l: "Portfolio", to: "/portfolio" as const, h: "" },
              { l: "Contact", to: "/" as const, h: "contact" },
            ].map((i) => (
              <li key={i.l}>
                <Link
                  to={i.to}
                  {...(i.h ? { hash: i.h } : {})}
                  className="gold-underline hover:text-foreground"
                >
                  {i.l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Services</p>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            {[
              "Residential Interior",
              "Luxury Villa Design",
              "Commercial Interior",
              "Turnkey Projects",
              "3D Visualisation",
            ].map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Newsletter</p>
          <p className="mt-5 text-sm text-muted-foreground">
            Occasional letters on material, light and finished projects.
          </p>
          <form className="mt-5 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <label className="sr-only" htmlFor="news">
              Email address
            </label>
            <input
              id="news"
              type="email"
              placeholder="Email address"
              className="w-full rounded-full border border-border bg-card px-5 py-3 text-sm outline-none focus:shadow-[0_0_0_2px_var(--gold)]"
            />
            <button className="hover-glow rounded-full bg-foreground px-5 py-3 font-accent text-[0.65rem] uppercase tracking-[0.18em] text-background">
              Join
            </button>
          </form>
          <div className="mt-6 flex gap-3">
            {[FiInstagram, FiLinkedin, FiFacebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social profile"
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground/70 transition-colors hover:text-primary"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-col justify-between gap-3 border-t border-border pt-8 font-accent text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground sm:flex-row">
        <span>© {new Date().getFullYear()} Maison Verre Interiors</span>
        <span>Mumbai · Dubai · London</span>
      </div>
    </footer>
  );
}
