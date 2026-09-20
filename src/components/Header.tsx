import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Menu, 
  X, 
  Facebook, 
  Instagram, 
  Youtube, 
  Twitter, 
  Send,
  Linkedin,
  Send as SendIcon
} from 'lucide-react';
import { Currency, Language, PageId, SocialLink } from '../types';
import { translations } from '../translations';
import { Logo } from './Logo';
import { getPublicSocialLinksApi } from '../api/socialLinks';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CurrencySwitcher } from './CurrencySwitcher';
import { ThemeToggle } from './ThemeToggle';
import { useLanguage } from '../i18n/LanguageContext';

interface HeaderProps {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

// TikTok SVG Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.589 6.686a4.9 4.9 0 0 1-2.845-2.847.5.5 0 0 0-.477-.339h-2.3a.5.5 0 0 0-.5.5v11.8a3.2 3.2 0 1 1-3.2-3.2.5.5 0 0 0 .5-.5v-2.3a.5.5 0 0 0-.5-.5 6.5 6.5 0 1 0 6.5 6.5V9.44a4.9 4.9 0 0 0 2.845 2.847.5.5 0 0 0 .477-.339v-2.3a.5.5 0 0 0-.5-.5z"/>
  </svg>
);

// Map platform names to icons
const getSocialIcon = (platform: string, className: string = "w-3.5 h-3.5") => {
  const iconProps = { className };
  switch (platform.toLowerCase()) {
    case 'facebook': return <Facebook {...iconProps} />;
    case 'instagram': return <Instagram {...iconProps} />;
    case 'youtube': return <Youtube {...iconProps} />;
    case 'twitter': return <Twitter {...iconProps} />;
    case 'linkedin': return <Linkedin {...iconProps} />;
    case 'tiktok': return <TikTokIcon className={className} />;
    case 'telegram': 
    case 'telegram2': 
    case 'telegram-support': 
    case 'telegram-channel': 
      return <SendIcon {...iconProps} />;
    default: return null;
  }
};

export const Header: React.FC<HeaderProps> = ({
  activePage,
  setActivePage,
  lang,
  setLang,
  currency,
  setCurrency
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loadingSocial, setLoadingSocial] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Header sits transparent over the hero, then solidifies once the user
  // scrolls past it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile drawer whenever the page changes.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [activePage]);
  const t = translations[lang] || translations.EN;

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: t.home },
    { id: 'about', label: t.about },
    { id: 'packages', label: t.packages },
    { id: 'gallery', label: t.gallery },
    { id: 'faqs', label: t.faqs },
    { id: 'contact', label: t.contact }
  ];

  useEffect(() => {
    loadSocialLinks();
  }, []);

  const loadSocialLinks = async () => {
    setLoadingSocial(true);
    try {
      const data = await getPublicSocialLinksApi();
      setSocialLinks(data);
    } catch (error) {
      console.error('Failed to load social links:', error);
    } finally {
      setLoadingSocial(false);
    }
  };

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    document.documentElement.dir = newLang === 'AR' ? 'rtl' : 'ltr';
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 w-full transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      {/* Top Utility Bar (currency, language, social) */}
      <div className={`text-xs py-1.5 px-4 transition-colors duration-300 ${
        scrolled ? 'bg-[#0E0C0A] text-white' : 'bg-black/25 backdrop-blur-sm text-white'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-end gap-2">
          
          <div className="flex items-center space-x-3 rtl:space-x-reverse text-[#CFCAC2] text-[11px] sm:text-xs">

            {/* Currency Selector */}
            <CurrencySwitcher currency={currency} setCurrency={setCurrency} />

            <span className="text-white/15">|</span>

            {/* Language Selector Dropdown */}
            <LanguageSwitcher variant="dropdown" theme="dark" />

            <span className="text-white/15">|</span>

            {/* Night theme toggle */}
            <ThemeToggle />

            <span className="text-white/15 hidden sm:inline">|</span>

            {/* Social Icons - Fetched from Backend */}
            <div className="hidden sm:flex items-center space-x-2.5 rtl:space-x-reverse text-[#9A9488]">
              {loadingSocial ? null : socialLinks.length === 0 ? null : (
                socialLinks.map((link) => {
                  const icon = getSocialIcon(link.platform);
                  return icon ? (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#A6853A] transition-colors"
                      title={link.platform}
                    >
                      {icon}
                    </a>
                  ) : null;
                })
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar (White Background) */}
      <div className={`py-4 px-4 sm:px-8 transition-colors duration-300 ${
        scrolled ? 'border-b border-black/[0.06]' : 'border-b border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <button 
            onClick={() => setActivePage('home')} 
            className="flex items-center text-left rtl:text-right group cursor-pointer flex-shrink-0"
          >
            <Logo 
              brandName="Delta Travel & Tour"
              brandSubtitle={t.brandSubtitle || "Licensed Umrah Service Agency"} 
              variant={scrolled ? 'light' : 'dark'}
              logoVariant="header"
              size="md"
              showText={true}
            />
          </button>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-7 rtl:space-x-reverse">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`pb-0.5 text-[13px] tracking-wide transition-colors relative ${
                    scrolled
                      ? (isActive
                          ? 'text-[#7A0C1F] border-b border-[#7A0C1F]'
                          : 'text-[#1A1712] hover:text-[#7A0C1F]')
                      : (isActive
                          ? 'text-white border-b border-[#D8B978]'
                          : 'text-white/80 hover:text-white')
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${scrolled || mobileMenuOpen ? 'text-[#1A1712]' : 'text-white'}`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] text-[#1A1712] border-b border-black/[0.06] py-4 px-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left rtl:text-right py-2 text-sm tracking-wide transition-colors ${
                  activePage === item.id
                    ? 'text-[#7A0C1F] font-medium border-l-4 rtl:border-r-4 rtl:border-l-0 border-[#7A0C1F] pl-2'
                    : 'text-[#4A463F] hover:text-[#7A0C1F]'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Mobile Language Switcher */}
            <div className="pt-3 pb-1 border-t border-black/[0.06] flex flex-col gap-1.5">
              <span className="text-[11px] text-[#9A9488] uppercase tracking-wider">
                Language / ቋንቋ / اللغة
              </span>
              <LanguageSwitcher variant="toggle" className="w-full justify-between" />
            </div>

            {/* Mobile Theme Toggle */}
            <div className="pt-3 pb-1 border-t border-black/[0.06] flex items-center justify-between">
              <span className="text-[11px] text-[#9A9488] uppercase tracking-wider">
                Theme
              </span>
              <ThemeToggle className="!border-black/10 !text-[#4A463F] hover:!text-[#1A1712] hover:!border-black/20" />
            </div>

            <div className="pt-2 border-t border-black/[0.06] flex flex-col gap-2">
              <button
                onClick={() => {
                  setActivePage('contact');
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-[#7A0C1F] text-white text-center py-3 uppercase text-xs tracking-wide"
              >
                {t.contact}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};