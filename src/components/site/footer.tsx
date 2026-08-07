import { motion } from "motion/react";
import { Facebook, Instagram, Whatsapp, Youtube } from "iconsax-reactjs";
import type { Icon } from "iconsax-reactjs";
import { BRAND, FLAVORS, NAV_LINKS, SOCIALS } from "./data";
import { scrollToSection } from "./use-lenis";

const SOCIAL_ICONS: Record<string, Icon> = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  whatsapp: Whatsapp,
};

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-border px-5 py-12"
    >
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <span className="ribbon inline-flex px-4 py-1.5 font-brand text-sm tracking-wide">
            OLD GLORY SODA
          </span>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            {BRAND.tagline}. Marble-neck glass bottles, bottled in India since 1962.
          </p>
          <div className="mt-5 flex gap-2">
            {SOCIALS.map((s) => {
              const Icon = SOCIAL_ICONS[s.icon] ?? Instagram;
              return (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -4, rotate: -6 }}
                  className="grid h-10 w-10 place-items-center rounded-full border border-silver/30 text-muted-foreground transition-colors hover:border-highlight hover:text-highlight"
                >
                  <Icon size={19} variant="Linear" color="currentColor" />
                </motion.a>
              );
            })}
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="font-display text-sm font-semibold">Explore</p>
          <ul className="mt-3 space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => scrollToSection(l.id)}
                  className="text-sm text-muted-foreground transition-colors hover:text-highlight"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-display text-sm font-semibold">Flavours</p>
          <ul className="mt-3 space-y-2">
            {FLAVORS.map((f) => (
              <li key={f.id}>
                <button
                  onClick={() => scrollToSection("flavors")}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  style={{ textDecorationColor: f.color }}
                >
                  {f.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl gap-3 border-t border-border pt-6 sm:flex sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="h-1.5 w-10 shrink-0 rounded-full bg-destructive" />
          <p className="truncate text-xs text-muted-foreground">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved. {BRAND.email}
          </p>
        </div>
        <button
          onClick={() => scrollToSection("hero")}
          className="text-xs text-muted-foreground transition-colors hover:text-highlight"
        >
          Back to top ↑
        </button>
      </div>
    </motion.footer>
  );
}
