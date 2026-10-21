import React from 'react';
import {
  ShieldCheck,
  Award,
  HardHat,
  Compass,
  FileSpreadsheet,
  Mail,
  Phone,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';
import { useLanguage } from '../context/LanguageContext';

export interface StaffMember {
  id: string;
  name: string;
  position: string;
  credentials: string;
  department: string;
  experience: string;
  location: string;
  image: string;
  fallbackImage: string;
  bio: string;
  specialties: string[];
  keyAchievement: string;
}

export const STAFF_MEMBERS: StaffMember[] = [
  {
    id: 'staff-1',
    name: 'Engr. Justice Akpochimora',
    position: 'Principal Managing Director & Lead Structural Engineer',
    credentials: 'B.Eng (Civil), M.Sc (Structural Engineering)',
    department: 'Civil & Structural Engineering',
    experience: '12+ Years Practice',
    location: 'Eku Headquarters & Statewide Operations',
    image: '/images/staff_managing_director.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=600&h=600&q=80',
    bio: 'Oversees structural design integrity, soil mechanics analysis, and foundation engineering across Delta State. Champions strict adherence to reinforced concrete standards and zero-collapse safety protocols.',
    specialties: [
      'Raft & Piled Foundation Engineering',
      'Structural Load Analysis & Framing',
      'Civil Highway & Storm Drainage Works',
    ],
    keyAchievement: 'Over 120+ certified structural projects delivered with zero structural failure',
  },
  {
    id: 'staff-2',
    name: 'Arc. Mudiaga Ogwa',
    position: 'Head of Architectural Design & Spatial Planning',
    credentials: 'B.Arch, M.Arch, Registered Architect',
    department: 'Architectural Studio & BIM Design',
    experience: '9+ Years Practice',
    location: 'Delta State & Nationwide Consultancies',
    image: '/images/staff_head_architect.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=600&h=600&q=80',
    bio: 'Leads our architectural atelier, turning client dreams into functional, climate-responsive, and modern designs. Specializes in luxury residential duplexes, commercial plazas, and statutory building approval drawings.',
    specialties: [
      '3D Architectural Visualization & BIM',
      'Contemporary Residential Masterplanning',
      'Commercial Plazas & Mixed-Use Hubs',
    ],
    keyAchievement: '85+ architectural blueprint sets approved by state town planning ministries',
  },
  {
    id: 'staff-3',
    name: 'QS Oghenekaro Daniel',
    position: 'Chief Quantity Surveyor & Resident Project Manager',
    credentials: 'B.Sc (Quantity Surveying), Registered Quantity Surveyor',
    department: 'Cost Engineering & Site Quality Control',
    experience: '10+ Years Practice',
    location: 'On-Site Operations & Eku Base',
    image: '/images/staff_chief_quantity_surveyor.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=600&h=600&q=80',
    bio: 'Guarantees transparent budgeting, detailed material schedules, and uncompromising site supervision. Protects client capital by preventing material wastage and enforcing contractual milestone gates.',
    specialties: [
      'Itemized Bill of Quantities (BOQ)',
      'Stage-Gate Cost Engineering & Audits',
      'Concrete Batch Testing & Material QA/QC',
    ],
    keyAchievement: '100% track record of on-budget delivery with zero hidden cost variations',
  },
];

interface StaffSectionProps {
  onConsultStaff?: (staffName: string, position: string) => void;
}

export const StaffSection: React.FC<StaffSectionProps> = ({ onConsultStaff }) => {
  const { t } = useLanguage();

  const handleConsult = (staff: StaffMember) => {
    if (onConsultStaff) {
      onConsultStaff(staff.name, staff.position);
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="staff" className="py-20 lg:py-24 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B4D8]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F59E0B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#0B2545] mb-2 font-['Plus_Jakarta_Sans']">
              <HardHat className="w-4 h-4 text-[#F59E0B]" />
              <span>Engineering Leadership & Technical Personnel</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#00B4D8] font-bold">Principal Staff</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight font-['Plus_Jakarta_Sans']">
              Meet Our Principal Technical Staff
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mt-3">
              Directing each construction project with certified technical excellence, continuous on-site supervision, and disciplined financial accountability.
            </p>
          </div>

          {/* Verification Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-xs shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <div className="text-left">
              <span className="text-xs font-bold text-[#0B2545] block">
                Licensed Professionals
              </span>
              <span className="text-[11px] text-slate-500">
                Registered Engineering & Architectural Cadre
              </span>
            </div>
          </div>
        </div>

        {/* 3 Staff Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STAFF_MEMBERS.map((staff) => (
            <div
              key={staff.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Staff Portrait Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                  <img
                    src={staff.image}
                    alt={staff.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== staff.fallbackImage) {
                        target.src = staff.fallbackImage;
                      } else {
                        target.style.display = 'none';
                        if (target.parentElement) {
                          target.parentElement.innerHTML = `<div class="w-full h-full bg-[#0B2545] text-white flex flex-col items-center justify-center p-6 text-center"><span class="text-3xl font-black mb-2">${staff.name.split(' ').map((n: string) => n[0]).filter(Boolean).slice(0, 2).join('')}</span><span class="text-xs font-semibold">${staff.position}</span></div>`;
                        }
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Position Badge Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 text-[#0B2545] backdrop-blur-md shadow-md">
                      {staff.experience}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F59E0B] text-slate-950 shadow-md">
                      Key Staff
                    </span>
                  </div>

                  {/* Name and Position on Image Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold font-['Plus_Jakarta_Sans'] leading-snug drop-shadow-sm">
                      {staff.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#00B4D8] mt-1 drop-shadow-sm">
                      {staff.position}
                    </p>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6">
                  
                  {/* Credentials & Department */}
                  <div className="mb-4 pb-4 border-b border-slate-100 flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <Award className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                      <span className="truncate">{staff.credentials}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-[#00B4D8] shrink-0" />
                      <span className="truncate">{staff.location}</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                    {staff.bio}
                  </p>

                  {/* Core Specialties */}
                  <div className="mb-5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Core Functional Areas:
                    </span>
                    <ul className="space-y-1.5">
                      {staff.specialties.map((spec, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Milestone / Achievement */}
                  <div className="p-3 bg-sky-50/70 rounded-xl border border-sky-100 mb-6">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0B2545] mb-0.5">
                      <Sparkles className="w-3 h-3 text-[#00B4D8]" />
                      <span>Track Record</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {staff.keyAchievement}
                    </p>
                  </div>

                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleConsult(staff)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#0B2545] hover:bg-[#07172B] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group/btn"
                  >
                    <span>Consult with {staff.name.split(' ')[1] || staff.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href={`https://wa.me/${COMPANY_CONFIG.contact.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hello People and Co Construction Firm, I would like to direct a project inquiry to ${staff.name} (${staff.position}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shrink-0"
                    title={`Chat directly regarding ${staff.position}`}
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
