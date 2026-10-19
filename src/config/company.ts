import { ServiceItem, ProjectItem, PropertyListing } from '../types';

export const COMPANY_CONFIG = {
  name: 'PEOPLE AND CO CONSTRUCTION FIRM',
  shortName: 'PACCF',
  logoUrl: 'https://i.imgur.com/ujwkKdm.png',
  logoFallback: '/src/assets/images/company_logo.png',
  headline: 'Building the Future. Creating Lasting Value.',
  tagline:
    'PEOPLE AND CO CONSTRUCTION FIRM delivers property, construction, structural design, civil engineering, and project management services tailored to clients’ needs.',
  stats: {
    completedProjects: 150,
    completedProjectsDisplay: '150+ Successful Projects Completed',
    yearsExperience: 12,
    clientSatisfactionRate: '99%',
    activeSites: 18,
    coverage: 'Delta State & Nationwide Nigeria',
  },
  
  // Verified business contact details provided in prompt
  contact: {
    officialEmail: 'paccf@gmail.com',
    phone: '+2348060371283',
    phoneDisplay: '+234 806 037 1283',
    whatsapp: '2348060371283',
    address: '50 along New Eku-Abraka Road, Eku, Ethiope East L.G.A, Delta State',
    city: 'Eku',
    lga: 'Ethiope East L.G.A',
    state: 'Delta State',
    country: 'Nigeria',
    operatingHours: 'Monday – Saturday: 8:00 AM – 5:30 PM WAT',
    mapCoordinates: {
      lat: 5.7502,
      lng: 6.0124,
      query: 'Eku, Ethiope East, Delta State, Nigeria'
    }
  },

  // Web3Forms Form Integration Key
  web3forms: {
    accessKey: 'f2e531ab-60a7-4b3e-96ad-aa2f64be78fb',
    endpoint: 'https://api.web3forms.com/submit',
  },

  // Brand Palette guidelines
  brandColors: {
    primaryDeepBlue: '#0B2545', // Deep corporate blue
    secondaryWhite: '#FFFFFF',  // Clean secondary white
    accentCyan: '#00B4D8',      // Bright cyan / turquoise
    highlightGold: '#F59E0B',   // Yellow / gold highlight
    darkCharcoal: '#0F172A',
    lightGreyBg: '#F8FAFC'
  },

  // Mission & Core Values
  about: {
    mission:
      'To provide resilient civil engineering, structural design, building construction, and project management solutions with unwavering integrity, technical precision, and enduring client value across Delta State and Nigeria.',
    vision:
      'To be the foremost trusted partner in sustainable built-environment delivery, turning architectural and infrastructure ambitions into high-performing physical reality.',
    coreValues: [
      {
        title: 'Commitment to Quality',
        desc: 'Rigorous structural calculations, standard-grade materials, and precise workmanship on every project.'
      },
      {
        title: 'Safety First',
        desc: 'Uncompromising adherence to occupational safety standards, environmental protocols, and hazard mitigation.'
      },
      {
        title: 'Professionalism & Ethics',
        desc: 'Transparent engineering practices, certified methods, and punctual milestone delivery.'
      },
      {
        title: 'Transparency & Accountability',
        desc: 'Open communication, honest Bill of Quantities (BOQ), and real-time client project reporting.'
      },
      {
        title: 'Customer Satisfaction',
        desc: 'Tailored solutions addressing client timelines, budgetary boundaries, and long-term functional requirements.'
      }
    ]
  }
};

