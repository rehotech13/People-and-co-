import React from 'react';
import { X, ShieldCheck, Lock, FileText } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="p-6 bg-[#0B2545] text-white flex items-center justify-between sticky top-0 z-10 border-b border-[#07172B]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#00B4D8]" />
            <h3 className="font-bold text-lg font-['Plus_Jakarta_Sans']">
              Client Privacy & Data Protection Notice
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-5 text-sm text-slate-600 leading-relaxed">
          <div className="text-xs text-slate-400">
            Last Updated: October 2026 · Governed by Nigerian Data Protection Act (NDPA)
          </div>

          <div>
            <h4 className="font-bold text-[#0B2545] text-base mb-1">1. Information We Collect</h4>
            <p>
              When you submit a consultation request or property inquiry through the official portal of <strong>{COMPANY_CONFIG.name}</strong>, we collect personal contact information including your full name, email address, telephone/WhatsApp number, optional company affiliation, project location, and description of requested building/civil engineering services.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#0B2545] text-base mb-1">2. Purpose of Processing</h4>
            <p>
              Your information is collected solely to:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-xs sm:text-sm">
              <li>Review your technical engineering and construction specifications.</li>
              <li>Provide accurate Bill of Quantities (BOQ), site inspection schedules, and cost quotations.</li>
              <li>Contact you via your chosen communication method (WhatsApp, Email, or Telephone).</li>
              <li>Comply with statutory civil engineering documentation requirements in Delta State and Nigeria.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#0B2545] text-base mb-1">3. Confidentiality & Non-Disclosure</h4>
            <p>
              We maintain strict confidentiality regarding all structural plans, architectural drawings, and budgetary allocations. We do not sell, rent, lease, or distribute your contact details to third-party marketing companies, speculative brokers, or solicitors.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#0B2545] text-base mb-1">4. Data Retention & Access Rights</h4>
            <p>
              Enquiry records are retained securely on our corporate server for active client communications and auditing purposes. Under applicable Nigerian data protection regulations, you retain the right to request review, rectification, or deletion of your contact records at any time by contacting our designated privacy desk at <a href={`mailto:${COMPANY_CONFIG.contact.officialEmail}`} className="text-[#00B4D8] underline">{COMPANY_CONFIG.contact.officialEmail}</a>.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-500">
            <strong>Headquarters:</strong> {COMPANY_CONFIG.contact.address} · <strong>Direct Line:</strong> {COMPANY_CONFIG.contact.phoneDisplay}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-[#0B2545] hover:bg-[#07172B] rounded-lg transition-colors cursor-pointer"
          >
            I Understand & Agree
          </button>
        </div>

      </div>
    </div>
  );
};
