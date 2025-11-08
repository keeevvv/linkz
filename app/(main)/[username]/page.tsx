
import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";
import UserProfile from './UserProfile';

console.log("Prisma instance:", prisma);

export default async function UserLinkPage(props: {
  params: { username: string } | Promise<{ username: string }>;
}) {
  const resolvedParams = await props.params;
  const { username } = resolvedParams;

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      links: true,
      theme: true,
    },
  });

  if (!user) {
    notFound();
  }
  return <UserProfile user={user} />;
}

  