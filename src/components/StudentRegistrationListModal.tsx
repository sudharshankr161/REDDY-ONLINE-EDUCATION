import React, { useState, useEffect } from 'react';
import { StudentRegistrationRecord } from '../types';
import { 
  getStoredRegistrations, 
  deleteRegistration, 
  resetRegistrationsToSeed 
} from '../services/registrationService';
import { 
  X, 
  Search, 
  Filter, 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Download, 
  Printer, 
  Eye, 
  Trash2, 
  Sparkles, 
  FileCheck, 
  Building2, 
  ShieldCheck, 
  PlusCircle, 
  RotateCcw,
  BookOpen,
  Award
} from 'lucide-react';

interface StudentRegistrationListModalProps {
  onClose: () => void;
  onOpenNewRegistration: () => void;
}

export const StudentRegistrationListModal: React.FC<StudentRegistrationListModalProps> = ({
  onClose,
  onOpenNewRegistration
}) => {
  const [registrations, setRegistrations] = useState<StudentRegistrationRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('all');
  const [selectedEligibilityFilter, setSelectedEligibilityFilter] = useState<'all' | 'eligible' | 'ineligible'>('all');
  
  // Selected Record for viewing Registration Slip Modal
  const [viewingRecord, setViewingRecord] = useState<StudentRegistrationRecord | null>(null);

  // Load stored registrations on mount
  useEffect(() => {
    setRegistrations(getStoredRegistrations());
  }, []);

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete registration for ${name}?`)) {
      const updated = deleteRegistration(id);
      setRegistrations(updated);
    }
  };

  const handleResetToSeed = () => {
    if (window.confirm('Reset registration registry to official default benchmark students?')) {
      const resetList = resetRegistrationsToSeed();
      setRegistrations(resetList);
    }
  };

  // Filter registrations
  const filteredRegistrations = registrations.filter((rec) => {
    const matchesSearch =
      rec.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.applicationNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.phone.includes(searchQuery) ||
      rec.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.collegeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.appliedCourseName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCourse =
      selectedCourseFilter === 'all' || rec.appliedCourseId === selectedCourseFilter;

    const matchesEligibility =
      selectedEligibilityFilter === 'all' ||
      (selectedEligibilityFilter === 'eligible' && rec.isEligible) ||
      (selectedEligibilityFilter === 'ineligible' && !rec.isEligible);

    return matchesSearch && matchesCourse && matchesEligibility;
  });

  // Calculate statistics
  const totalRegistrations = registrations.length;
  const eligibleCount = registrations.filter((r) => r.isEligible).length;
  const ineligibleCount = registrations.filter((r) => !r.isEligible).length;
  const totalFeesCollected = registrations.reduce((sum, r) => sum + (r.feePaidINR || 0), 0);

  const handleExportCSV = () => {
    const headers = [
      'Application No',
      'Student Name',
      'Email',
      'Phone',
      'City',
      'State',
      'Education Level',
      'Stream',
      'PUC %',
      'Passing Year',
      'College / Board',
      'Course Applied',
      'Eligibility (PUC Min)',
      'Admission Status',
      'Fee Status',
      'Fee Paid INR',
      'Registered At'
    ];

    const rows = registrations.map((r) => [
      `"${r.applicationNo}"`,
      `"${r.studentName}"`,
      `"${r.email}"`,
      `"${r.phone}"`,
      `"${r.city}"`,
      `"${r.state}"`,
      `"${r.qualificationLabel}"`,
      `"${r.stream}"`,
      r.pucPercentage,
      r.passingYear,
      `"${r.collegeName} (${r.boardOrUniversity})"`,
      `"${r.appliedCourseName}"`,
      r.isEligible ? 'ELIGIBLE' : 'INELIGIBLE',
      `"${r.status}"`,
      `"${r.feeStatus}"`,
      r.feePaidINR,
      `"${r.registeredAtFormatted}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `REDDY_EDUCATION_Student_Registrations_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadSingleSlip = (rec: StudentRegistrationRecord) => {
    const slipText = `=============================================================================
REDDY ONLINE EDUCATION - OFFICIAL STUDENT REGISTRATION SLIP
FOUNDER & CEO: SUDHARSHAN REDDY K R
Application No:    ${rec.applicationNo}
Registration Date: ${rec.registeredAtFormatted}
=============================================================================
ADMISSION ELIGIBILITY STATUS:
Status:           ${rec.eligibilityBadge} (${rec.isEligible ? 'Passed Minimum PUC Criteria' : 'Ineligible (< PUC 10+2 Requirement)'})
Mandatory Rule:   Minimum PUC (10+2 / Intermediate) required for university certification.
Remarks:          ${rec.eligibilityRemarks}

STUDENT PARTICULARS:
-----------------------------------------------------------------------------
Student Name:     ${rec.studentName}
Email Address:    ${rec.email}
Contact Mobile:   ${rec.phone}
Location:         ${rec.city}, ${rec.state}

EDUCATIONAL QUALIFICATION & PUC DETAILS:
-----------------------------------------------------------------------------
Highest Level:    ${rec.qualificationLabel}
Academic Stream:  ${rec.stream}
PUC Score:        ${rec.pucPercentage}% (Year: ${rec.passingYear})
College / Inst:   ${rec.collegeName}
Board / Council:  ${rec.boardOrUniversity}

APPLIED COURSE:
-----------------------------------------------------------------------------
Course Title:     ${rec.appliedCourseName}
Admission Status: ${rec.status}
Fee Status:       ${rec.feeStatus}
Fee Paid:         ₹${rec.feePaidINR.toLocaleString('en-IN')}

=============================================================================
ATTESTATION & REGISTRATION RECORD:
Certified by Admissions Directorate, REDDY ONLINE EDUCATION
Founder & CEO: Sudharshan Reddy K R
Office: Bengaluru & AP/Telangana Centers · sudharshankr1611@gmail.com
=============================================================================`;

    const blob = new Blob([slipText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Registration_Slip_${rec.applicationNo}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      <div className="relative bg-white w-full max-w-7xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[96vh]">
        
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-5 sm:px-8 py-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-600 to-amber-600 text-white flex items-center justify-center shadow-md">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-xl font-extrabold text-white tracking-tight">
                  Student Registrations & Admissions Directory
                </h2>
                <span className="text-xs bg-red-600 text-white px-2.5 py-0.5 rounded-full font-bold">
                  {totalRegistrations} Registered
                </span>
              </div>
              <div className="text-xs text-slate-300">
                REDDY ONLINE EDUCATION · Founder & CEO: Sudharshan Reddy K R · Eligibility: Minimum PUC (10+2)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenNewRegistration();
              }}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-red-600/30 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Registration</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Subheader Metric Badges */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 sm:px-8 py-4 shrink-0">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 font-medium block">Total Applications</span>
                <span className="text-lg font-black text-slate-900">{totalRegistrations}</span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                <GraduationCap className="w-4 h-4" />
              </div>
            </div>

            <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] text-emerald-800 font-bold block">
                  Eligible (PUC / 10+2+)
                </span>
                <span className="text-lg font-black text-emerald-950">
                  {eligibleCount} <span className="text-xs font-semibold text-emerald-700">({Math.round((eligibleCount / (totalRegistrations || 1)) * 100)}%)</span>
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <div className="p-3 bg-rose-50/80 rounded-xl border border-rose-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] text-rose-800 font-bold block">
                  Ineligible (&lt; PUC / 10th Only)
                </span>
                <span className="text-lg font-black text-rose-950">
                  {ineligibleCount} <span className="text-xs font-semibold text-rose-700">({Math.round((ineligibleCount / (totalRegistrations || 1)) * 100)}%)</span>
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center">
                <XCircle className="w-4 h-4" />
              </div>
            </div>

            <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] text-amber-800 font-bold block">
                  Total Fees Recorded
                </span>
                <span className="text-lg font-black text-amber-950">
                  ₹{totalFeesCollected.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

          </div>

          {/* Filter Bar */}
          <div className="mt-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by student name, application #, phone, college, or city..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Course Filter */}
            <div className="flex items-center gap-2">
              <select
                value={selectedCourseFilter}
                onChange={(e) => setSelectedCourseFilter(e.target.value)}
                className="py-2 px-3 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Courses (6)</option>
                <option value="python-core-advanced">Python Programming</option>
                <option value="aiml-engineering-mastery">AI & Machine Learning</option>
                <option value="bsc-nursing-clinical">BSc Nursing Clinical</option>
                <option value="bds-dentistry-clinical">BDS Dentistry</option>
                <option value="advanced-mathematics">Higher Mathematics</option>
                <option value="communication-leadership">Communication Skills</option>
              </select>

              {/* Eligibility Toggle */}
              <div className="inline-flex rounded-xl p-0.5 bg-slate-200 text-xs font-semibold">
                <button
                  onClick={() => setSelectedEligibilityFilter('all')}
                  className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    selectedEligibilityFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All ({registrations.length})
                </button>
                <button
                  onClick={() => setSelectedEligibilityFilter('eligible')}
                  className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                    selectedEligibilityFilter === 'eligible' ? 'bg-emerald-600 text-white shadow-xs' : 'text-emerald-800 hover:text-emerald-950'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3" />
                  Eligible ({eligibleCount})
                </button>
                <button
                  onClick={() => setSelectedEligibilityFilter('ineligible')}
                  className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                    selectedEligibilityFilter === 'ineligible' ? 'bg-rose-600 text-white shadow-xs' : 'text-rose-800 hover:text-rose-950'
                  }`}
                >
                  <XCircle className="w-3 h-3" />
                  Ineligible ({ineligibleCount})
                </button>
              </div>

              {/* Export and Reset Buttons */}
              <button
                onClick={handleExportCSV}
                className="p-2 text-slate-600 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer"
                title="Export registered students to CSV"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetToSeed}
                className="p-2 text-slate-600 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer"
                title="Reset to benchmark verified directory"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Structured Formatted Table Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {filteredRegistrations.length === 0 ? (
            <div className="py-20 text-center space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <FileCheck className="w-12 h-12 text-slate-400 mx-auto" />
              <h4 className="text-base font-bold text-slate-800">No student registration records match this filter</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try broadening your search term or reset eligibility filter.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCourseFilter('all'); setSelectedEligibilityFilter('all'); }}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Application # & Date</th>
                    <th className="py-3 px-4">Student & Contact Details</th>
                    <th className="py-3 px-4">Applied Course</th>
                    <th className="py-3 px-4">Education & PUC Score</th>
                    <th className="py-3 px-4 text-center">Eligibility Validation (PUC Min)</th>
                    <th className="py-3 px-4 text-center">Admission & Fees</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredRegistrations.map((rec) => (
                    <tr 
                      key={rec.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        !rec.isEligible ? 'bg-rose-50/30' : ''
                      }`}
                    >
                      {/* Application # & Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-mono font-bold text-slate-900">
                          {rec.applicationNo}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{rec.registeredAtFormatted}</span>
                        </div>
                      </td>

                      {/* Student & Contact Details */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            rec.isEligible ? 'bg-red-100 text-red-700' : 'bg-rose-100 text-rose-700'
                          }`}>
                            {rec.studentName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-xs">
                              {rec.studentName}
                            </div>
                            <div className="text-[11px] text-slate-500 truncate max-w-[180px]">
                              {rec.email}
                            </div>
                            <div className="text-[10px] text-slate-600 font-medium">
                              {rec.phone} · {rec.city}, {rec.state}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Applied Course */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 max-w-[180px] leading-tight">
                          {rec.appliedCourseName}
                        </div>
                        <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                          {rec.appliedCourseId}
                        </span>
                      </td>

                      {/* Education & PUC Record */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            rec.qualification === '10th' 
                              ? 'bg-rose-100 text-rose-800 border border-rose-300' 
                              : 'bg-blue-100 text-blue-800 border border-blue-200'
                          }`}>
                            {rec.qualificationLabel}
                          </span>
                          <span className="font-mono font-bold text-slate-900 text-xs">
                            {rec.pucPercentage}%
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-600 mt-1 truncate max-w-[200px]" title={rec.stream}>
                          Stream: <strong className="text-slate-800">{rec.stream}</strong>
                        </div>
                        <div className="text-[10px] text-slate-500 truncate max-w-[200px]" title={rec.collegeName}>
                          {rec.collegeName} ({rec.passingYear})
                        </div>
                      </td>

                      {/* Eligibility Validation Badge */}
                      <td className="py-3.5 px-4 text-center">
                        {rec.isEligible ? (
                          <div className="inline-flex flex-col items-center">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              ELIGIBLE (PUC Passed)
                            </span>
                            <span className="text-[10px] text-emerald-700 font-medium mt-0.5">
                              అర్హత ఉంది (10+2 పూర్తి)
                            </span>
                          </div>
                        ) : (
                          <div className="inline-flex flex-col items-center">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-rose-100 text-rose-800 border border-rose-300 shadow-2xs">
                              <XCircle className="w-3.5 h-3.5 text-rose-600" />
                              INELIGIBLE (&lt; PUC)
                            </span>
                            <span className="text-[10px] text-rose-700 font-medium mt-0.5">
                              అనర్హులు (10వ తరగతి మాత్రమే)
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Admission & Fee Status */}
                      <td className="py-3.5 px-4 text-center">
                        <div>
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            rec.status === 'Admission Confirmed' 
                              ? 'bg-slate-900 text-white' 
                              : rec.status === 'Ineligible - Rejected'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {rec.status}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-700 mt-1 font-medium">
                          {rec.feeStatus}
                          {rec.feePaidINR > 0 && (
                            <span className="font-mono font-bold text-emerald-700 ml-1">
                              (₹{rec.feePaidINR.toLocaleString('en-IN')})
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setViewingRecord(rec)}
                            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="View Official Registration Slip"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDownloadSingleSlip(rec)}
                            className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Download Slip (TXT)"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(rec.id, rec.studentName)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Registration Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 sm:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600" />
            <span>
              Academic Registrar & Records Directorate · <strong>REDDY ONLINE EDUCATION</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenNewRegistration();
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Verify & Register Student</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-colors cursor-pointer"
            >
              Close Directory
            </button>
          </div>
        </div>

      </div>

      {/* SUB-MODAL: Registration Slip Details */}
      {viewingRecord && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <FileCheck className="w-5 h-5 text-red-500" />
                <h3 className="text-base font-bold text-white">
                  Student Registration Slip: {viewingRecord.applicationNo}
                </h3>
              </div>
              <button
                onClick={() => setViewingRecord(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              
              {/* Slip Card */}
              <div className="border border-slate-300 rounded-2xl p-5 bg-slate-50 space-y-4">
                <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                  <div>
                    <div className="text-sm font-extrabold text-slate-900">REDDY ONLINE EDUCATION</div>
                    <div className="text-[11px] text-slate-500">Founder & CEO: Sudharshan Reddy K R</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[11px] font-black uppercase ${
                    viewingRecord.isEligible ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {viewingRecord.eligibilityBadge}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Student Name</span>
                    <strong className="text-slate-900 text-sm">{viewingRecord.studentName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Application ID</span>
                    <strong className="font-mono text-slate-900">{viewingRecord.applicationNo}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Email</span>
                    <span className="text-slate-800">{viewingRecord.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Phone</span>
                    <span className="text-slate-800">{viewingRecord.phone}</span>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-3 grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Applied Course</span>
                    <strong className="text-red-700">{viewingRecord.appliedCourseName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Highest Education</span>
                    <span className="text-slate-800 font-semibold">{viewingRecord.qualificationLabel}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">PUC Stream & Score</span>
                    <span className="text-slate-800">{viewingRecord.stream} · {viewingRecord.pucPercentage}%</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">College & Board</span>
                    <span className="text-slate-800">{viewingRecord.collegeName}</span>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-3 p-3 bg-white rounded-xl text-[11px]">
                  <span className="font-bold text-slate-700 block mb-0.5">Eligibility Remarks:</span>
                  <p className="text-slate-600">{viewingRecord.eligibilityRemarks}</p>
                </div>
              </div>

              {/* CEO Digital Seal */}
              <div className="flex items-center justify-between pt-2">
                <div className="text-[11px] text-slate-500">
                  Digitally certified by <strong>Sudharshan Reddy K R</strong> (Founder & CEO)
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownloadSingleSlip(viewingRecord)}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-bold flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-3.5 py-1.5 bg-slate-900 text-white rounded-lg font-bold flex items-center gap-1"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Print
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
