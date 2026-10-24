import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { COURSES_DATA } from '../data/coursesData';
import { LIVE_CLASSES_DATA } from '../data/liveClassesData';
import { Course, PaymentTransaction } from '../types';
import { 
  X, 
  GraduationCap, 
  BookOpen, 
  Radio, 
  Award, 
  Receipt, 
  Clock, 
  CheckCircle2, 
  Download, 
  Printer, 
  ExternalLink,
  ArrowRight,
  Sparkles,
  UserCheck
} from 'lucide-react';

interface StudentDashboardProps {
  onClose: () => void;
  onSelectCourse: (course: Course) => void;
  onJoinLiveClass: (classId: string) => void;
  onOpenCertificate: (courseId: string, certId: string) => void;
  onExploreCourses: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onClose,
  onSelectCourse,
  onJoinLiveClass,
  onOpenCertificate,
  onExploreCourses
}) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'courses' | 'live' | 'certificates' | 'receipts'>('courses');

  if (!user) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-4">
          <GraduationCap className="w-12 h-12 text-red-600 mx-auto" />
          <h3 className="text-xl font-bold text-slate-900">Student Portal Login Required</h3>
          <p className="text-xs text-slate-600">
            Please log in or select a demo account to access your personalized learning dashboard.
          </p>
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const enrolledCourseIds = Object.keys(user.enrolledCourses);
  const enrolledCourses = COURSES_DATA.filter((c) => enrolledCourseIds.includes(c.id));

  // Compute overall statistics
  const totalEnrolled = enrolledCourses.length;
  const certifiedCount = Object.values(user.enrolledCourses).filter((p) => p.certified).length;
  const avgProgress = totalEnrolled > 0
    ? Math.round(
        Object.values(user.enrolledCourses).reduce((acc, p) => acc + p.progressPercentage, 0) /
          totalEnrolled
      )
    : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Dashboard Header Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-red-600 flex items-center justify-center text-white font-black text-lg shadow-md">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {user.name}
                </h2>
                <span className="text-[10px] bg-red-500/20 text-red-300 font-mono font-bold px-2 py-0.5 rounded border border-red-500/30">
                  {user.studentId}
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                <span>{user.batch}</span>
                <span aria-hidden="true">·</span>
                <span>{user.collegeOrWorkplace}</span>
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

        {/* Quick KPI Metric Strip */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs shrink-0">
          <div>
            <span className="text-slate-500 block text-[11px]">Enrolled Subjects</span>
            <strong className="text-slate-900 text-sm tabular-nums">{totalEnrolled} Courses</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Average Progress</span>
            <strong className="text-slate-900 text-sm tabular-nums">{avgProgress}% Completed</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Verified Certificates</span>
            <strong className="text-emerald-700 text-sm tabular-nums">{certifiedCount} Awarded</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Attendance Rate</span>
            <strong className="text-slate-900 text-sm tabular-nums">96.8% Live Lectures</strong>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-slate-200 bg-white flex items-center gap-4 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('courses')}
            className={`py-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'courses'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Enrolled Subjects ({enrolledCourses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('live')}
            className={`py-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'live'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Radio className="w-4 h-4 text-red-500" />
            <span>Live Classes Schedule</span>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`py-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'certificates'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span>Certificates of Completion ({certifiedCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('receipts')}
            className={`py-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'receipts'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Receipt className="w-4 h-4 text-slate-400" />
            <span>Fee Receipts ({user.paymentHistory.length})</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* TAB 1: ENROLLED COURSES */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              {enrolledCourses.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">No Courses Enrolled Yet</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Browse our curriculum in Python, Applied Mathematics, BSc Nursing, BDS Dentistry, AIML, and Communication Skills to begin.
                  </p>
                  <button
                    onClick={() => { onClose(); onExploreCourses(); }}
                    className="px-5 py-2.5 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-colors cursor-pointer"
                  >
                    Explore Course Catalog
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enrolledCourses.map((course) => {
                    const prog = user.enrolledCourses[course.id];
                    const percent = prog?.progressPercentage || 0;
                    const isCert = prog?.certified;

                    return (
                      <div
                        key={course.id}
                        className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono text-red-600 font-bold">{course.code}</span>
                            <span className="text-slate-500">{course.categoryLabel}</span>
                          </div>

                          <h4 className="text-base font-bold text-slate-900 leading-snug">
                            {course.title}
                          </h4>

                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span>Faculty: {course.instructor}</span>
                            <span aria-hidden="true">·</span>
                            <span>{prog?.completedLessonIds.length || 0} / {course.totalLessons} Lessons</span>
                          </div>

                          {/* Progress Bar */}
                          <div className="space-y-1 pt-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-medium text-slate-600">Syllabus Completion</span>
                              <span className="font-mono font-bold text-slate-900">{percent}%</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  isCert ? 'bg-amber-500' : 'bg-red-600'
                                }`}
                                style={{ width: `${Math.max(5, percent)}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Card Action Controls */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                          {isCert ? (
                            <button
                              onClick={() => onOpenCertificate(course.id, prog?.certificateId || 'CERT-ROE-8812')}
                              className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Award className="w-3.5 h-3.5 text-amber-600" />
                              View Certificate
                            </button>
                          ) : (
                            <span className="text-[11px] text-slate-500">
                              Reach 80% to earn certificate
                            </span>
                          )}

                          <button
                            onClick={() => onSelectCourse(course)}
                            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <span>Resume Study</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LIVE CLASSES SCHEDULE */}
          {activeTab === 'live' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600 pb-2">
                All scheduled interactive live classrooms are hosted by Chancellor Sudharshan Reddy K R and certified department faculty.
              </div>

              <div className="space-y-3">
                {LIVE_CLASSES_DATA.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        {item.status === 'live_now' ? (
                          <span className="bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            LIVE NOW
                          </span>
                        ) : (
                          <span className="bg-slate-100 text-slate-700 font-semibold text-[10px] px-2 py-0.5 rounded">
                            {item.date} · {item.time}
                          </span>
                        )}
                        <span className="text-slate-500">{item.courseTitle}</span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900">
                        {item.topic}
                      </h4>

                      <div className="text-xs text-slate-500">
                        Faculty: <strong>{item.instructor}</strong> · {item.durationMinutes} Minutes
                      </div>
                    </div>

                    <button
                      onClick={() => onJoinLiveClass(item.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                        item.status === 'live_now'
                          ? 'bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-600/20'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <Radio className="w-3.5 h-3.5" />
                      <span>{item.status === 'live_now' ? 'Join Virtual Class' : 'Enter Class Room'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CERTIFICATES OF COMPLETION */}
          {activeTab === 'certificates' && (
            <div className="space-y-6">
              {certifiedCount === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <Award className="w-12 h-12 text-amber-300 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">No Certificates Awarded Yet</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Complete at least 80% of the lessons and pass the module assessment in any enrolled subject to receive your verified digital credential signed by Founder & CEO Sudharshan Reddy K R.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enrolledCourses.filter((c) => user.enrolledCourses[c.id]?.certified).map((c) => {
                    const prog = user.enrolledCourses[c.id];
                    return (
                      <div
                        key={c.id}
                        className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono text-amber-800 font-bold">{prog?.certificateId}</span>
                            <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Verified
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-slate-900">
                            {c.certificationTitle}
                          </h4>

                          <div className="text-xs text-slate-600">
                            Issued to: <strong>{user.name}</strong> · Chancellor: <strong>Sudharshan Reddy K R</strong>
                          </div>
                        </div>

                        <button
                          onClick={() => onOpenCertificate(c.id, prog?.certificateId || 'CERT-ROE-8812')}
                          className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          View & Print Certificate
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: FEE PAYMENT RECEIPTS */}
          {activeTab === 'receipts' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600 pb-2">
                Official GST-compliant tuition fee payment tax receipts issued by Reddy Online Education Finance Directorate.
              </div>

              {user.paymentHistory.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs">
                  No payment transactions on record.
                </div>
              ) : (
                <div className="space-y-3">
                  {user.paymentHistory.map((txn) => (
                    <div
                      key={txn.transactionId}
                      className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-mono font-bold text-slate-900">{txn.invoiceNumber}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-emerald-700 font-bold text-[11px]">{txn.status}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-slate-500">{txn.paymentMethod}</span>
                        </div>

                        <h4 className="text-sm font-bold text-slate-900">
                          {txn.courseTitle}
                        </h4>

                        <div className="text-xs text-slate-500">
                          Date: {new Date(txn.timestamp).toLocaleDateString()} · Txn: {txn.transactionId}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-extrabold text-slate-900 tabular-nums">
                            ₹{txn.totalPaidINR.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[10px] text-slate-400">Paid in Full</div>
                        </div>

                        <button
                          onClick={() => {
                            const blob = new Blob([
                              `REDDY ONLINE EDUCATION INVOICE\nInvoice: ${txn.invoiceNumber}\nStudent: ${user.name}\nCourse: ${txn.courseTitle}\nTotal Paid: INR ${txn.totalPaidINR}\nStatus: SUCCESS\nSigned: Sudharshan Reddy K R (CEO)`
                            ], { type: 'text/plain;charset=utf-8' });
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = `Invoice_${txn.invoiceNumber}.txt`;
                            link.click();
                            URL.revokeObjectURL(url);
                          }}
                          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                          title="Download Receipt"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
