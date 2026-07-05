"use client";

import { motion } from "framer-motion";
import { MapPin, Users, Building2, MapIcon, MessageCircleHeart } from "lucide-react";

// NOTE: Placeholder stats + city pins for Phase 1 — swap for real, live data in Phase 2.
const CITY_PINS = [
  { name: "Delhi NCR", top: "22%", left: "34%" },
  { name: "Prayagraj", top: "38%", left: "42%" },
  { name: "Mumbai", top: "58%", left: "22%" },
  { name: "Bengaluru", top: "78%", left: "34%" },
  { name: "Kolkata", top: "44%", left: "68%" },
  { name: "Hyderabad", top: "66%", left: "44%" },
];

const STATS = [
  { icon: Users, value: "500+", label: "Students onboarded", tone: "navy" },
  { icon: Building2, value: "120+", label: "Exam centers mapped", tone: "gradient" },
  { icon: MapIcon, value: "30+", label: "Cities covered", tone: "gradient" },
  { icon: MessageCircleHeart, value: "4", label: "Safety features", tone: "navy" },
] as const;

export function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Illustrated India map with pinned example cities — placeholder graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto aspect-[4/5] w-full max-w-md rounded-3xl bg-navy-50 p-6"
        >
          <svg
            viewBox="0 0 200 260"
            className="absolute inset-0 h-full w-full p-10 opacity-90"
            aria-hidden="true"
          >
            {/* Simplified, illustrative landmass silhouette — not geographically precise */}
            <path
              d="M100 5 C130 5 145 25 150 45 C165 55 175 75 168 95 C185 100 190 125 178 145 C182 165 170 185 150 195 C148 215 130 235 108 240 C95 250 78 250 68 238 C50 232 40 215 42 195 C25 188 18 168 28 150 C15 138 15 115 30 100 C25 80 38 60 58 52 C60 32 78 12 100 5 Z"
              fill="white"
              stroke="#0F2A5E"
              strokeOpacity="0.12"
              strokeWidth="2"
            />
          </svg>

          {CITY_PINS.map((pin) => (
            <div
              key={pin.name}
              className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center"
              style={{ top: pin.top, left: pin.left }}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-gradient text-white shadow-soft">
                <MapPin className="h-3.5 w-3.5" />
              </div>
              <span className="mt-1 whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-navy-900 shadow-card">
                {pin.name}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Stat grid */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">
            Program Snapshot
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
            A growing community, city by city
          </h2>
          <p className="mt-4 text-navy-700/70">
            Illustrative figures shown below — updated live once centers go
            active each exam season.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={
                  stat.tone === "navy"
                    ? "rounded-2xl bg-navy-900 p-5 text-white"
                    : "rounded-2xl bg-brand-gradient-diag p-5 text-white"
                }
              >
                <stat.icon className="h-5 w-5 opacity-90" />
                <div className="mt-3 font-display text-3xl font-semibold">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
