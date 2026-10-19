import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Building,
  Home,
  Layers,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Info,
  DollarSign,
  CheckCircle2,
  FileText,
  RotateCcw,
  Sparkles,
  Printer,
  ChevronDown,
  Hammer,
} from 'lucide-react';

interface ProjectTypeOption {
  id: string;
  name: string;
  baseRatePerSqM: number; // Base construction cost per sqm in NGN
  defaultArea: number;
  minArea: number;
  maxArea: number;
  defaultFloors: number;
  description: string;
  icon: 'home' | 'building' | 'layers';
}

const PROJECT_TYPES: ProjectTypeOption[] = [
  {
    id: 'bungalow',
    name: 'Executive Residential Bungalow',
    baseRatePerSqM: 195000,
    defaultArea: 180,
    minArea: 90,
    maxArea: 400,
    defaultFloors: 1,
    description: 'Single-story modern family home, master en-suite, perimeter drainage & parapet roofing.',
    icon: 'home',
  },
  {
    id: 'duplex',
    name: 'Luxury 2-Floor Detached Duplex / Villa',
    baseRatePerSqM: 245000,
    defaultArea: 320,
    minArea: 180,
    maxArea: 800,
    defaultFloors: 2,
    description: 'Two-story residential residence with suspended concrete decking, ante-room, and penthouse terrace.',
    icon: 'home',
  },
  {
    id: 'commercial',
    name: 'Commercial Plaza / Multi-Unit Complex',
    baseRatePerSqM: 275000,
    defaultArea: 550,
    minArea: 250,
    maxArea: 2000,
    defaultFloors: 3,
    description: 'Reinforced concrete moment frame for retail shopping outlets, banks, or open corporate suites.',
    icon: 'building',
  },
  {
    id: 'warehouse',
    name: 'Industrial Warehouse & Logistics Hub',
    baseRatePerSqM: 165000,
    defaultArea: 650,
    minArea: 200,
    maxArea: 3000,
    defaultFloors: 1,
    description: 'Long-span structural steel rafters, high-load concrete floor slab, and articulated truck maneuvering apron.',
    icon: 'layers',
  },
];

const FOUNDATION_TYPES = [
  {
    id: 'standard',
    name: 'Firm Ground Strip / Pad Footing',
    multiplier: 1.0,
    description: 'Ideal for stable, well-drained laterite soil with high natural bearing capacity.',
  },
  {
    id: 'raft',
    name: 'Reinforced Concrete Raft Foundation (Recommended for Delta Soils)',
    multiplier: 1.15,
    description: 'Engineered heavy-duty monolithic raft slab for wetland, riverine, or seasonal high water table terrains.',
  },
  {
    id: 'piled_raft',
    name: 'Deep Piled Substructure & Ground Beams',
    multiplier: 1.35,
    description: 'For swampy, low-bearing coastal or reclaimed swamp terrain requiring deep bore piles.',
  },
];

const FINISHING_TIERS = [
  {
    id: 'standard_exec',
    name: 'Standard Executive Finish',
    multiplier: 1.0,
    description: 'Quality local vitrified floor tiles, standard POP ceilings, stone-coated aluminum roof, premium emulsion paint.',
  },
  {
    id: 'premium_luxury',
    name: 'Premium Luxury Turnkey',
    multiplier: 1.25,
    description: 'Imported 60x120cm Spanish porcelain tiles, bespoke shadow-line POP ceilings, automated security wiring, granite kitchen tops.',
  },
  {
    id: 'smart_luxury',
    name: 'Ultra-Modern Smart Estate',
    multiplier: 1.5,
    description: 'Full smart-home home automation, biometric entry, frameless glass balustrades, solar inverter conduits & designer sanitaryware.',
  },
];

interface ProjectCostEstimatorProps {
  onRequestBOQ?: (estimateDetails: {
    projectType: string;
    totalAreaSqM: number;
    floors: number;
    foundation: string;
    tier: string;
    estimatedMinNGN: number;
    estimatedMaxNGN: number;
  }) => void;
}

