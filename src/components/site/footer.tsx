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
    <footer className="relative overflow-hidden bg-[#182017] text-[#F6EFDD] pt-16 pb-12 border-t-2 border-[#D8C8A6]/20">
      {/* Background Illustrated Corner Shop Scene / Crates Watermark */}
      <div className="pointer-events-none absolute inset-0 opacity-15 overflow-hidden">
        <img
          src={VINTAGE_ILLUSTRATIONS.crates}
          alt="Vintage corner shop and crate illustration watermark"
          className="h-full w-full object-cover filter sepia-[0.8] contrast-[1.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#182017] via-[#182017]/80 to-[#182017]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5">
        {/* Banner Section inside Footer: Found at the Corner Shop */}
        <div className="mb-12 rounded-3xl border border-[#F6EFDD]/20 bg-[#242E23]/80 p-8 sm:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 backdrop-blur-sm">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#E0A76A] uppercase">
              SINCE 1962 · TRADITIONAL KIRANA COUNTERS
            </span>
            <h2 className="mt-2 font-display text-3xl font-black uppercase text-[#F6EFDD] sm:text-4xl">
              FOUND AT THE CORNER SHOP
            </h2>
            <p className="mt-2 max-w-xl text-xs sm:text-sm text-[#F6EFDD]/80">
              Look for the wooden crates and chilled marble bottles at your neighborhood store. Made for every season of India.
            </p>
          </div>

          {/* Made in India Stamp Badge */}
          <div className="flex shrink-0 items-center gap-3 rounded-full border-2 border-dashed border-[#F6EFDD]/40 bg-[#182017] px-5 py-3 shadow-inner">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#7A1F1F] font-bold text-xs text-[#F6EFDD]">
              🇮🇳
            </span>
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-wider text-[#F6EFDD]">
                Made in India
              </p>
              <p className="text-[10px] text-[#F6EFDD]/70 uppercase tracking-widest">
                Est. 1962 · Chennai & Raipur
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 pb-12 border-b border-[#F6EFDD]/15">
          {/* Col 1: Brand & Intro */}
          <div>
            <OldGloryLogo className="h-12 w-auto text-[#F6EFDD]" />
            <p className="mt-4 text-xs leading-relaxed text-[#F6EFDD]/75">
              {BRAND.tagline}. The original marble-neck codd soda bottled fresh in six signature profiles.
            </p>
            <p className="mt-3 text-[11px] text-[#E0A76A]">
              {BRAND.address}
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-widest text-[#E0A76A]">
              Navigation
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-xs text-[#F6EFDD]/80 transition-colors hover:text-[#F6EFDD] hover:underline"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Flavours Lineup */}
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-widest text-[#E0A76A]">
              Six Flavours
            </p>
            <ul className="mt-4 space-y-2.5">
              {FLAVORS.map((f) => (
                <li key={f.id}>
                  <button
                    onClick={() => scrollToSection("flavors")}
                    className="text-xs text-[#F6EFDD]/80 transition-colors hover:text-[#F6EFDD]"
                  >
                    {f.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Socials & Contact */}
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-widest text-[#E0A76A]">
              Connect
            </p>
            <p className="mt-4 text-xs text-[#F6EFDD]/80">
              Inquiries: <a href={`mailto:${BRAND.email}`} className="underline hover:text-[#F6EFDD]">{BRAND.email}</a>
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
                    className="grid h-9 w-9 place-items-center rounded-full border border-[#F6EFDD]/30 bg-[#242E23] text-[#F6EFDD] transition-colors hover:border-[#F6EFDD] hover:bg-[#7A1F1F]"
                  >
                    <Icon size={18} variant="Linear" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Rights & Back to Top */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-[#F6EFDD]/60">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved. Made in India.</p>
          <button
            onClick={() => scrollToSection("hero")}
            className="text-xs font-bold text-[#E0A76A] uppercase tracking-wider hover:underline"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
