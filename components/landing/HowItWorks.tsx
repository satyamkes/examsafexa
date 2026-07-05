"use client";

import { motion } from "framer-motion";
import { UserPlus, ListChecks, MapPinned, Users2 } from "lucide-react";

const STEPS = [
  {
    icon: UserPlus,
    title: "Register",
    copy: "Create your account in under a minute — just the basics, plus an optional parent/guardian email for the safety layer.",
  },
  {
    icon: ListChecks,
    title: "Select Exam & Center",
    copy: "Tell us which exam you're appearing for and the center you've been allotted.",
  },
  {
    icon: MapPinned,
    title: "See Your Route",
    copy: "Get the route to your center with live traffic and transit options, well before exam day.",
  },
  {
    icon: Users2,
    title: "Join Your Community",
    copy: "You're auto-matched with every other student at your exam and center — coordinate travel, share tips, calm the nerves.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">
          How It Works
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
          From registration to exam day, in four steps
        </h2>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative flex flex-col rounded-2xl border border-navy-900/5 bg-white p-6 shadow-card"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-gradient text-white">
                <step.icon className="h-5 w-5" />
              </div>
              <span className="font-display text-3xl font-semibold text-navy-900/10">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold text-navy-900">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-700/70">
              {step.copy}
            </p>
            {i < STEPS.length - 1 && (
              <div
                className="absolute right-[-14px] top-1/2 hidden h-px w-7 -translate-y-1/2 bg-navy-900/10 lg:block"
                aria-hidden="true"
              />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
