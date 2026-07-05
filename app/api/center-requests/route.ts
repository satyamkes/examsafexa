import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import CenterRequest from "@/models/CenterRequest";

export const dynamic = "force-dynamic";

const requestSchema = z.object({
  examId: z.string().min(1),
  centerName: z.string().min(2),
  city: z.string().min(2),
  state: z.string().optional(),
  note: z.string().optional(),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "You need to be signed in." }, { status: 401 });
  }

  const payload = requestSchema.parse(await request.json());
  await connectToDatabase();
  await CenterRequest.create({ ...payload, userId: session.user.id });

  return NextResponse.json({ ok: true }, { status: 201 });
}
