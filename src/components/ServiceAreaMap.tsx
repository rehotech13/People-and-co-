import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Compass,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Search,
  Building2,
  Navigation,
  ArrowRight,
  Sparkles,
  Filter,
  HardHat,
  ChevronRight,
  ExternalLink,
  Globe2,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface LGAData {
  id: string;
  name: string;
  headquarters: string;
  senatorialZone: 'Delta Central' | 'Delta South' | 'Delta North';
  isHQ?: boolean;
  projectCount: number;
  activeSites: number;
  soilProfile: string;
  foundationRecommendation: string;
  keyTowns: string[];
  recentMilestone: string;
  // Relative schematic coordinates for the visual SVG map overlay (0-100 scale)
  mapCoord: { x: number; y: number };
}

export const DELTA_LGAS: LGAData[] = [
  // --- Delta Central Senatorial District (8 LGAs) ---
  {
    id: 'ethiope-east',
    name: 'Ethiope East',
    headquarters: 'Isiokolo',
    senatorialZone: 'Delta Central',
    isHQ: true,
    projectCount: 28,
    activeSites: 4,
    soilProfile: 'Sandy-Clay Subgrade with High Water Table Margin',
    foundationRecommendation: 'Reinforced Monolithic Raft Foundation with C30 Concrete',
    keyTowns: ['Eku (Firm Base)', 'Abraka', 'Isiokolo', 'Kokori', 'Samagidi', 'Okpara Inland'],
    recentMilestone: 'Turnkey 5-Bedroom Luxury Smart Villa & Drainage along New Eku-Abraka Road',
    mapCoord: { x: 48, y: 44 },
  },
  {
    id: 'ethiope-west',
    name: 'Ethiope West',
    headquarters: 'Oghara',
    senatorialZone: 'Delta Central',
    projectCount: 16,
    activeSites: 2,
    soilProfile: 'Alluvial Riverine Sand with Medium Permeability',
    foundationRecommendation: 'Reinforced Raft Foundation with Heavy DPC Vapor Membrane',
    keyTowns: ['Oghara', 'Mosogar', 'Jesse', 'Boboroku'],
    recentMilestone: 'DPC German Floor & Load-Bearing Masonry Casting for Private Estate',
    mapCoord: { x: 38, y: 32 },
  },
  {
    id: 'okpe',
    name: 'Okpe',
    headquarters: 'Orerokpe',
    senatorialZone: 'Delta Central',
    projectCount: 14,
    activeSites: 1,
    soilProfile: 'Sandy Loam with Laterite Strata at 1.5m Depth',
    foundationRecommendation: 'Pad Footings with Continuous Reinforced Plinth Ground Beams',
    keyTowns: ['Orerokpe', 'Jeddo', 'Osubi (Airport Axis)', 'Ugbokodo'],
    recentMilestone: 'Commercial Warehouse Slab & Structural Steel Truss Installation',
    mapCoord: { x: 34, y: 50 },
  },
  {
    id: 'sapele',
    name: 'Sapele',
    headquarters: 'Sapele',
    senatorialZone: 'Delta Central',
    projectCount: 22,
    activeSites: 3,
    soilProfile: 'Wetland Delta Coastal Silty Sand',
    foundationRecommendation: 'Deep Heavy Monolithic Raft with Waterproof Slurry Admixtures',
    keyTowns: ['Sapele Urban', 'Amukpe', 'Elume', 'Ogodo'],
    recentMilestone: '1,200-Seater Auditorium Foundation & Multi-Storey Retail Framing',
    mapCoord: { x: 32, y: 38 },
  },
  {
    id: 'udu',
    name: 'Udu',
    headquarters: 'Ovwian',
    senatorialZone: 'Delta Central',
    projectCount: 15,
    activeSites: 2,
    soilProfile: 'Dense Sub-base Laterite with High Bearing Capacity',
    foundationRecommendation: 'Engineered Reinforced Raft Foundation for River Basin Proximity',
    keyTowns: ['Ovwian', 'Aladja', 'Ujevwu', 'Orhuwhorun'],
    recentMilestone: 'Commercial Steel Truss Warehousing and Storm Drainage Network',
    mapCoord: { x: 26, y: 60 },
  },
  {
    id: 'ughelli-north',
    name: 'Ughelli North',
    headquarters: 'Ughelli',
    senatorialZone: 'Delta Central',
    projectCount: 20,
    activeSites: 3,
    soilProfile: 'Firm Laterite Subgrade with Excellent Cohesion',
    foundationRecommendation: 'Strip/Pad Footing or Shallow Raft with High-Yield Tensile Rebar',
    keyTowns: ['Ughelli Urban', 'Agbarho', 'Evwreni', 'Orogun'],
    recentMilestone: 'Structural Steel Roof Truss Fabrication & Multi-Storey Plaza Decking',
    mapCoord: { x: 44, y: 62 },
  },
  {
    id: 'ughelli-south',
    name: 'Ughelli South',
    headquarters: 'Otu-Jeremi',
    senatorialZone: 'Delta Central',
    projectCount: 11,
    activeSites: 1,
    soilProfile: 'Alluvial Wetland Silt over Stiff Clay',
    foundationRecommendation: 'Reinforced Raft with Extended Toe Beams to Mitigate Differential Settlement',
    keyTowns: ['Otu-Jeremi', 'Effurun-Otor', 'Ewu', 'Okpare'],
    recentMilestone: 'Reinforced Box Culvert and Residential Perimeter Retaining Wall',
    mapCoord: { x: 36, y: 66 },
  },
  {
    id: 'uvwie',
    name: 'Uvwie',
    headquarters: 'Effurun',
    senatorialZone: 'Delta Central',
    projectCount: 26,
    activeSites: 4,
    soilProfile: 'High Water-Table Urban Clay-Sand Matrix',
    foundationRecommendation: 'Reinforced Raft Foundation with Dual-Layer Steel Reinforcement Mesh',
    keyTowns: ['Effurun', 'PTI Road Corridor', 'Jakpa Road', 'Iterigbi'],
    recentMilestone: 'Suspended Concrete First-Floor Decking & Shopping Hub Framing',
    mapCoord: { x: 28, y: 54 },
  },

  // --- Delta South Senatorial District (8 LGAs) ---
  {
    id: 'bomadi',
    name: 'Bomadi',
    headquarters: 'Bomadi',
    senatorialZone: 'Delta South',
    projectCount: 7,
    activeSites: 1,
    soilProfile: 'River Basin Alluvial Deposit with High Water Table',
    foundationRecommendation: 'Reinforced Piled Substructure or Monolithic Floating Raft',
    keyTowns: ['Bomadi', 'Ogoloma', 'Kpakiama'],
    recentMilestone: 'Shoreline Concrete Retaining Wall and Residential Footings',
    mapCoord: { x: 42, y: 82 },
  },
  {
    id: 'burutu',
    name: 'Burutu',
    headquarters: 'Burutu',
    senatorialZone: 'Delta South',
    projectCount: 6,
    activeSites: 1,
    soilProfile: 'Coastal Estuary Peat and Marine Clay',
    foundationRecommendation: 'Marine-Grade Sulfate-Resisting Piled Raft Foundation',
    keyTowns: ['Burutu Island', 'Forcados', 'Ogulagha', 'Kiagbodo'],
    recentMilestone: 'Marine-grade Jetty Approach Slab & Industrial Foundations',
    mapCoord: { x: 18, y: 78 },
  },
  {
    id: 'isoko-north',
    name: 'Isoko North',
    headquarters: 'Ozoro',
    senatorialZone: 'Delta South',
    projectCount: 13,
    activeSites: 2,
    soilProfile: 'Cohesive Silty Laterite Subgrade',
    foundationRecommendation: 'Pad Footings with Continuous Reinforced Grade Beams',
    keyTowns: ['Ozoro', 'Owhelogbo', 'Iyede', 'Ofagbe'],
    recentMilestone: 'Polytechnic Corridor Commercial Complex & Student Residential Units',
    mapCoord: { x: 54, y: 64 },
  },
  {
    id: 'isoko-south',
    name: 'Isoko South',
    headquarters: 'Oleh',
    senatorialZone: 'Delta South',
    projectCount: 12,
    activeSites: 2,
    soilProfile: 'Firm Laterite Loam with Uniform Stratification',
    foundationRecommendation: 'Engineered Raft or Strip Footing with High DPC Elevation',
    keyTowns: ['Oleh', 'Aviara', 'Uzere', 'Emede'],
    recentMilestone: 'Residential Executive Duplex with Complete MEP Conduiting',
    mapCoord: { x: 52, y: 72 },
  },
  {
    id: 'patani',
    name: 'Patani',
    headquarters: 'Patani',
    senatorialZone: 'Delta South',
    projectCount: 8,
    activeSites: 1,
    soilProfile: 'Alluvial River Floodplain Silt',
    foundationRecommendation: 'Elevated Raft Foundation with Sub-base Stone Hardcore Compaction',
    keyTowns: ['Patani', 'Agoloma', 'Aven', 'Koloware'],
    recentMilestone: 'Highway Drainage Culverts & Commercial Fueling Station Slab',
    mapCoord: { x: 52, y: 88 },
  },
  {
    id: 'warri-north',
    name: 'Warri North',
    headquarters: 'Koko',
    senatorialZone: 'Delta South',
    projectCount: 9,
    activeSites: 1,
    soilProfile: 'Coastal Wetland with Saline Sub-surface Conditions',
    foundationRecommendation: 'Heavy Sulfate-Resisting Reinforced Concrete Raft',
    keyTowns: ['Koko (Free Trade Zone)', 'Tebujor', 'Ogidigben'],
    recentMilestone: 'Industrial Logistics Flooring & Heavy Equipment Pad Casting',
    mapCoord: { x: 16, y: 34 },
  },
  {
    id: 'warri-south',
    name: 'Warri South',
    headquarters: 'Warri',
    senatorialZone: 'Delta South',
    projectCount: 25,
    activeSites: 3,
    soilProfile: 'Urban Coastal Wetland with Low Natural Drainage',
    foundationRecommendation: 'Reinforced Raft Foundation with Continuous Peripheral U-Drainage',
    keyTowns: ['Warri Urban', 'Airport Road', 'Edjeba', 'Ogunu', 'Igbudu'],
    recentMilestone: '4-Storey Retail & Corporate Plaza Raft Concrete Pour',
    mapCoord: { x: 22, y: 56 },
  },
  {
    id: 'warri-south-west',
    name: 'Warri South West',
    headquarters: 'Ogbe-Ijoh',
    senatorialZone: 'Delta South',
    projectCount: 7,
    activeSites: 1,
    soilProfile: 'Mangrove Swamp Alluvial Mud & Silt',
    foundationRecommendation: 'Timber / Concrete Piling with Rigid Tie-Beam Caps',
    keyTowns: ['Ogbe-Ijoh', 'Escravos', 'Oporoza', 'Kurutie'],
    recentMilestone: 'Elevated Marine Structural Platform & Staff Accommodation',
    mapCoord: { x: 12, y: 64 },
  },

  // --- Delta North Senatorial District (9 LGAs) ---
  {
    id: 'aniocha-north',
    name: 'Aniocha North',
    headquarters: 'Issele-Uku',
    senatorialZone: 'Delta North',
    projectCount: 11,
    activeSites: 1,
    soilProfile: 'High-Altitude Firm Laterite with Excellent Bearing Strength',
    foundationRecommendation: 'Standard Strip Footing with High-Strength Reinforced Lintels',
    keyTowns: ['Issele-Uku', 'Onicha-Ugbo', 'Idumuje-Ugboko', 'Ezi'],
    recentMilestone: 'Bespoke Country Home Villa with Spanish Tile Finishing',
    mapCoord: { x: 68, y: 24 },
  },
  {
    id: 'aniocha-south',
    name: 'Aniocha South',
    headquarters: 'Ogwashi-Uku',
    senatorialZone: 'Delta North',
    projectCount: 15,
    activeSites: 2,
    soilProfile: 'Well-Drained Red Clayey Laterite',
    foundationRecommendation: 'Strip/Pad Footing with Reinforced Ground Tie-Beams',
    keyTowns: ['Ogwashi-Uku', 'Ubulu-Uku', 'Nsukwa', 'Ejeme-Aniogor'],
    recentMilestone: '4-Bedroom Detached Bungalow with Perimeter Security Works',
    mapCoord: { x: 70, y: 36 },
  },
  {
    id: 'ika-north-east',
    name: 'Ika North East',
    headquarters: 'Owa-Oyibu',
    senatorialZone: 'Delta North',
    projectCount: 14,
    activeSites: 2,
    soilProfile: 'Stable Inland Clay Sand with Uniform Stratigraphy',
    foundationRecommendation: 'Reinforced Strip & Column Footings with Standard DPC',
    keyTowns: ['Owa-Oyibu', 'Boer', 'Ute-Okpu', 'Idumuesah'],
    recentMilestone: 'Agro-Allied Storage Facility & Staff Quarters Construction',
    mapCoord: { x: 56, y: 22 },
  },
  {
    id: 'ika-south',
    name: 'Ika South',
    headquarters: 'Agbor',
    senatorialZone: 'Delta North',
    projectCount: 19,
    activeSites: 3,
    soilProfile: 'Firm Laterite Soil with High Natural Compaction',
    foundationRecommendation: 'Pad Footings with Continuous Reinforced Plinth Beams',
    keyTowns: ['Agbor', 'Alihijagba', 'Orogodo', 'Alisimie'],
    recentMilestone: 'Commercial Banking Outlet Renovation & Residential Duplexes',
    mapCoord: { x: 54, y: 28 },
  },
  {
    id: 'ndokwa-east',
    name: 'Ndokwa East',
    headquarters: 'Aboh',
    senatorialZone: 'Delta North',
    projectCount: 9,
    activeSites: 1,
    soilProfile: 'River Niger Floodplain Alluvial Deposits',
    foundationRecommendation: 'Reinforced Heavy Raft Foundation with Flood-Defensive Elevation',
    keyTowns: ['Aboh', 'Ashaka', 'Ossissa', 'Afor'],
    recentMilestone: 'Flood-Resistant Residential Villa with Reinforced Concrete Decking',
    mapCoord: { x: 74, y: 52 },
  },
  {
    id: 'ndokwa-west',
    name: 'Ndokwa West',
    headquarters: 'Kwale',
    senatorialZone: 'Delta North',
    projectCount: 16,
    activeSites: 2,
    soilProfile: 'Sandy Clay with Seasonal Groundwater Fluctuations',
    foundationRecommendation: 'Monolithic Raft Foundation with Heavy DPC Vapor Membrane',
    keyTowns: ['Kwale', 'Utagba-Ogbe', 'Onicha-Ukwuani', 'Ebedei'],
    recentMilestone: 'Energy Subcontractor Office Hub & Executive Residential Build',
    mapCoord: { x: 62, y: 46 },
  },
  {
    id: 'oshimili-north',
    name: 'Oshimili North',
    headquarters: 'Ibusa / Akwukwu-Igbo',
    senatorialZone: 'Delta North',
    projectCount: 18,
    activeSites: 3,
    soilProfile: 'Firm Laterite Terrain with Gentle Gradients',
    foundationRecommendation: 'Engineered Strip / Raft Foundation for Rapid Estate Expansion',
    keyTowns: ['Ibusa', 'Oko', 'Akwukwu-Igbo', 'Illah', 'Ugbolu'],
    recentMilestone: 'Masterplanned Residential Villa Estate with Storm Channels',
    mapCoord: { x: 78, y: 28 },
  },
  {
    id: 'oshimili-south',
    name: 'Oshimili South',
    headquarters: 'Asaba (State Capital)',
    senatorialZone: 'Delta North',
    projectCount: 31,
    activeSites: 5,
    soilProfile: 'River Niger Proximity Alluvium with High-Density Development Needs',
    foundationRecommendation: 'C30 Reinforced Concrete Raft Foundation with Engineered Piles',
    keyTowns: ['Asaba City Centre', 'GRA Phase 1 & 2', 'Nnebisi Road', 'Okpanam Axis'],
    recentMilestone: 'Twin Luxury 4-Bedroom Semi-Detached Duplexes (Rental Portfolio)',
    mapCoord: { x: 84, y: 32 },
  },
  {
    id: 'ukwuani',
    name: 'Ukwuani',
    headquarters: 'Obiaruku',
    senatorialZone: 'Delta North',
    projectCount: 12,
    activeSites: 2,
    soilProfile: 'River Ethiope Basin Alluvial Sand & Clay',
    foundationRecommendation: 'Reinforced Raft Foundation with High Plinth DPC Elevation',
    keyTowns: ['Obiaruku', 'Umuebu', 'Amai', 'Eziokpor'],
    recentMilestone: 'Residential Villa and Commercial Outlets along River Ethiope Basin',
    mapCoord: { x: 58, y: 40 },
  },
];

