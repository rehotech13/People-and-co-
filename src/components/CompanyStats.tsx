import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar,
  Users,
  Building2,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Award,
  HardHat,
  ArrowUpRight,
  Info,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface StatItem {
  id: string;
  targetValue: number;
  suffix: string;
  prefix?: string;
  displayLabel: string;
  headline: string;
  category: string;
  description: string;
  icon: React.ElementType;
  accentColor: string;
  badgeText: string;
  breakdown: { label: string; count: string; detail: string }[];
}

const STATS_DATA: StatItem[] = [
  {
    id: 'experience',
    targetValue: 10,
    suffix: '+',
    displayLabel: '10+ Years Experience',
    headline: 'A Decade of Structural Mastery',
    category: 'Engineering Longevity',
    description:
      'Continuous field excellence in civil construction, structural analysis, and turnkey development across Delta State and Nigeria.',
    icon: Calendar,
    accentColor: '#00B4D8',
    badgeText: 'Since 2014',
    breakdown: [
      { label: 'Delta State Operations', count: '10+ Yrs', detail: 'Eku, Abraka, Warri, Sapele, Asaba, Ughelli' },
      { label: 'Nationwide Consultancies', count: '6+ States', detail: 'Turnkey advisory across South-South and FCT' },
      { label: 'Building Code Standards', count: '100% Eurocode/BS', detail: 'Strict compliance with Nigerian NBC' },
    ],
  },
  {
    id: 'experts',
    targetValue: 50,
    suffix: '+',
    displayLabel: '50+ Certified Experts',
    headline: 'Multi-Disciplinary Technical Team',
    category: 'Human Capital',
    description:
      'Registered professional engineers, NIA architects, quantity surveyors, HSE officers, and certified master craftsmen.',
    icon: HardHat,
    accentColor: '#F59E0B',
    badgeText: 'Certified & Licensed',
    breakdown: [
      { label: 'Certified Civil/Structural Engineers', count: '14 Specialists', detail: 'Registered professional engineering cadre' },
      { label: 'NIA Registered Architects', count: '8 Designers', detail: '3D spatial, BIM & sustainable architectural design' },
      { label: 'Quantity Surveyors & QA/QC', count: '12 Inspectors', detail: 'Accurate BOQ preparation & concrete strength testing' },
      { label: 'Site Superintendents & HSE', count: '18+ On-ground', detail: 'Strict zero-accident protocol enforcement' },
    ],
  },
  {
    id: 'projects',
    targetValue: 200,
    suffix: '+',
    displayLabel: '200+ Projects Handled',
    headline: 'Delivered With Zero Structural Defect',
    category: 'Project Track Record',
    description:
      'Spanning luxury turnkey residential duplexes, high-traffic commercial plazas, civic drainage, and educational infrastructure.',
    icon: Building2,
    accentColor: '#0B2545',
    badgeText: '100% Handover Rate',
    breakdown: [
      { label: 'Turnkey Residential Duplexes', count: '125+ Units', detail: 'Private villas, diaspora family homes & estates' },
      { label: 'Commercial & Mixed-Use Plazas', count: '45+ Complexes', detail: 'Multi-storey retail, offices & event hubs' },
      { label: 'Civil Infrastructure & Drainages', count: '30+ Networks', detail: 'Pavement, concrete culverts & retaining walls' },
    ],
  },
  {
    id: 'compliance',
    targetValue: 100,
    suffix: '%',
    displayLabel: '100% Quality Assurance',
    headline: 'Zero Structural Defect Guarantee',
    category: 'Quality Governance',
    description:
      'Comprehensive geotechnical soil testing, ultrasonic concrete test cubes, and stage-gate disbursement valuations.',
    icon: ShieldCheck,
    accentColor: '#10B981',
    badgeText: 'Verified Standard',
    breakdown: [
      { label: 'Pre-construction Soil Tests', count: '100% Soil Assayed', detail: 'Borehole drilling & soil bearing capacity verification' },
      { label: 'Concrete Slump & Cube Tests', count: '28-Day Curing', detail: 'Batch compression testing for high-load pillars' },
      { label: 'BOQ Price Transparency', count: 'Zero Hidden Fees', detail: 'Strict milestone accountability & audit log' },
    ],
  },
];

