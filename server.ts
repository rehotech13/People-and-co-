import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '25mb' }));
app.use(express.static(path.resolve(__dirname, 'public')));

// Initialize GoogleGenAI SDK
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// In-memory + persistent fallback storage for enquiries
export interface EnquiryRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  subject: string;
  projectLocation?: string;
  estimatedBudget?: string;
  preferredContactMethod: 'email' | 'phone' | 'whatsapp';
  message: string;
  privacyConsent: boolean;
  createdAt: string;
  status: 'new' | 'contacted' | 'in_review' | 'quoted' | 'archived';
  notes?: string;
  recipientEmail: string;
}

export interface PropertyRecord {
  id: string;
  title: string;
  type: 'commercial' | 'residential' | 'land' | 'industrial';
  typeLabel: string;
  status: 'for_sale' | 'for_lease' | 'joint_venture';
  statusLabel: string;
  location: string;
  price: string;
  priceRaw: number;
  bedrooms?: number;
  bathrooms?: number;
  size: string;
  description: string;
  image: string;
  images?: string[];
  features: string[];
  isDemonstration: boolean;
  createdAt: string;
}

const DATA_DIR = path.resolve(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'enquiries.json');
const PROPERTIES_FILE = path.join(DATA_DIR, 'properties.json');
const TRACKERS_FILE = path.join(DATA_DIR, 'project_trackers.json');

export interface ProjectMilestoneRecord {
  id: string;
  phaseNumber: number;
  title: string;
  description: string;
  targetDate: string;
  completedDate?: string;
  status: 'completed' | 'in_progress' | 'pending';
  engineerNotes?: string;
  verificationBadge?: string;
}

export interface ProjectTrackerRecord {
  id: string;
  trackingCode: string;
  clientName: string;
  projectTitle: string;
  projectType: string;
  location: string;
  siteEngineer: string;
  contractor: string;
  startDate: string;
  estimatedCompletionDate: string;
  overallProgressPercent: number;
  currentPhase: string;
  status: 'on_track' | 'ahead_of_schedule' | 'under_review' | 'completed';
  lastInspectionDate: string;
  siteHeroImage?: string;
  milestones: ProjectMilestoneRecord[];
  recentSiteUpdates: Array<{
    date: string;
    note: string;
    author: string;
  }>;
}

