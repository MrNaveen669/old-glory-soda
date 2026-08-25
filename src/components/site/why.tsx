import { motion } from "motion/react";
import { Flash, Milk, Sun1, Tree } from "iconsax-reactjs";
import type { Icon } from "iconsax-reactjs";
import { FEATURES } from "./data";
import { Section, SectionHeading } from "./primitives";

const ICONS: Record<string, Icon> = {
  leaf: Tree,
  bottle: Milk,
  sun: Sun1,
  flash: Flash,
};

export function Why() {
  return (
    <Section id="why">
      <SectionHeading
        eyebrow="Why Old Glory"
        title="Purani Soch. Naya Andaaz."
        intro="Jo taste pehle generation ko yaad tha, wahi taste aaj ki generation ke liye naye andaaz mein."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => {
          const Icon = ICONS[f.icon] ?? Flash;
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="glass-panel group relative overflow-hidden rounded-3xl p-6"
            >
              <span
                aria-hidden
                className="absolute -top-16 -right-10 h-32 w-32 rounded-full bg-primary/20 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
              />
              <motion.span
                className="relative grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary"
                whileHover={{ rotate: -8, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
              >
                <Icon size={26} variant="Linear" color="currentColor" />
              </motion.span>
              <h3 className="relative mt-5 font-display text-lg font-semibold">{f.title}</h3>
              <p className="relative mt-2 text-sm text-muted-foreground">{f.body}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
