import React, { useState } from 'react';
import {
  Star,
  Quote,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Building2,
  Globe2,
  Home,
  MessageSquare,
  ArrowRight,
  Filter,
  UserCheck,
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  location: string;
  category: 'diaspora' | 'commercial' | 'residential' | 'institutional';
  projectTitle: string;
  rating: number;
  date: string;
  content: string;
  verified: boolean;
  highlight: string;
}

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    clientName: 'Dr. (Mrs.) Blessing Oghenekevwe',
    role: 'Diaspora Investor & NHS Healthcare Consultant',
    location: 'London, UK / Project in Eku, Delta State',
    category: 'diaspora',
    projectTitle: '5-Bedroom Contemporary Luxury Villa & Perimeter Works',
    rating: 5,
    date: 'January 2026',
    highlight: 'Weekly photo logs & milestone tracker made building from London stress-free',
    content:
      'Building in Nigeria while living in the UK used to give me severe anxiety after hearing past horror stories from relatives. People and Co Construction Firm completely transformed that experience. Their Live Project Tracker allowed me to inspect concrete cure certifications, drone photos, and milestone sign-offs weekly from London. Delivered ahead of time and on budget.',
    verified: true,
  },
  {
    id: 't-2',
    clientName: 'Engr. Emmanuel Okoro',
    role: 'Managing Director, Delta Agro-Allied Processing Facility',
    location: 'Asaba, Delta State',
    category: 'commercial',
    projectTitle: 'Industrial Warehouse & Heavy Processing Plant Foundations',
    rating: 5,
    date: 'February 2026',
    highlight: 'Rigorous soil mechanics and zero hidden cost variations on BOQ',
    content:
      'People and Co Construction Firm managed our structural framing and heavy machinery foundation with top-tier civil engineering precision. Their BOQ estimation was spot-on with zero hidden cost surprises, and their soil stabilization in the delta wetland terrain was handled impeccably.',
    verified: true,
  },
  {
    id: 't-3',
    clientName: 'High Chief Kenneth Ejiro',
    role: 'Chairman, Ejiro Commercial Properties Ltd',
    location: 'Warri, Delta State',
    category: 'commercial',
    projectTitle: '4-Storey Retail & Corporate Office Plaza',
    rating: 5,
    date: 'November 2025',
    highlight: 'Raft foundation engineering meets stringent structural codes',
    content:
      'Their structural engineering standards meet international building codes. The raft foundation designed and poured by their resident engineers gave us absolute peace of mind given Warri’s demanding coastal water table. They are our go-to contractor for commercial developments.',
    verified: true,
  },
  {
    id: 't-4',
    clientName: 'Arc. Tunde Balogun',
    role: 'Principal Architect & Consulting Partner',
    location: 'Lagos & Nationwide Projects',
    category: 'commercial',
    projectTitle: 'Architectural Concrete Framing & Retaining Walls',
    rating: 5,
    date: 'December 2025',
    highlight: 'Respects working drawings and rebar schedules down to the millimeter',
    content:
      'As a consulting architect, it is rare to find a Nigerian contractor who respects architectural working drawings and structural rebar specifications down to the millimeter without cutting corners. PACCF executes with absolute integrity and technical discipline.',
    verified: true,
  },
  {
    id: 't-5',
    clientName: 'Mrs. Patricia Omovigho',
    role: 'Homeowner & University Senior Lecturer',
    location: 'Abraka, Delta State',
    category: 'residential',
    projectTitle: '4-Bedroom Bungalow & Smart Perimeter Drainage',
    rating: 5,
    date: 'March 2026',
    highlight: 'Honest billing, high quality German floor reinforcement and daily site presence',
    content:
      'Honest billing, high density hollow sandcrete blocks, and standard German floor reinforcement. The PACCF site supervisor was on site daily ensuring our drainage gradient and roof trusses were completed without faults. Outstanding craftsmanship!',
    verified: true,
  },
  {
    id: 't-6',
    clientName: 'Pastor David Nwachukwu',
    role: 'Board of Trustees, Grace City Community Sanctuary',
    location: 'Sapele, Delta State',
    category: 'institutional',
    projectTitle: '1,200-Seater Auditorium Steel Trusses & Civil Drainage',
    rating: 5,
    date: 'October 2025',
    highlight: 'Punctual milestone delivery with certified safety inspections',
    content:
      'From foundation footing to long-span roof truss installation, People and Co Construction Firm demonstrated genuine integrity, punctuality, and engineering excellence. Their team kept our building committee informed at every single milestone.',
    verified: true,
  },
  {
    id: 't-7',
    clientName: 'Chief & Engr. Obaro Onoriode',
    role: 'Diaspora Real Estate Investor & Energy Executive',
    location: 'Dallas, Texas, USA / Project in Asaba, Delta State',
    category: 'diaspora',
    projectTitle: 'Twin Luxury 4-Bedroom Semi-Detached Duplexes (Rental Portfolio)',
    rating: 5,
    date: 'April 2026',
    highlight: 'Strict financial integrity, zero material diversion & stellar rental yield',
    content:
      'Investing in real estate back home in Nigeria while based in Texas requires total financial trust. People and Co Construction Firm provided transparent milestone billing, batch-tested concrete crush reports, and weekly drone inspections. Not a single bag of cement or rod was unaccounted for, and the rental yield valuation exceeded our projections.',
    verified: true,
  },
];