const INITIAL_PROJECT_TRACKERS: ProjectTrackerRecord[] = [
  {
    id: 'trk-001',
    trackingCode: 'PACCF-PRJ-2026-001',
    clientName: 'Chief & Mrs. Ovie',
    projectTitle: 'Executive 5-Bedroom Smart Villa with Penthouse',
    projectType: 'Turnkey Residential Construction',
    location: 'Along New Eku-Abraka Expressway, Delta State',
    siteEngineer: 'Engr. Kenneth Efe (Lead Structural Specialist)',
    contractor: 'People and Co Construction Firm',
    startDate: '15 Jan 2026',
    estimatedCompletionDate: '30 Jul 2026',
    overallProgressPercent: 68,
    currentPhase: 'Phase 4: First-Floor Decking & Penthouse Superstructure',
    status: 'on_track',
    lastInspectionDate: '16 Apr 2026',
    siteHeroImage: '/images/service_building_construction_1792339538812.jpg',
    milestones: [
      {
        id: 'm-1',
        phaseNumber: 1,
        title: 'Site Topography, Boundary Beacons & Soil Bearing Test',
        description: 'Cadastral coordinate verification, topsoil scraping, and penetrometer bearing capacity test.',
        targetDate: '22 Jan 2026',
        completedDate: '20 Jan 2026',
        status: 'completed',
        engineerNotes: 'Soil bearing capacity certified at 180 kN/m². Soil condition optimal for reinforced raft foundation.',
        verificationBadge: 'Site Soil Certificate Approved'
      },
      {
        id: 'm-2',
        phaseNumber: 2,
        title: 'Substructure Excavation & Heavy Raft Foundation Casting',
        description: 'Excavation of foundation trenches, steel reinforcement cage placement, and high-strength concrete pour.',
        targetDate: '18 Feb 2026',
        completedDate: '15 Feb 2026',
        status: 'completed',
        engineerNotes: 'Reinforced raft foundation cast with C30 ready-mix concrete. Waterproof membrane installed.',
        verificationBadge: 'Foundation Inspection Passed'
      },
      {
        id: 'm-3',
        phaseNumber: 3,
        title: 'DPC German Floor & Ground Floor Load-Bearing Masonry',
        description: 'Damp-proof course casting, plumbing pipe sleeves, and certified vibrated hollow block laying.',
        targetDate: '12 Mar 2026',
        completedDate: '10 Mar 2026',
        status: 'completed',
        engineerNotes: 'Block alignment inspected. Quality sandcrete mix used with zero deviation.',
        verificationBadge: 'DPC Structural Gate Passed'
      },
      {
        id: 'm-4',
        phaseNumber: 4,
        title: 'First Floor Suspended Slab Casting & Formwork',
        description: 'Marine plywood formwork, 16mm/12mm high-yield tensile rebar placement, and slab casting.',
        targetDate: '05 Apr 2026',
        completedDate: '04 Apr 2026',
        status: 'completed',
        engineerNotes: 'Concrete cube crush test passed at 32 N/mm² after 14-day water ponding curing.',
        verificationBadge: 'Decking Structural Approval'
      },
      {
        id: 'm-5',
        phaseNumber: 5,
        title: 'Penthouse Superstructure & Overhead Ring Beams',
        description: 'Upper floor wall masonry, reinforced lintel ties, and overhead ring beam cage binding.',
        targetDate: '10 May 2026',
        status: 'in_progress',
        engineerNotes: 'Reinforcement for ring beam currently 70% placed. Awaiting final formwork inspection.',
      },
      {
        id: 'm-6',
        phaseNumber: 6,
        title: 'Structural Steel Roof Trusses & Parapet Weatherproofing',
        description: 'Fabrication of steel rafters, aluminium stone-coated roofing sheets, and parapet concrete coping.',
        targetDate: '28 May 2026',
        status: 'pending',
        engineerNotes: 'Roof timber and stone-coated tiles already mobilized on site storage.',
      },
      {
        id: 'm-7',
        phaseNumber: 7,
        title: 'Mechanical, Electrical & Plumbing (MEP) Conduiting',
        description: 'Concealed PVC wiring conduits, inverter AC piping, and PPR water supply piping.',
        targetDate: '20 Jun 2026',
        status: 'pending',
      },
      {
        id: 'm-8',
        phaseNumber: 8,
        title: 'Interior Plastering, Porcelain Tiling, Painting & Handover',
        description: 'Screeding, POP ceiling installation, Spanish porcelain floor tiling, and final client walkthrough.',
        targetDate: '30 Jul 2026',
        status: 'pending',
      }
    ],
    recentSiteUpdates: [
      {
        date: '16 Apr 2026',
        note: 'Concrete cube test results received: 32 N/mm² compressive strength achieved on 1st-floor suspended slab. Upper masonry initiated.',
        author: 'Engr. Kenneth Efe'
      },
      {
        date: '04 Apr 2026',
        note: 'First-floor concrete pour completed seamlessly. 14-day ponding curing initiated with dedicated site water pumps.',
        author: 'Site Supervisor Johnson'
      },
      {
        date: '22 Mar 2026',
        note: 'All ground floor column starters cast and vibrated. Scaffolding erect for decking formwork.',
        author: 'Engr. Kenneth Efe'
      }
    ]
  },
  {
    id: 'trk-002',
    trackingCode: 'PACCF-PRJ-2026-002',
    clientName: 'Delta Commercial Holdings Ltd',
    projectTitle: 'Advocate Commercial Shopping Plaza (4-Stories)',
    projectType: 'Commercial Building & Civil Infrastructure',
    location: 'Eku Central Business Strip, Ethiope East LGA',
    siteEngineer: 'Engr. Blessing Oghenekevwe',
    contractor: 'People and Co Construction Firm',
    startDate: '10 Sep 2025',
    estimatedCompletionDate: '25 May 2026',
    overallProgressPercent: 86,
    currentPhase: 'Phase 6: Glass Curtain Wall Glazing & Exterior Interlock',
    status: 'ahead_of_schedule',
    lastInspectionDate: '15 Apr 2026',
    siteHeroImage: '/images/project_commercial_plaza_1792339539199.jpg',
    milestones: [
      {
        id: 'm-201',
        phaseNumber: 1,
        title: 'Geotechnical Soil Investigation & Deep Piling Footing',
        description: 'Soil boring test and reinforced concrete pad footing casting.',
        targetDate: '15 Oct 2025',
        completedDate: '10 Oct 2025',
        status: 'completed',
        verificationBadge: 'Geotechnical Cert Validated'
      },
      {
        id: 'm-202',
        phaseNumber: 2,
        title: 'Multi-Floor Column Casting & Suspended Slabs (Floors 1-4)',
        description: 'Heavy commercial framing and high-load decking.',
        targetDate: '15 Jan 2026',
        completedDate: '08 Jan 2026',
        status: 'completed',
        verificationBadge: 'Multi-Story Frame Passed'
      },
      {
        id: 'm-203',
        phaseNumber: 3,
        title: 'Roof Decking, Parapet & Integrated Rainwater Drainage',
        description: 'Reinforced concrete roof slab and perimeter concealed box gutters.',
        targetDate: '20 Feb 2026',
        completedDate: '18 Feb 2026',
        status: 'completed',
      },
      {
        id: 'm-204',
        phaseNumber: 4,
        title: 'Commercial Glazing, Aluminium Curtain Walls & MEP',
        description: 'Double-glazed reflective curtain wall and commercial electrical transformer room.',
        targetDate: '30 Apr 2026',
        status: 'in_progress',
        engineerNotes: 'Curtain wall panels 85% installed. Dedicated 33KVA transformer already placed.',
      },
      {
        id: 'm-205',
        phaseNumber: 5,
        title: 'Compound Interlocking Paving, Landscaping & Handover',
        description: 'Heavy-duty 80mm interlock paving for customer parking and security boom gate.',
        targetDate: '25 May 2026',
        status: 'pending',
      }
    ],
    recentSiteUpdates: [
      {
        date: '15 Apr 2026',
        note: 'Curtain wall reflective glass installed on levels 1 to 3. Interior electrical wiring 90% completed.',
        author: 'Engr. Blessing Oghenekevwe'
      },
      {
        date: '28 Mar 2026',
        note: 'Exterior perimeter drainage connection to municipal canal completed and pressure tested.',
        author: 'Engr. Blessing Oghenekevwe'
      }
    ]
  },
  {
    id: 'trk-003',
    trackingCode: 'PACCF-PRJ-2026-003',
    clientName: 'Ethiope East Regional Works Committee',
    projectTitle: 'Reinforced Concrete Dual Box Culvert & Flood Relief Channel',
    projectType: 'Civil Infrastructure Engineering',
    location: 'Ethiope East LGA Feeder Road Corridor',
    siteEngineer: 'Engr. Dennis Akpevwe',
    contractor: 'People and Co Construction Firm',
    startDate: '20 Feb 2026',
    estimatedCompletionDate: '20 Jun 2026',
    overallProgressPercent: 48,
    currentPhase: 'Phase 3: Culvert Wing Walls & Deck Slab Shuttering',
    status: 'on_track',
    lastInspectionDate: '14 Apr 2026',
    siteHeroImage: '/images/service_civil_engineering_1792339538398.jpg',
    milestones: [
      {
        id: 'm-301',
        phaseNumber: 1,
        title: 'Hydraulic Survey, Stream Diversion & Soil Dewatering',
        description: 'Stream diversion channel, dewatering pumps installation, and soft silt removal.',
        targetDate: '08 Mar 2026',
        completedDate: '05 Mar 2026',
        status: 'completed',
        verificationBadge: 'Hydraulic Spec Approved'
      },
      {
        id: 'm-302',
        phaseNumber: 2,
        title: 'Lean Concrete Blinding & Invert Slab Concrete Casting',
        description: 'Hardcore filling, 75mm blinding, 20mm rebar mat placement, and 300mm invert slab pour.',
        targetDate: '28 Mar 2026',
        completedDate: '26 Mar 2026',
        status: 'completed',
        verificationBadge: 'Foundation Sump Certified'
      },
      {
        id: 'm-303',
        phaseNumber: 3,
        title: 'Culvert Abutment Walls & Suspended Deck Slab Rebar',
        description: 'Vertical wall reinforcement, wing walls shuttering, and top deck slab rebar binding.',
        targetDate: '30 Apr 2026',
        status: 'in_progress',
        engineerNotes: 'Wall rebar tying completed. Ready for shuttering and concrete vibrator inspection.',
      },
      {
        id: 'm-304',
        phaseNumber: 4,
        title: 'Approach Road Asphalt Overlay & Retaining Wing Walls',
        description: 'Sub-base laterite compaction, crushed stone base, and asphalt binder course.',
        targetDate: '20 Jun 2026',
        status: 'pending',
      }
    ],
    recentSiteUpdates: [
      {
        date: '14 Apr 2026',
        note: 'Wing wall formwork erect. Reinforcement verified according to Federal Highway Bridge specifications.',
        author: 'Engr. Dennis Akpevwe'
      }
    ]
  }
];

