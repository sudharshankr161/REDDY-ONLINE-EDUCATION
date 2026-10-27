export type CourseCategory = 'technology' | 'mathematics' | 'healthcare' | 'dental' | 'communication';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrlPlaceholder?: string;
  summary: string;
  keyPoints: string[];
  codeSnippetOrClinicalCase?: string;
  downloadableResourceTitle?: string;
  completed?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface CourseModule {
  id: string;
  moduleNumber: number;
  title: string;
  duration: string;
  lessons: Lesson[];
  quiz?: {
    id: string;
    title: string;
    questions: QuizQuestion[];
  };
}

export interface Course {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  category: CourseCategory;
  categoryLabel: string;
  image: string;
  instructor: string;
  instructorTitle: string;
  totalModules: number;
  totalLessons: number;
  durationWeeks: number;
  rating: number;
  enrolledStudentsCount: number;
  feeINR: number;
  originalFeeINR: number;
  level: 'Beginner to Advanced' | 'Undergraduate / Professional' | 'Advanced Clinical / Specialized' | 'Foundation & Applied';
  certificationTitle: string;
  highlights: string[];
  prerequisites: string;
  modules: CourseModule[];
}

export interface LiveClass {
  id: string;
  courseId: string;
  courseTitle: string;
  topic: string;
  instructor: string;
  date: string;
  time: string;
  durationMinutes: number;
  status: 'live_now' | 'upcoming' | 'completed';
  meetingRoomId: string;
  attendeesCount: number;
  agenda: string[];
}

export interface StudyMaterial {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  category: string;
  fileType: 'PDF' | 'Code Repository' | 'Clinical Protocol' | 'Formula Atlas' | 'Worksheet';
  fileSize: string;
  downloadsCount: number;
  description: string;
  sampleContent: string;
}

export interface PaymentTransaction {
  transactionId: string;
  courseId: string;
  courseTitle: string;
  studentName: string;
  studentEmail: string;
  amountINR: number;
  discountINR: number;
  gstINR: number;
  totalPaidINR: number;
  paymentMethod: 'UPI' | 'Credit/Debit Card' | 'Netbanking';
  timestamp: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  invoiceNumber: string;
}

export interface EnrolledCourseProgress {
  courseId: string;
  enrolledAt: string;
  completedLessonIds: string[];
  quizScores: Record<string, number>; // quizId -> score percentage
  progressPercentage: number;
  certified: boolean;
  certificateId?: string;
}

export interface UserProfile {
  id: string;
  studentId: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  role: 'student' | 'faculty';
  batch: string;
  collegeOrWorkplace: string;
  enrolledCourses: Record<string, EnrolledCourseProgress>; // courseId -> progress
  paymentHistory: PaymentTransaction[];
}

export type EducationLevel = '10th' | 'puc' | 'diploma' | 'graduate' | 'postgraduate';

export interface EligibilityResult {
  isEligible: boolean;
  qualification: EducationLevel;
  qualificationLabel: string;
  statusBadge: 'ELIGIBLE' | 'INELIGIBLE';
  messageEn: string;
  ruleExplanationEn: string;
}

export interface StudentRegistrationRecord {
  id: string;
  applicationNo: string;
  studentName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  qualification: EducationLevel;
  qualificationLabel: string;
  stream: string;
  pucPercentage: number;
  passingYear: string;
  collegeName: string;
  boardOrUniversity: string;
  appliedCourseId: string;
  appliedCourseName: string;
  isEligible: boolean;
  eligibilityBadge: 'ELIGIBLE' | 'INELIGIBLE';
  eligibilityRemarks: string;
  status: 'Admission Confirmed' | 'Provisionally Eligible' | 'Ineligible - Rejected' | 'Under Review';
  feeStatus: 'Paid' | 'Partial / 1st Installment' | 'Pending Payment' | 'N/A (Ineligible)';
  feePaidINR: number;
  registeredAt: string;
  registeredAtFormatted: string;
}

