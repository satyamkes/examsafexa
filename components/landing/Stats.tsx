"use client";

import { motion } from "framer-motion";
import { MapPin, Users, Building2, MapIcon, MessageCircleHeart } from "lucide-react";

const CITY_PINS = [
  { name: "Delhi NCR", top: "28%", left: "39%" },
  { name: "Prayagraj", top: "43%", left: "50%" },
  { name: "Mumbai", top: "63%", left: "34%" },
  { name: "Bengaluru", top: "82%", left: "43%" },
  { name: "Kolkata", top: "51%", left: "71%" },
  { name: "Hyderabad", top: "68%", left: "49%" },
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
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-navy-900/10 bg-navy-50 shadow-card"
        >
          <iframe
            title="India exam center coverage map"
            aria-label="OpenStreetMap view of India with highlighted ExamSafexa cities"
            className="absolute inset-0 h-full w-full scale-[1.02] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.openstreetmap.org/export/embed.html?bbox=67.0%2C6.0%2C98.0%2C37.5&layer=mapnik"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-navy-900/10" />
          <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-navy-900 shadow-card">
            Live India map
          </div>

          {CITY_PINS.map((pin) => (
            <div
              key={pin.name}
              className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-full flex-col items-center"
              style={{ top: pin.top, left: pin.left }}
            >
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-white shadow-soft ring-4 ring-white/80">
                <span className="absolute h-12 w-12 rounded-full bg-teal-500/20" />
                <MapPin className="relative h-4 w-4" />
              </div>
              <span className="mt-1 whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-navy-900 shadow-card">
                {pin.name}
              </span>
            </div>
          ))}

          <a
            className="absolute bottom-4 right-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-teal-700 shadow-card hover:text-navy-900"
            href="https://www.openstreetmap.org/#map=5/22.973/78.657"
            target="_blank"
            rel="noreferrer"
          >
            Open map
          </a>
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
