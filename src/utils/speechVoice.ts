/**
 * Speech utility configured specifically for high-clarity Female Voice (Women Sound / మహిళా స్వరం)
 * Supporting Telugu (తెలుగు) and English with fallback pitch tuning.
 */

export interface VoiceGuideScript {
  id: string;
  titleEn: string;
  titleTe: string;
  category: string;
  textEn: string;
  textTe: string;
}

export const FEMALE_VOICE_SCRIPTS: VoiceGuideScript[] = [
  {
    id: 'welcome',
    category: 'Welcome & Founder',
    titleEn: 'Welcome & Founder Sudharshan Reddy KR',
    titleTe: 'స్వాగతం & ఫౌండర్ సుదర్శన్ రెడ్డి గారి పరిచయం',
    textEn: 'Hello and a warm welcome to Reddy Online Education! I am Ramya, your virtual campus voice guide. Under the visionary leadership of our Founder and Chief Executive Officer, Sudharshan Reddy K R, our institution is empowering students across India with affordable, world-class education. Our motto is: Learn, Innovate, Succeed.',
    textTe: 'నమస్కారం! రెడ్డి ఆన్‌లైన్ ఎడ్యుకేషన్‌కు హృదయపూర్వక స్వాగతం. నేను రమ్య, మీ వర్చువల్ క్యాంపస్ వాయిస్ గైడ్‌ని. మన ఫౌండర్ మరియు సీఈఓ సుదర్శన్ రెడ్డి కే ఆర్ గారి మార్గదర్శకత్వంలో, భారతదేశం నలుమూలల విద్యార్థులకు నాణ్యమైన విద్యను అందిస్తున్నాము. మన నినాదం: నేర్చుకోండి, ఆవిష్కరించండి, విజయం సాధించండి.'
  },
  {
    id: 'campus-tour',
    category: 'Campus Facilities',
    titleEn: 'Classrooms, Canteen & Examination Hall',
    titleTe: 'తరగతులు, క్యాంటీన్ మరియు ఎగ్జామ్ హాల్ టూర్',
    textEn: 'Let me take you on a tour of our state-of-the-art campus! Our smart classrooms feature 85-inch 4K touch displays and live code projection. Our campus canteen provides nutritious, hygienic multi-cuisine food in a vibrant student lounge. Our central examination hall accommodates over 500 students with individual privacy partitions, biometric security, and gigabit testing terminals. We also have advanced clinical nursing and dental simulation laboratories.',
    textTe: 'ఇప్పుడు మన ఆధునిక క్యాంపస్ సౌకర్యాలను చూద్దాం! మన స్మార్ట్ క్లాస్‌రూమ్‌లలో 4K ఇంటరాక్టివ్ స్క్రీన్స్ మరియు లైవ్ అనలిటిక్స్ ఉన్నాయి. మన క్యాంపస్ క్యాంటీన్‌లో అత్యంత పరిశుభ్రమైన, పోషకమైన ఆహారం మరియు ఫ్రెండ్లీ స్టడీ లాంజ్ లభిస్తుంది. 500 కంటే ఎక్కువ మంది పరీక్షలు రాసే సెంట్రల్ ఎగ్జామినేషన్ హాల్ బయోమెట్రిక్ భద్రతతో ఉంది. అలాగే అత్యాధునిక బీఎస్సీ నర్సింగ్ మరియు బీడీఎస్ డెంటల్ ల్యాబ్‌లు అందుబాటులో ఉన్నాయి.'
  },
  {
    id: 'placements',
    category: 'Placements & Careers',
    titleEn: 'Life Settle Students & Placement Milestones',
    titleTe: 'జీవితంలో స్థిరపడిన విద్యార్థులు & ప్లేస్‌మెంట్స్',
    textEn: 'Reddy Online Education takes immense pride in our life-settled students! With a 96.8 percent placement rate, our alumni work in top technology giants and premier medical institutions. Our graduates have achieved packages up to 28.5 lakhs per annum, including placements at Zoho, Infosys, Nvidia partners, Ather Energy, Manipal Hospitals, Fortis Healthcare, and the National Health Service in the United Kingdom.',
    textTe: 'రెడ్డి ఆన్‌లైన్ ఎడ్యుకేషన్‌లో చదివి జీవితంలో స్థిరపడిన విద్యార్థులను చూసి మేము ఎంతో గర్విస్తున్నాము! 96.8 శాతం ప్లేస్‌మెంట్ రికార్డుతో మన విద్యార్థులు జోహో, ఇన్ఫోసిస్, ఏథర్ ఎనర్జీ, మణిపాల్ మరియు ఫోర్టిస్ హాస్పిటల్స్‌లో స్థిరపడ్డారు. లండన్ లోని ఎన్ హెచ్ ఎస్ ట్రస్ట్ నర్సింగ్ తో పాటు గరిష్టంగా 28.5 లక్షల రూపాయల వార్షిక ప్యాకేజీలు సాధించారు.'
  },
  {
    id: 'courses',
    category: 'Curriculum & Programs',
    titleEn: 'Overview of All 6 Specialised Courses',
    titleTe: 'అన్ని 6 ప్రత్యేక కోర్సుల వివరాలు',
    textEn: 'We offer six career-transforming programs: Core and Advanced Python Programming, Artificial Intelligence and Machine Learning Mastery, Bachelor of Science in Clinical Nursing, Bachelor of Dental Surgery, Higher Applied Mathematics, and Executive Communication and Leadership Skills. Each course includes structured syllabus, live classes, study notes, and direct mentorship.',
    textTe: 'మన ఇన్స్టిట్యూట్‌లో ఆరు ఉత్తమ కోర్సులు ఉన్నాయి: పైథాన్ ప్రోగ్రామింగ్, ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ అండ్ మెషిన్ లెర్నింగ్, బీఎస్సీ నర్సింగ్, బీడీఎస్ డెంటల్ సర్జరీ, హైయర్ మ్యాథమెటిక్స్, మరియు కమ్యూనికేషన్ స్కిల్స్. ప్రతి కోర్సులో లైవ్ క్లాసులు, స్టడీ మెటీరియల్స్ మరియు ప్రాక్టికల్ ట్రైనింగ్ ఉంటాయి.'
  }
];

let activeUtterance: SpeechSynthesisUtterance | null = null;

/**
 * Find the best available female voice on the user's system
 */
export const getBestFemaleVoice = (lang: 'te' | 'en' | 'hi' | 'kn'): SpeechSynthesisVoice | null => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // Language tags to search for
  const langPrefix = lang === 'te' ? 'te' : lang === 'hi' ? 'hi' : lang === 'kn' ? 'kn' : 'en';

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
  lang: 'te' | 'en' = 'te',
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
    utterance.lang = lang === 'te' ? 'te-IN' : 'en-IN';
  }

  // Women sound acoustic frequency tuning:
  // Pitch set slightly higher (~1.15 to 1.25) to naturally reproduce a bright, clear feminine voice profile
  utterance.pitch = options?.pitch ?? (lang === 'te' ? 1.15 : 1.2);
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