export const ProjectCostEstimator: React.FC<ProjectCostEstimatorProps> = ({
  onRequestBOQ,
}) => {
  const [selectedTypeId, setSelectedTypeId] = useState<string>('duplex');
  const [areaSqM, setAreaSqM] = useState<number>(320);
  const [floors, setFloors] = useState<number>(2);
  const [selectedFoundationId, setSelectedFoundationId] = useState<string>('raft');
  const [selectedTierId, setSelectedTierId] = useState<string>('premium_luxury');
  const [currency, setCurrency] = useState<'NGN' | 'USD' | 'GBP'>('NGN');
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Currency exchange rates for Diaspora Investors
  const RATES = {
    NGN: 1,
    USD: 1 / 1480, // Approx reference rate
    GBP: 1 / 1920, // Approx reference rate
  };

  const selectedType =
    PROJECT_TYPES.find((t) => t.id === selectedTypeId) || PROJECT_TYPES[1];
  const selectedFoundation =
    FOUNDATION_TYPES.find((f) => f.id === selectedFoundationId) || FOUNDATION_TYPES[1];
  const selectedTier =
    FINISHING_TIERS.find((t) => t.id === selectedTierId) || FINISHING_TIERS[1];

  // Calculate base cost
  const calculation = useMemo(() => {
    const baseRate = selectedType.baseRatePerSqM;
    const foundationFactor = selectedFoundation.multiplier;
    const tierFactor = selectedTier.multiplier;
    const floorFactor = floors > 1 ? 1 + (floors - 1) * 0.08 : 1.0;

    const effectiveRatePerSqM = baseRate * foundationFactor * tierFactor * floorFactor;
    const rawTotal = effectiveRatePerSqM * areaSqM;

    // Provide realistic lower and upper brackets (+- 7%)
    const minCost = Math.round(rawTotal * 0.93);
    const maxCost = Math.round(rawTotal * 1.07);

    // Phase breakdown distribution percentages
    const phases = [
      {
        phase: 'Substructure & Foundation Works',
        description: 'Excavation, DPM membrane, rebar cage & raft/strip concrete pour',
        percent: 26,
        amount: Math.round(rawTotal * 0.26),
      },
      {
        phase: 'Superstructure, Masonry & Slab Decking',
        description: 'Load-bearing blockwork, concrete columns, beams & suspended floor slabs',
        percent: 28,
        amount: Math.round(rawTotal * 0.28),
      },
      {
        phase: 'Structural Roofing & Weatherproofing',
        description: 'Steel/timber trusses, stone-coated sheets, gutters & parapet coping',
        percent: 15,
        amount: Math.round(rawTotal * 0.15),
      },
      {
        phase: 'Mechanical, Electrical & Plumbing (MEP)',
        description: 'Concealed conduit piping, PPR water supply, distribution panels & AC trunking',
        percent: 13,
        amount: Math.round(rawTotal * 0.13),
      },
      {
        phase: 'Finishing, Tiling, POP & Final Handover',
        description: 'Plastering, POP casting, porcelain tiling, painting, doors & sanitaryware',
        percent: 18,
        amount: Math.round(rawTotal * 0.18),
      },
    ];

    return {
      minCost,
      maxCost,
      average: rawTotal,
      ratePerSqM: Math.round(effectiveRatePerSqM),
      phases,
    };
  }, [selectedType, areaSqM, floors, selectedFoundation, selectedTier]);

  const formatCurrency = (valNGN: number) => {
    if (currency === 'NGN') {
      return `₦${valNGN.toLocaleString('en-NG')}`;
    }
    if (currency === 'USD') {
      const valUSD = Math.round(valNGN * RATES.USD);
      return `$${valUSD.toLocaleString('en-US')}`;
    }
    const valGBP = Math.round(valNGN * RATES.GBP);
    return `£${valGBP.toLocaleString('en-GB')}`;
  };

  const handleSelectType = (type: ProjectTypeOption) => {
    setSelectedTypeId(type.id);
    setAreaSqM(type.defaultArea);
    setFloors(type.defaultFloors);
  };

  const handleReset = () => {
    setSelectedTypeId('duplex');
    setAreaSqM(320);
    setFloors(2);
    setSelectedFoundationId('raft');
    setSelectedTierId('premium_luxury');
    setCurrency('NGN');
  };

  const handleProceedToBOQ = () => {
    if (onRequestBOQ) {
      onRequestBOQ({
        projectType: selectedType.name,
        totalAreaSqM: areaSqM,
        floors,
        foundation: selectedFoundation.name,
        tier: selectedTier.name,
        estimatedMinNGN: calculation.minCost,
        estimatedMaxNGN: calculation.maxCost,
      });
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCopySummary = () => {
    const text = `PEOPLE AND CO CONSTRUCTION FIRM - PRELIMINARY COST ESTIMATE
Project: ${selectedType.name}
Total Floor Area: ${areaSqM} m² (${floors} ${floors === 1 ? 'Floor' : 'Floors'})
Foundation Type: ${selectedFoundation.name}
Finishing Specification: ${selectedTier.name}
Indicative Range: ₦${calculation.minCost.toLocaleString()} - ₦${calculation.maxCost.toLocaleString()} NGN
(${formatCurrency(calculation.minCost)} - ${formatCurrency(calculation.maxCost)} ${currency})
Phase Breakdown:
${calculation.phases.map((p) => `- ${p.phase} (${p.percent}%): ${formatCurrency(p.amount)}`).join('\n')}
*Disclaimer: Indicative non-binding estimate for planning purposes. Official BOQ requires formal architectural drawings and site inspection.`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <section id="cost-estimator" className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#0B2545] mb-2">
              <Calculator className="w-4 h-4 text-[#00B4D8]" />
              <span>Planning & Feasibility Tool</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#00B4D8] font-bold">Indicative Cost Estimator</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B2545] font-['Plus_Jakarta_Sans']">
              Preliminary Project Cost Estimator
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mt-3">
              Input your approximate building dimensions, floor requirements, and finishing preferences to receive an immediate, data-driven cost projection based on prevailing Nigerian construction materials and labor standards.
            </p>
          </div>

          {/* Currency Toggle for Diaspora Investors */}
          <div className="bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-1 self-start md:self-end shrink-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 flex items-center gap-1">
              Currency:
            </span>
            {(['NGN', 'USD', 'GBP'] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currency === curr
                    ? 'bg-[#0B2545] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {curr === 'NGN' ? '₦ NGN' : curr === 'USD' ? '$ USD' : '£ GBP'}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Inputs vs Calculation Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Parameters (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-8">
            
            {/* Step 1: Project Type Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0B2545] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0B2545] text-white text-[11px] flex items-center justify-center font-bold">1</span>
                  Select Project Archetype
                </label>
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-400 hover:text-[#0B2545] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROJECT_TYPES.map((type) => {
                  const isSelected = selectedTypeId === type.id;
                  return (
                    <div
                      key={type.id}
                      onClick={() => handleSelectType(type)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer text-left flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#00B4D8] bg-[#00B4D8]/5 ring-1 ring-[#00B4D8]'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-[#0B2545] text-[#00B4D8]'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {type.icon === 'home' && <Home className="w-5 h-5" />}
                          {type.icon === 'building' && <Building className="w-5 h-5" />}
                          {type.icon === 'layers' && <Layers className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-[#0B2545] leading-snug">
                            {type.name}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Dimensions & Area Slider */}
            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0B2545] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0B2545] text-white text-[11px] flex items-center justify-center font-bold">2</span>
                  Total Gross Floor Area
                </label>
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-lg">
                  <span className="text-sm font-extrabold text-[#0B2545]">{areaSqM}</span>
                  <span className="text-xs text-slate-500">m² ({(areaSqM * 10.764).toFixed(0)} sq ft)</span>
                </div>
              </div>

              <input
                type="range"
                min={selectedType.minArea}
                max={selectedType.maxArea}
                step={10}
                value={areaSqM}
                onChange={(e) => setAreaSqM(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#00B4D8]"
              />

              <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
                <span>Min: {selectedType.minArea} m²</span>
                <span>Typical: {selectedType.defaultArea} m²</span>
                <span>Max: {selectedType.maxArea} m²</span>
              </div>

              {/* Number of Floors Control */}
              <div className="mt-4 flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <div>
                  <span className="text-xs font-bold text-[#0B2545] block">
                    Number of Building Storeys / Floors
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Accounts for structural suspended slabs & formwork
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFloors(f)}
                      className={`w-9 h-9 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        floors === f
                          ? 'bg-[#0B2545] text-white shadow-xs'
                          : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Foundation & Soil Condition */}
            <div className="pt-6 border-t border-slate-100">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0B2545] flex items-center gap-2 mb-3">
                <span className="w-5 h-5 rounded-full bg-[#0B2545] text-white text-[11px] flex items-center justify-center font-bold">3</span>
                Foundation & Soil Condition (Substructure)
              </label>

              <div className="space-y-2.5">
                {FOUNDATION_TYPES.map((f) => {
                  const isSelected = selectedFoundationId === f.id;
                  return (
                    <label
                      key={f.id}
                      onClick={() => setSelectedFoundationId(f.id)}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#00B4D8] bg-[#00B4D8]/5 ring-1 ring-[#00B4D8]'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="foundation"
                        checked={isSelected}
                        onChange={() => setSelectedFoundationId(f.id)}
                        className="mt-1 accent-[#00B4D8]"
                      />
                      <div className="text-left">
                        <span className="text-xs sm:text-sm font-bold text-[#0B2545] block">
                          {f.name}
                        </span>
                        <span className="text-[11px] text-slate-500 leading-relaxed block mt-0.5">
                          {f.description}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Finishing & Material Tier */}
            <div className="pt-6 border-t border-slate-100">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0B2545] flex items-center gap-2 mb-3">
                <span className="w-5 h-5 rounded-full bg-[#0B2545] text-white text-[11px] flex items-center justify-center font-bold">4</span>
                Finishing & MEP Specification Tier
              </label>

              <div className="space-y-2.5">
                {FINISHING_TIERS.map((tier) => {
                  const isSelected = selectedTierId === tier.id;
                  return (
                    <label
                      key={tier.id}
                      onClick={() => setSelectedTierId(tier.id)}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#00B4D8] bg-[#00B4D8]/5 ring-1 ring-[#00B4D8]'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="tier"
                        checked={isSelected}
                        onChange={() => setSelectedTierId(tier.id)}
                        className="mt-1 accent-[#00B4D8]"
                      />
                      <div className="text-left">
                        <span className="text-xs sm:text-sm font-bold text-[#0B2545] block">
                          {tier.name}
                        </span>
                        <span className="text-[11px] text-slate-500 leading-relaxed block mt-0.5">
                          {tier.description}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Calculated Projection Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            {/* Main Result Showcase */}
            <div className="bg-[#0B2545] rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
              
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00B4D8]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

              <div className="flex items-center justify-between text-xs text-slate-300 pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#00B4D8]" />
                  <span className="font-semibold uppercase tracking-wider">Indicative Estimate</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-white/10 text-[11px] font-mono text-[#00B4D8]">
                  {currency}
                </span>
              </div>

              {/* Price Range Banner */}
              <div className="space-y-1 mb-6">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                  Estimated Total Budget Range:
                </span>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight font-['Plus_Jakarta_Sans']">
                  {formatCurrency(calculation.minCost)} – {formatCurrency(calculation.maxCost)}
                </div>
                {currency !== 'NGN' && (
                  <p className="text-xs text-slate-400 font-mono pt-1">
                    ≈ ₦{calculation.minCost.toLocaleString()} – ₦{calculation.maxCost.toLocaleString()} NGN
                  </p>
                )}
                <div className="pt-2 flex items-center gap-2 text-xs text-[#00B4D8]">
                  <span>Avg. {formatCurrency(calculation.ratePerSqM)} per m²</span>
                  <span>·</span>
                  <span>{areaSqM} m² Total Footprint</span>
                </div>
              </div>

              {/* Phase Breakdown List */}
              <div className="space-y-3 pt-6 border-t border-white/10 mb-8">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center justify-between">
                  <span>Phase Breakdown Distribution</span>
                  <span className="text-[11px] text-slate-400 font-normal">Approximate %</span>
                </div>

                {calculation.phases.map((phase, pIdx) => (
                  <div key={pIdx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-200 font-medium truncate max-w-[200px] sm:max-w-[240px]">
                        {phase.phase}
                      </span>
                      <span className="font-bold text-white shrink-0">
                        {formatCurrency(phase.amount)}
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#00B4D8] rounded-full transition-all duration-500"
                        style={{ width: `${phase.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleProceedToBOQ}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#00B4D8] text-slate-950 hover:bg-[#38bdf8] font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Request Official Detailed BOQ</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleCopySummary}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border border-white/15"
                >
                  {copiedSummary ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Estimate Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 text-slate-300" />
                      <span>Copy Estimate Summary</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct Call Quick Link */}
              <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-slate-400">
                <span>Prefer to discuss over phone? Call </span>
                <a
                  href="tel:+2348060371283"
                  className="text-[#00B4D8] font-bold hover:underline"
                >
                  +234 806 037 1283
                </a>
              </div>
            </div>

            {/* Ethical Non-Binding Disclaimer Notice */}
            <div className="bg-amber-50/90 border border-amber-200/90 rounded-xl p-4 text-amber-950 flex items-start gap-3 text-xs leading-relaxed">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block mb-1">
                  Ethical & Legal Estimation Notice:
                </strong>
                This tool generates preliminary, indicative cost projections for client budgeting and feasibility analysis. Final binding contract figures require professional site geotechnical tests, cadastral surveys, structural engineering drawings, and an official certified Bill of Quantities (BOQ) prepared by People and Co Construction Firm.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
