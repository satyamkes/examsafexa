"use client";

import { motion } from "framer-motion";
import { Users, MapPin, MessageSquare } from "lucide-react";

// Placeholder mock data for the illustrative community card — not real users.
const AVATAR_INITIALS = ["RP", "SK", "AJ", "MV", "TN"];

export function CommunityHighlight() {
  return (
    <section id="community" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">
            Your Exam Community
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
            You're not the only one going to that center
          </h2>
          <p className="mt-4 max-w-lg text-navy-700/70">
            The moment you select your exam and center, ExamSafexa auto-matches
            you with every other student headed to the same place — so you can
            plan travel together, swap centre tips, and walk in a little less
            nervous.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              "Matched automatically by exam + exact center — no searching.",
              "Coordinate a shared auto, train, or meetup point if you'd like.",
              "Ask questions about parking, entry gates, and timing from people who'll be there too.",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm text-navy-700/80">
                <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Mock community card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto w-full max-w-sm rounded-3xl border border-navy-900/5 bg-white p-6 shadow-soft"
        >
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-600">
              NEET UG 2026
            </span>
            <Users className="h-4 w-4 text-navy-900/40" />
          </div>

          <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">
            Govt. Model School, Civil Lines
          </h3>
          <p className="mt-1 flex items-center gap-1 text-xs text-navy-700/60">
            <MapPin className="h-3.5 w-3.5" />
            Prayagraj, Uttar Pradesh
          </p>

          <div className="mt-5 flex items-center">
            <div className="flex -space-x-3">
              {AVATAR_INITIALS.map((initials, i) => (
                <div
                  key={initials}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-navy-900 text-[11px] font-semibold text-white"
                  style={{ zIndex: AVATAR_INITIALS.length - i }}
                >
                  {initials}
                </div>
              ))}
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-brand-gradient text-[11px] font-semibold text-white">
                +38
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm text-navy-700/70">
            <span className="font-semibold text-navy-900">43 students</span>{" "}
            matched to this center · community formed 12 days before exam day
          </p>
        </motion.div>
      </div>
    </section>
  );
}
