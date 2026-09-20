import React, { useState, useEffect } from 'react';
import { Language, FAQItem } from '../types';
import { PageBanner } from '../components/PageBanner';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { translations } from '../translations';
import { getFaqsApi } from '../api/faqs';
import { Loader2, Plus, Minus, HelpCircle } from 'lucide-react';

interface FaqProps {
  lang: Language;
}

export const Faq: React.FC<FaqProps> = ({ lang }) => {
  const t = translations[lang] || translations.EN;

  useScrollReveal([]);

  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loadingFaqs, setLoadingFaqs] = useState(true);
  const [faqError, setFaqError] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  useEffect(() => {
    loadFaqs();
  }, []);

  const loadFaqs = async () => {
    setLoadingFaqs(true);
    setFaqError(null);
    try {
      const data = await getFaqsApi();
      setFaqs(data);
    } catch (error) {
      setFaqError(t.errorLoadingFaqs || 'Failed to load FAQs. Please refresh the page.');
      console.error('Error loading FAQs:', error);
    } finally {
      setLoadingFaqs(false);
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="pb-16 bg-[#FAF7F2] pattern-texture">

      <PageBanner
        badge={t.faqs}
        title={t.faqsTitle}
        subtitle={t.faqsSub}
        backgroundImage="/photos/haram-clocktower-dawn.jpg"
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-8 pt-16 reveal pb-14">
        {loadingFaqs ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-3">
            <Loader2 className="w-6 h-6 animate-spin text-[#7A0C1F]" />
            <p className="text-xs text-[#6B655A]">{t.loadingFaqs}</p>
          </div>
        ) : faqError ? (
          <div className="text-center py-16">
            <p className="text-[#7A0C1F] text-sm">{faqError}</p>
            <button onClick={loadFaqs} className="mt-4 text-[#7A0C1F] text-sm underline hover:no-underline">
              {t.retry}
            </button>
          </div>
        ) : faqs.length === 0 ? (
          <div className="border border-black/[0.08] p-16 text-center space-y-3">
            <HelpCircle className="w-10 h-10 mx-auto text-[#D8D2C4]" />
            <p className="text-[#4A463F]">{t.noFaqsAvailable}</p>
            <p className="text-xs text-[#9A9488]">{t.noFaqsText}</p>
          </div>
        ) : (
          <div className="divide-y divide-black/[0.08] border-t border-b border-black/[0.08]">
            {faqs.map((faq, index) => {
              const isExpanded = expandedIndex === index;
              const question = ((lang || '').toUpperCase() === 'AR' && faq.questionAr)
                ? faq.questionAr
                : (((lang || '').toUpperCase() === 'AM' && faq.questionAm) ? faq.questionAm : faq.question);
              const answer = ((lang || '').toUpperCase() === 'AR' && faq.answerAr)
                ? faq.answerAr
                : (((lang || '').toUpperCase() === 'AM' && faq.answerAm) ? faq.answerAm : faq.answer);

              return (
                <div key={faq.id}>
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full py-5 flex items-center justify-between gap-4 text-left rtl:text-right hover:text-[#7A0C1F] transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-serif text-[#7A0C1F] text-sm mt-0.5">Q{index + 1}</span>
                      <h3 className="font-serif text-[15px] text-[#1A1712] font-medium">{question}</h3>
                    </div>
                    <div className="flex-shrink-0 text-[#A6853A]">
                      {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="pb-5 pl-7 pr-8">
                      <p className="text-sm text-[#6B655A] leading-relaxed">{answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
