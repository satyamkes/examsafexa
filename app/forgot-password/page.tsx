import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-cloud px-5 text-center text-navy-900">
      <div className="max-w-md">
        <h1 className="font-display text-4xl font-semibold">Password reset is coming next</h1>
        <p className="mt-3 text-navy-700/70">
          For Phase 2, sign in with your existing password. Password reset will fit into the next auth polish pass.
        </p>
        <Link href="/login" className="mt-6 inline-flex text-sm font-semibold text-teal-600 hover:underline">
          Back to login
        </Link>
      </div>
    </main>
  );
}
