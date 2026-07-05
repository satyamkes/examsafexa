import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { CalendarDays, MapPin, ShieldCheck } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  await connectToDatabase();
  const user = (await User.findById(session.user.id).populate("examSelected").populate("examCenterSelected").lean()) as any;
  if (!user) redirect("/login");

  const exam = user.examSelected as any;
  const center = user.examCenterSelected as any;

  return (
    <main className="min-h-screen bg-cloud px-5 py-8 text-navy-900">
      <div className="mx-auto grid max-w-6xl gap-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-teal-600">ExamSafexa dashboard</p>
            <h1 className="font-display text-4xl font-semibold">Hi, {user.name}</h1>
          </div>
          <Button asChild>
            <Link href="/onboarding/select-exam">Update exam setup</Link>
          </Button>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          <DashboardCard
            icon={<CalendarDays className="h-5 w-5" />}
            label="Selected exam"
            value={exam?.name ?? "Not selected"}
            detail={exam?.examDate ? new Date(exam.examDate).toLocaleDateString("en-IN", { dateStyle: "medium" }) : "Choose your exam to continue"}
          />
          <DashboardCard
            icon={<MapPin className="h-5 w-5" />}
            label="Exam center"
            value={center?.name ?? "Not selected"}
            detail={center ? `${center.city}, ${center.state}` : "Select your center after exam selection"}
          />
          <DashboardCard
            icon={<ShieldCheck className="h-5 w-5" />}
            label="Safety contact"
            value={user.parentEmail ?? "Optional"}
            detail={user.parentEmail ? "Ready for live-location alerts in Phase 3" : "Add later from profile settings"}
          />
        </div>

        <Card className="p-6">
          <h2 className="font-display text-3xl font-semibold">Phase 4 dashboard coming next</h2>
          <p className="mt-2 max-w-2xl text-navy-700/70">
            Your exam and center choices are saved. Community matching, journey mode, and richer dashboard views are intentionally reserved for the next phases.
          </p>
        </Card>
      </div>
    </main>
  );
}

function DashboardCard({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <Card className="p-5">
      <div className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-teal-50 text-teal-700">
        {icon}
      </div>
      <p className="text-xs font-bold uppercase tracking-normal text-navy-700/50">{label}</p>
      <h2 className="mt-2 text-xl font-semibold">{value}</h2>
      <p className="mt-2 text-sm text-navy-700/65">{detail}</p>
    </Card>
  );
}
