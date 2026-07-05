"use client";

import { motion } from "framer-motion";

// Placeholder testimonials — swap for real student quotes post-launch.
const TESTIMONIALS = [
  {
    quote:
      "I found three other people going to my center and we shared an auto on exam day. Genuinely calmed my nerves.",
    name: "Ritika P.",
    detail: "NEET UG aspirant, Prayagraj",
  },
  {
    quote:
      "Seeing the route a week early meant no last-minute panic about how to get there.",
    name: "Aman J.",
    detail: "JEE Main aspirant, Kanpur",
  },
  {
    quote:
      "My mother could see I'd reached safely without me having to call every ten minutes.",
    name: "Sneha K.",
    detail: "UPSC CSE aspirant, Lucknow",
  },
];

// Placeholder generic exam-category labels — not affiliated with any exam board.
const EXAM_LABELS = ["NEET", "JEE", "UPSC", "SSC", "State PCS"];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">
          Trusted By Students Preparing For
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {EXAM_LABELS.map((label) => (
            <span
              key={label}
              className="font-display text-lg font-semibold text-navy-900/30"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-2xl border border-navy-900/5 bg-white p-6 shadow-card"
          >
            <blockquote className="font-display text-base italic leading-relaxed text-navy-900">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-4 text-sm">
              <span className="font-semibold text-navy-900">{t.name}</span>
              <span className="text-navy-700/60"> — {t.detail}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
