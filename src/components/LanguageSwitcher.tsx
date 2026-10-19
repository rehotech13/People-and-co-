import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import {
  useLanguage,
  SUPPORTED_LANGUAGES,
  LanguageCode,
} from '../context/LanguageContext';

interface LanguageSwitcherProps {
  variant?: 'navbar' | 'mobile' | 'footer';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'navbar',
}) => {
  const { language, setLanguage, currentLanguageOption, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
  };

  if (variant === 'mobile') {
    return (
      <div className="pt-3 border-t border-slate-100">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-[#00B4D8]" />
          <span>{t('nav.select_language', 'Language')}</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelectLanguage(lang.code)}
                className={`p-2 rounded-lg text-left flex items-center gap-2 transition-all cursor-pointer border ${
                  isSelected
                    ? 'border-[#00B4D8] bg-[#00B4D8]/10 text-[#0B2545] font-bold'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                <div className="leading-none truncate">
                  <span className="text-xs block">{lang.label}</span>
                  <span className="text-[10px] text-slate-500 font-normal truncate">
                    {lang.nativeName}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs hover:border-[#00B4D8] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        title="Select Language / Gbanwee Asụsụ / Yanar Da Harshe / Yan Èdè"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 text-[#00B4D8] shrink-0" />
        <span className="text-sm shrink-0">{currentLanguageOption.flag}</span>
        <span className="hidden xl:inline font-bold text-[#0B2545]">
          {currentLanguageOption.label}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#0B2545]' : ''
          }`}
        />
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in-50 zoom-in-95 duration-100">
          <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-[#00B4D8]" />
              <span>Nigerian Languages & English</span>
            </p>
          </div>

          <div className="space-y-0.5 px-1">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`w-full px-3 py-2 rounded-lg text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#0B2545] text-white font-bold'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{lang.flag}</span>
                    <div className="leading-tight">
                      <p className={`font-semibold ${isSelected ? 'text-white' : 'text-[#0B2545]'}`}>
                        {lang.label}
                      </p>
                      <p className={`text-[11px] ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {lang.nativeName}
                      </p>
                      <p className={`text-[9px] ${isSelected ? 'text-[#00B4D8]' : 'text-slate-400'} font-medium`}>
                        {lang.region}
                      </p>
                    </div>
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-[#00B4D8] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
