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


type Theme = {
  backgroundCard: string;
  buttonColor: string;
  buttonFont: string;
  buttonFontSize: string;
  buttonFontColor: string;
  titleColor: string;
  bioColor: string;
};

type LinkCardProps = {
  link: Link;
  // STEP 2: Add theme props
  theme: Theme | null;
  isGradientButton: boolean;
};

export default function LinkCard({ link, theme, isGradientButton }: LinkCardProps) {

    // This function maps the theme's size string (e.g., "XL") to a real Tailwind class
  const getFontSizeClass = (size?: string) => {
    switch(size) {
      case 'S': return 'text-sm';
      case 'M': return 'text-base';
      case 'L': return 'text-lg';
      case 'XL': return 'text-xl';
      default: return 'text-base';
    }
  }

  // This function maps the theme's font string (e.g., "Serif") to a real Tailwind class
  const getFontClass = (font?: string) => {
    switch(font) {
      case 'Mono': return 'font-mono';
      case 'Serif': return 'font-serif';
      case 'Sans': return 'font-sans';
      default: return 'font-sans';
    }
  }

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
      className={`flex w-full items-center gap-4 rounded-lg p-4 transition-all 
                 duration-200 hover:scale-[1.02] hover:shadow-lg dark:bg-gray-800
                 ${getFontClass(theme?.buttonFont)}
                 ${getFontSizeClass(theme?.buttonFontSize)}
                `}
      // 4. We apply the theme colors using the inline style prop
      style={{
        backgroundColor: isGradientButton
          ? undefined
          : theme?.buttonColor || "rgba(0, 0, 0, 1)",
        backgroundImage: isGradientButton
          ? theme?.buttonColor || "rgba(0, 0, 0, 1)"
          : undefined,
        color: theme?.buttonFontColor || "#ffffffff",
      }}
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
        <h3 className="truncate font-semibold" style={{ color: 'inherit' }}>
          {link.title}
        </h3>
        {link.description && (
          <p className="truncate text-sm" style={{ color: 'inherit', opacity: 0.9 }}>
            {link.description}
          </p>
        )}
      </div>
    </a>
  );
}