export interface OfficialWebsiteLink {
  id: string;
  category: 'core_portals' | 'academic_departments' | 'founder_desk' | 'student_services';
  title: string;
  url: string;
  displayUrl: string;
  description: string;
  badge?: string;
}

export const OFFICIAL_WEBSITE_LINKS: OfficialWebsiteLink[] = [
  {
    id: 'link-portal',
    category: 'core_portals',
    title: 'Student Learning Management Portal (LMS)',
    url: 'https://reddyeducation.online/student-portal',
    displayUrl: 'reddyeducation.online/student-portal',
    description: 'Personalized dashboard for tracking course completion, video lectures, test scores, and batch announcements.',
    badge: 'Primary Portal'
  },
  {
    id: 'link-enroll',
    category: 'core_portals',
    title: 'Online Course Registration & Enrollment Portal',
    url: 'https://reddyeducation.online/courses',
    displayUrl: 'reddyeducation.online/courses',
    description: 'Browse curriculum, view syllabus breakdowns, check batch schedules, and apply for admissions.',
    badge: 'Admissions Open'
  },
  {
    id: 'link-payment',
    category: 'core_portals',
    title: 'Fee Payment, Installment & Scholarship Gateway',
    url: 'https://reddyeducation.online/fee-payment',
    displayUrl: 'reddyeducation.online/fee-payment',
    description: 'Secure UPI, Card, Netbanking fee processing with REDDY2026 scholarship promo code and instant tax receipts.',
    badge: 'Instant Receipt'
  },
  {
    id: 'link-live',
    category: 'core_portals',
    title: 'Interactive Virtual Classroom & Live Streaming',
    url: 'https://reddyeducation.online/live-classes',
    displayUrl: 'reddyeducation.online/live-classes',
    description: 'Join real-time interactive lectures, participate in live doubts clearing, Q&A polls, and whiteboard sessions.',
    badge: 'Live Interactive'
  },
  {
    id: 'link-library',
    category: 'core_portals',
    title: 'Digital Library & Downloadable Study Materials',
    url: 'https://reddyeducation.online/study-materials',
    displayUrl: 'reddyeducation.online/study-materials',
    description: 'Instant download of clinical handbooks, formula sheets, Python repositories, and dental surgery atlases.',
    badge: 'Free for Enrolled'
  },
  {
    id: 'link-verify',
    category: 'core_portals',
    title: 'Official Certificate Verification Registry',
    url: 'https://reddyeducation.online/verify-certificate',
    displayUrl: 'reddyeducation.online/verify-certificate',
    description: 'Public blockchain-verified digital credential lookup signed by Founder & CEO Sudharshan Reddy K R.',
    badge: 'Accredited'
  },
  // Academic Departments
  {
    id: 'link-py',
    category: 'academic_departments',
    title: 'Department of Python & Software Engineering',
    url: 'https://reddyeducation.online/curriculum/python-301',
    displayUrl: 'reddyeducation.online/curriculum/python-301',
    description: 'Full-stack Python, Django, FastAPI microservices, and automated testing curriculum.'
  },
  {
    id: 'link-math',
    category: 'academic_departments',
    title: 'Department of Higher & Applied Mathematics',
    url: 'https://reddyeducation.online/curriculum/maths-202',
    displayUrl: 'reddyeducation.online/curriculum/maths-202',
    description: 'Calculus, linear algebra, Laplace transforms, and engineering computational problem sets.'
  },
  {
    id: 'link-nursing',
    category: 'academic_departments',
    title: 'Clinical Nursing Council & Simulation Lab',
    url: 'https://reddyeducation.online/curriculum/nursing-401',
    displayUrl: 'reddyeducation.online/curriculum/nursing-401',
    description: 'INC-aligned nursing modules, ICU protocols, pharmacology administration, and OSCE triage training.'
  },
  {
    id: 'link-bds',
    category: 'academic_departments',
    title: 'Dental Sciences & Maxillofacial Operatory',
    url: 'https://reddyeducation.online/curriculum/bds-501',
    displayUrl: 'reddyeducation.online/curriculum/bds-501',
    description: '3D crown morphology, endodontic canal rotary instrumentation, and local anesthesia masterclasses.'
  },
  {
    id: 'link-aiml',
    category: 'academic_departments',
    title: 'Artificial Intelligence & Neural Systems Lab',
    url: 'https://reddyeducation.online/curriculum/aiml-601',
    displayUrl: 'reddyeducation.online/curriculum/aiml-601',
    description: 'PyTorch deep learning, computer vision, attention transformers, and LLM fine-tuning pipelines.'
  },
  {
    id: 'link-comm',
    category: 'academic_departments',
    title: 'Center for Executive Communication & Soft Skills',
    url: 'https://reddyeducation.online/curriculum/comm-101',
    displayUrl: 'reddyeducation.online/curriculum/comm-101',
    description: 'The Minto Pyramid Principle, STAR behavioral interview training, and confident public speaking.'
  },
  // Founder Desk & Support
  {
    id: 'link-founder',
    category: 'founder_desk',
    title: 'Founder & CEO Directorate Desk - Sudharshan Reddy K R',
    url: 'https://reddyeducation.online/founder-ceo-sudharshan-reddy',
    displayUrl: 'reddyeducation.online/founder-ceo-sudharshan-reddy',
    description: 'Academic mission, direct student mentoring notes, institutional partnerships, and leadership address.',
    badge: 'Founder Desk'
  },
  {
    id: 'link-helpdesk',
    category: 'student_services',
    title: '24/7 Student Grievance & WhatsApp Support Helpline',
    url: 'https://wa.me/919880012345?text=Hi%20Reddy%20Online%20Education%20Team',
    displayUrl: 'wa.me/919880012345',
    description: 'Instant student assistance with enrollment, class links, doubt clarification, and receipt dispatch.'
  },
  {
    id: 'link-placement',
    category: 'student_services',
    title: 'Placement, Residency & Internship Cell',
    url: 'https://reddyeducation.online/placements',
    displayUrl: 'reddyeducation.online/placements',
    description: 'Corporate recruitment drives in tech and clinical hospital attachments for nursing and dental candidates.'
  }
];
