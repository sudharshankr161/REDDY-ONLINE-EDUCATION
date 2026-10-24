import React, { useState } from 'react';
import { Course, CourseModule, Lesson } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  X, 
  CheckCircle2, 
  PlayCircle, 
  FileText, 
  HelpCircle, 
  Clock, 
  Award, 
  Lock, 
  BookOpen, 
  Code2, 
  Sparkles,
  ChevronRight,
  CreditCard
} from 'lucide-react';

interface CourseDetailModalProps {
  course: Course;
  onClose: () => void;
  onPayFee: (course: Course) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onPayFee
}) => {
  const { isEnrolled, getCourseProgress, completeLesson, submitQuizScore } = useAuth();
  const enrolled = isEnrolled(course.id);
  const progress = getCourseProgress(course.id);

  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const currentModule: CourseModule = course.modules[activeModuleIndex] || course.modules[0];
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(currentModule?.lessons[0] || {} as Lesson);
  
  // Interactive Quiz State
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'lessons' | 'quiz' | 'highlights'>('lessons');

  const isLessonDone = (lessonId: string) => {
    return Boolean(progress?.completedLessonIds.includes(lessonId));
  };

  const handleCompleteCurrentLesson = () => {
    if (selectedLesson?.id) {
      completeLesson(course.id, selectedLesson.id);
    }
  };

  const handleSelectQuizOption = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedQuizAnswers({
      ...selectedQuizAnswers,
      [questionId]: optionIndex
    });
  };

  const handleSubmitQuiz = () => {
    if (!currentModule.quiz) return;
    setQuizSubmitted(true);
    let correctCount = 0;
    currentModule.quiz.questions.forEach((q) => {
      if (selectedQuizAnswers[q.id] === q.correctOptionIndex) {
        correctCount++;
      }
    });
    const percentage = Math.round((correctCount / currentModule.quiz.questions.length) * 100);
    submitQuizScore(course.id, currentModule.quiz.id, percentage);
  };

  const handleResetQuiz = () => {
    setSelectedQuizAnswers({});
    setQuizSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <span className="bg-red-600 text-white font-mono text-xs px-2.5 py-1 rounded font-bold">
              {course.code}
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white line-clamp-1">
                {course.title}
              </h2>
              <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                <span>{course.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>Faculty: {course.instructor}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!enrolled && (
              <button
                onClick={() => onPayFee(course)}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <CreditCard className="w-3.5 h-3.5" />
                Register & Pay Fee
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Enrollment Status Notice Banner */}
        {!enrolled ? (
          <div className="bg-amber-50 px-6 py-2.5 border-b border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Syllabus Preview Mode:</strong> Register to unlock all <strong>{course.totalLessons} interactive lectures</strong>, downloadable verified study materials, and CEO Sudharshan Reddy K R signed certificate.
              </span>
            </div>
            <button
              onClick={() => onPayFee(course)}
              className="font-bold underline hover:text-amber-950 shrink-0 cursor-pointer"
            >
              Pay Fee (₹{course.feeINR.toLocaleString('en-IN')}) →
            </button>
          </div>
        ) : (
          <div className="bg-emerald-50 px-6 py-2 border-b border-emerald-200 text-xs text-emerald-900 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>You are enrolled in this course. Current Progress: <strong>{progress?.progressPercentage || 0}%</strong></span>
            </div>
            {progress?.certified && (
              <span className="font-bold text-amber-800 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-600" /> Certificate Ready
              </span>
            )}
          </div>
        )}

        {/* Modal Body: Left Sidebar (Modules) & Right Main (Lesson Details) */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-0">
          
          {/* Left Column: Modules & Lessons Navigator (4 cols) */}
          <div className="md:col-span-4 border-r border-slate-200 bg-slate-50 overflow-y-auto p-4 space-y-4">
            
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
              Curriculum Modules ({course.modules.length})
            </div>

            <div className="space-y-3">
              {course.modules.map((mod, idx) => (
                <div 
                  key={mod.id}
                  className={`rounded-xl border transition-all ${
                    activeModuleIndex === idx 
                      ? 'bg-white border-red-300 shadow-sm' 
                      : 'bg-white/60 border-slate-200 hover:bg-white'
                  }`}
                >
                  <button
                    onClick={() => {
                      setActiveModuleIndex(idx);
                      setSelectedLesson(mod.lessons[0] || {} as Lesson);
                      setActiveTab('lessons');
                    }}
                    className="w-full p-3 text-left flex items-start justify-between gap-2 cursor-pointer"
                  >
                    <div>
                      <div className="text-[11px] font-bold text-red-600">
                        Module {mod.moduleNumber}
                      </div>
                      <div className="text-xs font-bold text-slate-900 line-clamp-1">
                        {mod.title}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {mod.duration}
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-slate-400 mt-1 transition-transform ${activeModuleIndex === idx ? 'rotate-90 text-red-600' : ''}`} />
                  </button>

                  {/* If active module, list lessons */}
                  {activeModuleIndex === idx && (
                    <div className="px-3 pb-3 pt-1 border-t border-slate-100 space-y-1">
                      {mod.lessons.map((les) => {
                        const done = isLessonDone(les.id);
                        const isSelected = selectedLesson?.id === les.id;
                        return (
                          <button
                            key={les.id}
                            onClick={() => {
                              setSelectedLesson(les);
                              setActiveTab('lessons');
                            }}
                            className={`w-full p-2 rounded-lg text-left text-xs flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                              isSelected 
                                ? 'bg-red-50 text-red-900 font-semibold' 
                                : 'text-slate-700 hover:bg-slate-100 font-normal'
                            }`}
                          >
                            <span className="line-clamp-1 flex-1">{les.title}</span>
                            {done ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            ) : (
                              <span className="text-[10px] text-slate-400 tabular-nums shrink-0">{les.duration}</span>
                            )}
                          </button>
                        );
                      })}

                      {mod.quiz && (
                        <button
                          onClick={() => setActiveTab('quiz')}
                          className={`w-full p-2 mt-1 rounded-lg text-left text-xs flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                            activeTab === 'quiz'
                              ? 'bg-amber-50 text-amber-900 font-bold border border-amber-200'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                            Module Assessment Quiz
                          </span>
                          {progress?.quizScores[mod.quiz.id] !== undefined && (
                            <span className="text-[10px] font-mono font-bold text-emerald-600">
                              {progress.quizScores[mod.quiz.id]}%
                            </span>
                          )}
                        </button>
                      )}
                    </div>
                  )}

                </div>
              ))}
            </div>

            {/* Course Details Switcher */}
            <button
              onClick={() => setActiveTab('highlights')}
              className={`w-full p-3 rounded-xl border text-xs font-semibold text-center cursor-pointer transition-colors ${
                activeTab === 'highlights' 
                  ? 'bg-slate-900 text-white border-slate-900' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Course Overview & Prerequisites
            </button>

          </div>

          {/* Right Column: Main Content Stage (8 cols) */}
          <div className="md:col-span-8 overflow-y-auto p-6 space-y-6">
            
            {activeTab === 'lessons' && selectedLesson && (
              <div className="space-y-6">
                
                {/* Lesson Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                  <div>
                    <div className="text-xs font-semibold text-red-600 flex items-center gap-1">
                      <span>Module {currentModule.moduleNumber}</span>
                      <span aria-hidden="true">·</span>
                      <span>Lesson Details</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                      {selectedLesson.title}
                    </h3>
                  </div>

                  {enrolled && (
                    <button
                      onClick={handleCompleteCurrentLesson}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                        isLessonDone(selectedLesson.id)
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {isLessonDone(selectedLesson.id) ? 'Completed' : 'Mark as Completed'}
                    </button>
                  )}
                </div>

                {/* Simulated Interactive Video Lecture Screen */}
                <div className="relative aspect-video w-full rounded-2xl bg-slate-950 overflow-hidden shadow-inner flex flex-col justify-between p-4 text-white">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      REDDY ONLINE EDUCATION · Lecture Stream
                    </span>
                    <span className="font-mono">{selectedLesson.duration}</span>
                  </div>

                  <div className="flex flex-col items-center justify-center text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer">
                      <PlayCircle className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{selectedLesson.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">Faculty: {course.instructor}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                    <span>1080p Full HD</span>
                    <span>Subtitles: English / Hindi</span>
                    <span>Interactive Speed: 1.0x</span>
                  </div>
                </div>

                {/* Lesson Summary & Key Concepts */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900">
                    Conceptual Summary & Learning Objectives
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {selectedLesson.summary}
                  </p>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="text-xs font-bold text-slate-900">
                      Core Academic Takeaways:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {selectedLesson.keyPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Practical Code or Clinical Case Study Box */}
                {selectedLesson.codeSnippetOrClinicalCase && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Code2 className="w-4 h-4 text-slate-600" />
                        Practical Lab Simulation & Protocol Reference
                      </span>
                      <span className="text-slate-400 font-mono text-[11px]">Interactive Workspace</span>
                    </div>
                    <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
                      <code>{selectedLesson.codeSnippetOrClinicalCase}</code>
                    </pre>
                  </div>
                )}

              </div>
            )}

            {/* Interactive Module Quiz Tab */}
            {activeTab === 'quiz' && currentModule.quiz && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-slate-200">
                  <div className="text-xs font-bold text-amber-700">Module Knowledge Check</div>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    {currentModule.quiz.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Answer the clinical/technical diagnostic questions below to test your mastery.
                  </p>
                </div>

                <div className="space-y-6">
                  {currentModule.quiz.questions.map((q, qIndex) => {
                    const selectedOpt = selectedQuizAnswers[q.id];
                    return (
                      <div key={q.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                        <div className="text-sm font-bold text-slate-900">
                          {qIndex + 1}. {q.question}
                        </div>

                        <div className="space-y-2">
                          {q.options.map((opt, optIndex) => {
                            let optionClass = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';
                            
                            if (selectedOpt === optIndex) {
                              optionClass = 'bg-red-50 border-red-500 text-red-950 font-semibold';
                            }

                            if (quizSubmitted) {
                              if (optIndex === q.correctOptionIndex) {
                                optionClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                              } else if (selectedOpt === optIndex && selectedOpt !== q.correctOptionIndex) {
                                optionClass = 'bg-rose-50 border-rose-500 text-rose-950';
                              }
                            }

                            return (
                              <button
                                key={optIndex}
                                onClick={() => handleSelectQuizOption(q.id, optIndex)}
                                className={`w-full p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer flex items-center justify-between ${optionClass}`}
                              >
                                <span>{opt}</span>
                                {quizSubmitted && optIndex === q.correctOptionIndex && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {quizSubmitted && (
                          <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                            <span className="font-bold text-slate-900">Academic Explanation: </span>
                            <span>{q.explanation}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Quiz Controls */}
                <div className="pt-4 flex items-center justify-between gap-3">
                  {!quizSubmitted ? (
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={Object.keys(selectedQuizAnswers).length === 0}
                      className="px-6 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      Submit Answers & Grade
                    </button>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleResetQuiz}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                      >
                        Retake Quiz
                      </button>
                      <span className="text-xs font-bold text-emerald-700">
                        Score Recorded in Student Portal
                      </span>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Course Overview / Highlights Tab */}
            {activeTab === 'highlights' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Course Highlights & Outcomes</h3>
                  <p className="text-xs text-slate-600 mt-1">{course.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.highlights.map((hl, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-700">
                      <Sparkles className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="font-bold text-slate-900">Official Certification Title:</div>
                  <div className="text-slate-700">{course.certificationTitle}</div>
                  <div className="font-bold text-slate-900 pt-2">Prerequisites:</div>
                  <div className="text-slate-600">{course.prerequisites}</div>
                </div>

                {!enrolled && (
                  <div className="p-6 bg-red-50/60 rounded-2xl border border-red-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-bold text-red-950">Enroll in {course.title}</div>
                      <div className="text-xs text-red-800">
                        Tuition Fee: ₹{course.feeINR.toLocaleString('en-IN')} (Eligible for ₹1,500 REDDY2026 scholarship)
                      </div>
                    </div>
                    <button
                      onClick={() => onPayFee(course)}
                      className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-red-600/20 cursor-pointer whitespace-nowrap"
                    >
                      Register Now
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
