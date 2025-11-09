import { writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { mkdir } from "fs/promises";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const type = req.nextUrl.searchParams.get("type") || "general";

    // Ubah file ke Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Pastikan direktori `public/uploads` ada
    const relativeUploadDir = path.join("/uploads", type);
    const uploadDir = path.join(process.cwd(), "public", relativeUploadDir);

    try {
      // Pastikan direktori ada
      await mkdir(uploadDir, { recursive: true });
    } catch (e: any) {
      if (e.code !== "EEXIST") {
        console.error("Error creating directory:", e);
        throw new Error("Failed to create upload directory");
      }
    }

    // Simpan file ke public/uploads dengan nama asli
    const filePath = path.join(uploadDir, file.name);
    await writeFile(filePath, buffer);

    // Buat URL yang bisa diakses publik
    const imageUrl = path.join(relativeUploadDir, file.name).replace(/\\/g, "/");

    // --- Conditional Database Update ---
    // Only update profile image if type is 'profile'
    if (type === "profile") {
      const sesion = await auth.api.getSession({
        headers: await headers(),
      });

      if (!sesion) {
        return NextResponse.json(
          { error: "unauthenticated for profile update" },
          { status: 401 }
        );
      }
      const userid = sesion.user.id;

      await prisma.user.update({
        where: { id: userid },
        data: {
          image: imageUrl,
        },
      });
    }

    // For all types (including 'link'), just return the URL
    return NextResponse.json({ success: true, url: imageUrl }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
