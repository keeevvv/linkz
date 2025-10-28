import { writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const sesion = await auth.api.getSession({
      headers: await headers(),
    });

    if (!sesion) {
      return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
    }

    const userid = sesion.user.id;
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Ubah file ke Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Pastikan direktori `public/uploads` ada
    const uploadDir = path.join(process.cwd(), "public/profile");

    // Simpan file ke public/uploads dengan nama asli
    const filePath = path.join(uploadDir, file.name);
    await writeFile(filePath, buffer);

    // Buat URL yang bisa diakses publik
    const imageUrl = `/profile/${file.name}`;

    await prisma.user.update({
      where: { id: userid },
      data: {
        image: imageUrl,
      },
    });

    return NextResponse.json({ success: true, url: imageUrl }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
