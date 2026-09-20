import React, { useEffect, useState } from 'react';
import { Language, PageId, TeamMember } from '../types';
import { PageBanner } from '../components/PageBanner';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { translations } from '../translations';
import { 
  ShieldCheck, 
  Award, 
  Users, 
  Compass, 
  HeartHandshake, 
  Building2, 
  ArrowRight,
  Loader2,
  User
} from 'lucide-react';
import { getPublicTeamMembersApi, getFullImageUrl } from '../api/client';

interface AboutProps {
  setActivePage: (page: PageId) => void;
  lang: Language;
}

export const About: React.FC<AboutProps> = ({ setActivePage, lang }) => {
  const t = translations[lang] || translations.EN;

  useScrollReveal([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPublicTeamMembersApi();
      setTeamMembers(data);
    } catch (err) {
      setError(t.errorLoadingTeam || 'Failed to load team members. Please refresh the page.');
      console.error('Error loading team members:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pattern-texture">
      
      {/* Banner */}
      <PageBanner 
        badge={t.aboutPageBadge}
        title={t.aboutPageTitle}
        subtitle={t.aboutPageSubtitle}
        backgroundImage="/photos/nabawi-sunset.jpg"
      />

      {/* History & Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center reveal pt-14 pb-14">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7A0C1F]">
            {t.ourJourney}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1712]">
           {t.journeyHeading}
          </h2>
          <p className="text-xs sm:text-sm text-[#6B655A] leading-relaxed">
            {t.journeyP1}
          </p>
          <p className="text-xs sm:text-sm text-[#6B655A] leading-relaxed">
            {t.journeyP2}
          </p>
          <p className="text-xs sm:text-sm text-[#6B655A] leading-relaxed">
            {t.journeyP3}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
            <div className="p-5 bg-white border border-black/[0.08] shadow-sm">
              <span className="w-9 h-9 rounded-full bg-[#F1EBE0] border border-[#A6853A]/40 text-[#A6853A] flex items-center justify-center mb-3">
                <Compass className="w-4 h-4" />
              </span>
              <h4 className="font-serif font-medium text-[#1A1712] text-base mb-1.5">{t.ourMission}</h4>
              <p className="text-[13px] text-[#6B655A] leading-relaxed italic">{t.missionText}</p>
            </div>
            <div className="p-5 bg-white border border-black/[0.08] shadow-sm">
              <span className="w-9 h-9 rounded-full bg-[#F1EBE0] border border-[#A6853A]/40 text-[#A6853A] flex items-center justify-center mb-3">
                <Award className="w-4 h-4" />
              </span>
              <h4 className="font-serif font-medium text-[#1A1712] text-base mb-1.5">{t.ourVision}</h4>
              <p className="text-[13px] text-[#6B655A] leading-relaxed italic">{t.visionText}</p>
            </div>
          </div>
        </div>

       <div className="relative">
  <div className="arch-crop overflow-hidden shadow-lg border-2 border-[#A6853A]/60">
    <img 
      src="/photos/madinah-night-aerial.jpg" 
      alt="Madinah Prophet Mosque" 
      className="w-full h-96 object-cover"
      loading="lazy"
    />
  </div>
  <div className="absolute -bottom-5 -left-5 bg-white p-4 shadow-xl border border-black/[0.08] flex items-center gap-3 hidden sm:flex">
    <div className="w-10 h-10 bg-[#7A0C1F] text-white flex items-center justify-center font-bold">
      <ShieldCheck className="w-6 h-6" />
    </div>
    <div>
      <p className="font-bold text-[#1A1712] text-xs">{t.licensedBadge || "Ministry License #4812"}</p>
      <p className="text-[11px] text-[#6B655A]">{t.officiallyApprovedAgency || "Officially Approved Hajj & Umrah Agency"}</p>
    </div>
  </div>
</div>
      </section>

      {/* Certified Mutawwif Team - Fully Dynamic */}
      <section className="bg-white py-14 px-4 sm:px-8 border-y border-black/[0.08]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#7A0C1F]">
              {t.guidedByKnowledge}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1712]">
              {t.meetOurTeam}
            </h2>
            <p className="text-xs sm:text-sm text-[#6B655A] max-w-xl mx-auto">
              {t.teamIntro}
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#7A0C1F]" />
              <p className="text-xs text-[#6B655A]">{t.loadingTeamMembers}</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-[#7A0C1F] text-sm">{error}</p>
              <button 
                onClick={loadTeamMembers} 
                className="mt-3 text-[#7A0C1F] text-xs font-bold underline hover:no-underline"
              >
                {t.retry}
              </button>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-20 border border-black/[0.08]">
              <div className="w-16 h-16 rounded-full bg-[#F1EBE0] border border-black/[0.06] flex items-center justify-center mx-auto mb-4">
                <User className="w-6 h-6 text-[#A6853A]" />
              </div>
              <p className="text-[#4A463F] text-sm">{t.noTeamMembers}</p>
              <p className="text-xs text-[#9A9488] mt-1">{t.checkBackSoon}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => {
                const imageUrl = getFullImageUrl(member.imageUrl);
                
                const name = ((lang || '').toUpperCase() === 'AR' && member.nameAr)
                  ? member.nameAr
                  : (((lang || '').toUpperCase() === 'AM' && member.nameAm) ? member.nameAm : (member.nameEn || member.name));
                const role = ((lang || '').toUpperCase() === 'AR' && member.roleAr)
                  ? member.roleAr
                  : (((lang || '').toUpperCase() === 'AM' && member.roleAm) ? member.roleAm : (member.roleEn || member.role));
                const bio = ((lang || '').toUpperCase() === 'AR' && member.bioAr)
                  ? member.bioAr
                  : (((lang || '').toUpperCase() === 'AM' && member.bioAm) ? member.bioAm : (member.bioEn || member.bio));

                return (
                        <div 
                          key={member.id} 
                          className="bg-[#FAF7F2] p-6 shadow-sm border border-black/[0.08] text-center space-y-3 transition-all hover:shadow-md hover:border-[#7A0C1F]/30"
                        >
                          {imageUrl ? (
                            <img 
                              src={imageUrl} 
                              alt={name} 
                              className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-[#7A0C1F] shadow-sm"
                              loading="lazy"
                              onError={(e) => {
                                const img = e.target as HTMLImageElement;
                                img.onerror = null;
                                img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='40' fill='%23F1EBE0'/%3E%3Ccircle cx='40' cy='32' r='13' fill='%23A6853A'/%3E%3Cpath d='M14 68c4-15 15-23 26-23s22 8 26 23' fill='%23A6853A'/%3E%3C/svg%3E";
                              }}
                            />
                          ) : (
                            <div className="w-20 h-20 rounded-full mx-auto bg-[#F1EBE0] border-2 border-[#7A0C1F]/40 flex items-center justify-center">
                              <User className="w-8 h-8 text-[#A6853A]" />
                            </div>
                          )}
                          <div>
                            <h3 className="font-serif font-medium text-[#1A1712] text-sm">{name}</h3>
                            <p className="text-xs text-[#7A0C1F] font-bold">{role}</p>
                          </div>
                          <p className="text-xs text-[#6B655A]">{bio}</p>
                        </div>
                      );
                    })}
            </div>
          )}
        </div>
      </section>

      {/* Trust Badges & Licenses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-8 reveal pt-14 pb-14">
        <h3 className="font-serif text-xl font-medium text-[#1A1712]">
          {t.licensedRecognized}
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-xs font-semibold text-[#4A463F]">
          <div className="p-4 bg-white border border-black/[0.08] shadow-sm flex flex-col items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-[#7A0C1F]" />
            <span>{t.ministryLicense}</span>
          </div>
          <div className="p-4 bg-white border border-black/[0.08] shadow-sm flex flex-col items-center gap-2">
            <Building2 className="w-7 h-7 text-[#7A0C1F]" />
            <span>{t.iataAccredited}</span>
          </div>
          <div className="p-4 bg-white border border-black/[0.08] shadow-sm flex flex-col items-center gap-2">
            <Award className="w-7 h-7 text-[#7A0C1F]" />
            <span>{t.saudiTourismPartner}</span>
          </div>
          <div className="p-4 bg-white border border-black/[0.08] shadow-sm flex flex-col items-center gap-2">
            <HeartHandshake className="w-7 h-7 text-[#7A0C1F]" />
            <span>{t.nusukProvider}</span>
          </div>
        </div>
      </section>

    </div>
  );
};