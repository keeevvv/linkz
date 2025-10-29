import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import Link from "next/link"; // PERUBAHAN: Impor Link dari Next.js untuk footer
import prisma from "@/lib/prisma";
// PERUBAHAN: Impor komponen Avatar lengkap
import { User, Link as LinkIcon } from "lucide-react"; // PERUBAHAN: Impor LinkIcon untuk footer
import Avatar from "@/components/ui/avatar";

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

  const isGradient = user.theme?.backgroundCard.includes("gradient");
  const isGradientButton = user.theme?.buttonColor.includes("gradient");

  return (
    // PERUBAHAN: Latar belakang gradien yang lebih menarik
    <main
      className="min-h-screen p-4 pt-12 md:pt-24 
                   bg-gradient-to-br from-gray-100 via-gray-50 to-blue-100
                   dark:from-gray-900 dark:via-gray-800 dark:to-blue-950"
    >
      <div className="w-full max-w-md mx-auto">
        <Card
          className="min-h-[80vh] w-full shadow-lg transition-all hover:shadow-xl dark:bg-gray-900/75 dark:backdrop-blur-sm"
          style={
            isGradient
              ? {
                  backgroundImage:
                    user.theme?.backgroundCard || "rgba(255,255,255,1)",
                }
              : {
                  backgroundColor:
                    user.theme?.backgroundCard || "rgba(255,255,255,1)",
                }
          }
        >
          <CardHeader className="flex flex-col items-center text-center gap-4">
            {user?.image ? (
              <Avatar size={120} src={user.image} />
            ) : (
              <Avatar size={120} src={"/images/blank-avatar.webp"} />
            )}
            <div className="space-y-1">
              <CardTitle
                className={`text-2xl`}
                style={{ color: user.theme?.titleColor || "#111" }}
              >
                {user.name || user.username}
              </CardTitle>
              <CardDescription
                style={{ color: user.theme?.bioColor || "#77767B" }}
              >
                @{user.username}
              </CardDescription>
              <CardDescription
                style={{ color: user.theme?.bioColor || "#77767B" }}
                className="pt-2 text-base"
              >
                {user.bio || "Welcome to my page!"}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {user.links.map((link: any) => (
                <Button
                  key={link.id}
                  size="lg"
                  className={`w-full h-14 transition-transform duration-150 ease-in-out hover:scale-[1.03] hover:shadow-md  ${
                    user.theme?.buttonFont || "font-mono"
                  } ${user.theme?.buttonFontSize || "text-lg"}`}
                  asChild
                  style={{
                    backgroundColor: isGradientButton
                      ? undefined
                      : user.theme?.buttonColor || "rgba(0, 0, 0, 1)",
                    backgroundImage: isGradientButton
                      ? user.theme?.buttonColor || "rgba(0, 0, 0, 1)"
                      : undefined,
                    color: user.theme?.buttonFontColor || "#ffffffff",
                  }}
                >
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.title}
                  </a>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* PERUBAHAN: Menambahkan footer */}
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <Button variant="ghost" asChild>
            <Link href="/">
              <LinkIcon className="w-4 h-4 mr-2" />
              Create your own Linkz
            </Link>
          </Button>
        </footer>
      </div>
    </main>
  );
}
