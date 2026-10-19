import React, { useState } from 'react';
import { Menu, X, Inbox } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenInbox: () => void;
  unreadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenInbox,
  unreadCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { id: 'home', labelKey: 'nav.home', fallback: 'Home' },
    { id: 'about', labelKey: 'nav.about', fallback: 'About' },
    { id: 'services', labelKey: 'nav.services', fallback: 'Services' },
    { id: 'projects', labelKey: 'nav.portfolio', fallback: 'Portfolio' },
    { id: 'cost-estimator', labelKey: 'nav.estimator', fallback: 'Estimator' },
    { id: 'testimonials', labelKey: 'nav.investors', fallback: 'Investors' },
    { id: 'trackers', labelKey: 'nav.tracker', fallback: 'Tracker' },
    { id: 'gallery', labelKey: 'nav.gallery', fallback: 'Gallery' },
    { id: 'properties', labelKey: 'nav.listings', fallback: 'Listings' },
    { id: 'faq', labelKey: 'nav.faq', fallback: 'FAQ' },
    { id: 'contact', labelKey: 'nav.contact', fallback: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-20">
          
          {/* Zone 1: Single Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home');
            }}
            className="flex items-center gap-3 whitespace-nowrap shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-md"
          >
            {/* Official Company Logo */}
            <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-lg overflow-hidden bg-white border border-slate-200/90 shadow-xs flex items-center justify-center p-0.5 group-hover:border-[#00B4D8] transition-colors shrink-0">
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
            <div className="flex flex-col text-left leading-none">
              <span className="text-base sm:text-lg font-bold tracking-tight text-[#0B2545] font-['Plus_Jakarta_Sans']">
                PEOPLE AND CO
              </span>
              <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mt-1">
                CONSTRUCTION FIRM
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-slate-600">
            {navLinks.map((link) => {
              const label = t(link.labelKey, link.fallback);
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded cursor-pointer ${
                    activeSection === link.id
                      ? 'text-[#0B2545] font-semibold'
                      : 'text-slate-600 hover:text-[#0B2545]'
                  }`}
                >
                  {label}
                  {activeSection === link.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00B4D8]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions & Language Switcher */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            {/* Language Switcher Dropdown */}
            <LanguageSwitcher variant="navbar" />

            <button
              onClick={onOpenInbox}
              title={t('nav.inbox', 'Review Client Enquiries')}
              className="relative p-2 text-slate-600 hover:text-[#0B2545] hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 cursor-pointer"
            >
              <Inbox className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F59E0B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleLinkClick('contact')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0B2545] hover:bg-[#07172B] active:scale-[0.99] rounded-lg transition-all shadow-xs hover:shadow whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 cursor-pointer"
            >
              {t('nav.consultation', 'Consultation')}
            </button>
          </div>

          {/* Mobile Right Controls: Compact Language + Drawer Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher variant="navbar" />

            <button
              onClick={onOpenInbox}
              className="p-1.5 text-slate-600 hover:text-slate-900 rounded-md cursor-pointer relative"
              title="Inbox"
            >
              <Inbox className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#F59E0B] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const label = t(link.labelKey, link.fallback);
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    activeSection === link.id
                      ? 'bg-slate-100 text-[#0B2545] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {label}
                </button>
              );
            })}

            {/* Language Switcher in Mobile Drawer */}
            <div className="mt-2">
              <LanguageSwitcher variant="mobile" />
            </div>

            <div className="pt-3 border-t border-slate-100 mt-2 flex flex-col gap-2">
              <button
                onClick={() => handleLinkClick('contact')}
                className="w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-[#0B2545] rounded-lg cursor-pointer"
              >
                {t('nav.consultation', 'Request Consultation')}
              </button>
              <div className="text-xs text-slate-500 text-center pt-1">
                Official Hotline: {COMPANY_CONFIG.contact.phoneDisplay}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
