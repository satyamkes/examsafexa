import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-4 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-navy-gradient px-8 py-16 text-center sm:px-16">
        <div
          className="absolute -top-24 right-[-10%] h-64 w-64 rounded-full bg-brand-gradient opacity-20 blur-3xl"
          aria-hidden="true"
        />
        <h2 className="mx-auto max-w-xl font-display text-3xl font-semibold text-white sm:text-4xl">
          Exam season is coming. Find your people before you find your seat.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-white/70">
          It takes under a minute to register and get matched with your exam
          community.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" variant="gradient" asChild>
            <Link href="/register">Register Now</Link>
          </Button>
          <Button size="lg" variant="outlineLight" asChild>
            <Link href="/how-it-works">See How It Works</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
