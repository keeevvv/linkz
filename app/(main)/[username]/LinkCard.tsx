"use client";

import Image from 'next/image';
import { Link as LinkIcon } from 'lucide-react';

// Define the type for the link prop, matching what's in UserProfile.tsx
type Link = {
  id: string;
  title: string;
  url: string | null;
  description: string | null;
  imageUrl: string | null;
  embedType: string | null;
};

type LinkCardProps = {
  link: Link;
};

export default function LinkCard({ link }: LinkCardProps) {
  return (
    // The whole card is a link
    <a
      href={link.url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      // --- STYLING ---
      // Base: flex, items-center, padding, rounded, shadow, bg
      // Transition: smooth transition for hover effects
      // Hover: Lifts up (scale), shadow gets bigger (glow effect)
      className="flex w-full items-center gap-4 rounded-lg bg-white p-4 shadow-md transition-all 
                 duration-200 hover:scale-[1.02] hover:shadow-lg dark:bg-gray-800"
    >
      {/* 1. Left Side: Image or Fallback */}
      {link.imageUrl && (
        <Image
          src={link.imageUrl}
          alt={link.title}
          width={64}
          height={64}
          className="h-16 w-16 flex-shrink-0 rounded-md object-cover"
        />
      )}

      {/* 2. Right Side: Title & Description */}
      <div className="flex-1 overflow-hidden">
        <h3 className="truncate font-semibold text-gray-900 dark:text-white">
          {link.title}
        </h3>
        {link.description && (
          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
            {link.description}
          </p>
        )}
      </div>
    </a>
  );
}