import { LiveClass } from '../types';

export const LIVE_CLASSES_DATA: LiveClass[] = [
  {
    id: 'live-py-01',
    courseId: 'python-core-advanced',
    courseTitle: 'Python Programming & Software Engineering',
    topic: 'Live Architecture Lab: Fast API Microservices with Async SQLAlchemy',
    instructor: 'Sudharshan Reddy K R',
    date: 'Today',
    time: '6:30 PM - 8:00 PM IST',
    durationMinutes: 90,
    status: 'live_now',
    meetingRoomId: 'ROE-ROOM-PY99',
    attendeesCount: 248,
    agenda: [
      'Async event loops & non-blocking I/O benchmarks',
      'Structuring multi-tenant FastAPI apps with Pydantic v2',
      'Live code refactoring session with student Q&A',
      'Database connection pooling & Docker configuration'
    ]
  },
  {
    id: 'live-aiml-02',
    courseId: 'aiml-engineering-mastery',
    courseTitle: 'AIML: Artificial Intelligence & Machine Learning Engineering',
    topic: 'Fine-Tuning Open Source LLMs using LoRA & QLoRA with PyTorch',
    instructor: 'Sudharshan Reddy K R & AI Faculty',
    date: 'Tomorrow',
    time: '7:00 PM - 8:30 PM IST',
    durationMinutes: 90,
    status: 'upcoming',
    meetingRoomId: 'ROE-ROOM-AI42',
    attendeesCount: 312,
    agenda: [
      'Low-Rank Adaptation (LoRA) mathematical intuition',
      'Quantization with bitsandbytes 4-bit precision',
      'Hands-on PyTorch training notebook walkthrough',
      'Evaluating perplexity and BLEU scores on domain test sets'
    ]
  },
  {
    id: 'live-nur-03',
    courseId: 'bsc-nursing-clinical',
    courseTitle: 'BSc Nursing Clinical Practice & Patient Care',
    topic: 'High-Fidelity Clinical Simulation: Acute Coronary Syndrome & ICU Ventilation Protocols',
    instructor: 'Senior Nursing Council Faculty & Sudharshan Reddy K R',
    date: 'Oct 26, 2026',
    time: '5:00 PM - 6:30 PM IST',
    durationMinutes: 90,
    status: 'upcoming',
    meetingRoomId: 'ROE-ROOM-NUR18',
    attendeesCount: 194,
    agenda: [
      'Rapid assessment of STEMI vs NSTEMI ECG waveforms',
      'Ventilator mode parameters (AC, SIMV, PEEP, FiO2)',
      'Emergency drug titration: Norepinephrine, Dobutamine, Nitroglycerin',
      'Interactive clinical scenario decision branch with real-time feedback'
    ]
  },
  {
    id: 'live-bds-04',
    courseId: 'bds-dentistry-clinical',
    courseTitle: 'BDS Clinical Dentistry & Oral Maxillofacial Surgery',
    topic: 'Masterclass: Endodontic Canal Curvatures & Managing Broken Instruments',
    instructor: 'Dr. Clinical Dental Board Specialist',
    date: 'Oct 27, 2026',
    time: '4:00 PM - 5:30 PM IST',
    durationMinutes: 90,
    status: 'upcoming',
    meetingRoomId: 'ROE-ROOM-BDS33',
    attendeesCount: 176,
    agenda: [
      'Ledge bypassing techniques using pre-curved #08/#10 C-Pilot files',
      'Ultrasonic troughing under dental surgical operating microscope',
      'Retrieval of separated instruments vs bypassing protocol',
      'Case radiograph analysis & Q&A with clinical residents'
    ]
  },
  {
    id: 'live-math-05',
    courseId: 'higher-applied-mathematics',
    courseTitle: 'Higher & Applied Mathematics for Engineers and Scientists',
    topic: 'Interactive Problem Solving: Fourier Transforms & Partial Differential Equations',
    instructor: 'Sudharshan Reddy K R',
    date: 'Oct 28, 2026',
    time: '6:00 PM - 7:30 PM IST',
    durationMinutes: 90,
    status: 'upcoming',
    meetingRoomId: 'ROE-ROOM-MTH07',
    attendeesCount: 220,
    agenda: [
      'Heat conduction and 1D wave equation separation of variables',
      'Fourier transform properties and Dirac delta operations',
      'Solving previous 5 years university & GATE challenge questions',
      'Live whiteboard problem solving with student submissions'
    ]
  },
  {
    id: 'live-comm-06',
    courseId: 'communication-leadership-skills',
    courseTitle: 'Executive Communication & Professional Soft Skills',
    topic: 'Live Impromptu Speaking Clinic: The 3-Step Think-Fast Speaking Framework',
    instructor: 'Sudharshan Reddy K R & Leadership Coaches',
    date: 'Oct 29, 2026',
    time: '7:30 PM - 8:45 PM IST',
    durationMinutes: 75,
    status: 'upcoming',
    meetingRoomId: 'ROE-ROOM-COMM12',
    attendeesCount: 280,
    agenda: [
      'The "What? So What? Now What?" instantaneous response model',
      'Live volunteer hot-seat drills with instant coaching feedback',
      'Neutralizing verbal fillers under high pressure',
      'Mastering boardroom Q&A without getting defensive'
    ]
  }
];
