"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";

const registerSchema = z.object({
  name: z.string().min(2, "Enter your full name."),
  email: z.string().email("Enter a valid email."),
  phone: z.string().min(8, "Enter a valid phone number."),
  password: z.string().min(8, "Use at least 8 characters."),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]).optional(),
  parentEmail: z.string().email("Enter a valid email.").optional().or(z.literal("")),
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      parentEmail: "",
    },
  });

  async function onSubmit(values: RegisterValues) {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setError("root", { message: payload?.message ?? "Registration failed." });
      return;
    }

    const signInResult = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInResult?.error) {
      setError("root", { message: "Account created, but sign-in failed. Please log in." });
      return;
    }
    router.push("/onboarding/select-exam");
  }

  return (
    <OnboardingShell
      activeStep={0}
      title="Create your student account"
      subtitle="Start with the basics. You will choose your exam and center in the next two steps."
    >
      <Card className="max-w-3xl p-5 sm:p-8">
        <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" error={errors.name?.message}>
              <input className={inputClassName} autoComplete="name" {...register("name")} />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <input className={inputClassName} type="email" autoComplete="email" {...register("email")} />
            </Field>
            <Field label="Phone" error={errors.phone?.message}>
              <input className={inputClassName} type="tel" autoComplete="tel" {...register("phone")} />
            </Field>
            <Field label="Password" error={errors.password?.message}>
              <input className={inputClassName} type="password" autoComplete="new-password" {...register("password")} />
            </Field>
          </div>

          <Field label="Gender (optional)" error={errors.gender?.message}>
            <Select
              value={watch("gender")}
              onValueChange={(value) => setValue("gender", value as RegisterValues["gender"], { shouldValidate: true })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose only if you want to" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-rose-600" />
              <Field
                label="Parent/guardian email (optional)"
                error={errors.parentEmail?.message}
                helper="This powers the women-safety live-location alerts introduced on the homepage. You can skip it now and add it later."
              >
                <input className={inputClassName} type="email" autoComplete="email" {...register("parentEmail")} />
              </Field>
            </div>
          </div>

          {errors.root?.message ? <p className="text-sm font-semibold text-rose-600">{errors.root.message}</p> : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Continue to exam selection"}
            </Button>
            <Link href="/login" className="text-sm font-semibold text-teal-600 hover:underline">
              Already have an account?
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
  helper,
  error,
  children,
}: {
  label: string;
  helper?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-left text-sm font-semibold text-navy-900">
      <span>{label}</span>
      {children}
      {helper ? <span className="text-xs leading-5 font-medium text-navy-700/65">{helper}</span> : null}
      {error ? <span className="text-xs font-semibold text-rose-600">{error}</span> : null}
    </label>
  );
}
