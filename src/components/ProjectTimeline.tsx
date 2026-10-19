import React, { useState } from 'react';
import {
  FileText,
  Compass,
  Layers,
  Building,
  Home,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  HardHat,
  Wrench,
  Calendar,
  Check,
  HelpCircle,
} from 'lucide-react';

export interface TimelineStage {
  id: string;
  stepNumber: number;
  title: string;
  shortTitle: string;
  durationDuplex: string;
  durationCommercial: string;
  summary: string;
  description: string;
  icon: React.ElementType;
  keyDeliverables: string[];
  qualityControlChecks: string[];
  primaryMaterials: string[];
  nigeriaContextTip: string;
  deliverablesPercent: number;
}

const TIMELINE_STAGES: TimelineStage[] = [
  {
    id: 'planning',
    stepNumber: 1,
    title: 'Planning, Structural Design & Approvals',
    shortTitle: 'Planning',
    durationDuplex: '2 – 4 Weeks',
    durationCommercial: '4 – 8 Weeks',
    summary: 'Soil investigation, 3D architectural modeling, structural calculation sheets, and government approvals.',
    description:
      'Every robust project begins with geotechnical borehole investigation to establish soil bearing capacity. Architectural designs are harmonized with civil/structural calculations (Eurocode/BS) and vetted for Delta State Ministry of Urban Development permits.',
    icon: FileText,
    keyDeliverables: [
      'Comprehensive Soil Geotechnical Test Report',
      'Architectural 3D Renderings & Working Drawings',
      'COREN-Stamped Structural Engineering Calculation Sheets',
      'Statutory Town Planning & Building Approval Permits',
      'Itemized Bill of Quantities (BOQ) with Material Schedule',
    ],
    qualityControlChecks: [
      'Soil bearing capacity verified (>120 kN/m² in Delta lowlands)',
      'Wind & seismic load compliance audit',
      'Disbursement schedule aligned with stage gates',
    ],
    primaryMaterials: ['Geotechnical core barrels', 'CAD/BIM Software', 'Statutory permit documentation'],
    nigeriaContextTip:
      'In Delta State riverine and marshy soils (e.g. Warri, parts of Asaba), soil test results dictate whether a raft foundation or sand-filling with geo-textile is required.',
    deliverablesPercent: 10,
  },
  {
    id: 'clearance',
    stepNumber: 2,
    title: 'Site Clearance & Ground Setting-Out',
    shortTitle: 'Site Clearance',
    durationDuplex: '1 – 2 Weeks',
    durationCommercial: '2 – 3 Weeks',
    summary: 'Vegetation grubbing, pegging, profile board leveling, and site services mobilization.',
    description:
      'The construction boundary is established using high-precision optical leveling. Heavy vegetation is cleared, temporary perimeter hoarding is erected, and dedicated staging areas for aggregates, water source (borehole), and steel are established.',
    icon: Compass,
    keyDeliverables: [
      'Site clearing, de-stumping, and topsoil scraping',
      'Optical total station baseline & boundary pegging',
      'Erection of profile boards & reference sight rails',
      'Temporary site office, storage shed, and borehole drilling',
      'Perimeter safety hoarding and security post setup',
    ],
    qualityControlChecks: [
      'Check 3-4-5 geometric square-off for building corners',
      'Verify boundary setbacks against approved master plan',
      'Adequate water supply tested for concrete mixing',
    ],
    primaryMaterials: ['2x3 Timber battens', 'Profile boards', 'Borehole casing & submersible pump', 'Safety signage'],
    nigeriaContextTip:
      'Drilling an on-site commercial-grade borehole before excavation eliminates exorbitant water-tanker costs throughout the build life.',
    deliverablesPercent: 20,
  },
  {
    id: 'foundation',
    stepNumber: 3,
    title: 'Foundation & Substructure Engineering',
    shortTitle: 'Foundation',
    durationDuplex: '3 – 5 Weeks',
    durationCommercial: '6 – 10 Weeks',
    summary: 'Trench excavation, blinding concrete, raft/strip steel cage reinforcement, and DPC German floor casting.',
    description:
      'The bedrock of structural safety. Excavations are stabilized, blinding concrete is cast, and high-yield TMT rebar cages are bound. Ground beams and damp-proof membranes (DPM) are laid before casting the monolithic German floor slab.',
    icon: Layers,
    keyDeliverables: [
      'Mechanized/manual excavation to solid soil strata',
      'Lean concrete blinding layer (Grade C15)',
      'High-yield TMT steel rebar basket & column starter bars',
      'Anti-termite soil treatment & Damp Proof Membrane (DPM)',
      'Underground MEP rough-in pipes (conduits & waste runs)',
      'Monolithic German floor slab casting (Grade C25)',
    ],
    qualityControlChecks: [
      'Concrete slump test (75mm–100mm target range)',
      'Rebar concrete cover verified with spacer blocks (minimum 40mm)',
      '7-day and 28-day concrete cube compression testing',
    ],
    primaryMaterials: ['Dangote/Elephant 42.5R Cement', 'Clean Sharp Sand & 3/4" Granite', '16mm/12mm TMT Rebar', 'Heavy-gauge DPM polythene'],
    nigeriaContextTip:
      'Rigorous water curing (ponding) for at least 7 to 14 days post-casting prevents shrinkage hairline cracks in tropical Delta humidity.',
    deliverablesPercent: 40,
  },
  {
    id: 'structural',
    stepNumber: 4,
    title: 'Superstructure & Masonry Work',
    shortTitle: 'Superstructure',
    durationDuplex: '6 – 8 Weeks',
    durationCommercial: '12 – 18 Weeks',
    summary: 'Reinforced concrete columns, beams, suspended slab decking, and high-density vibro-block masonry.',
    description:
      'The vertical skeleton rises. High-load columns are cast in batches with mechanical vibrators, followed by hollow/solid blockwork. First-floor suspended slabs are propped with marine plywood formwork and cast with continuous monolithic pours.',
    icon: Building,
    keyDeliverables: [
      'Reinforced concrete column casting with mechanical vibration',
      'High-density 9-inch and 6-inch vibro-compressed blockwork',
      'Formwork and steel reinforcement for first-floor suspended slab',
      'Electrical and AC copper pipe conduit embedding',
      'Monolithic suspended slab pour (Ready-mix or site-batched C25/30)',
      'Ring beams, lintels, and parapet walls',
    ],
    qualityControlChecks: [
      'Plumb-line check for column and wall perpendicularity',
      'Decking prop spacing inspection (maximum 600mm centers)',
      'Continuous pour monitoring to prevent cold joints',
    ],
    primaryMaterials: ['C25/30 Concrete mix', 'Marine ply formwork', '12mm/10mm stirrups', 'High-density sandcrete blocks'],
    nigeriaContextTip:
      'We mandate 21 days of propping under suspended slabs before striking forms, guaranteeing complete compressive strength before floor loads.',
    deliverablesPercent: 65,
  },
  {
    id: 'roofing',
    stepNumber: 5,
    title: 'Roofing Carcass & External Envelope',
    shortTitle: 'Roofing',
    durationDuplex: '3 – 4 Weeks',
    durationCommercial: '5 – 8 Weeks',
    summary: 'Hardwood timber roof truss, stone-coated aluminum cladding, parapet concrete coping, and exterior plastering.',
    description:
      'Protecting the structure from tropical weather. Heavy-duty treated hardwood rafters are anchored into reinforced concrete tie-beams, covered with waterproof felt and premium stone-coated aluminum roofing sheets.',
    icon: Home,
    keyDeliverables: [
      'Treated termite-resistant hardwood roof truss system',
      'Anchor tie-wire fastening to reinforced ring beams',
      'Stone-coated Gerard/aluminum roofing sheet installation',
      'Concealed rainwater collector valleys and PVC downpipes',
      'Exterior cement rendering and parapet water-resistant coping',
      'Security door and external window sub-frames',
    ],
    qualityControlChecks: [
      'Truss spacing & diagonal bracing stability check',
      'Water-spray flood test for leak detection on valleys and ridges',
      'Plastering sand-to-cement ratio (1:4) to eliminate external dampness',
    ],
    primaryMaterials: ['Treated Hardwood', 'Stone-coated Aluminum sheets (0.55mm)', 'Parapet waterproofing slurry', 'Clean plastering sand'],
    nigeriaContextTip:
      'Parapets in high-rain zones like Delta are sealed with double-layer elastomeric waterproofing membranes to prevent unsightly efflorescence and wall staining.',
    deliverablesPercent: 80,
  },
  {
    id: 'finishing',
    stepNumber: 6,
    title: 'Finishing & Mechanical/Electrical/Plumbing (MEP)',
    shortTitle: 'Finishing & MEP',
    durationDuplex: '6 – 8 Weeks',
    durationCommercial: '8 – 14 Weeks',
    summary: 'Concealed wiring, piping, POP ceilings, vitrified porcelain tiling, sanitary fixtures, and premium coatings.',
    description:
      'Where architecture transforms into luxury comfort. Craftsmen install suspended moisture-resistant POP ceilings, premium 60x60 or 60x120 vitrified floor tiles, Italian-style bathroom fixtures, solar/inverter cabling, and washable silk-emulsion paint coats.',
    icon: Wrench,
    keyDeliverables: [
      'Full electrical cable pulling (certified pure copper single-core)',
      'Water supply piping (PPR hot/cold) and central drainage stacks',
      'Architectural POP suspended ceiling designs with recessed LED coves',
      'Floor screeding and precision laser-aligned porcelain tiling',
      'Sanitary ware, glass shower cubicles, and water heaters',
      'Interior 3-coat washable satin paint and feature accent walls',
      'Solid security doors, internal flush doors, and casement windows',
    ],
    qualityControlChecks: [
      'PPR pipe hydraulic pressure test at 10 Bar for 24 hours',
      'Megger insulation resistance test on all electrical circuits',
      'Tile hollow sound check and gradient testing in wet areas',
    ],
    primaryMaterials: ['Pure copper 1.5mm/2.5mm/4mm/6mm cables', 'PPR pressure pipes', 'Imported vitrified porcelain tiles', 'Dulux/Berger washable satin'],
    nigeriaContextTip:
      'All plumbing undergoes a 24-hour pressurized water test before wall tiles are installed, eliminating concealed leak hazards.',
    deliverablesPercent: 95,
  },
  {
    id: 'handover',
    stepNumber: 7,
    title: 'Quality Audit, Snagging & Project Handover',
    shortTitle: 'Handover',
    durationDuplex: '1 – 2 Weeks',
    durationCommercial: '2 – 3 Weeks',
    summary: 'Comprehensive snagging list resolution, deep detailing, as-built engineering drawings, and keys handover.',
    description:
      'The final milestone of excellence. Joint client-engineer snagging walkthroughs ensure every switch, tap, latch, and surface is flawless. Full as-built MEP schematics, warranties, and official commissioning keys are formally handed over.',
    icon: CheckCircle2,
    keyDeliverables: [
      'Joint engineering snag-list audit and 100% defect rectification',
      'Industrial deep cleaning and window polishing',
      'Full electrical load, generator changeover, and pump commissioning',
      'Handover of As-Built Structural, Electrical & Plumbing drawings',
      'Official Certificate of Practical Completion & Keys ceremony',
      '12-Month Structural Maintenance Guarantee activation',
    ],
    qualityControlChecks: [
      'Zero-snag signoff by resident supervising civil engineer',
      'Client formal sign-off valuation certificate',
      'Warranty log issued for pumps, roofing, and structural members',
    ],
    primaryMaterials: ['As-built document binder', 'Operational manuals', 'Handover gift package & keys'],
    nigeriaContextTip:
      'We provide complete as-built conduit wiring diagrams so any future home-automation additions can be done without drilling blindly into concealed pipes.',
    deliverablesPercent: 100,
  },
];