function readTrackers(): ProjectTrackerRecord[] {
  try {
    if (fs.existsSync(TRACKERS_FILE)) {
      const raw = fs.readFileSync(TRACKERS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading project trackers, using default seed:', err);
  }
  return [...INITIAL_PROJECT_TRACKERS];
}

function saveTrackers(data: ProjectTrackerRecord[]): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(TRACKERS_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to write project trackers data file:', err);
    return false;
  }
}

let trackersCache: ProjectTrackerRecord[] = readTrackers();


// Initial seed properties
const INITIAL_PROPERTIES: PropertyRecord[] = [
  {
    id: 'prop-001',
    title: 'Prime Commercial Plot along New Eku-Abraka Expressway',
    type: 'land',
    typeLabel: 'Commercial Land',
    status: 'for_sale',
    statusLabel: 'For Sale',
    location: 'Eku, Ethiope East LGA, Delta State',
    price: '₦28,000,000',
    priceRaw: 28000000,
    size: '1,200 sq. meters (approx. 2 Standard Plots)',
    description: 'High-visibility commercial frontage suitable for shopping complexes, corporate branch offices, fuel stations, or warehousing. Directly accessible along the paved highway with verified layout beacons.',
    image: '/images/project_commercial_plaza_1792339539199.jpg',
    images: [
      '/images/project_commercial_plaza_1792339539199.jpg',
      '/images/service_civil_engineering_1792339538398.jpg'
    ],
    features: ['Direct Highway Frontage', 'Dry & Level Ground', 'Survey Plan Ready', 'Free from Legal Encumbrance', 'Fast-Growing Commercial Zone'],
    isDemonstration: true,
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
  },
  {
    id: 'prop-002',
    title: 'Proposed Modern 4-Bedroom Detached Villa Development',
    type: 'residential',
    typeLabel: 'Residential Villa',
    status: 'for_sale',
    statusLabel: 'For Sale',
    location: 'Abraka Axis, Ethiope East LGA, Delta State',
    price: '₦65,000,000',
    priceRaw: 65000000,
    bedrooms: 4,
    bathrooms: 5,
    size: '650 sq. meters building footprint',
    description: 'Contemporary all-en-suite 4-bedroom detached architectural villa designed for diaspora and executive clients. Features modern parapet roofing, private ante-room, spacious master suite, and perimeter security fencing.',
    image: '/images/service_building_construction_1792339538812.jpg',
    images: [
      '/images/service_building_construction_1792339538812.jpg',
      '/images/hero_construction_modern_1792339537125.jpg'
    ],
    features: ['All En-Suite Bedrooms', 'Spacious Kitchen & Pantry', 'Reinforced Raft Foundation', 'Interlocked Compound & Borehole', 'Pre-installed Inverter Conduit'],
    isDemonstration: true,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 'prop-003',
    title: 'Multi-Tenant Commercial Office Suites & Retail Space',
    type: 'commercial',
    typeLabel: 'Commercial Property',
    status: 'for_lease',
    statusLabel: 'For Lease',
    location: 'Eku Central Business Strip, Delta State',
    price: '₦2,500,000 / year',
    priceRaw: 2500000,
    size: '180 sq. meters usable floor space',
    description: 'Well-ventilated ground and first-floor commercial units suitable for financial institutions, diagnostic clinics, legal chambers, or logistics hubs. Dedicated power transformer and ample customer parking.',
    image: '/images/hero_construction_modern_1792339537125.jpg',
    images: [
      '/images/hero_construction_modern_1792339537125.jpg',
      '/images/project_commercial_plaza_1792339539199.jpg'
    ],
    features: ['Dedicated Customer Parking', '24/7 Security Post', 'High-speed Fiber Backbone Conduit', 'Constant Water Supply', 'Direct Road Access'],
    isDemonstration: true,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'prop-004',
    title: 'Twin 3-Bedroom Executive Bungalow Estate',
    type: 'residential',
    typeLabel: 'Residential Bungalow',
    status: 'for_sale',
    statusLabel: 'For Sale',
    location: 'Warri Axis, Delta State',
    price: '₦48,000,000',
    priceRaw: 48000000,
    bedrooms: 3,
    bathrooms: 4,
    size: '900 sq. meters compound',
    description: 'Beautifully finished twin semi-detached bungalows with separate compound gates, stamped concrete paving, pop ceilings, and prepaid digital meters.',
    image: '/images/service_structural_design_1792339538521.jpg',
    images: [
      '/images/service_structural_design_1792339538521.jpg',
      '/images/service_building_construction_1792339538812.jpg'
    ],
    features: ['POP Ceilings Throughout', 'Dedicated Borehole & Overhead Tanks', 'Electric Fence Wire', 'Ample 6-Car Parking', 'Deed of Conveyance'],
    isDemonstration: true,
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString()
  }
];

function readProperties(): PropertyRecord[] {
  try {
    if (fs.existsSync(PROPERTIES_FILE)) {
      const raw = fs.readFileSync(PROPERTIES_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading properties data file, using default seed:', err);
  }
  return [...INITIAL_PROPERTIES];
}

function saveProperties(data: PropertyRecord[]): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(PROPERTIES_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to write properties data file:', err);
    return false;
  }
}

let propertiesCache: PropertyRecord[] = readProperties();


// Initial sample inquiries for staff demonstration if empty
const INITIAL_DEMO_ENQUIRIES: EnquiryRecord[] = [
  {
    id: 'ENQ-DEMO-001',
    fullName: 'Chief Emeka Okonkwo',
    email: 'emeka.okonkwo@delta-investments.com',
    phone: '+2348035551234',
    company: 'Apex Commercial Ventures',
    service: 'Construction Project Management',
    subject: 'Proposed 4-Story Mixed-Use Commercial Development in Delta State',
    projectLocation: 'Eku / Abraka Corridor, Delta State',
    estimatedBudget: '₦50,000,000 - ₦100,000,000',
    preferredContactMethod: 'whatsapp',
    message: 'We are seeking an experienced civil engineering and construction firm for full project management, site supervision, and structural oversight for our planned commercial plaza.',
    privacyConsent: true,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: 'contacted',
    notes: 'Followed up via WhatsApp. Requested preliminary site layout drawings.',
    recipientEmail: process.env.COMPANY_RECEIVING_EMAIL || 'paccf@gmail.com',
  },
  {
    id: 'ENQ-DEMO-002',
    fullName: 'Dr. Tariere Briggs',
    email: 't.briggs@nigerdelta-health.org',
    phone: '+2348149876543',
    company: 'Briggs Diagnostic Center',
    service: 'Structural Design',
    subject: 'Structural Blueprint & BOQ for 2-Floor Clinic Facility',
    projectLocation: 'Ethiope East L.G.A, Delta State',
    estimatedBudget: '₦20,000,000 - ₦50,000,000',
    preferredContactMethod: 'email',
    message: 'Need certified structural drawings and Bill of Quantities (BOQ) for architectural plan submission to urban planning authorities.',
    privacyConsent: true,
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    status: 'new',
    notes: 'Awaiting architectural plan review from client.',
    recipientEmail: process.env.COMPANY_RECEIVING_EMAIL || 'paccf@gmail.com',
  }
];

function readEnquiries(): EnquiryRecord[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading enquiries data file, using default memory:', err);
  }
  return [...INITIAL_DEMO_ENQUIRIES];
}

function saveEnquiries(data: EnquiryRecord[]): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to write enquiries to data file:', err);
    return false;
  }
}

