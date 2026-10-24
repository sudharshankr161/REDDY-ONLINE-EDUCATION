import React from 'react';
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  ShieldCheck, 
  Award, 
  ExternalLink 
} from 'lucide-react';

interface FooterProps {
  onOpenPortal: () => void;
  onOpenLive: () => void;
  onOpenMaterials: () => void;
  onOpenLinks: () => void;
  onScrollToFounder: () => void;
  onScrollToCourses: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPortal,
  onOpenLive,
  onOpenMaterials,
  onOpenLinks,
  onScrollToFounder,
  onScrollToCourses
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand & Founder Desk (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center text-white shadow-sm">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-lg font-extrabold text-white tracking-tight block">
                  REDDY ONLINE EDUCATION
                </span>
                <span className="text-xs text-amber-400 font-medium block">
                  Founder & CEO: Sudharshan Reddy K R
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Empowering learners across India and worldwide through structured modules, interactive live classrooms, and verified certifications in Python, Mathematics, BSc Nursing, BDS Dentistry, AIML, and Communication Skills.
            </p>

            <div className="space-y-2 text-xs pt-2">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <a href="mailto:sudharshankr1611@gmail.com" className="hover:text-white transition-colors">
                  sudharshankr1611@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>+91 98800 12345 (24/7 Admissions Desk)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Academic Campus: Bengaluru, Karnataka, India</span>
              </div>
            </div>
          </div>

          {/* Academic Courses Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Core Disciplines
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onScrollToCourses} className="hover:text-white transition-colors cursor-pointer text-left">
                  Python Programming & APIs
                </button>
              </li>
              <li>
                <button onClick={onScrollToCourses} className="hover:text-white transition-colors cursor-pointer text-left">
                  Higher Applied Mathematics
                </button>
              </li>
              <li>
                <button onClick={onScrollToCourses} className="hover:text-white transition-colors cursor-pointer text-left">
                  BSc Nursing Clinical Practice
                </button>
              </li>
              <li>
                <button onClick={onScrollToCourses} className="hover:text-white transition-colors cursor-pointer text-left">
                  BDS Dental Surgery & Anatomy
                </button>
              </li>
              <li>
                <button onClick={onScrollToCourses} className="hover:text-white transition-colors cursor-pointer text-left">
                  AIML & Neural Transformers
                </button>
              </li>
              <li>
                <button onClick={onScrollToCourses} className="hover:text-white transition-colors cursor-pointer text-left">
                  Executive Communication Skills
                </button>
              </li>
            </ul>
          </div>

          {/* Student Services Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Student Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenPortal} className="hover:text-white transition-colors cursor-pointer text-left">
                  Student Learning Portal (LMS)
                </button>
              </li>
              <li>
                <button onClick={onOpenLive} className="hover:text-white transition-colors cursor-pointer text-left">
                  Live Virtual Classrooms
                </button>
              </li>
              <li>
                <button onClick={onOpenMaterials} className="hover:text-white transition-colors cursor-pointer text-left">
                  Download Study Materials
                </button>
              </li>
              <li>
                <button onClick={onOpenLinks} className="hover:text-white transition-colors cursor-pointer text-left">
                  Official Website Links Directory
                </button>
              </li>
              <li>
                <button onClick={onOpenPortal} className="hover:text-white transition-colors cursor-pointer text-left">
                  Fee Payment & Invoices
                </button>
              </li>
              <li>
                <button onClick={onOpenPortal} className="hover:text-white transition-colors cursor-pointer text-left">
                  Certificate Verification
                </button>
              </li>
            </ul>
          </div>

          {/* Accreditation & Trust Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Accreditation
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-white font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  ISO 9001:2015
                </div>
                <p className="text-[11px] text-slate-400">
                  Certified Quality Management in Digital & Healthcare Education.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-amber-400 font-bold flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  Scholarship Desk
                </div>
                <p className="text-[11px] text-slate-400">
                  Use code <strong className="text-white">REDDY2026</strong> for ₹1,500 tuition grant.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} REDDY ONLINE EDUCATION. All Rights Reserved. Founded & Directed by <strong>Sudharshan Reddy K R</strong>.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onOpenLinks} className="hover:text-slate-300 transition-colors cursor-pointer">
              Website Portals
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={onScrollToFounder} className="hover:text-slate-300 transition-colors cursor-pointer">
              Founder Profile
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={onOpenMaterials} className="hover:text-slate-300 transition-colors cursor-pointer">
              Study Guides
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
