import React, { useState } from 'react';
import { 
  PLACED_STUDENTS_DATA, 
  PLACEMENT_STATS, 
  PlacedStudent 
} from '../data/placementsData';
import { 
  Trophy, 
  Award, 
  Briefcase, 
  CheckCircle2, 
  Building2, 
  HeartHandshake, 
  Sparkles, 
  Search, 
  Download, 
  ExternalLink,
  MapPin,
  Quote
} from 'lucide-react';

interface StudentPlacementsShowcaseProps {
  onExploreCourses?: () => void;
}

export const StudentPlacementsShowcase: React.FC<StudentPlacementsShowcaseProps> = ({ onExploreCourses }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Courses Placements' },
    { id: 'python-core-advanced', label: 'Python & Software' },
    { id: 'aiml-engineering-mastery', label: 'AIML Engineering' },
    { id: 'bsc-nursing-clinical', label: 'BSc Nursing' },
    { id: 'bds-dentistry-clinical', label: 'BDS Dental Surgery' },
    { id: 'higher-applied-mathematics', label: 'Higher Maths' },
    { id: 'communication-leadership-skills', label: 'Communication' },
  ];

  const filteredStudents = PLACED_STUDENTS_DATA.filter((st) => {
    const matchesCategory = selectedCategory === 'all' || st.courseId === selectedCategory;
    const matchesSearch =
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.companyOrHospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownloadPlacementReport = () => {
    const reportText = `=============================================================================
REDDY ONLINE EDUCATION - CAREER PLACEMENTS & LIFE SETTLED STUDENTS REPORT
FOUNDER & CHANCELLOR: SUDHARSHAN REDDY K R
Placement Cell & Directorate of Career Development
Accredited ISO 9001:2015 Institution · Bengaluru, Karnataka
=============================================================================

EXECUTIVE SUMMARY:
-----------------------------------------------------------------------------
- Overall Placement & Life Settle Success: 96.8%
- Highest Annual Compensation:           ₹28.5 LPA (AIML Systems)
- Average Annual Compensation:           ₹7.4 LPA
- Active Clinical & Corporate Recruiters: 450+ Hospitals & Tech Enterprises
- International Overseas Appointments:   NHS UK, Gulf Medical, EU Tech Labs

SELECT GRADUATE OUTCOMES (ALL 6 DISCIPLINES):
-----------------------------------------------------------------------------
1. PYTHON PROGRAMMING & SOFTWARE ENGINEERING
   - Vikramaditya Hegde: Senior Backend Architect @ Zoho Corporation (₹14.2 LPA)
   - Pooja Venkatesh:    Cloud API & Microservices Engineer @ Infosys (₹9.8 LPA)

2. ARTIFICIAL INTELLIGENCE & MACHINE LEARNING (AIML)
   - Rahul R. Nair:      ML Systems Specialist @ Nvidia AI Ecosystem (₹24.0 LPA)
   - Shweta Kulkarni:    Computer Vision Engineer @ Ather Energy (₹16.5 LPA)

3. BSc NURSING CLINICAL PRACTICE
   - Ananya S. Rao:      Senior ICU Critical Care Specialist @ Manipal Hospitals (₹8.6 LPA + Housing)
   - Blessy Mathew:      Registered Nurse @ NHS Trust Hospitals, London UK (£36,500 / yr)

4. BDS CLINICAL DENTISTRY & SURGERY
   - Dr. Karthik Reddy:  Consultant Dental Surgeon & Clinic Founder @ Reddy Smile Care (₹22.0 LPA Net)
   - Dr. Sneha George:   Senior Hospital Dental Officer @ Fortis Healthcare (₹12.5 LPA)

5. HIGHER & APPLIED MATHEMATICS
   - Arjun Swaminathan:  Quantitative Risk Analyst @ ICICI Securities (₹15.8 LPA)
   - Deepak Mohan:       Junior Scientist @ ISRO / Aerospace Propulsion (GATE AIR 32)

6. EXECUTIVE COMMUNICATION & SOFT SKILLS
   - Meenakshi Iyer:     Corporate Communications & PR Lead @ Deloitte (₹13.4 LPA)
   - Farhan A. Qureshi:  Senior HR Talent Lead @ Amazon Operations (₹17.0 LPA)

Attested by:
Sudharshan Reddy K R
Founder & CEO, REDDY ONLINE EDUCATION
Email: sudharshankr1611@gmail.com
=============================================================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ReddyOnlineEducation_Placement_Report_2026.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-red-600 uppercase tracking-wider mb-1">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Graduate Life Settle Directory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            "Life Settled" Students & Career Placements
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Under the active mentorship of <strong>Chancellor Sudharshan Reddy K R</strong>, our graduates across Python, AIML, BSc Nursing, BDS Dentistry, Mathematics, and Communication achieve transformative career milestones.
          </p>
        </div>

        <button
          onClick={handleDownloadPlacementReport}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm shrink-0 whitespace-nowrap"
        >
          <Download className="w-4 h-4" />
          <span>Download Placement Report</span>
        </button>
      </div>

      {/* 4 Placement KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {PLACEMENT_STATS.map((stat, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-2 hover:border-slate-300 transition-all"
          >
            <div className="text-xs font-semibold text-slate-500">
              {stat.label}
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tabular-nums">
              {stat.value}
            </div>
            <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
              {stat.subtext}
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="p-4 bg-slate-100/70 rounded-2xl border border-slate-200 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search placed students by name, company, hospital, role, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Placed Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between space-y-4 hover:border-slate-300 hover:shadow-lg transition-all duration-300 group"
          >
            {/* Top Student Header */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl ${student.avatarBg} text-white flex items-center justify-center font-black text-lg shadow-md shrink-0`}>
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-red-600 transition-colors">
                      {student.name}
                    </h3>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {student.batch}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold bg-slate-900 text-amber-300 px-2 py-0.5 rounded border border-slate-800">
                  {student.companyLogoText}
                </span>
              </div>

              {/* Course Taken */}
              <div className="text-xs text-red-700 font-semibold bg-red-50/70 p-2 rounded-xl border border-red-100 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="line-clamp-1">{student.courseName}</span>
              </div>

              {/* Company & Role */}
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{student.designation}</span>
                </div>
                <div className="text-xs text-slate-700 font-medium flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{student.companyOrHospital}</span>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>{student.location}</span>
                </div>
              </div>

              {/* Package Badge */}
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                <span className="text-emerald-800 font-medium">Life Settled Package:</span>
                <span className="font-extrabold text-emerald-950 font-mono text-sm tabular-nums">
                  {student.packageOrAppointment}
                </span>
              </div>

              {/* Testimonial Quote */}
              <div className="relative pt-2 text-xs text-slate-600 italic leading-relaxed border-t border-slate-100">
                <Quote className="w-5 h-5 text-slate-300 absolute -top-1 left-0" />
                <p className="pl-6">"{student.quote}"</p>
              </div>
            </div>

            {/* Bottom Outcome Tag */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Career Verified
              </span>
              <span className="text-slate-400">
                Mentor: Sudharshan Reddy KR
              </span>
            </div>

          </div>
        ))}
      </div>

      {/* Recruiter & Hospital Partnership Logos Banner */}
      <div className="p-6 sm:p-8 bg-slate-900 text-white rounded-3xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Corporate & Healthcare Network
            </div>
            <h3 className="text-lg font-bold text-white">
              Where Our Graduates Build Their Life & Careers
            </h3>
          </div>
          <div className="text-xs text-slate-400">
            450+ Active Placement Partnerships
          </div>
        </div>

        {/* Brand Logos Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-center">
          {['ZOHO', 'INFOSYS', 'TCS', 'NVIDIA', 'APOLLO', 'MANIPAL', 'FORTIS', 'NHS UK'].map((logo, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs font-bold text-slate-300 tracking-wider flex items-center justify-center hover:text-white hover:border-slate-700 transition-colors"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
