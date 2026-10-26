import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Building2, 
  Utensils, 
  FileCheck, 
  HeartPulse, 
  Cpu, 
  Award,
  Layers,
  Radio,
  Music
} from 'lucide-react';
import { speakWithFemaleVoice, stopFemaleVoice } from '../utils/speechVoice';

export interface CampusSceneChapter {
  id: string;
  name: string;
  nameTe: string;
  icon: React.ReactNode;
  startSec: number;
  endSec: number;
  image: string;
  badge: string;
  heading: string;
  caption: string;
  narrationTe: string;
  narrationEn: string;
  subtitles: {
    te: string;
    en: string;
    kn: string;
    hi: string;
  };
  features: string[];
}

export const TOTAL_DOCUMENTARY_SECONDS = 120; // Exactly 2 Minutes (02:00)

export const CAMPUS_CHAPTERS: CampusSceneChapter[] = [
  {
    id: 'chapter-classroom',
    name: 'Smart Classrooms & Analytics',
    nameTe: 'స్మార్ట్ తరగతులు & అనలిటిక్స్',
    icon: <Cpu className="w-4 h-4 text-blue-400" />,
    startSec: 0,
    endSec: 30,
    image: '/assets/aistudio/p4_dca4505d.jpeg',
    badge: '0:00 - 0:30 · Smart Lecture Theaters',
    heading: '4K Interactive Classrooms & Live Coding Studio',
    caption: 'Air-conditioned digital lecture halls equipped with 85-inch 4K interactive touch panels, dual-screen code projection, and real-time student performance analytics.',
    narrationTe: 'రెడ్డి ఆన్‌లైన్ ఎడ్యుకేషన్ 2 నిమిషాల క్యాంపస్ టూర్‌కు స్వాగతం! మన అత్యాధునిక స్మార్ట్ క్లాస్‌రూమ్‌లలో 85 అంగుళాల 4K ఇంటరాక్టివ్ స్క్రీన్స్, లైవ్ పైథాన్ మరియు ఏఐఎంఎల్ కోడింగ్ ప్రొజెక్షన్, మరియు ప్రతి విద్యార్థి ప్రాక్టీస్‌ను ట్రాక్ చేసే రియల్-టైమ్ అనలిటిక్స్ ఇక్కడ లభిస్తాయి.',
    narrationEn: 'Welcome to the 2-minute campus video and audio tour of Reddy Online Education! Explore our air-conditioned smart digital lecture halls equipped with 85-inch 4K interactive touch displays, dual-screen live code projection, and real-time student learning analytics.',
    subtitles: {
      te: 'స్మార్ట్ క్లాస్‌రూమ్‌లు: 85 అంగుళాల 4K టచ్ ప్యానెల్స్, లైవ్ కోడింగ్ ప్రొజెక్షన్ మరియు స్టూడెంట్ పెర్ఫార్మెన్స్ అనలిటిక్స్.',
      en: 'Smart Classrooms: 85-inch 4K touch displays, dual coding projection, and live student analytics.',
      kn: 'ಸ್ಮಾರ್ಟ್ ತರಗತಿ ಕೊಠಡಿಗಳು: 85 ಇಂಚಿನ 4K ಸಂವಾದಾತ್ಮಕ ಪರದೆಗಳು ಮತ್ತು ನೈಜ-ಸಮಯದ ತಂತ್ರಜ್ಞಾನ.',
      hi: 'स्मार्ट क्लासरूम: 85-इंच 4K इंटरैक्टिव टच डिस्प्ले और रीयल-टाइम कोडिंग विश्लेषण।'
    },
    features: ['85" 4K Interactive Displays', 'Live Code & Case Projection', 'Ergonomic Executive Seating', 'Acoustic Sound Insulation']
  },
  {
    id: 'chapter-canteen',
    name: 'Campus Student Canteen',
    nameTe: 'విద్యార్థుల క్యాంపస్ క్యాంటీన్',
    icon: <Utensils className="w-4 h-4 text-amber-400" />,
    startSec: 30,
    endSec: 60,
    image: '/src/assets/images/campus_student_canteen_1792998840835.jpg',
    badge: '0:30 - 1:00 · Student Dining & Cafe',
    heading: 'Reddy Student Canteen & Collaborative Study Lounge',
    caption: 'Hygienic multi-cuisine cafeteria providing fresh, nutritious meals, beverage counters, and spacious wooden dining tables designed for group study and peer discussions.',
    narrationTe: 'ఇది మన విద్యార్థుల క్యాంపస్ క్యాంటీన్ మరియు కాఫీ లాంజ్. 100 శాతం పరిశుభ్రమైన స్టీమ్ కిచెన్, పోషకమైన ఆహారం, సమతుల్య భోజనం మరియు స్నేహితులతో కలిసి గ్రూప్ స్టడీస్ చేసుకోవడానికి అనువైన హై-స్పీడ్ వై-ఫై లాంజ్ బూత్స్ ఇక్కడ ఉన్నాయి.',
    narrationEn: 'Step inside the Reddy student canteen and cafeteria lounge. Enjoying 100 percent hygienic steam-cooked nutritious meals, high-speed Wi-Fi, and spacious collaborative study breakout booths.',
    subtitles: {
      te: 'క్యాంపస్ క్యాంటీన్: పరిశుభ్రమైన ఆహారం, పోషకమైన భోజనం మరియు గ్రూప్ స్టడీ లాంజ్.',
      en: 'Campus Canteen: 100% hygienic nutritious meals, Wi-Fi, and group study booths.',
      kn: 'ಕ್ಯಾಂಪಸ್ ಕ್ಯಾಂಟೀನ್: ನೈರ್ಮಲ್ಯಕರ ಊಟ ಮತ್ತು ಅಧ್ಯಯನ ಬೂತ್‌ಗಳು.',
      hi: 'कैंपस कैंटीन: स्वच्छ, पौष्टिक भोजन और सहयोगात्मक अध्ययन लाउंज।'
    },
    features: ['100% Hygienic Steam Kitchen', 'Nutritional Balance Menu', 'High-Speed Wi-Fi Zone', 'Discussion & Study Booths']
  },
  {
    id: 'chapter-exam',
    name: 'Central Examination Hall',
    nameTe: 'సెంట్రల్ ఎగ్జామినేషన్ హాల్',
    icon: <FileCheck className="w-4 h-4 text-emerald-400" />,
    startSec: 60,
    endSec: 90,
    image: '/src/assets/images/campus_examination_hall_1792998841047.jpg',
    badge: '1:00 - 1:30 · Digital Assessment Center',
    heading: '500-Workstation Secure Examination Center',
    caption: 'State-of-the-art 500-seat digital assessment hall with individual privacy dividers, biometric candidate verification, automated AI CCTV proctoring, and gigabit LAN.',
    narrationTe: 'ఇది మన సెంట్రల్ ఎగ్జామినేషన్ హాల్. 500 మందికి పైగా విద్యార్థులు ఒకేసారి పరీక్షలు రాసేలా వ్యక్తిగత ప్రైవసీ విభజనలు, బయోమెట్రిక్ ప్రవేశం, మరియు ఏఐ సీసీటీవీ పర్యవేక్షణతో కూడిన పటిష్టమైన ఆన్‌లైన్ టెస్టింగ్ వ్యవస్థ ఇక్కడ సిద్ధంగా ఉంది.',
    narrationEn: 'Our 500-workstation central examination hall provides individual privacy dividers, biometric candidate verification, and automated proctored digital testing for board exams and certifications.',
    subtitles: {
      te: 'సెంట్రల్ ఎగ్జామినేషన్ హాల్: 500 కంప్యూటర్ టెర్మినల్స్, బయోమెట్రిక్ భద్రత, మరియు AI పర్యవేక్షణ.',
      en: 'Central Examination Hall: 500+ dedicated PC terminals, biometric access, and proctoring.',
      kn: 'ಕೇಂದ್ರೀಯ ಪರೀಕ್ಷಾ ಸಭಾಂಗಣ: 500+ ಕಂಪ್ಯೂಟರ್ ಟರ್ಮಿನಲ್‌ಗಳು ಮತ್ತು ಬಯೋಮೆಟ್ರಿಕ್ ಭದ್ರತೆ.',
      hi: 'केंद्रीय परीक्षा हॉल: 500+ कंप्यूटर टर्मिनल, बायोमेट्रिक सुरक्षा और ऑनलाइन परीक्षण।'
    },
    features: ['500+ Dedicated PC Terminals', 'Biometric Gate Access', 'AI CCTV Proctoring', 'Uninterrupted UPS Power']
  },
  {
    id: 'chapter-labs-placements',
    name: 'Healthcare Labs & Placements',
    nameTe: 'క్లినికల్ ల్యాబ్‌లు & ప్లేస్‌మెంట్స్',
    icon: <HeartPulse className="w-4 h-4 text-rose-400" />,
    startSec: 90,
    endSec: 120,
    image: '/src/assets/images/subject_bds_dentistry_1792858335505.jpg',
    badge: '1:30 - 2:00 · Labs & Life Settle Alumni',
    heading: 'Clinical Simulation Hospital & Life Settle Placements',
    caption: 'ICU simulation hospital, phantom head BDS dental operatory, and celebrated student placements across Zoho, Infosys, Nvidia partners, and NHS UK with packages up to ₹28.5 LPA.',
    narrationTe: 'మన బీఎస్సీ నర్సింగ్ మరియు బీడీఎస్ డెంటల్ సిమ్యులేషన్ ల్యాబ్‌లు, అలాగే 96.8 శాతం ప్లేస్‌మెంట్ రికార్డుతో జోహో, ఇన్ఫోసిస్, ఏథర్, మణిపాల్, మరియు లండన్ ఎన్‌హెచ్‌ఎస్‌లో గరిష్టంగా 28.5 లక్షల ప్యాకేజీలతో స్థిరపడిన విద్యార్థుల విజయాలు. మీ కలల భవిష్యత్తు కోసం ఈరోజే జాయిన్ అవ్వండి!',
    narrationEn: 'Explore our clinical nursing ICU simulation hospital, phantom head dental operatory, and celebrate our life-settled alumni placed at top tech giants and premier hospitals with packages up to 28.5 LPA. Start your journey today!',
    subtitles: {
      te: 'క్లినికల్ ల్యాబ్‌లు & ప్లేస్‌మెంట్స్: ICU సిమ్యులేటర్లు, డెంటల్ స్టేషన్లు, మరియు ₹28.5 LPA వరకు ప్యాకేజీలు.',
      en: 'Clinical Labs & Placements: ICU & dental simulators, 96.8% placement record up to ₹28.5 LPA.',
      kn: 'ಕ್ಲಿನಿಕಲ್ ಲ್ಯಾಬ್‌ಗಳು ಮತ್ತು ಪ್ಲೇಸ್‌ಮೆಂಟ್‌ಗಳು: ಐಸಿಯು ಸಿಮ್ಯುಲೇಟರ್‌ಗಳು ಮತ್ತು ₹28.5 LPA ಗರಿಷ್ಠ ಪ್ಯಾಕೇಜ್.',
      hi: 'क्लिनिकल लैब और प्लेसमेंट: आईसीयू सिमुलेटर, डेंटल स्टेशन और ₹28.5 LPA तक के पैकेज।'
    },
    features: ['ICU Simulators & Phantom Heads', '96.8% Placement Success', '₹28.5 LPA Highest Package', '450+ Global Recruiters']
  }
];

