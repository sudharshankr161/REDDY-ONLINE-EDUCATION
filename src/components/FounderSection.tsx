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
  MessagesSquare
} from 'lucide-react';

interface FounderSectionProps {
  onOpenLinks: () => void;
  onScrollToCourses: () => void;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ onOpenLinks, onScrollToCourses }) => {
  return (
    <section id="founder-section" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold text-red-600 tracking-wider uppercase mb-2">
            Leadership & Institutional Vision
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Meet Founder & CEO: Sudharshan Reddy K R
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Pioneering a unified academic model combining software engineering, clinical healthcare, mathematical rigour, and leadership communication.
          </p>
        </div>

        {/* 2-Column Institutional Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Founder Persona & Credentials Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 text-white flex flex-col justify-between shadow-lg relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              
              {/* Founder Header Badge */}
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 p-0.5 shadow-md">
                  <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-xl font-black text-amber-400">
                    SR
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Sudharshan Reddy K R
                  </h3>
                  <div className="text-xs text-amber-400 font-medium">
                    Founder, Chief Executive Officer & Chancellor
                  </div>
                  <div className="text-[11px] text-slate-400">
                    REDDY ONLINE EDUCATION
                  </div>
                </div>
              </div>

              {/* Founder Quote */}
              <div className="relative pt-2">
                <Quote className="w-8 h-8 text-amber-500/30 absolute -top-1 -left-2" />
                <p className="text-sm text-slate-300 italic pl-6 leading-relaxed">
                  "True education must not create artificial silos between engineering code and medical care. At Reddy Online Education, our mission is to deliver world-class training in Python, AIML, Mathematics, BSc Nursing, BDS Dentistry, and Communication Skills at an accessible cost with guaranteed practical mastery."
                </p>
              </div>

              {/* Verified Credentials List */}
              <div className="space-y-2.5 pt-4 border-t border-slate-700/60 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>ISO 9001:2015 Quality Management Certified Curriculum</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Curriculum aligned with Indian Nursing Council (INC) & Dental Council standards</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>18,500+ Graduated Alumni in Tier-1 Tech, Research & Healthcare</span>
                </div>
              </div>

            </div>

            {/* Direct Official Contact Desk */}
            <div className="relative z-10 pt-6 mt-6 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-3 text-xs">
              <a 
                href="mailto:sudharshankr1611@gmail.com"
                className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>sudharshankr1611@gmail.com</span>
              </a>
              <button
                onClick={onOpenLinks}
                className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Official Web Links</span>
              </button>
            </div>

          </div>

          {/* Column 2: The 4 Strategic Pillars & Curriculum Philosophy */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Pillar 1: Software & AI */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all space-y-2">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">1. Python & AIML Engineering</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Deep hands-on immersion into Python 3.12, PyTorch, Transformers, Computer Vision, and Microservices, producing job-ready architects.
                </p>
              </div>

              {/* Pillar 2: Healthcare & Dentistry */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">2. BSc Nursing & BDS Surgery</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Rigorous clinical simulations, endodontic protocols, ICU triage, and pharmacology dosage calculations overseen by licensed medical boards.
                </p>
              </div>

              {/* Pillar 3: Applied Mathematics */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all space-y-2">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">3. Higher Applied Mathematics</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Intuitive calculus, Laplace transformations, differential equations, and linear algebra that form the bedrock of scientific innovation.
                </p>
              </div>

              {/* Pillar 4: Executive Communication */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all space-y-2">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <MessagesSquare className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">4. Executive Communication</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Master the Minto Pyramid Principle, STAR behavioral interview techniques, and public speaking to articulate ideas with conviction.
                </p>
              </div>

            </div>

            {/* Founder Scholarship & Fee Assurance */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs font-bold text-amber-900 flex items-center justify-center sm:justify-start gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  Sudharshan Reddy K R Academic Scholarship 2026
                </div>
                <p className="text-xs text-amber-800">
                  Use coupon code <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-amber-300 text-slate-900">REDDY2026</span> during course registration for a flat <strong>₹1,500 Fee Deduction</strong>.
                </p>
              </div>
              <button
                onClick={onScrollToCourses}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl whitespace-nowrap transition-colors cursor-pointer shrink-0"
              >
                Enroll with Scholarship
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
