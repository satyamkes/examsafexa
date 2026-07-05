import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export const dynamic = "force-dynamic";

const updateSchema = z.object({
  examSelected: z.string().optional(),
  examCenterSelected: z.string().optional(),
  parentEmail: z.string().email().optional().or(z.literal("")),
  liveLocationOptIn: z.boolean().optional(),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "You need to be signed in." }, { status: 401 });
  }

  await connectToDatabase();
  const user = (await User.findById(session.user.id).lean()) as any;
  if (!user) {
    return NextResponse.json({ message: "User not found." }, { status: 404 });
  }

  return NextResponse.json({
    id: String(user._id),
    name: user.name,
    email: user.email,
    parentEmail: user.parentEmail,
    liveLocationOptIn: user.liveLocationOptIn,
    examSelected: user.examSelected ? String(user.examSelected) : undefined,
    examCenterSelected: user.examCenterSelected ? String(user.examCenterSelected) : undefined,
  });
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "You need to be signed in." }, { status: 401 });
  }

  const payload = updateSchema.parse(await request.json());
  await connectToDatabase();

  const updates = {
    ...payload,
    parentEmail: payload.parentEmail || undefined,
  };

  const user = await User.findByIdAndUpdate(session.user.id, updates, { new: true });

  if (!user) {
    return NextResponse.json({ message: "User not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