export const COMPANY_SERVICES: ServiceItem[] = [
  {
    id: 'civil-engineering',
    title: 'Civil Engineering',
    shortDesc: 'Comprehensive civil infrastructure, site earthworks, road networks, and drainage systems.',
    fullDesc:
      'Our civil engineering division provides robust infrastructure support, precision site preparation, highway and feeder road construction, stormwater drainage systems, and soil stabilization tailored for the Niger Delta terrain and national specifications.',
    scope: [
      'Highway and access road grading & paving',
      'Reinforced concrete drainage culverts & channels',
      'Site earthworks, land reclamation & leveling',
      'Erosion control and geotechnical stabilization'
    ],
    benefits: [
      'Tailored solutions for local terrain & rainfall conditions',
      'Heavy machinery deployment and expert civil surveying',
      'Adherence to federal and state ministry infrastructure standards'
    ],
    image: '/src/assets/images/service_civil_engineering_1792339538398.jpg',
    iconName: 'Compass'
  },
  {
    id: 'building-services',
    title: 'Building Services',
    shortDesc: 'End-to-end building construction, modern installations, and property development works.',
    fullDesc:
      'PEOPLE AND CO CONSTRUCTION FIRM manages complete building services, ranging from foundation masonry and structural framing to interior MEP (Mechanical, Electrical, and Plumbing) installations and premium architectural finishes.',
    scope: [
      'Residential duplexes, flats, and private estate developments',
      'Commercial plazas, shopping arcades, and corporate facilities',
      'Building refurbishment, structural renovation & expansion',
      'Integrated electrical, plumbing & roofing services'
    ],
    benefits: [
      'Single-source accountability from footing to handover',
      'Skilled artisans and qualified site supervisors',
      'High-grade blockwork, concrete mix design, and finishing'
    ],
    image: '/src/assets/images/service_building_construction_1792339538812.jpg',
    iconName: 'Building2'
  },
  {
    id: 'structural-design',
    title: 'Structural Design',
    shortDesc: 'Precision structural analysis, building blueprints, load calculations, and engineering vetting.',
    fullDesc:
      'Before a single block is laid, our structural engineers model, simulate, and certify load-bearing structures. We provide complete structural calculation sheets, foundation design, and reinforcement detailing complying with structural building codes.',
    scope: [
      'Reinforced concrete and structural steel framework design',
      'Raft, pile, and strip foundation engineering for various soil types',
      'Structural integrity assessments and building audits',
      'Approval-ready structural drawing sets and calculation booklets'
    ],
    benefits: [
      'Prevents structural failure and expensive future remedial works',
      'Optimizes steel rebar and concrete ratios to curb wastage',
      'Smooth municipal approval and statutory permits processing'
    ],
    image: '/src/assets/images/service_structural_design_1792339538521.jpg',
    iconName: 'Ruler'
  },
  {
    id: 'construction',
    title: 'General Construction',
    shortDesc: 'Turnkey residential, commercial, and institutional construction with rigorous quality control.',
    fullDesc:
      'We execute modern construction contracts with methodical site coordination, reliable supply chain management, and strict adherence to architectural blueprints and structural specifications.',
    scope: [
      'Turnkey residential housing schemes and private villas',
      'Commercial office buildings, warehouses, and industrial sheds',
      'Public institution facilities and community infrastructure',
      'Site fencing, security gatehouses, and compound interlock paving'
    ],
    benefits: [
      'Strict quality gate inspections at each milestone',
      'Direct material sourcing reducing client procurement overheads',
      'Timely completion within agreed contractual schedules'
    ],
    image: '/src/assets/images/hero_construction_modern_1792339537125.jpg',
    iconName: 'HardHat'
  },
  {
    id: 'project-management',
    title: 'Construction Project Management',
    shortDesc: 'Proactive planning, coordination, supervision, progress monitoring, and cost control.',
    fullDesc:
      'Our construction project management team acts as the client’s vigilant technical representative. We manage budgets, supervise subcontractors, monitor construction schedules, inspect materials, and ensure complete transparency throughout the project lifecycle.',
    scope: [
      'Comprehensive project planning, Gantt schedules, and milestones',
      'On-site technical supervision and quality audit reports',
      'Cost engineering, contractor invoice certification & disbursement control',
      'Risk assessment, health & safety enforcement, and site handover'
    ],
    benefits: [
      'Protects clients from budget inflation and contractor defaults',
      'Bi-weekly progress documentation with photographic logs',
      'Seamless coordination between architects, engineers, and artisans'
    ],
    image: '/src/assets/images/project_commercial_plaza_1792339539199.jpg',
    iconName: 'ClipboardCheck'
  },
  {
    id: 'bill-of-quantity',
    title: 'Bill of Quantity (BOQ)',
    shortDesc: 'Detailed material take-offs, cost estimation, rate analysis, and tender documentation.',
    fullDesc:
      'Accurate financial planning is essential to prevent abandoned projects. We prepare comprehensive Bills of Quantities itemizing labor, concrete, steel, finishes, and logistics with current market rate benchmarking.',
    scope: [
      'Detailed measurement of civil and architectural drawings',
      'Pre-tender estimates and material schedule schedules',
      'Tender document preparation and contractor quote evaluation',
      'Valuation of work done for stage payments'
    ],
    benefits: [
      'Transparent budgeting with zero hidden financial surprises',
      'Protects property developers from supplier inflation markup',
      'Essential for bank loan financing and formal investor reporting'
    ],
    image: '/src/assets/images/service_structural_design_1792339538521.jpg',
    iconName: 'Calculator'
  },
  {
    id: 'land-agent',
    title: 'Land Agent & Property Acquisition',
    shortDesc: 'Secure property sourcing, title search assistance, and land transaction brokerage.',
    fullDesc:
      'Navigating property acquisition requires local expertise and due diligence. We assist prospective buyers, diaspora investors, and commercial developers in sourcing verified parcels and managing title investigations across Delta State.',
    scope: [
      'Prime residential and commercial land sourcing in Delta State',
      'Preliminary title search, boundary checks, and survey verification',
      'Coordination with registered legal practitioners for Deeds of Conveyance',
      'Diaspora investor representation and verification service'
    ],
    benefits: [
      'Guards against fraudulent land sales and communal disputes',
      'Direct access to vetted plots along prime commercial corridors',
      'Honest advisory on location growth potential and zoning'
    ],
    image: '/src/assets/images/project_commercial_plaza_1792339539199.jpg',
    iconName: 'MapPin'
  },
  {
    id: 'land-survey',
    title: 'Land Survey',
    shortDesc: 'Boundary perimeter surveying, topographical mapping, and survey plan coordination.',
    fullDesc:
      'Accurate land surveying provides the legal foundation for every property investment. We coordinate precision boundary surveys, contour maps for civil drainage, and statutory registered survey plans.',
    scope: [
      'Perimeter boundary surveying and beacon placement',
      'Topographical surveys for drainage and architectural layout planning',
      'Layout partitioning and subdivision design',
      'Coordination for cadastral survey lodgement'
    ],
    benefits: [
      'Establishes exact boundary coordinates preventing neighbor disputes',
      'Essential data for architectural foundation and grading designs',
      'Pivotal prerequisite for Certificate of Occupancy (C of O) processing'
    ],
    image: '/src/assets/images/service_civil_engineering_1792339538398.jpg',
    iconName: 'Compass'
  }
];

