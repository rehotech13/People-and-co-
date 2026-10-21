import React, { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  HardHat,
  MapPin,
  Calendar,
  User,
  ShieldCheck,
  Plus,
  Edit3,
  TrendingUp,
  Activity,
  ArrowRight,
  RefreshCw,
  X,
  FileCheck2,
  Award,
  ChevronRight,
  ExternalLink,
  Phone,
  MessageSquare
} from 'lucide-react';
import { ProjectTracker, ProjectMilestone } from '../types';
import { COMPANY_CONFIG } from '../config/company';

const INITIAL_LIVE_TRACKERS: ProjectTracker[] = [
  {
    id: 'trk-001',
    trackingCode: 'PACCF-PRJ-2026-001',
    clientName: 'Chief & Mrs. Ovie',
    projectTitle: 'Executive 5-Bedroom Smart Villa with Penthouse',
    projectType: 'Turnkey Residential Construction',
    location: 'Along New Eku-Abraka Expressway, Delta State',
    siteEngineer: 'Engr. Justice Akpochimora (Principal Lead Structural Engineer)',
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
        engineerNotes: 'Soil bearing capacity certified at 180 kN/m². Optimal for reinforced raft foundation.',
        verificationBadge: 'Site Soil Certificate Approved',
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
        verificationBadge: 'Foundation Inspection Passed',
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
        verificationBadge: 'DPC Structural Gate Passed',
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
        verificationBadge: 'Decking Structural Approval',
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
      },
    ],
    recentSiteUpdates: [
      {
        date: '16 Apr 2026',
        note: 'Penthouse block work passed elevation level 2.8m. Ring beam rebar fabrication ongoing with high-yield 16mm rods.',
        author: 'Engr. Justice Akpochimora',
      },
      {
        date: '04 Apr 2026',
        note: 'First-floor concrete pour completed seamlessly. 14-day ponding curing initiated with dedicated site water pumps.',
        author: 'Site Supervisor Johnson',
      },
    ],
  },
  {
    id: 'trk-002',
    trackingCode: 'PACCF-PRJ-2026-002',
    clientName: 'Delta Commercial Holdings Ltd',
    projectTitle: 'Advocate Commercial Shopping Plaza (4-Stories)',
    projectType: 'Commercial Building & Civil Infrastructure',
    location: 'Eku Central Business Strip, Ethiope East LGA',
    siteEngineer: 'Arc. Mudiaga Ogwa / Project Lead',
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
        verificationBadge: 'Geotechnical Cert Validated',
      },
      {
        id: 'm-202',
        phaseNumber: 2,
        title: 'Multi-Floor Column Casting & Suspended Slabs (Floors 1-4)',
        description: 'Heavy commercial framing and high-load decking.',
        targetDate: '15 Jan 2026',
        completedDate: '08 Jan 2026',
        status: 'completed',
        verificationBadge: 'Multi-Story Frame Passed',
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
      },
    ],
    recentSiteUpdates: [
      {
        date: '15 Apr 2026',
        note: 'Curtain wall reflective glass installed on levels 1 to 3. Interior electrical wiring 90% completed.',
        author: 'Arc. Mudiaga Ogwa',
      },
      {
        date: '28 Mar 2026',
        note: 'Exterior perimeter drainage connection to municipal canal completed and pressure tested.',
        author: 'Arc. Mudiaga Ogwa',
      },
    ],
  },
  {
    id: 'trk-003',
    trackingCode: 'PACCF-PRJ-2026-003',
    clientName: 'Ethiope East Regional Works Committee',
    projectTitle: 'Reinforced Concrete Dual Box Culvert & Flood Relief Channel',
    projectType: 'Civil Infrastructure Engineering',
    location: 'Ethiope East LGA Feeder Road Corridor',
    siteEngineer: 'QS Oghenekaro Daniel / Resident Project Manager',
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
        verificationBadge: 'Hydraulic Spec Approved',
      },
      {
        id: 'm-302',
        phaseNumber: 2,
        title: 'Lean Concrete Blinding & Invert Slab Concrete Casting',
        description: 'Hardcore filling, 75mm blinding, 20mm rebar mat placement, and 300mm invert slab pour.',
        targetDate: '28 Mar 2026',
        completedDate: '26 Mar 2026',
        status: 'completed',
        verificationBadge: 'Foundation Sump Certified',
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
      },
    ],
    recentSiteUpdates: [
      {
        date: '14 Apr 2026',
        note: 'Wing wall formwork erect. Reinforcement verified according to Federal Highway Bridge specifications.',
        author: 'QS Oghenekaro Daniel',
      },
    ],
  },
];

interface ProjectStatusTrackerProps {
  onContactProjectSupervisor?: (projectTitle: string, trackingCode: string) => void;
}

