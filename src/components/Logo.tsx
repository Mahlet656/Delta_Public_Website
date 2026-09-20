import React, { useState } from 'react';

interface LogoProps {
  brandName?: string;
  brandSubtitle?: string;
  variant?: 'light' | 'dark';
  className?: string;
  showText?: boolean;
  logoVariant?: 'header' | 'hero' | 'footer' | 'default';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  brandName = "Delta Travel & Tour",
  brandSubtitle = "Licensed Umrah Service Agency",
  variant = 'light',
  className = "",
  showText = true,
  logoVariant = 'default',
  size = 'md'
}) => {
  const [imageError, setImageError] = useState(false);

  // 'logo-mark.png' is the icon on its own (no baked-in wordmark), so it can
  // sit beside live text. Other variants use the full stacked lockup.
  const logoMap: Record<string, string> = {
    header: '/logo/logo-mark.png',
    hero: '/logo/logo-mark.png',
    footer: '/logo/logo-mark.png',
    default: '/logo/logo1.png'
  };

  const logoSrc = logoMap[logoVariant] || logoMap.default;

  const markSizes = {
    sm: 'h-7 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-14 w-auto'
  };

  const nameSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const isDarkBg = variant === 'dark';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {!imageError ? (
        <img
          src={logoSrc}
          alt={brandName}
          className={`${markSizes[size]} object-contain flex-shrink-0`}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className={`${markSizes[size]} aspect-square bg-[#7A0C1F] flex items-center justify-center text-white flex-shrink-0`}>
          <span className="font-serif text-lg">D</span>
        </div>
      )}

      {showText && (
        <div className="flex flex-col leading-none text-left rtl:text-right">
          <span className={`font-serif font-medium tracking-wide ${nameSizes[size]} ${isDarkBg ? 'text-white' : 'text-[#1A1712]'}`}>
            {brandName}
          </span>
          <span className={`text-[9px] uppercase tracking-[0.15em] mt-1.5 ${isDarkBg ? 'text-white/55' : 'text-[#9A9488]'}`}>
            {brandSubtitle}
          </span>
        </div>
      )}
    </div>
  );
};
