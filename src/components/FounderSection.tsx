import React from 'react';
import { 
  Award, 
  CheckCircle, 
  Mail, 
  Globe, 
  ShieldCheck, 
  Quote, 
  ExternalLink,
  BookOpen,
  HeartPulse,
  Cpu,
  MessagesSquare,
  Sparkles,
  Trophy,
  ArrowRight
} from 'lucide-react';

interface FounderSectionProps {
  onOpenAboutPage: () => void;
  onOpenLinks: () => void;
  onScrollToCourses: () => void;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ 
  onOpenAboutPage, 
  onOpenLinks, 
  onScrollToCourses 
}) => {
  return (
    <section id="founder-section" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-extrabold text-red-600 tracking-wider uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Institutional Leadership & Legacy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Founder & CEO: Sudharshan Reddy K R
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Learn • Innovate • Succeed: A transformative vision bridging technology, clinical healthcare, higher mathematics, and executive leadership.
          </p>
        </div>

        {/* 2-Column Hero Card: Real Photo & Leadership Message */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Real Headquarters Photograph of Founder & CEO */}
            <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-[460px] bg-slate-900 overflow-hidden group">
              <img
                src="/assets/aistudio/p2_edb00387.jpeg"
                alt="Founder & CEO Sudharshan Reddy KR at his executive desk in Reddy Online Education headquarters"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              
              {/* Badge & Desk Plaque caption */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-amber-400">
                    SUDHARSHAN REDDY K R
                  </div>
                  <div className="text-[11px] text-slate-300">
                    Founder & CEO, REDDY ONLINE EDUCATION
                  </div>
                </div>
                <button
                  onClick={onOpenAboutPage}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
                >
                  View About Page →
                </button>
              </div>
            </div>

            {/* Founder Message & Real Credo */}
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>AWARD-WINNING EDTECH PLATFORM</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  "Empowering Students Across India With Quality Education"
                </h3>

                <div className="relative pt-2">
                  <Quote className="w-8 h-8 text-amber-500/30 absolute -top-1 -left-2" />
                  <p className="text-xs sm:text-sm text-slate-300 italic pl-6 leading-relaxed">
                    "True education must not create artificial silos between engineering code and medical care. At Reddy Online Education, our mission is to deliver world-class training in Python, AIML, Mathematics, BSc Nursing, BDS Dentistry, and Communication Skills at an accessible cost with guaranteed practical mastery."
                  </p>
                </div>

                {/* Key Commitments from the official charter */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Quality Education for All</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Trusted by Thousands</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Innovation Driven Learning</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Building Future Leaders</span>
                  </div>
                </div>
              </div>

              {/* Direct Founder Email & Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <a 
                  href="mailto:sudharshankr1611@gmail.com"
                  className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-medium"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>sudharshankr1611@gmail.com</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onOpenAboutPage}
                    className="px-4 py-2 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold transition-all cursor-pointer shadow-sm"
                  >
                    About Us & Gallery
                  </button>
                  <button
                    onClick={onScrollToCourses}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all cursor-pointer shadow-sm shadow-red-600/30"
                  >
                    View Courses
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Real Campus Photos Gallery Strip */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Campus Highlights & Student Honors
              </h3>
              <p className="text-xs text-slate-500">
                Official photographs from Reddy Online Education headquarters, smart classrooms, and award ceremonies.
              </p>
            </div>
            <button
              onClick={onOpenAboutPage}
              className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Full Photo Gallery (5 Photos)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Image 1: Official Founder Charter Poster */}
            <div 
              onClick={onOpenAboutPage}
              className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src="/assets/aistudio/p1_da665ffc.jpeg"
                  alt="Official manifesto poster: Top Sudharshan Reddy KR"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                />
              </div>
              <div className="p-3 bg-white">
                <div className="text-[10px] font-bold text-red-600 uppercase">Charter</div>
                <div className="text-xs font-bold text-slate-900 truncate">Founder & CEO Manifesto</div>
                <div className="text-[10px] text-slate-500">Learn · Innovate · Succeed</div>
              </div>
            </div>

            {/* Image 2: Girl Students with Trophies & Analytics Screen */}
            <div 
              onClick={onOpenAboutPage}
              className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src="/assets/aistudio/p4_dca4505d.jpeg"
                  alt="Sudharshan Reddy KR with female students in smart analytics center"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                />
              </div>
              <div className="p-3 bg-white">
                <div className="text-[10px] font-bold text-blue-600 uppercase">Championship</div>
                <div className="text-xs font-bold text-slate-900 truncate">Women in STEM Champions</div>
                <div className="text-[10px] text-slate-500">Star Trophy Ceremony</div>
              </div>
            </div>

            {/* Image 3: Boy Students in Official Navy Blazers */}
            <div 
              onClick={onOpenAboutPage}
              className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src="/assets/aistudio/p5_dfa5da7b.jpeg"
                  alt="Sudharshan Reddy KR with male scholars in official blazers"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                />
              </div>
              <div className="p-3 bg-white">
                <div className="text-[10px] font-bold text-emerald-600 uppercase">Academic Honors</div>
                <div className="text-xs font-bold text-slate-900 truncate">Future Tech Leaders</div>
                <div className="text-[10px] text-slate-500">Science & Maths Toppers</div>
              </div>
            </div>

            {/* Image 4: Gold Cups Award Ceremony */}
            <div 
              onClick={onOpenAboutPage}
              className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src="/assets/aistudio/p3_b6de64e5.jpeg"
                  alt="Sudharshan Reddy KR awarding golden championship cups to student toppers"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                />
              </div>
              <div className="p-3 bg-white">
                <div className="text-[10px] font-bold text-amber-600 uppercase">Merit Awards</div>
                <div className="text-xs font-bold text-slate-900 truncate">Olympiad Laureates</div>
                <div className="text-[10px] text-slate-500">Gold Trophy Winners</div>
              </div>
            </div>

          </div>
        </div>

        {/* Founder Scholarship & Fee Deduction Banner */}
        <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-bold text-amber-900 flex items-center justify-center sm:justify-start gap-1.5">
              <Award className="w-4 h-4 text-amber-600" />
              Sudharshan Reddy K R Academic Scholarship 2026
            </div>
            <p className="text-xs text-amber-800">
              Apply coupon code <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-amber-300 text-slate-900">REDDY2026</span> during course registration for a flat <strong>₹1,500 Fee Deduction</strong> across Python, BSc Nursing, BDS, AIML, and Maths.
            </p>
          </div>
          <button
            onClick={onScrollToCourses}
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl whitespace-nowrap transition-colors cursor-pointer shrink-0 shadow-sm"
          >
            Enroll with Scholarship
          </button>
        </div>

      </div>
    </section>
  );
};