// In-memory working copy
let enquiriesCache: EnquiryRecord[] = readEnquiries();

// API Routes
app.get('/api/company-info', (_req: Request, res: Response) => {
  res.json({
    name: 'PEOPLE AND CO CONSTRUCTION FIRM',
    tagline: 'Building the Future. Creating Lasting Value.',
    email: process.env.COMPANY_RECEIVING_EMAIL || 'paccf@gmail.com',
    phone: process.env.COMPANY_PHONE || '+2348060371283',
    whatsapp: process.env.COMPANY_PHONE || '+2348060371283',
    address: process.env.COMPANY_ADDRESS || '50 along New Eku-Abraka Road, Eku, Ethiope East L.G.A, Delta State',
    operatingRegion: 'Delta State & Nationwide Nigeria',
    services: [
      'Civil Engineering',
      'Building Services',
      'Structural Design',
      'Construction',
      'Construction Project Management',
      'Bill of Quantity (BOQ)',
      'Land Agent & Property Acquisition',
      'Land Survey'
    ]
  });
});

// GET all enquiries (for the owner review inbox)
app.get('/api/enquiries', (_req: Request, res: Response) => {
  res.json({
    success: true,
    total: enquiriesCache.length,
    enquiries: enquiriesCache,
  });
});

// POST new enquiry
app.post('/api/enquiries', (req: Request, res: Response) => {
  const {
    fullName,
    email,
    phone,
    company,
    service,
    subject,
    projectLocation,
    estimatedBudget,
    preferredContactMethod,
    message,
    privacyConsent,
    _hp // honeypot
  } = req.body;

  // 1. Spam protection honeypot
  if (_hp) {
    console.warn('Spam honeypot triggered; discarding silent bot request.');
    return res.status(200).json({
      success: true,
      message: 'Thank you for contacting People and Co Construction Firm. Your enquiry has been submitted successfully.'
    });
  }

  // 2. Required fields validation
  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    return res.status(400).json({ success: false, error: 'Please provide your full name.' });
  }

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
  }

  if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
    return res.status(400).json({ success: false, error: 'Please provide a valid contact telephone number.' });
  }

  if (!service || typeof service !== 'string') {
    return res.status(400).json({ success: false, error: 'Please select a service of interest.' });
  }

  if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
    return res.status(400).json({ success: false, error: 'Please provide an enquiry subject.' });
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return res.status(400).json({ success: false, error: 'Please provide a detailed enquiry message (at least 10 characters).' });
  }

  if (!privacyConsent) {
    return res.status(400).json({ success: false, error: 'You must agree to the privacy policy before submitting.' });
  }

  const validMethods = ['email', 'phone', 'whatsapp'];
  const sanitizedContactMethod = validMethods.includes(preferredContactMethod)
    ? preferredContactMethod
    : 'email';

  const recipientEmail = process.env.COMPANY_RECEIVING_EMAIL || 'paccf@gmail.com';
  const newEnquiry: EnquiryRecord = {
    id: `PACCF-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    company: company ? String(company).trim() : undefined,
    service: service.trim(),
    subject: subject.trim(),
    projectLocation: projectLocation ? String(projectLocation).trim() : undefined,
    estimatedBudget: estimatedBudget ? String(estimatedBudget).trim() : undefined,
    preferredContactMethod: sanitizedContactMethod as 'email' | 'phone' | 'whatsapp',
    message: message.trim(),
    privacyConsent: Boolean(privacyConsent),
    createdAt: new Date().toISOString(),
    status: 'new',
    recipientEmail
  };

  // Add to top of array
  enquiriesCache.unshift(newEnquiry);
  saveEnquiries(enquiriesCache);

  // Log dispatch details for server inspection
  console.log('====================================================');
  console.log(`[PACCF DISPATCH] New Enquiry Received (${newEnquiry.id})`);
  console.log(`To Company Inbox: ${recipientEmail}`);
  console.log(`Client: ${newEnquiry.fullName} (${newEnquiry.email} | ${newEnquiry.phone})`);
  console.log(`Service: ${newEnquiry.service}`);
  console.log(`Subject: ${newEnquiry.subject}`);
  console.log(`Preferred Method: ${newEnquiry.preferredContactMethod}`);
  console.log(`Location: ${newEnquiry.projectLocation || 'Unspecified'}`);
  console.log(`Budget: ${newEnquiry.estimatedBudget || 'Not sure yet'}`);
  // Asynchronous relay to Web3Forms API
  const web3Key = process.env.WEB3FORMS_ACCESS_KEY || 'f2e531ab-60a7-4b3e-96ad-aa2f64be78fb';
  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      access_key: web3Key,
      subject: `[PACCF Enquiry ${newEnquiry.id}] ${newEnquiry.subject} - ${newEnquiry.service}`,
      from_name: 'People and Co Construction Firm Portal',
      name: newEnquiry.fullName,
      email: newEnquiry.email,
      phone: newEnquiry.phone,
      company: newEnquiry.company || 'Not specified',
      service: newEnquiry.service,
      project_location: newEnquiry.projectLocation || 'Not specified',
      estimated_budget: newEnquiry.estimatedBudget || 'Not specified',
      preferred_contact_method: newEnquiry.preferredContactMethod,
      message: newEnquiry.message,
    }),
  }).catch((wErr: any) => console.warn('Backend Web3Forms relay notice:', wErr?.message));
  console.log('====================================================');

  return res.status(201).json({
    success: true,
    message: 'Thank you for contacting People and Co Construction Firm. Your enquiry has been submitted successfully. Our team will respond using your preferred contact method.',
    enquiryId: newEnquiry.id,
    timestamp: newEnquiry.createdAt,
    recipientEmail
  });
});

// Update enquiry status / notes
app.patch('/api/enquiries/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  const enquiry = enquiriesCache.find((e) => e.id === id);
  if (!enquiry) {
    return res.status(404).json({ success: false, error: 'Enquiry not found' });
  }

  if (status && ['new', 'contacted', 'in_review', 'quoted', 'archived'].includes(status)) {
    enquiry.status = status;
  }

  if (typeof notes === 'string') {
    enquiry.notes = notes;
  }

  saveEnquiries(enquiriesCache);
  return res.json({ success: true, enquiry });
});

// ==========================================
// PROPERTIES MODULE ENDPOINTS
// ==========================================

// GET all properties with optional query filtering
app.get('/api/properties', (req: Request, res: Response) => {
  const { type, location, minPrice, maxPrice, status, search } = req.query;

  let results = [...propertiesCache];

  if (type && type !== 'all') {
    results = results.filter((p) => p.type === type);
  }

  if (status && status !== 'all') {
    results = results.filter((p) => p.status === status);
  }

  if (location && location !== 'all') {
    const locLower = String(location).toLowerCase();
    results = results.filter((p) => p.location.toLowerCase().includes(locLower));
  }

  if (minPrice) {
    const min = parseFloat(String(minPrice));
    if (!isNaN(min)) {
      results = results.filter((p) => p.priceRaw >= min);
    }
  }

  if (maxPrice) {
    const max = parseFloat(String(maxPrice));
    if (!isNaN(max)) {
      results = results.filter((p) => p.priceRaw <= max);
    }
  }

  if (search) {
    const q = String(search).toLowerCase();
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.features.some((f) => f.toLowerCase().includes(q))
    );
  }

  return res.json({
    success: true,
    total: results.length,
    properties: results,
  });
});

// POST new property listing
app.post('/api/properties', (req: Request, res: Response) => {
  const {
    title,
    description,
    price,
    location,
    type,
    status,
    bedrooms,
    bathrooms,
    size,
    image,
    images,
    features,
  } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length < 3) {
    return res.status(400).json({ success: false, error: 'Property title is required (at least 3 characters).' });
  }

  if (!location || typeof location !== 'string' || location.trim().length < 2) {
    return res.status(400).json({ success: false, error: 'Property location is required.' });
  }

  if (!description || typeof description !== 'string' || description.trim().length < 10) {
    return res.status(400).json({ success: false, error: 'Property description is required (at least 10 characters).' });
  }

  // Parse price
  let numericPrice = typeof price === 'number' ? price : parseFloat(String(price).replace(/[^0-9.]/g, ''));
  if (isNaN(numericPrice) || numericPrice <= 0) {
    return res.status(400).json({ success: false, error: 'Please enter a valid property price in Naira (₦).' });
  }

  const validTypes = ['commercial', 'residential', 'land', 'industrial'];
  const sanitizedType = validTypes.includes(type) ? type : 'residential';

  const validStatus = ['for_sale', 'for_lease', 'joint_venture'];
  const sanitizedStatus = validStatus.includes(status) ? status : 'for_sale';

  const typeLabels: Record<string, string> = {
    commercial: 'Commercial Property',
    residential: 'Residential Building',
    land: 'Land / Plots',
    industrial: 'Industrial Land & Facilities'
  };

  const statusLabels: Record<string, string> = {
    for_sale: 'For Sale',
    for_lease: 'For Lease',
    joint_venture: 'Joint Venture'
  };

  const formattedPrice = `₦${numericPrice.toLocaleString('en-NG')}${sanitizedStatus === 'for_lease' ? ' / yr' : ''}`;

  const primaryImage = image && typeof image === 'string' && image.trim().length > 0
    ? image.trim()
    : '/images/project_commercial_plaza_1792339539199.jpg';

  const galleryImages = Array.isArray(images) && images.length > 0
    ? images
    : [primaryImage];

  const parsedFeatures = Array.isArray(features)
    ? features.filter((f) => typeof f === 'string' && f.trim().length > 0)
    : ['Verified Title Document', 'Ready for Development'];

  const newProperty: PropertyRecord = {
    id: `prop-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
    title: title.trim(),
    type: sanitizedType as any,
    typeLabel: typeLabels[sanitizedType] || 'Real Estate',
    status: sanitizedStatus as any,
    statusLabel: statusLabels[sanitizedStatus] || 'Available',
    location: location.trim(),
    price: formattedPrice,
    priceRaw: numericPrice,
    bedrooms: bedrooms ? parseInt(String(bedrooms), 10) : undefined,
    bathrooms: bathrooms ? parseInt(String(bathrooms), 10) : undefined,
    size: size && typeof size === 'string' && size.trim().length > 0 ? size.trim() : 'Standard Dimension',
    description: description.trim(),
    image: primaryImage,
    images: galleryImages,
    features: parsedFeatures,
    isDemonstration: false,
    createdAt: new Date().toISOString(),
  };

  propertiesCache.unshift(newProperty);
  saveProperties(propertiesCache);

  console.log(`[PACCF PROPERTY] Added new property listing: ${newProperty.title} (${newProperty.id})`);

  return res.status(201).json({
    success: true,
    message: 'Property listing created successfully.',
    property: newProperty,
  });
});

