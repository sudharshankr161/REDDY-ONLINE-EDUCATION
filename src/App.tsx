import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { COURSES_DATA } from './data/coursesData';
import { Course, PaymentTransaction } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FounderSection } from './components/FounderSection';
import { CourseCard } from './components/CourseCard';
import { CourseDetailModal } from './components/CourseDetailModal';
import { FeePaymentModal } from './components/FeePaymentModal';
import { LiveClassRoomModal } from './components/LiveClassRoomModal';
import { StudyMaterialsModal } from './components/StudyMaterialsModal';
import { WebsiteLinksModal } from './components/WebsiteLinksModal';
import { StudentDashboard } from './components/StudentDashboard';
import { CertificateModal } from './components/CertificateModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { AboutPage } from './components/AboutPage';
import { AboutPageModal } from './components/AboutPageModal';
import { VoiceGuideAssistant } from './components/VoiceGuideAssistant';
import { StudentRegistrationModal } from './components/StudentRegistrationModal';
import { StudentRegistrationListModal } from './components/StudentRegistrationListModal';
import { 
  Sparkles, 
  BookOpen, 
  Radio, 
  FileText, 
  Globe, 
  CheckCircle2, 
  PhoneCall,
  ClipboardList,
  GraduationCap
} from 'lucide-react';

