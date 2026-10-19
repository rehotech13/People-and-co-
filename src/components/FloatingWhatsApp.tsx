import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const phone = COMPANY_CONFIG.contact.whatsapp;
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    'Hello People and Co Construction Firm, I am visiting your website and would like to enquire about your civil engineering, building construction, or property services.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-xl shadow-lg animate-in fade-in slide-in-from-right-2 duration-150 border border-slate-700">
          <span>Chat directly with our Engineers on WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white p-0.5"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
        aria-label="Chat with People and Co Construction Firm on WhatsApp"
        title="Chat on WhatsApp (+234 806 037 1283)"
      >
        <MessageSquare className="w-6 h-6 fill-white text-white" />
      </a>
    </div>
  );
};
