/**
 * Speech utility configured specifically for high-clarity Female Voice (Women Sound)
 * Tuned with gentle acoustic pitch and steady pace for educational clarity.
 */

export interface VoiceGuideScript {
  id: string;
  titleEn: string;
  category: string;
  textEn: string;
}

export const FEMALE_VOICE_SCRIPTS: VoiceGuideScript[] = [
  {
    id: 'welcome',
    category: 'Welcome & Founder',
    titleEn: 'Welcome & Founder Sudharshan Reddy KR',
    textEn: 'Hello and a warm welcome to Reddy Online Education! I am Ramya, your virtual campus voice guide. Under the visionary leadership of our Founder and Chief Executive Officer, Sudharshan Reddy K R, our institution is empowering students across India with affordable, world-class education. Our motto is: Learn, Innovate, Succeed.'
  },
  {
    id: 'campus-tour',
    category: 'Campus Facilities',
    titleEn: 'Classrooms, Canteen & Examination Hall',
    textEn: 'Let me take you on a tour of our state-of-the-art campus! Our smart classrooms feature 85-inch 4K touch displays and live code projection. Our campus canteen provides nutritious, hygienic multi-cuisine food in a vibrant student lounge. Our central examination hall accommodates over 500 students with individual privacy partitions, biometric security, and gigabit testing terminals. We also have advanced clinical nursing and dental simulation laboratories.'
  },
  {
    id: 'placements',
    category: 'Placements & Careers',
    titleEn: 'Life Settle Students & Placement Milestones',
    textEn: 'Reddy Online Education takes immense pride in our life-settled students! With a 96.8 percent placement rate, our alumni work in top technology giants and premier medical institutions. Our graduates have achieved packages up to 28.5 lakhs per annum, including placements at Zoho, Infosys, Nvidia partners, Ather Energy, Manipal Hospitals, Fortis Healthcare, and the National Health Service in the United Kingdom.'
  },
  {
    id: 'courses',
    category: 'Curriculum & Programs',
    titleEn: 'Overview of All 6 Specialised Courses',
    textEn: 'We offer six career-transforming programs: Core and Advanced Python Programming, Artificial Intelligence and Machine Learning Mastery, Bachelor of Science in Clinical Nursing, Bachelor of Dental Surgery, Higher Applied Mathematics, and Executive Communication and Leadership Skills. Each course includes structured syllabus, live classes, study notes, and direct mentorship.'
  },
  {
    id: 'puc-eligibility',
    category: 'Admissions & Eligibility',
    titleEn: 'Minimum PUC Eligibility & Student Registry',
    textEn: 'Admissions guideline notice: Reddy Online Education strictly requires a minimum qualification of PUC (10+2 or Intermediate) for all university programs. Candidates with only 10th standard are ineligible for accredited certifications. All enrolled students and their applied courses are stored in our transparent Admissions Directory.'
  }
];

let activeUtterance: SpeechSynthesisUtterance | null = null;

/**
 * Find the best available female voice on the user's system
 */
export const getBestFemaleVoice = (lang: string = 'en'): SpeechSynthesisVoice | null => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // Language tags to search for
  const langPrefix = lang.toLowerCase().slice(0, 2);

  // Female voice keyword indicators
  const femaleKeywords = [
    'female', 'woman', 'zira', 'swara', 'heera', 'sunita', 
    'veena', 'priya', 'samantha', 'kavya', 'geeta', 'shruti',
    'natural', 'google', 'microsoft', 'aditi', 'kiran'
  ];

  // 1. First, search for female voice matching language
  const langMatchingVoices = voices.filter(v => v.lang.toLowerCase().startsWith(langPrefix));
  
  const femaleLangVoice = langMatchingVoices.find(v => {
    const nameLower = v.name.toLowerCase();
    return femaleKeywords.some(keyword => nameLower.includes(keyword));
  });
  if (femaleLangVoice) return femaleLangVoice;

  // 2. Return any voice in the requested language
  if (langMatchingVoices.length > 0) {
    return langMatchingVoices[0];
  }

  // 3. Fallback: Search for any Indian English female or general female voice
  const indianFemale = voices.find(v => {
    const name = v.name.toLowerCase();
    return (v.lang.toLowerCase().includes('en-in') || v.lang.toLowerCase().includes('in')) &&
      femaleKeywords.some(k => name.includes(k));
  });
  if (indianFemale) return indianFemale;

  const generalFemale = voices.find(v => {
    const name = v.name.toLowerCase();
    return femaleKeywords.some(k => name.includes(k));
  });
  if (generalFemale) return generalFemale;

  // 4. Default to any English voice
  return voices.find(v => v.lang.toLowerCase().startsWith('en')) || voices[0] || null;
};

/**
 * Speak text using a gentle, clear female voice (Women sound)
 */
export const speakWithFemaleVoice = (
  text: string, 
  lang: string = 'en',
  options?: {
    rate?: number;
    pitch?: number;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err: any) => void;
  }
) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  // Stop any active speech first
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  activeUtterance = utterance;

  // Select language and female voice
  const voice = getBestFemaleVoice(lang);
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  } else {
    utterance.lang = 'en-IN';
  }

  // Women sound acoustic frequency tuning:
  // Pitch set slightly higher (~1.20) to naturally reproduce a bright, clear feminine voice profile
  utterance.pitch = options?.pitch ?? 1.2;
  utterance.rate = options?.rate ?? 0.95; // Steady and comfortable speed for educational clarity
  utterance.volume = 1.0;

  utterance.onstart = () => {
    options?.onStart?.();
  };

  utterance.onend = () => {
    activeUtterance = null;
    options?.onEnd?.();
  };

  utterance.onerror = (e) => {
    activeUtterance = null;
    options?.onError?.(e);
  };

  window.speechSynthesis.speak(utterance);
};

export const stopFemaleVoice = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    activeUtterance = null;
  }
};

export const isFemaleVoiceSpeaking = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    return window.speechSynthesis.speaking;
  }
  return false;
};