// DELETE property listing
app.delete('/api/properties/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const initialLength = propertiesCache.length;
  propertiesCache = propertiesCache.filter((p) => p.id !== id);

  if (propertiesCache.length === initialLength) {
    return res.status(404).json({ success: false, error: 'Property not found.' });
  }

  saveProperties(propertiesCache);
  return res.json({ success: true, message: 'Property deleted successfully.' });
});

// ==========================================
// PROJECT STATUS TRACKER ENDPOINTS
// ==========================================

// GET all project trackers
app.get('/api/project-trackers', (req: Request, res: Response) => {
  const { q, status } = req.query;

  let results = [...trackersCache];

  if (status && status !== 'all') {
    results = results.filter((t) => t.status === status);
  }

  if (q && typeof q === 'string' && q.trim()) {
    const query = q.toLowerCase().trim();
    results = results.filter(
      (t) =>
        t.trackingCode.toLowerCase().includes(query) ||
        t.clientName.toLowerCase().includes(query) ||
        t.projectTitle.toLowerCase().includes(query) ||
        t.location.toLowerCase().includes(query) ||
        t.siteEngineer.toLowerCase().includes(query)
    );
  }

  return res.json({
    success: true,
    total: results.length,
    trackers: results,
  });
});

// GET single project tracker by code or id
app.get('/api/project-trackers/:code', (req: Request, res: Response) => {
  const { code } = req.params;
  const target = code.toLowerCase().trim();

  const tracker = trackersCache.find(
    (t) => t.trackingCode.toLowerCase() === target || t.id.toLowerCase() === target
  );

  if (!tracker) {
    return res.status(404).json({ success: false, error: 'Project tracker not found.' });
  }

  return res.json({ success: true, tracker });
});

