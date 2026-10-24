import React from 'react';
import { useAuth } from '../context/AuthContext';
import { COURSES_DATA } from '../data/coursesData';
import { 
  X, 
  Printer, 
  Download, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  GraduationCap 
} from 'lucide-react';

interface CertificateModalProps {
  courseId: string;
  certificateId: string;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  courseId,
  certificateId,
  onClose
}) => {
  const { user } = useAuth();
  const course = COURSES_DATA.find((c) => c.id === courseId) || COURSES_DATA[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Controls Bar */}
        <div className="bg-slate-900 px-6 py-3.5 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-2 text-xs font-bold">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Verified Digital Credential · REDDY ONLINE EDUCATION</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Canvas */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 flex items-center justify-center bg-slate-100/50">
          
          <div className="w-full bg-[#fcfaf6] border-8 border-double border-amber-900/40 p-8 sm:p-12 rounded-2xl shadow-xl relative text-center space-y-6">
            
            {/* Corner Decorative Accents */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-800/60" />
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-800/60" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-800/60" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-800/60" />

            {/* Institutional Crest Header */}
            <div className="space-y-1">
              <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-red-600 to-amber-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-wider uppercase font-serif mt-2">
                REDDY ONLINE EDUCATION
              </h2>
              <div className="text-[11px] font-bold text-amber-800 tracking-widest uppercase">
                DIRECTORATE OF ACADEMIC CERTIFICATION & PROFESSIONAL EXCELLENCE
              </div>
              <div className="text-[10px] text-slate-500">
                Registered under National Educational Accreditation · ISO 9001:2015 Certified
              </div>
            </div>

            {/* Certificate Proclamation */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-serif italic text-slate-600">
                This is to certify that
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif border-b-2 border-amber-800/30 max-w-md mx-auto pb-1">
                {user?.name || 'Ananya Sharma'}
              </div>
              <div className="text-xs text-slate-500 font-mono">
                Student ID: {user?.studentId || 'ROE-2026-9042'}
              </div>
            </div>

            {/* Achievement Text */}
            <div className="max-w-xl mx-auto space-y-2">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-serif">
                has successfully completed all prescribed structured modules, laboratory clinical cases, and assessment examinations for the professional certification program in
              </p>
              <div className="text-lg sm:text-xl font-bold text-red-700 tracking-tight">
                {course.certificationTitle}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Discipline: {course.categoryLabel} · Academic Grade: Distinction (O Grade)
              </div>
            </div>

            {/* Signatures & Seal Strip */}
            <div className="pt-8 border-t border-amber-900/20 grid grid-cols-3 items-end gap-4 text-xs">
              
              {/* Date & Registry */}
              <div className="text-center sm:text-left space-y-1">
                <div className="font-mono text-[11px] text-slate-700">
                  {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div className="border-t border-slate-400 pt-1 text-[10px] text-slate-500 font-serif">
                  Date of Conferral
                </div>
              </div>

              {/* Gold Institutional Seal */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-amber-600 bg-amber-50 flex flex-col items-center justify-center p-1 shadow-sm text-center">
                  <ShieldCheck className="w-5 h-5 text-amber-600 mb-0.5" />
                  <span className="text-[8px] font-black uppercase text-amber-900 leading-none">
                    OFFICIAL SEAL
                  </span>
                  <span className="text-[7px] text-amber-700">ISO 9001</span>
                </div>
                <div className="text-[9px] font-mono text-slate-400 mt-1">
                  ID: {certificateId}
                </div>
              </div>

              {/* Founder & CEO Signature */}
              <div className="text-center sm:text-right space-y-1">
                <div className="font-serif italic font-bold text-base text-red-800 tracking-tight">
                  Sudharshan Reddy K R
                </div>
                <div className="border-t border-slate-400 pt-1 text-[10px] text-slate-700 font-bold">
                  Sudharshan Reddy K R
                </div>
                <div className="text-[9px] text-slate-500">
                  Founder & CEO, Chancellor
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
