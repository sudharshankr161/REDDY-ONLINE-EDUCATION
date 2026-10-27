import React from 'react';
import { 
  Search, 
  Award, 
  Users, 
  BookCheck, 
  Radio, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onOpenLive: () => void;
  onOpenLinks: () => void;
  onScrollToCourses: () => void;
  onScrollToFounder: () => void;
  onOpenRegistrationList?: () => void;
  onOpenNewRegistration?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onOpenLive,
  onOpenLinks,
  onScrollToCourses,
  onScrollToFounder,
  onOpenRegistrationList,
  onOpenNewRegistration
}) => {
  const categories = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'technology', label: 'Python & AIML' },
    { id: 'mathematics', label: 'Higher Maths' },
    { id: 'healthcare', label: 'BSc Nursing' },
    { id: 'dental', label: 'BDS Dentistry' },
    { id: 'communication', label: 'Communication Skills' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/40 via-white to-slate-50 border-b border-slate-200 pt-10 pb-16">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Founder & Institute Trust Kicker */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1 font-semibold text-red-700 bg-red-100/70 px-2.5 py-1 rounded-md">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            DIRECTORATE OF ACADEMIC EXCELLENCE
          </span>
          <span aria-hidden="true">·</span>
          <span className="font-medium text-slate-700">Founder & CEO: Sudharshan Reddy K R</span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-500">ISO 9001:2015 Accredited Portal</span>
        </div>

        {/* Hero Title & Value Proposition */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] text-balance">
            Empowering Careers in <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-red-600 via-amber-600 to-red-700 bg-clip-text text-transparent">
              Technology, Medicine & Leadership
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
            Under the visionary leadership of <strong>CEO Sudharshan Reddy K R</strong>, Reddy Online Education delivers rigorous, industry-grade modules, live interactive clinics, and official credentials in <strong>Python, Mathematics, BSc Nursing, BDS Dentistry, AIML</strong>, and <strong>Executive Communication</strong>.
          </p>
        </div>

        {/* Interactive Search & Filter Bar */}
        <div className="mt-8 max-w-3xl mx-auto">
          <div className="relative flex items-center bg-white rounded-2xl shadow-sm border border-slate-200 p-1.5 focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-500 transition-all">
            <Search className="w-5 h-5 text-slate-400 ml-3.5 shrink-0" />
            <input
              type="text"
              placeholder="Search Python, BSc Nursing, BDS Surgery, AIML, Calculus, or Soft Skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 mr-1"
              >
                Clear
              </button>
            )}
            <button
              onClick={onScrollToCourses}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors shrink-0 shadow-sm shadow-red-600/20 cursor-pointer"
            >
              Find Course
            </button>
          </div>

          {/* Interactive Discipline Filter Tabs */}
          <div className="flex items-center justify-center gap-1.5 mt-4 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white/80 hover:bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick CTA Actions */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onScrollToCourses}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/20 transition-all cursor-pointer whitespace-nowrap"
          >
            Explore Courses & Fee Structure
            <ArrowRight className="w-4 h-4" />
          </button>

          {onOpenNewRegistration && (
            <button
              onClick={onOpenNewRegistration}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-slate-900" />
              <span>Apply & Check Eligibility (PUC Min)</span>
            </button>
          )}

          {onOpenRegistrationList && (
            <button
              onClick={onOpenRegistrationList}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Student Registration Directory</span>
              <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.2 rounded font-bold">Registry</span>
            </button>
          )}
          
          <button
            onClick={onOpenLive}
            className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-semibold border border-slate-200 shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            <Radio className="w-4 h-4 text-red-500" />
            Join Active Live Class
          </button>

          <button
            onClick={onOpenLinks}
            className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200 shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            Official Website Portals
          </button>

          <button
            onClick={onScrollToFounder}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-red-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            Founder & CEO Message ↓
          </button>
        </div>

        {/* Admissions Eligibility Notification Strip */}
        <div className="mt-5 max-w-2xl mx-auto p-2.5 bg-red-50/80 border border-red-200/90 rounded-2xl flex items-center justify-between gap-3 text-xs text-red-900">
          <div className="flex items-center gap-2 text-left">
            <span className="w-6 h-6 rounded-lg bg-red-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
              PUC
            </span>
            <span className="text-[11px] leading-tight font-medium">
              <strong>Mandatory Academic Rule:</strong> Minimum <strong>PUC (10+2 / Intermediate)</strong> required for all programs. 10th standard alone is ineligible.
            </span>
          </div>
          {onOpenNewRegistration && (
            <button
              onClick={onOpenNewRegistration}
              className="text-[11px] font-bold text-red-700 hover:text-red-900 underline shrink-0 cursor-pointer"
            >
              Check My Eligibility →
            </button>
          )}
        </div>

        {/* 4-Column Proof & Quantitative Rigor Strip */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">18,500+</div>
            <div className="text-xs font-medium text-slate-500">Active Students & Interns</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">6 Curated</div>
            <div className="text-xs font-medium text-slate-500">Technical & Clinical Disciplines</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">98.4%</div>
            <div className="text-xs font-medium text-slate-500">Board & Certificate Pass Rate</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">₹1,500 Off</div>
            <div className="text-xs font-medium text-slate-500">Scholarship Code: REDDY2026</div>
          </div>
        </div>

      </div>
    </section>
  );
};