interface TestimonialsSectionProps {
  onConsultationClick: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onConsultationClick,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  // Simple feedback form state
  const [clientName, setClientName] = useState('');
  const [location, setLocation] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const filteredTestimonials =
    selectedCategory === 'all'
      ? INITIAL_TESTIMONIALS
      : INITIAL_TESTIMONIALS.filter((t) => t.category === selectedCategory);

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedMessage(true);

    // Relay review feedback to company inbox via Web3Forms
    fetch(COMPANY_CONFIG.web3forms.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        access_key: COMPANY_CONFIG.web3forms.accessKey,
        subject: `[PACCF Client Review] ${rating}★ from ${clientName} (${location})`,
        from_name: 'People and Co Construction Firm Reviews Desk',
        client_name: clientName,
        client_location: location,
        project_title: projectTitle,
        rating: `${rating} / 5 Stars`,
        review_comment: comment,
      }),
    }).catch((err) => console.warn('Review Web3Forms relay notice:', err));

    setTimeout(() => {
      setSubmittedMessage(false);
      setFeedbackModalOpen(false);
      setClientName('');
      setLocation('');
      setProjectTitle('');
      setComment('');
    }, 2200);
  };

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[#F8FAFC] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#0B2545] mb-2">
              <span>Client & Diaspora Feedback</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#00B4D8] font-bold">What Our Investors Say</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B2545] font-['Plus_Jakarta_Sans']">
              What Our Investors & Clients Say
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mt-3">
              Read verified testimonials from diaspora investors across the UK & US, commercial developers, and institutional directors who entrust their high-value builds to People and Co Construction Firm.
            </p>
          </div>

          {/* Social Proof Trust Badge */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-lg bg-[#0B2545] flex items-center justify-center text-white font-black text-lg">
              4.9
            </div>
            <div>
              <div className="flex items-center gap-1 text-[#F59E0B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs font-bold text-[#0B2545] mt-0.5">
                150+ Verified Client Builds
              </p>
              <p className="text-[11px] text-slate-500">
                100% Structural Safety Record
              </p>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-10 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {[
              { id: 'all', label: 'All Testimonials' },
              { id: 'diaspora', label: 'Diaspora Investors' },
              { id: 'commercial', label: 'Commercial & Civil' },
              { id: 'residential', label: 'Residential Builds' },
              { id: 'institutional', label: 'Institutional' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-[#0B2545] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-[#0B2545] hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setFeedbackModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00B4D8] hover:text-[#0B2545] transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Submit Client Review</span>
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header: Stars & Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1 text-[#F59E0B]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  {item.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <UserCheck className="w-3 h-3 text-emerald-600" />
                      <span>Verified Client</span>
                    </span>
                  )}
                </div>

                {/* Highlight callout */}
                <div className="text-xs font-bold text-[#0B2545] bg-sky-50/70 border-l-2 border-[#00B4D8] pl-2.5 py-1 mb-4 italic">
                  "{item.highlight}"
                </div>

                {/* Quote Content */}
                <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                  {item.content}
                </p>
              </div>

              {/* Author & Project Footer */}
              <div className="pt-4 border-t border-slate-100 mt-auto">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-[#0B2545] font-['Plus_Jakarta_Sans']">
                      {item.clientName}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {item.role}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex flex-col gap-1 text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-1.5 font-medium text-slate-700 truncate">
                    <Building2 className="w-3.5 h-3.5 text-[#00B4D8] shrink-0" />
                    <span className="truncate">{item.projectTitle}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 shrink-0" /> {item.location}
                    </span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner: Consultation CTA */}
        <div className="rounded-2xl bg-[#0B2545] text-white p-8 sm:p-10 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00B4D8] mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Full Engineering Accountability</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Plus_Jakarta_Sans'] tracking-tight">
              Ready to Experience Construction with Zero Friction?
            </h3>
            <p className="text-sm text-slate-200 mt-2">
              Whether you are resident in Delta State or building from abroad, get transparent BOQ pricing and live milestone tracking for your project today.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={onConsultationClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-[#0B2545] bg-[#F59E0B] hover:bg-[#D97706] rounded-lg transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              <span>Request a Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Review Submission Modal */}
      {feedbackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#00B4D8]" />
                <h3 className="font-bold text-[#0B2545] text-lg">
                  Submit Project Feedback
                </h3>
              </div>
              <button
                onClick={() => setFeedbackModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {submittedMessage ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-[#0B2545]">
                  Thank You for Your Feedback!
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Your review has been submitted for client verification and publication.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitFeedback} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Your Full Name & Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Dr. O. Oghenekevwe"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Location / Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Asaba / London"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Project Type *
                    </label>
                    <input
                      type="text"
                      required
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      placeholder="e.g. 4-Bedroom Duplex"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Rating (1 to 5 Stars)
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= rating
                              ? 'text-[#F59E0B] fill-[#F59E0B]'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-600 ml-2">
                      {rating} of 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Your Review & Experience *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about the quality, timeliness, BOQ transparency, or communication during your build..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setFeedbackModalOpen(false)}
                    className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0B2545] hover:bg-[#07172B] text-white rounded-lg font-bold cursor-pointer"
                  >
                    Submit Feedback
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
