"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-navy-950">
      {/* Background image + navy gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2000&auto=format&fit=crop')",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-navy-gradient opacity-90" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start px-5 py-28 lg:px-8 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-white/15"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Exam Season: NEET &amp; JEE 2026 centers now live
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl font-display text-4xl font-semibold leading-[1.15] text-white sm:text-5xl lg:text-6xl"
        >
          Never travel alone
          <br />
          for an exam.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-xl text-base text-white/75 sm:text-lg"
        >
          Find your exam center, see the route before exam day, and get matched
          with other students headed to the same place — with an optional
          safety layer for solo travelers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
        >
          <Button size="lg" variant="gradient" asChild>
            <Link href="/register">Register Now</Link>
          </Button>
          <Button size="lg" variant="outlineLight" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </motion.div>

        {/* Carousel dots — stub for future multi-slide hero */}
        <div className="mt-16 flex gap-2" aria-hidden="true">
          <span className="h-1.5 w-6 rounded-full bg-white" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
        </div>
      </div>
    </section>
  );
}
