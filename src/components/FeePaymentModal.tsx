import React, { useState } from 'react';
import { Course, PaymentTransaction, EducationLevel } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  checkEligibility, 
  QUALIFICATION_LABELS, 
  saveNewRegistration 
} from '../services/registrationService';
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle,
  Sparkles, 
  Download, 
  Printer, 
  Lock, 
  QrCode, 
  Building2, 
  ArrowRight,
  Award,
  AlertTriangle,
  GraduationCap
} from 'lucide-react';

interface FeePaymentModalProps {
  course: Course;
  onClose: () => void;
  onPaymentSuccess: (transaction: PaymentTransaction) => void;
}

export const FeePaymentModal: React.FC<FeePaymentModalProps> = ({
  course,
  onClose,
  onPaymentSuccess
}) => {
  const { user, enrollInCourse } = useAuth();

  // Registration Form
  const [studentName, setStudentName] = useState(user?.name || '');
  const [studentEmail, setStudentEmail] = useState(user?.email || '');
  const [studentPhone, setStudentPhone] = useState(user?.phone || '+91 98800 12345');
  const [college, setCollege] = useState(user?.collegeOrWorkplace || 'Bangalore University / Hospital');
  
  // Education & Eligibility Check (Min PUC Required)
  const [qualification, setQualification] = useState<EducationLevel>('puc');
  const [stream, setStream] = useState('Science (PCMB / PCM / Commerce)');
  const [pucPercentage, setPucPercentage] = useState<number>(85.0);

  // Pricing & Scholarship
  const [promoCode, setPromoCode] = useState('REDDY2026');
  const [promoApplied, setPromoApplied] = useState(true);
  const [promoError, setPromoError] = useState('');
  const [installmentMode, setInstallmentMode] = useState<'full' | 'installment'>('full');

  // Payment Options
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Credit/Debit Card' | 'Netbanking'>('UPI');
  const [upiApp, setUpiApp] = useState<'GPay' | 'PhonePe' | 'Paytm' | 'BHIM'>('GPay');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8842');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('•••');
  const [selectedBank, setSelectedBank] = useState('State Bank of India (SBI)');

  // Flow Stages: 'form' -> 'otp' -> 'success'
  const [stage, setStage] = useState<'form' | 'processing' | 'otp' | 'success'>('form');
  const [otpValue, setOtpValue] = useState('7721');
  const [completedTransaction, setCompletedTransaction] = useState<PaymentTransaction | null>(null);

  // Math Calculations
  const baseAmount = course.feeINR;
  const discountAmount = promoApplied ? (promoCode.toUpperCase() === 'REDDY2026' ? 1500 : 500) : 0;
  const taxableSubtotal = Math.max(1000, baseAmount - discountAmount);
  const gstRate = 0.18;
  const calculatedGst = Math.round(taxableSubtotal * gstRate);
  const fullTotal = taxableSubtotal + calculatedGst;
  const payableNow = installmentMode === 'installment' ? Math.round(fullTotal / 2) : fullTotal;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'REDDY2026') {
      setPromoApplied(true);
      setPromoError('');
    } else if (promoCode.trim().toUpperCase() === 'STUDENT500') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoApplied(false);
      setPromoError('Invalid coupon code. Try REDDY2026 for ₹1,500 scholarship discount.');
    }
  };

  const eligibility = checkEligibility(qualification, stream, pucPercentage, course.id);

  const handleInitiatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eligibility.isEligible) {
      if (!window.confirm("⚠️ Ineligible Notice: Minimum qualification required is PUC (10+2 / Intermediate). Candidates with 10th standard only will be logged as Ineligible and cannot receive university certification. Do you still wish to proceed with demo submission?")) {
        return;
      }
    }
    setStage('processing');
    setTimeout(() => {
      setStage('otp');
    }, 1200);
  };

  const handleVerifyOtp = () => {
    setStage('processing');
    setTimeout(() => {
      const txn = enrollInCourse(course.id, {
        amount: baseAmount,
        discount: discountAmount,
        gst: calculatedGst,
        total: payableNow,
        method: paymentMethod
      });

      // Save to Master Student Registration Registry
      const qualLabel = QUALIFICATION_LABELS[qualification]?.en || qualification;
      saveNewRegistration({
        studentName: studentName.trim() || 'Student',
        email: studentEmail.trim() || 'student@reddyeducation.online',
        phone: studentPhone.trim() || '+91 98800 12345',
        city: 'Bengaluru',
        state: 'Karnataka',
        qualification,
        qualificationLabel: qualLabel,
        stream: stream.trim(),
        pucPercentage: Number(pucPercentage) || 0,
        passingYear: '2025',
        collegeName: college.trim() || 'Institution of Learning',
        boardOrUniversity: 'Board of Pre-University Education',
        appliedCourseId: course.id,
        appliedCourseName: course.title,
        isEligible: eligibility.isEligible,
        eligibilityBadge: eligibility.isEligible ? 'ELIGIBLE' : 'INELIGIBLE',
        eligibilityRemarks: eligibility.isEligible
          ? `Verified ${qualLabel} (${pucPercentage}%). Confirmed admission via fee payment.`
          : `❌ Ineligible (< PUC qualification). Fee received but flagged as ineligible.`,
        status: eligibility.isEligible ? 'Admission Confirmed' : 'Ineligible - Rejected',
        feeStatus: installmentMode === 'installment' ? 'Partial / 1st Installment' : 'Paid',
        feePaidINR: payableNow
      });

      setCompletedTransaction(txn);
      setStage('success');
      onPaymentSuccess(txn);
    }, 1500);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleDownloadReceipt = () => {
    if (!completedTransaction) return;
    const receiptText = `=============================================================================
REDDY ONLINE EDUCATION - OFFICIAL FEE PAYMENT RECEIPT
FOUNDER & CEO: SUDHARSHAN REDDY K R
CIN / Registration: ROE/KA/2026/88421
Email: sudharshankr1611@gmail.com
=============================================================================
RECEIPT NUMBER: ${completedTransaction.invoiceNumber}
TRANSACTION ID: ${completedTransaction.transactionId}
DATE & TIME:    ${new Date(completedTransaction.timestamp).toLocaleString()}
PAYMENT STATUS: ${completedTransaction.status}
PAYMENT MODE:   ${completedTransaction.paymentMethod}

STUDENT DETAILS:
-----------------------------------------------------------------------------
Student Name:    ${studentName}
Student Email:   ${studentEmail}
Contact Phone:   ${studentPhone}
College / Org:   ${college}

ENROLLED COURSE DETAILS:
-----------------------------------------------------------------------------
Course Code:     ${course.code}
Course Title:    ${course.title}
Academic Dept:   ${course.categoryLabel}
Duration:        ${course.durationWeeks} Weeks (${course.totalLessons} Lessons)
Certification:   ${course.certificationTitle}

FEE COMPUTATION BREAKDOWN:
-----------------------------------------------------------------------------
Tuition Fee:                   ₹${completedTransaction.amountINR.toLocaleString('en-IN')}.00
Scholarship Discount (REDDY2026): -₹${completedTransaction.discountINR.toLocaleString('en-IN')}.00
CGST (9%):                     ₹${(completedTransaction.gstINR / 2).toFixed(2)}
SGST (9%):                     ₹${(completedTransaction.gstINR / 2).toFixed(2)}
-----------------------------------------------------------------------------
NET PAID AMOUNT:               ₹${completedTransaction.totalPaidINR.toLocaleString('en-IN')}.00
-----------------------------------------------------------------------------

AUTHORIZATION & ATTESTATION:
This computer-generated receipt certifies enrollment into REDDY ONLINE EDUCATION.
Digital Seal: ISO 9001:2015 Accredited Institution.
Authorized Signatory: Sudharshan Reddy K R (Founder & CEO)
=============================================================================`;

    const blob = new Blob([receiptText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Receipt_${completedTransaction.invoiceNumber}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Banner */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Course Registration & Fee Payment Gateway
              </h2>
              <div className="text-xs text-slate-400">
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
        <div className="flex-1 overflow-y-auto p-6">
          
          {stage === 'processing' && (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full border-4 border-red-600 border-t-transparent animate-spin" />
              <div className="text-lg font-bold text-slate-900">Processing Secure Transaction...</div>
              <p className="text-xs text-slate-500 max-w-sm">
                Communicating with the Banking Clearinghouse & Reddy Online Education Registrar. Please do not close this window.
              </p>
            </div>
          )}

          {stage === 'otp' && (
            <div className="max-w-md mx-auto py-10 space-y-6 text-center">
              <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <Lock className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">Enter Bank 3D-Secure OTP</h3>
                <p className="text-xs text-slate-500">
                  A 4-digit verification code has been dispatched to your registered mobile number for payment of <strong>₹{payableNow.toLocaleString('en-IN')}</strong>.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <input
                  type="text"
                  maxLength={4}
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}
                  className="w-40 text-center tracking-[0.5em] font-mono text-2xl font-bold p-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 mx-auto"
                />
                <div className="text-[11px] text-slate-400 mt-2">
                  Test Demo OTP: <strong>7721</strong>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setStage('form')}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleVerifyOtp}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  Confirm & Complete Enrollment
                </button>
              </div>
            </div>
          )}

          {stage === 'success' && completedTransaction && (
            <div className="space-y-6">
              
              {/* Success Banner */}
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-emerald-950">
                  Registration & Payment Confirmed!
                </h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  You are now officially enrolled in <strong>{course.title}</strong>. All {course.totalLessons} modules and live virtual classes are unlocked in your Student Dashboard.
                </p>
              </div>

              {/* Official Tax Invoice / Receipt Display */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
                  <div>
                    <div className="text-sm font-extrabold text-slate-900">
                      REDDY ONLINE EDUCATION
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Receipt No: <span className="font-mono font-bold text-slate-700">{completedTransaction.invoiceNumber}</span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-[11px] text-slate-500">Transaction ID</div>
                    <div className="font-mono text-xs font-bold text-slate-800">{completedTransaction.transactionId}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Student Name</span>
                    <strong className="text-slate-800">{studentName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Payment Method</span>
                    <strong className="text-slate-800">{completedTransaction.paymentMethod}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Date</span>
                    <strong className="text-slate-800">{new Date(completedTransaction.timestamp).toLocaleDateString()}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Amount Paid</span>
                    <strong className="text-emerald-700 text-sm">₹{completedTransaction.totalPaidINR.toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                {/* Receipt Footer with CEO Stamp */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>Attested by <strong>Sudharshan Reddy K R</strong> (Founder & CEO)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDownloadReceipt}
                      className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg font-medium text-slate-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download TXT
                    </button>
                    <button
                      onClick={handlePrintReceipt}
                      className="px-3 py-1.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Print Receipt
                    </button>
                  </div>
                </div>
              </div>

              {/* Finish Button */}
              <div className="text-center pt-2">
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  Access Enrolled Course Now
                </button>
              </div>

            </div>
          )}

          {stage === 'form' && (
            <form onSubmit={handleInitiatePayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Student Details & Payment Methods (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Student Registration Data & Education Eligibility */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-red-600" />
                      <span>1. Student Registration & Eligibility (PUC Min Required)</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      కనీస అర్హత: PUC (10+2)
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">Full Student Name *</label>
                      <input
                        type="text"
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="e.g. Priya Sharma"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        placeholder="student@example.com"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">Mobile / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={studentPhone}
                        onChange={(e) => setStudentPhone(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">College / Institution</label>
                      <input
                        type="text"
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
                      />
                    </div>

                    {/* Educational Qualification Selector */}
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        Highest Qualification * (కనిష్ట విద్యార్హత)
                      </label>
                      <select
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value as EducationLevel)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:outline-none focus:border-red-500"
                      >
                        <option value="puc">PUC / 10+2 / Intermediate (Eligible ✅)</option>
                        <option value="graduate">Bachelor Degree (BSc, BTech, BDS, etc.) (Eligible ✅)</option>
                        <option value="diploma">Polytechnic / 3-Yr Diploma (Eligible ✅)</option>
                        <option value="postgraduate">Post-Graduate / Masters (Eligible ✅)</option>
                        <option value="10th">10th Standard / SSLC (Ineligible ❌ - Below PUC)</option>
                      </select>
                    </div>

                    {/* Stream and PUC percentage */}
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        PUC / 10+2 Stream & Score (%) *
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          required
                          value={stream}
                          onChange={(e) => setStream(e.target.value)}
                          placeholder="e.g. Science / MPC / Commerce"
                          className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 text-xs"
                        />
                        <input
                          type="number"
                          step="0.1"
                          min="35"
                          max="100"
                          value={pucPercentage}
                          onChange={(e) => setPucPercentage(parseFloat(e.target.value) || 0)}
                          placeholder="%"
                          className="w-16 p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 text-xs text-center font-mono font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Live Dynamic Eligibility Validation Callout */}
                  <div className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs transition-all ${
                    eligibility.isEligible 
                      ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950' 
                      : 'bg-rose-50/90 border-rose-300 text-rose-950 ring-2 ring-rose-400'
                  }`}>
                    {eligibility.isEligible ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`px-1.5 py-0.2 rounded text-[10px] font-black uppercase ${
                          eligibility.isEligible ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                        }`}>
                          {eligibility.statusBadge}: {eligibility.isEligible ? 'ADMISSION CRITERIA SATISFIED' : 'BELOW MINIMUM PUC'}
                        </span>
                        <strong className="text-xs">{eligibility.messageEn}</strong>
                      </div>
                      <p className="text-[11px] opacity-90">
                        <strong>తెలుగు:</strong> {eligibility.messageTe}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Payment Method Selector */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    2. Select Payment Method
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('UPI')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                        paymentMethod === 'UPI' 
                          ? 'bg-red-50 border-red-500 text-red-900 shadow-sm' 
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <QrCode className="w-5 h-5 text-red-600" />
                      <span>UPI / QR</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Credit/Debit Card')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                        paymentMethod === 'Credit/Debit Card' 
                          ? 'bg-red-50 border-red-500 text-red-900 shadow-sm' 
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-red-600" />
                      <span>Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Netbanking')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                        paymentMethod === 'Netbanking' 
                          ? 'bg-red-50 border-red-500 text-red-900 shadow-sm' 
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Building2 className="w-5 h-5 text-red-600" />
                      <span>Netbanking</span>
                    </button>
                  </div>

                  {/* UPI Inputs */}
                  {paymentMethod === 'UPI' && (
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                      <div className="font-semibold text-slate-800">Choose UPI App or Scan QR:</div>
                      <div className="flex gap-2 flex-wrap">
                        {(['GPay', 'PhonePe', 'Paytm', 'BHIM'] as const).map((app) => (
                          <button
                            key={app}
                            type="button"
                            onClick={() => setUpiApp(app)}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer ${
                              upiApp === app 
                                ? 'bg-slate-900 text-white border-slate-900' 
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {app}
                          </button>
                        ))}
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                        <div>
                          <div className="text-[11px] text-slate-500">Official UPI ID:</div>
                          <div className="font-mono font-bold text-slate-800">reddyeducation@icici</div>
                        </div>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                          Zero Convenience Fee
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Card Inputs */}
                  {paymentMethod === 'Credit/Debit Card' && (
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-600 font-medium mb-1">Valid Thru</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono text-center"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-600 font-medium mb-1">CVV</label>
                          <input
                            type="password"
                            maxLength={3}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono text-center"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Netbanking Inputs */}
                  {paymentMethod === 'Netbanking' && (
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                      <label className="block text-slate-700 font-semibold">Select Authorized Bank:</label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                      >
                        <option>State Bank of India (SBI)</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                        <option>Canara Bank</option>
                        <option>Punjab National Bank</option>
                        <option>Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}

                </div>

              </div>

              {/* Right Column: Order Summary & Fee Calculation (5 cols) */}
              <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between space-y-5">
                
                <div className="space-y-4">
                  
                  {/* Selected Course Summary */}
                  <div>
                    <div className="text-[11px] font-bold text-red-600 uppercase tracking-wider">
                      Course Enrollment
                    </div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">
                      {course.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {course.categoryLabel} · {course.durationWeeks} Weeks
                    </div>
                  </div>

                  {/* Payment Schedule Option */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-200 text-xs">
                    <span className="font-semibold text-slate-700">Fee Payment Schedule:</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setInstallmentMode('full')}
                        className={`p-2 rounded-lg border text-center cursor-pointer ${
                          installmentMode === 'full' 
                            ? 'bg-slate-900 text-white font-bold border-slate-900' 
                            : 'bg-white text-slate-700 border-slate-200'
                        }`}
                      >
                        Full Payment
                      </button>
                      <button
                        type="button"
                        onClick={() => setInstallmentMode('installment')}
                        className={`p-2 rounded-lg border text-center cursor-pointer ${
                          installmentMode === 'installment' 
                            ? 'bg-slate-900 text-white font-bold border-slate-900' 
                            : 'bg-white text-slate-700 border-slate-200'
                        }`}
                      >
                        2 Installments (50%)
                      </button>
                    </div>
                  </div>

                  {/* Scholarship Promo Code Input */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-200 text-xs">
                    <span className="font-semibold text-slate-700">Scholarship / Voucher Code:</span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        placeholder="e.g. REDDY2026"
                        className="flex-1 p-2 bg-white border border-slate-200 rounded-lg font-mono text-xs"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="px-3 py-2 bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {promoApplied && (
                      <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        Scholarship applied! ₹{discountAmount.toLocaleString('en-IN')} deducted.
                      </div>
                    )}
                    {promoError && (
                      <div className="text-[11px] text-rose-600">
                        {promoError}
                      </div>
                    )}
                  </div>

                  {/* Cost Breakdown */}
                  <div className="space-y-2 pt-2 border-t border-slate-200 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Standard Course Fee</span>
                      <span className="font-mono tabular-nums">₹{baseAmount.toLocaleString('en-IN')}</span>
                    </div>

                    {promoApplied && (
                      <div className="flex items-center justify-between text-emerald-700 font-medium">
                        <span>Scholarship Deduction</span>
                        <span className="font-mono tabular-nums">-₹{discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-slate-600">
                      <span>GST (18% Statutory Tax)</span>
                      <span className="font-mono tabular-nums">₹{calculatedGst.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-300 flex items-center justify-between text-slate-900 font-extrabold text-sm">
                      <span>
                        {installmentMode === 'installment' ? 'Payable Today (1st Part)' : 'Total Net Payable'}
                      </span>
                      <span className="font-mono text-base text-red-600 tabular-nums">
                        ₹{payableNow.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {installmentMode === 'installment' && (
                      <div className="text-[10px] text-slate-500">
                        * Remaining ₹{payableNow.toLocaleString('en-IN')} payable in 30 days before final certification.
                      </div>
                    )}
                  </div>

                </div>

                {/* Submit Payment Button */}
                <div className="space-y-2 pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Pay ₹{payableNow.toLocaleString('en-IN')} & Complete Enrollment</span>
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>256-bit Bank Grade Encrypted · 100% Refundable within 7 Days</span>
                  </div>
                </div>

              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
};