export const CompanyStats: React.FC = () => {
  const { t } = useLanguage();
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    experience: 0,
    experts: 0,
    projects: 0,
    compliance: 0,
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [activeStat, setActiveStat] = useState<StatItem | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Animate counters when scrolling into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          runCounterAnimation();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  const runCounterAnimation = () => {
    const duration = 1800; // 1.8 seconds animation
    const startTime = performance.now();

    const updateFrame = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic: fast start, soft landing
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const nextCounts: { [key: string]: number } = {};
      STATS_DATA.forEach((item) => {
        nextCounts[item.id] = Math.round(item.targetValue * easeProgress);
      });

      setCounts(nextCounts);

      if (progress < 1) {
        requestAnimationFrame(updateFrame);
      } else {
        // Ensure final exact values
        const finalCounts: { [key: string]: number } = {};
        STATS_DATA.forEach((item) => {
          finalCounts[item.id] = item.targetValue;
        });
        setCounts(finalCounts);
      }
    };

    requestAnimationFrame(updateFrame);
  };

  const handleManualReplay = () => {
    setCounts({ experience: 0, experts: 0, projects: 0, compliance: 0 });
    setTimeout(() => {
      runCounterAnimation();
    }, 50);
  };

  return (
    <section
      ref={sectionRef}
      id="company-stats"
      className="relative z-20 -mt-10 sm:-mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      aria-label="Company Key Performance Metrics"
    >
      {/* Container Card with subtle shadow & architectural glass styling */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-900/5 p-6 sm:p-8 lg:p-10 backdrop-blur-md">
        
        {/* Section Top Header / Context */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#00B4D8] mb-1.5 font-['Plus_Jakarta_Sans']">
              <Sparkles className="w-3.5 h-3.5 text-[#00B4D8]" />
              <span>Proven Track Record & Technical Capacity</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight font-['Plus_Jakarta_Sans']">
              Data-Driven Engineering Benchmarks
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 hidden sm:inline">
              Verified corporate statistics across Delta State & nationwide
            </span>
            <button
              onClick={handleManualReplay}
              title="Re-run animated statistics counter"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-[#0B2545] transition-colors cursor-pointer"
            >
              <TrendingUp className="w-3.5 h-3.5 text-[#00B4D8]" />
              <span>Replay Metrics</span>
            </button>
          </div>
        </div>

        {/* 4-Column Animated Counter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS_DATA.map((item) => {
            const Icon = item.icon;
            const currentCount = counts[item.id] ?? 0;

            return (
              <div
                key={item.id}
                onClick={() => setActiveStat(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveStat(item);
                  }
                }}
                className="group relative flex flex-col justify-between p-5 rounded-xl border border-slate-200 bg-linear-to-b from-slate-50/60 to-white hover:from-white hover:to-sky-50/30 hover:border-[#00B4D8]/50 hover:shadow-md transition-all duration-300 text-left cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#00B4D8]"
              >
                {/* Header with Icon and Category */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
                      style={{
                        backgroundColor: `${item.accentColor}15`,
                        color: item.accentColor,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {item.badgeText}
                    </span>
                  </div>

                  {/* Animated Counter Number */}
                  <div className="flex items-baseline gap-1 mb-1">
                    <span
                      className="text-4xl sm:text-5xl font-extrabold tracking-tight font-['Plus_Jakarta_Sans']"
                      style={{ color: item.id === 'experts' ? '#D97706' : item.id === 'experience' ? '#0284C7' : '#0B2545' }}
                      aria-live="polite"
                    >
                      {item.prefix}
                      {currentCount}
                    </span>
                    <span
                      className="text-2xl sm:text-3xl font-extrabold"
                      style={{ color: item.id === 'experts' ? '#D97706' : item.id === 'experience' ? '#0284C7' : '#0B2545' }}
                    >
                      {item.suffix}
                    </span>
                  </div>

                  {/* Metric Title Label */}
                  <div className="text-base font-bold text-[#0B2545] font-['Plus_Jakarta_Sans'] mb-2">
                    {item.id === 'experience'
                      ? t('stats.years', item.displayLabel)
                      : item.id === 'experts'
                      ? t('stats.experts', item.displayLabel)
                      : item.id === 'projects'
                      ? t('stats.projects', item.displayLabel)
                      : t('stats.safety', item.displayLabel)}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {item.id === 'experience'
                      ? t('stats.years_sub', item.description)
                      : item.id === 'experts'
                      ? t('stats.experts_sub', item.description)
                      : item.id === 'projects'
                      ? t('stats.projects_sub', item.description)
                      : t('stats.safety_sub', item.description)}
                  </p>
                </div>

                {/* Footer Micro-CTA to view breakdown */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0B2545] group-hover:text-[#00B4D8] transition-colors">
                  <span className="flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#00B4D8]" />
                    <span>View Breakdown</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Assurance Bar */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Audited against Federal Ministry of Works standards and Delta State Ministry of Urban Development guidelines.</span>
          </div>
          <div className="flex items-center gap-4 text-slate-600 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Operations 2026
            </span>
            <span>Head Office: Eku, Delta State</span>
          </div>
        </div>

      </div>

      {/* Interactive Metric Detail Modal */}
      {activeStat && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          onClick={() => setActiveStat(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
          >
            {/* Modal Header */}
            <div className="p-6 bg-[#0B2545] text-white relative">
              <button
                onClick={() => setActiveStat(null)}
                className="absolute top-4 right-4 text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#00B4D8] uppercase tracking-wider mb-2">
                <Layers className="w-3.5 h-3.5" />
                <span>{activeStat.category}</span>
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-extrabold text-white font-['Plus_Jakarta_Sans']">
                  {activeStat.displayLabel}
                </span>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#00B4D8]/20 text-[#00B4D8] border border-[#00B4D8]/30">
                  {activeStat.badgeText}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                {activeStat.headline}
              </p>
            </div>

            {/* Modal Body / Breakdown */}
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed">
                {activeStat.description}
              </p>

              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 font-['Plus_Jakarta_Sans']">
                  Key Verification Breakdown
                </h4>
                <div className="space-y-2.5">
                  {activeStat.breakdown.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start justify-between gap-3"
                    >
                      <div>
                        <div className="text-xs font-bold text-[#0B2545]">
                          {item.label}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {item.detail}
                        </div>
                      </div>
                      <span className="text-xs font-bold px-2 py-1 rounded-md bg-white border border-slate-200 text-[#0B2545] shrink-0 font-['JetBrains_Mono']">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setActiveStat(null)}
                  className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#0B2545] hover:bg-[#133966] text-white transition-colors cursor-pointer"
                >
                  Close Breakdown
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
