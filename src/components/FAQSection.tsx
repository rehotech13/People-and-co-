import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare, Phone, ArrowRight, Search, ShieldCheck } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface FAQItem {
  id: string;
  category: 'timelines' | 'management' | 'coverage' | 'costs';
  categoryLabel: string;
  question: string;
  answer: string;
  keyTakeaway?: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-timeline-01',
    category: 'timelines',
    categoryLabel: 'Timelines & Delivery',
    question: 'How long does a standard residential or commercial construction project take from foundation to handover?',
    answer:
      'Timelines vary based on structural scale, soil condition, and finishing specifications. For a standard 4 to 5-bedroom executive duplex, structural completion (from foundation to roofing) typically spans 3 to 4 months, while full turnkey finishing and MEP installations take an additional 2 to 3 months. Commercial plazas (3–4 stories) generally take between 9 to 14 months. Every project begins with a binding Gantt chart schedule that defines exact milestone deadlines before work commences.',
    keyTakeaway: 'Residential turnkey handover: 5–7 months. Commercial facilities: 9–14 months with formal Gantt chart milestones.'
  },
  {
    id: 'faq-timeline-02',
    category: 'timelines',
    categoryLabel: 'Timelines & Delivery',
    question: 'How do you handle rainy season weather in Delta State without delaying project progress?',
    answer:
      'The Niger Delta experiences heavy seasonal rainfall, which can disrupt earthworks if not planned methodically. We schedule heavy excavation, foundation footing, and raft casting during optimal weather windows. During peak rainfall months, our engineers prioritize internal partition masonry, electrical/plumbing rough-in, ceiling plastering, and interior finishes while utilizing specialized dewatering pumps, protective tarpaulins, and fast-curing concrete additives on open sites.',
    keyTakeaway: 'Engineered weather mitigation: Deep earthworks scheduled in dry windows; interior MEP and finishes scheduled during rains.'
  },
  {
    id: 'faq-mgmt-01',
    category: 'management',
    categoryLabel: 'Project Management',
    question: 'How does People and Co Construction Firm manage site supervision and cost control?',
    answer:
      'We operate under a strict "Owner-Advocate" project management philosophy. Every active site is assigned a qualified resident site engineer who conducts daily material checks and quality gate audits. Financially, we prepare a line-item Bill of Quantities (BOQ) with verifiable market rates. Disbursements are tied strictly to validated stage completions (e.g., foundation footing, DPC lintel, first-floor decking, roofing, plastering), eliminating contractor default risk.',
    keyTakeaway: 'Dedicated site engineers, itemized BOQ, and milestone-gated disbursements protect clients from margin padding.'
  },
  {
    id: 'faq-mgmt-02',
    category: 'management',
    categoryLabel: 'Project Management',
    question: 'How can diaspora and out-of-state property owners monitor their project’s physical progress?',
    answer:
      'Over 40% of our private building clients reside in the diaspora (UK, US, Canada, Europe) or other Nigerian states (Lagos, Abuja, Port Harcourt). We provide comprehensive remote project visibility: bi-weekly high-resolution photographic and drone progress logs, direct WhatsApp video walkthroughs with our lead engineers, and digital stage verification certificates before requesting subsequent phase payments.',
    keyTakeaway: 'Diaspora-tailored reporting: Bi-weekly photo/video logs, live WhatsApp video site tours, and verified payment milestones.'
  },
  {
    id: 'faq-mgmt-03',
    category: 'management',
    categoryLabel: 'Project Management',
    question: 'Do you handle town planning approvals and structural engineering permits with Delta State authorities?',
    answer:
      'Yes. Our structural design division produces certified calculation booklets and full architectural/structural blueprint packages complying with Eurocode 2 and BS 8110 standards. We liaise directly with municipal town planning offices in Ethiope East LGA, Warri, Asaba, and relevant state ministry authorities to secure building plan approvals and statutory permits.',
    keyTakeaway: 'Complete statutory support: Certified structural drawing sets and smooth municipal council plan approvals.'
  },
  {
    id: 'faq-coverage-01',
    category: 'coverage',
    categoryLabel: 'Service Coverage',
    question: 'What geographic areas and regions across Delta State and Nigeria do you service?',
    answer:
      'Our corporate headquarters is centrally positioned at 50 along New Eku-Abraka Road, Eku, Ethiope East LGA. We actively manage projects and site mobilizations across the entire Eku–Abraka university corridor, Warri metropolis, Sapele, Ughelli, Asaba capital territory, and all 25 Local Government Areas of Delta State. For large-scale civil engineering, infrastructure, and commercial property developments, our engineering teams mobilize nationwide.',
    keyTakeaway: 'Headquartered in Eku, Ethiope East; serving all 25 Delta State LGAs and nationwide turnkey developments.'
  },
  {
    id: 'faq-coverage-02',
    category: 'coverage',
    categoryLabel: 'Service Coverage',
    question: 'Can your team perform physical land inspection and title due diligence before I purchase a property?',
    answer:
      'Yes. Through our Land Agent & Surveying division, we conduct comprehensive pre-acquisition investigations. This includes physical boundary beacon confirmation, topographical flood risk analysis, cadastral survey plan verification, and town planning zoning checks to ensure the land is free from communal disputes, government acquisitions, or legal encumbrances.',
    keyTakeaway: 'Full pre-purchase security: Physical boundary inspection, beacon verification, and government zoning checks.'
  },
  {
    id: 'faq-costs-01',
    category: 'costs',
    categoryLabel: 'Costs & Billing',
    question: 'How are payments and project finances structured? Do you require full payment upfront?',
    answer:
      'No, we never demand 100% upfront payments. Work is divided into distinct, contractual phase milestones: Phase 1 (Site mobilization & foundation footing), Phase 2 (Superstructure blockwork & lintels), Phase 3 (Roofing & carcass enclosure), Phase 4 (MEP piping & interior plastering), and Phase 5 (Finishing, tiling, painting & commissioning). A final retention percentage is held until handover inspection to guarantee flawless quality.',
    keyTakeaway: 'Zero 100% upfront demand: Staged milestone disbursements backed by certified engineer valuation reports.'
  }
];

