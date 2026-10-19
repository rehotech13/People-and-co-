import React, { useState, useEffect } from 'react';
import { X, Search, RefreshCw, Mail, Phone, MessageSquare, CheckCircle, Clock, ExternalLink, Calendar, MapPin, DollarSign, Building } from 'lucide-react';
import { EnquiryRecord } from '../types';
import { COMPANY_CONFIG } from '../config/company';

interface OwnerEnquiryReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateCount?: (count: number) => void;
}

export const OwnerEnquiryReviewModal: React.FC<OwnerEnquiryReviewModalProps> = ({
  isOpen,
  onClose,
  onUpdateCount,
}) => {
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [internalNote, setInternalNote] = useState('');

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/enquiries');
      const data = await res.json();
      if (data.success && Array.isArray(data.enquiries)) {
        setEnquiries(data.enquiries);
        const newCount = data.enquiries.filter((e: EnquiryRecord) => e.status === 'new').length;
        if (onUpdateCount) onUpdateCount(newCount);
      }
    } catch (err) {
      console.error('Failed to load enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchEnquiries();
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedEnquiry) {
      setInternalNote(selectedEnquiry.notes || '');
    }
  }, [selectedEnquiry]);

  if (!isOpen) return null;

  const filteredEnquiries = enquiries.filter((e) => {
    if (statusFilter !== 'all' && e.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = e.fullName.toLowerCase().includes(q);
      const matchEmail = e.email.toLowerCase().includes(q);
      const matchService = e.service.toLowerCase().includes(q);
      const matchSubject = e.subject.toLowerCase().includes(q);
      const matchPhone = e.phone.toLowerCase().includes(q);
      return matchName || matchEmail || matchService || matchSubject || matchPhone;
    }
    return true;
  });

  const handleUpdateStatus = async (newStatus: 'new' | 'contacted' | 'in_review' | 'quoted' | 'archived') => {
    if (!selectedEnquiry) return;
    setUpdatingStatus(true);
    try {
      const res = await fetch(`/api/enquiries/${selectedEnquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, notes: internalNote }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedEnquiry(data.enquiry);
        setEnquiries((prev) =>
          prev.map((item) => (item.id === data.enquiry.id ? data.enquiry : item))
        );
      }
    } catch (err) {
      console.error('Status update failed:', err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    setUpdatingStatus(true);
    try {
      const res = await fetch(`/api/enquiries/${selectedEnquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: internalNote }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedEnquiry(data.enquiry);
        setEnquiries((prev) =>
          prev.map((item) => (item.id === data.enquiry.id ? data.enquiry : item))
        );
      }
    } catch (err) {
      console.error('Notes save failed:', err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getCleanPhoneForWhatsApp = (phone: string) => {
    let clean = phone.replace(/[\s\-\(\)\+]/g, '');
    if (clean.startsWith('0')) {
      clean = '234' + clean.slice(1);
    }
    return clean;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B2545] text-white flex items-center justify-between border-b border-[#07172B]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#00B4D8] text-[#0B2545] flex items-center justify-center font-bold text-sm">
              PACCF
            </div>
            <div>
              <h3 className="font-bold text-base font-['Plus_Jakarta_Sans'] leading-tight">
                Executive Enquiries & Leads Inbox
              </h3>
              <p className="text-xs text-slate-300">
                Authorized Client Enquiries Management · Destination: {COMPANY_CONFIG.contact.officialEmail}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchEnquiries}
              disabled={loading}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              title="Refresh list"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client name, email, phone, or service..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {['all', 'new', 'contacted', 'in_review', 'quoted', 'archived'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize whitespace-nowrap cursor-pointer ${
                  statusFilter === status
                    ? 'bg-[#0B2545] text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {status.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Split Master-Detail Layout */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left: List */}
          <div className="w-full sm:w-2/5 border-r border-slate-200 overflow-y-auto divide-y divide-slate-100">
            {loading && enquiries.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">Loading enquiries...</div>
            ) : filteredEnquiries.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No matching enquiries found.
              </div>
            ) : (
              filteredEnquiries.map((enq) => (
                <div
                  key={enq.id}
                  onClick={() => setSelectedEnquiry(enq)}
                  className={`p-4 transition-colors cursor-pointer text-left ${
                    selectedEnquiry?.id === enq.id ? 'bg-sky-50/70 border-l-4 border-l-[#00B4D8]' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900 truncate">
                      {enq.fullName}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        enq.status === 'new'
                          ? 'bg-amber-100 text-amber-800'
                          : enq.status === 'contacted'
                          ? 'bg-blue-100 text-blue-800'
                          : enq.status === 'quoted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {enq.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="text-xs font-medium text-[#0B2545] truncate mb-1">
                    {enq.service}
                  </div>

                  <p className="text-[11px] text-slate-500 line-clamp-1 mb-2">
                    {enq.subject}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>{enq.preferredContactMethod.toUpperCase()}</span>
                    <span>{new Date(enq.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right: Selected Enquiry Detail View */}
          <div className="hidden sm:flex flex-1 flex-col overflow-y-auto bg-slate-50/50 p-6">
            {selectedEnquiry ? (
              <div className="space-y-6">
                
                {/* Header */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="text-xs font-mono text-slate-400 mb-1">{selectedEnquiry.id}</div>
                      <h4 className="text-xl font-bold text-[#0B2545] font-['Plus_Jakarta_Sans']">
                        {selectedEnquiry.fullName}
                      </h4>
                      {selectedEnquiry.company && (
                        <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <Building className="w-3.5 h-3.5 text-slate-400" />
                          <span>{selectedEnquiry.company}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Status:</span>
                      <select
                        value={selectedEnquiry.status}
                        onChange={(e) => handleUpdateStatus(e.target.value as any)}
                        disabled={updatingStatus}
                        className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in_review">In Review</option>
                        <option value="quoted">Quoted</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>

                  {/* Contact Badges & Instant Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 text-xs">
                    <a
                      href={`mailto:${selectedEnquiry.email}?subject=RE: ${encodeURIComponent(selectedEnquiry.subject)} - People and Co Construction Firm`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 text-[#0B2545] hover:bg-sky-100 transition-colors font-medium"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#00B4D8]" />
                      <span>{selectedEnquiry.email}</span>
                    </a>

                    <a
                      href={`tel:${selectedEnquiry.phone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-900 hover:bg-amber-100 transition-colors font-medium"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span>{selectedEnquiry.phone}</span>
                    </a>

                    <a
                      href={`https://wa.me/${getCleanPhoneForWhatsApp(selectedEnquiry.phone)}?text=Hello%20${encodeURIComponent(selectedEnquiry.fullName)},%20this%20is%20People%20and%20Co%20Construction%20Firm%20following%20up%20on%20your%20enquiry%20regarding%20${encodeURIComponent(selectedEnquiry.service)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors font-semibold"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Reply via WhatsApp</span>
                      <ExternalLink className="w-3 h-3 text-emerald-500" />
                    </a>
                  </div>
                </div>

                {/* Scope & Message */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-xs pb-4 border-b border-slate-100">
                    <div>
                      <span className="text-slate-400 block mb-0.5">Requested Service</span>
                      <span className="font-bold text-slate-800">{selectedEnquiry.service}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-0.5">Preferred Contact Method</span>
                      <span className="font-bold text-slate-800 uppercase">{selectedEnquiry.preferredContactMethod}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-0.5">Project Location</span>
                      <span className="font-bold text-slate-800">{selectedEnquiry.projectLocation || 'Not specified'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-0.5">Estimated Budget</span>
                      <span className="font-bold text-slate-800">{selectedEnquiry.estimatedBudget || 'Not sure yet'}</span>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Subject
                    </h5>
                    <p className="text-sm font-semibold text-slate-900">{selectedEnquiry.subject}</p>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Client Message
                    </h5>
                    <div className="p-4 bg-slate-50 rounded-lg text-xs sm:text-sm text-slate-700 whitespace-pre-wrap leading-relaxed border border-slate-100">
                      {selectedEnquiry.message}
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 pt-2 flex items-center justify-between">
                    <span>Received: {new Date(selectedEnquiry.createdAt).toLocaleString()}</span>
                    <span>Delivered To: {selectedEnquiry.recipientEmail}</span>
                  </div>
                </div>

                {/* Internal Notes */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Executive / Engineer Internal Notes
                  </h5>
                  <textarea
                    rows={3}
                    value={internalNote}
                    onChange={(e) => setInternalNote(e.target.value)}
                    placeholder="Record notes on site visits, quoted pricing, client follow-up calls, or architectural drawing reception..."
                    className="w-full p-3 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={handleSaveNotes}
                      disabled={updatingStatus}
                      className="px-4 py-1.5 text-xs font-semibold text-white bg-[#0B2545] hover:bg-[#07172B] rounded-lg transition-colors cursor-pointer"
                    >
                      Save Notes
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center text-slate-400 text-xs">
                Select an enquiry from the list on the left to review details and take action.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
