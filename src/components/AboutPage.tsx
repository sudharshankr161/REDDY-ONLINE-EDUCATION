import React, { useState } from 'react';
import { 
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
  ArrowLeft,
  X,
  ExternalLink,
  BookOpen,
  Video,
  Briefcase,
  Camera,
  Play
} from 'lucide-react';
import { ABOUT_GALLERY_PHOTOS, GalleryPhoto } from './AboutPageModal';
import { CampusTourVideoPlayer } from './CampusTourVideoPlayer';
import { StudentPlacementsShowcase } from './StudentPlacementsShowcase';

interface AboutPageProps {
  onBackToHome: () => void;
  onExploreCourses: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBackToHome, onExploreCourses }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [aboutTab, setAboutTab] = useState<'all' | 'tour' | 'placements' | 'gallery' | 'story'>('all');
  const [activeFilter, setActiveFilter] = useState<'all' | 'founder' | 'students' | 'campus'>('all');

  const filteredPhotos = ABOUT_GALLERY_PHOTOS.filter((photo) => {
    if (activeFilter === 'founder') return photo.id === 'p1' || photo.id === 'p2';
    if (activeFilter === 'students') return photo.id === 'p3' || photo.id === 'p4' || photo.id === 'p5';
    if (activeFilter === 'campus') return photo.id === 'p2' || photo.id === 'p4' || photo.id === 'p5';
    return true;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Breadcrumb / Back Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-18 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-red-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to Main Campus Home</span>
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Section:</span>
            <span className="font-bold text-slate-900">About REDDY ONLINE EDUCATION</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-red-600 font-semibold">Founder: Sudharshan Reddy K R</span>
          </div>

          <button
            onClick={onExploreCourses}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>View Courses</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        
        {/* Page Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-red-100 text-red-800 rounded-full text-xs font-extrabold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            ABOUT REDDY ONLINE EDUCATION
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight text-balance">
            Building Future Leaders Under the Direction of{' '}
            <span className="bg-gradient-to-r from-red-600 via-amber-600 to-red-700 bg-clip-text text-transparent">
              Founder & CEO Sudharshan Reddy K R
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed text-balance">
            Explore the authentic story, campus awards gallery, student championship milestones, and founding vision of India's premier integrated technology and healthcare EdTech institution.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Learn • Innovate • Succeed
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <Trophy className="w-4 h-4 text-amber-500" />
              Award-Winning EdTech Platform
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              ISO 9001:2015 Accredited Quality
            </span>
          </div>
        </div>

        {/* Navigation Tabs Bar for About Page */}
        <div className="bg-white rounded-2xl p-1.5 border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto text-xs font-bold text-slate-600">
          <button
            onClick={() => setAboutTab('all')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              aboutTab === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>All Overview</span>
          </button>

          <button
            onClick={() => setAboutTab('tour')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              aboutTab === 'tour'
                ? 'bg-red-600 text-white shadow-xs'
                : 'hover:text-red-600 hover:bg-red-50'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Campus Video Tour</span>
            <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-md font-extrabold">
              Classroom · Canteen · Exam Hall
            </span>
          </button>

          <button
            onClick={() => setAboutTab('placements')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              aboutTab === 'placements'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'hover:text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Life Settle Students & Careers</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-md font-extrabold">
              All Courses
            </span>
          </button>

          <button
            onClick={() => setAboutTab('gallery')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              aboutTab === 'gallery'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>Photo Archive (5 Photos)</span>
          </button>

          <button
            onClick={() => setAboutTab('story')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              aboutTab === 'story'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-blue-400" />
            <span>Founder Vision & Heritage</span>
          </button>
        </div>

        {/* SECTION 1: INTERACTIVE CAMPUS VIDEO TOUR */}
        {(aboutTab === 'all' || aboutTab === 'tour') && (
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
              <div>
                <div className="text-xs font-bold text-red-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-red-600" />
                  <span>2-Minute Campus Video & Audio Documentary</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                  Full 2-Minute Tour: Classrooms, Canteen, Examination Hall & Placements
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                  A continuous 2-minute (120-second) cinematic video documentary with synchronized female voice narration (Women Sound) and ambient musical soundbed. Experience our smart 4K classrooms, student canteen, 500-seat central examination hall, BDS & nursing simulation labs, and celebrated student placements under Chancellor Sudharshan Reddy K R.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="px-3.5 py-1.5 bg-red-100 text-red-800 rounded-full text-xs font-black flex items-center gap-1.5 border border-red-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                  <span>02:00 Minutes · Video & Audio</span>
                </span>
              </div>
            </div>

            <CampusTourVideoPlayer />
          </div>
        )}

        {/* SECTION 2: LIFE SETTLE STUDENTS SHOWCASE (Student Placements for all courses) */}
        {(aboutTab === 'all' || aboutTab === 'placements') && (
          <div className="space-y-4 pt-4">
            <StudentPlacementsShowcase onExploreCourses={onExploreCourses} />
          </div>
        )}

        {/* SECTION 3: FOUNDER EXECUTIVE SPOTLIGHT (Photo 1 & 2 Combined Showcase) */}
        {(aboutTab === 'all' || aboutTab === 'gallery') && (
          <div className="space-y-12">
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl text-white">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                
                {/* Real Executive Headquarters Desk Photograph */}
                <div 
                  onClick={() => setSelectedPhoto(ABOUT_GALLERY_PHOTOS[0])}
                  className="lg:col-span-7 relative min-h-[380px] lg:min-h-[500px] bg-slate-900 overflow-hidden group cursor-pointer"
                >
                  <img
                    src="/assets/aistudio/p2_edb00387.jpeg"
                    alt="Founder & CEO Sudharshan Reddy KR at his executive headquarters desk surrounded by trophies"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-amber-400 border border-slate-800 flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Headquarters Executive Suite & Trophy Cabinet</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-extrabold text-white">
                        SUDHARSHAN REDDY K R
                      </div>
                      <div className="text-xs text-amber-400 font-medium">
                        Founder & CEO, REDDY ONLINE EDUCATION
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Central Campus Headquarters, Bengaluru · Illuminated Trophies Gallery
                      </div>
                    </div>
                    <div className="p-2 bg-white/10 rounded-xl text-white group-hover:bg-red-600 transition-colors">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Official Manifesto Poster & Founding Principles */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/30 text-amber-300 border border-red-500/30 rounded-lg text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      FOUNDER CHARTER & PRINCIPLES
                    </div>

                    <h2 className="text-2xl font-black text-white tracking-tight">
                      "Learn • Innovate • Succeed"
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Founded with a vision to eliminate the barriers between advanced computer science, clinical medicine, mathematics, and executive communication, <strong>REDDY ONLINE EDUCATION</strong> has grown into an acclaimed national benchmark.
                    </p>

                    {/* The 6 Core Poster Pillars */}
                    <div className="space-y-2 pt-2">
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-200">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="font-semibold text-white">Empowering Students Across India</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-200">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="font-semibold text-white">Quality Education for All</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-200">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="font-semibold text-white">Trusted by Thousands of Students</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-200">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="font-semibold text-white">Innovation Driven Learning</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-200">
                        <span className="w-2 h-2 rounded-full bg-purple-500" />
                        <span className="font-semibold text-white">Building Future Leaders</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-200">
                        <span className="w-2 h-2 rounded-full bg-orange-500" />
                        <span className="font-semibold text-white">Award Winning EdTech Platform</span>
                      </div>
                    </div>
                  </div>

                  {/* Direct Founder Email */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                    <a
                      href="mailto:sudharshankr1611@gmail.com"
                      className="text-amber-300 hover:text-white font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <Mail className="w-4 h-4 text-red-500" />
                      <span>sudharshankr1611@gmail.com</span>
                    </a>
                    <span className="text-slate-400 text-[11px]">Directorate Desk</span>
                  </div>

                </div>

              </div>
            </div>

            {/* PHOTO GALLERY SECTION: ALL 5 UPLOADED IMAGES */}
            <div className="space-y-6 pt-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                    Visual Photographic Archive
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Authentic Campus Life, Trophies & Student Honors
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Official photographs showcasing Founder & CEO Sudharshan Reddy K R, state toppers, tech analytics lab, and award ceremonies.
                  </p>
                </div>

                {/* Gallery Category Filter */}
                <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 text-xs shrink-0">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                      activeFilter === 'all' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All (5 Photos)
                  </button>
                  <button
                    onClick={() => setActiveFilter('founder')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                      activeFilter === 'founder' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Founder Desk
                  </button>
                  <button
                    onClick={() => setActiveFilter('students')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                      activeFilter === 'students' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Student Toppers
                  </button>
                </div>
              </div>

              {/* 5 Photos Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => setSelectedPhoto(photo)}
                    className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                  >
                    {/* Photo Image Container */}
                    <div className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                      {/* Badge */}
                      <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-amber-300 border border-slate-800">
                        {photo.badge}
                      </div>

                      {/* Zoom Icon */}
                      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm p-1.5 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="w-4 h-4" />
                      </div>

                      {/* Bottom caption on image */}
                      <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
                        <div className="font-bold line-clamp-1">{photo.title}</div>
                        <div className="text-[10px] text-slate-300">{photo.subtitle}</div>
                      </div>
                    </div>

                    {/* Card Text Content */}
                    <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                          {photo.title}
                        </h3>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                          {photo.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                        <span className="font-medium text-[11px]">REDDY ONLINE EDUCATION</span>
                        <span className="text-red-600 font-bold group-hover:underline flex items-center gap-1">
                          Enlarge View →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* SECTION 4: INSTITUTIONAL STORY & CORE PILLARS */}
        {(aboutTab === 'all' || aboutTab === 'story') && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
            
            <div className="max-w-3xl space-y-3">
              <div className="text-xs font-bold text-red-600 uppercase tracking-wider">
                Institutional Heritage & Vision
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                A Unified Sanctuary for Technology, Health Sciences & Leadership
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Under Chancellor <strong>Sudharshan Reddy K R</strong>, the institution set out with an audacious goal: to construct an academic standard that brings the world's most critical disciplines into one cohesive, affordable digital university.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Python & AIML Systems</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Empowering students to write clean code, design FastAPI microservices, construct PyTorch neural networks, and deploy production ML models.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">BSc Nursing & BDS Dentistry</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  High-yield clinical case simulations, 10 Rights of drug administration, root canal instrumentation, and surgical trauma protocols.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                  <Trophy className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Mathematics & Communication</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Applied calculus, differential systems, and the Minto Pyramid Principle to articulate complex concepts with authority.
                </p>
              </div>

            </div>

          </div>
        )}

        {/* CTA Banner to Enroll */}
        <div className="bg-gradient-to-r from-red-900 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <div className="text-xs font-bold text-amber-400 tracking-wider uppercase flex items-center justify-center md:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Admissions Open 2026-27
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Start Your Learning Journey Today
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Use scholarship voucher <span className="font-mono font-bold text-amber-300 bg-white/10 px-2 py-0.5 rounded">REDDY2026</span> for a flat ₹1,500 deduction on all course fees.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={onExploreCourses}
              className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-red-600/30 cursor-pointer whitespace-nowrap"
            >
              Browse 6 Disciplines & Register
            </button>
            <button
              onClick={onBackToHome}
              className="w-full sm:w-auto px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
            >
              Back to Home
            </button>
          </div>
        </div>

      </div>

      {/* High-Resolution Zoom Lightbox */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-60 bg-black/95 flex flex-col items-center justify-center p-3 sm:p-6 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col max-h-[92vh]"
          >
            <div className="p-3.5 bg-slate-950 flex items-center justify-between text-white border-b border-slate-800">
              <span className="text-xs font-bold text-amber-400">{selectedPhoto.badge}</span>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-hidden bg-black flex items-center justify-center p-2">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="max-h-[68vh] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>

            <div className="p-4 bg-slate-950 text-white space-y-1">
              <div className="text-sm font-bold text-white">{selectedPhoto.title}</div>
              <div className="text-xs text-slate-300 leading-relaxed">{selectedPhoto.description}</div>
              <div className="text-[11px] text-amber-400 font-mono pt-1">
                REDDY ONLINE EDUCATION · Founder & CEO: Sudharshan Reddy K R
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