const MainApp: React.FC = () => {
  const { user, isEnrolled } = useAuth();

  // Navigation View State: 'home' | 'about'
  const [currentView, setCurrentView] = useState<'home' | 'about'>('home');

  // Search and Category Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal States
  const [aboutPageModalOpen, setAboutPageModalOpen] = useState(false);
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState<Course | null>(null);
  const [selectedCourseForPayment, setSelectedCourseForPayment] = useState<Course | null>(null);
  const [liveClassModalOpen, setLiveClassModalOpen] = useState(false);
  const [liveClassInitialId, setLiveClassInitialId] = useState<string | undefined>(undefined);
  const [studyMaterialsModalOpen, setStudyMaterialsModalOpen] = useState(false);
  const [websiteLinksModalOpen, setWebsiteLinksModalOpen] = useState(false);
  const [studentDashboardOpen, setStudentDashboardOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [certificateData, setCertificateData] = useState<{ courseId: string; certId: string } | null>(null);

  // Student Registration & Eligibility Modals
  const [registrationListModalOpen, setRegistrationListModalOpen] = useState(false);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [selectedCourseForRegistration, setSelectedCourseForRegistration] = useState<string | undefined>(undefined);

  // Success Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Filter Courses
  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'technology' && (course.category === 'technology')) ||
      course.category === selectedCategory;

    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleScrollToFounder = () => {
    const el = document.getElementById('founder-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToCourses = () => {
    const el = document.getElementById('courses-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePaymentSuccess = (transaction: PaymentTransaction) => {
    showToast(`Payment of ₹${transaction.totalPaidINR.toLocaleString('en-IN')} confirmed! Enrolled in ${transaction.courseTitle}.`);
  };

  return (
    <div id="top" className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs font-semibold animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white ml-2">
            ×
          </button>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        onOpenAboutPage={() => {
          setCurrentView('about');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPortal={() => setStudentDashboardOpen(true)}
        onOpenLive={() => { setLiveClassInitialId(undefined); setLiveClassModalOpen(true); }}
        onOpenMaterials={() => setStudyMaterialsModalOpen(true)}
        onOpenLinks={() => setWebsiteLinksModalOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
        onScrollToFounder={() => {
          if (currentView !== 'home') setCurrentView('home');
          setTimeout(() => handleScrollToFounder(), 100);
        }}
        onScrollToCourses={() => {
          if (currentView !== 'home') setCurrentView('home');
          setTimeout(() => handleScrollToCourses(), 100);
        }}
        onOpenRegistrationList={() => setRegistrationListModalOpen(true)}
        onOpenNewRegistration={() => {
          setSelectedCourseForRegistration(undefined);
          setRegistrationModalOpen(true);
        }}
      />

      {/* Conditionally Render: Dedicated About Us Page OR Home Campus View */}
      {currentView === 'about' ? (
        <AboutPage
          onBackToHome={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onExploreCourses={() => {
            setCurrentView('home');
            setTimeout(() => handleScrollToCourses(), 150);
          }}
        />
      ) : (
        <>
          {/* Hero Section */}
          <Hero
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onOpenLive={() => { setLiveClassInitialId(undefined); setLiveClassModalOpen(true); }}
            onOpenLinks={() => setWebsiteLinksModalOpen(true)}
            onScrollToCourses={handleScrollToCourses}
            onScrollToFounder={handleScrollToFounder}
            onOpenRegistrationList={() => setRegistrationListModalOpen(true)}
            onOpenNewRegistration={() => {
              setSelectedCourseForRegistration(undefined);
              setRegistrationModalOpen(true);
            }}
          />

          {/* Founder & CEO Showcase Section (Prominently displaying the uploaded images) */}
          <FounderSection
            onOpenAboutPage={() => {
              setCurrentView('about');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenLinks={() => setWebsiteLinksModalOpen(true)}
            onScrollToCourses={handleScrollToCourses}
          />

          {/* Main Courses Grid Section */}
          <section id="courses-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
              <div>
                <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Comprehensive Academic Catalog
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Featured Programs & Clinical Curricula
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Structured modules, interactive live classes, and verified credentials across technology, mathematics, medicine, and leadership.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => {
                    setCurrentView('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  About Us (Photos & Story)
                </button>
                <button
                  onClick={() => setStudyMaterialsModalOpen(true)}
                  className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  Download Study Guides
                </button>
                <button
                  onClick={() => setRegistrationListModalOpen(true)}
                  className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ClipboardList className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Student Registrations List</span>
                  <span className="text-[10px] bg-emerald-700 text-white px-1.5 py-0.2 rounded font-mono">
                    PUC Min
                  </span>
                </button>
                <button
                  onClick={() => setWebsiteLinksModalOpen(true)}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5" />
                  Website Links
                </button>
              </div>
            </div>

            {/* Courses Cards Grid */}
            {filteredCourses.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">No courses match your query</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing your search query or reset the discipline filter.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onSelectCourse={(c) => setSelectedCourseForDetail(c)}
                    onPayFee={(c) => setSelectedCourseForPayment(c)}
                  />
                ))}
              </div>
            )}

            {/* Direct Admissions & Consultation Helpdesk Banner */}
            <div className="mt-16 bg-gradient-to-r from-red-900 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
              <div className="space-y-2 text-center md:text-left">
                <div className="text-xs font-bold text-amber-400 tracking-wider uppercase flex items-center justify-center md:justify-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Admissions Open For Academic Year 2026-27
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Ready to Advance with Reddy Online Education?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  Talk directly with our academic counseling desk or Founder & CEO Sudharshan Reddy K R to map out your curriculum and scholarship benefits.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 flex-wrap">
                <button
                  onClick={() => {
                    setSelectedCourseForRegistration(undefined);
                    setRegistrationModalOpen(true);
                  }}
                  className="w-full sm:w-auto px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap shadow-md shadow-red-600/30 flex items-center justify-center gap-2"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Check Eligibility & Register (PUC Min)</span>
                </button>
                <button
                  onClick={() => setRegistrationListModalOpen(true)}
                  className="w-full sm:w-auto px-5 py-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shadow-md flex items-center justify-center gap-2"
                >
                  <ClipboardList className="w-4 h-4" />
                  <span>Students Registry List</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentView('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-4 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap"
                >
                  Campus & Photos
                </button>
              </div>
            </div>

          </section>
        </>
      )}

      {/* Institutional Footer */}
      <Footer
        onOpenAboutPage={() => {
          setCurrentView('about');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPortal={() => setStudentDashboardOpen(true)}
        onOpenLive={() => { setLiveClassInitialId(undefined); setLiveClassModalOpen(true); }}
        onOpenMaterials={() => setStudyMaterialsModalOpen(true)}
        onOpenLinks={() => setWebsiteLinksModalOpen(true)}
        onScrollToFounder={handleScrollToFounder}
        onScrollToCourses={handleScrollToCourses}
      />

      {/* MODAL 1: Course Detail & Structured Syllabus Viewer */}
      {selectedCourseForDetail && (
        <CourseDetailModal
          course={selectedCourseForDetail}
          onClose={() => setSelectedCourseForDetail(null)}
          onPayFee={(course) => {
            setSelectedCourseForDetail(null);
            setSelectedCourseForPayment(course);
          }}
        />
      )}

      {/* MODAL 2: Fee Payment & Course Registration */}
      {selectedCourseForPayment && (
        <FeePaymentModal
          course={selectedCourseForPayment}
          onClose={() => setSelectedCourseForPayment(null)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* MODAL 3: Interactive Virtual Classroom */}
      {liveClassModalOpen && (
        <LiveClassRoomModal
          initialClassId={liveClassInitialId}
          onClose={() => setLiveClassModalOpen(false)}
        />
      )}

      {/* MODAL 4: Downloadable Study Materials Catalog */}
      {studyMaterialsModalOpen && (
        <StudyMaterialsModal
          onClose={() => setStudyMaterialsModalOpen(false)}
        />
      )}

      {/* MODAL 5: Official Website Links Directory */}
      {websiteLinksModalOpen && (
        <WebsiteLinksModal
          onClose={() => setWebsiteLinksModalOpen(false)}
        />
      )}

      {/* MODAL 6: Student Dashboard & Progress Tracking */}
      {studentDashboardOpen && (
        <StudentDashboard
          onClose={() => setStudentDashboardOpen(false)}
          onSelectCourse={(c) => {
            setStudentDashboardOpen(false);
            setSelectedCourseForDetail(c);
          }}
          onJoinLiveClass={(classId) => {
            setStudentDashboardOpen(false);
            setLiveClassInitialId(classId);
            setLiveClassModalOpen(true);
          }}
          onOpenCertificate={(courseId, certId) => {
            setCertificateData({ courseId, certId });
          }}
          onExploreCourses={() => {
            setStudentDashboardOpen(false);
            handleScrollToCourses();
          }}
        />
      )}

      {/* MODAL 7: Verified Digital Certificate */}
      {certificateData && (
        <CertificateModal
          courseId={certificateData.courseId}
          certificateId={certificateData.certId}
          onClose={() => setCertificateData(null)}
        />
      )}

      {/* MODAL 8: Student Authentication / Registration */}
      {authModalOpen && (
        <AuthModal
          onClose={() => setAuthModalOpen(false)}
          onSuccess={() => {
            showToast('Welcome back to Reddy Online Education!');
            setStudentDashboardOpen(true);
          }}
        />
      )}

      {/* MODAL 9: About Page Quick Modal */}
      {aboutPageModalOpen && (
        <AboutPageModal
          onClose={() => setAboutPageModalOpen(false)}
          onExploreCourses={() => {
            setAboutPageModalOpen(false);
            if (currentView !== 'home') setCurrentView('home');
            setTimeout(() => handleScrollToCourses(), 150);
          }}
        />
      )}

      {/* MODAL 10: Student Registration Directory / Registered Students List & Courses */}
      {registrationListModalOpen && (
        <StudentRegistrationListModal
          onClose={() => setRegistrationListModalOpen(false)}
          onOpenNewRegistration={() => {
            setSelectedCourseForRegistration(undefined);
            setRegistrationModalOpen(true);
          }}
        />
      )}

      {/* MODAL 11: Student Registration & PUC Eligibility Validator Form */}
      {registrationModalOpen && (
        <StudentRegistrationModal
          initialCourseId={selectedCourseForRegistration}
          onClose={() => setRegistrationModalOpen(false)}
          onViewRegistry={() => {
            setRegistrationModalOpen(false);
            setRegistrationListModalOpen(true);
          }}
          onRegistrationComplete={(rec) => {
            showToast(`Registration ${rec.applicationNo} logged (${rec.isEligible ? 'Eligible' : 'Ineligible'}).`);
          }}
        />
      )}

      {/* Floating Female Voice Guide Assistant (Women Sound / మహిళా వాయిస్ అసిస్టెంట్) */}
      <VoiceGuideAssistant />

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
