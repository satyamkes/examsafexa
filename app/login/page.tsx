"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email."),
  password: z.string().min(1, "Enter your password."),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(values: LoginValues) {
    const result = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (result?.error) {
      setError("root", { message: "Email or password is incorrect." });
      return;
    }

    router.push("/dashboard");
  }

  return (
    <OnboardingShell
      activeStep={0}
      title="Welcome back"
      subtitle="Sign in to continue your exam-day setup or return to your student dashboard."
    >
      <Card className="max-w-xl p-5 sm:p-8">
        <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
          <Field label="Email" error={errors.email?.message}>
            <input className={inputClassName} type="email" autoComplete="email" {...register("email")} />
          </Field>
          <Field label="Password" error={errors.password?.message}>
            <input className={inputClassName} type="password" autoComplete="current-password" {...register("password")} />
          </Field>
          {errors.root?.message ? <p className="text-sm font-semibold text-rose-600">{errors.root.message}</p> : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
            <Link href="/forgot-password" className="text-sm font-semibold text-teal-600 hover:underline">
              Forgot password?
            </Link>
          </div>
        </form>
      </Card>
    </OnboardingShell>
  );
}

const inputClassName =
  "h-11 w-full rounded-xl border border-navy-900/10 bg-white px-3 text-sm text-navy-900 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-left text-sm font-semibold text-navy-900">
      <span>{label}</span>
      {children}
      {error ? <span className="text-xs font-semibold text-rose-600">{error}</span> : null}
    </label>
  );
}
