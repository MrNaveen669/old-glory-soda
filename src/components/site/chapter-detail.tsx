import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Location } from "iconsax-reactjs";
import { STORY_CHAPTERS, type StoryChapter } from "./story-chapters";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export function ChapterDetail({ chapterId }: { chapterId: string }) {
  const chapter: StoryChapter = (STORY_CHAPTERS[chapterId] ?? STORY_CHAPTERS["roadside-roots"])!;

  return (
    <div className="min-h-screen bg-[#F6EFDD] text-[#1A1A1A] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Full-bleed Hero Band with Sepia Illustration Watermark Overlay */}
        <section className="relative overflow-hidden bg-[#182017] text-[#F6EFDD] py-24 sm:py-32 border-b-2 border-[#D8C8A6]/30">
          {/* Background Full-Bleed Sepia Illustration Watermark */}
          <div className="pointer-events-none absolute inset-0 opacity-25 overflow-hidden">
            <img
              src={chapter.bgImage}
              alt={`${chapter.title} vintage illustration hero background`}
              className="h-full w-full object-cover filter sepia-[0.75] contrast-[1.2] scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#182017] via-[#182017]/75 to-[#182017]" />
          </div>

          <div className="relative mx-auto max-w-5xl px-6 text-center">
            {/* Back Link */}
            <div className="mb-6 inline-flex">
              <Link
                to="/"
                hash="story"
                className="inline-flex items-center gap-2 rounded-full border border-[#F6EFDD]/30 bg-[#242E23]/80 px-4 py-2 text-xs font-bold tracking-widest text-[#E0A76A] uppercase backdrop-blur-sm transition-all hover:bg-[#7A1F1F] hover:text-[#F6EFDD] hover:border-transparent min-h-[44px]"
              >
                <ArrowLeft size={16} variant="Linear" />
                Back to Our Story Timeline
              </Link>
            </div>

            {/* Chapter Era & Number Badges */}
            <div className="flex items-center justify-center gap-3">
              <span className="rounded-full bg-[#7A1F1F] px-4 py-1.5 font-display text-sm font-black text-[#F6EFDD] shadow-md">
                CHRONICLE {chapter.num}
              </span>
              <span className="rounded-full border border-[#E0A76A]/40 bg-[#182017]/80 px-4 py-1.5 text-xs font-bold tracking-widest text-[#E0A76A] uppercase backdrop-blur-sm">
                ERA · {chapter.era}
              </span>
            </div>

            {/* Chapter Headline */}
            <h1 className="mt-6 font-display text-4xl font-black uppercase tracking-tight sm:text-6xl text-[#F6EFDD]">
              {chapter.title}
            </h1>

            <p className="mx-auto mt-4 max-w-2xl font-brand text-2xl sm:text-3xl text-[#E0A76A]">
              “{chapter.subtitle}”
            </p>
          </div>
        </section>

        {/* Narrative & Content Body Section */}
        <section className="py-16 sm:py-24 px-6 bg-[#F9F3E5]">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-3xl border-2 border-[#D8C8A6] bg-[#F6EFDD] p-8 sm:p-12 shadow-xl">
              <div className="flex items-center gap-2 border-b border-[#D8C8A6]/60 pb-4 text-xs font-extrabold tracking-widest text-[#7A1F1F] uppercase">
                <span className="h-2 w-2 rounded-full bg-[#7A1F1F] animate-pulse" />
                Old Glory Bottling Works Archive · Chapter {chapter.num}
              </div>

              <div className="mt-8 space-y-6 text-base sm:text-lg leading-relaxed text-[#4A3525]">
                {chapter.paragraphs.map((p, idx) => (
                  <p key={idx} className="first-letter:font-display first-letter:text-4xl first-letter:font-bold first-letter:text-[#7A1F1F] first-letter:mr-1">
                    {p}
                  </p>
                ))}
              </div>

              {/* Decorative Stamp Quote */}
              <div className="mt-10 rounded-2xl border-2 border-dashed border-[#7A1F1F]/40 bg-[#EAE0C8]/40 p-6 text-center">
                <p className="font-display text-sm uppercase tracking-wider text-[#7A1F1F]">
                  “Pop the goli. Keep the glory.”
                </p>
                <p className="mt-1 text-xs text-[#5C4A38] uppercase tracking-widest">
                  Est. 1962 · Handcrafted Indian Refreshment
                </p>
              </div>
            </div>

            {/* Supporting Illustration Gallery Row */}
            <div className="mt-16">
              <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#1A1A1A] text-center mb-6">
                Chapter Illustration Archive
              </h3>
              <div className="grid gap-6 sm:grid-cols-3">
                {chapter.galleryImages.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group overflow-hidden rounded-2xl border border-[#D8C8A6] bg-[#F6EFDD] p-3 text-center shadow-md"
                  >
                    <div className="overflow-hidden rounded-xl bg-[#EAE0C8]/60 p-2">
                      <img
                        src={img.src}
                        alt={img.caption}
                        className="h-36 w-full object-contain filter sepia-[0.5] contrast-[1.1] transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-3 text-xs font-bold text-[#5C4A38] uppercase tracking-wide">
                      {img.caption}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom Sequential Chapter Navigation */}
            <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t-2 border-[#D8C8A6] pt-8">
              <Link
                to={`/story/${chapter.prevChapter.id}` as any}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#7A1F1F] bg-[#F6EFDD] px-6 py-3.5 text-xs font-bold tracking-wider text-[#7A1F1F] uppercase shadow-md transition-all hover:bg-[#7A1F1F] hover:text-[#F6EFDD] min-h-[44px]"
              >
                <ArrowLeft size={16} variant="Linear" />
                Previous: {chapter.prevChapter.title}
              </Link>

              <Link
                to="/"
                hash="story"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-extrabold tracking-widest text-[#5C4A38] uppercase hover:text-[#7A1F1F] min-h-[44px]"
              >
                All Chapters Index
              </Link>

              <Link
                to={`/story/${chapter.nextChapter.id}` as any}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#7A1F1F] px-6 py-3.5 text-xs font-bold tracking-wider text-[#F6EFDD] uppercase shadow-md transition-all hover:bg-[#5E1717] hover:scale-105 min-h-[44px]"
              >
                Next: {chapter.nextChapter.title}
                <ArrowRight size={16} variant="Linear" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
