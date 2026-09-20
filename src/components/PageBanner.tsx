import React from 'react';

interface PageBannerProps {
  badge: string;
  title: string;
  subtitle: string;
  className?: string;
  backgroundImage?: string;
}

export const PageBanner: React.FC<PageBannerProps> = ({ 
  badge, 
  title, 
  subtitle, 
  className = '',
  backgroundImage = '/background/bg3.jpg'
}) => {
  return (
    <section className={`relative bg-[#0E0C0A] text-white pt-40 pb-20 px-4 text-center overflow-hidden min-h-[400px] flex items-center ${className}`}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      <div className="absolute inset-0 bg-black/65" />
      
      {/* Content */}
      <div className="max-w-4xl mx-auto space-y-4 relative z-10 w-full">
        <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-[#D8B978]">
          {badge}
        </span>
        <h1 className="font-serif font-medium text-3xl sm:text-5xl text-[#FAF7F2] leading-tight">
          {title}
        </h1>
        <p className="text-sm text-[#CFCAC2] max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
};