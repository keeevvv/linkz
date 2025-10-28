import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username } = await req.json();

  const existing = await prisma.user.findUnique({
    where: { username },
  });

  return NextResponse.json({ exists: !!existing });
}
