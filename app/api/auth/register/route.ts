import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export const dynamic = "force-dynamic";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  password: z.string().min(8),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]).optional().or(z.literal("")),
  parentEmail: z.string().email().optional().or(z.literal("")),
});

export async function POST(request: Request) {
  try {
    const payload = registerSchema.parse(await request.json());
    await connectToDatabase();

    const email = payload.email.toLowerCase().trim();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "An account with this email already exists." }, { status: 409 });
    }

    const password = await bcrypt.hash(payload.password, 12);
    const user = await User.create({
      name: payload.name.trim(),
      email,
      phone: payload.phone.trim(),
      password,
      gender: payload.gender || undefined,
      parentEmail: payload.parentEmail || undefined,
      liveLocationOptIn: Boolean(payload.parentEmail),
    });

    return NextResponse.json(
      {
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Please check the form fields and try again." }, { status: 400 });
    }

    return NextResponse.json({ message: "Could not create your account right now." }, { status: 500 });
  }
}
