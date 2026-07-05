"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CenterPicker, type CenterOption } from "@/components/map/CenterPicker";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { cn } from "@/lib/utils";

type UserPayload = {
  examSelected?: string;
};

export default function SelectCenterPage() {
  const router = useRouter();
  const [examId, setExamId] = useState("");
  const [centers, setCenters] = useState<CenterOption[]>([]);
  const [selectedCenterId, setSelectedCenterId] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/users/me");
      const payload: UserPayload = await response.json();
      if (!payload.examSelected) {
        router.replace("/onboarding/select-exam");
        return;
      }

      setExamId(payload.examSelected);
      const centersResponse = await fetch(`/api/exam-centers?examId=${payload.examSelected}`);
      const centersPayload = await centersResponse.json();
      setCenters(centersPayload.centers ?? []);
      setLoading(false);
    }

    load();
  }, [router]);

  const filteredCenters = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) return centers;
    return centers.filter((center) =>
      [center.name, center.address, center.city, center.state].join(" ").toLowerCase().includes(normalizedQuery)
    );
  }, [centers, query]);

  const handleSelect = useCallback((centerId: string) => setSelectedCenterId(centerId), []);

  async function completeOnboarding() {
    if (!selectedCenterId) return;
    setSaving(true);
    const response = await fetch("/api/users/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ examCenterSelected: selectedCenterId }),
    });

    setSaving(false);
    if (response.ok) router.push("/dashboard");
  }

  return (
    <OnboardingShell
      activeStep={2}
      title="Choose your exam center"
      subtitle="Search the center list or select a pin on the map. Your community will use this later."
    >
      {loading ? (
        <Card className="p-8 text-navy-700/70">Loading centers...</Card>
      ) : centers.length ? (
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <Card className="p-4">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-navy-700/45" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-11 w-full rounded-xl border border-navy-900/10 bg-white pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Search by center, city, or state"
              />
            </label>

            <div className="mt-4 grid max-h-[520px] gap-3 overflow-auto pr-1">
              {filteredCenters.map((center) => (
                <button
                  key={center.id}
                  type="button"
                  onClick={() => setSelectedCenterId(center.id)}
                  className={cn(
                    "rounded-2xl border p-4 text-left transition hover:border-teal-500",
                    selectedCenterId === center.id
                      ? "border-teal-500 bg-teal-50"
                      : "border-navy-900/10 bg-white"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-teal-600" />
                    <div>
                      <p className="font-semibold text-navy-900">{center.name}</p>
                      <p className="mt-1 text-sm text-navy-700/70">{center.address}</p>
                      <p className="mt-2 text-xs font-bold uppercase tracking-normal text-navy-700/55">
                        {center.city}, {center.state}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <CenterPicker centers={filteredCenters} selectedCenterId={selectedCenterId} onSelect={handleSelect} />
        </div>
      ) : (
        <EmptyCenterState examId={examId} />
      )}

      {centers.length ? (
        <div className="sticky bottom-4 mt-2 flex justify-end">
          <Button type="button" size="lg" disabled={!selectedCenterId || saving} onClick={completeOnboarding}>
            {saving ? "Saving..." : "Finish setup"}
          </Button>
        </div>
      ) : null}
    </OnboardingShell>
  );
}

function EmptyCenterState({ examId }: { examId: string }) {
  const [centerName, setCenterName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [sent, setSent] = useState(false);

  async function submitRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch("/api/center-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ examId, centerName, city, state }),
    });

    if (response.ok) setSent(true);
  }

  return (
    <Card className="max-w-2xl p-6 sm:p-8">
      <h2 className="font-display text-3xl font-semibold">No centers are listed for this exam yet</h2>
      <p className="mt-2 text-navy-700/70">
        Tell us the center you need and we will keep it in the review queue.
      </p>
      {sent ? (
        <p className="mt-5 rounded-2xl bg-teal-50 p-4 text-sm font-semibold text-teal-700">
          Request saved. You can check back after centers are added.
        </p>
      ) : (
        <form className="mt-6 grid gap-4" onSubmit={submitRequest}>
          <input className={inputClassName} value={centerName} onChange={(event) => setCenterName(event.target.value)} placeholder="Center name" required />
          <div className="grid gap-4 sm:grid-cols-2">
            <input className={inputClassName} value={city} onChange={(event) => setCity(event.target.value)} placeholder="City" required />
            <input className={inputClassName} value={state} onChange={(event) => setState(event.target.value)} placeholder="State" />
          </div>
          <Button type="submit">Request this center be added</Button>
        </form>
      )}
    </Card>
  );
}

const inputClassName =
  "h-11 w-full rounded-xl border border-navy-900/10 bg-white px-3 text-sm text-navy-900 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500";
