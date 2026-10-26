import React, { useState } from 'react';
import { 
  X, 
  Award, 
  Trophy, 
  CheckCircle2, 
  Sparkles, 
  Users, 
  Heart, 
  Target, 
  Compass, 
  Building2, 
  Mail, 
  Phone, 
  ShieldCheck, 
  GraduationCap, 
  ZoomIn,
  Video,
  Briefcase
} from 'lucide-react';
import { CampusTourVideoPlayer } from './CampusTourVideoPlayer';
import { StudentPlacementsShowcase } from './StudentPlacementsShowcase';

interface AboutPageModalProps {
  onClose: () => void;
  onExploreCourses: () => void;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  aspect: string;
}

export const ABOUT_GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'p2',
    src: '/assets/aistudio/p2_edb00387.jpeg',
    title: 'Executive Headquarters & Founder Directorate',
    subtitle: 'Founder & CEO Sudharshan Reddy K R at the central campus',
    badge: 'Headquarters & Leadership',
    description: 'Sudharshan Reddy K R presiding at his executive desk in Bengaluru, backed by the prestigious national trophy gallery and academic awards cabinet recognizing institutional excellence.',
    aspect: '16/10'
  },
  {
    id: 'p1',
    src: '/assets/aistudio/p1_da665ffc.jpeg',
    title: 'The Founder Charter & Core Institutional Credo',
    subtitle: 'Learn • Innovate • Succeed: Official manifesto',
    badge: 'Official Founder Manifesto',
    description: 'Top Sudharshan Reddy K.R — Founder & CEO, Reddy Online Education. Dedicated to empowering students across India through quality education, innovation-driven learning, and leadership.',
    aspect: '16/9'
  },
  {
    id: 'p4',
    src: '/assets/aistudio/p4_dca4505d.jpeg',
    title: 'Women in STEM & Academic Excellence Cohort',
    subtitle: 'Celebrating high-achiever student toppers in smart digital campus',
    badge: 'Student Champions',
    description: 'CEO Sudharshan Reddy celebrating with female students holding the Star Championship trophy in front of the live student performance analytics command center.',
    aspect: '16/9'
  },
  {
    id: 'p5',
    src: '/assets/aistudio/p5_dfa5da7b.jpeg',
    title: 'Future Leaders & Engineering Science Champions',
    subtitle: 'Mentoring scholars in Python, Mathematics, and competitive skills',
    badge: 'Academic Leadership',
    description: 'Sudharshan Reddy presenting the prestigious Star Championship award to young scholars in the high-tech campus studio, fostering the next generation of engineers and scientists.',
    aspect: '16/9'
  },
  {
    id: 'p3',
    src: '/assets/aistudio/p3_b6de64e5.jpeg',
    title: 'Merit Awards & National Olympiad Laureates',
    subtitle: 'Recognizing academic excellence and clinical nursing foundations',
    badge: 'Trophy Ceremony',
    description: 'Founder Sudharshan Reddy awarding golden championship cups to student toppers for outstanding milestones in academic rigor and foundational excellence.',
    aspect: '9/16'
  }
];

