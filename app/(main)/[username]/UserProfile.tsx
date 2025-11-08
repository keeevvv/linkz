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
import { Link as LinkIcon } from "lucide-react"; // PERUBAHAN: Impor LinkIcon untuk footer
import Avatar from "@/components/ui/avatar";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import Image from 'next/image';
import LinkCard from "./LinkCard"; 

type Link = {
  id: string;
  title: string;
  url: string | null;
  description: string | null; 
  imageUrl: string | null;    
  embedType: string | null;
};

type Theme = {
  backgroundCard: string;
  buttonColor: string;
  buttonFont: string;
  buttonFontSize: string;
  buttonFontColor: string;
  titleColor: string;
  bioColor: string;
};

// This is the main type to fix
type UserWithLinks = {
  image: string | null;
  name: string | null;
  username: string;
  bio: string | null;
  links: Link[];
  githubUrl: string | null;
  instagramUrl: string | null;
  linkedInUrl: string | null;
  theme: Theme | null; 
};



  export default function UserProfile({ user }: { user: UserWithLinks }) {

    const isGradient = user.theme?.backgroundCard.includes("gradient");
  const isGradientButton = user.theme?.buttonColor.includes("gradient");

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
          style={{ color: user.theme?.titleColor || "#111" }}
        >
          {user.name || user.username}
        </h1>

        
        <p
          className="text-center"
          style={{ color: user.theme?.bioColor || "#77767B" }}
        >
          @{user.username}
        </p>

        
        {user.bio && (
          <p
            className="text-center"
            style={{ color: user.theme?.bioColor || "#77767B" }}
          >
            {user.bio}
          </p>
        )}

        <div className="flex flex-row gap-2">
          
          {/* Instagram */}
          {user.instagramUrl && (
            <Link
              href={user.instagramUrl}
              target="_blank"
              // These classes make it black, round, and centered
              className="h-10 w-10 p-0 rounded-full bg-black text-white flex items-center justify-center transition-opacity hover:opacity-80"
            >
              <FaInstagram className="h-5 w-5" />
            </Link>
          )}

          {/* GitHub */}
          {user.githubUrl && (
            <Link
              href={user.githubUrl}
              target="_blank"
              className="h-10 w-10 p-0 rounded-full bg-black text-white flex items-center justify-center transition-opacity hover:opacity-80"
            >
              <FaGithub className="h-5 w-5" />
            </Link>
          )}

          {/* LinkedIn */}
          {user.linkedInUrl && (
            <Link
              href={user.linkedInUrl}
              target="_blank"
              className="h-10 w-10 p-0 rounded-full bg-black text-white flex items-center justify-center transition-opacity hover:opacity-80"
            >
              <FaLinkedin className="h-5 w-5" />
            </Link>
          )}

        </div>
        
        <Card
          className="w-full shadow-lg transition-all hover:shadow-xl dark:bg-gray-900/75 dark:backdrop-blur-sm"
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
          
          <CardHeader>
            <CardTitle 
              className="text-center text-lg"
              style={{ color: user.theme?.titleColor || "#111" }}
            >
              My Links
            </CardTitle>
          </CardHeader>

          {/* KEPT: New CardContent + button theming
          */}
          <CardContent>
            {/* We pass the whole 'link' object to our new component */}
            <div className="flex flex-col gap-4">
              
              {user.links.length === 0 && (
                <p className="text-center text-sm text-muted-foreground">
                  This user hasn't added any links yet.
                </p>
              )}

              {/* Replace the .map() content */}
              {user.links.map((link) => (
                <LinkCard key={link.id} link={link} />
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