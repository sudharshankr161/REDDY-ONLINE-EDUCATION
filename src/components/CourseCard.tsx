import React, { useState } from 'react';
import { Course } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  Clock, 
  BookOpen, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  CreditCard,
  Sparkles,
  Users
} from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onSelectCourse: (course: Course) => void;
  onPayFee: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onSelectCourse,
  onPayFee
}) => {
  const { isEnrolled, getCourseProgress } = useAuth();
  const enrolled = isEnrolled(course.id);
  const progress = getCourseProgress(course.id);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-md transition-all duration-200 group">
      
      {/* Subject Visual Image with Resilient Fallback Container */}
      <div className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden">
        {!imageError ? (
          <img
            src={course.image}
            alt={course.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-800 to-slate-950 text-white">
            <BookOpen className="w-10 h-10 text-amber-400 mb-2" />
            <span className="text-sm font-semibold">{course.title}</span>
            <span className="text-xs text-slate-400 mt-1">{course.categoryLabel}</span>
          </div>
        )}

        {/* Quiet overlay scrim for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

        {/* Category & Course Code Kicker (Clean unboxed text) */}
        <div className="absolute top-3 left-3 text-xs font-semibold text-white/90 drop-shadow flex items-center gap-2">
          <span className="bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] text-amber-300 font-mono">
            {course.code}
          </span>
          <span className="text-slate-200 text-[11px]">
            {course.categoryLabel}
          </span>
        </div>

        {/* Enrollment Status Indicator */}
        {enrolled && (
          <div className="absolute top-3 right-3 bg-emerald-600/95 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-md text-[11px] font-bold flex items-center gap-1 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Enrolled
          </div>
        )}

        {/* Rating & Students at bottom of image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
          <div className="flex items-center gap-1 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="tabular-nums">{course.rating.toFixed(2)}</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-300 tabular-nums">({course.enrolledStudentsCount.toLocaleString()} enrolled)</span>
          </div>
          <span className="text-[11px] text-slate-300 font-medium">
            {course.level}
          </span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          {/* Metadata Bar (Zero-Pill Discipline: Unboxed text with subtle typographic separators) */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span className="tabular-nums">{course.totalModules}</span> Modules
            </span>
            <span aria-hidden="true">·</span>
            <span>
              <span className="tabular-nums">{course.totalLessons}</span> Lessons
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="tabular-nums">{course.durationWeeks}</span> Weeks
            </span>
          </div>

          {/* Course Title */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-snug">
            {course.title}
          </h3>

          {/* Subtitle / Description */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {course.subtitle}
          </p>

          {/* Faculty / Instructor Attribution & Eligibility */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <div>
              Faculty: <span className="text-slate-700 font-semibold">{course.instructor}</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Min: PUC (10+2)
            </span>
          </div>
        </div>

        {/* Progress Bar (If Enrolled) */}
        {enrolled && progress && (
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Course Progress</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">
                {progress.progressPercentage}%
              </span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  progress.certified ? 'bg-amber-500' : 'bg-red-600'
                }`}
                style={{ width: `${Math.max(5, progress.progressPercentage)}%` }}
              />
            </div>
            {progress.certified && (
              <div className="text-[10px] text-amber-700 font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Certificate Awarded by CEO Sudharshan Reddy K R
              </div>
            )}
          </div>
        )}

        {/* Fee & Action Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          
          {/* Tuition Fee */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-slate-900 tabular-nums">
                ₹{course.feeINR.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-400 line-through tabular-nums">
                ₹{course.originalFeeINR.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold">
              Save ₹{(course.originalFeeINR - course.feeINR).toLocaleString('en-IN')} (45% off)
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSelectCourse(course)}
              className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
            >
              Modules
            </button>
            
            {enrolled ? (
              <button
                onClick={() => onSelectCourse(course)}
                className="flex items-center gap-1 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => onPayFee(course)}
                className="flex items-center gap-1 px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-red-600/20 transition-all cursor-pointer whitespace-nowrap"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Register</span>
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
