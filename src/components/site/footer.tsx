import { motion } from "motion/react";
import { Facebook, Instagram, Youtube } from "iconsax-reactjs";
import type { MouseEvent } from "react";
import { useLocation } from "@tanstack/react-router";
import { BRAND, NAV_LINKS, SOCIALS } from "./data";
import { VINTAGE_ILLUSTRATIONS } from "./images";
import { OldGloryLogo } from "./logo";
import { scrollToSection } from "./use-lenis";
import {
  ADDRESS,
  EMAIL,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from "../../lib/seo";

const SOCIAL_ICONS: Record<string, typeof Instagram> = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
};

const PRODUCT_RANGES = [
  { label: "₹30/- PREMIUM RANGE", href: "#premium-30" },
  { label: "₹20/- PREMIUM RANGE", href: "#premium-20" },
  { label: "₹20/- RANGE", href: "#range-20" },
  { label: "₹10/- RANGE", href: "#range-10" },
] as const;

export function Footer() {
  const location = useLocation();
  const isHomepage = location.pathname === "/";

  const navigateToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!isHomepage) return;
    event.preventDefault();
    window.history.pushState(null, "", `#${id}`);
    scrollToSection(id);
  };

  const sectionHref = (id: string) => (isHomepage ? `#${id}` : `/#${id}`);

  const backToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = isHomepage ? "hero" : "top";
    window.history.pushState(null, "", `#${target}`);
    scrollToSection(target);
  };

  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-footer-bg text-on-accent pt-16 pb-12 border-t-2 border-border-theme/20"
    >
      {/* Background Illustrated Corner Shop Scene / Crates Watermark */}
      <div className="pointer-events-none absolute inset-0 opacity-15 overflow-hidden">
        <img
          src={VINTAGE_ILLUSTRATIONS.crates}
          alt="Vintage corner shop and crate illustration watermark"
          width={1536}
          height={1024}
          loading="lazy"
          decoding="async"
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
              Look for the wooden crates and chilled marble bottles at your neighborhood store. Made
              for every season of India.
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
              <p className="text-[10px] text-on-accent/70 uppercase tracking-widest">Raipur, CG</p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 pb-12 border-b border-on-accent/15">
          {/* Col 1: Brand & Intro */}
          <div>
            <OldGloryLogo className="h-12 w-auto text-on-accent" />
            <p className="mt-4 text-sm leading-relaxed text-on-accent/75">
              {BRAND.tagline}. The original marble-neck codd soda bottled fresh in six signature
              profiles.
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
                  <a
                    href={sectionHref(link.id)}
                    onClick={(event) => navigateToSection(event, link.id)}
                    className="inline-flex min-h-11 min-w-11 items-center text-sm text-on-accent/80 transition-colors hover:text-on-accent hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Product Ranges */}
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-widest text-accent-gold">
              FOUR CATEGORIES
            </p>
            <ul className="mt-4 space-y-2.5">
              {PRODUCT_RANGES.map((range) => (
                <li key={range.href}>
                  <a
                    href={isHomepage ? range.href : `/${range.href}`}
                    className="inline-flex min-h-11 min-w-11 items-center text-sm text-on-accent/80 transition-colors hover:text-on-accent"
                  >
                    {range.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Socials & Contact */}
          <div id="contact-details">
            <p className="font-display text-xs font-bold uppercase tracking-widest text-accent-gold">
              Connect
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-on-accent/80">
              <li>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex min-h-11 items-center underline transition-colors hover:text-on-accent"
                >
                  CALL : {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center underline transition-colors hover:text-on-accent"
                >
                  WHATSAPP : {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex min-h-11 items-center break-all underline transition-colors hover:text-on-accent"
                >
                  MAIL : {EMAIL.toUpperCase()}
                </a>
              </li>
              <li className="leading-relaxed">ADDRESS : {ADDRESS}</li>
            </ul>
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
          <p>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved. Made in India.
          </p>
          <a
            href={isHomepage ? "#hero" : "#top"}
            onClick={backToTop}
            className="inline-flex min-h-11 items-center text-xs font-bold tracking-wider text-accent-gold uppercase hover:underline"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
