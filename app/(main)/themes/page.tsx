import ThemeEditor from "@/components/ui/themeEditor";
import { Prisma, User } from "@/generated/prisma/client";
import { checkSession } from "@/lib/checkSesion";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function ThemePage() {
  const sesion = await checkSession();
  if (!sesion) {
    redirect("/login");
  }

  const username = sesion.user.username;
  if (!username) {
    throw new Error("No username in session");
  }

  const user = await prisma.user.findUnique({
    where: { username },
    include: { links: true, theme: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return <ThemeMain user={user} />;
}

type UserWithThemeAndLinks = Prisma.UserGetPayload<{
  include: {
    links: true;
    theme: true;
  };
}>;
// Buat komponen server untuk main
function ThemeMain({ user }: { user: UserWithThemeAndLinks }) {
  return (
    <main className="min-h-screen p-4 pt-12 md:pt-24 bg-gradient-to-br from-gray-100 via-gray-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950">
      <div className="w-full max-w-5xl mx-auto">
        <ThemeEditor user={user} />
      </div>
    </main>
  );
}
