import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import ExamCenter from "@/models/ExamCenter";

export const dynamic = "force-dynamic";

const querySchema = z.object({
  examId: z.string().min(1),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({ examId: searchParams.get("examId") });

  if (!parsed.success) {
    return NextResponse.json({ message: "examId is required." }, { status: 400 });
  }

  await connectToDatabase();
  const centers = (await ExamCenter.find({ examIds: parsed.data.examId }).sort({ city: 1, name: 1 }).lean()) as any[];

  return NextResponse.json({
    centers: centers.map((center) => ({
      id: String(center._id),
      name: center.name,
      address: center.address,
      city: center.city,
      state: center.state,
      lat: center.lat,
      lng: center.lng,
    })),
  });
}
