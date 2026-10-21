import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MapPin,
  Calendar,
  Layers,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Filter,
  Camera,
  ExternalLink,
  Building2,
  HardHat,
  Sparkles,
} from 'lucide-react';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'finished' | 'ongoing' | 'structural' | 'commercial';
  categoryLabel: string;
  status: 'Completed & Handed Over' | 'Active Construction Site' | 'Structural Milestone Passed';
  statusType: 'success' | 'warning' | 'info';
  location: string;
  lga: string;
  timeline: string;
  imageUrl: string;
  fallbackUrl: string;
  engineeringSpecs: string[];
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Executive 5-Bedroom Smart Villa with Penthouse',
    category: 'finished',
    categoryLabel: 'Finished Residential',
    status: 'Completed & Handed Over',
    statusType: 'success',
    location: 'Along New Eku-Abraka Expressway',
    lga: 'Ethiope East LGA, Delta State',
    timeline: 'Completed Feb 2026',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: '/images/hero_construction_modern_1792339537125.jpg',
    engineeringSpecs: [
      'Reinforced Raft Foundation on Sandy-Clay Subgrade',
      'High-Tensile TMT 16mm/12mm Rebar Decking',
      'Stone-Coated Parapet Roofing & Thermal Insulation',
      'Automated Inverter & Concealed PPR Water Plumbing',
    ],
    description:
      'Turnkey luxury duplex executed from raw bush clearing to final Spanish porcelain tiling and biometric gate installation. Delivered 3 weeks ahead of scheduled timeline.',
  },
  {
    id: 'gal-2',
    title: 'Heavy Foundation Reinforcement & Raft Casting',
    category: 'structural',
    categoryLabel: 'Foundation & Structural',
    status: 'Structural Milestone Passed',
    statusType: 'info',
    location: 'Sapele Road Commercial Corridor',
    lga: 'Sapele LGA, Delta State',
    timeline: 'Inspection Certified Jan 2026',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: '/images/service_structural_design_1792339538521.jpg',
    engineeringSpecs: [
      'C30 Ready-Mix Concrete with 28-Day Cube Compression Testing',
      'Dual Mat Steel Rebar Grid with 200mm Spacing',
      'Heavy-Duty Polyethylene Damp Proof Membrane (DPM)',
      'Laser-Levelled Ground Beam Alignment',
    ],
    description:
      'Engineered specifically for the high water-table conditions of the Niger Delta riverine basin. Passed all penetrometer and bearing-capacity load tests.',
  },
  {
    id: 'gal-3',
    title: '3-Floor Retail & Corporate Commercial Plaza',
    category: 'commercial',
    categoryLabel: 'Commercial & Civil',
    status: 'Completed & Handed Over',
    statusType: 'success',
    location: 'Airport Road Commercial District',
    lga: 'Warri, Delta State',
    timeline: 'Completed Nov 2025',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: '/images/project_commercial_plaza_1792339539199.jpg',
    engineeringSpecs: [
      'Engineered Reinforced Concrete Moment Frame',
      'Double-Glazed Reflective Curtain Wall Facade',
      'Dedicated Basement Loading Dock & Sub-surface Storm Drain',
      'Heavy-Duty 500kVA Industrial Generator Plinth',
    ],
    description:
      'A multi-tenant corporate hub featuring open-span structural framing allowing flexible partitioned offices and retail outlets. Fully compliant with state urban planning laws.',
  },
  {
    id: 'gal-4',
    title: 'First-Floor Suspended Decking & Formwork Assembly',
    category: 'ongoing',
    categoryLabel: 'Site Underway',
    status: 'Active Construction Site',
    statusType: 'warning',
    location: 'GRA Phase 2 Waterfront Enclave',
    lga: 'Asaba, Delta State',
    timeline: 'Phase 4 In Progress',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: '/images/service_civil_engineering_1792339538398.jpg',
    engineeringSpecs: [
      '18mm Marine Plywood Shuttering with Acrow Steel Props',
      'Cantilever Balcony Rebar Ties with High Shear Capacity',
      'Integrated Conduit Sleeve Paths for Electrical & HVAC',
      'Vibrated Mechanical Concrete Pour Protocol',
    ],
    description:
      'Live site snapshot showing high-density steel reinforcement binding prior to structural slab casting. Daily drone oversight and certified engineer on site.',
  },
  {
    id: 'gal-5',
    title: 'Modern Minimalist 4-Bedroom Detached Villa',
    category: 'finished',
    categoryLabel: 'Finished Residential',
    status: 'Completed & Handed Over',
    statusType: 'success',
    location: 'University Road Axis',
    lga: 'Abraka, Delta State',
    timeline: 'Completed Dec 2025',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: '/images/service_building_construction_1792339538812.jpg',
    engineeringSpecs: [
      'Vibrated 9-inch Load-Bearing Sandcrete Blockwork',
      'Perimeter Retaining Wall & Integrated U-Drain Channel',
      'Spanish Polished Vitrified Floor Tiles throughout',
      'Borehole Industrial Water Treatment & Elevated Storage',
    ],
    description:
      'Commissioned by a diaspora client based in London. Delivered on a milestone-based stage contract with real-time digital milestone tracking and zero billing variations.',
  },
  {
    id: 'gal-6',
    title: 'Structural Steel Roof Truss Fabrication & Hoisting',
    category: 'structural',
    categoryLabel: 'Foundation & Structural',
    status: 'Structural Milestone Passed',
    statusType: 'info',
    location: 'Commercial Hub Expressway',
    lga: 'Ughelli North LGA, Delta State',
    timeline: 'Milestone Certified Jan 2026',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: '/images/service_structural_design_1792339538521.jpg',
    engineeringSpecs: [
      'Anti-Rust Primed Structural Angle Iron Trusses',
      'High-Tensile Gusset Plate Welding with Non-Destructive Test',
      'Heavy Concrete Lintel Tie-Beam Bolting',
      'Stone-Coated Charcoal Black Shingle Tile Sheeting',
    ],
    description:
      'Long-span roof superstructure engineered to withstand tropical delta storm squalls and corrosive rainwater run-off. Rigorously bolted to reinforced perimeter ring beams.',
  },
  {
    id: 'gal-7',
    title: 'Agro-Industrial Warehouse & Logistics Loading Bay',
    category: 'commercial',
    categoryLabel: 'Commercial & Civil',
    status: 'Completed & Handed Over',
    statusType: 'success',
    location: 'Agro-Industrial Cluster Corridor',
    lga: 'Eku, Ethiope East LGA, Delta State',
    timeline: 'Completed Jan 2026',
    imageUrl: 'https://images.unsplash.com/photo-1574958269340-fa927304f207?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: '/images/hero_construction_modern_1792339537125.jpg',
    engineeringSpecs: [
      '250mm Reinforced Concrete Industrial Floor Slab',
      'Heavy Articulated Truck Maneuvering Apron',
      'Perimeter Swale Drainage Discharging to Municipal Culvert',
      'High-Bay LED Industrial Floodlighting System',
    ],
    description:
      'Designed for forklift and 30-tonne articulated trailer traffic. Features high-compaction laterite sub-base and laser-screeded hardened concrete surfacing.',
  },
  {
    id: 'gal-8',
    title: 'DPC German Floor Casting & Mechanical Vibrating',
    category: 'ongoing',
    categoryLabel: 'Site Underway',
    status: 'Active Construction Site',
    statusType: 'warning',
    location: 'Residential Estate Masterplan',
    lga: 'Oghara, Delta State',
    timeline: 'Phase 3 In Progress',
    imageUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: '/images/service_building_construction_1792339538812.jpg',
    engineeringSpecs: [
      'Continuous Polythene Damp-Proof Barrier',
      'BRC Mesh Fabric Reinforcement Grade A142',
      'Vibrated Mechanical Compaction to Eliminate Air Voids',
      'Curing Ponding Protocol Maintained for 7 Days',
    ],
    description:
      'Damp-proof course (DPC) German floor casting ensuring total moisture isolation from rising capillary dampness in coastal delta soils.',
  },
];

