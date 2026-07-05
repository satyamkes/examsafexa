import Link from "next/link";

// Standalone version of the "How It Works" page, for deep-linking from ads/social.
// Phase 1 keeps this minimal — the in-page #how-it-works section on the landing
// page is the primary experience for now.
export default function HowItWorksPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cloud px-5 text-center">
      <h1 className="font-display text-3xl font-semibold text-navy-900">
        See the full walkthrough on the homepage
      </h1>
      <p className="mt-3 max-w-md text-navy-700/70">
        A dedicated version of this page can be expanded in a later phase.
      </p>
      <Link
        href="/#how-it-works"
        className="mt-6 text-sm font-semibold text-teal-600 hover:underline"
      >
        ← Go to How It Works section
      </Link>
    </main>
  );
}