export const ProjectStatusTracker: React.FC<ProjectStatusTrackerProps> = ({
  onContactProjectSupervisor,
}) => {
  const [trackers, setTrackers] = useState<ProjectTracker[]>(INITIAL_LIVE_TRACKERS);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrackerId, setSelectedTrackerId] = useState<string>('trk-001');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  // Staff Milestone Management Mode
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isAddingMilestone, setIsAddingMilestone] = useState(false);
  const [isPostingSiteUpdate, setIsPostingSiteUpdate] = useState(false);
  const [staffSaving, setStaffSaving] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form states for adding milestone
  const [newMilestone, setNewMilestone] = useState<{
    phaseNumber: number;
    title: string;
    description: string;
    targetDate: string;
    status: 'pending' | 'in_progress' | 'completed';
    engineerNotes: string;
    verificationBadge: string;
  }>({
    phaseNumber: 1,
    title: '',
    description: '',
    targetDate: '',
    status: 'in_progress',
    engineerNotes: '',
    verificationBadge: '',
  });

  // Form states for new site update
  const [newSiteNote, setNewSiteNote] = useState({
    note: '',
    author: 'Engr. Kenneth Efe (Lead Structural Specialist)',
  });

  // Form states for updating project metrics
  const [editMetrics, setEditMetrics] = useState({
    overallProgressPercent: 0,
    currentPhase: '',
    status: 'on_track' as 'on_track' | 'ahead_of_schedule' | 'under_review' | 'completed',
    lastInspectionDate: '',
  });

  // Form states for creating a whole new project
  const [newProjectForm, setNewProjectForm] = useState({
    clientName: '',
    projectTitle: '',
    projectType: 'Turnkey Residential Construction',
    location: '',
    siteEngineer: 'Engr. Kenneth Efe',
    contractor: 'People and Co Construction Firm',
    startDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    estimatedCompletionDate: '',
    overallProgressPercent: 15,
    currentPhase: 'Phase 1: Site Survey & Foundation Excavation',
    status: 'on_track' as 'on_track' | 'ahead_of_schedule' | 'under_review' | 'completed',
    initialNote: 'Project initialized on client tracking portal. Site clearing and soil survey underway.',
  });

  // Fetch trackers from API
  const fetchTrackers = async (keepSelectedId?: string) => {
    try {
      const res = await fetch('/api/project-trackers');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.trackers) && data.trackers.length > 0) {
          setTrackers(data.trackers);
          const nextSelected = keepSelectedId && data.trackers.some((t: ProjectTracker) => t.id === keepSelectedId)
            ? keepSelectedId
            : (data.trackers.find((t: ProjectTracker) => t.trackingCode === 'PACCF-PRJ-2026-001')?.id || data.trackers[0].id);
          setSelectedTrackerId(nextSelected);
        }
      }
    } catch (err) {
      console.error('Failed to load project trackers:', err);
    }
  };

  useEffect(() => {
    fetchTrackers();
  }, []);

  const currentTracker = trackers.find((t) => t.id === selectedTrackerId) || trackers[0];

  // Sync edit metrics when current tracker changes
  useEffect(() => {
    if (currentTracker) {
      setEditMetrics({
        overallProgressPercent: currentTracker.overallProgressPercent,
        currentPhase: currentTracker.currentPhase,
        status: currentTracker.status,
        lastInspectionDate: currentTracker.lastInspectionDate,
      });
      setNewMilestone((prev) => ({
        ...prev,
        phaseNumber: (currentTracker.milestones?.length || 0) + 1,
      }));
    }
  }, [currentTracker?.id]);

  // Handle Quick Milestone Status Toggle by Staff
  const handleToggleMilestoneStatus = async (milestoneId: string, currentStatus: string) => {
    if (!currentTracker) return;
    const nextStatus = currentStatus === 'completed' ? 'pending' : currentStatus === 'pending' ? 'in_progress' : 'completed';
    const updatedMilestones = currentTracker.milestones.map((m) => {
      if (m.id === milestoneId) {
        return {
          ...m,
          status: nextStatus as any,
          completedDate: nextStatus === 'completed'
            ? new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
            : undefined,
        };
      }
      return m;
    });

    // Calculate recommended overall progress based on completed milestones
    const completedCount = updatedMilestones.filter((m) => m.status === 'completed').length;
    const recommendedPercent = Math.round((completedCount / updatedMilestones.length) * 100);

    try {
      setStaffSaving(true);
      const res = await fetch(`/api/project-trackers/${currentTracker.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          milestones: updatedMilestones,
          overallProgressPercent: recommendedPercent,
          lastInspectionDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        }),
      });

      if (res.ok) {
        await fetchTrackers(currentTracker.id);
        setFeedbackMsg({ type: 'success', text: `Milestone status updated to "${nextStatus}".` });
      }
    } catch {
      setFeedbackMsg({ type: 'error', text: 'Failed to update milestone.' });
    } finally {
      setStaffSaving(false);
      setTimeout(() => setFeedbackMsg(null), 3000);
    }
  };

  // Handle Staff Submitting Milestone
  const handleAddMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTracker || !newMilestone.title.trim()) return;

    const newMilestoneItem: ProjectMilestone = {
      id: `m-${Date.now().toString(36)}`,
      phaseNumber: Number(newMilestone.phaseNumber) || (currentTracker.milestones.length + 1),
      title: newMilestone.title.trim(),
      description: newMilestone.description.trim(),
      targetDate: newMilestone.targetDate.trim() || 'Scheduled',
      status: newMilestone.status,
      completedDate: newMilestone.status === 'completed'
        ? new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        : undefined,
      engineerNotes: newMilestone.engineerNotes.trim() || undefined,
      verificationBadge: newMilestone.verificationBadge.trim() || undefined,
    };

    const updatedMilestones = [...currentTracker.milestones, newMilestoneItem].sort(
      (a, b) => a.phaseNumber - b.phaseNumber
    );

    try {
      setStaffSaving(true);
      const res = await fetch(`/api/project-trackers/${currentTracker.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          milestones: updatedMilestones,
          lastInspectionDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        }),
      });

      if (res.ok) {
        await fetchTrackers(currentTracker.id);
        setIsAddingMilestone(false);
        setNewMilestone({
          phaseNumber: updatedMilestones.length + 1,
          title: '',
          description: '',
          targetDate: '',
          status: 'in_progress',
          engineerNotes: '',
          verificationBadge: '',
        });
        setFeedbackMsg({ type: 'success', text: 'New construction milestone recorded successfully.' });
      }
    } catch {
      setFeedbackMsg({ type: 'error', text: 'Failed to add milestone.' });
    } finally {
      setStaffSaving(false);
      setTimeout(() => setFeedbackMsg(null), 3500);
    }
  };

  // Handle Staff Posting Site Update
  const handlePostSiteUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTracker || !newSiteNote.note.trim()) return;

    try {
      setStaffSaving(true);
      const res = await fetch(`/api/project-trackers/${currentTracker.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newSiteUpdateNote: newSiteNote.note.trim(),
          siteEngineerAuthor: newSiteNote.author.trim(),
          lastInspectionDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        }),
      });

      if (res.ok) {
        await fetchTrackers(currentTracker.id);
        setIsPostingSiteUpdate(false);
        setNewSiteNote((prev) => ({ ...prev, note: '' }));
        setFeedbackMsg({ type: 'success', text: 'Site inspection note posted to client feed.' });
      }
    } catch {
      setFeedbackMsg({ type: 'error', text: 'Failed to post site update.' });
    } finally {
      setStaffSaving(false);
      setTimeout(() => setFeedbackMsg(null), 3500);
    }
  };

  // Handle Staff Updating Overall Progress & Phase
  const handleUpdateProjectMetrics = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTracker) return;

    try {
      setStaffSaving(true);
      const res = await fetch(`/api/project-trackers/${currentTracker.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          overallProgressPercent: Number(editMetrics.overallProgressPercent),
          currentPhase: editMetrics.currentPhase.trim(),
          status: editMetrics.status,
          lastInspectionDate: editMetrics.lastInspectionDate.trim() || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        }),
      });

      if (res.ok) {
        await fetchTrackers(currentTracker.id);
        setFeedbackMsg({ type: 'success', text: 'Project metrics & progress updated.' });
      }
    } catch {
      setFeedbackMsg({ type: 'error', text: 'Failed to update project metrics.' });
    } finally {
      setStaffSaving(false);
      setTimeout(() => setFeedbackMsg(null), 3500);
    }
  };

  // Handle Staff Creating a New Tracked Project
  const handleCreateNewProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectForm.clientName || !newProjectForm.projectTitle || !newProjectForm.location) {
      setFeedbackMsg({ type: 'error', text: 'Please fill in client name, project title, and location.' });
      return;
    }

    try {
      setStaffSaving(true);
      const res = await fetch('/api/project-trackers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProjectForm),
      });

      if (res.ok) {
        const data = await res.json();
        await fetchTrackers(data.tracker?.id);
        setIsNewProjectModalOpen(false);
        setNewProjectForm({
          clientName: '',
          projectTitle: '',
          projectType: 'Turnkey Residential Construction',
          location: '',
          siteEngineer: 'Engr. Kenneth Efe',
          contractor: 'People and Co Construction Firm',
          startDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          estimatedCompletionDate: '',
          overallProgressPercent: 15,
          currentPhase: 'Phase 1: Site Survey & Foundation Excavation',
          status: 'on_track',
          initialNote: 'Project initialized on client tracking portal. Site clearing and soil survey underway.',
        });
        setFeedbackMsg({ type: 'success', text: `Project created! Tracking Code: ${data.tracker?.trackingCode}` });
      }
    } catch {
      setFeedbackMsg({ type: 'error', text: 'Failed to create new tracked project.' });
    } finally {
      setStaffSaving(false);
      setTimeout(() => setFeedbackMsg(null), 4000);
    }
  };

  // Filtered list of trackers for quick lookup
  const filteredTrackers = trackers.filter((t) => {
    const matchesSearch =
      searchQuery === '' ||
      t.trackingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ahead_of_schedule':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            Ahead of Schedule
          </span>
        );
      case 'on_track':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            On Track
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
            Commissioned & Handed Over
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            Under Technical Review
          </span>
        );
    }
  };

  return (
    <section id="trackers" className="py-20 bg-slate-50 relative border-t border-slate-200">
      {/* Background architectural grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0B2545_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0B2545]/10 text-[#0B2545] text-xs font-bold tracking-wider uppercase mb-3">
              <Activity className="w-3.5 h-3.5 text-[#00B4D8]" />
              Client Construction Portal
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight font-['Plus_Jakarta_Sans']">
              Live Project Status & Milestone Tracker
            </h2>
            <p className="mt-2 text-slate-600 max-w-2xl text-sm sm:text-base leading-relaxed">
              Transparent, milestone-by-milestone structural engineering tracking for project owners, diaspora clients, and commercial stakeholders. Real-time site inspections, certified concrete tests, and phase sign-offs.
            </p>
          </div>

          {/* Action Buttons: Staff Milestone Input Portal */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsStaffModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0B2545] hover:bg-[#07172B] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
            >
              <HardHat className="w-4 h-4 text-[#F59E0B]" />
              <span>Staff Milestone Manager</span>
            </button>
            <button
              onClick={() => fetchTrackers(currentTracker?.id)}
              className="p-2.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-[#0B2545] transition-colors shadow-sm"
              title="Refresh tracking data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#00B4D8]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Global Feedback Alert */}
        {feedbackMsg && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-center justify-between text-sm font-medium ${
              feedbackMsg.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {feedbackMsg.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600" />
              )}
              <span>{feedbackMsg.text}</span>
            </div>
            <button
              onClick={() => setFeedbackMsg(null)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Interactive Search & Project Selector Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Project Tracking Code (e.g., PACCF-PRJ-2026-001) or Client Name..."
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent bg-slate-50/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Status Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
              <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Filter Status:</span>
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'on_track', label: 'On Track' },
                { id: 'ahead_of_schedule', label: 'Ahead' },
                { id: 'completed', label: 'Completed' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterStatus(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                    filterStatus === tab.id
                      ? 'bg-[#0B2545] text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Select Buttons of Active Projects */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Active Tracked Projects:</span>
            {trackers.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setSelectedTrackerId(t.id);
                  setSearchQuery('');
                }}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                  selectedTrackerId === t.id
                    ? 'bg-[#00B4D8]/15 border-[#00B4D8] text-[#0B2545] ring-2 ring-[#00B4D8]/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <span className="font-mono text-[#00B4D8] font-bold mr-1.5">{t.trackingCode}</span>
                <span className="hidden sm:inline text-slate-600 truncate max-w-[160px]">{t.projectTitle}</span>
                <span className="ml-1.5 px-1.5 py-0.5 rounded bg-slate-100 text-[10px] text-slate-600 font-mono">
                  {t.overallProgressPercent}%
                </span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <RefreshCw className="w-8 h-8 text-[#00B4D8] animate-spin mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-600">Retrieving certified structural milestones...</p>
          </div>
        ) : !currentTracker ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#0B2545]">No Project Found</h3>
            <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
              No project matched your search query "{searchQuery}". Check the tracking code on your PACCF contract documents.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterStatus('all');
              }}
              className="mt-4 px-4 py-2 bg-[#0B2545] text-white text-xs font-bold rounded-lg"
            >
              Reset Search Filter
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Top Project Dashboard Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left 8 Cols: Details, Badges & Overall Progress */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-[#0B2545] text-white">
                      {currentTracker.trackingCode}
                    </span>
                    {getStatusBadge(currentTracker.status)}
                    <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
                      {currentTracker.projectType}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight font-['Plus_Jakarta_Sans']">
                      {currentTracker.projectTitle}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <User className="w-4 h-4 text-[#00B4D8]" />
                        <span>Client: <strong className="text-slate-800">{currentTracker.clientName}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#F59E0B]" />
                        <span>{currentTracker.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <HardHat className="w-4 h-4 text-[#0B2545]" />
                        <span>Lead Engineer: <strong className="text-slate-800">{currentTracker.siteEngineer}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Gauge */}
                  <div className="space-y-2 bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-bold text-[#0B2545] flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-[#00B4D8]" />
                        Current Milestone Phase:
                      </span>
                      <span className="font-mono font-extrabold text-base sm:text-lg text-[#0B2545]">
                        {currentTracker.overallProgressPercent}% Complete
                      </span>
                    </div>

                    {/* Multi-step progress bar */}
                    <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden relative">
                      <div
                        className="bg-gradient-to-r from-[#0B2545] via-[#00B4D8] to-emerald-500 h-full rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${currentTracker.overallProgressPercent}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 pt-1">
                      <span className="font-medium text-slate-700">
                        {currentTracker.currentPhase}
                      </span>
                      <span>
                        Last Inspection: <strong>{currentTracker.lastInspectionDate}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Dates Row & Verification Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[11px] text-slate-500 block">Groundbreaking</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-800">{currentTracker.startDate}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[11px] text-slate-500 block">Target Handover</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-800">{currentTracker.estimatedCompletionDate}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[11px] text-slate-500 block">Executing Firm</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-800 truncate block">PACCF Firm</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[11px] text-slate-500 block">Quality Assurance</span>
                      <span className="text-xs sm:text-sm font-bold text-emerald-700 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Certified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right 4 Cols: Quick Actions & Live Site Photo Card */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                  {currentTracker.siteHeroImage && (
                    <div className="relative rounded-xl overflow-hidden aspect-video lg:aspect-[4/3] border border-slate-200 shadow-inner group">
                      <img
                        src={currentTracker.siteHeroImage}
                        alt={currentTracker.projectTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src.includes('/src/assets/images/')) {
                            target.src = target.src.replace('/src/assets/images/', '/images/');
                          } else if (!target.src.includes('unsplash.com')) {
                            target.src = 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80';
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                        <span className="text-white text-xs font-semibold flex items-center gap-1.5">
                          <HardHat className="w-3.5 h-3.5 text-[#F59E0B]" />
                          Active PACCF Worksite
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Contact Supervisor Card */}
                  <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#0B2545]">
                      <Phone className="w-4 h-4 text-[#00B4D8]" />
                      <span>Direct Works Supervisor Hotline</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Have questions regarding ongoing milestones or need to schedule a site walk-through?
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => {
                          if (onContactProjectSupervisor) {
                            onContactProjectSupervisor(currentTracker.projectTitle, currentTracker.trackingCode);
                          }
                        }}
                        className="flex-1 py-2 px-3 rounded-lg bg-[#0B2545] hover:bg-[#07172B] text-white text-xs font-bold text-center transition-colors"
                      >
                        Inquire on This Project
                      </button>
                      <a
                        href={`https://wa.me/${COMPANY_CONFIG.contact.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Hello People and Co Construction Firm, I am following up on Project Tracking Code: ${currentTracker.trackingCode} (${currentTracker.projectTitle}).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                        title="Chat with Resident Engineer on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Construction Milestones Stepper / Timeline */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-100">
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-[#0B2545] font-['Plus_Jakarta_Sans'] flex items-center gap-2">
                    <FileCheck2 className="w-5 h-5 text-[#00B4D8]" />
                    Phase-by-Phase Milestone Stepper
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Stage-by-stage engineering sign-offs, structural concrete pour validations, and progress logs.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    Passed / Completed
                  </span>
                  <span className="flex items-center gap-1.5 font-medium text-cyan-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
                    In Progress
                  </span>
                  <span className="flex items-center gap-1.5 font-medium text-slate-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    Scheduled
                  </span>
                </div>
              </div>

              {/* Milestones Flow */}
              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-[15px] sm:before:left-[19px] before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                {currentTracker.milestones?.map((milestone, idx) => {
                  const isCompleted = milestone.status === 'completed';
                  const isInProgress = milestone.status === 'in_progress';
                  const isPending = milestone.status === 'pending';

                  return (
                    <div key={milestone.id || idx} className="relative group">
                      {/* Step Indicator Node */}
                      <div
                        className={`absolute -left-[27px] sm:-left-[35px] top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all shadow-sm ${
                          isCompleted
                            ? 'bg-emerald-500 border-white text-white shadow-emerald-200'
                            : isInProgress
                            ? 'bg-[#00B4D8] border-white text-white ring-4 ring-[#00B4D8]/20 animate-pulse'
                            : 'bg-white border-slate-300 text-slate-400'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                        ) : (
                          milestone.phaseNumber || idx + 1
                        )}
                      </div>

                      {/* Milestone Card */}
                      <div
                        className={`p-5 rounded-xl border transition-all ${
                          isInProgress
                            ? 'bg-sky-50/50 border-[#00B4D8]/40 shadow-sm'
                            : isCompleted
                            ? 'bg-white border-slate-200 hover:border-slate-300'
                            : 'bg-slate-50/50 border-dashed border-slate-200'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                                Phase {milestone.phaseNumber || idx + 1}
                              </span>
                              {isCompleted && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Completed {milestone.completedDate ? `(${milestone.completedDate})` : ''}
                                </span>
                              )}
                              {isInProgress && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-cyan-100 text-cyan-800">
                                  <Clock className="w-3 h-3 animate-spin" />
                                  Active Construction Stage
                                </span>
                              )}
                              {isPending && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-slate-200 text-slate-600">
                                  Scheduled for {milestone.targetDate}
                                </span>
                              )}
                            </div>
                            <h5 className="text-base sm:text-lg font-bold text-[#0B2545] mt-1 font-['Plus_Jakarta_Sans']">
                              {milestone.title}
                            </h5>
                          </div>

                          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap self-start">
                            Target: {milestone.targetDate}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                          {milestone.description}
                        </p>

                        {/* Engineering Inspection Badges & Technical Notes */}
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                          {milestone.verificationBadge && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold">
                              <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
                              {milestone.verificationBadge}
                            </span>
                          )}

                          {milestone.engineerNotes && (
                            <div className="text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 flex items-start gap-2 w-full">
                              <ShieldCheck className="w-4 h-4 text-[#00B4D8] shrink-0 mt-0.5" />
                              <div>
                                <span className="font-semibold text-slate-900">Site Engineer Note: </span>
                                <span>{milestone.engineerNotes}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Resident Site Engineer Field Logs */}
            {currentTracker.recentSiteUpdates && currentTracker.recentSiteUpdates.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
                <h4 className="text-lg font-bold text-[#0B2545] font-['Plus_Jakarta_Sans'] flex items-center gap-2 mb-4">
                  <Activity className="w-5 h-5 text-[#00B4D8]" />
                  Resident Engineer Daily Field Log
                </h4>
                <div className="space-y-3">
                  {currentTracker.recentSiteUpdates.map((update, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-start gap-3">
                      <span className="text-xs font-mono font-bold text-[#00B4D8] bg-white px-2.5 py-1 rounded border border-slate-200 shrink-0 self-start">
                        {update.date}
                      </span>
                      <div className="flex-1 text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <p>{update.note}</p>
                        <span className="text-[11px] text-slate-500 font-semibold block mt-1">
                          Reported by: {update.author}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* STAFF MILESTONE MANAGER MODAL (STAFF / ADMIN CONTROLS) */}
      {/* ======================================================== */}
      {isStaffModalOpen && currentTracker && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-[#0B2545] px-6 py-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/10 text-[#F59E0B]">
                  <HardHat className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Staff Construction Milestone Manager</h3>
                  <p className="text-xs text-slate-300">
                    Update live progress, toggle milestone completion, and post site inspection logs.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsStaffModalOpen(false)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Project Selector & Add Project Trigger */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex-1">
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Select Active Project File:
                  </label>
                  <select
                    value={currentTracker.id}
                    onChange={(e) => setSelectedTrackerId(e.target.value)}
                    className="w-full text-xs sm:text-sm font-semibold rounded-lg border border-slate-300 bg-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                  >
                    {trackers.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.trackingCode} — {t.projectTitle} ({t.clientName})
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => setIsNewProjectModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#00B4D8] hover:bg-[#0096c7] text-[#0B2545] text-xs font-bold transition-colors shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ New Project File</span>
                </button>
              </div>

              {/* Form 1: Update Progress Metrics & Phase */}
              <form onSubmit={handleUpdateProjectMetrics} className="p-4 bg-white rounded-xl border border-slate-200 space-y-4">
                <h4 className="text-sm font-bold text-[#0B2545] flex items-center gap-2 border-b pb-2">
                  <TrendingUp className="w-4 h-4 text-[#00B4D8]" />
                  Update Project Progress & Current Phase
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Overall Progress %: <strong className="text-[#0B2545]">{editMetrics.overallProgressPercent}%</strong>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={editMetrics.overallProgressPercent}
                      onChange={(e) => setEditMetrics({ ...editMetrics, overallProgressPercent: Number(e.target.value) })}
                      className="w-full accent-[#00B4D8] cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Status Classification</label>
                    <select
                      value={editMetrics.status}
                      onChange={(e) => setEditMetrics({ ...editMetrics, status: e.target.value as any })}
                      className="w-full text-xs rounded-lg border border-slate-300 py-1.5 px-2 bg-white"
                    >
                      <option value="on_track">On Track</option>
                      <option value="ahead_of_schedule">Ahead of Schedule</option>
                      <option value="under_review">Under Technical Review</option>
                      <option value="completed">Completed / Handed Over</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Last Inspection Date</label>
                    <input
                      type="text"
                      value={editMetrics.lastInspectionDate}
                      onChange={(e) => setEditMetrics({ ...editMetrics, lastInspectionDate: e.target.value })}
                      placeholder="e.g. 18 Apr 2026"
                      className="w-full text-xs rounded-lg border border-slate-300 py-1.5 px-2"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Active Phase Title</label>
                    <input
                      type="text"
                      value={editMetrics.currentPhase}
                      onChange={(e) => setEditMetrics({ ...editMetrics, currentPhase: e.target.value })}
                      placeholder="e.g. Phase 4: Superstructure Decking"
                      className="w-full text-xs rounded-lg border border-slate-300 py-1.5 px-2"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={staffSaving}
                    className="px-4 py-2 bg-[#0B2545] hover:bg-[#07172B] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    {staffSaving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                    Save Progress Metrics
                  </button>
                </div>
              </form>

              {/* Section 2: Quick Milestone Status Toggles */}
              <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <h4 className="text-sm font-bold text-[#0B2545] flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-[#00B4D8]" />
                    Interactive Milestone Checklist (Click to Toggle Status)
                  </h4>
                  <button
                    onClick={() => setIsAddingMilestone(!isAddingMilestone)}
                    className="text-xs font-bold text-[#00B4D8] hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    {isAddingMilestone ? 'Cancel New Milestone' : '+ Add New Milestone'}
                  </button>
                </div>

                {/* Milestone Toggle List */}
                <div className="space-y-2">
                  {currentTracker.milestones?.map((m) => (
                    <div
                      key={m.id}
                      className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-xs"
                    >
                      <div className="flex items-center gap-2.5 flex-1 min-w-0 pr-3">
                        <span className="font-mono font-bold text-slate-500 shrink-0">
                          P{m.phaseNumber}:
                        </span>
                        <span className="font-semibold text-slate-800 truncate">
                          {m.title}
                        </span>
                        <span className="text-[11px] text-slate-500 hidden sm:inline">
                          ({m.targetDate})
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleToggleMilestoneStatus(m.id, m.status)}
                          disabled={staffSaving}
                          className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                            m.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : m.status === 'in_progress'
                              ? 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                          title="Click to cycle status: Pending -> In Progress -> Completed"
                        >
                          {m.status === 'completed' ? '✓ Completed' : m.status === 'in_progress' ? '⏳ In Progress' : '○ Pending'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Inline Form to Add a New Milestone */}
                {isAddingMilestone && (
                  <form onSubmit={handleAddMilestone} className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-300 space-y-3">
                    <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Add New Milestone Stage
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">Phase #</label>
                        <input
                          type="number"
                          value={newMilestone.phaseNumber}
                          onChange={(e) => setNewMilestone({ ...newMilestone, phaseNumber: Number(e.target.value) })}
                          className="w-full text-xs rounded border border-slate-300 p-1.5 bg-white"
                          required
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">Milestone Title</label>
                        <input
                          type="text"
                          value={newMilestone.title}
                          onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                          placeholder="e.g. Parapet Wall & Stone Coated Roof Casting"
                          className="w-full text-xs rounded border border-slate-300 p-1.5 bg-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">Technical Scope / Description</label>
                      <textarea
                        value={newMilestone.description}
                        onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                        rows={2}
                        placeholder="Details of materials, structural specifications, and execution plan..."
                        className="w-full text-xs rounded border border-slate-300 p-1.5 bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">Target Date</label>
                        <input
                          type="text"
                          value={newMilestone.targetDate}
                          onChange={(e) => setNewMilestone({ ...newMilestone, targetDate: e.target.value })}
                          placeholder="e.g. 15 Jun 2026"
                          className="w-full text-xs rounded border border-slate-300 p-1.5 bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">Initial Status</label>
                        <select
                          value={newMilestone.status}
                          onChange={(e) => setNewMilestone({ ...newMilestone, status: e.target.value as any })}
                          className="w-full text-xs rounded border border-slate-300 p-1.5 bg-white"
                        >
                          <option value="pending">Pending / Scheduled</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">Certification Badge</label>
                        <input
                          type="text"
                          value={newMilestone.verificationBadge}
                          onChange={(e) => setNewMilestone({ ...newMilestone, verificationBadge: e.target.value })}
                          placeholder="e.g. Lintel Rebar Approved"
                          className="w-full text-xs rounded border border-slate-300 p-1.5 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">Resident Engineer Inspection Note</label>
                      <input
                        type="text"
                        value={newMilestone.engineerNotes}
                        onChange={(e) => setNewMilestone({ ...newMilestone, engineerNotes: e.target.value })}
                        placeholder="e.g. Slump test 75mm verified. Concrete cube curing in progress."
                        className="w-full text-xs rounded border border-slate-300 p-1.5 bg-white"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setIsAddingMilestone(false)}
                        className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={staffSaving}
                        className="px-4 py-1.5 bg-[#00B4D8] text-[#0B2545] font-bold text-xs rounded shadow"
                      >
                        Confirm & Save Milestone
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Section 3: Add Site Inspection Update Log */}
              <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <h4 className="text-sm font-bold text-[#0B2545] flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#00B4D8]" />
                    Post Daily Site Inspection Log to Client Feed
                  </h4>
                  <button
                    onClick={() => setIsPostingSiteUpdate(!isPostingSiteUpdate)}
                    className="text-xs font-bold text-[#00B4D8] hover:underline"
                  >
                    {isPostingSiteUpdate ? 'Close' : '+ Add Log Entry'}
                  </button>
                </div>

                {isPostingSiteUpdate && (
                  <form onSubmit={handlePostSiteUpdate} className="space-y-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Site Engineer / Supervisor Name
                      </label>
                      <input
                        type="text"
                        value={newSiteNote.author}
                        onChange={(e) => setNewSiteNote({ ...newSiteNote, author: e.target.value })}
                        className="w-full text-xs rounded border border-slate-300 p-2 bg-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Observation / Test Result / Milestone Update Note
                      </label>
                      <textarea
                        value={newSiteNote.note}
                        onChange={(e) => setNewSiteNote({ ...newSiteNote, note: e.target.value })}
                        rows={2}
                        placeholder="e.g. 28-day concrete cube crush test returned 34 N/mm², exceeding design requirements. Scaffolding dismantled."
                        className="w-full text-xs rounded border border-slate-300 p-2 bg-white"
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsPostingSiteUpdate(false)}
                        className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={staffSaving}
                        className="px-4 py-1.5 bg-[#0B2545] text-white text-xs font-bold rounded shadow"
                      >
                        Publish Update to Client
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-100 px-6 py-4 flex items-center justify-between border-t border-slate-200">
              <span className="text-xs text-slate-500">
                Tracking changes persist in real-time to PACCF records.
              </span>
              <button
                onClick={() => setIsStaffModalOpen(false)}
                className="px-5 py-2 bg-[#0B2545] hover:bg-[#07172B] text-white text-xs font-bold rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: CREATE BRAND NEW TRACKED PROJECT */}
      {/* ======================================================== */}
      {isNewProjectModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#0B2545] px-6 py-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <HardHat className="w-5 h-5 text-[#F59E0B]" />
                <h3 className="text-lg font-bold">Initialize New Construction Project File</h3>
              </div>
              <button
                onClick={() => setIsNewProjectModalOpen(false)}
                className="text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewProject} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    value={newProjectForm.clientName}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, clientName: e.target.value })}
                    placeholder="e.g. Chief & Mrs. Ovie"
                    className="w-full text-xs rounded-lg border border-slate-300 p-2.5 focus:ring-2 focus:ring-[#00B4D8]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Project Type
                  </label>
                  <input
                    type="text"
                    value={newProjectForm.projectType}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, projectType: e.target.value })}
                    placeholder="e.g. Turnkey Residential Construction"
                    className="w-full text-xs rounded-lg border border-slate-300 p-2.5 focus:ring-2 focus:ring-[#00B4D8]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={newProjectForm.projectTitle}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, projectTitle: e.target.value })}
                  placeholder="e.g. 5-Bedroom Smart Villa with Penthouse & Swimming Pool"
                  className="w-full text-xs rounded-lg border border-slate-300 p-2.5 focus:ring-2 focus:ring-[#00B4D8]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Site Physical Location *
                </label>
                <input
                  type="text"
                  value={newProjectForm.location}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, location: e.target.value })}
                  placeholder="e.g. Along New Eku-Abraka Road, Ethiope East LGA, Delta State"
                  className="w-full text-xs rounded-lg border border-slate-300 p-2.5 focus:ring-2 focus:ring-[#00B4D8]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Resident Site Engineer
                  </label>
                  <input
                    type="text"
                    value={newProjectForm.siteEngineer}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, siteEngineer: e.target.value })}
                    placeholder="e.g. Engr. Kenneth Efe"
                    className="w-full text-xs rounded-lg border border-slate-300 p-2.5"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Estimated Completion
                  </label>
                  <input
                    type="text"
                    value={newProjectForm.estimatedCompletionDate}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, estimatedCompletionDate: e.target.value })}
                    placeholder="e.g. 30 Nov 2026"
                    className="w-full text-xs rounded-lg border border-slate-300 p-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Initial Progress %
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newProjectForm.overallProgressPercent}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, overallProgressPercent: Number(e.target.value) })}
                    className="w-full text-xs rounded-lg border border-slate-300 p-2.5"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Status
                  </label>
                  <select
                    value={newProjectForm.status}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, status: e.target.value as any })}
                    className="w-full text-xs rounded-lg border border-slate-300 p-2.5 bg-white"
                  >
                    <option value="on_track">On Track</option>
                    <option value="ahead_of_schedule">Ahead of Schedule</option>
                    <option value="under_review">Under Technical Review</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Initial Site Mobilization Note
                </label>
                <textarea
                  value={newProjectForm.initialNote}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, initialNote: e.target.value })}
                  rows={2}
                  className="w-full text-xs rounded-lg border border-slate-300 p-2.5"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsNewProjectModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={staffSaving}
                  className="px-5 py-2 bg-[#0B2545] hover:bg-[#07172B] text-white text-xs font-bold rounded-lg shadow"
                >
                  Create & Generate Tracking Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