export const AboutPageModal: React.FC<AboutPageModalProps> = ({ onClose, onExploreCourses }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryPhoto | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'tour' | 'placements' | 'gallery' | 'vision' | 'awards'>('overview');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      <div className="relative bg-white w-full max-w-6xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Top Navigation Bar of the About Page */}
        <div className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center text-white shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-white">
                  About REDDY ONLINE EDUCATION
                </h2>
                <span className="hidden sm:inline-block bg-red-600/30 text-amber-300 border border-red-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
                  Official Institutional Profile
                </span>
              </div>
              <div className="text-xs text-slate-400">
                Founded & Led by <strong>Sudharshan Reddy K R</strong> · Learn • Innovate • Succeed
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            aria-label="Close About Page"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls Bar */}
        <div className="px-6 border-b border-slate-200 bg-slate-50 flex items-center gap-2 sm:gap-6 shrink-0 overflow-x-auto text-xs font-bold text-slate-600">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-red-600 text-red-600 font-extrabold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('tour')}
            className={`py-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'tour'
                ? 'border-red-600 text-red-600 font-extrabold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-blue-500" />
            Campus Video Tour (Classroom, Canteen, Exam Hall)
          </button>
          <button
            onClick={() => setActiveTab('placements')}
            className={`py-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'placements'
                ? 'border-red-600 text-red-600 font-extrabold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-emerald-500" />
            Life Settle Placements (All 6 Courses)
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`py-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'gallery'
                ? 'border-red-600 text-red-600 font-extrabold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Photo Gallery (5)
          </button>
          <button
            onClick={() => setActiveTab('vision')}
            className={`py-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'vision'
                ? 'border-red-600 text-red-600 font-extrabold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Founder Vision
          </button>
          <button
            onClick={() => setActiveTab('awards')}
            className={`py-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'awards'
                ? 'border-red-600 text-red-600 font-extrabold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            Trophies & Awards
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-10">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-10">
              
              {/* Hero Banner with Executive Photograph */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white border border-slate-800 shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                  
                  {/* Left Column: Mission & Highlights */}
                  <div className="lg:col-span-7 p-6 sm:p-10 space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/30 text-amber-300 border border-red-500/40 rounded-full text-xs font-bold tracking-wide">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      FOUNDER & CHANCELLOR
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                      Shaping Tomorrow’s Leaders in Science, Technology & Healthcare
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      <strong>REDDY ONLINE EDUCATION</strong> is an award-winning EdTech institution founded and helmed by <strong>Sudharshan Reddy K R</strong>. With a commitment to affordable, rigorous learning, the institute bridges practical software engineering (Python, AIML), foundational mathematics, healthcare sciences (BSc Nursing, BDS Dentistry), and executive communication skills.
                    </p>

                    {/* Bullet Pillars from the official poster */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Empowering Students Across India</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Quality Education for All</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Trusted by Thousands of Students</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Innovation Driven Learning</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Building Future Leaders</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Award Winning EdTech Platform</span>
                      </div>
                    </div>

                    <div className="pt-3 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setActiveTab('gallery')}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-red-600/30 cursor-pointer"
                      >
                        View Campus Photo Gallery
                      </button>
                      <button
                        onClick={() => { onClose(); onExploreCourses(); }}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                      >
                        Explore Enrolled Subjects →
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Real Photo of Founder in Office */}
                  <div className="lg:col-span-5 relative h-72 lg:h-full min-h-[360px] overflow-hidden bg-slate-900 group">
                    <img
                      src="/assets/aistudio/p2_edb00387.jpeg"
                      alt="Sudharshan Reddy KR, Founder & CEO at executive desk in Reddy Online Education headquarters"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md p-3 rounded-2xl border border-slate-700/80 text-white text-xs">
                      <div className="font-extrabold text-amber-300">
                        Sudharshan Reddy K R
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Founder & CEO, Reddy Online Education
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Central Executive Office & National Awards Gallery, Bengaluru
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* 3 Real Photographs Showcase Row */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Real Campus Life & Student Achievements
                    </h3>
                    <p className="text-xs text-slate-500">
                      Authentic photographs from REDDY ONLINE EDUCATION classrooms, ceremonies, and command center.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('gallery')}
                    className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                  >
                    View All 5 Photos →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  
                  {/* Photo Card 1: Official Poster */}
                  <div 
                    onClick={() => setSelectedImage(ABOUT_GALLERY_PHOTOS[1])}
                    className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition-all"
                  >
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src="/assets/aistudio/p1_da665ffc.jpeg"
                        alt="Top Sudharshan Reddy KR Founder & CEO manifesto poster"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 space-y-1 bg-white">
                      <div className="text-[11px] font-bold text-red-600">Official Charter</div>
                      <h4 className="text-xs font-bold text-slate-900">Founder & CEO Manifesto</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2">
                        "Learn • Innovate • Succeed" — The guiding philosophy of Reddy Online Education.
                      </p>
                    </div>
                  </div>

                  {/* Photo Card 2: Girls Cohort with Trophy */}
                  <div 
                    onClick={() => setSelectedImage(ABOUT_GALLERY_PHOTOS[2])}
                    className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition-all"
                  >
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src="/assets/aistudio/p4_dca4505d.jpeg"
                        alt="Sudharshan Reddy with female students in smart analytics center"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 space-y-1 bg-white">
                      <div className="text-[11px] font-bold text-blue-600">Student Champions</div>
                      <h4 className="text-xs font-bold text-slate-900">Smart Tech & Analytics Studio</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2">
                        CEO Sudharshan Reddy awarding championship trophies to high-achieving female student cohort.
                      </p>
                    </div>
                  </div>

                  {/* Photo Card 3: Boys Cohort with Star Trophy */}
                  <div 
                    onClick={() => setSelectedImage(ABOUT_GALLERY_PHOTOS[3])}
                    className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition-all"
                  >
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src="/assets/aistudio/p5_dfa5da7b.jpeg"
                        alt="Sudharshan Reddy with male students in Reddy Online Education blazers"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 space-y-1 bg-white">
                      <div className="text-[11px] font-bold text-emerald-600">Future Leaders</div>
                      <h4 className="text-xs font-bold text-slate-900">Science & Technology Toppers</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2">
                        Scholars wearing the official institute blazer celebrating Star Academic honors.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Institutional Facts & Numbers */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 tabular-nums">18,500+</div>
                  <div className="text-xs text-slate-600">Scholars & Graduates</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-red-600 tabular-nums">40+ Trophies</div>
                  <div className="text-xs text-slate-600">State & National Honors</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 tabular-nums">6 Core</div>
                  <div className="text-xs text-slate-600">Specialized Disciplines</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-amber-600 tabular-nums">100%</div>
                  <div className="text-xs text-slate-600">Verified Certifications</div>
                </div>
              </div>

            </div>
          )}

          {/* TAB: VIRTUAL CAMPUS VIDEO TOUR */}
          {activeTab === 'tour' && (
            <div className="space-y-6">
              <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Interactive Facility Tour
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">
                    Reddy Online Education Campus & Student Facilities
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Step inside our smart classrooms, hygienic student canteen, 500-seat central examination hall, clinical simulation labs, and executive directorate.
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-xs text-slate-300 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>5 Dedicated Facility Scenes</span>
                </div>
              </div>

              <CampusTourVideoPlayer />
            </div>
          )}

          {/* TAB: LIFE SETTLE PLACEMENTS */}
          {activeTab === 'placements' && (
            <div className="space-y-6">
              <StudentPlacementsShowcase 
                onExploreCourses={() => {
                  onClose();
                  onExploreCourses();
                }} 
              />
            </div>
          )}

          {/* TAB: FULL PHOTO GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Official Photographic Archive & Media
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Click any image to view in high-resolution with authentic verified context.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ABOUT_GALLERY_PHOTOS.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => setSelectedImage(photo)}
                    className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-amber-300">
                        {photo.badge}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm p-1.5 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                        {photo.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {photo.description}
                      </p>
                      <div className="text-[11px] font-semibold text-slate-400 pt-1">
                        {photo.subtitle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FOUNDER VISION & PEDAGOGY */}
          {activeTab === 'vision' && (
            <div className="space-y-8">
              
              {/* Vision Card */}
              <div className="p-6 sm:p-8 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  The Chancellor’s Vision: "Quality Education for All"
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  "Education in modern India has often forced students to pick narrow, isolated paths. A coder rarely understands biological and medical foundations; a nursing or dental resident often lacks confidence in data reasoning and executive speaking. At Reddy Online Education, our philosophy is to dismantle those artificial boundaries. We provide an integrated educational launchpad where technical rigour, clinical precision, mathematical thought, and high-impact communication coalesce into an unstoppable career foundation."
                </p>
                <div className="pt-2 text-xs font-bold text-amber-900">
                  — Sudharshan Reddy K R, Founder & CEO
                </div>
              </div>

              {/* 3 Core Institutional Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5">
                  <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                    01
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Learn with Rigor</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Syllabi designed in consultation with medical councils, dental boards, and top-tier software architects to ensure zero fluff.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                    02
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Innovate via Practice</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Virtual laboratory simulators, real patient clinical cases, PyTorch models, and live interactive classrooms.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                    03
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Succeed with Integrity</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Verified digital credentials signed by Founder Sudharshan Reddy K R that open doors in residency, tech, and corporate leadership.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: AWARDS & TROPHY CABINET */}
          {activeTab === 'awards' && (
            <div className="space-y-6">
              
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-red-500 flex items-center justify-center text-slate-950 font-black">
                    <Trophy className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      The National Recognition Gallery
                    </h3>
                    <div className="text-xs text-amber-400">
                      As visible in the official headquarters executive office of Sudharshan Reddy K R
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  The illuminated trophy showcase at our main campus houses over 40+ state, national, and university awards earned by our students in competitive programming, dental clinical skills, nursing symposiums, and national mathematics olympiads.
                </p>
              </div>

              {/* Awards List Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <Award className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-900">Top EdTech Leadership Excellence Award</h4>
                    <p className="text-[11px] text-slate-500">
                      Conferred upon Sudharshan Reddy K R for expanding high-quality technical and clinical education.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <Award className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-900">National Star Student Championship</h4>
                    <p className="text-[11px] text-slate-500">
                      Awarded to Reddy Online Education student cohorts for standout performance in national STEM competitions.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <Award className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-900">ISO 9001:2015 Educational Standard</h4>
                    <p className="text-[11px] text-slate-500">
                      Audited and accredited quality management systems across curriculum delivery and examination.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <Award className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-900">Best Healthcare & Technical Bridge Initiative</h4>
                    <p className="text-[11px] text-slate-500">
                      Recognized for pioneering the integrated curricula combining BSc Nursing, BDS Dentistry, Python & AIML.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Official Profile of <strong>REDDY ONLINE EDUCATION</strong> (CEO: Sudharshan Reddy K R)</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="mailto:sudharshankr1611@gmail.com"
              className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-700 font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-red-600" />
              <span>Email Founder</span>
            </a>
            <button
              onClick={() => { onClose(); onExploreCourses(); }}
              className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors cursor-pointer"
            >
              Join Academic Programs
            </button>
          </div>
        </div>

      </div>

      {/* High-Resolution Zoom Preview Lightbox */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-60 bg-black/95 flex flex-col items-center justify-center p-4 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col max-h-[90vh]"
          >
            <div className="p-3 bg-slate-950 flex items-center justify-between text-white border-b border-slate-800">
              <span className="text-xs font-bold text-amber-400">{selectedImage.badge}</span>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-hidden bg-black flex items-center justify-center p-2">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-h-[65vh] w-auto object-contain rounded-lg"
              />
            </div>

            <div className="p-4 bg-slate-950 text-white space-y-1">
              <div className="text-sm font-bold">{selectedImage.title}</div>
              <div className="text-xs text-slate-400 leading-relaxed">{selectedImage.description}</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
