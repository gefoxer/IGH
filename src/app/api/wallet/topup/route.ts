import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/api-auth";
import { toUserProfile } from "@/lib/user-data";

export async function POST(request: Request) {
  const authResult = await requireSession();
  if ("error" in authResult) return authResult.error;

  try {
    const body = await request.json();
    const amount = Math.round(Number(body.amount));

    if (!amount || amount < 100) {
      return NextResponse.json({ error: "invalid_amount" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: authResult.userId },
      data: { balance: { increment: amount } },
      include: { library: true },
    });

    return NextResponse.json(toUserProfile(user, user.library));
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
