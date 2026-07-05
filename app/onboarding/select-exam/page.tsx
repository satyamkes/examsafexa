"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { cn } from "@/lib/utils";

type Exam = {
  id: string;
  name: string;
  code: string;
  category: string;
  examDate: string;
};

export default function SelectExamPage() {
  const router = useRouter();
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedExamId, setSelectedExamId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/exams")
      .then((response) => response.json())
      .then((payload) => setExams(payload.exams ?? []))
      .finally(() => setLoading(false));
  }, []);

  async function continueToCenters() {
    if (!selectedExamId) return;
    setSaving(true);
    const response = await fetch("/api/users/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ examSelected: selectedExamId }),
    });

    setSaving(false);
    if (response.ok) router.push("/onboarding/select-center");
  }

  return (
    <OnboardingShell
      activeStep={1}
      title="Choose your exam"
      subtitle="Pick the exam you are preparing for. This selection decides which centers appear next."
    >
      {loading ? (
        <Card className="p-8 text-navy-700/70">Loading exams...</Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {exams.map((exam) => (
            <ExamCard
              key={exam.id}
              exam={exam}
              selected={selectedExamId === exam.id}
              onSelect={() => setSelectedExamId(exam.id)}
            />
          ))}
        </div>
      )}

      <div className="sticky bottom-4 mt-2 flex justify-end">
        <Button type="button" size="lg" disabled={!selectedExamId || saving} onClick={continueToCenters}>
          {saving ? "Saving..." : "Continue to center selection"}
        </Button>
      </div>
    </OnboardingShell>
  );
}

function ExamCard({ exam, selected, onSelect }: { exam: Exam; selected: boolean; onSelect: () => void }) {
  const countdown = useMemo(() => {
    const examTime = new Date(exam.examDate).getTime();
    const days = Math.ceil((examTime - Date.now()) / (1000 * 60 * 60 * 24));
    if (days < 0) return "Date passed";
    if (days === 0) return "Today";
    return `${days} days left`;
  }, [exam.examDate]);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "min-h-48 rounded-2xl border p-5 text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-soft",
        selected
          ? "border-transparent bg-brand-gradient text-white"
          : "border-navy-900/10 bg-white text-navy-900"
      )}
    >
      <span
        className={cn(
          "inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-normal",
          selected ? "bg-white/20 text-white" : "bg-navy-50 text-navy-700"
        )}
      >
        {exam.category.replace("-", " ")}
      </span>
      <h2 className="mt-5 font-display text-3xl font-semibold">{exam.name}</h2>
      <p className={cn("mt-1 text-sm font-semibold", selected ? "text-white/70" : "text-navy-700/65")}>
        {exam.code}
      </p>
      <div className={cn("mt-8 flex items-center gap-2 text-sm font-semibold", selected ? "text-white" : "text-teal-700")}>
        <CalendarDays className="h-4 w-4" />
        {countdown}
      </div>
    </button>
  );
}
