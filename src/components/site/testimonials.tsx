import { Star1 } from "iconsax-reactjs";
import { TESTIMONIALS } from "./data";
import { Section, SectionHeading } from "./primitives";

function TestimonialCard({ t, i }: { t: (typeof TESTIMONIALS)[number]; i: number }) {
  return (
    <figure
      key={i}
      className="glass-panel w-[19rem] shrink-0 rounded-3xl p-6 sm:w-[22rem]"
    >
      <div className="flex gap-1 text-highlight">
        {[0, 1, 2, 3, 4].map((s) => (
          <Star1 key={s} size={16} variant="Bold" color="currentColor" />
        ))}
      </div>
      <blockquote className="mt-4 text-sm text-pretty text-muted-foreground sm:text-base">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-destructive font-display text-xs font-bold text-destructive-foreground">
          {t.name.charAt(0)}
        </span>
        <span className="text-sm">
          <span className="font-semibold">{t.name}</span>
          <span className="block text-xs text-muted-foreground">{t.place}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <Section id="testimonials" className="overflow-hidden">
      <SectionHeading
        eyebrow="Word on the street"
        title="What the crate crowd says."
      />

      <div className="relative mt-12 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="animate-marquee flex w-max gap-4 hover:[animation-play-state:paused]">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={`a-${i}`} t={t} i={i} />
          ))}
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={`b-${i}`} t={t} i={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}
