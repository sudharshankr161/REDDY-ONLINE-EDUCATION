import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, PaymentTransaction, EnrolledCourseProgress } from '../types';
import { COURSES_DATA } from '../data/coursesData';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
  enrollInCourse: (courseId: string, paymentDetails: {
    amount: number;
    discount: number;
    gst: number;
    total: number;
    method: 'UPI' | 'Credit/Debit Card' | 'Netbanking';
  }) => PaymentTransaction;
  completeLesson: (courseId: string, lessonId: string) => void;
  submitQuizScore: (courseId: string, quizId: string, scorePercent: number) => void;
  isEnrolled: (courseId: string) => boolean;
  getCourseProgress: (courseId: string) => EnrolledCourseProgress | undefined;
  switchDemoUser: (demoType: 'tech' | 'medical' | 'fresh') => void;
}

const DEFAULT_DEMO_USER: UserProfile = {
  id: 'usr-ananya-8821',
  studentId: 'ROE-2026-9042',
  name: 'Ananya Sharma',
  email: 'ananya.sharma@reddyeducation.online',
  phone: '+91 98450 71234',
  batch: 'Batch 2026-A (Spring)',
  collegeOrWorkplace: 'Bangalore Institute of Science & Health Sciences',
  role: 'student',
  enrolledCourses: {
    'python-core-advanced': {
      courseId: 'python-core-advanced',
      enrolledAt: '2026-09-15',
      completedLessonIds: ['py-l1', 'py-l2'],
      quizScores: { 'py-q1': 100 },
      progressPercentage: 45,
      certified: false
    },
    'bsc-nursing-clinical': {
      courseId: 'bsc-nursing-clinical',
      enrolledAt: '2026-09-20',
      completedLessonIds: ['nur-l1'],
      quizScores: { 'nur-q1': 100 },
      progressPercentage: 28,
      certified: false
    }
  },
  paymentHistory: [
    {
      transactionId: 'TXN-ROE-881249',
      courseId: 'python-core-advanced',
      courseTitle: 'Python Programming & Software Engineering',
      studentName: 'Ananya Sharma',
      studentEmail: 'ananya.sharma@reddyeducation.online',
      amountINR: 4999,
      discountINR: 1500,
      gstINR: 629.82,
      totalPaidINR: 4128.82,
      paymentMethod: 'UPI',
      timestamp: '2026-09-15T14:32:10Z',
      status: 'SUCCESS',
      invoiceNumber: 'INV-ROE-2026-1049'
    },
    {
      transactionId: 'TXN-ROE-992384',
      courseId: 'bsc-nursing-clinical',
      courseTitle: 'BSc Nursing Clinical Practice & Patient Care',
      studentName: 'Ananya Sharma',
      studentEmail: 'ananya.sharma@reddyeducation.online',
      amountINR: 5999,
      discountINR: 1500,
      gstINR: 809.82,
      totalPaidINR: 5308.82,
      paymentMethod: 'UPI',
      timestamp: '2026-09-20T11:15:40Z',
      status: 'SUCCESS',
      invoiceNumber: 'INV-ROE-2026-1182'
    }
  ]
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'reddy_online_education_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_DEMO_USER;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = (email: string, name?: string) => {
    const studentName = name || email.split('@')[0].replace('.', ' ').toUpperCase();
    const newUser: UserProfile = {
      id: 'usr-' + Date.now().toString(36),
      studentId: 'ROE-2026-' + Math.floor(1000 + Math.random() * 9000),
      name: studentName,
      email: email,
      phone: '+91 98800 ' + Math.floor(10000 + Math.random() * 90000),
      batch: 'Batch 2026-A (Active)',
      collegeOrWorkplace: 'Online Distance Learning Division',
      role: 'student',
      enrolledCourses: {},
      paymentHistory: []
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const switchDemoUser = (demoType: 'tech' | 'medical' | 'fresh') => {
    if (demoType === 'tech') {
      setUser({
        ...DEFAULT_DEMO_USER,
        name: 'Ananya Sharma',
        email: 'ananya.sharma@reddyeducation.online',
        enrolledCourses: {
          'python-core-advanced': {
            courseId: 'python-core-advanced',
            enrolledAt: '2026-09-15',
            completedLessonIds: ['py-l1', 'py-l2', 'py-l3', 'py-l4'],
            quizScores: { 'py-q1': 100 },
            progressPercentage: 80,
            certified: true,
            certificateId: 'CERT-ROE-PY-9921'
          },
          'aiml-engineering-mastery': {
            courseId: 'aiml-engineering-mastery',
            enrolledAt: '2026-10-01',
            completedLessonIds: ['aiml-l1'],
            quizScores: { 'aiml-q1': 100 },
            progressPercentage: 35,
            certified: false
          }
        }
      });
    } else if (demoType === 'medical') {
      setUser({
        id: 'usr-karthik-dental',
        studentId: 'ROE-2026-4412',
        name: 'Dr. Karthik Reddy',
        email: 'karthik.bds@reddyeducation.online',
        phone: '+91 97410 88219',
        batch: 'Clinical Dental Fellowship 2026',
        collegeOrWorkplace: 'Government Dental & Medical College',
        role: 'student',
        enrolledCourses: {
          'bds-dentistry-clinical': {
            courseId: 'bds-dentistry-clinical',
            enrolledAt: '2026-08-10',
            completedLessonIds: ['bds-l1', 'bds-l2', 'bds-l3'],
            quizScores: { 'bds-q1': 100 },
            progressPercentage: 75,
            certified: false
          },
          'bsc-nursing-clinical': {
            courseId: 'bsc-nursing-clinical',
            enrolledAt: '2026-09-01',
            completedLessonIds: ['nur-l1', 'nur-l2'],
            quizScores: { 'nur-q1': 100 },
            progressPercentage: 55,
            certified: false
          }
        },
        paymentHistory: [
          {
            transactionId: 'TXN-ROE-772199',
            courseId: 'bds-dentistry-clinical',
            courseTitle: 'BDS Clinical Dentistry & Oral Maxillofacial Surgery',
            studentName: 'Dr. Karthik Reddy',
            studentEmail: 'karthik.bds@reddyeducation.online',
            amountINR: 6499,
            discountINR: 1500,
            gstINR: 899.82,
            totalPaidINR: 5898.82,
            paymentMethod: 'UPI',
            timestamp: '2026-08-10T09:20:00Z',
            status: 'SUCCESS',
            invoiceNumber: 'INV-ROE-2026-0899'
          }
        ]
      });
    } else {
      setUser(null);
    }
  };

  const isEnrolled = (courseId: string): boolean => {
    return Boolean(user && user.enrolledCourses[courseId]);
  };

  const getCourseProgress = (courseId: string): EnrolledCourseProgress | undefined => {
    return user?.enrolledCourses[courseId];
  };

  const enrollInCourse = (
    courseId: string,
    paymentDetails: {
      amount: number;
      discount: number;
      gst: number;
      total: number;
      method: 'UPI' | 'Credit/Debit Card' | 'Netbanking';
    }
  ): PaymentTransaction => {
    const course = COURSES_DATA.find((c) => c.id === courseId);
    const courseTitle = course?.title || 'REDDY ONLINE EDUCATION Course';

    const currentUser = user || {
      id: 'usr-' + Date.now().toString(36),
      studentId: 'ROE-2026-' + Math.floor(1000 + Math.random() * 9000),
      name: 'Admitted Student',
      email: 'student@reddyeducation.online',
      phone: '+91 98800 ' + Math.floor(10000 + Math.random() * 90000),
      batch: 'Batch 2026-A',
      collegeOrWorkplace: 'Online Learning Program',
      role: 'student' as const,
      enrolledCourses: {},
      paymentHistory: []
    };

    const newTransaction: PaymentTransaction = {
      transactionId: 'TXN-ROE-' + Math.floor(100000 + Math.random() * 900000),
      courseId,
      courseTitle,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      amountINR: paymentDetails.amount,
      discountINR: paymentDetails.discount,
      gstINR: paymentDetails.gst,
      totalPaidINR: paymentDetails.total,
      paymentMethod: paymentDetails.method,
      timestamp: new Date().toISOString(),
      status: 'SUCCESS',
      invoiceNumber: 'INV-ROE-2026-' + Math.floor(1000 + Math.random() * 9000)
    };

    const updatedEnrolledCourses = {
      ...currentUser.enrolledCourses,
      [courseId]: {
        courseId,
        enrolledAt: new Date().toISOString().split('T')[0],
        completedLessonIds: [],
        quizScores: {},
        progressPercentage: 5, // initial orientation completed
        certified: false
      }
    };

    const updatedUser: UserProfile = {
      ...currentUser,
      enrolledCourses: updatedEnrolledCourses,
      paymentHistory: [newTransaction, ...currentUser.paymentHistory]
    };

    setUser(updatedUser);
    return newTransaction;
  };

  const completeLesson = (courseId: string, lessonId: string) => {
    if (!user || !user.enrolledCourses[courseId]) return;

    const currentProg = user.enrolledCourses[courseId];
    if (currentProg.completedLessonIds.includes(lessonId)) return;

    const updatedLessons = [...currentProg.completedLessonIds, lessonId];
    const course = COURSES_DATA.find((c) => c.id === courseId);
    const totalLessons = course?.totalLessons || 20;

    const newPercentage = Math.min(100, Math.round((updatedLessons.length / totalLessons) * 100));
    const isNowCertified = newPercentage >= 80;

    setUser({
      ...user,
      enrolledCourses: {
        ...user.enrolledCourses,
        [courseId]: {
          ...currentProg,
          completedLessonIds: updatedLessons,
          progressPercentage: newPercentage,
          certified: isNowCertified,
          certificateId: isNowCertified
            ? currentProg.certificateId || 'CERT-ROE-' + courseId.slice(0, 3).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000)
            : undefined
        }
      }
    });
  };

  const submitQuizScore = (courseId: string, quizId: string, scorePercent: number) => {
    if (!user || !user.enrolledCourses[courseId]) return;

    const currentProg = user.enrolledCourses[courseId];
    setUser({
      ...user,
      enrolledCourses: {
        ...user.enrolledCourses,
        [courseId]: {
          ...currentProg,
          quizScores: {
            ...currentProg.quizScores,
            [quizId]: scorePercent
          }
        }
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
        enrollInCourse,
        completeLesson,
        submitQuizScore,
        isEnrolled,
        getCourseProgress,
        switchDemoUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
