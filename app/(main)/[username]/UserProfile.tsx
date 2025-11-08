"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // PERUBAHAN: Impor Link dari Next.js untuk footer
// PERUBAHAN: Impor komponen Avatar lengkap
import { User, Link as LinkIcon } from "lucide-react"; // PERUBAHAN: Impor LinkIcon untuk footer
import Avatar from "@/components/ui/avatar";
import Image from 'next/image';

type UserWithLinks = {
  image: string | null;
  name: string | null;
  username: string;
  bio: string | null;
  links: {
    id: string;
    title: string;
    url: string | null;
  }[];
  // theme: any; // Kept this commented in case you re-add it
};

// const isGradient = user.theme?.backgroundCard.includes("gradient");
  // const isGradientButton = user.theme?.buttonColor.includes("gradient");

  export default function UserProfile({ user }: { user: UserWithLinks }) {

  return (
    // PERUBAHAN: Latar belakang gradien yang lebih menarik
    <main
      className="min-h-screen p-4 pt-12 md:pt-24 
                   bg-gradient-to-br from-gray-100 via-gray-50 to-blue-100
                   dark:from-gray-900 dark:via-gray-800 dark:to-blue-950"
    >
      <div className="w-full max-w-md mx-auto flex flex-col items-center gap-4">

                {user.image && (
          <Image
            src={user.image}
            alt={user.name || user.username}
            width={96}
            height={96}
            className="rounded-full w-24 h-24 object-cover"
          />
        )}

        
        <h1
          className="text-2xl font-bold text-center"
          // style={{ color: user.theme?.titleColor || "#111" }}
        >
          {user.name || user.username}
        </h1>

        
        <p
          className="text-center"
          // style={{ color: user.theme?.bioColor || "#77767B" }}
        >
          @{user.username}
        </p>

        
        {user.bio && (
          <p
            className="text-center"
            // style={{ color: user.theme?.bioColor || "#77767B" }}
          >
            {user.bio}
          </p>
        )}

        
        <Card
          className="w-full shadow-lg transition-all hover:shadow-xl dark:bg-gray-900/75 dark:backdrop-blur-sm"
          // style={
          //   isGradient
          //     ? {
          //         backgroundImage:
          //           user.theme?.backgroundCard || "rgba(255,255,255,1)",
          //       }
          //     : {
          //         backgroundColor:
          //           user.theme?.backgroundCard || "rgba(255,255,255,1)",
          //       }
          // }
        >
          
          <CardHeader>
            <CardTitle 
              className="text-center text-lg"
              // style={{ color: user.theme?.titleColor || "#111" }}
            >
              My Links
            </CardTitle>
          </CardHeader>

          {/* KEPT: New CardContent + button theming
          */}
          <CardContent>
            <div className="flex flex-col gap-4">
              {user.links.map((link: any) => (
                <Button
                  key={link.id}
                  size="lg"
                  className={`w-full h-14 transition-transform duration-150 ease-in-out hover:scale-[1.03] hover:shadow-md text-lg`
                }
                  asChild
                  // style={{
                  //   backgroundColor: isGradientButton
                  //     ? undefined
                  //     : user.theme?.buttonColor || "rgba(0, 0, 0, 1)",
                  //   backgroundImage: isGradientButton
                  //     ? user.theme?.buttonColor || "rgba(0, 0, 0, 1)"
                  //     : undefined,
                  //   color: user.theme?.buttonFontColor || "#ffffffff",
                  // }}
                >
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.title}
                  </a>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* KEPT: New footer
        */}
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