"use client";

import ColorPicker from "react-best-gradient-color-picker";
import { useState } from "react";
import Avatar from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
          <Card
            className="min-h-[80vh] w-full shadow-lg transition-all hover:shadow-xl dark:bg-gray-900/75 dark:backdrop-blur-sm"
            style={
              isGradient
                ? { backgroundImage: cardColor }
                : { backgroundColor: cardColor }
            }
          >
            <CardHeader className="flex flex-col items-center text-center gap-4">
              {user?.image ? (
                <Avatar size={120} src={user.image} />
              ) : (
                <Avatar size={120} src={"/images/blank-avatar.webp"} />
              )}
              <div className="space-y-1">
                <CardTitle className={`text-2xl`} style={{ color: titleColor }}>
                  {user.name || user.username}
                </CardTitle>
                <CardDescription style={{ color: bioColor }}>
                  @{user.username}
                </CardDescription>
                <CardDescription
                  style={{ color: bioColor }}
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
                    className={`w-full h-14 transition-transform duration-150 ease-in-out hover:scale-[1.03] hover:shadow-md  ${btnFont} ${btnFontSize}`}
                    asChild
                    style={{
                      backgroundColor: isGradientButton ? undefined : btnColor,
                      backgroundImage: isGradientButton ? btnColor : undefined,
                      color: buttonFontColor, // ← ini untuk font color
                    }}
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.title}
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
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
          <label className="font-medium">Title Color</label>
          <input
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