// POST new project tracker (Staff milestone input)
app.post('/api/project-trackers', (req: Request, res: Response) => {
  const {
    clientName,
    projectTitle,
    projectType,
    location,
    siteEngineer,
    contractor,
    startDate,
    estimatedCompletionDate,
    overallProgressPercent,
    currentPhase,
    status,
    milestones,
    siteHeroImage,
    initialNote,
  } = req.body;

  if (!clientName || !projectTitle || !location) {
    return res.status(400).json({
      success: false,
      error: 'Client name, project title, and location are required.',
    });
  }

  const generatedCode = `PACCF-PRJ-${new Date().getFullYear()}-${String(
    trackersCache.length + 1
  ).padStart(3, '0')}`;

  const defaultMilestones: ProjectMilestoneRecord[] = [
    {
      id: 'm-new-1',
      phaseNumber: 1,
      title: 'Site Topography, Boundary Beacons & Soil Investigation',
      description: 'Cadastral surveying and bearing capacity check.',
      targetDate: 'Week 2',
      status: 'completed',
      completedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    },
    {
      id: 'm-new-2',
      phaseNumber: 2,
      title: 'Substructure Excavation & Raft Foundation Casting',
      description: 'Excavation, rebar binding, and ready-mix concrete pour.',
      targetDate: 'Week 5',
      status: 'in_progress',
    },
    {
      id: 'm-new-3',
      phaseNumber: 3,
      title: 'DPC German Floor & Ground Floor Masonry',
      description: 'Damp-proof course and sandcrete block laying.',
      targetDate: 'Week 8',
      status: 'pending',
    },
    {
      id: 'm-new-4',
      phaseNumber: 4,
      title: 'Suspended Concrete Decking / Superstructure Lintel',
      description: 'Marine board formwork, high-yield rebar, and concrete pour.',
      targetDate: 'Week 12',
      status: 'pending',
    },
    {
      id: 'm-new-5',
      phaseNumber: 5,
      title: 'Structural Steel Roofing & Parapet Weatherproofing',
      description: 'Steel trusses and stone-coated aluminium roofing.',
      targetDate: 'Week 16',
      status: 'pending',
    },
    {
      id: 'm-new-6',
      phaseNumber: 6,
      title: 'MEP Piping, Interior Finishes & Final Commissioning',
      description: 'Conduit electrical, plumbing, tiling, and client handover.',
      targetDate: 'Week 22',
      status: 'pending',
    },
  ];

  const initialUpdates = [];
  if (initialNote && typeof initialNote === 'string') {
    initialUpdates.push({
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      note: initialNote.trim(),
      author: siteEngineer || 'Site Engineer',
    });
  } else {
    initialUpdates.push({
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      note: 'Project file initialized on PACCF client tracking portal. Site mobilization commenced.',
      author: siteEngineer || 'Lead Engineer',
    });
  }

  const newTracker: ProjectTrackerRecord = {
    id: `trk-${Date.now().toString(36)}`,
    trackingCode: generatedCode,
    clientName: clientName.trim(),
    projectTitle: projectTitle.trim(),
    projectType: projectType ? projectType.trim() : 'Turnkey Building Construction',
    location: location.trim(),
    siteEngineer: siteEngineer ? siteEngineer.trim() : 'Engr. Kenneth Efe',
    contractor: contractor ? contractor.trim() : 'People and Co Construction Firm',
    startDate: startDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    estimatedCompletionDate: estimatedCompletionDate || 'To be scheduled',
    overallProgressPercent: typeof overallProgressPercent === 'number' ? overallProgressPercent : 15,
    currentPhase: currentPhase || 'Phase 1: Mobilization & Substructure',
    status: status || 'on_track',
    lastInspectionDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    siteHeroImage: siteHeroImage || '/images/service_building_construction_1792339538812.jpg',
    milestones: Array.isArray(milestones) && milestones.length > 0 ? milestones : defaultMilestones,
    recentSiteUpdates: initialUpdates,
  };

  trackersCache.unshift(newTracker);
  saveTrackers(trackersCache);

  console.log(`[PACCF TRACKER] Created project tracker: ${newTracker.trackingCode} (${newTracker.projectTitle})`);

  return res.status(201).json({
    success: true,
    message: 'Project tracker created successfully.',
    tracker: newTracker,
  });
});

