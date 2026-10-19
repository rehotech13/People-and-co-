import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type LanguageCode = 'en' | 'pcm' | 'yo' | 'ig' | 'ha';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeName: string;
  flag: string;
  region: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'en',
    label: 'English',
    nativeName: 'English (Official)',
    flag: '🇬🇧',
    region: 'Official / Global',
  },
  {
    code: 'pcm',
    label: 'Pidgin',
    nativeName: 'Naija Pidgin',
    flag: '🇳🇬',
    region: 'Delta State & Nationwide',
  },
  {
    code: 'yo',
    label: 'Yorùbá',
    nativeName: 'Èdè Yorùbá',
    flag: '🇳🇬',
    region: 'South West & Nationwide',
  },
  {
    code: 'ig',
    label: 'Igbo',
    nativeName: 'Asụsụ Igbo',
    flag: '🇳🇬',
    region: 'South East, Delta & Nationwide',
  },
  {
    code: 'ha',
    label: 'Hausa',
    nativeName: 'Harshen Hausa',
    flag: '🇳🇬',
    region: 'Northern Nigeria & Nationwide',
  },
];

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.investors': 'Investors',
    'nav.tracker': 'Live Tracker',
    'nav.timeline': 'Timeline',
    'nav.listings': 'Listings',
    'nav.gallery': 'Gallery',
    'nav.estimator': 'Cost Estimator',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.consultation': 'Book Consultation',
    'nav.inbox': 'Review Inquiries',
    'nav.select_language': 'Language',

    // Hero Section
    'hero.badge': 'PEOPLE AND CO CONSTRUCTION FIRM',
    'hero.coverage': 'Delta State & Nationwide Nigeria',
    'hero.counter': '150+ Successful Projects Completed',
    'hero.title_p1': 'ENGINEERED STRENGTH.',
    'hero.title_p2': 'LASTING VALUE.',
    'hero.subtitle':
      'Delivering certified civil engineering, structural design, turnkey building construction, and project management across Delta State and nationwide.',
    'hero.cta_consult': 'Request Project Consultation',
    'hero.cta_explore': 'Explore Our Services',
    'hero.guarantee': '100% Structural Safety & Certified BOQ Billing',

    // Company Stats
    'stats.years': '10+ Years Experience',
    'stats.years_sub': 'Continuous civil execution in Delta State & nationwide since 2014',
    'stats.experts': '50+ Certified Experts',
    'stats.experts_sub': 'COREN engineers, NIA architects & chartered quantity surveyors',
    'stats.projects': '200+ Projects Handled',
    'stats.projects_sub': 'Turnkey residential villas, commercial plazas & road drainage',
    'stats.safety': '100% Structural Integrity',
    'stats.safety_sub': 'Zero collapse record with rigorous concrete batch cube tests',

    // About Section
    'about.badge': 'About Our Firm',
    'about.title': 'Technical Precision & Uncompromising Standards',
    'about.desc':
      'People and Co Construction Firm (PACCF) is a premier civil engineering and construction contractor operating from Eku, Delta State, serving discerning homeowners, commercial investors, and diaspora clients across Nigeria.',
    'about.core_integrity': 'Structural Integrity',
    'about.core_integrity_desc': 'Adherence to Eurocode & Nigerian National Building Codes without cutting corners.',
    'about.core_transparency': 'Transparent BOQ Billing',
    'about.core_transparency_desc': 'Milestone-based stage disbursements with zero unexpected cost inflation.',
    'about.core_diaspora': 'Diaspora Investor Trust',
    'about.core_diaspora_desc': 'Weekly drone inspections, video walkthroughs, and certified milestone sign-offs.',

    // Services Section
    'services.badge': 'Core Capabilities',
    'services.title': 'Full-Spectrum Construction & Engineering',
    'services.subtitle': 'From deep wetland foundation design to turnkey residential finishes and road civil works.',
    'services.building': 'Building Construction',
    'services.civil': 'Civil Engineering & Drainage',
    'services.structural': 'Structural Engineering Design',
    'services.pm': 'Construction Project Management',
    'services.boq': 'BOQ Preparation & Costing',
    'services.property': 'Property & Land Acquisition',

    // Cost Estimator
    'estimator.badge': 'Planning & Feasibility Tool',
    'estimator.title': 'Preliminary Project Cost Estimator',
    'estimator.subtitle': 'Input your rough building dimensions and finishing preferences to receive indicative budget estimates.',
    'estimator.cta_boq': 'Request Official Detailed BOQ',

    // Live Tracker
    'tracker.badge': 'Client Live Portal',
    'tracker.title': 'Real-Time Construction Milestone Tracker',
    'tracker.subtitle': 'Track active concrete curing, reinforcement inspections, and construction phases with authenticated tracking codes.',
    'tracker.placeholder': 'Enter Tracking Code (e.g., PACCF-PRJ-2026-001)...',
    'tracker.search_btn': 'Track Project',

    // Contact Section
    'contact.badge': 'Start Your Build',
    'contact.title': 'Consult with Our Resident Engineers',
    'contact.subtitle': 'Send us your site coordinates, architectural drawings, or feasibility questions. Our certified engineering desk responds promptly.',
    'contact.full_name': 'Full Name',
    'contact.email': 'Email Address',
    'contact.phone': 'Phone / WhatsApp Number',
    'contact.service': 'Service Required',
    'contact.subject': 'Project Subject',
    'contact.location': 'Project Site Location (LGA / City)',
    'contact.budget': 'Estimated Budget Range',
    'contact.message': 'Project Details & Specifications',
    'contact.submit_btn': 'Submit Project Enquiry',
    'contact.direct_phone': 'Direct Phone Line',
    'contact.address': 'Corporate Office Address',
  },

  pcm: {
    // Navigation (Naija Pidgin)
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Wetin We Dey Do',
    'nav.portfolio': 'Our Works',
    'nav.investors': 'Investors Review',
    'nav.tracker': 'Live Tracker',
    'nav.timeline': 'Step by Step',
    'nav.listings': 'Land & Houses',
    'nav.gallery': 'Site Photos',
    'nav.estimator': 'Cost Calculator',
    'nav.faq': 'Questions',
    'nav.contact': 'Call/Holla Us',
    'nav.consultation': 'Book Consultation',
    'nav.inbox': 'Check Messages',
    'nav.select_language': 'Change Language',

    // Hero Section
    'hero.badge': 'PEOPLE AND CO CONSTRUCTION FIRM',
    'hero.coverage': 'Delta State & Whole Nigeria',
    'hero.counter': 'Over 150+ Solid Projects We Don Finish',
    'hero.title_p1': 'SOLID BUILDING.',
    'hero.title_p2': 'VALUE WEY DEY LAST.',
    'hero.subtitle':
      'We dey deliver correct civil engineering, strong building construction, structural design, and project management for Delta State and all over Nigeria.',
    'hero.cta_consult': 'Holla Us For Your Project',
    'hero.cta_explore': 'See Wetin We Dey Do',
    'hero.guarantee': '100% Solid Safety & Clear BOQ Calculation (No Corner-Corner)',

    // Company Stats
    'stats.years': '10+ Years Experience',
    'stats.years_sub': 'Since 2014 we dey build heavy projects across Delta State & Naija',
    'stats.experts': '50+ Certified Engineers',
    'stats.experts_sub': 'COREN engineers, architects & quantity surveyors wey sabi the work well',
    'stats.projects': '200+ Projects We Don Handle',
    'stats.projects_sub': 'Luxury duplex, commercial plaza, drainage and solid road works',
    'stats.safety': '100% Solid Structural Record',
    'stats.safety_sub': 'Zero collapse record, every concrete get laboratory strength test',

    // About Section
    'about.badge': 'Who We Be',
    'about.title': 'Correct Engineering & Standard Materials Wey No Dey Fail',
    'about.desc':
      'People and Co Construction Firm (PACCF) na top civil engineering and construction company based for Eku, Delta State. We dey build for clients wey dey abroad (diaspora), commercial investors, and solid homeowners.',
    'about.core_integrity': 'Solid Structural Standard',
    'about.core_integrity_desc': 'We dey follow National Building Code, we no dey cut corners with cement or iron rods.',
    'about.core_transparency': 'Clear BOQ Without Hidden Cost',
    'about.core_transparency_desc': 'Pay as the work dey reach milestone, zero sudden price increase.',
    'about.core_diaspora': 'Peace of Mind for Diaspora People',
    'about.core_diaspora_desc': 'Weekly drone video, photo report, and live tracker so you fit relax from London or US.',

    // Services Section
    'services.badge': 'Our Services',
    'services.title': 'Full Construction & Engineering Services',
    'services.subtitle': 'From deep swamp raft foundation to luxury turnkey finishes and asphalt roads.',
    'services.building': 'Complete House Construction',
    'services.civil': 'Civil Engineering & Gutter/Drainage',
    'services.structural': 'Structural Engineering Design',
    'services.pm': 'Site Supervision & Project Management',
    'services.boq': 'BOQ Price & Material Calculation',
    'services.property': 'Genuine Land & Property Acquisition',

    // Cost Estimator
    'estimator.badge': 'Budget Calculator',
    'estimator.title': 'Check Building Cost Before You Start',
    'estimator.subtitle': 'Put your house size, number of floors, and finishing style to know approximate budget.',
    'estimator.cta_boq': 'Request Full Detailed BOQ',

    // Live Tracker
    'tracker.badge': 'Client Live Portal',
    'tracker.title': 'Track Your Site Work In Real-Time',
    'tracker.subtitle': 'Put your project code make you see current phase, concrete cure tests, and engineer report.',
    'tracker.placeholder': 'Put your tracking code (e.g. PACCF-PRJ-2026-001)...',
    'tracker.search_btn': 'Check Site Now',

    // Contact Section
    'contact.badge': 'Make We Start Your Building',
    'contact.title': 'Talk with Our Resident Engineer',
    'contact.subtitle': 'Drop your project location, house plan, or question. Our engineering team go answer you sharp-sharp.',
    'contact.full_name': 'Your Full Name',
    'contact.email': 'Your Email Address',
    'contact.phone': 'Phone / WhatsApp Number',
    'contact.service': 'The Service You Need',
    'contact.subject': 'Project Title / Subject',
    'contact.location': 'Where the Land Dey (LGA / City)',
    'contact.budget': 'Estimated Budget Amount',
    'contact.message': 'Tell Us More About the Project',
    'contact.submit_btn': 'Send Enquiry Now',
    'contact.direct_phone': 'Call Us Direct',
    'contact.address': 'Our Main Office Address',
  },

  yo: {
    // Navigation (Yorùbá)
    'nav.home': 'Ojú Ilé',
    'nav.about': 'Nípa Wa',
    'nav.services': 'Àwọn Iṣẹ́ Wa',
    'nav.portfolio': 'Àwọn Iṣẹ́ Àkànṣe',
    'nav.investors': 'Àwọn Olùdókòwò',
    'nav.tracker': 'Titele Ise',
    'nav.timeline': 'Ipele Ikole',
    'nav.listings': 'Ilẹ̀ & Ilé Títà',
    'nav.gallery': 'Àwòrán Iṣẹ́',
    'nav.estimator': 'Iṣiro Iye Owo',
    'nav.faq': 'Àwọn Ìbéèrè',
    'nav.contact': 'Kàn Sí Wa',
    'nav.consultation': 'Gba Ìmọ̀ràn',
    'nav.inbox': 'Àkójọ Ìfiránṣẹ́',
    'nav.select_language': 'Èdè',

    // Hero Section
    'hero.badge': 'PEOPLE AND CO CONSTRUCTION FIRM',
    'hero.coverage': 'Ipinle Delta & Gbogbo Naijiria',
    'hero.counter': 'Ju 150+ Iṣẹ́ Ikọ́le To Pari Ni Aṣeyọri',
    'hero.title_p1': 'IKỌ́LE TO DÁJÚ.',
    'hero.title_p2': 'ITỌ́JU TO LỌ́JỌ́ LÓRÍ.',
    'hero.subtitle':
      'A n pese imo-ero ikole to peye, apẹrẹ igbekale, ati itoju ise ikole kaakiri Ipinle Delta ati gbogbo Naijiria pẹlu otitọ ati pipeye.',
    'hero.cta_consult': 'Gba Ìmọ̀ràn Lórí Iṣẹ́ Rẹ',
    'hero.cta_explore': 'Wo Àwọn Iṣẹ́ Wa',
    'hero.guarantee': '100% Aabo Igbekale & Iṣiro BOQ To Daju',

    // Company Stats
    'stats.years': 'Ọdun 10+ Iriri Iṣẹ́',
    'stats.years_sub': 'Iṣẹ́ ikole to tẹsiwaju ni Delta ati Naijiria lati 2014',
    'stats.experts': '50+ Awọn Onimọ-ẹrọ To Kọja Idanwo',
    'stats.experts_sub': 'Awọn onimọ-ẹrọ COREN, awọn ayaworan NIA & awọn oniwon iye',
    'stats.projects': '200+ Iṣẹ́ Ti A Ti Ṣe',
    'stats.projects_sub': 'Awọn ile aladun, awọn ile-iṣowo nla & awọn oju-ọna',
    'stats.safety': '100% Igbasilẹ Aabo To Daju',
    'stats.safety_sub': 'Ko si igbasilẹ ile wó ri pẹlu idanwo kọnkéré to muna doko',

    // About Section
    'about.badge': 'Nípa Ile-Iṣẹ́ Wa',
    'about.title': 'Iṣẹ́ Pípé Pẹ̀lú Ìwà Ọmọlúwàbí Ninu Ikọ́le',
    'about.desc':
      'People and Co Construction Firm (PACCF) jẹ ile-iṣẹ́ ikole ati imo-ero ti o gba iwaju lati Eku, Ipinle Delta, ti n ṣiṣẹ́ fun awọn onile, awọn oludokoowo, ati awọn ọmọ orilẹ-ede Naijiria ti o wa ni ilẹ okeere.',
    'about.core_integrity': 'Igbekale To Lagbara',
    'about.core_integrity_desc': 'A n tẹle ofin ikole orilẹ-ede lai fi owo kù tabi lo ohun elo ailagbara.',
    'about.core_transparency': 'Iṣiro BOQ To Han Gbangba',
    'about.core_transparency_desc': 'Isanwo gẹgẹ bi ipele iṣẹ́ ṣe n lọ lai si afikun owo ojiji.',
    'about.core_diaspora': 'Igbẹkẹle Fun Awọn Ti O Wa Ni Okeere',
    'about.core_diaspora_desc': 'Fidio drone osẹ-ọsẹ, iwe ijabọ iṣẹ́, ati itọpa lori ẹrọ ayelujara.',

    // Services Section
    'services.badge': 'Agbara Iṣẹ́ Wa',
    'services.title': 'Gbogbo Iṣẹ́ Ikọ́le & Imo-Ero',
    'services.subtitle': 'Lati ipilẹ raft ni ilẹ swamp titi de ipari ile aladun ati oju-omi koto.',
    'services.building': 'Ikọ́le Ile Titun',
    'services.civil': 'Imo-Ero Ilu & Koto Omi',
    'services.structural': 'Apẹrẹ Igbekale Ilé',
    'services.pm': 'Itoju & Abojuto Iṣẹ́ Ikọ́le',
    'services.boq': 'Iṣiro Owo & Ohun Elo BOQ',
    'services.property': 'Wiwa Ilẹ̀ & Ohun-Ini To Daju',

    // Cost Estimator
    'estimator.badge': 'Irinṣẹ́ Iṣiro Isuna',
    'estimator.title': 'Iṣiro Owo Ikọ́le Ile Lojukanna',
    'estimator.subtitle': 'Tẹ iwọn ile rẹ, iye pẹtẹẹsì, ati iru ipilẹ lati mọ iye owo to le na ọ.',
    'estimator.cta_boq': 'Beere Fun Iwe BOQ Pípé',

    // Live Tracker
    'tracker.badge': 'Ibudo Onibara',
    'tracker.title': 'Tọpa Ipele Ikọ́le Ile Rẹ Lojukanna',
    'tracker.subtitle': 'Tẹ koodu iṣẹ́ rẹ lati wo ipele ti iṣẹ́ de, idanwo kọnkéré, ati akọsilẹ onimọ-ẹrọ.',
    'tracker.placeholder': 'Tẹ koodu iṣẹ́ rẹ (apẹẹrẹ: PACCF-PRJ-2026-001)...',
    'tracker.search_btn': 'Tọpa Bayi',

    // Contact Section
    'contact.badge': 'Bẹrẹ Ikọ́le Rẹ',
    'contact.title': 'Bọrọrọ Pẹlu Awọn Onimọ-ẹrọ Wa',
    'contact.subtitle': 'Fi aworan ilé rẹ tabi ibeere ranṣẹ si wa. Awọn onimọ-ẹrọ wa yoo da ọ lohun ni kiakia.',
    'contact.full_name': 'Orukọ Rẹ Ni Kikun',
    'contact.email': 'Adirẹsi Imeeli Rẹ',
    'contact.phone': 'Nọmba Foonu / WhatsApp',
    'contact.service': 'Iru Iṣẹ́ Ti O N Fẹ',
    'contact.subject': 'Akori Iṣẹ́ Rẹ',
    'contact.location': 'Ibi Ti Ilẹ̀ Rẹ Wa (Ilu / LGA)',
    'contact.budget': 'Iye Owo Ti O Fẹ Na',
    'contact.message': 'Awọn Alaye Nipa Iṣẹ́ Rẹ',
    'contact.submit_btn': 'Fi Ibeere Ranṣẹ',
    'contact.direct_phone': 'Pe Wa Taara',
    'contact.address': 'Adirẹsi Ọfiisi Wa',
  },

  ig: {
    // Navigation (Igbo)
    'nav.home': 'Ụlọ',
    'nav.about': 'Maka Anyị',
    'nav.services': 'Ọrụ Anyị',
    'nav.portfolio': 'Ọrụ Anyị Rụchara',
    'nav.investors': 'Ndị Ntinye Ego',
    'nav.tracker': 'Nleba Anya Ọrụ',
    'nav.timeline': 'Usoro Ọrụ',
    'nav.listings': 'Ala & Ụlọ Maka Ọrịre',
    'nav.gallery': 'Foto Saịtị',
    'nav.estimator': 'Ngụkọ Ego Ọrụ',
    'nav.faq': 'Ajụjụ Ndị A Na-ajụkarị',
    'nav.contact': 'Kpọtụrụ Anyị',
    'nav.consultation': 'Nkwurịta Okwu',
    'nav.inbox': 'Ozi Ndị Ahịa',
    'nav.select_language': 'Asụsụ',

    // Hero Section
    'hero.badge': 'PEOPLE AND CO CONSTRUCTION FIRM',
    'hero.coverage': 'Delta Steeti & Naịjirịa Niile',
    'hero.counter': 'Ihe Karịrị 150+ Ọrụ Rụzuru nke Ọma',
    'hero.title_p1': 'IWU ỤLỌ SIRI IKE.',
    'hero.title_p2': 'URU NA-ADI ETEKA.',
    'hero.subtitle':
      'Na-enye ọrụ injinia obodo pụrụ iche, imewe ụlọ, na nlekọta ọrụ n\'ofe Delta Steeti na Naịjirịa niile site n\'eziokwu na ịdị mma.',
    'hero.cta_consult': 'Kparịta Maka Ọrụ Gị',
    'hero.cta_explore': 'Nyochaa Ọrụ Anyị',
    'hero.guarantee': '100% Nchebe Nhazi & Ọnụahịa BOQ nke Ziri Ezi',

    // Company Stats
    'stats.years': 'Afọ 10+ nke Ahụmịhe',
    'stats.years_sub': 'Iwu ụlọ n\'ofe Delta na Naịjirịa kemgbe 2014',
    'stats.experts': '50+ Ndị Ọkachamara Kwadoro',
    'stats.experts_sub': 'Ndị injinia COREN, ndị na-ese ụkpụrụ NIA na ndị na-agụ ọnụahịa',
    'stats.projects': '200+ Ọrụ Anyị Rụrụ',
    'stats.projects_sub': 'Ụlọ obibi dị elu, ogige ahịa na drainage okporo ụzọ',
    'stats.safety': '100% Nchekwa Ọrụ Ụlọ',
    'stats.safety_sub': 'Ọ dịghị ụlọ dara ada site na ule simenti siri ike',

    // About Section
    'about.badge': 'Banyere Anyị',
    'about.title': 'Eziokwu Injinia & Ụkpụrụ Na-enweghị Ntụpọ',
    'about.desc':
      'People and Co Construction Firm (PACCF) bụ ụlọ ọrụ injinia na iwu ụlọ kacha elu sitere na Eku, Delta Steeti, na-arụrụ ndị nwe ụlọ, ndị na-etinye ego, na ndị nọ na mba ofesi.',
    'about.core_integrity': 'Nhazi Siri Ike',
    'about.core_integrity_desc': 'Ịgbaso iwu iwu ụlọ nke mba na-enweghị ibelata ngwaahịa simenti ma ọ bụ ígwè.',
    'about.core_transparency': 'Ngụkọ Ego BOQ nke Doro Anya',
    'about.core_transparency_desc': 'Ịkwụ ụgwọ n\'ụzọ nwayọọ nwayọọ dịka ọrụ siri na-aga n\'enweghị mmụba mberede.',
    'about.core_diaspora': 'Ntụkwasị Obi Ndị Nọ na Mba Ọzọ',
    'about.core_diaspora_desc': 'Vidiyo drone izu ụka, akụkọ foto, na nsochi dijitalụ si London ma ọ bụ America.',

    // Services Section
    'services.badge': 'Nka Anyị',
    'services.title': 'Ọrụ Iwu Ụlọ & Injinia Zuru Ezu',
    'services.subtitle': 'Site na ntọala raft siri ike na mmiri swamp ruo na ngwụcha ụlọ dị oke ọnụ ahịa.',
    'services.building': 'Iwu Ụlọ zuru oke',
    'services.civil': 'Injinia Obodo & Ọwara Mmiri',
    'services.structural': 'Nhazi Ụkpụrụ Ụlọ',
    'services.pm': 'Nlekọta Ọrụ Iwu Ụlọ',
    'services.boq': 'Nkwadebe Ọnụahịa BOQ',
    'services.property': 'Inweta Ala nke Eziokwu',

    // Cost Estimator
    'estimator.badge': 'Ngwá Ọrụ Nleba Anyị',
    'estimator.title': 'Tụọ Ọnụahịa Iwu Ụlọ Gị Ngwa Ngwa',
    'estimator.subtitle': 'Tinye nha ụlọ gị, ọnụọgụ okpukpu, na ụdị mmecha iji mara atụmatụ ego gị.',
    'estimator.cta_boq': 'Rịọ Akwụkwọ BOQ Zuru Ezu',

    // Live Tracker
    'tracker.badge': 'Ọnụ Ụzọ Ndị Ahịa',
    'tracker.title': 'Sochie Ọganihu Ọrụ Gị n\'Oge',
    'tracker.subtitle': 'Tinye koodu ọrụ gị iji hụ ọkwa dị ugbu a, ule kọntiri, na akụkọ injinia.',
    'tracker.placeholder': 'Tinye koodu nsochi (dịka: PACCF-PRJ-2026-001)...',
    'tracker.search_btn': 'Sochie Ugbu A',

    // Contact Section
    'contact.badge': 'Bido Ọrụ Gị',
    'contact.title': 'Kparịta Ụka na Ndị Injinia Anyị',
    'contact.subtitle': 'Ziga atụmatụ saịtị gị ma ọ bụ ajụjụ. Ndị otu injinia anyị ga-aza gị ngwa ngwa.',
    'contact.full_name': 'Aha Gị Zuru Ezu',
    'contact.email': 'Adreesị Ozi Ịntanetị Gị',
    'contact.phone': 'Nọmba Ekwentị / WhatsApp',
    'contact.service': 'Ọrụ Ị Chọrọ',
    'contact.subject': 'Isiokwu Ọrụ Gị',
    'contact.location': 'Ebe Ala Gị Dị (LGA / Obodo)',
    'contact.budget': 'Atụmatụ Ego Gị',
    'contact.message': 'Nkọwa zuru ezu banyere ọrụ gị',
    'contact.submit_btn': 'Zipu Ajụjụ Ọrụ Gị',
    'contact.direct_phone': 'Kpọọ Anyị Kpọmkwem',
    'contact.address': 'Adreesị Ụlọ Ọrụ Anyị',
  },

  ha: {
    // Navigation (Hausa)
    'nav.home': 'Gida',
    'nav.about': 'Game Da Mu',
    'nav.services': 'Ayyukanmu',
    'nav.portfolio': 'Ayyukan Da Muka Yi',
    'nav.investors': 'Masu Zuba Jari',
    'nav.tracker': 'Bibiyar Aiki Kai Tsaye',
    'nav.timeline': 'Tsarin Lokaci',
    'nav.listings': 'Kadarori & Filaye',
    'nav.gallery': 'Hotunan Wurin Aiki',
    'nav.estimator': 'Kiyasta Kudin Aiki',
    'nav.faq': 'Tambayoyi',
    'nav.contact': 'Tuntube Mu',
    'nav.consultation': 'Neman Shawara',
    'nav.inbox': 'Kwamitin Sakonni',
    'nav.select_language': 'Harshe',

    // Hero Section
    'hero.badge': 'PEOPLE AND CO CONSTRUCTION FIRM',
    'hero.coverage': 'Jihar Delta Da Fadin Najeriya',
    'hero.counter': 'Fiye Da Ayyuka 150+ Da Aka Kammala',
    'hero.title_p1': 'GINI MAI INGANCI.',
    'hero.title_p2': 'DARAJAR DA KE DOREWA.',
    'hero.subtitle':
      'Muna gina ingantaccen aikin injiniya, tsarin gini, da kula da ayyuka a fadin Jihar Delta da fadin Najeriya cikin gaskiya da kwarewa.',
    'hero.cta_consult': 'Nemi Shawarar Aikin Gini',
    'hero.cta_explore': 'Duba Ayyukanmu',
    'hero.guarantee': 'Kariyar Tsaro 100% & Lissafin BOQ Na Gaskiya',

    // Company Stats
    'stats.years': 'Fiye Da Shekaru 10 Na Kwarewa',
    'stats.years_sub': 'Gudanar da aikin gini a Delta da Najeriya tun daga 2014',
    'stats.experts': 'Kwararru 50+ Masu Lasisi',
    'stats.experts_sub': 'Injiniyoyin COREN, masu tsara taswira NIA da masu auna kudi',
    'stats.projects': 'Ayyuka 200+ Da Muka Kula Da Su',
    'stats.projects_sub': 'Manyan gidaje na alfarma, cibiyoyin kasuwanci da magudanan ruwa',
    'stats.safety': 'Ingancin Tsarin Gini 100%',
    'stats.safety_sub': 'Babu labarin rushewar gini tare da gwajin kwankire a dakin gwaji',

    // About Section
    'about.badge': 'Game Da Kamfaninmu',
    'about.title': 'Kwarewar Injiniya Da Ka’idojin Aiki Masu Karfi',
    'about.desc':
      'People and Co Construction Firm (PACCF) babban kamfani ne na injiniya da gini da ke da hedkwata a Eku, Jihar Delta, yana hidimtawa masu gida, masu zuba jari na kasuwanci, da ‘yan Najeriya mazauna kasashen waje.',
    'about.core_integrity': 'Ingancin Tsarin Gini',
    'about.core_integrity_desc': 'Bin ka’idojin ginin kasa ba tare da rage ingancin siminti ko karafan gini ba.',
    'about.core_transparency': 'Lissafin BOQ Mai Sauki Kuma Bayyananne',
    'about.core_transparency_desc': 'Biyan kudi a kowane mataki na aiki ba tare da karin kudi na bazata ba.',
    'about.core_diaspora': 'Amincewar Mazauna Kasashen Waje',
    'about.core_diaspora_desc': 'Hotunan bidiyo na drone a kowane mako, rahotanni, da tsarin bibiyar aiki kai tsaye.',

    // Services Section
    'services.badge': 'Kwarewarmu',
    'services.title': 'Cikakkun Ayyukan Gini & Injiniya',
    'services.subtitle': 'Daga ginshikin raft a yankin ruwa zuwa kammala gida na zamani da magudanan ruwa.',
    'services.building': 'Ginin Gidaje Da Gine-Gine',
    'services.civil': 'Injiniyan Jama’a & Magudanan Ruwa',
    'services.structural': 'Tsara Tsarin Gini',
    'services.pm': 'Gudanarwa & Kula Da Wurin Aiki',
    'services.boq': 'Shirya Lissafin Kudi Da Kayan Aiki (BOQ)',
    'services.property': 'Samun Halaltattun Filaye & Gidaje',

    // Cost Estimator
    'estimator.badge': 'Kayan Aikin Lissafi',
    'estimator.title': 'Kiyasta Kudin Ginin Ka Cikin Sauri',
    'estimator.subtitle': 'Shigar da fadin ginin ku, adadin bene, da salon kammalawa domin sanin kiyasi.',
    'estimator.cta_boq': 'Nemi Cikakken Takardar BOQ',

    // Live Tracker
    'tracker.badge': 'Dandalin Abokan Ciniki',
    'tracker.title': 'Bibiyar Ci Gaban Aikin Ka Kai Tsaye',
    'tracker.subtitle': 'Shigar da lambar lambar aikin ku domin ganin matakin aiki, gwajin kwankire, da bayanin injiniya.',
    'tracker.placeholder': 'Shigar da lambar aiki (misali: PACCF-PRJ-2026-001)...',
    'tracker.search_btn': 'Bibiya Yanzu',

    // Contact Section
    'contact.badge': 'Fara Aikin Ka',
    'contact.title': 'Tattauna Da Injiniyoyinmu Na Wurin Aiki',
    'contact.subtitle': 'Aiko mana da taswirar wurin ginin ka ko tambayoyi. Tawagar injiniyoyinmu za su ba da amsa da gaggawa.',
    'contact.full_name': 'Cikakken Sunan Ka',
    'contact.email': 'Adireshin Imel',
    'contact.phone': 'Lambar Waya / WhatsApp',
    'contact.service': 'Aikin Da Kake Bukata',
    'contact.subject': 'Kan Maganar Aiki',
    'contact.location': 'Inda Filin Ginin Yake (Gari / Karamar Hukuma)',
    'contact.budget': 'Kiyasin Kudin Da Ka Tanada',
    'contact.message': 'Cikakken Bayani Game Da Aikin',
    'contact.submit_btn': 'Aika Tambayar Aiki',
    'contact.direct_phone': 'Kira Mu Kai Tsaye',
    'contact.address': 'Hedkwatar Ofishinmu',
  },
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  currentLanguageOption: LanguageOption;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem('paccf_language');
      if (saved && ['en', 'pcm', 'yo', 'ig', 'ha'].includes(saved)) {
        return saved as LanguageCode;
      }
    } catch {
      // Fallback
    }
    return 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('paccf_language', lang);
    } catch {
      // Ignore
    }
  };

  const currentLanguageOption =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  const t = (key: string, fallback?: string): string => {
    const langDict = TRANSLATIONS[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to English
    const enDict = TRANSLATIONS.en;
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currentLanguageOption,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
