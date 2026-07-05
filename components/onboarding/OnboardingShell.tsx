import Link from "next/link";
import { cn } from "@/lib/utils";

const steps = ["Register", "Exam", "Center"];

export function OnboardingShell({
  activeStep,
  title,
  subtitle,
  children,
}: {
  activeStep: number;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-cloud px-5 py-8 text-navy-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <Link href="/" className="text-sm font-semibold text-teal-600 hover:underline">
          ExamSafexa
        </Link>

        <div className="grid gap-3 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step}
              className={cn(
                "rounded-2xl border border-navy-900/10 bg-white px-4 py-3 text-sm font-semibold text-navy-700 shadow-sm",
                index <= activeStep && "border-transparent bg-brand-gradient text-white shadow-soft"
              )}
            >
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs">
                {index + 1}
              </span>
              {step}
            </div>
          ))}
        </div>

        <header className="max-w-2xl">
          <h1 className="font-display text-4xl font-semibold tracking-normal sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-base leading-7 text-navy-700/75">{subtitle}</p>
        </header>

        {children}
      </div>
    </main>
  );
}