// PATCH project tracker (Update progress, milestones, status, or site notes)
app.patch('/api/project-trackers/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    overallProgressPercent,
    currentPhase,
    status,
    lastInspectionDate,
    milestones,
    newSiteUpdateNote,
    siteEngineerAuthor,
  } = req.body;

  const tracker = trackersCache.find((t) => t.id === id || t.trackingCode === id);
  if (!tracker) {
    return res.status(404).json({ success: false, error: 'Project tracker not found.' });
  }

  if (typeof overallProgressPercent === 'number') {
    tracker.overallProgressPercent = Math.min(100, Math.max(0, overallProgressPercent));
    if (tracker.overallProgressPercent === 100) {
      tracker.status = 'completed';
    }
  }

  if (currentPhase && typeof currentPhase === 'string') {
    tracker.currentPhase = currentPhase.trim();
  }

  if (status && ['on_track', 'ahead_of_schedule', 'under_review', 'completed'].includes(status)) {
    tracker.status = status;
  }

  if (lastInspectionDate) {
    tracker.lastInspectionDate = lastInspectionDate;
  } else {
    tracker.lastInspectionDate = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  if (Array.isArray(milestones)) {
    tracker.milestones = milestones;
  }

  if (newSiteUpdateNote && typeof newSiteUpdateNote === 'string' && newSiteUpdateNote.trim()) {
    tracker.recentSiteUpdates.unshift({
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      note: newSiteUpdateNote.trim(),
      author: siteEngineerAuthor || tracker.siteEngineer || 'Site Engineer',
    });
  }

  saveTrackers(trackersCache);
  return res.json({ success: true, tracker });
});

// DELETE project tracker
app.delete('/api/project-trackers/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const initialLength = trackersCache.length;
  trackersCache = trackersCache.filter((t) => t.id !== id && t.trackingCode !== id);

  if (trackersCache.length === initialLength) {
    return res.status(404).json({ success: false, error: 'Project tracker not found.' });
  }

  saveTrackers(trackersCache);
  return res.json({ success: true, message: 'Project tracker deleted successfully.' });
});

// ==========================================
// AI SUITE ENDPOINTS
// ==========================================

