"use client";

import { motion } from "framer-motion";
import { ShieldCheck, MapPinned, UsersRound, BadgeCheck } from "lucide-react";

const FEATURES = [
  {
    icon: MapPinned,
    title: "Optional live location sharing",
    copy: "Turn it on only for the journey to your center, and turn it off right after. Nothing is tracked by default.",
  },
  {
    icon: ShieldCheck,
    title: "Parent/guardian visibility",
    copy: "Add one trusted email at signup. If you opt in, they — and only they — can follow your journey.",
  },
  {
    icon: UsersRound,
    title: "Group travel matching",
    copy: "Prefer not to travel solo? Get matched with others from your community heading the same way.",
  },
  {
    icon: BadgeCheck,
    title: "Verified-student badge",
    copy: "A lightweight verification concept for communities, so everyone knows who they're coordinating with.",
  },
];

export function SafetySection() {
  return (
    <section id="safety" className="bg-rose-50 py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-rose-600">
            Safety, Especially For Solo Travelers
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
            Stay safe on the way — entirely on your terms
          </h2>
          <p className="mt-4 text-navy-700/70">
            Every feature below is opt-in. We built this layer with women
            traveling to unfamiliar exam centers in mind, but it's here for
            any student who wants the extra reassurance.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl bg-white p-6 shadow-card"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-200/70">
                <f.icon className="h-5 w-5 text-rose-600" />
              </div>
              <h3 className="mt-5 font-display text-base font-semibold text-navy-900">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-700/70">
                {f.copy}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Reassurance banner — mint/teal notice pattern, per brief Section 3 */}
        <div className="mx-auto mt-10 flex max-w-3xl items-center gap-4 rounded-2xl bg-teal-500/10 px-6 py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900">
            <ShieldCheck className="h-4 w-4 text-white" />
          </div>
          <p className="text-center text-sm text-navy-700/80 sm:text-left">
            Live location sharing is fully optional and only ever visible to
            the parent/guardian email you choose to add. You can switch it off
            at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
