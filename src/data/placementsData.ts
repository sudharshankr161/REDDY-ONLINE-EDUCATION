export interface PlacedStudent {
  id: string;
  name: string;
  courseId: string;
  courseName: string;
  category: 'technology' | 'mathematics' | 'healthcare' | 'dental' | 'communication';
  batch: string;
  designation: string;
  companyOrHospital: string;
  companyLogoText: string;
  packageOrAppointment: string;
  location: string;
  avatarBg: string;
  quote: string;
  settledStory: string;
}

export interface PlacementStat {
  label: string;
  value: string;
  subtext: string;
}

export const PLACEMENT_STATS: PlacementStat[] = [
  {
    label: 'Overall Placement Rate',
    value: '96.8%',
    subtext: 'Across all engineering, clinical, & science batches'
  },
  {
    label: 'Highest Package Offered',
    value: '₹28.5 LPA',
    subtext: 'AIML & Neural Systems Engineering Division'
  },
  {
    label: 'Average Annual Package',
    value: '₹7.4 LPA',
    subtext: 'Consistent across tech, corporate, & clinical domains'
  },
  {
    label: 'Hospital & MNC Partners',
    value: '450+ Companies',
    subtext: 'Apollo, Manipal, TCS, Infosys, Zoho, Fortis, NHS UK'
  }
];

