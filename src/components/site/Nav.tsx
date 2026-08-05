import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt4, HiOutlineX } from "react-icons/hi";

const links = [
  { label: "Home", to: "/", hash: undefined },
  { label: "About", to: "/", hash: "about" },
  { label: "Services", to: "/", hash: "services" },
  { label: "Process", to: "/", hash: "process" },
  { label: "Portfolio", to: "/portfolio", hash: undefined },
  { label: "Contact", to: "/", hash: "contact" },
] as const;

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        solid ? "py-3" : "py-6"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-6 py-3 transition-all duration-700 sm:px-8 ${
          solid ? "glass-panel shadow-soft mx-4 lg:mx-auto" : "border border-transparent"
        }`}
        aria-label="Primary"
      >
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl tracking-tight">Maison Verre</span>
          <span className="eyebrow hidden sm:inline">Interiors</span>
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                to={l.to}
                hash={l.hash}
                className="gold-underline font-accent text-[0.78rem] uppercase tracking-[0.18em] text-foreground/80 transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/"
          hash="contact"
          className="hover-glow hidden rounded-full bg-foreground px-6 py-2.5 font-accent text-[0.72rem] uppercase tracking-[0.2em] text-background md:inline-block"
        >
          Book Consultation
        </Link>

        <button
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <HiOutlineX size={24} /> : <HiOutlineMenuAlt4 size={24} />}
        </button>
      </nav>

      {open && (
        <div className="glass-panel mx-4 mt-2 rounded-3xl p-6 md:hidden">
          <ul className="flex flex-col gap-5">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  hash={l.hash}
                  onClick={() => setOpen(false)}
                  className="font-accent text-xs uppercase tracking-[0.22em]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
