import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, DollarSign } from 'lucide-react';
import { Currency } from '../types';

interface CurrencySwitcherProps {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const currencyOptions: { code: Currency; label: string }[] = [
  { code: 'USD', label: '$ USD' },
  { code: 'ETB', label: 'ETB (ብር)' },
  { code: 'SAR', label: 'SAR (﷼)' }
];

export const CurrencySwitcher: React.FC<CurrencySwitcherProps> = ({ currency, setCurrency }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentOption = currencyOptions.find((option) => option.code === currency) || currencyOptions[0];

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (nextCurrency: Currency) => {
    setCurrency(nextCurrency);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="group flex items-center gap-1.5 rounded-md border border-slate-700/80 bg-slate-900/90 px-2.5 py-1 text-[11px] font-medium text-slate-100 shadow-sm transition-all duration-200 hover:border-slate-600 hover:bg-slate-800 cursor-pointer sm:text-xs"
        title={`Current Currency: ${currentOption.label}`}
      >
        <DollarSign className="h-3.5 w-3.5 shrink-0 text-[#C8102E] transition-transform duration-300 group-hover:rotate-12" />
        <span className="font-semibold tracking-wide">{currentOption.label}</span>
        <ChevronDown className={`h-3 w-3 shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Currency options"
          className="absolute right-0 z-50 mt-1.5 min-w-[150px] origin-top-right animate-in rounded-xl border border-slate-200/90 bg-white py-1.5 shadow-2xl fade-in-0 zoom-in-95 duration-150"
        >
          <div className="mb-1 border-b border-slate-100 px-3 py-1.5">
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <DollarSign className="h-3 w-3 text-[#C8102E]" />
              Select Currency
            </span>
          </div>

          {currencyOptions.map((option) => {
            const isActive = currency === option.code;
            return (
              <button
                key={option.code}
                role="option"
                aria-selected={isActive}
                onClick={() => handleSelect(option.code)}
                className={`flex w-full items-center justify-between px-3 py-2 text-xs transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-red-50/80 font-bold text-[#C8102E]'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>{option.label}</span>
                {isActive && (
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#C8102E] text-white shadow-xs">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};