export const PLACED_STUDENTS_DATA: PlacedStudent[] = [
  // 1. Python Programming
  {
    id: 'st-py-01',
    name: 'Vikramaditya Hegde',
    courseId: 'python-core-advanced',
    courseName: 'Python Programming & Software Engineering',
    category: 'technology',
    batch: 'Batch 2025-B',
    designation: 'Senior Backend Python Architect',
    companyOrHospital: 'Zoho Corporation',
    companyLogoText: 'ZOHO',
    packageOrAppointment: '₹14.2 LPA',
    location: 'Chennai / Bengaluru',
    avatarBg: 'bg-blue-600',
    quote: 'Sudharshan Reddy Sir taught us Python memory models and async microservices in a way no textbook ever could. I secured a dream job right after my final assessment.',
    settledStory: 'Transitioned from a non-CS background into core enterprise backend development with zero prior coding experience.'
  },
  {
    id: 'st-py-02',
    name: 'Pooja Venkatesh',
    courseId: 'python-core-advanced',
    courseName: 'Python Programming & Software Engineering',
    category: 'technology',
    batch: 'Batch 2025-C',
    designation: 'Cloud API & Microservices Engineer',
    companyOrHospital: 'Infosys Tech Labs',
    companyLogoText: 'INFOSYS',
    packageOrAppointment: '₹9.8 LPA',
    location: 'Bengaluru, India',
    avatarBg: 'bg-indigo-600',
    quote: 'The real-world projects and mock interviews by CEO Sudharshan Reddy Sir gave me the technical confidence to clear 4 rounds in one week.',
    settledStory: 'Successfully placed with full benefits and family relocation allowance.'
  },

  // 2. AIML
  {
    id: 'st-aiml-01',
    name: 'Rahul R. Nair',
    courseId: 'aiml-engineering-mastery',
    courseName: 'AIML: Artificial Intelligence & Machine Learning',
    category: 'technology',
    batch: 'Batch 2025-A',
    designation: 'Machine Learning Systems Specialist',
    companyOrHospital: 'Nvidia AI Ecosystem Partner',
    companyLogoText: 'NVIDIA',
    packageOrAppointment: '₹24.0 LPA',
    location: 'Hyderabad / Remote',
    avatarBg: 'bg-emerald-600',
    quote: 'Learning LoRA fine-tuning and PyTorch autograd directly through Reddy Online Education made me stand out from thousands of applicants.',
    settledStory: 'Life settled with a high-paying AI research career and patent publication grant.'
  },
  {
    id: 'st-aiml-02',
    name: 'Shweta Kulkarni',
    courseId: 'aiml-engineering-mastery',
    courseName: 'AIML: Artificial Intelligence & Machine Learning',
    category: 'technology',
    batch: 'Batch 2025-C',
    designation: 'Computer Vision Engineer',
    companyOrHospital: 'Ather Energy Autonomous Labs',
    companyLogoText: 'ATHER',
    packageOrAppointment: '₹16.5 LPA',
    location: 'Bengaluru, India',
    avatarBg: 'bg-teal-600',
    quote: 'The deep learning curriculum was intense and practical. Chancellor Sudharshan Reddy Sir personally helped polish my portfolio.',
    settledStory: 'Working on intelligent edge vision algorithms for electric mobility.'
  },

  // 3. BSc Nursing
  {
    id: 'st-nur-01',
    name: 'Ananya S. Rao',
    courseId: 'bsc-nursing-clinical',
    courseName: 'BSc Nursing Clinical Practice & Patient Care',
    category: 'healthcare',
    batch: 'Batch 2025-A',
    designation: 'Senior ICU Critical Care Nursing Specialist',
    companyOrHospital: 'Manipal Hospitals Super Specialty',
    companyLogoText: 'MANIPAL',
    packageOrAppointment: '₹8.6 LPA + Housing',
    location: 'Bengaluru, India',
    avatarBg: 'bg-rose-600',
    quote: 'The clinical triage simulation and arterial blood gas modules in Reddy Online Education gave me a huge edge during hospital rounds.',
    settledStory: 'Directly appointed to Lead ICU ward with government hospital pension qualification.'
  },
  {
    id: 'st-nur-02',
    name: 'Blessy Mathew',
    courseId: 'bsc-nursing-clinical',
    courseName: 'BSc Nursing Clinical Practice & Patient Care',
    category: 'healthcare',
    batch: 'Batch 2024-B',
    designation: 'Registered Nurse (Emergency Ward)',
    companyOrHospital: 'NHS Trust Hospitals (United Kingdom)',
    companyLogoText: 'NHS UK',
    packageOrAppointment: '£36,500 / yr (~₹38 LPA)',
    location: 'London, United Kingdom',
    avatarBg: 'bg-sky-600',
    quote: 'CEO Sudharshan Reddy Sir helped me clear my international OSCE simulation exams with flying colors. My life and family are completely settled in the UK.',
    settledStory: 'Relocated to London under international healthcare fast-track visa sponsorship.'
  },

  // 4. BDS Dental Surgery
  {
    id: 'st-bds-01',
    name: 'Dr. Karthik Reddy, BDS',
    courseId: 'bds-dentistry-clinical',
    courseName: 'BDS Clinical Dentistry & Oral Surgery',
    category: 'dental',
    batch: 'Batch 2025-A',
    designation: 'Consultant Dental Surgeon & Clinic Founder',
    companyOrHospital: 'Reddy Multi-Specialty Dental Clinic',
    companyLogoText: 'DENTAL',
    packageOrAppointment: 'Private Clinic Owner (₹22 LPA Net)',
    location: 'Mysuru, Karnataka',
    avatarBg: 'bg-amber-600',
    quote: 'The endodontic rotary canal atlas and surgical exodontia case modules guided me from internship to opening my own successful 4-chair clinic.',
    settledStory: 'Established premier dental operatory practice serving over 300 patients every month.'
  },
  {
    id: 'st-bds-02',
    name: 'Dr. Sneha George, BDS',
    courseId: 'bds-dentistry-clinical',
    courseName: 'BDS Clinical Dentistry & Oral Surgery',
    category: 'dental',
    batch: 'Batch 2025-B',
    designation: 'Senior Hospital Dental Officer',
    companyOrHospital: 'Fortis Healthcare Dental Department',
    companyLogoText: 'FORTIS',
    packageOrAppointment: '₹12.5 LPA',
    location: 'Bengaluru, India',
    avatarBg: 'bg-cyan-600',
    quote: 'The radiographic diagnostic quiz and nerve block protocols provided the real clinical confidence required in corporate hospital dentistry.',
    settledStory: 'Promoted to Head of Conservative Dentistry and Outpatient Operatory.'
  },

  // 5. Higher & Applied Mathematics
  {
    id: 'st-math-01',
    name: 'Arjun Swaminathan',
    courseId: 'higher-applied-mathematics',
    courseName: 'Higher & Applied Mathematics for Engineers',
    category: 'mathematics',
    batch: 'Batch 2025-B',
    designation: 'Quantitative Risk & Computational Analyst',
    companyOrHospital: 'ICICI Securities Quantitative Desk',
    companyLogoText: 'ICICI',
    packageOrAppointment: '₹15.8 LPA',
    location: 'Mumbai, India',
    avatarBg: 'bg-emerald-700',
    quote: 'Sudharshan Reddy Sir made calculus and linear algebra intuitive through visual geometric models. That mathematical mastery cleared my quant interviews.',
    settledStory: 'Building algorithmic risk models for equity derivative trading desks.'
  },
  {
    id: 'st-math-02',
    name: 'Deepak Mohan',
    courseId: 'higher-applied-mathematics',
    courseName: 'Higher & Applied Mathematics for Engineers',
    category: 'mathematics',
    batch: 'Batch 2024-C',
    designation: 'Junior Scientist / Research Fellow (GATE AIR 32)',
    companyOrHospital: 'Indian Space Research Organisation (ISRO)',
    companyLogoText: 'ISRO',
    packageOrAppointment: 'Govt. Class-A Scientist Scale',
    location: 'Bengaluru / Sriharikota',
    avatarBg: 'bg-purple-600',
    quote: 'The differential equations and Laplace transformation worksheets were directly aligned with competitive engineering papers. Proud to serve the nation.',
    settledStory: 'Secured Top 50 All-India Rank and joined national aerospace propulsion research.'
  },

  // 6. Executive Communication Skills
  {
    id: 'st-comm-01',
    name: 'Meenakshi Iyer',
    courseId: 'communication-leadership-skills',
    courseName: 'Executive Communication & Soft Skills',
    category: 'communication',
    batch: 'Batch 2025-A',
    designation: 'Corporate Communications & PR Manager',
    companyOrHospital: 'Deloitte India Advisory',
    companyLogoText: 'DELOITTE',
    packageOrAppointment: '₹13.4 LPA',
    location: 'Hyderabad, India',
    avatarBg: 'bg-violet-600',
    quote: 'I used to freeze during boardroom presentations. Sudharshan Reddy Sir taught us the Minto Pyramid Principle and the 3-step impromptu framework that transformed my career.',
    settledStory: 'Now leading international stakeholder presentations for Fortune 500 accounts.'
  },
  {
    id: 'st-comm-02',
    name: 'Farhan Akhtar Qureshi',
    courseId: 'communication-leadership-skills',
    courseName: 'Executive Communication & Soft Skills',
    category: 'communication',
    batch: 'Batch 2025-C',
    designation: 'Senior HR Business Partner & Talent Lead',
    companyOrHospital: 'Amazon India Operations',
    companyLogoText: 'AMAZON',
    packageOrAppointment: '₹17.0 LPA',
    location: 'Bengaluru, India',
    avatarBg: 'bg-amber-700',
    quote: 'The salary negotiation and STAR behavioral interview practice in Reddy Online Education doubled my package during lateral transition.',
    settledStory: 'Leading leadership recruitment and campus hiring for multi-thousand employee clusters.'
  }
];
