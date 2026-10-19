import React from 'react';
import { Target, Eye, Shield, CheckCircle2, Award, Users, HardHat, FileSpreadsheet } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';
import { useLanguage } from '../context/LanguageContext';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#0B2545] mb-2">
            <span>{t('about.badge', 'Corporate Profile')}</span>
            <span aria-hidden="true">·</span>
            <span>Identity & Principles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight mb-4 font-['Plus_Jakarta_Sans']">
            {t('about.title', 'Engineered for Longevity. Built on Trust.')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t('about.desc', `${COMPANY_CONFIG.name} is a multidisciplinary engineering, building, and real estate development firm headquartered in Ethiope East, Delta State.`)}
          </p>
        </div>

        {/* Mission and Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Mission Card */}
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="w-12 h-12 rounded-lg bg-sky-50 text-[#00B4D8] flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-[#0B2545]" />
            </div>
            <h3 className="text-xl font-bold text-[#0B2545] mb-3 font-['Plus_Jakarta_Sans']">
              Our Mission
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {COMPANY_CONFIG.about.mission}
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="w-12 h-12 rounded-lg bg-amber-50 text-[#F59E0B] flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-[#F59E0B]" />
            </div>
            <h3 className="text-xl font-bold text-[#0B2545] mb-3 font-['Plus_Jakarta_Sans']">
              Our Vision
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {COMPANY_CONFIG.about.vision}
            </p>
          </div>

        </div>

        {/* Core Values Section */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-[#0B2545] mb-2 font-['Plus_Jakarta_Sans']">
              Our Five Guiding Pillars
            </h3>
            <p className="text-sm text-slate-600">
              Every foundation we pour and every project schedule we manage adheres to strict ethical and engineering benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPANY_CONFIG.about.coreValues.map((val, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-[#00B4D8]">
                      Pillar 0{idx + 1}
                    </span>
                    <Shield className="w-4 h-4 text-slate-400" />
                  </div>
                  <h4 className="text-base font-bold text-[#0B2545] mb-2 font-['Plus_Jakarta_Sans']">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* Client Transparency Card */}
            <div className="bg-[#0B2545] text-white p-6 rounded-xl border border-[#07172B] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-[#F59E0B]">
                    Corporate Integrity
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-[#00B4D8]" />
                </div>
                <h4 className="text-base font-bold text-white mb-2 font-['Plus_Jakarta_Sans']">
                  Zero False Claims Policy
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We distinguish verified company records from preliminary demonstration concepts. All project specifications, land boundaries, and cost bills are presented with complete honesty.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Operating Capabilities Checklist */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <div className="pt-4 md:pt-0 md:px-4">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#0B2545] mb-1">
                <HardHat className="w-5 h-5 text-[#00B4D8]" />
                <span className="font-bold text-sm">Site Management</span>
              </div>
              <p className="text-xs text-slate-500">Dedicated on-site engineers, safety gear enforcement, and daily material logs.</p>
            </div>

            <div className="pt-4 md:pt-0 md:px-4">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#0B2545] mb-1">
                <Award className="w-5 h-5 text-[#F59E0B]" />
                <span className="font-bold text-sm">Structural Standards</span>
              </div>
              <p className="text-xs text-slate-500">Calculations aligned with BS 8110, Eurocode 2, and municipal planning laws.</p>
            </div>

            <div className="pt-4 md:pt-0 md:px-4">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#0B2545] mb-1">
                <FileSpreadsheet className="w-5 h-5 text-[#00B4D8]" />
                <span className="font-bold text-sm">Cost Transparency</span>
              </div>
              <p className="text-xs text-slate-500">Line-item Bill of Quantities eliminating contractor margin padding.</p>
            </div>

            <div className="pt-4 md:pt-0 md:px-4">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#0B2545] mb-1">
                <Users className="w-5 h-5 text-[#F59E0B]" />
                <span className="font-bold text-sm">Client Representation</span>
              </div>
              <p className="text-xs text-slate-500">Direct liaison for diaspora property buyers and local institutional builders.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
