import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/api-auth";
import { toUserProfile } from "@/lib/user-data";

export async function GET() {
  const authResult = await requireSession();
  if ("error" in authResult) return authResult.error;

  const user = await prisma.user.findUnique({
    where: { id: authResult.userId },
    include: { library: true },
  });

  if (!user) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return NextResponse.json(toUserProfile(user, user.library));
}
