"use client";

import ColorPicker from "react-best-gradient-color-picker";
import { useState } from "react";
import Avatar from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Prisma, User } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import MainNavbar from "../mainNavbar";
import LinkCard from "@/app/(main)/[username]/LinkCard";
import Link from "next/link"; // PERUBAHAN: Impor Link dari Next.js untuk footer
// PERUBAHAN: Impor komponen Avatar lengkap
import { Link as LinkIcon } from "lucide-react"; // PERUBAHAN: Impor LinkIcon untuk footer
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

type UserWithThemeAndLinks = Prisma.UserGetPayload<{
  include: {
    links: true;
    theme: true;
  };
}>;

export default function ThemeEditor({ user }: { user: UserWithThemeAndLinks }) {
  const [cardColor, setCardColor] = useState(
    user.theme?.backgroundCard || "rgba(255,255,255,1)"
  );
  const [openPickerCard, setOpenPickerCard] = useState(false);
  const [btnColor, setBtnColor] = useState(
    user.theme?.buttonColor || "rgba(0, 0, 0, 1)"
  );
  const [openPickerButton, setOpenPickerButton] = useState(false);
  const [btnFont, setBtnFont] = useState(user.theme?.buttonFont || "font-mono");
  const [btnFontSize, setBtnFontSize] = useState(
    user.theme?.buttonFontSize || "text-lg"
  );
  const [titleColor, setTitleColor] = useState(
    user.theme?.titleColor || "#111"
  );
  const [bioColor, setBioColor] = useState(user.theme?.bioColor || "#77767B");
  const [buttonFontColor, setButtonFontColor] = useState(
    user.theme?.buttonFontColor || "#ffffffff"
  );
  const isGradient = cardColor.includes("gradient");
  const isGradientButton = btnColor.includes("gradient");

  const handleSaveTheme = async () => {
    const themeData = {
      backgroundCard: cardColor,
      buttonColor: btnColor,
      buttonFont: btnFont,
      buttonFontSize: btnFontSize,
      buttonFontColor: buttonFontColor,
      titleColor: titleColor,
      bioColor: bioColor,
    };

    console.log(themeData);

    try {
      const res = await fetch("/api/theme/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, themeData }),
      });
      const data = await res.json();
      console.log("Theme saved:", data);
    } catch (err) {
      console.error("Failed to save theme:", err);
    }
  };

  return (
    <div>
      <MainNavbar type="themes" />
      <div className="flex flex-col md:flex-row gap-8">
        {/* Preview */}
        <div className="w-full md:w-[60%]">
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
                  priority={true}
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
                    aria-label="Instagram Profile"
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
                    aria-label="GitHub Profile"
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
                    aria-label="LinkedIn Profile"
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

                    {user.links.map((link) => (
                      <LinkCard
                        key={link.id}
                        link={link}
                        theme={user.theme}
                        isGradientButton={isGradientButton}
                      />
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
        </div>

        {/* Editor */}
        <div className="w-full md:w-[40%] flex flex-col gap-6">
          <h2 className="text-xl font-bold">Edit Theme</h2>

          {/* Card background */}
          <label className="font-medium">Background card</label>
          <button
            className="h-8 w-8 hover:cursor-pointer"
            style={
              isGradient
                ? { backgroundImage: cardColor }
                : { backgroundColor: cardColor }
            }
            onClick={() => setOpenPickerCard(!openPickerCard)}
          />
          {openPickerCard && (
            <div
              style={{
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 0 6px rgb(0 0 0 / 25%)",
                padding: 8,
                position: "relative",
                width: 310,
              }}
            >
              <ColorPicker value={cardColor} onChange={setCardColor} />
            </div>
          )}

          {/* Button color */}
          <label className="font-medium">Button Color</label>
          <button
            className="h-8 w-8 hover:cursor-pointer"
            style={
              isGradientButton
                ? { backgroundImage: btnColor }
                : { backgroundColor: btnColor }
            }
            onClick={() => setOpenPickerButton(!openPickerButton)}
          />
          {openPickerButton && (
            <div
              style={{
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 0 6px rgb(0 0 0 / 25%)",
                padding: 8,
                position: "relative",
                width: 310,
              }}
            >
              <ColorPicker value={btnColor} onChange={setBtnColor} />
            </div>
          )}

          {/* Button font */}
          <label className="font-medium">Button Font</label>
          <select
            className="p-2 border rounded-md"
            value={btnFont}
            onChange={(e) => setBtnFont(e.target.value)}
          >
            <option value="font-sans">Sans</option>
            <option value="font-serif">Serif</option>
            <option value="font-mono">Mono</option>
          </select>

          {/* Button font size */}
          <label className="font-medium">Button Font Size</label>
          <select
            className="p-2 border rounded-md"
            value={btnFontSize}
            onChange={(e) => setBtnFontSize(e.target.value)}
          >
            <option value="text-sm">Small</option>
            <option value="text-base">Base</option>
            <option value="text-lg">Large</option>
            <option value="text-xl">XL</option>
          </select>

          {/* button font color */}
          <label className="font-medium">Button Font Color</label>
          <input
            type="color"
            className="w-12 h-8 p-0 border-none"
            value={buttonFontColor}
            onChange={(e) => setButtonFontColor(e.target.value)}
          />

          {/* Title color */}
          <label htmlFor="titleColor" className="font-medium">
            Title Color
          </label>
          <input
            id="titleColor"
            type="color"
            className="w-12 h-8 p-0 border-none"
            value={titleColor}
            onChange={(e) => setTitleColor(e.target.value)}
          />

          {/* bio color */}
          <label className="font-medium">Bio Color</label>
          <input
            type="color"
            className="w-12 h-8 p-0 border-none"
            value={bioColor}
            onChange={(e) => setBioColor(e.target.value)}
          />

          <Button onClick={handleSaveTheme} className="mt-4">
            Save Theme
          </Button>
        </div>
      </div>
    </div>
  );
}
