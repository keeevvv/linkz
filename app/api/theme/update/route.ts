import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, themeData } = await req.json();

  const updatedTheme = await prisma.theme.upsert({
    where: { userId },
    update: { ...themeData },
    create: { userId, ...themeData },
  });

  return NextResponse.json(updatedTheme);
}
