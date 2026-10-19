import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck, ArrowUp, Lock } from 'lucide-react';
import { COMPANY_CONFIG, COMPANY_SERVICES } from '../config/company';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onRequestService: (serviceTitle: string) => void;
  onOpenPrivacyPolicy: () => void;
  onOpenInbox: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onRequestService,
  onOpenPrivacyPolicy,
  onOpenInbox,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07172B] text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-lg bg-white border border-slate-700 overflow-hidden flex items-center justify-center p-0.5 shrink-0">
                <img
                  src={COMPANY_CONFIG.logoUrl}
                  alt="People and Co Construction Firm Logo"
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== window.location.origin + COMPANY_CONFIG.logoFallback) {
                      target.src = COMPANY_CONFIG.logoFallback;
                    }
                  }}
                />
              </div>
              <span className="text-lg font-bold tracking-tight text-white font-['Plus_Jakarta_Sans']">
                {COMPANY_CONFIG.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Delivering civil engineering, building construction, structural design, BOQ estimation, and construction project management across Delta State and nationwide.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00B4D8] shrink-0 mt-0.5" />
                <span>{COMPANY_CONFIG.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <a href={`tel:${COMPANY_CONFIG.contact.phone}`} className="hover:text-white transition-colors">
                  {COMPANY_CONFIG.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00B4D8] shrink-0" />
                <a href={`mailto:${COMPANY_CONFIG.contact.officialEmail}`} className="hover:text-white transition-colors">
                  {COMPANY_CONFIG.contact.officialEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  About Us & Principles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Core Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('service-area')}
                  className="hover:text-white transition-colors text-left cursor-pointer text-[#00B4D8]"
                >
                  Delta State 25 LGAs Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Demonstration Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cost-estimator')}
                  className="hover:text-white transition-colors text-left cursor-pointer text-[#00B4D8]"
                >
                  Project Cost Estimator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('testimonials')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  What Our Investors Say
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('trackers')}
                  className="hover:text-white transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span className="text-[#00B4D8]">Live Project Tracker</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-[#00B4D8]/20 text-[#00B4D8] rounded font-mono">LIVE</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('project-timeline')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Construction Lifecycle
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('properties')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Property & Land Listings
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Construction & Works Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Frequently Asked Questions (FAQ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Contact & Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* Core Services Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Services Directory
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
              {COMPANY_SERVICES.map((srv) => (
                <button
                  key={srv.id}
                  onClick={() => onRequestService(srv.title)}
                  className="text-left hover:text-[#00B4D8] transition-colors py-1 cursor-pointer truncate"
                  title={`Request ${srv.title}`}
                >
                  {srv.title}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {COMPANY_CONFIG.name}. All rights reserved. Registered operating presence in Delta State, Nigeria.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacyPolicy}
              className="hover:text-slate-300 transition-colors underline cursor-pointer"
            >
              Privacy Notice
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={onOpenInbox}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-slate-400"
              title="Staff / Owner Review Portal"
            >
              <Lock className="w-3 h-3 text-[#F59E0B]" />
              <span>Owner Inbox</span>
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