interface FAQSectionProps {
  onConsultationClick: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onConsultationClick }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-timeline-01');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'timelines', label: 'Timelines & Delivery' },
    { id: 'management', label: 'Project Management' },
    { id: 'coverage', label: 'Service Coverage' },
    { id: 'costs', label: 'Costs & Invoicing' },
  ];

  const filteredFAQs = FAQ_DATA.filter((item) => {
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchQ = item.question.toLowerCase().includes(q);
      const matchA = item.answer.toLowerCase().includes(q);
      const matchCat = item.categoryLabel.toLowerCase().includes(q);
      return matchQ || matchA || matchCat;
    }
    return true;
  });

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#0B2545] mb-2">
            <span>Frequently Asked Questions</span>
            <span aria-hidden="true">·</span>
            <span>Client Advisory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight font-['Plus_Jakarta_Sans']">
            Clear Answers for Confident Decisions
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Essential information regarding our construction schedules, site management methodologies, diaspora reporting, and operating coverage across Delta State and Nigeria.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs (Interactive Segmented Control adhering to anti-pill rules) */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-xl overflow-x-auto shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-white text-[#0B2545] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Filter Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. diaspora, rain)..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

        </div>

        {/* Accordion List */}
        <div className="space-y-3 mb-12">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12 px-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
              No matching questions found for "{searchQuery}". Try a different keyword or reset filters.
            </div>
          ) : (
            filteredFAQs.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
                    isExpanded
                      ? 'border-[#00B4D8] shadow-sm ring-1 ring-[#00B4D8]/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full px-6 py-4.5 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                    aria-expanded={isExpanded}
                  >
                    <div>
                      <div className="text-[11px] font-bold text-[#00B4D8] uppercase tracking-wider mb-1">
                        {item.categoryLabel}
                      </div>
                      <h3 className="text-base font-bold text-[#0B2545] font-['Plus_Jakarta_Sans'] leading-snug">
                        {item.question}
                      </h3>
                    </div>

                    <div className="p-1 rounded-md text-slate-400 hover:text-[#0B2545] shrink-0 mt-1 transition-transform duration-200">
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-[#00B4D8]' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6 pt-1 text-sm text-slate-600 border-t border-slate-100 animate-in fade-in duration-150 space-y-3">
                      <p className="leading-relaxed">{item.answer}</p>
                      {item.keyTakeaway && (
                        <div className="p-3 rounded-lg bg-sky-50/80 border border-sky-100 flex items-start gap-2.5 text-xs text-sky-950 font-medium">
                          <ShieldCheck className="w-4 h-4 text-[#00B4D8] shrink-0 mt-0.5" />
                          <span>
                            <strong>Key Takeaway:</strong> {item.keyTakeaway}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Action Callout Box */}
        <div className="bg-[#0B2545] text-white rounded-2xl p-8 sm:p-10 border border-[#07172B] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-['Plus_Jakarta_Sans'] text-white mb-2">
              Have a Specific Construction or Structural Question?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our lead civil engineers and project managers are available for direct technical consultations, site evaluations, and BOQ reviews.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={`https://wa.me/${COMPANY_CONFIG.contact.whatsapp}?text=Hello%20People%20and%20Co%20Construction%20Firm,%20I%20have%20a%20question%20regarding%20your%20construction%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-[#0B2545] bg-[#00B4D8] hover:bg-[#38bdf8] rounded-xl transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>

            <button
              onClick={onConsultationClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors cursor-pointer"
            >
              <span>Submit Project Brief</span>
              <ArrowRight className="w-4 h-4 text-[#F59E0B]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
