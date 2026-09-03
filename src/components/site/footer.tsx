import { motion } from "motion/react";
import { Facebook, Instagram, Youtube } from "iconsax-reactjs";
import { BRAND, FLAVORS, NAV_LINKS, SOCIALS } from "./data";
import { VINTAGE_ILLUSTRATIONS } from "./images";
import { OldGloryLogo } from "./logo";
import { scrollToSection } from "./use-lenis";

const SOCIAL_ICONS: Record<string, typeof Instagram> = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-footer-bg text-on-accent pt-16 pb-12 border-t-2 border-border-theme/20">
      {/* Background Illustrated Corner Shop Scene / Crates Watermark */}
      <div className="pointer-events-none absolute inset-0 opacity-15 overflow-hidden">
        <img
          src={VINTAGE_ILLUSTRATIONS.crates}
          alt="Vintage corner shop and crate illustration watermark"
          className="h-full w-full object-cover filter sepia-[0.8] contrast-[1.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-footer-bg via-footer-bg/80 to-footer-bg" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5">
        {/* Banner Section inside Footer: Found at the Corner Shop */}
        <div className="mb-12 flex flex-col gap-6 rounded-3xl border border-on-accent/20 bg-footer-surface/80 p-6 backdrop-blur-sm sm:p-10 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="text-xs font-bold tracking-widest text-accent-gold uppercase">
               TRADITIONAL KIRANA COUNTERS
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-[0.015em] text-on-accent sm:text-4xl">
              FOUND AT THE CORNER SHOP
            </h2>
            <p className="mt-2 max-w-xl text-xs sm:text-sm text-on-accent/80">
              Look for the wooden crates and chilled marble bottles at your neighborhood store. Made for every season of India.
            </p>
          </div>

          {/* Made in India Stamp Badge */}
          <div className="flex shrink-0 items-center gap-3 rounded-full border-2 border-dashed border-on-accent/40 bg-footer-bg px-5 py-3 shadow-inner">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-accent-primary font-bold text-xs text-on-accent">
              🇮🇳
            </span>
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-wider text-on-accent">
                Made in India
              </p>
              <p className="text-[10px] text-on-accent/70 uppercase tracking-widest">
                 Raipur, CG
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 pb-12 border-b border-on-accent/15">
          {/* Col 1: Brand & Intro */}
          <div>
            <OldGloryLogo className="h-12 w-auto text-on-accent" />
            <p className="mt-4 text-sm leading-relaxed text-on-accent/75">
              {BRAND.tagline}. The original marble-neck codd soda bottled fresh in six signature profiles.
            </p>
            <p className="mt-3 text-[11px] text-accent-gold">
              {BRAND.address}
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-widest text-accent-gold">
              Navigation
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="inline-flex min-h-11 min-w-11 items-center text-sm text-on-accent/80 transition-colors hover:text-on-accent hover:underline"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Flavours Lineup */}
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-widest text-accent-gold">
              Six Flavours
            </p>
            <ul className="mt-4 space-y-2.5">
              {FLAVORS.map((f) => (
                <li key={f.id}>
                  <button
                    onClick={() => scrollToSection("flavors")}
                    className="inline-flex min-h-11 min-w-11 items-center text-sm text-on-accent/80 transition-colors hover:text-on-accent"
                  >
                    {f.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Socials & Contact */}
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-widest text-accent-gold">
              Connect
            </p>
            <p className="mt-4 text-sm text-on-accent/80">
              Inquiries: {" "}
              <a
                href={`mailto:${BRAND.email}`}
                className="inline-flex min-h-11 items-center break-all underline hover:text-on-accent"
              >
                {BRAND.email}
              </a>
              <span className="mx-2 text-on-accent/60">|</span>
              <a
                href="tel:+919407626212"
                className="inline-flex min-h-11 items-center underline hover:text-on-accent"
                aria-label="Call +91 94076 26212"
              >
                Phone: +91 94076 26212
              </a>
              <span className="mx-2 text-on-accent/60">|</span>
              <a
                href="https://wa.me/917509434343"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center underline hover:text-on-accent"
                aria-label="WhatsApp +91 75094 34343"
              >
                WhatsApp: +91 75094 34343
              </a>
            </p>
            <div className="mt-5 flex items-center gap-3">
              {SOCIALS.map((s) => {
                const Icon = SOCIAL_ICONS[s.icon] ?? Instagram;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.1, rotate: 6 }}
                    className="grid h-11 w-11 place-items-center rounded-full border border-on-accent/30 bg-footer-surface text-on-accent transition-colors hover:border-on-accent hover:bg-accent-primary"
                  >
                    <Icon size={18} variant="Linear" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Rights & Back to Top */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-on-accent/60">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved. Made in India.</p>
          <button
            onClick={() => scrollToSection("hero")}
            className="inline-flex min-h-11 items-center text-xs font-bold tracking-wider text-accent-gold uppercase hover:underline"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
