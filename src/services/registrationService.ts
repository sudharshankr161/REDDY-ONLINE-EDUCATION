import { EducationLevel, EligibilityResult, StudentRegistrationRecord } from '../types';

export const QUALIFICATION_LABELS: Record<EducationLevel, { en: string; te: string }> = {
  '10th': {
    en: '10th Standard / SSLC / Matriculation (Below PUC)',
    te: '10వ తరగతి / SSLC (PUC కన్నా తక్కువ)'
  },
  'puc': {
    en: 'PUC / 10+2 / Intermediate / Higher Secondary',
    te: 'PUC / 10+2 / ఇంటర్మీడియట్ (అర్హత ఉత్తీర్ణత)'
  },
  'diploma': {
    en: 'Polytechnic / 3-Year Technical Diploma',
    te: 'పాలిటెక్నిక్ / 3 సంవత్సరాల డిప్లొమా'
  },
  'graduate': {
    en: 'Bachelor Degree (B.Sc, B.Tech, B.Com, MBBS, etc.)',
    te: 'డిగ్రీ / గ్రాడ్యుయేషన్ (B.Sc, B.Tech, B.Com, మొదలైనవి)'
  },
  'postgraduate': {
    en: 'Post-Graduate / Master Degree (M.Sc, M.Tech, MCA, MD)',
    te: 'పోస్ట్ గ్రాడ్యుయేట్ / మాస్టర్స్ డిగ్రీ'
  }
};

/**
 * Validates course admission eligibility based on student's education qualification.
 * Minimum requirement: PUC (10+2 / Intermediate).
 */
export function checkEligibility(
  qualification: EducationLevel,
  stream?: string,
  percentage?: number,
  courseId?: string
): EligibilityResult {
  const qualLabel = QUALIFICATION_LABELS[qualification]?.en || qualification;

  if (qualification === '10th') {
    return {
      isEligible: false,
      qualification,
      qualificationLabel: qualLabel,
      statusBadge: 'INELIGIBLE',
      messageEn: 'Ineligible: Minimum PUC (10+2 / Intermediate) is strictly required for admission.',
      messageTe: 'అనర్హులు: ప్రవేశానికి కనీస విద్యార్హత PUC (10+2 / ఇంటర్మీడియట్) తప్పనిసరి.',
      ruleExplanationEn: 'Reddy Online Education requires a minimum of PUC (10+2 / Intermediate / Higher Secondary) completion for university-accredited certifications and clinical programs. Candidates with only 10th standard / SSLC cannot be admitted.',
      ruleExplanationTe: 'రెడ్డి ఆన్‌లైన్ ఎడ్యుకేషన్ లో సర్టిఫికేషన్ మరియు క్లినికల్ ప్రోగ్రామ్‌లకు కనీసం PUC (10+2 / ఇంటర్మీడియట్) పాస్ అయి ఉండాలి. కేవలం 10వ తరగతి పూర్తి చేసిన విద్యార్థులకు ప్రవేశ అర్హత లేదు.'
    };
  }

  // Course specific advisory
  let extraEn = 'Meets Reddy Online Education statutory admission criteria.';
  let extraTe = 'రెడ్డి ఆన్‌లైన్ ఎడ్యుకేషన్ అధికారిక ప్రవేశ అర్హత ప్రమాణాలను పూర్తి చేశారు.';

  if (courseId === 'bsc-nursing-clinical' || courseId === 'bds-dentistry-clinical') {
    extraEn += ' Medical/Clinical programs require PUC with Science (Physics, Chemistry, Biology) background.';
    extraTe += ' మెడికల్/క్లినికల్ ప్రోగ్రామ్‌ల కొరకు సైన్స్ (ఫిజిక్స్, కెమిస్ట్రీ, బయాలజీ) సబ్జెక్టులు సిఫార్సు చేయబడ్డాయి.';
  } else if (courseId === 'aiml-engineering-mastery' || courseId === 'advanced-mathematics') {
    extraEn += ' Analytical curriculum aligned with PUC Mathematics background.';
    extraTe += ' మ్యాథమెటిక్స్ సిలబస్‌తో సాంకేతిక శిక్షణకు తగిన అర్హత.';
  }

  return {
    isEligible: true,
    qualification,
    qualificationLabel: qualLabel,
    statusBadge: 'ELIGIBLE',
    messageEn: 'Eligible: Minimum academic qualification (PUC / 10+2) verified successfully.',
    messageTe: 'అర్హులు: కనీస విద్యార్హత (PUC / 10+2) విజయవంతంగా ధృవీకరించబడింది.',
    ruleExplanationEn: extraEn,
    ruleExplanationTe: extraTe
  };
}