// Demonstration Projects (as required by prompt: clearly labeled as demonstrations until real company projects are supplied)
export const DEMONSTRATION_PROJECTS: ProjectItem[] = [
  {
    id: 'demo-proj-01',
    title: 'Demonstration: Modern Mixed-Use Commercial Arcade',
    category: 'commercial',
    categoryLabel: 'Commercial Buildings',
    location: 'Delta State Corridor (Demonstration)',
    description:
      'Conceptual multi-level commercial facility featuring contemporary glass curtain wall, reinforced concrete columns, and ample parking plaza.',
    scope: 'Architectural coordination, structural design, civil drainage, and project management framework.',
    completionTimeline: 'Demonstration Concept',
    image: '/src/assets/images/project_commercial_plaza_1792339539199.jpg',
    isDemonstration: true,
    specs: [
      { label: 'Building Type', value: 'Commercial Arcade & Offices' },
      { label: 'Floors', value: '4 Levels + Mezzanine' },
      { label: 'Scope', value: 'Structural Design & Management' }
    ]
  },
  {
    id: 'demo-proj-02',
    title: 'Demonstration: Regional Drainage Culvert & Access Road',
    category: 'infrastructure',
    categoryLabel: 'Civil & Infrastructure',
    location: 'Ethiope East LGA (Demonstration)',
    description:
      'Engineering model for heavy-duty reinforced concrete box culvert and stabilized earthwork grading for flood-resilient regional access.',
    scope: 'Hydraulic drainage calculations, excavation, rebar reinforcement, and structural concrete pouring.',
    completionTimeline: 'Demonstration Concept',
    image: '/src/assets/images/service_civil_engineering_1792339538398.jpg',
    isDemonstration: true,
    specs: [
      { label: 'Infrastructure Type', value: 'Box Culvert & Access Road' },
      { label: 'Standard', value: 'Federal Highway Spec' },
      { label: 'Material', value: 'C30 High-Strength Concrete' }
    ]
  },
  {
    id: 'demo-proj-03',
    title: 'Demonstration: Contemporary Multi-Family Residential Block',
    category: 'residential',
    categoryLabel: 'Residential Buildings',
    location: 'Eku-Abraka Axis (Demonstration)',
    description:
      'Framed residential duplex and apartment block under methodical construction supervision with precision masonry and quality lintel beams.',
    scope: 'Sub-structure raft foundation, super-structure framing, block laying, and electrical/plumbing rough-in.',
    completionTimeline: 'Demonstration Concept',
    image: '/src/assets/images/service_building_construction_1792339538812.jpg',
    isDemonstration: true,
    specs: [
      { label: 'Unit Count', value: '6 Luxury Apartment Units' },
      { label: 'Structure', value: 'Reinforced Concrete Framework' },
      { label: 'Status', value: 'Demonstration Showcase' }
    ]
  },
  {
    id: 'demo-proj-04',
    title: 'Demonstration: High-Rise Structural Calculation & Steel Blueprint',
    category: 'structural',
    categoryLabel: 'Structural & Engineering',
    location: 'Design Studio (Demonstration)',
    description:
      'Comprehensive 3D finite-element structural simulation for high-rise steel and concrete columns, seismic checks, and detailed rebar schedules.',
    scope: 'Structural design review, load distribution modeling, BOQ preparation, and council permit documentation.',
    completionTimeline: 'Demonstration Concept',
    image: '/src/assets/images/service_structural_design_1792339538521.jpg',
    isDemonstration: true,
    specs: [
      { label: 'Analysis Tool', value: 'FEA 3D Structural Modeling' },
      { label: 'Code', value: 'Eurocode 2 & BS 8110' },
      { label: 'Deliverable', value: 'Certified Vetted Blueprints' }
    ]
  }
];

