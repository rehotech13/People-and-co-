import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle2, AlertTriangle, Clock, ShieldCheck, ArrowRight, Copy, Check, Mic } from 'lucide-react';
import { COMPANY_CONFIG, COMPANY_SERVICES } from '../config/company';
import { EnquiryFormData } from '../types';
import { AudioTranscriberButton } from './AudioTranscriberButton';
import { useLanguage } from '../context/LanguageContext';

interface ContactSectionProps {
  initialService?: string;
  initialSubject?: string;
  onOpenPrivacyPolicy: () => void;
  onSubmissionSuccess?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService = '',
  initialSubject = '',
  onOpenPrivacyPolicy,
  onSubmissionSuccess,
}) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    service: initialService || COMPANY_SERVICES[0].title,
    subject: initialSubject || '',
    projectLocation: '',
    estimatedBudget: 'Not sure yet',
    preferredContactMethod: 'whatsapp',
    message: '',
    privacyConsent: false,
    _hp: '', // Honeypot spam trap
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    message: string;
    enquiryId?: string;
    timestamp?: string;
    recipientEmail?: string;
  } | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Sync props when user clicks "Request This Service" or "Enquire Property"
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
    if (initialSubject) {
      setFormData((prev) => ({ ...prev, subject: initialSubject }));
    }
  }, [initialService, initialSubject]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof EnquiryFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address (e.g. name@domain.com).';
    }

    // Phone format suitable for Nigerian (+234 / 080...) and international numbers
    const phoneClean = formData.phone.trim().replace(/[\s\-()]/g, '');
    if (!phoneClean) {
      newErrors.phone = 'Contact telephone number is required.';
    } else if (phoneClean.length < 7 || phoneClean.length > 17 || !/^\+?\d+$/.test(phoneClean)) {
      newErrors.phone = 'Please provide a valid telephone number (e.g. +234 806 037 1283 or 08060371283).';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service of interest.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Enquiry subject is required.';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject should be at least 3 characters.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details about your project or enquiry.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    if (!formData.privacyConsent) {
      newErrors.privacyConsent = 'You must accept the privacy terms before submitting.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setSubmitting(true);
    setSubmissionResult(null);

    try {
      // 1. Dispatch directly to Web3Forms API
      const web3Payload = {
        access_key: COMPANY_CONFIG.web3forms.accessKey,
        subject: `[PACCF Enquiry] ${formData.subject} - ${formData.service}`,
        from_name: 'People and Co Construction Firm Portal',
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || 'Not specified',
        service: formData.service,
        project_location: formData.projectLocation || 'Not specified',
        estimated_budget: formData.estimatedBudget,
        preferred_contact_method: formData.preferredContactMethod,
        message: formData.message,
      };

      let web3Success = false;
      let web3Message = '';
      try {
        const web3Response = await fetch(COMPANY_CONFIG.web3forms.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(web3Payload),
        });
        const web3Data = await web3Response.json();
        if (web3Response.ok && web3Data.success) {
          web3Success = true;
          web3Message = web3Data.message || 'Dispatched via Web3Forms';
        }
      } catch (wErr) {
        console.warn('Web3Forms direct dispatch notice:', wErr);
      }

      // 2. Also register in local/backend API for the admin enquiry review desk
      let localSuccess = false;
      let localEnquiryId = '';
      let localRecipient = COMPANY_CONFIG.contact.officialEmail;
      try {
        const localResponse = await fetch('/api/enquiries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const localData = await localResponse.json();
        if (localResponse.ok && localData.success) {
          localSuccess = true;
          localEnquiryId = localData.enquiryId;
          localRecipient = localData.recipientEmail || localRecipient;
        }
      } catch (lErr) {
        console.warn('Local API storage notice:', lErr);
      }

      if (web3Success || localSuccess) {
        const generatedId = localEnquiryId || `PACCF-${Date.now().toString(36).toUpperCase()}`;
        setSubmissionResult({
          success: true,
          message:
            'Thank you for contacting People and Co Construction Firm. Your enquiry has been submitted successfully and delivered directly to our management desk via Web3Forms. Our resident engineering team will reach out to you shortly.',
          enquiryId: generatedId,
          timestamp: new Date().toISOString(),
          recipientEmail: localRecipient,
        });

        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          service: COMPANY_SERVICES[0].title,
          subject: '',
          projectLocation: '',
          estimatedBudget: 'Not sure yet',
          preferredContactMethod: 'whatsapp',
          message: '',
          privacyConsent: false,
          _hp: '',
        });
        setErrors({});

        if (onSubmissionSuccess) {
          onSubmissionSuccess();
        }
      } else {
        setSubmissionResult({
          success: false,
          message: 'Failed to submit enquiry. Please verify your internet connection or reach our engineering desk directly at ' + COMPANY_CONFIG.contact.phoneDisplay,
        });
      }
    } catch (err) {
      setSubmissionResult({
        success: false,
        message: 'Network connection issue. Please check your internet connection or call our office directly at ' + COMPANY_CONFIG.contact.phoneDisplay,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const copyEnquiryId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const budgetOptions = [
    'Not sure yet',
    'Under ₦10,000,000',
    '₦10,000,000 – ₦25,000,000',
    '₦25,000,000 – ₦50,000,000',
    '₦50,000,000 – ₦100,000,000',
    'Above ₦100,000,000'
  ];

  return (
    <section id="contact" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#0B2545] mb-2">
            <span>{t('contact.badge', 'Direct Client Gateway')}</span>
            <span aria-hidden="true">·</span>
            <span>Enquiries & Consultations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight font-['Plus_Jakarta_Sans']">
            {t('contact.title', 'Initiate Your Engineering Project')}
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            {t('contact.subtitle', `Submit your construction brief, structural inquiry, or land acquisition request directly to the executive engineers at ${COMPANY_CONFIG.name}.`)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-[#0B2545] mb-2 font-['Plus_Jakarta_Sans']">
              Service Consultation Request
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              All enquiries are delivered directly to the company owners ({COMPANY_CONFIG.contact.officialEmail}) and recorded on our internal dispatch register.
            </p>

            {/* Submission Status Alerts */}
            {submissionResult && submissionResult.success && (
              <div className="mb-8 p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 animate-in fade-in duration-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-bold text-emerald-900 text-base mb-1">
                      Enquiry Dispatched Successfully
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed mb-4">
                      {submissionResult.message}
                    </p>

                    {submissionResult.enquiryId && (
                      <div className="bg-white/80 p-3 rounded-lg border border-emerald-200/80 flex items-center justify-between gap-2 text-xs font-mono">
                        <div>
                          <span className="text-slate-500">Tracking Reference: </span>
                          <span className="font-bold text-slate-900">{submissionResult.enquiryId}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyEnquiryId(submissionResult.enquiryId!)}
                          className="p-1.5 text-slate-600 hover:text-slate-900 rounded bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                          title="Copy reference code"
                        >
                          {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    )}

                    <div className="mt-3 text-[11px] text-emerald-700">
                      Destination: <span className="font-semibold">{submissionResult.recipientEmail}</span> · Logged: {new Date(submissionResult.timestamp || '').toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {submissionResult && !submissionResult.success && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <strong className="font-semibold">Submission Error:</strong> {submissionResult.message}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Spam Honeypot Trap (Hidden from genuine users) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="_hp">Leave this empty</label>
                <input
                  type="text"
                  id="_hp"
                  name="_hp"
                  value={formData._hp}
                  onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Full Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Engr. Johnson Ovie"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors ${
                      errors.fullName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-rose-600">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. client@example.com"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors ${
                      errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-rose-600">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Phone & Company Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +234 806 037 1283"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors ${
                      errors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="company" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Company / Organisation <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Delta Estates Ltd"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
                  />
                </div>
              </div>

              {/* Service of Interest & Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="service" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Service of Interest <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
                  >
                    {COMPANY_SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="General Property Enquiry">General Property & Investment Enquiry</option>
                  </select>
                  {errors.service && (
                    <p className="mt-1 text-xs text-rose-600">{errors.service}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Enquiry Subject <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Quotation for 3-Story Commercial Plaza"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors ${
                      errors.subject ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-xs text-rose-600">{errors.subject}</p>
                  )}
                </div>
              </div>

              {/* Project Location & Budget Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="projectLocation" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Project Location <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="projectLocation"
                    value={formData.projectLocation}
                    onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                    placeholder="e.g. Eku, Abraka, Warri, Asaba..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="estimatedBudget" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Estimated Project Budget <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <select
                    id="estimatedBudget"
                    value={formData.estimatedBudget}
                    onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
                  >
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Preferred Contact Method
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'whatsapp', label: 'WhatsApp', icon: '💬' },
                    { id: 'email', label: 'Email', icon: '✉️' },
                    { id: 'phone', label: 'Phone Call', icon: '📞' },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
                        formData.preferredContactMethod === method.id
                          ? 'border-[#0B2545] bg-[#0B2545] text-white shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="preferredContactMethod"
                        value={method.id}
                        checked={formData.preferredContactMethod === method.id}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            preferredContactMethod: method.id as 'whatsapp' | 'email' | 'phone',
                          })
                        }
                        className="sr-only"
                      />
                      <span>{method.icon}</span>
                      <span>{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Detailed Message */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Project Description & Requirements <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <AudioTranscriberButton
                      buttonText="Voice Dictate"
                      onTranscribed={(text) => {
                        setFormData((prev) => ({
                          ...prev,
                          message: prev.message ? `${prev.message}\n${text}` : text,
                        }));
                      }}
                    />
                    <span className="text-[11px] text-slate-400">
                      {formData.message.length} chars
                    </span>
                  </div>
                </div>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Provide scope details, site dimensions, building plans, expected kickoff dates, or specific civil engineering questions..."
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors ${
                    errors.message ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-rose-600">{errors.message}</p>
                )}
              </div>

              {/* Privacy Consent Checkbox */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.privacyConsent}
                    onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-slate-300 text-[#0B2545] focus:ring-sky-500 cursor-pointer"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    I consent to having People and Co Construction Firm collect and process my enquiry information in accordance with the{' '}
                    <button
                      type="button"
                      onClick={onOpenPrivacyPolicy}
                      className="text-[#0B2545] font-semibold underline hover:text-[#00B4D8] focus:outline-none cursor-pointer"
                    >
                      Privacy Policy
                    </button>
                    . Your information is never sold or shared with external solicitors.
                  </span>
                </label>
                {errors.privacyConsent && (
                  <p className="mt-1 text-xs text-rose-600">{errors.privacyConsent}</p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#0B2545] hover:bg-[#07172B] active:scale-[0.99] rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Transmitting Enquiry to Company Inbox...</span>
                    </>
                  ) : (
                    <>
                      <span>{t('contact.submit_btn', 'Send Enquiry')}</span>
                      <Send className="w-4 h-4 text-[#F59E0B]" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* Right Column: Verified Office Info & Maps */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Verified Business Details Card */}
            <div className="bg-[#0B2545] text-white p-8 rounded-2xl border border-[#07172B] shadow-sm">
              <h4 className="text-lg font-bold font-['Plus_Jakarta_Sans'] text-white mb-6 pb-3 border-b border-white/15">
                Headquarters & Contact Points
              </h4>

              <div className="space-y-6 text-sm">
                
                {/* Physical Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-white/10 text-[#00B4D8] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[#00B4D8] font-bold mb-1">
                      Office Location
                    </div>
                    <p className="text-slate-200 leading-relaxed font-medium">
                      {COMPANY_CONFIG.contact.address}
                    </p>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {COMPANY_CONFIG.contact.lga}, {COMPANY_CONFIG.contact.state}
                    </div>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-white/10 text-[#F59E0B] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[#F59E0B] font-bold mb-1">
                      Direct Telephone & WhatsApp
                    </div>
                    <a
                      href={`tel:${COMPANY_CONFIG.contact.phone}`}
                      className="text-white hover:text-[#00B4D8] font-semibold text-base transition-colors"
                    >
                      {COMPANY_CONFIG.contact.phoneDisplay}
                    </a>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Available for site calls & voice consultations
                    </div>
                  </div>
                </div>

                {/* Official Email */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-white/10 text-[#00B4D8] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[#00B4D8] font-bold mb-1">
                      Official Company Email
                    </div>
                    <a
                      href={`mailto:${COMPANY_CONFIG.contact.officialEmail}`}
                      className="text-white hover:text-[#00B4D8] font-semibold transition-colors"
                    >
                      {COMPANY_CONFIG.contact.officialEmail}
                    </a>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Enquiries sent to this verified address
                    </div>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-white/10 text-slate-300 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-300 font-bold mb-1">
                      Site & Office Hours
                    </div>
                    <p className="text-slate-200">
                      {COMPANY_CONFIG.contact.operatingHours}
                    </p>
                  </div>
                </div>

              </div>

              {/* Direct WhatsApp Action Button */}
              <div className="mt-8 pt-6 border-t border-white/15">
                <a
                  href={`https://wa.me/${COMPANY_CONFIG.contact.whatsapp}?text=Hello%20People%20and%20Co%20Construction%20Firm,%20I%20would%20like%20to%20enquire%20about%20your%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-3 text-xs font-bold text-[#0B2545] bg-[#00B4D8] hover:bg-[#38bdf8] rounded-lg transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Google Maps Location Embed */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-[#0B2545] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#00B4D8]" />
                  <span>Delta State Office Map Location</span>
                </span>
                <span className="text-[11px] text-slate-500">Eku-Abraka Road</span>
              </div>
              <div className="w-full h-64 bg-slate-100 relative">
                {/* Embed Map of Eku, Ethiope East, Delta State */}
                <iframe
                  title="People and Co Construction Firm Office Location"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent('Eku, Ethiope East, Delta State, Nigeria')}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
