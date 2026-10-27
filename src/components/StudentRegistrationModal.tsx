import React, { useState } from 'react';
import { COURSES_DATA } from '../data/coursesData';
import { EducationLevel, StudentRegistrationRecord } from '../types';
import { 
  checkEligibility, 
  QUALIFICATION_LABELS, 
  saveNewRegistration 
} from '../services/registrationService';
import { 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  GraduationCap, 
  Building2, 
  FileCheck, 
  Download, 
  Printer, 
  ShieldCheck, 
  Sparkles,
  BookOpen
} from 'lucide-react';

interface StudentRegistrationModalProps {
  initialCourseId?: string;
  onClose: () => void;
  onViewRegistry: () => void;
  onRegistrationComplete?: (record: StudentRegistrationRecord) => void;
}

export const StudentRegistrationModal: React.FC<StudentRegistrationModalProps> = ({
  initialCourseId,
  onClose,
  onViewRegistry,
  onRegistrationComplete
}) => {
  // Form State
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [city, setCity] = useState('Bengaluru');
  const [stateName, setStateName] = useState('Karnataka');
  const [selectedCourseId, setSelectedCourseId] = useState(initialCourseId || 'python-core-advanced');
  
  // Education & Eligibility State
  const [qualification, setQualification] = useState<EducationLevel>('puc');
  const [stream, setStream] = useState('Science (PCMC / PCMB)');
  const [pucPercentage, setPucPercentage] = useState<number>(85.0);
  const [passingYear, setPassingYear] = useState('2024');
  const [collegeName, setCollegeName] = useState('');
  const [boardOrUniversity, setBoardOrUniversity] = useState('State Pre-University Board / Intermediate Board');

  // Submission result state
  const [registeredRecord, setRegisteredRecord] = useState<StudentRegistrationRecord | null>(null);

  // Live Eligibility Check
  const eligibility = checkEligibility(qualification, stream, pucPercentage, selectedCourseId);
  const selectedCourse = COURSES_DATA.find((c) => c.id === selectedCourseId) || COURSES_DATA[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const qualLabel = QUALIFICATION_LABELS[qualification]?.en || qualification;
    const isEligible = eligibility.isEligible;

    let status: StudentRegistrationRecord['status'] = 'Provisionally Eligible';
    let feeStatus: StudentRegistrationRecord['feeStatus'] = 'Pending Payment';
    let remarks = '';

    if (!isEligible) {
      status = 'Ineligible - Rejected';
      feeStatus = 'N/A (Ineligible)';
      remarks = '❌ INELIGIBLE: Does not meet minimum educational requirement (PUC 10+2 / Intermediate is mandatory).';
    } else {
      status = 'Provisionally Eligible';
      feeStatus = 'Pending Payment';
      remarks = `✅ ELIGIBLE: Verified ${qualLabel} with ${pucPercentage}% score. Eligible for admissions in ${selectedCourse.title}.`;
    }

    const newRecord = saveNewRegistration({
      studentName: studentName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim(),
      state: stateName.trim(),
      qualification,
      qualificationLabel: qualLabel,
      stream: stream.trim(),
      pucPercentage: Number(pucPercentage) || 0,
      passingYear: passingYear.trim(),
      collegeName: collegeName.trim() || 'Pre-University / Intermediate College',
      boardOrUniversity: boardOrUniversity.trim(),
      appliedCourseId: selectedCourse.id,
      appliedCourseName: selectedCourse.title,
      isEligible,
      eligibilityBadge: isEligible ? 'ELIGIBLE' : 'INELIGIBLE',
      eligibilityRemarks: remarks,
      status,
      feeStatus,
      feePaidINR: 0
    });

    setRegisteredRecord(newRecord);
    if (onRegistrationComplete) {
      onRegistrationComplete(newRecord);
    }
  };

  const handleDownloadSlip = () => {
    if (!registeredRecord) return;
    const slipText = `=============================================================================
REDDY ONLINE EDUCATION - OFFICIAL STUDENT REGISTRATION SLIP
FOUNDER & CEO: SUDHARSHAN REDDY K R
Application No:  ${registeredRecord.applicationNo}
Registration Date: ${registeredRecord.registeredAtFormatted}
=============================================================================
ACADEMIC ELIGIBILITY STATUS:
Status:           ${registeredRecord.eligibilityBadge} (${registeredRecord.isEligible ? 'Passed Minimum PUC Criteria' : 'Failed Minimum PUC Criteria'})
Statutory Rule:   Minimum PUC (10+2 / Intermediate) required for all university programs.
Remarks:          ${registeredRecord.eligibilityRemarks}

APPLICANT DETAILS:
-----------------------------------------------------------------------------
Student Name:     ${registeredRecord.studentName}
Email Address:    ${registeredRecord.email}
Mobile / WhatsApp: ${registeredRecord.phone}
City & State:     ${registeredRecord.city}, ${registeredRecord.state}

EDUCATIONAL QUALIFICATION & PUC VALIDATION:
-----------------------------------------------------------------------------
Highest Level:    ${registeredRecord.qualificationLabel}
Stream:           ${registeredRecord.stream}
PUC Score / %:    ${registeredRecord.pucPercentage}%
Passing Year:     ${registeredRecord.passingYear}
College/School:   ${registeredRecord.collegeName}
Board / Council:  ${registeredRecord.boardOrUniversity}

APPLIED COURSE DETAILS:
-----------------------------------------------------------------------------
Course Code:      ${selectedCourse.code}
Course Name:      ${registeredRecord.appliedCourseName}
Academic Dept:    ${selectedCourse.categoryLabel}
Duration:         ${selectedCourse.durationWeeks} Weeks (${selectedCourse.totalLessons} Lessons)
Certification:    ${selectedCourse.certificationTitle}
Admission Status: ${registeredRecord.status}
Fee Status:       ${registeredRecord.feeStatus}

=============================================================================
DIGITAL VERIFICATION SEAL & ATTESTATION:
Issued by: Registrar & Admissions Directorate
REDDY ONLINE EDUCATION · Founder & CEO: Sudharshan Reddy K R
Website & Support: sudharshankr1611@gmail.com
=============================================================================`;

    const blob = new Blob([slipText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Registration_${registeredRecord.applicationNo}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-red-900 via-slate-900 to-slate-950 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Student Registration & Eligibility Verification
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-extrabold bg-amber-400 text-slate-950 rounded uppercase tracking-wider">
                  PUC Mandatory
                </span>
              </div>
              <div className="text-xs text-slate-300">
                REDDY ONLINE EDUCATION · Founder & CEO: Sudharshan Reddy K R
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8">
          
          {registeredRecord ? (
            /* Confirmation & Slip View */
            <div className="space-y-6 animate-in fade-in">
              <div className={`p-6 rounded-2xl border text-center space-y-3 ${
                registeredRecord.isEligible 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950' 
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto shadow-sm ${
                  registeredRecord.isEligible ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                }`}>
                  {registeredRecord.isEligible ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                </div>

                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-1 ${
                    registeredRecord.isEligible ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                  }`}>
                    {registeredRecord.isEligible ? '✅ ADMISSION ELIGIBLE (PUC VERIFIED)' : '❌ INELIGIBLE (< PUC QUALIFICATION)'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black">
                    {registeredRecord.isEligible 
                      ? 'Student Registration Successfully Recorded!' 
                      : 'Registration Logged as Ineligible'}
                  </h3>
                  <p className="text-xs sm:text-sm mt-1 max-w-xl mx-auto opacity-90">
                    Application Number: <strong className="font-mono text-base">{registeredRecord.applicationNo}</strong>
                  </p>
                </div>

                <div className="text-xs p-3 rounded-xl bg-white/80 border border-current/20 max-w-xl mx-auto text-left font-medium">
                  <div className="font-bold mb-1">Validation Notice (తెలుగు & English):</div>
                  <div>• {registeredRecord.isEligible ? eligibility.messageEn : eligibility.ruleExplanationEn}</div>
                  <div className="mt-1 text-slate-700">• {registeredRecord.isEligible ? eligibility.messageTe : eligibility.ruleExplanationTe}</div>
                </div>
              </div>

              {/* Official Registration Slip Preview */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
                  <div>
                    <div className="text-xs font-black tracking-widest text-red-600 uppercase">
                      REDDY ONLINE EDUCATION
                    </div>
                    <h4 className="text-base font-bold text-slate-900">
                      Provisional Student Registration Slip
                    </h4>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-[11px] text-slate-500 block">Registration Timestamp</span>
                    <span className="text-xs font-semibold text-slate-800">{registeredRecord.registeredAtFormatted}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Student Name</span>
                    <strong className="text-slate-900">{registeredRecord.studentName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Phone Number</span>
                    <strong className="text-slate-900">{registeredRecord.phone}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Email Address</span>
                    <strong className="text-slate-900 truncate block">{registeredRecord.email}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Location</span>
                    <strong className="text-slate-900">{registeredRecord.city}, {registeredRecord.state}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs pt-3 border-t border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Applied Course</span>
                    <strong className="text-red-700 font-bold">{registeredRecord.appliedCourseName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Education Level</span>
                    <strong className="text-slate-900">{registeredRecord.qualificationLabel}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Stream / Major</span>
                    <strong className="text-slate-900">{registeredRecord.stream}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">PUC Score / Percentage</span>
                    <strong className="text-slate-900">{registeredRecord.pucPercentage}% (Year: {registeredRecord.passingYear})</strong>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Digitally certified by <strong>Sudharshan Reddy K R</strong> (Founder & CEO)</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDownloadSlip}
                      className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Download className="w-4 h-4 text-slate-500" />
                      Download Slip (TXT)
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 rounded-xl font-bold text-white flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Printer className="w-4 h-4" />
                      Print
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => {
                    setRegisteredRecord(null);
                    setStudentName('');
                    setEmail('');
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Register Another Student
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onViewRegistry();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileCheck className="w-4 h-4" />
                  View All Stored Registrations Directory
                </button>
              </div>
            </div>
          ) : (
            /* Registration & Eligibility Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Mandatory Policy Announcement Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <div className="font-extrabold text-amber-950 flex items-center gap-2">
                    <span>కనీస విద్యార్హత నిబంధన / Mandatory Minimum Admission Requirement</span>
                    <span className="bg-red-600 text-white text-[10px] px-2 py-0.2 rounded font-bold uppercase">
                      PUC (10+2)
                    </span>
                  </div>
                  <p className="text-amber-900 leading-relaxed">
                    Candidates must possess a minimum qualification of <strong>PUC (10+2 / Intermediate / Higher Secondary / 3-Year Diploma)</strong>. Students who have only passed 10th standard / SSLC are <strong>ineligible</strong> for university certification programs.
                  </p>
                  <p className="text-amber-800 text-[11px]">
                    (తెలుగు): రెడ్డి ఆన్‌లైన్ ఎడ్యుకేషన్ లో సర్టిఫికేషన్ పొందడానికి కనీసం PUC (ఇంటర్మీడియట్) పాస్ అయి ఉండాలి. 10వ తరగతి మాత్రమే చదివిన వారికి ప్రవేశ అర్హత లేదు.
                  </p>
                </div>
              </div>

              {/* Section 1: Applied Course */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-red-600" />
                  <span>1. Select Desired Course / ప్రోగ్రామ్ ఎంపిక *</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {COURSES_DATA.map((c) => {
                    const isSelected = selectedCourseId === c.id;
                    return (
                      <button
                        type="button"
                        key={c.id}
                        onClick={() => setSelectedCourseId(c.id)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-red-50 border-red-500 shadow-sm text-red-950 ring-1 ring-red-500'
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {c.code} · {c.categoryLabel}
                        </div>
                        <div className="text-xs font-bold truncate mt-0.5">
                          {c.title}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1">
                          Fee: ₹{c.feeINR.toLocaleString('en-IN')} · {c.durationWeeks} Wks
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 2: Education Level & Live Eligibility Validation */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-red-600" />
                    <span>2. Highest Education Qualification & Stream * (అర్హత పరిశీలన)</span>
                  </label>
                  <span className="text-[11px] font-semibold text-slate-500">
                    Live Eligibility Evaluation Active
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">
                      Highest Completed Education Level *
                    </label>
                    <select
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value as EducationLevel)}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
                    >
                      <option value="puc">PUC / 10+2 / Intermediate (Eligible ✅)</option>
                      <option value="graduate">Degree / Bachelor (B.Sc, B.Tech, BDS, etc.) (Eligible ✅)</option>
                      <option value="diploma">Polytechnic / 3-Year Technical Diploma (Eligible ✅)</option>
                      <option value="postgraduate">Post-Graduate / Masters (Eligible ✅)</option>
                      <option value="10th">10th Standard / SSLC (Ineligible ❌ - Below PUC)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">
                      Stream / Specialization *
                    </label>
                    <input
                      type="text"
                      required
                      value={stream}
                      onChange={(e) => setStream(e.target.value)}
                      placeholder="e.g. Science PCMB, MPC, BiPC, Commerce, Arts"
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">
                      PUC / Intermediate Percentage / GPA (%) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="35"
                      max="100"
                      required
                      value={pucPercentage}
                      onChange={(e) => setPucPercentage(parseFloat(e.target.value) || 0)}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">
                      Year of Passing *
                    </label>
                    <input
                      type="text"
                      required
                      value={passingYear}
                      onChange={(e) => setPassingYear(e.target.value)}
                      placeholder="e.g. 2024, 2025"
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-bold mb-1.5">
                      College / Junior College / Institution Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      placeholder="e.g. MES Pre-University College / Sri Chaitanya Junior College"
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-bold mb-1.5">
                      Board / University Council *
                    </label>
                    <input
                      type="text"
                      required
                      value={boardOrUniversity}
                      onChange={(e) => setBoardOrUniversity(e.target.value)}
                      placeholder="e.g. Karnataka PU Board, AP BIE, Telangana BIE, CBSE"
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                {/* LIVE DYNAMIC VALIDATION CALLOUT */}
                <div className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
                  eligibility.isEligible
                    ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50/90 border-rose-300 text-rose-950 ring-2 ring-rose-400'
                }`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    eligibility.isEligible ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                  }`}>
                    {eligibility.isEligible ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  </div>

                  <div className="text-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                        eligibility.isEligible ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                      }`}>
                        {eligibility.statusBadge}: {eligibility.isEligible ? 'VERIFIED' : 'BELOW REQUIREMENT'}
                      </span>
                      <strong className="text-sm font-bold">
                        {eligibility.isEligible ? eligibility.messageEn : eligibility.messageEn}
                      </strong>
                    </div>
                    <p className="text-[11px] opacity-90">
                      <strong>తెలుగు:</strong> {eligibility.messageTe}
                    </p>
                    <p className="text-[11px] opacity-80 pt-0.5">
                      {eligibility.isEligible ? eligibility.ruleExplanationEn : eligibility.ruleExplanationEn}
                    </p>
                  </div>
                </div>

              </div>

              {/* Section 3: Student Personal & Contact Details */}
              <div className="space-y-3">
                <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-red-600" />
                  <span>3. Student Personal & Contact Information</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Full Student Name *</label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Ramesh Reddy"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. ramesh@example.com"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98800 12345"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">City *</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Bengaluru"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">State *</label>
                      <input
                        type="text"
                        required
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        placeholder="e.g. Karnataka"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Submission Actions */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onViewRegistry();
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <FileCheck className="w-4 h-4 text-slate-500" />
                  View Registered Students List ({'>'})
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-1/2 sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      eligibility.isEligible
                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/30'
                        : 'bg-rose-700 hover:bg-rose-800 text-white shadow-rose-700/30'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>
                      {eligibility.isEligible 
                        ? 'Complete Registration & Store in List' 
                        : 'Submit Application (Will be Flagged Ineligible)'}
                    </span>
                  </button>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