interface ServiceAreaMapProps {
  onSelectLGAForConsultation?: (lgaName: string) => void;
}

export const ServiceAreaMap: React.FC<ServiceAreaMapProps> = ({
  onSelectLGAForConsultation,
}) => {
  const { t } = useLanguage();
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLGAId, setActiveLGAId] = useState<string>('ethiope-east');

  // Filtered LGAs
  const filteredLGAs = useMemo(() => {
    return DELTA_LGAS.filter((lga) => {
      const matchesZone =
        selectedZone === 'all' || lga.senatorialZone === selectedZone;
      const matchesSearch =
        searchQuery.trim() === '' ||
        lga.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lga.headquarters.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lga.keyTowns.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesZone && matchesSearch;
    });
  }, [selectedZone, searchQuery]);

  const activeLGA =
    DELTA_LGAS.find((l) => l.id === activeLGAId) || DELTA_LGAS[0];

  const handleConsultLGA = (lgaName: string) => {
    if (onSelectLGAForConsultation) {
      onSelectLGAForConsultation(lgaName);
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const totalProjectsAcrossDelta = useMemo(() => {
    return DELTA_LGAS.reduce((acc, curr) => acc + curr.projectCount, 0);
  }, []);

  const totalActiveSitesAcrossDelta = useMemo(() => {
    return DELTA_LGAS.reduce((acc, curr) => acc + curr.activeSites, 0);
  }, []);

  return (
    <section id="service-area" className="py-20 lg:py-28 bg-[#0B2545] text-white relative overflow-hidden">
      {/* Background Cartographic Grid Texture */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.25) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#00B4D8] mb-2 font-['Plus_Jakarta_Sans']">
              <Compass className="w-4 h-4 text-[#00B4D8]" />
              <span>Full Territorial Operational Coverage</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-400 font-bold">25 of 25 LGAs Mobilized</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-['Plus_Jakarta_Sans']">
              Delta State Engineering Service Map
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mt-3">
              Headquartered at <strong className="text-white">Eku, Ethiope East LGA</strong>, People and Co Construction Firm operates with fully mobilized resident engineers, soil mechanics teams, and concrete batch equipment across all 25 Local Government Areas.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-4 bg-slate-800/90 border border-slate-700/80 p-4 rounded-xl shadow-lg shrink-0">
            <div className="border-r border-slate-700 pr-4 text-center">
              <span className="text-2xl font-black text-[#00B4D8] block font-['Plus_Jakarta_Sans']">
                25 / 25
              </span>
              <span className="text-[11px] text-slate-400 font-medium">LGAs Covered</span>
            </div>
            <div className="border-r border-slate-700 pr-4 text-center">
              <span className="text-2xl font-black text-[#F59E0B] block font-['Plus_Jakarta_Sans']">
                {totalActiveSitesAcrossDelta}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Active Sites</span>
            </div>
            <div className="text-center">
              <span className="text-2xl font-black text-emerald-400 block font-['Plus_Jakarta_Sans']">
                {totalProjectsAcrossDelta}+
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Statewide Builds</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 border border-slate-700/80 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Senatorial District Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5 text-[#00B4D8]" /> District:
            </span>
            {[
              { id: 'all', label: 'All 25 LGAs' },
              { id: 'Delta Central', label: 'Delta Central (HQ Zone)' },
              { id: 'Delta South', label: 'Delta South (Coastal)' },
              { id: 'Delta North', label: 'Delta North (Capital)' },
            ].map((zone) => (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(zone.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedZone === zone.id
                    ? 'bg-[#00B4D8] text-slate-950 shadow-md shadow-[#00B4D8]/20'
                    : 'bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {zone.label}
              </button>
            ))}
          </div>

          {/* Quick Town Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search town, city or LGA (e.g. Eku, Asaba, Warri)..."
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-[#00B4D8] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Main Grid: Interactive Map Visual Overlay (Left) + Detail Inspector Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Map Matrix & Spatial Coordinates (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-800/90 rounded-2xl p-6 border border-slate-700/80 shadow-xl flex flex-col justify-between">
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                <Navigation className="w-4 h-4 text-[#00B4D8]" />
                <span>Interactive LGA Selection & Spatial Grid</span>
              </div>
              <span className="text-[11px] text-[#00B4D8] font-mono font-bold">
                Showing {filteredLGAs.length} of 25 LGAs
              </span>
            </div>

            {/* Interactive SVG Cartographic Schematic */}
            <div className="relative w-full aspect-[16/10] bg-slate-950/80 rounded-xl border border-slate-700/90 overflow-hidden p-4 mb-6 select-none">
              
              {/* Delta State River & Coastal Lines Graphic Elements */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
                preserveAspectRatio="none"
              >
                {/* Stylized River Niger & Ethiope River Network Paths */}
                <path
                  d="M 10 35 Q 25 30 35 45 T 50 40 T 70 30 T 90 25"
                  fill="none"
                  stroke="#00B4D8"
                  strokeWidth="1.5"
                />
                <path
                  d="M 30 45 Q 45 55 50 70 T 45 95"
                  fill="none"
                  stroke="#00B4D8"
                  strokeWidth="1"
                />
                <path
                  d="M 5 65 Q 20 60 25 75 T 40 90"
                  fill="none"
                  stroke="#00B4D8"
                  strokeWidth="1"
                />
              </svg>

              {/* Waterway Indicators */}
              <div className="absolute top-3 left-4 text-[9px] font-mono text-[#00B4D8]/60 uppercase tracking-widest flex items-center gap-1">
                <span>≈ Bight of Benin / Escravos Estuary</span>
              </div>
              <div className="absolute bottom-3 right-4 text-[9px] font-mono text-[#00B4D8]/60 uppercase tracking-widest flex items-center gap-1">
                <span>≈ River Niger Corridor / Asaba Axis</span>
              </div>

              {/* Interactive LGA Markers on the Map */}
              {filteredLGAs.map((lga) => {
                const isSelected = activeLGAId === lga.id;
                const isHQ = lga.isHQ;

                return (
                  <button
                    key={lga.id}
                    onClick={() => setActiveLGAId(lga.id)}
                    style={{
                      left: `${lga.mapCoord.x}%`,
                      top: `${lga.mapCoord.y}%`,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 z-10 cursor-pointer ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-115'
                    }`}
                    title={`${lga.name} (${lga.headquarters}) - ${lga.projectCount} Projects`}
                  >
                    {/* Pulsing ring for HQ */}
                    {isHQ && (
                      <span className="absolute -inset-1.5 rounded-full bg-amber-400/40 animate-ping" />
                    )}

                    {/* Marker Dot */}
                    <div
                      className={`relative flex items-center justify-center rounded-full transition-all shadow-md ${
                        isHQ
                          ? 'w-7 h-7 bg-amber-500 text-slate-950 font-black ring-2 ring-white shadow-amber-500/50'
                          : isSelected
                          ? 'w-6 h-6 bg-[#00B4D8] text-slate-950 font-bold ring-2 ring-white shadow-[#00B4D8]/50'
                          : 'w-4 h-4 bg-slate-700 hover:bg-[#00B4D8] text-white border border-slate-500'
                      }`}
                    >
                      {isHQ ? (
                        <span className="text-[10px]">★</span>
                      ) : isSelected ? (
                        <MapPin className="w-3.5 h-3.5" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-slate-950" />
                      )}
                    </div>

                    {/* Compact Label */}
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 top-full mt-1 px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap font-medium transition-all pointer-events-none ${
                        isSelected
                          ? 'bg-[#00B4D8] text-slate-950 font-bold shadow-md'
                          : isHQ
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-900/90 text-slate-300 border border-slate-700 group-hover:text-white'
                      }`}
                    >
                      {lga.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick LGA Selector Buttons Pill Grid */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Quick LGA Directory (Click to Inspect Engineering Profile):
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto p-1 bg-slate-900/60 rounded-xl border border-slate-700/60">
                {filteredLGAs.map((lga) => {
                  const isSelected = activeLGAId === lga.id;
                  return (
                    <button
                      key={lga.id}
                      onClick={() => setActiveLGAId(lga.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#00B4D8] text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                      }`}
                    >
                      {lga.isHQ && <span className="text-amber-400">★</span>}
                      <span>{lga.name}</span>
                      <span className="text-[10px] opacity-75 font-mono">({lga.projectCount})</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Detailed Engineering Inspector Card for Selected LGA (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-800/95 rounded-2xl p-6 sm:p-8 border border-slate-700/90 shadow-2xl relative overflow-hidden">
            
            {/* HQ Highlight Accent */}
            {activeLGA.isHQ && (
              <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[11px] font-extrabold uppercase px-3 py-1 rounded-bl-xl tracking-wider flex items-center gap-1 shadow-md">
                <span>★ Corporate HQ & Base Office</span>
              </div>
            )}

            {/* LGA Title & Zone */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#00B4D8] tracking-wider mb-1">
                <span>{activeLGA.senatorialZone}</span>
                <span aria-hidden="true">·</span>
                <span>HQ: {activeLGA.headquarters}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans']">
                {activeLGA.name} LGA
              </h3>
            </div>

            {/* Project Stats in this LGA */}
            <div className="grid grid-cols-2 gap-3 mb-6 p-3.5 rounded-xl bg-slate-900/80 border border-slate-700">
              <div className="border-r border-slate-700/80 pr-3">
                <span className="text-xs text-slate-400 block font-medium">Completed Projects:</span>
                <span className="text-xl font-black text-white font-['Plus_Jakarta_Sans']">
                  {activeLGA.projectCount} Builds
                </span>
              </div>
              <div className="pl-2">
                <span className="text-xs text-slate-400 block font-medium">Active Construction Sites:</span>
                <span className="text-xl font-black text-[#F59E0B] font-['Plus_Jakarta_Sans'] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                  {activeLGA.activeSites} Sites Live
                </span>
              </div>
            </div>

            {/* Engineering Soil & Foundation Specification Details */}
            <div className="space-y-4 mb-6 text-left">
              
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/70">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  <Layers className="w-3.5 h-3.5 text-[#00B4D8]" />
                  <span>Subgrade Soil Mechanics Profile</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeLGA.soilProfile}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/70">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Certified Foundation Recommendation</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {activeLGA.foundationRecommendation}
                </p>
              </div>

              {/* Key Towns Served */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Key Towns & Municipal Coverage:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeLGA.keyTowns.map((town, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-slate-700/80 text-slate-200 text-xs border border-slate-600"
                    >
                      {town}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Milestone */}
              <div className="pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  Recent Milestone / Signature Execution:
                </span>
                <p className="text-xs text-slate-300 italic">
                  "{activeLGA.recentMilestone}"
                </p>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => handleConsultLGA(activeLGA.name)}
              className="w-full py-3.5 px-4 rounded-xl bg-[#00B4D8] hover:bg-[#38bdf8] text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Request Project Feasibility in {activeLGA.name}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

          </div>

        </div>

        {/* Nationwide Operational Extension Banner */}
        <div className="mt-12 bg-linear-to-r from-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-700/80 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#00B4D8]/20 border border-[#00B4D8]/40 flex items-center justify-center text-[#00B4D8] shrink-0">
              <Globe2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
                Operating Nationwide Beyond Delta State
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Our plant equipment, resident engineers, and quantity surveyors mobilize across Nigeria — including <strong className="text-white">Lagos, Abuja FCT, Edo (Benin City), Rivers (Port Harcourt), Bayelsa (Yenagoa), and Anambra</strong>.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all shrink-0 cursor-pointer"
          >
            <span>Consult Nationwide Engineering</span>
            <ExternalLink className="w-4 h-4 text-[#00B4D8]" />
          </a>
        </div>

      </div>
    </section>
  );
};
