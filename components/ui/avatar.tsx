"use client";

import Image from "next/image";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
}

export default function Avatar({
  src,
  alt = "Avatar",
  size = 48,
}: AvatarProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        display: "inline-block",
      }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            width: size,
            height: size,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#e5e7eb", // gray-200
            color: "#374151", // gray-700
            fontWeight: 600,
            fontSize: size / 2.5,
          }}
        >
          ?
        </div>
      )}
    </div>
  );
}
