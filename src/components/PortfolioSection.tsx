import React, { useState } from 'react';
import { Eye, X, Building, MapPin, Calendar, CheckSquare, AlertCircle } from 'lucide-react';
import { DEMONSTRATION_PROJECTS } from '../config/company';
import { ProjectItem } from '../types';

interface PortfolioSectionProps {
  onEnquireForProject: (projectTitle: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onEnquireForProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'residential', label: 'Residential' },
    { id: 'infrastructure', label: 'Civil & Drainage' },
    { id: 'structural', label: 'Structural Design' },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? DEMONSTRATION_PROJECTS
      : DEMONSTRATION_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#0B2545] mb-2">
              <span>Project Portfolio</span>
              <span aria-hidden="true">·</span>
              <span>Technical Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight font-['Plus_Jakarta_Sans']">
              Constructed with Precision
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              A visual overview of our engineering standards, site management methodologies, and architectural execution frameworks.
            </p>
          </div>
          <a
            href="#trackers"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0B2545] text-white hover:bg-[#07172B] text-xs font-bold transition-all shadow-sm shrink-0 self-start sm:self-end"
          >
            <span className="w-2 h-2 rounded-full bg-[#00B4D8] animate-pulse" />
            <span>Track Active Construction</span>
          </a>
        </div>

        {/* Ethical Demonstration Disclosure Box */}
        <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-4 mb-8 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <strong className="font-semibold">Demonstration Portfolio Notice:</strong> The projects shown below represent illustrative capability benchmarks and architectural prototypes. In compliance with strict professional transparency, actual completed client project case studies will replace these placeholders upon official verification by People and Co Construction Firm.
          </div>
        </div>

        {/* Filter Tabs (Interactive Segmented Control adhering to anti-pill rules) */}
        <div className="flex flex-wrap items-center gap-2 mb-10 p-1.5 bg-slate-200/70 rounded-xl w-fit">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-white text-[#0B2545] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Image Container with 16:9 Aspect Ratio */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Quiet unboxed tag at bottom */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="font-medium text-[#00B4D8]">{project.categoryLabel}</span>
                  <span className="text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {project.location}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#0B2545] mb-2 font-['Plus_Jakarta_Sans'] group-hover:text-[#00B4D8] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-3 border-t border-slate-100">
                    <span className="font-semibold text-slate-700">Scope:</span>
                    <span className="truncate max-w-xs">{project.scope}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs text-amber-700 font-medium">Demonstration Concept</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2545] group-hover:translate-x-0.5 transition-transform">
                    <span>View Specifications</span>
                    <Eye className="w-4 h-4 text-[#00B4D8]" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            
            {/* Modal Image Header */}
            <div className="relative aspect-video w-full bg-slate-900">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 text-xs text-white bg-black/60 px-3 py-1 rounded backdrop-blur-sm">
                {selectedProject.categoryLabel}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4 mb-3">
                <h3 className="text-2xl font-bold text-[#0B2545] font-['Plus_Jakarta_Sans']">
                  {selectedProject.title}
                </h3>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500 mb-6 pb-4 border-b border-slate-100">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-[#00B4D8]" />
                  {selectedProject.location}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-[#F59E0B]" />
                  {selectedProject.completionTimeline}
                </span>
              </div>

              <div className="space-y-6 mb-8 text-sm text-slate-700 leading-relaxed">
                <div>
                  <h4 className="font-bold text-[#0B2545] mb-1">Project Overview</h4>
                  <p>{selectedProject.description}</p>
                </div>

                <div>
                  <h4 className="font-bold text-[#0B2545] mb-1">Engineering Scope</h4>
                  <p>{selectedProject.scope}</p>
                </div>

                {selectedProject.specs && (
                  <div>
                    <h4 className="font-bold text-[#0B2545] mb-2">Technical Specifications</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {selectedProject.specs.map((spec, i) => (
                        <div key={i} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <div className="text-[11px] text-slate-400 uppercase font-semibold">{spec.label}</div>
                          <div className="text-xs font-bold text-slate-800 mt-0.5">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = selectedProject.title;
                    setSelectedProject(null);
                    onEnquireForProject(title);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-white bg-[#0B2545] hover:bg-[#07172B] rounded-lg transition-colors shadow-sm cursor-pointer"
                >
                  Request Similar Project Assessment
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};
