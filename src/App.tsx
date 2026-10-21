import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CompanyStats } from './components/CompanyStats';
import { AboutSection } from './components/AboutSection';
import { StaffSection } from './components/StaffSection';
import { ServicesSection } from './components/ServicesSection';
import { ServiceAreaMap } from './components/ServiceAreaMap';
import { PortfolioSection } from './components/PortfolioSection';
import { ProjectCostEstimator } from './components/ProjectCostEstimator';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ProjectStatusTracker } from './components/ProjectStatusTracker';
import { ProjectTimeline } from './components/ProjectTimeline';
import { PropertyListingsSection } from './components/PropertyListingsSection';
import { ProjectGallery } from './components/ProjectGallery';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { OwnerEnquiryReviewModal } from './components/OwnerEnquiryReviewModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { EnquiryRecord } from './types';
import { HardHat } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [inboxOpen, setInboxOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  
  // Pre-fill states for the contact/enquiry form
  const [prefilledService, setPrefilledService] = useState<string>('');
  const [prefilledSubject, setPrefilledSubject] = useState<string>('');

  // Fetch initial unread count for staff inbox badge
  const refreshUnreadCount = async () => {
    try {
      const res = await fetch('/api/enquiries');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.enquiries)) {
          const count = data.enquiries.filter((e: EnquiryRecord) => e.status === 'new').length;
          setUnreadCount(count);
        }
      }
    } catch {
      // ignore in silent background check
    }
  };

  useEffect(() => {
    refreshUnreadCount();
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestService = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    setPrefilledSubject(`Consultation Request: ${serviceTitle}`);
    scrollToSection('contact');
  };

  const handleEnquireForProject = (projectTitle: string) => {
    setPrefilledService('Construction Project Management');
    setPrefilledSubject(`Project Inquiry: ${projectTitle}`);
    scrollToSection('contact');
  };

  const handleEnquireProperty = (propertyTitle: string) => {
    setPrefilledService('Land Agent & Property Acquisition');
    setPrefilledSubject(`Property Inquiry: ${propertyTitle}`);
    scrollToSection('contact');
  };

  const handleContactProjectSupervisor = (projectTitle: string, trackingCode: string) => {
    setPrefilledService('Construction Project Management');
    setPrefilledSubject(`Project Tracker Inquiry: [${trackingCode}] ${projectTitle}`);
    scrollToSection('contact');
  };

  const handleTimelineStageConsultation = (stageName?: string) => {
    setPrefilledService('Building Construction & Turnkey Project Execution');
    setPrefilledSubject(stageName ? `Phase Consultation: ${stageName}` : 'Construction Stage Consultation');
    scrollToSection('contact');
  };

  const handleGalleryEnquire = (projectTitle: string) => {
    setPrefilledService('Building Construction & Turnkey Project Execution');
    setPrefilledSubject(`Site Gallery Inquiry: ${projectTitle}`);
    scrollToSection('contact');
  };

  const handleSelectLGAForConsultation = (lgaName: string) => {
    setPrefilledService('Civil Engineering & Infrastructure Development');
    setPrefilledSubject(`Site Feasibility Study for ${lgaName} LGA, Delta State`);
    scrollToSection('contact');
  };

  const handleConsultStaff = (staffName: string, position: string) => {
    setPrefilledService('Construction Project Management');
    setPrefilledSubject(`Technical Consultation with ${staffName} (${position})`);
    scrollToSection('contact');
  };

  const handleRequestBOQFromEstimator = (details: {
    projectType: string;
    totalAreaSqM: number;
    floors: number;
    foundation: string;
    tier: string;
    estimatedMinNGN: number;
    estimatedMaxNGN: number;
  }) => {
    setPrefilledService('Bills of Quantities (BOQ) Preparation & Cost Estimation');
    setPrefilledSubject(
      `BOQ Estimation: ${details.projectType} (${details.totalAreaSqM} m², ${details.floors} fl, ${details.tier})`
    );
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased selection:bg-[#00B4D8]/20 selection:text-[#0B2545]">
      {/* Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenInbox={() => setInboxOpen(true)}
        unreadCount={unreadCount}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Home / Hero Section */}
        <section id="home">
          <Hero
            onConsultationClick={() => scrollToSection('contact')}
            onExploreServicesClick={() => scrollToSection('services')}
          />
        </section>

        {/* Company Stats Counter Showcase */}
        <CompanyStats />

        {/* About Section */}
        <AboutSection />

        {/* Principal Engineering & Technical Staff Section */}
        <StaffSection onConsultStaff={handleConsultStaff} />

        {/* Core Services Section */}
        <ServicesSection onRequestService={handleRequestService} />

        {/* Delta State 25 LGAs Interactive Service Area Map */}
        <ServiceAreaMap onSelectLGAForConsultation={handleSelectLGAForConsultation} />

        {/* Portfolio & Projects Section */}
        <PortfolioSection onEnquireForProject={handleEnquireForProject} />

        {/* Preliminary Project Cost Estimator & Feasibility Tool */}
        <ProjectCostEstimator onRequestBOQ={handleRequestBOQFromEstimator} />

        {/* Client Testimonials Section */}
        <TestimonialsSection onConsultationClick={() => scrollToSection('contact')} />

        {/* Live Project Status & Milestone Tracker (Client-facing & Staff Milestone input) */}
        <ProjectStatusTracker onContactProjectSupervisor={handleContactProjectSupervisor} />

        {/* Construction Project Lifecycle Interactive Vertical Timeline */}
        <ProjectTimeline onConsultationClick={handleTimelineStageConsultation} />

        {/* Property & Land Registry Section */}
        <PropertyListingsSection onEnquireProperty={handleEnquireProperty} />

        {/* Project Gallery & Lightbox Grid (Construction Sites & Finished Works) */}
        <ProjectGallery onEnquireProject={handleGalleryEnquire} />

        {/* Frequently Asked Questions (FAQ) Section */}
        <FAQSection onConsultationClick={() => scrollToSection('contact')} />

        {/* Functional Contact & Enquiry Section */}
        <ContactSection
          initialService={prefilledService}
          initialSubject={prefilledSubject}
          onOpenPrivacyPolicy={() => setPrivacyOpen(true)}
          onSubmissionSuccess={refreshUnreadCount}
        />
      </main>

      {/* Corporate Footer */}
      <Footer
        onNavigate={scrollToSection}
        onRequestService={handleRequestService}
        onOpenPrivacyPolicy={() => setPrivacyOpen(true)}
        onOpenInbox={() => setInboxOpen(true)}
      />

      {/* Floating Bottom Left: Resident Engineer Consultation Trigger */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
        <button
          onClick={() => {
            setPrefilledService('Civil Engineering');
            setPrefilledSubject('Direct Technical Consultation with Resident Engineer');
            scrollToSection('contact');
          }}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#0B2545] hover:bg-[#07172B] active:scale-95 text-white font-bold text-xs shadow-xl hover:shadow-2xl transition-all border border-white/20 cursor-pointer"
          title="Consult PACCF Resident Engineer"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#00B4D8] animate-pulse" />
          <HardHat className="w-4 h-4 text-[#F59E0B]" />
          <span>Ask Engineer</span>
        </button>
      </div>

      {/* Verified Floating WhatsApp Widget (Bottom Right) */}
      <FloatingWhatsApp />

      {/* Owner / Staff Enquiry Management Modal */}
      <OwnerEnquiryReviewModal
        isOpen={inboxOpen}
        onClose={() => {
          setInboxOpen(false);
          refreshUnreadCount();
        }}
        onUpdateCount={setUnreadCount}
      />

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      />
    </div>
  );
}