interface ProjectGalleryProps {
  onEnquireProject?: (projectTitle: string) => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ onEnquireProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'finished', label: 'Finished Projects' },
    { id: 'ongoing', label: 'Site Underway' },
    { id: 'structural', label: 'Foundation & Structural' },
    { id: 'commercial', label: 'Commercial & Civil' },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activeItemIndex === null) return;
      if (e.key === 'Escape') {
        setActiveItemIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveItemIndex((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : null
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveItemIndex((prev) =>
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
        );
      }
    },
    [activeItemIndex, filteredItems.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when Lightbox is open
  useEffect(() => {
    if (activeItemIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeItemIndex]);

  const activeItem = activeItemIndex !== null ? filteredItems[activeItemIndex] : null;

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeItemIndex !== null) {
      setActiveItemIndex((activeItemIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeItemIndex !== null) {
      setActiveItemIndex((activeItemIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle Blueprint Grid Background Overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#00B4D8] mb-2">
              <Camera className="w-4 h-4 text-[#00B4D8]" />
              <span>Visual Inspection Archives</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-400 font-bold">Built To Last</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-['Plus_Jakarta_Sans']">
              Construction Site & Finished Works Gallery
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mt-3">
              Explore high-resolution photography from active structural pours, formwork binding, foundation raft installations, and finished turnkey properties across Delta State and nationwide.
            </p>
          </div>

          {/* Key Assurance Badge */}
          <div className="bg-slate-800/90 border border-slate-700 p-4 rounded-xl flex items-center gap-4 shrink-0 shadow-lg">
            <div className="w-12 h-12 rounded-lg bg-[#00B4D8]/20 border border-[#00B4D8]/40 flex items-center justify-center text-[#00B4D8]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                100% Quality Inspected
              </p>
              <p className="text-[12px] text-slate-400 mt-0.5">
                Every photo represents genuine site engineering
              </p>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#00B4D8]" /> Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setActiveItemIndex(null);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#00B4D8] text-slate-950 font-bold shadow-md shadow-[#00B4D8]/20'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Showing {filteredItems.length} certified project records</span>
          </div>
        </div>

        {/* Responsive Lightbox Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveItemIndex(idx)}
              className="group relative bg-slate-800 rounded-2xl overflow-hidden border border-slate-700/80 hover:border-[#00B4D8] transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#00B4D8]/10 cursor-pointer flex flex-col"
            >
              {/* Image Container with 4:3 Aspect Ratio */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== window.location.origin + item.fallbackUrl) {
                      target.src = item.fallbackUrl;
                    }
                  }}
                />

                {/* Status Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md ${
                      item.statusType === 'success'
                        ? 'bg-emerald-500/90 text-white backdrop-blur-xs'
                        : item.statusType === 'warning'
                        ? 'bg-amber-500/90 text-slate-950 backdrop-blur-xs'
                        : 'bg-[#00B4D8]/90 text-slate-950 backdrop-blur-xs'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{item.categoryLabel}</span>
                  </span>
                </div>

                {/* Hover Overlay with Lightbox Trigger */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/30 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <Maximize2 className="w-4 h-4 text-[#00B4D8]" />
                    <span>Click to Inspect Lightbox</span>
                  </div>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 flex-1 flex flex-col justify-between bg-slate-800/80">
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#00B4D8] transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                    <MapPin className="w-3 h-3 text-[#00B4D8] shrink-0" />
                    <span className="truncate">{item.lga}</span>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {item.timeline}
                  </span>
                  <span className="text-[#00B4D8] font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Inspect <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Assurance Note */}
        <div className="mt-12 p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <HardHat className="w-5 h-5 text-amber-400 shrink-0" />
            <p className="text-xs sm:text-sm text-slate-300">
              Have an upcoming land development or building project in Delta State or nationwide? Inspect our structural calculations or request an on-site feasibility study.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00B4D8] text-slate-950 font-bold text-xs hover:bg-[#38bdf8] transition-colors shadow-sm shrink-0"
          >
            <span>Request Site Feasibility</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between"
          onClick={() => setActiveItemIndex(null)}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-white/10 bg-slate-950/80 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-[#00B4D8] px-2.5 py-1 rounded bg-[#00B4D8]/10 border border-[#00B4D8]/20">
                {activeItemIndex! + 1} / {filteredItems.length}
              </span>
              <div className="hidden sm:block">
                <h4 className="text-sm font-bold text-white leading-tight">
                  {activeItem.title}
                </h4>
                <p className="text-xs text-slate-400">
                  {activeItem.location} · {activeItem.lga}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden md:inline-block text-xs text-slate-400 font-mono">
                Press [ESC] to exit · [← / →] to navigate
              </span>
              <button
                onClick={() => setActiveItemIndex(null)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Close Lightbox (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Stage: Photo with Prev/Next Controls */}
          <div
            className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-[#00B4D8] text-white hover:text-slate-950 border border-white/20 transition-all z-20 cursor-pointer shadow-xl"
              title="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-[#00B4D8] text-white hover:text-slate-950 border border-white/20 transition-all z-20 cursor-pointer shadow-xl"
              title="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Lightbox Image */}
            <div className="max-w-5xl max-h-[70vh] flex items-center justify-center relative">
              <img
                src={activeItem.imageUrl}
                alt={activeItem.title}
                className="max-h-[68vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== window.location.origin + activeItem.fallbackUrl) {
                    target.src = activeItem.fallbackUrl;
                  }
                }}
              />
            </div>
          </div>

          {/* Bottom Info Bar & Thumbnails */}
          <div
            className="bg-slate-950/90 border-t border-white/10 px-4 sm:px-8 py-4 z-20 flex flex-col md:flex-row items-center justify-between gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Technical Specs & Description */}
            <div className="max-w-2xl text-left w-full">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-xs font-bold text-[#00B4D8] bg-[#00B4D8]/10 px-2 py-0.5 rounded">
                  {activeItem.status}
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-slate-300 font-medium">
                  {activeItem.timeline}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 line-clamp-2">
                {activeItem.description}
              </p>
              <div className="hidden sm:flex items-center gap-3 mt-2 flex-wrap">
                {activeItem.engineeringSpecs.slice(0, 2).map((spec, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center gap-1 text-[11px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>{spec}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTA & Thumbnail Mini-Strip */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              {/* Thumbnail Strip */}
              <div className="hidden lg:flex items-center gap-2 max-w-xs overflow-x-auto py-1">
                {filteredItems.map((thumb, tIdx) => (
                  <button
                    key={thumb.id}
                    onClick={() => setActiveItemIndex(tIdx)}
                    className={`h-10 w-14 rounded-md overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeItemIndex === tIdx
                        ? 'border-[#00B4D8] scale-105'
                        : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={thumb.imageUrl}
                      alt={thumb.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== window.location.origin + thumb.fallbackUrl) {
                          target.src = thumb.fallbackUrl;
                        }
                      }}
                    />
                  </button>
                ))}
              </div>

              {/* Enquire CTA */}
              <button
                onClick={() => {
                  setActiveItemIndex(null);
                  if (onEnquireProject) {
                    onEnquireProject(activeItem.title);
                  } else {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#00B4D8] text-slate-950 font-bold text-xs hover:bg-[#38bdf8] transition-colors shadow-lg cursor-pointer shrink-0"
              >
                <span>Enquire Similar Build</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