// 1. Multi-Turn Gemini Chatbot with Search Grounding & Maps Grounding
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  try {
    const { messages, taskComplexity, toolMode, userLocation } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ success: false, error: 'Messages history is required.' });
    }

    // Model selection based on user prompt metadata:
    // - Complex tasks: gemini-4-argon (with fallback to gemini-3.8-flash)
    // - General tasks: gemini-3.8-flash
    // - Fast tasks: gemini-3.1-flash-lite
    let selectedModel = 'gemini-3.8-flash';
    if (taskComplexity === 'fast') {
      selectedModel = 'gemini-3.1-flash-lite';
    } else if (taskComplexity === 'complex') {
      selectedModel = 'gemini-4-argon';
    }

    // Build configuration
    const config: any = {
      systemInstruction:
        'You are the official Chief Engineering & Real Estate AI Consultant for PEOPLE AND CO CONSTRUCTION FIRM (PACCF), located at 50 along New Eku-Abraka Road, Eku, Ethiope East L.G.A, Delta State, Nigeria. ' +
        'PACCF specializes in Civil Engineering, Building Services, Structural Design, General Construction, Construction Project Management, Bill of Quantities (BOQ), Land Survey, and Land Agent / Property Acquisition in Delta State and nationwide. ' +
        'Contact: Official Email: paccf@gmail.com, Telephone/WhatsApp: +2348060371283. ' +
        'Provide authoritative, practical, and highly accurate engineering, construction budgeting (in Nigerian Naira ₦), and real estate advice. When citing materials or market conditions, be realistic. If Google Maps or Google Search sources are available, cite the relevant landmarks and links clearly.',
    };

    // Tools integration: Google Search or Google Maps grounding
    if (toolMode === 'maps') {
      selectedModel = 'gemini-3.8-flash'; // Maps grounding requires gemini-3.8-flash
      config.tools = [{ googleMaps: {} }];
      const lat = userLocation?.latitude || 5.7502; // Eku coordinates
      const lng = userLocation?.longitude || 6.0124;
      config.toolConfig = {
        retrievalConfig: {
          latLng: {
            latitude: lat,
            longitude: lng,
          },
        },
      };
    } else if (toolMode === 'search') {
      selectedModel = 'gemini-3.8-flash'; // Search grounding
      config.tools = [{ googleSearch: {} }];
    }

    // Format conversation history for @google/genai contents
    const contents = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    let response;
    try {
      response = await ai.models.generateContent({
        model: selectedModel,
        contents,
        config,
      });
    } catch (modelErr: any) {
      console.warn(`Model ${selectedModel} encountered error, attempting resilient fallback:`, modelErr?.message);
      
      // If tools (search or maps) hit quota limits, retry without tools on gemini-3.1-flash-lite
      if (config.tools) {
        delete config.tools;
        delete config.toolConfig;
      }
      
      selectedModel = 'gemini-3.1-flash-lite';
      response = await ai.models.generateContent({
        model: selectedModel,
        contents,
        config,
      });
    }

    const replyText = response.text || 'I could not generate a response. Please try rephrasing your question.';

    // Extract grounding sources if available
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const searchSources: Array<{ title: string; url: string }> = [];
    const mapSources: Array<{ title: string; url: string; address?: string }> = [];

    for (const chunk of groundingChunks) {
      if ((chunk as any).web?.uri) {
        searchSources.push({
          title: (chunk as any).web.title || (chunk as any).web.uri,
          url: (chunk as any).web.uri,
        });
      }
      if ((chunk as any).maps?.uri) {
        mapSources.push({
          title: (chunk as any).maps.title || 'View Location on Google Maps',
          url: (chunk as any).maps.uri,
          address: (chunk as any).maps.address,
        });
      }
    }

    return res.json({
      success: true,
      modelUsed: selectedModel,
      reply: replyText,
      searchSources: searchSources.slice(0, 5),
      mapSources: mapSources.slice(0, 5),
    });
  } catch (error: any) {
    console.error('Error in /api/ai/chat:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to process AI chat inquiry.',
    });
  }
});

// 2. Audio Transcription via gemini-3.5-transcribe
app.post('/api/ai/transcribe', async (req: Request, res: Response) => {
  try {
    const { audioBase64, mimeType } = req.body;

    if (!audioBase64) {
      return res.status(400).json({ success: false, error: 'Audio data is required.' });
    }

    const cleanBase64 = audioBase64.replace(/^data:[^;]+;base64,/, '');

    const audioPart = {
      inlineData: {
        mimeType: mimeType || 'audio/webm',
        data: cleanBase64,
      },
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-transcribe',
      contents: {
        parts: [
          audioPart,
          {
            text:
              'Transcribe this spoken audio accurately into clear, natural English prose. If the speaker mentions construction materials, dimensions, Nigerian currencies (Naira / ₦), or Delta State locations (Eku, Abraka, Warri, Asaba, Ethiope East), ensure terminology is faithfully transcribed.',
          },
        ],
      },
    });

    const transcribedText = response.text?.trim() || '';

    return res.json({
      success: true,
      text: transcribedText,
    });
  } catch (error: any) {
    console.error('Error in /api/ai/transcribe:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to transcribe audio.',
    });
  }
});

// 3. Architectural Concept Image Creation & Editing via gemini-nano-banana-2.1
app.post('/api/ai/generate-image', async (req: Request, res: Response) => {
  try {
    const { prompt, aspectRatio, imageBase64, mimeType } = req.body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 3) {
      return res.status(400).json({ success: false, error: 'A descriptive architectural prompt is required.' });
    }

    const parts: any[] = [];

    // If an existing image is provided, this is an image editing task
    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:[^;]+;base64,/, '');
      parts.push({
        inlineData: {
          data: cleanBase64,
          mimeType: mimeType || 'image/jpeg',
        },
      });
      parts.push({
        text: `Architectural renovation/edit instruction: ${prompt.trim()}. Retain structural realism and high professional quality.`,
      });
    } else {
      parts.push({
        text: `Photorealistic architectural visualization: ${prompt.trim()}. High-end engineering quality, crisp natural lighting, professional real estate photography.`,
      });
    }

    const validAspectRatios = ['1:1', '3:4', '4:3', '9:16', '16:9'];
    const chosenAspect = validAspectRatios.includes(aspectRatio) ? aspectRatio : '4:3';

    const response = await ai.models.generateContent({
      model: 'gemini-nano-banana-2.1',
      contents: { parts },
      config: {
        imageConfig: {
          aspectRatio: chosenAspect as any,
          imageSize: '1K',
        },
      },
    });

    let generatedImageUrl = '';

    const candidates = response.candidates?.[0]?.content?.parts || [];
    for (const part of candidates) {
      if (part.inlineData?.data) {
        generatedImageUrl = `data:image/png;base64,${part.inlineData.data}`;
        break;
      }
    }

    if (!generatedImageUrl) {
      return res.status(500).json({
        success: false,
        error: 'The image generation model did not return image data. Please try with a more specific architectural prompt.',
      });
    }

    return res.json({
      success: true,
      imageUrl: generatedImageUrl,
      prompt,
    });
  } catch (error: any) {
    console.error('Error in /api/ai/generate-image:', error);
    // Helpful guidance if paid model restriction applies
    const isPermissionError = error?.status === 403 || error?.status === 429 || error?.message?.includes('PERMISSION_DENIED');
    return res.status(500).json({
      success: false,
      error: isPermissionError
        ? 'High-resolution image generation requires a billing-enabled API key for gemini-nano-banana-2.1. You can configure your key in Settings > Secrets.'
        : (error?.message || 'Failed to generate architectural image.'),
    });
  }
});



// Vite middleware in dev or static files in production
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 People and Co Construction Firm server running at http://0.0.0.0:${PORT}`);
  });
}

if (process.env.VERCEL !== '1') {
  startServer();
}

export default app;
export { app };
