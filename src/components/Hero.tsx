import React from 'react';
import { ArrowRight, ChevronRight, ShieldCheck, Phone, MapPin } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onConsultationClick: () => void;
  onExploreServicesClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onConsultationClick,
  onExploreServicesClick,
}) => {
  const { t } = useLanguage();

  return (
    <section className="relative bg-[#0B2545] text-white overflow-hidden">
      {/* Background Architectural Image with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_construction_modern_1792339537125.jpg"
          alt="Modern architectural construction site with crane and contemporary facade by People and Co Construction Firm"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-[1.02] filter brightness-[0.42] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07172B] via-[#0B2545]/85 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Centralized Brand Kicker */}
          <div className="flex flex-col items-center text-center gap-1 uppercase tracking-wider mb-5">
            <span className="text-white text-lg sm:text-2xl font-extrabold tracking-widest leading-none font-['Plus_Jakarta_Sans']">
              PEOPLE AND CO
            </span>
            <span className="text-[#00B4D8] font-bold text-xs sm:text-sm tracking-widest leading-tight">
              CONSTRUCTION FIRM
            </span>
            <span className="text-slate-300 font-medium text-[11px] sm:text-xs tracking-widest leading-tight">
              {t('hero.coverage', 'Delta State & Nationwide Nigeria')}
            </span>
          </div>

          {/* Data-Driven Completed Projects Experience Badge */}
          <div className="inline-flex items-center gap-3 px-4 sm:px-5 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md mb-6 shadow-md transition-all">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-[#F59E0B] font-extrabold text-sm sm:text-base tracking-tight">
              500+
            </span>
            <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
              {t('hero.counter', 'Successful Projects Completed')}
            </span>
            <span className="hidden sm:inline-block text-slate-400 text-xs">|</span>
            <span className="hidden sm:inline-block text-slate-300 text-xs font-normal">
              Delta & Nationwide
            </span>
          </div>

          {/* Master Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6 font-['Plus_Jakarta_Sans'] text-balance">
            {t('hero.title_p1', 'ENGINEERED STRENGTH.')}{' '}
            <span className="text-[#00B4D8]">{t('hero.title_p2', 'LASTING VALUE.')}</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-200 font-normal leading-relaxed mb-8 max-w-2xl text-balance">
            {t('hero.subtitle', COMPANY_CONFIG.tagline)}
          </p>

          {/* Functional CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mb-10 w-full sm:w-auto">
            <button
              onClick={onConsultationClick}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-bold text-[#0B2545] bg-[#F59E0B] hover:bg-[#D97706] active:scale-[0.99] rounded-lg transition-all shadow-lg hover:shadow-xl whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 cursor-pointer"
            >
              <span>{t('hero.cta_consult', 'Request a Consultation')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onExploreServicesClick}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-sm rounded-lg transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer"
            >
              <span>{t('hero.cta_explore', 'Explore Our Services')}</span>
              <ChevronRight className="w-4 h-4 text-[#00B4D8]" />
            </button>
          </div>

          {/* Data-Driven Experience Metrics Grid */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs mb-8 text-center">
            <div className="p-2 sm:p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#F59E0B] font-['Plus_Jakarta_Sans']">
                500+
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-0.5">
                Successful Projects Completed
              </div>
            </div>
            <div className="p-2 sm:p-3 border-l border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#00B4D8] font-['Plus_Jakarta_Sans']">
                12+
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-0.5">
                Years Engineering Practice
              </div>
            </div>
            <div className="p-2 sm:p-3 border-t sm:border-t-0 sm:border-l border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-['Plus_Jakarta_Sans']">
                99.2%
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-0.5">
                On-Time Handover Rate
              </div>
            </div>
            <div className="p-2 sm:p-3 border-t sm:border-t-0 sm:border-l border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#F59E0B] font-['Plus_Jakarta_Sans']">
                100%
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-0.5">
                BOQ Cost Transparency
              </div>
            </div>
          </div>

          {/* Clean Unboxed Regional Trust Markers */}
          <div className="pt-6 border-t border-white/15 w-full flex flex-col sm:flex-row items-center justify-around gap-4 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#00B4D8] shrink-0" />
              <span>{COMPANY_CONFIG.contact.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <span>Direct Business Hotline: {COMPANY_CONFIG.contact.phoneDisplay}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Proof adjacency strip */}
      <div className="relative z-10 bg-[#07172B]/90 border-t border-white/10 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00B4D8]" />
            <span className="font-medium text-white">Full-Scope Built Environment Delivery</span>
            <span className="text-slate-400">· Structural, Civil, Project Management & Land Services</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Verified Office Presence</span>
            <span aria-hidden="true">·</span>
            <span>Zero Brokerage Fraud Policy</span>
            <span aria-hidden="true">·</span>
            <span>Standard Engineering BOQ</span>
          </div>
        </div>
      </div>
    </section>
  );
};
