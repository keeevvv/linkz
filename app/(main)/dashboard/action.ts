"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// CREATE
export async function createLink(data: FormData, userId: string) {
  if (!userId) throw new Error("User ID tidak ditemukan.");

  await prisma.link.create({
    data: {
      title: String(data.get("title")),
      url: String(data.get("url")),
      description: String(data.get("description") || ""),
      position: Number(data.get("position")) || 0,
      visible: data.get("visible") === "true",
      userId, 
    },
  });

  revalidatePath("/dashboard");
}

// READ
export async function getLinks(userId: string) {
  return prisma.link.findMany({
    where: { userId },
    orderBy: { position: "asc" },
  });
}

// UPDATE
export async function updateLink(id: string, data: FormData) {
  await prisma.link.update({
    where: { id },
    data: {
      title: String(data.get("title")),
      url: String(data.get("url")),
      description: String(data.get("description") || ""),
      position: Number(data.get("position")) || 0,
      visible: data.get("visible") === "true",
    },
  });

  revalidatePath("/dashboard");
}

// DELETE
export async function deleteLink(id: string) {
  await prisma.link.delete({
    where: { id },
  });

  revalidatePath("/dashboard");
}
