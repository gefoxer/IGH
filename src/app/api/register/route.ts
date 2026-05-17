import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body.email?.toString().trim().toLowerCase();
    const username = body.username?.toString().trim();
    const password = body.password?.toString();

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }

    if (!username || username.length < 2) {
      return NextResponse.json({ error: "invalid_username" }, { status: 400 });
    }

    if (!password || password.length < MIN_PASSWORD_LENGTH) {
      return NextResponse.json({ error: "invalid_password" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "email_taken" }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        passwordHash,
        balance: 500,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(username)}`,
      },
    });

    return NextResponse.json(
      { id: user.id, email: user.email, username: user.username },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
