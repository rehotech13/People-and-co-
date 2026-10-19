export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  scope: string[];
  benefits: string[];
  image: string;
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'infrastructure' | 'structural' | 'survey_boq';
  categoryLabel: string;
  location: string;
  description: string;
  scope: string;
  completionTimeline: string;
  image: string;
  isDemonstration: boolean;
  specs?: { label: string; value: string }[];
}

export interface PropertyListing {
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
  createdAt?: string;
  contactPhone?: string;
}

export interface NewPropertyPayload {
  title: string;
  description: string;
  price: number | string;
  location: string;
  type: 'commercial' | 'residential' | 'land' | 'industrial';
  status: 'for_sale' | 'for_lease' | 'joint_venture';
  bedrooms?: number;
  bathrooms?: number;
  size: string;
  image: string;
  images?: string[];
  features: string[];
}

export interface EnquiryFormData {
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
  _hp?: string;
}

export interface EnquiryRecord extends EnquiryFormData {
  id: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'in_review' | 'quoted' | 'archived';
  notes?: string;
  recipientEmail: string;
}

export interface ProjectMilestone {
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

export interface ProjectTracker {
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
  milestones: ProjectMilestone[];
  recentSiteUpdates: Array<{
    date: string;
    note: string;
    author: string;
  }>;
}

