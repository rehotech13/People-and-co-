import React from 'react';
import { ArrowUpRight, Check, Compass, Building2, Ruler, HardHat, ClipboardCheck, Calculator, MapPin } from 'lucide-react';
import { COMPANY_SERVICES } from '../config/company';
import { useLanguage } from '../context/LanguageContext';

interface ServicesSectionProps {
  onRequestService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onRequestService,
}) => {
  const { t } = useLanguage();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#00B4D8]" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-[#00B4D8]" />;
      case 'Ruler':
        return <Ruler className="w-5 h-5 text-[#00B4D8]" />;
      case 'HardHat':
        return <HardHat className="w-5 h-5 text-[#00B4D8]" />;
      case 'ClipboardCheck':
        return <ClipboardCheck className="w-5 h-5 text-[#00B4D8]" />;
      case 'Calculator':
        return <Calculator className="w-5 h-5 text-[#00B4D8]" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5 text-[#00B4D8]" />;
      default:
        return <Building2 className="w-5 h-5 text-[#00B4D8]" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#0B2545] mb-2">
              <span>{t('services.badge', 'Core Competencies')}</span>
              <span aria-hidden="true">·</span>
              <span>Engineering & Construction Scope</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight font-['Plus_Jakarta_Sans']">
              {t('services.title', 'Professional Built-Environment Services')}
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              {t('services.subtitle', 'Every service is delivered with certified engineering methods, transparent milestone billing, and dedicated site supervision.')}
            </p>
          </div>

          <div className="text-xs text-slate-500 md:text-right shrink-0">
            <span>Pre-fills direct enquiry form</span>
            <div className="text-slate-400 mt-0.5">Prompt response via WhatsApp or Email</div>
          </div>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COMPANY_SERVICES.map((srv, idx) => (
            <div
              key={srv.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Service Visual Thumbnail */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={srv.image}
                  alt={srv.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Clean Service Index */}
                <div className="absolute bottom-3 left-4 flex items-center gap-2 text-xs font-semibold text-white">
                  <span>0{idx + 1}.</span>
                  <span className="text-[#00B4D8]">{srv.title}</span>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-[#0B2545] font-['Plus_Jakarta_Sans']">
                      {srv.title}
                    </h3>
                    <div className="p-2 bg-slate-50 rounded-md">
                      {getIcon(srv.iconName)}
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {srv.fullDesc}
                  </p>

                  {/* Scope of Work */}
                  <div className="mb-4">
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Scope of Delivery
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {srv.scope.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#00B4D8] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Benefits */}
                  <div className="pt-3 border-t border-slate-100 mb-6">
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Key Client Benefit
                    </div>
                    <p className="text-xs text-slate-500 italic">
                      "{srv.benefits[0]}"
                    </p>
                  </div>
                </div>

                {/* Pre-filling Action Button */}
                <button
                  onClick={() => onRequestService(srv.title)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#0B2545] bg-slate-100 hover:bg-[#0B2545] hover:text-white rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 cursor-pointer"
                >
                  <span>Request This Service</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