export const CampusTourVideoPlayer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.25 | 1.5>(1);
  const [selectedLanguage, setSelectedLanguage] = useState<'te' | 'en' | 'kn' | 'hi'>('te');
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isFemaleVoiceActive, setIsFemaleVoiceActive] = useState<boolean>(true);

  const lastSpokenChapterRef = useRef<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null);

  // Identify active chapter based on the continuous 0 to 120s timeline
  const activeChapterIndex = CAMPUS_CHAPTERS.findIndex(
    ch => currentTime >= ch.startSec && currentTime < ch.endSec
  );
  const safeChapterIndex = activeChapterIndex === -1 ? CAMPUS_CHAPTERS.length - 1 : activeChapterIndex;
  const activeChapter = CAMPUS_CHAPTERS[safeChapterIndex];

  // Helper to start simple gentle ambient background music using Web Audio
  const startAmbientSound = () => {
    if (typeof window === 'undefined') return;
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Stop previous nodes if any
      if (synthNodesRef.current) {
        synthNodesRef.current.osc1.stop();
        synthNodesRef.current.osc2.stop();
        synthNodesRef.current = null;
      }

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      // Gentle soothing harmonic chord (C / G)
      osc1.frequency.setValueAtTime(261.63, ctx.currentTime); // C4
      osc2.frequency.setValueAtTime(392.00, ctx.currentTime); // G4

      gain.gain.setValueAtTime(isMuted ? 0 : 0.04, ctx.currentTime);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      synthNodesRef.current = { osc1, osc2, gain };
    } catch (e) {
      // Audio autoplay policy fallback
    }
  };

  const stopAmbientSound = () => {
    if (synthNodesRef.current) {
      try {
        synthNodesRef.current.gain.gain.setValueAtTime(0, audioContextRef.current?.currentTime || 0);
        synthNodesRef.current.osc1.stop();
        synthNodesRef.current.osc2.stop();
      } catch (e) {}
      synthNodesRef.current = null;
    }
  };

  // Mute / Unmute ambient sound
  useEffect(() => {
    if (synthNodesRef.current && audioContextRef.current) {
      synthNodesRef.current.gain.gain.setValueAtTime(
        isMuted ? 0 : 0.04, 
        audioContextRef.current.currentTime
      );
    }
  }, [isMuted]);

  // Main 2-minute (120s) playback timer
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      startAmbientSound();

      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= TOTAL_DOCUMENTARY_SECONDS - 1) {
            // Loop back to start of 2 minutes
            lastSpokenChapterRef.current = null;
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    } else {
      stopAmbientSound();
      stopFemaleVoice();
    }

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, playbackSpeed]);

  // Synchronized Female Voice Narration for each 24s chapter
  useEffect(() => {
    if (!isFemaleVoiceActive || !isPlaying) {
      stopFemaleVoice();
      return;
    }

    // Only speak when entering a new chapter
    if (lastSpokenChapterRef.current !== activeChapter.id) {
      lastSpokenChapterRef.current = activeChapter.id;
      
      const narrationText = selectedLanguage === 'te' 
        ? activeChapter.narrationTe 
        : activeChapter.narrationEn;

      speakWithFemaleVoice(
        narrationText, 
        selectedLanguage === 'te' ? 'te' : 'en', 
        {
          pitch: 1.20, // Women sound pitch frequency
          rate: 0.95
        }
      );
    }
  }, [activeChapter.id, isFemaleVoiceActive, isPlaying, selectedLanguage]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      stopFemaleVoice();
      stopAmbientSound();
    };
  }, []);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetSec = Number(e.target.value);
    setCurrentTime(targetSec);
    lastSpokenChapterRef.current = null; // Re-trigger speech at seek point
  };

  const handleSelectChapter = (chapter: CampusSceneChapter) => {
    setCurrentTime(chapter.startSec);
    setIsPlaying(true);
    lastSpokenChapterRef.current = null;
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`rounded-3xl overflow-hidden bg-slate-950 text-white border border-slate-800 shadow-2xl transition-all ${
      isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'relative'
    }`}>
      
      {/* 2-MINUTE DOCUMENTARY HEADER BAR */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-slate-950 px-4 sm:px-6 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <span className="font-extrabold text-amber-300 uppercase tracking-wider text-[11px] sm:text-xs">
            2-Minute Campus Video & Audio Documentary (02:00)
          </span>
          <span className="hidden md:inline-block text-slate-400">·</span>
          <span className="hidden md:inline-block text-slate-300">
            వీడియో మరియు ఆడియో రెండూ కలిపి 2 నిమిషాల సమగ్ర టూర్
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-amber-400 font-bold bg-slate-900/90 px-2.5 py-1 rounded-lg border border-slate-800">
          <Clock className="w-3.5 h-3.5" />
          <span>{formatTime(currentTime)} / 02:00</span>
        </div>
      </div>

      {/* Main Video Canvas Stage */}
      <div className="relative aspect-[16/9] w-full bg-black overflow-hidden flex flex-col justify-between group">
        
        {/* Active Scene Background Image with Smooth Cinematic Ken-Burns Effect */}
        <img
          key={activeChapter.image}
          src={activeChapter.image}
          alt={activeChapter.heading}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-103 animate-in fade-in"
        />

        {/* Cinematic Scrim Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/70 pointer-events-none" />

        {/* Top Floating Badge & Resolution Info */}
        <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600/95 text-white text-[11px] font-black rounded-lg shadow-lg backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              CHAPTER 0{safeChapterIndex + 1} / 04
            </span>
            <span className="font-mono text-[11px] text-amber-300 bg-slate-950/85 px-2.5 py-1 rounded-lg border border-slate-800">
              {activeChapter.badge}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isFemaleVoiceActive && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-pink-950/80 text-pink-300 border border-pink-500/40 text-[10px] font-bold animate-pulse">
                <span>👩‍🏫</span>
                <span>Women Voice Audio: ON</span>
              </span>
            )}
            <div className="text-[11px] font-mono text-slate-300 bg-slate-950/80 px-2 py-1 rounded-md border border-slate-800">
              1080p · 60 FPS
            </div>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 bg-slate-950/80 hover:bg-slate-800 rounded-md text-slate-300 hover:text-white cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Center Clickable Play/Pause Overlay */}
        <div 
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
        >
          {!isPlaying && (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-2xl backdrop-blur-md transform transition-all hover:scale-110 ring-4 ring-white/20">
              <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
            </div>
          )}
        </div>

        {/* Bottom Subtitles & Active Narration Overlay */}
        <div className="relative z-10 p-4 sm:p-6 space-y-3 pointer-events-none">
          
          {/* Closed Captions Subtitle Box */}
          {showCaptions && (
            <div className="flex justify-center">
              <div className="bg-black/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700/80 max-w-3xl text-center shadow-2xl">
                <p className="text-xs sm:text-sm font-semibold text-amber-300 leading-snug">
                  {selectedLanguage === 'te' 
                    ? activeChapter.subtitles.te 
                    : selectedLanguage === 'kn'
                    ? activeChapter.subtitles.kn
                    : selectedLanguage === 'hi'
                    ? activeChapter.subtitles.hi
                    : activeChapter.subtitles.en}
                </p>
              </div>
            </div>
          )}

          {/* Facility Name & Chapter Features */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 text-white">
            <div className="space-y-1 max-w-2xl">
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{selectedLanguage === 'te' ? activeChapter.nameTe : activeChapter.name}</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                {activeChapter.heading}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {activeChapter.caption}
              </p>
            </div>

            {/* Feature Pills */}
            <div className="hidden lg:flex flex-wrap gap-1.5 max-w-md justify-end">
              {activeChapter.features.map((feat, idx) => (
                <span
                  key={idx}
                  className="text-[10px] bg-slate-900/85 border border-slate-700 text-slate-300 px-2 py-0.5 rounded-md"
                >
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* 2-MINUTE TIMELINE SCRUBBER (0:00 to 2:00) */}
          <div className="space-y-1.5 pt-2 pointer-events-auto">
            
            {/* Timeline Slider with Chapter Markers */}
            <div className="relative">
              <input
                type="range"
                min={0}
                max={TOTAL_DOCUMENTARY_SECONDS}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none"
              />

              {/* 4 Chapter Marker Dots at 0s, 30s, 60s, 90s */}
              <div className="absolute top-0 left-0 right-0 h-2 flex justify-between pointer-events-none px-0.5">
                {[0, 30, 60, 90].map((sec) => (
                  <div
                    key={sec}
                    className="w-1 h-2 bg-white/40 rounded-full"
                    title={`Chapter marker: ${formatTime(sec)}`}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300 pt-1">
              
              {/* Play / Pause, Timecode & Sound Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors cursor-pointer"
                  title={isPlaying ? 'Pause 2-Minute Tour' : 'Play 2-Minute Tour'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <div className="font-mono text-xs font-bold text-amber-300 tabular-nums">
                  {formatTime(currentTime)} <span className="text-slate-500">/</span> 02:00
                </div>

                {/* Ambient Soundbed Mute Toggle */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 hover:text-white transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute Ambient Sound' : 'Mute Ambient Sound'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>

                {/* Women Voice Audio Narration Button */}
                <button
                  onClick={() => {
                    const next = !isFemaleVoiceActive;
                    setIsFemaleVoiceActive(next);
                    if (!next) {
                      stopFemaleVoice();
                    } else {
                      lastSpokenChapterRef.current = null;
                    }
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isFemaleVoiceActive
                      ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md ring-2 ring-pink-400/50'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                  title="Women Sound (మహిళా స్వరం ఆడియో)"
                >
                  <span>👩‍🏫</span>
                  <span>{isFemaleVoiceActive ? 'Women Sound: ON' : 'Women Sound: OFF'}</span>
                </button>
              </div>

              {/* Language Switcher, Subtitles & Speed */}
              <div className="flex items-center gap-2">
                
                {/* Language Switcher */}
                <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-[10px]">
                  <button
                    onClick={() => {
                      setSelectedLanguage('te');
                      lastSpokenChapterRef.current = null;
                    }}
                    className={`px-2 py-1 rounded font-bold cursor-pointer transition-colors ${
                      selectedLanguage === 'te' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    తెలుగు
                  </button>
                  <button
                    onClick={() => {
                      setSelectedLanguage('en');
                      lastSpokenChapterRef.current = null;
                    }}
                    className={`px-2 py-1 rounded font-bold cursor-pointer transition-colors ${
                      selectedLanguage === 'en' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ENG
                  </button>
                  <button
                    onClick={() => {
                      setSelectedLanguage('kn');
                      lastSpokenChapterRef.current = null;
                    }}
                    className={`px-2 py-1 rounded font-bold cursor-pointer transition-colors ${
                      selectedLanguage === 'kn' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ಕನ್ನಡ
                  </button>
                  <button
                    onClick={() => {
                      setSelectedLanguage('hi');
                      lastSpokenChapterRef.current = null;
                    }}
                    className={`px-2 py-1 rounded font-bold cursor-pointer transition-colors ${
                      selectedLanguage === 'hi' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    हिन्दी
                  </button>
                </div>

                {/* Subtitle Toggle */}
                <button
                  onClick={() => setShowCaptions(!showCaptions)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                    showCaptions ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                  title="Toggle Closed Captions"
                >
                  CC
                </button>

                {/* Playback Speed */}
                <button
                  onClick={() => {
                    const speeds: (1 | 1.25 | 1.5)[] = [1, 1.25, 1.5];
                    const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                    setPlaybackSpeed(next);
                  }}
                  className="font-mono text-[11px] font-bold bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 hover:text-white cursor-pointer"
                  title="Playback Speed"
                >
                  {playbackSpeed}x
                </button>

              </div>

            </div>
          </div>

        </div>

      </div>

      {/* 4 CORE CHAPTERS JUMP STRIP (0:00 to 2:00 Breakdown) */}
      <div className="p-4 bg-slate-900 border-t border-slate-800">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-white">
            <Layers className="w-3.5 h-3.5 text-amber-500" />
            <span>4 Core Facilities Tour (తరగతులు, క్యాంటీన్, ఎగ్జామ్ హాల్, ప్లేస్‌మెంట్స్)</span>
          </span>
          <span className="font-mono text-[11px] text-amber-400">Total: 2 Minutes (120s · 30s each)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CAMPUS_CHAPTERS.map((chapter, idx) => {
            const isCurrent = safeChapterIndex === idx;
            return (
              <button
                key={chapter.id}
                onClick={() => handleSelectChapter(chapter)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-red-600/25 border-red-500 text-white shadow-lg ring-1 ring-red-400'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-1.5 rounded-lg border ${
                    isCurrent ? 'bg-red-600 text-white border-red-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}>
                    {chapter.icon}
                  </div>
                  <span className="font-mono text-[10px] text-amber-400 font-bold">
                    {formatTime(chapter.startSec)}
                  </span>
                </div>
                
                <div className="mt-2.5 space-y-0.5">
                  <div className="text-xs font-bold text-white line-clamp-1">
                    {selectedLanguage === 'te' ? chapter.nameTe : chapter.name}
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center justify-between">
                    <span>Facility 0{idx + 1}</span>
                    <span className="font-mono text-emerald-400 font-semibold">30s</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
