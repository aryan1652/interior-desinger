import { useState } from "react";
import { LuPhone, LuMail, LuMapPin, LuClock } from "react-icons/lu";
import { FiInstagram, FiLinkedin, FiFacebook } from "react-icons/fi";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const details = [
  { Icon: LuPhone, label: "Phone", value: "+91 98200 41120" },
  { Icon: LuMail, label: "Email", value: "studio@maisonverre.design" },
  { Icon: LuMapPin, label: "Studio", value: "14 Alder Lane, Bandra West, Mumbai 400050" },
  { Icon: LuClock, label: "Hours", value: "Mon – Sat, 10:00 – 19:00" },
];

const field =
  "w-full rounded-2xl border border-border bg-card px-5 py-4 text-sm outline-none transition-shadow duration-500 placeholder:text-muted-foreground/70 focus:shadow-[0_0_0_2px_var(--gold)]";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="scroll-mt-24 px-6 py-28 sm:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <Reveal>
            <p className="eyebrow">Enquiries</p>
            <h2 className="mt-6 text-4xl leading-[1.1] sm:text-6xl">
              Begin with a <span className="italic text-primary">conversation.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              Share a few details about your space and timeline. We take on a limited number of
              projects each year to protect the depth of our attention.
            </p>
          </Reveal>

          <dl className="mt-12 space-y-7">
            {details.map(({ Icon, label, value }, i) => (
              <Reveal key={label} delay={i * 0.06}>
                <div className="flex gap-4">
                  <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sand text-foreground">
                    <Icon size={17} />
                  </span>
                  <div>
                    <dt className="eyebrow">{label}</dt>
                    <dd className="mt-1 text-[0.95rem]">{value}</dd>
                  </div>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.1}>
            <div className="mt-10 flex gap-3">
              {[FiInstagram, FiLinkedin, FiFacebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social profile"
                  className="hover-glow grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground/70 transition-colors hover:text-primary"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 grid h-56 place-items-center overflow-hidden rounded-[1.75rem] border border-border bg-surface">
              <p className="font-accent text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                Studio Map — Bandra West, Mumbai
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form
            className="rounded-[2rem] border border-border bg-surface p-8 shadow-soft sm:p-10"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input className={field} placeholder="Full name" name="name" required />
              <input className={field} placeholder="Phone" name="phone" type="tel" required />
            </div>
            <input
              className={`${field} mt-4`}
              placeholder="Email address"
              name="email"
              type="email"
              required
            />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <select className={field} name="projectType" defaultValue="">
                <option value="" disabled>
                  Project type
                </option>
                <option>Residential Apartment</option>
                <option>Private Villa</option>
                <option>Office</option>
                <option>Retail / Hospitality</option>
                <option>Renovation</option>
              </select>
              <select className={field} name="budget" defaultValue="">
                <option value="" disabled>
                  Budget range
                </option>
                <option>Under ₹25 Lakh</option>
                <option>₹25 – 60 Lakh</option>
                <option>₹60 Lakh – 1.5 Cr</option>
                <option>Above ₹1.5 Cr</option>
              </select>
            </div>
            <textarea
              className={`${field} mt-4 min-h-36 resize-none`}
              placeholder="Tell us about the space"
              name="message"
            />
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              type="submit"
              className="hover-glow mt-6 w-full rounded-full bg-foreground py-4 font-accent text-[0.72rem] uppercase tracking-[0.24em] text-background"
            >
              {sent ? "Thank you — we'll be in touch" : "Send Enquiry"}
            </motion.button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