const STORAGE_KEY = 'reddy_online_education_registrations_v1';

// Initial pre-populated registered students directory
const SEED_REGISTRATIONS: StudentRegistrationRecord[] = [
  {
    id: 'reg-2026-001',
    applicationNo: 'ROE-2026-REG-8012',
    studentName: 'Ananya Sharma',
    email: 'ananya.sharma@reddyeducation.online',
    phone: '+91 98450 71234',
    city: 'Bengaluru',
    state: 'Karnataka',
    qualification: 'puc',
    qualificationLabel: 'PUC / 10+2 / Intermediate',
    stream: 'Science (PCMC - Physics, Chem, Math, Comp)',
    pucPercentage: 92.4,
    passingYear: '2024',
    collegeName: 'MES Pre-University College of Arts, Commerce & Science',
    boardOrUniversity: 'Department of Pre-University Education Karnataka',
    appliedCourseId: 'python-core-advanced',
    appliedCourseName: 'Python Programming & Software Engineering',
    isEligible: true,
    eligibilityBadge: 'ELIGIBLE',
    eligibilityRemarks: 'PUC Science with Distinction (92.4%). Meets technical prerequisite.',
    status: 'Admission Confirmed',
    feeStatus: 'Paid',
    feePaidINR: 4128.82,
    registeredAt: '2026-09-15T14:32:10Z',
    registeredAtFormatted: '15 Sep 2026, 02:32 PM'
  },
  {
    id: 'reg-2026-002',
    applicationNo: 'ROE-2026-REG-8018',
    studentName: 'Dr. Karthik Reddy',
    email: 'karthik.bds@reddyeducation.online',
    phone: '+91 97410 88219',
    city: 'Hyderabad',
    state: 'Telangana',
    qualification: 'graduate',
    qualificationLabel: 'Bachelor Degree (BDS)',
    stream: 'Dental Surgery & Clinical Medicine',
    pucPercentage: 88.5,
    passingYear: '2021',
    collegeName: 'Narayana Dental College & Hospital',
    boardOrUniversity: 'KNR University of Health Sciences',
    appliedCourseId: 'bds-dentistry-clinical',
    appliedCourseName: 'BDS Clinical Dentistry & Oral Maxillofacial Surgery',
    isEligible: true,
    eligibilityBadge: 'ELIGIBLE',
    eligibilityRemarks: 'BDS Degree holder with PUC Science background. Fully qualified for advanced clinical fellowship.',
    status: 'Admission Confirmed',
    feeStatus: 'Paid',
    feePaidINR: 5898.82,
    registeredAt: '2026-08-10T09:20:00Z',
    registeredAtFormatted: '10 Aug 2026, 09:20 AM'
  },
  {
    id: 'reg-2026-003',
    applicationNo: 'ROE-2026-REG-8025',
    studentName: 'Sai Teja Mandava',
    email: 'saiteja.aiml@gmail.com',
    phone: '+91 99081 23456',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    qualification: 'puc',
    qualificationLabel: 'PUC / 10+2 / Intermediate',
    stream: 'Science (MPC - Math, Physics, Chemistry)',
    pucPercentage: 94.2,
    passingYear: '2025',
    collegeName: 'Sri Chaitanya Junior College',
    boardOrUniversity: 'Board of Intermediate Education AP (BIEAP)',
    appliedCourseId: 'aiml-engineering-mastery',
    appliedCourseName: 'AI & Machine Learning Engineering Mastery',
    isEligible: true,
    eligibilityBadge: 'ELIGIBLE',
    eligibilityRemarks: 'PUC MPC top scorer with strong linear algebra foundation. Eligible.',
    status: 'Admission Confirmed',
    feeStatus: 'Partial / 1st Installment',
    feePaidINR: 3500.00,
    registeredAt: '2026-10-02T11:15:00Z',
    registeredAtFormatted: '02 Oct 2026, 11:15 AM'
  },
  {
    id: 'reg-2026-004',
    applicationNo: 'ROE-2026-REG-8031',
    studentName: 'Bhavani K',
    email: 'bhavani.nursing@gmail.com',
    phone: '+91 98481 99201',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    qualification: 'puc',
    qualificationLabel: 'PUC / 10+2 / Intermediate',
    stream: 'Science (Bi.P.C - Biology, Physics, Chemistry)',
    pucPercentage: 86.0,
    passingYear: '2024',
    collegeName: 'Narayana Junior College',
    boardOrUniversity: 'Board of Intermediate Education AP',
    appliedCourseId: 'bsc-nursing-clinical',
    appliedCourseName: 'BSc Nursing Clinical Practice & Patient Care',
    isEligible: true,
    eligibilityBadge: 'ELIGIBLE',
    eligibilityRemarks: 'PUC Bi.P.C passed with 86%. Eligible for nursing clinical training.',
    status: 'Admission Confirmed',
    feeStatus: 'Paid',
    feePaidINR: 5308.82,
    registeredAt: '2026-10-05T16:45:00Z',
    registeredAtFormatted: '05 Oct 2026, 04:45 PM'
  },
  {
    id: 'reg-2026-005',
    applicationNo: 'ROE-2026-REG-8039',
    studentName: 'Ramesh Naidu (Applicant)',
    email: 'ramesh.naidu2009@gmail.com',
    phone: '+91 94401 55678',
    city: 'Kurnool',
    state: 'Andhra Pradesh',
    qualification: '10th',
    qualificationLabel: '10th Standard / SSLC (Below PUC)',
    stream: 'General Secondary Education',
    pucPercentage: 68.0,
    passingYear: '2024',
    collegeName: 'Zilla Parishad High School',
    boardOrUniversity: 'Board of Secondary Education AP (SSC)',
    appliedCourseId: 'python-core-advanced',
    appliedCourseName: 'Python Programming & Software Engineering',
    isEligible: false,
    eligibilityBadge: 'INELIGIBLE',
    eligibilityRemarks: '❌ INELIGIBLE: Has only 10th standard SSC. Minimum requirement is PUC (10+2 / Intermediate). Advised to complete PUC first.',
    status: 'Ineligible - Rejected',
    feeStatus: 'N/A (Ineligible)',
    feePaidINR: 0,
    registeredAt: '2026-10-12T10:10:00Z',
    registeredAtFormatted: '12 Oct 2026, 10:10 AM'
  },
  {
    id: 'reg-2026-006',
    applicationNo: 'ROE-2026-REG-8044',
    studentName: 'Suresh Kumar G',
    email: 'suresh.kumar.g@gmail.com',
    phone: '+91 96112 33455',
    city: 'Mysuru',
    state: 'Karnataka',
    qualification: '10th',
    qualificationLabel: '10th Standard / SSLC (Below PUC)',
    stream: 'Secondary School Leaving Certificate (SSLC)',
    pucPercentage: 62.5,
    passingYear: '2023',
    collegeName: 'Government High School Mysuru',
    boardOrUniversity: 'KSEEB Karnataka',
    appliedCourseId: 'bsc-nursing-clinical',
    appliedCourseName: 'BSc Nursing Clinical Practice & Patient Care',
    isEligible: false,
    eligibilityBadge: 'INELIGIBLE',
    eligibilityRemarks: '❌ INELIGIBLE: Cannot admit into Clinical Nursing with SSLC only. Minimum PUC Science (PCB) required by regulatory standards.',
    status: 'Ineligible - Rejected',
    feeStatus: 'N/A (Ineligible)',
    feePaidINR: 0,
    registeredAt: '2026-10-18T14:22:00Z',
    registeredAtFormatted: '18 Oct 2026, 02:22 PM'
  },
  {
    id: 'reg-2026-007',
    applicationNo: 'ROE-2026-REG-8052',
    studentName: 'Mohammed Zeeshan',
    email: 'zeeshan.comm@gmail.com',
    phone: '+91 97003 44556',
    city: 'Warangal',
    state: 'Telangana',
    qualification: 'diploma',
    qualificationLabel: 'Polytechnic / 3-Year Diploma',
    stream: 'Diploma in Computer Engineering',
    pucPercentage: 81.3,
    passingYear: '2023',
    collegeName: 'Government Polytechnic College',
    boardOrUniversity: 'State Board of Technical Education Telangana',
    appliedCourseId: 'communication-leadership',
    appliedCourseName: 'Professional Communication & Corporate Leadership',
    isEligible: true,
    eligibilityBadge: 'ELIGIBLE',
    eligibilityRemarks: '3-Year Technical Diploma recognized equivalent to 10+2. Eligible for leadership certification.',
    status: 'Provisionally Eligible',
    feeStatus: 'Pending Payment',
    feePaidINR: 0,
    registeredAt: '2026-10-22T08:50:00Z',
    registeredAtFormatted: '22 Oct 2026, 08:50 AM'
  },
  {
    id: 'reg-2026-008',
    applicationNo: 'ROE-2026-REG-8060',
    studentName: 'Divya M K',
    email: 'divya.maths@reddyeducation.online',
    phone: '+91 98860 11223',
    city: 'Hubballi',
    state: 'Karnataka',
    qualification: 'puc',
    qualificationLabel: 'PUC / 10+2 / Intermediate',
    stream: 'Science (PCMB)',
    pucPercentage: 90.5,
    passingYear: '2024',
    collegeName: 'KLE Society Prerana PU College',
    boardOrUniversity: 'Karnataka PU Board',
    appliedCourseId: 'advanced-mathematics',
    appliedCourseName: 'Higher Engineering Mathematics & Statistics',
    isEligible: true,
    eligibilityBadge: 'ELIGIBLE',
    eligibilityRemarks: 'PUC PCMB with 90.5%. Verified eligible for Higher Mathematics program.',
    status: 'Admission Confirmed',
    feeStatus: 'Paid',
    feePaidINR: 3500.00,
    registeredAt: '2026-10-24T12:05:00Z',
    registeredAtFormatted: '24 Oct 2026, 12:05 PM'
  }
];

export function getStoredRegistrations(): StudentRegistrationRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading registered students:', err);
  }
  // Initialize with seed
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_REGISTRATIONS));
  return SEED_REGISTRATIONS;
}

export function saveNewRegistration(
  record: Omit<StudentRegistrationRecord, 'id' | 'applicationNo' | 'registeredAt' | 'registeredAtFormatted'>
): StudentRegistrationRecord {
  const currentList = getStoredRegistrations();
  const now = new Date();
  const randomAppNum = Math.floor(8000 + Math.random() * 1999);
  const applicationNo = `ROE-2026-REG-${randomAppNum}`;
  const id = `reg-${Date.now()}`;

  const newRecord: StudentRegistrationRecord = {
    ...record,
    id,
    applicationNo,
    registeredAt: now.toISOString(),
    registeredAtFormatted: now.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  };

  const updated = [newRecord, ...currentList];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newRecord;
}

export function deleteRegistration(id: string): StudentRegistrationRecord[] {
  const currentList = getStoredRegistrations();
  const updated = currentList.filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function resetRegistrationsToSeed(): StudentRegistrationRecord[] {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_REGISTRATIONS));
  return SEED_REGISTRATIONS;
}