// Demonstration Property Listings (as requested in Section 5)
export const DEMONSTRATION_PROPERTIES: PropertyListing[] = [
  {
    id: 'prop-demo-01',
    title: 'Prime Commercial Plot along New Eku-Abraka Expressway',
    type: 'land',
    typeLabel: 'Commercial Land',
    status: 'for_sale',
    statusLabel: 'Available for Purchase',
    location: 'Along New Eku-Abraka Road, Eku, Ethiope East LGA, Delta State',
    price: '₦28,000,000',
    priceRaw: 28000000,
    size: '1,200 sq. meters (approx. 2 Standard Plots)',
    description:
      'High-visibility commercial frontage suitable for shopping complexes, corporate branch offices, fuel stations, or warehousing. Directly accessible along the paved highway with verified layout beacons.',
    image: '/src/assets/images/project_commercial_plaza_1792339539199.jpg',
    features: [
      'Direct Highway Frontage',
      'Dry & Level Ground',
      'Survey Plan Ready',
      'Free from Legal Encumbrance',
      'Fast-Growing Commercial Zone'
    ],
    isDemonstration: true
  },
  {
    id: 'prop-demo-02',
    title: 'Proposed Modern 4-Bedroom Detached Villa Development',
    type: 'residential',
    typeLabel: 'Residential Villa',
    status: 'for_sale',
    statusLabel: 'Off-Plan / Construction Turnkey',
    location: 'Residential Estate Corridor, Abraka Axis, Delta State',
    price: '₦65,000,000',
    priceRaw: 65000000,
    bedrooms: 4,
    bathrooms: 5,
    size: '650 sq. meters building footprint',
    description:
      'Contemporary all-en-suite 4-bedroom detached architectural villa designed for diaspora and executive clients. Features modern parapet roofing, private ante-room, spacious master suite, and perimeter security fencing.',
    image: '/src/assets/images/service_building_construction_1792339538812.jpg',
    features: [
      'All En-Suite Bedrooms',
      'Spacious Kitchen & Pantry',
      'Reinforced Raft Foundation',
      'Interlocked Compound & Borehole',
      'Pre-installed Inverter Conduit'
    ],
    isDemonstration: true
  },
  {
    id: 'prop-demo-03',
    title: 'Multi-Tenant Commercial Office Suites & Retail Space',
    type: 'commercial',
    typeLabel: 'Commercial Property',
    status: 'for_lease',
    statusLabel: 'Available for Long-Term Lease',
    location: 'Eku Central Business Strip, Delta State',
    price: '₦2,500,000 / year',
    priceRaw: 2500000,
    size: '180 sq. meters usable floor space',
    description:
      'Well-ventilated ground and first-floor commercial units suitable for financial institutions, diagnostic clinics, legal chambers, or logistics hubs. Dedicated power transformer and ample customer parking.',
    image: '/src/assets/images/hero_construction_modern_1792339537125.jpg',
    features: [
      'Dedicated Customer Parking',
      '24/7 Security Post',
      'High-speed Fiber Backbone Conduit',
      'Constant Water Supply',
      'Direct Road Access'
    ],
    isDemonstration: true
  }
];