interface ProjectTimelineProps {
  onConsultationClick: (stageName?: string) => void;
}

export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ onConsultationClick }) => {
  const [activeStageId, setActiveStageId] = useState<string>('foundation');
  const [projectType, setProjectType] = useState<'duplex' | 'commercial'>('duplex');

  const currentStage = TIMELINE_STAGES.find((s) => s.id === activeStageId) || TIMELINE_STAGES[2];
  const currentIndex = TIMELINE_STAGES.findIndex((s) => s.id === activeStageId);

  const handleNextStage = () => {
    if (currentIndex < TIMELINE_STAGES.length - 1) {
      setActiveStageId(TIMELINE_STAGES[currentIndex + 1].id);
    }
  };

  const handlePrevStage = () => {
    if (currentIndex > 0) {
      setActiveStageId(TIMELINE_STAGES[currentIndex - 1].id);
    }
  };

  return (
    <section
      id="project-timeline"
      className="py-20 bg-slate-50 border-t border-b border-slate-200 scroll-mt-20"
      aria-label="Typical Construction Project Lifecycle Timeline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#00B4D8] mb-2 font-['Plus_Jakarta_Sans']">
              <Sparkles className="w-3.5 h-3.5 text-[#00B4D8]" />
              <span>Full Lifecycle Blueprint</span>
              <span aria-hidden="true">·</span>
              <span>Rigorous Engineering Stage-Gates</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight font-['Plus_Jakarta_Sans']">
              The Construction Project Lifecycle
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Explore how People and Co Construction Firm executes projects from soil investigation to official keys handover with total quality assurance and zero contractor abandonment.
            </p>
          </div>

          {/* Project Type Switcher */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs shrink-0 self-start lg:self-auto">
            <span className="text-xs font-semibold text-slate-500 pl-2 pr-1">Estimate For:</span>
            <button
              onClick={() => setProjectType('duplex')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                projectType === 'duplex'
                  ? 'bg-[#0B2545] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0B2545] hover:bg-slate-100'
              }`}
            >
              4-Bed Turnkey Duplex
            </button>
            <button
              onClick={() => setProjectType('commercial')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                projectType === 'commercial'
                  ? 'bg-[#0B2545] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0B2545] hover:bg-slate-100'
              }`}
            >
              Commercial 3-Storey Plaza
            </button>
          </div>
        </div>

        {/* Master Grid: Left Vertical Timeline Stepper, Right Interactive Stage Deep-Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Vertical Step Indicator (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#00B4D8]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B2545] font-['Plus_Jakarta_Sans']">
                  7-Phase Execution Road Map
                </span>
              </div>
              <span className="text-xs font-medium text-slate-500">
                Phase {currentIndex + 1} of {TIMELINE_STAGES.length}
              </span>
            </div>

            {/* Vertical Flow with Connecting Line */}
            <div className="relative pl-6 sm:pl-8 space-y-4">
              {/* Connecting Vertical Track */}
              <div
                className="absolute left-[19px] sm:left-[27px] top-4 bottom-6 w-0.5 bg-slate-200 -z-0"
                aria-hidden="true"
              />

              {/* Dynamic filled progress line */}
              <div
                className="absolute left-[19px] sm:left-[27px] top-4 w-0.5 bg-[#00B4D8] transition-all duration-500 -z-0"
                style={{
                  height: `${(currentIndex / (TIMELINE_STAGES.length - 1)) * 90}%`,
                }}
                aria-hidden="true"
              />

              {TIMELINE_STAGES.map((stage, idx) => {
                const isActive = stage.id === activeStageId;
                const isPassed = idx < currentIndex;
                const Icon = stage.icon;

                return (
                  <div
                    key={stage.id}
                    onClick={() => setActiveStageId(stage.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveStageId(stage.id);
                      }
                    }}
                    className={`relative z-10 flex items-start gap-4 p-3 rounded-xl transition-all cursor-pointer text-left ${
                      isActive
                        ? 'bg-sky-50/80 border border-[#00B4D8]/40 shadow-xs'
                        : 'hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    {/* Node Circle */}
                    <div
                      className={`-ml-6 sm:-ml-8 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                        isActive
                          ? 'bg-[#0B2545] text-white ring-4 ring-[#00B4D8]/30 shadow-sm'
                          : isPassed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white border-2 border-slate-300 text-slate-500'
                      }`}
                    >
                      {isPassed ? (
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <span>{stage.stepNumber}</span>
                      )}
                    </div>

                    {/* Step Title & Subtitle */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-sm font-bold truncate font-['Plus_Jakarta_Sans'] ${
                            isActive ? 'text-[#0B2545]' : 'text-slate-700'
                          }`}
                        >
                          {stage.shortTitle}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 shrink-0">
                          {projectType === 'duplex' ? stage.durationDuplex : stage.durationCommercial}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {stage.summary}
                      </p>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isActive ? 'text-[#00B4D8] translate-x-0.5' : 'text-slate-300'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Stage Deep-Dive Card (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            
            {/* Stage Hero Title & Timing Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#0B2545] text-[#00B4D8] flex items-center justify-center shrink-0 shadow-sm">
                  <currentStage.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#00B4D8]">
                      Phase {currentStage.stepNumber} of 7
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Cumulative {currentStage.deliverablesPercent}% Handover
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0B2545] font-['Plus_Jakarta_Sans'] mt-0.5">
                    {currentStage.title}
                  </h3>
                </div>
              </div>

              {/* Duration Badge */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200/80 text-xs font-semibold shrink-0">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>
                  Est. {projectType === 'duplex' ? currentStage.durationDuplex : currentStage.durationCommercial}
                </span>
              </div>
            </div>

            {/* Narrative Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              {currentStage.description}
            </p>

            {/* Key Deliverables Checkbox Grid */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B2545] mb-3 flex items-center gap-2 font-['Plus_Jakarta_Sans']">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Official Milestone Deliverables</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentStage.keyDeliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2.5 text-xs text-slate-700 font-medium"
                  >
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Control & Nigerian Context Tips in Two Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {/* Quality & Safety Gates */}
              <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-100">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0B2545] uppercase tracking-wide mb-2">
                  <ShieldCheck className="w-4 h-4 text-[#00B4D8]" />
                  <span>Quality Assurance Gate</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {currentStage.qualityControlChecks.map((check, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#00B4D8] font-bold">•</span>
                      <span>{check}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nigerian/Delta State Geotechnical Insight */}
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wide mb-2">
                  <HardHat className="w-4 h-4 text-amber-600" />
                  <span>Delta State Engineering Tip</span>
                </div>
                <p className="text-xs text-amber-900/80 leading-relaxed">
                  {currentStage.nigeriaContextTip}
                </p>
              </div>
            </div>

            {/* Interactive Stage Controls & Action CTA */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handlePrevStage}
                  disabled={currentIndex === 0}
                  className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  ← Previous Phase
                </button>
                <button
                  onClick={handleNextStage}
                  disabled={currentIndex === TIMELINE_STAGES.length - 1}
                  className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next Phase →
                </button>
              </div>

              <button
                onClick={() => onConsultationClick(currentStage.title)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0B2545] hover:bg-[#133966] text-white shadow-xs transition-colors cursor-pointer"
              >
                <span>Consult On {currentStage.shortTitle}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#00B4D8]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
