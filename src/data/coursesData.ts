import { Course } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'python-core-advanced',
    code: 'PY-301',
    title: 'Python Programming & Software Engineering',
    subtitle: 'From core fundamentals to object-oriented architecture, data analysis, API development, and production scripting.',
    category: 'technology',
    categoryLabel: 'Computer Science & Software',
    image: '/src/assets/images/subject_python_dev_1792858332943.jpg',
    instructor: 'Sudharshan Reddy K R & Senior Tech Faculty',
    instructorTitle: 'Founder & CEO, REDDY ONLINE EDUCATION / Lead Python Architect',
    totalModules: 5,
    totalLessons: 24,
    durationWeeks: 12,
    rating: 4.95,
    enrolledStudentsCount: 4280,
    feeINR: 4999,
    originalFeeINR: 8999,
    level: 'Beginner to Advanced',
    certificationTitle: 'Professional Python Software Engineer Certification',
    prerequisites: 'No prior programming experience required. Basic computer literacy.',
    highlights: [
      'Hands-on interactive browser coding exercises and projects',
      'Data structures, OOP, decorators, generators, and async I/O',
      'REST APIs with FastAPI/Flask and database integration',
      'Automated testing with PyTest & clean code architecture'
    ],
    modules: [
      {
        id: 'py-m1',
        moduleNumber: 1,
        title: 'Python Foundations & Memory Model',
        duration: '2 Weeks · 5 Lessons',
        lessons: [
          {
            id: 'py-l1',
            title: 'Python Environment, Execution Engine & Variables',
            duration: '42 min',
            summary: 'Understand CPython interpreter, virtual environments, dynamic typing, and memory pointers.',
            keyPoints: [
              'Difference between compiled vs interpreted execution in CPython bytecode',
              'Immutable vs mutable data types in Python heap memory',
              'PEP 8 style conventions and virtualenv best practices'
            ],
            codeSnippetOrClinicalCase: `# Python Memory & Identity Inspection
a = [1, 2, 3]
b = a
b.append(4)
print(f"a: {a}, id(a) == id(b): {id(a) == id(b)}") # True: same reference!

import copy
c = copy.deepcopy(a)
c.append(99)
print(f"Deep copied c: {c}, original a: {a}")`,
            downloadableResourceTitle: 'Python Environment Setup Guide & Syntax Cheat Sheet'
          },
          {
            id: 'py-l2',
            title: 'Control Structures, Iterators, and Comprehensions',
            duration: '50 min',
            summary: 'Master idiomatic loop constructs, list/dict/set comprehensions, and Pythonic flow control.',
            keyPoints: [
              'List comprehensions vs map/filter performance benchmarks',
              'Itertools module for memory-efficient iteration over massive datasets',
              'Pattern matching (match/case) introduced in modern Python'
            ],
            codeSnippetOrClinicalCase: `# Optimized Dictionary Comprehension
raw_scores = {"Anil": 88, "Kavya": 94, "Rahul": 76, "Sneha": 99}
honors = {student: score for student, score in raw_scores.items() if score >= 90}
print("Honors list:", honors)`,
            downloadableResourceTitle: 'List & Dict Comprehensions Master Reference'
          },
          {
            id: 'py-l3',
            title: 'Functions, Scopes, Closures, and First-Class Citizens',
            duration: '48 min',
            summary: 'Deep dive into LEGB variable lookup, args/kwargs unpacking, lambda expressions, and functional closures.',
            keyPoints: [
              'LEGB scoping rules (Local, Enclosing, Global, Built-in)',
              'Creating persistent state with functional closures without classes',
              'Keyword-only arguments and type hints for robust contracts'
            ],
            codeSnippetOrClinicalCase: `def rate_limiter(max_calls: int):
    calls = 0
    def invoke(action: str):
        nonlocal calls
        if calls >= max_calls:
            raise PermissionError("Rate limit exceeded for session")
        calls += 1
        return f"Executing {action} (call #{calls})"
    return invoke`,
            downloadableResourceTitle: 'Python Functions & Scope Deep-Dive Guide'
          }
        ],
        quiz: {
          id: 'py-q1',
          title: 'Module 1 Assessment: Python Foundations',
          questions: [
            {
              id: 'q1',
              question: 'In Python, what is the key difference between list assignment `b = a` and `b = a[:]`?',
              options: [
                '`b = a` creates a shallow copy while `a[:]` creates a new object reference',
                '`b = a` binds b to the same list object in memory, while `a[:]` creates a shallow copy slice',
                'Both create entirely independent deep copies of nested structures',
                '`b = a[:]` is invalid syntax in Python 3'
              ],
              correctOptionIndex: 1,
              explanation: '`b = a` assigns the exact same memory pointer, whereas slice notation `a[:]` creates a new shallow copy of the list.'
            },
            {
              id: 'q2',
              question: 'Which keyword allows a nested closure function to modify a variable in the enclosing outer scope?',
              options: ['global', 'nonlocal', 'outer', 'super'],
              correctOptionIndex: 1,
              explanation: 'The `nonlocal` keyword allows inner closures to rebind variables in the nearest enclosing non-global scope.'
            }
          ]
        }
      },
      {
        id: 'py-m2',
        moduleNumber: 2,
        title: 'Object-Oriented Design & Dunder Protocols',
        duration: '2.5 Weeks · 6 Lessons',
        lessons: [
          {
            id: 'py-l4',
            title: 'Classes, Encapsulation, and Class vs Instance Attributes',
            duration: '55 min',
            summary: 'Build robust domain objects using encapsulation, properties, and classmethods.',
            keyPoints: [
              'Dunder init and new constructors',
              'Using @property for getter/setter validation without breaking API',
              'Classmethods as alternate constructors'
            ],
            codeSnippetOrClinicalCase: `class CourseEnrollment:
    INSTITUTE = "REDDY ONLINE EDUCATION"

    def __init__(self, student_id: str, course_code: str):
        self._student_id = student_id
        self.course_code = course_code
        self.completed = False

    @classmethod
    def from_string(cls, record: str):
        sid, ccode = record.strip().split(":")
        return cls(sid, ccode)`
          }
        ]
      },
      {
        id: 'py-m3',
        moduleNumber: 3,
        title: 'Advanced Python: Decorators, Generators & Async I/O',
        duration: '3 Weeks · 5 Lessons',
        lessons: [
          {
            id: 'py-l5',
            title: 'Writing Custom Decorators with Arguments and Preserving Metadata',
            duration: '58 min',
            summary: 'Create production-grade logging, timing, and authentication decorators using functools.wraps.',
            keyPoints: [
              'Understanding higher-order functions that accept and return callables',
              'Preserving docstrings and signatures via functools.wraps',
              'Parameterized decorators with triple-layer nesting'
            ]
          }
        ]
      },
      {
        id: 'py-m4',
        moduleNumber: 4,
        title: 'Data Science with NumPy, Pandas & Visualization',
        duration: '2.5 Weeks · 4 Lessons',
        lessons: [
          {
            id: 'py-l6',
            title: 'Data Wrangling, Vectorization & Statistical Aggregation',
            duration: '65 min',
            summary: 'Manipulate multi-gigabyte datasets with Pandas Series, DataFrames, indexing, and grouped queries.',
            keyPoints: [
              'Vectorized execution versus slow Python for-loops',
              'Handling missing values, imputation, and outlier detection',
              'Data export to SQL, CSV, and Parquet format'
            ]
          }
        ]
      },
      {
        id: 'py-m5',
        moduleNumber: 5,
        title: 'Web APIs with FastAPI & Deployment',
        duration: '2 Weeks · 4 Lessons',
        lessons: [
          {
            id: 'py-l7',
            title: 'Building High-Performance Async REST APIs with Pydantic',
            duration: '60 min',
            summary: 'Design OpenAPI-compliant backend microservices with automatic request validation, JWT auth, and Docker packaging.',
            keyPoints: [
              'Pydantic schema validation and automatic OpenAPI Swagger docs',
              'Dependency injection system in FastAPI',
              'Containerizing Python apps with multi-stage Dockerfiles'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'higher-applied-mathematics',
    code: 'MATH-202',
    title: 'Higher & Applied Mathematics for Engineers and Scientists',
    subtitle: 'Comprehensive calculus, differential equations, linear algebra, vector calculus, and probability with real-world applications.',
    category: 'mathematics',
    categoryLabel: 'Mathematical Sciences',
    image: '/src/assets/images/subject_mathematics_geometry_1792858334058.jpg',
    instructor: 'Sudharshan Reddy K R & Mathematics Academic Board',
    instructorTitle: 'Founder & CEO, REDDY ONLINE EDUCATION / Applied Mathematics Specialist',
    totalModules: 5,
    totalLessons: 22,
    durationWeeks: 14,
    rating: 4.97,
    enrolledStudentsCount: 3820,
    feeINR: 4499,
    originalFeeINR: 7999,
    level: 'Foundation & Applied',
    certificationTitle: 'Advanced Applied Mathematics & Engineering Computation Certificate',
    prerequisites: 'Higher secondary school algebra and trigonometry.',
    highlights: [
      'Visual interactive geometric and calculus concept models',
      'Step-by-step problem-solving for university & competitive engineering exams',
      'Matrix transformations, eigenvalues & PCA for modern computer science',
      'Curated formula atlas and 500+ solved engineering challenge problems'
    ],
    modules: [
      {
        id: 'mth-m1',
        moduleNumber: 1,
        title: 'Differential & Integral Calculus Mastery',
        duration: '3 Weeks · 6 Lessons',
        lessons: [
          {
            id: 'mth-l1',
            title: 'Limits, Continuity, and the Fundamental Theorem of Calculus',
            duration: '52 min',
            summary: 'Rigorous epsilon-delta limit definitions, mean value theorems, and Riemann integration.',
            keyPoints: [
              'Geometric intuition of instantaneous rate of change vs accumulated area',
              "L'Hôpital's rule for indeterminate forms 0/0 and inf/inf",
              'Integration by parts, partial fractions, and trigonometric substitutions'
            ],
            codeSnippetOrClinicalCase: `% Calculus Fundamental Theorem Verification (LaTeX representation)
% If f(x) is continuous on [a, b], and F(x) = \int_a^x f(t) dt:
% Then F'(x) = f(x) and \int_a^b f(x) dx = F(b) - F(a)

Example Problem: Evaluate \int x * e^(2x) dx
Let u = x (du = dx), dv = e^(2x) dx (v = 0.5 * e^(2x))
Result = 0.5 * x * e^(2x) - 0.25 * e^(2x) + C`,
            downloadableResourceTitle: 'Master Calculus Formula Sheet & Derivations'
          },
          {
            id: 'mth-l2',
            title: 'Multivariable Calculus & Partial Derivatives',
            duration: '58 min',
            summary: 'Gradients, directional derivatives, tangent planes, Lagrange multipliers, and saddle-point optimization.',
            keyPoints: [
              'Gradient vectors pointing in the direction of steepest ascent',
              'Hessian matrices for classifying local extrema in 3D surfaces',
              'Constrained optimization using Lagrange multipliers in science & economics'
            ]
          }
        ],
        quiz: {
          id: 'mth-q1',
          title: 'Module 1 Assessment: Calculus & Optimization',
          questions: [
            {
              id: 'mq1',
              question: 'What does the gradient vector ∇f(x, y) signify at any point on a scalar field surface?',
              options: [
                'The direction of zero change (level curve tangent)',
                'The direction and rate of maximum instantaneous increase of f',
                'The curvature of the orthogonal trajectory',
                'The constant divergence of the vector field'
              ],
              correctOptionIndex: 1,
              explanation: 'The gradient vector ∇f points directly in the direction of maximum increase, with its magnitude representing the steepest rate of change.'
            }
          ]
        }
      },
      {
        id: 'mth-m2',
        moduleNumber: 2,
        title: 'Linear Algebra & Matrix Transformations',
        duration: '3 Weeks · 5 Lessons',
        lessons: [
          {
            id: 'mth-l3',
            title: 'Vector Spaces, Basis, Linear Independence & Rank',
            duration: '60 min',
            summary: 'Span, null spaces, column spaces, Rank-Nullity Theorem, and Gaussian elimination.',
            keyPoints: [
              'Geometric interpretation of linear transformations in R^n',
              'Determinants as volume scaling factors and orientation indicators',
              'Gram-Schmidt orthogonalization process'
            ]
          },
          {
            id: 'mth-l4',
            title: 'Eigenvalues, Eigenvectors, and Diagonalization',
            duration: '65 min',
            summary: 'Characteristic polynomial, eigenspaces, matrix decomposition, and spectral theorem applications.',
            keyPoints: [
              'Solving det(A - λI) = 0 for discrete and continuous systems',
              'Principal Component Analysis (PCA) basis transformation',
              'Markov chains and steady-state state distribution vectors'
            ]
          }
        ]
      },
      {
        id: 'mth-m3',
        moduleNumber: 3,
        title: 'Differential Equations & Dynamical Systems',
        duration: '3 Weeks · 4 Lessons',
        lessons: [
          {
            id: 'mth-l5',
            title: 'First and Second-Order ODEs with Applications in Physics and Biology',
            duration: '62 min',
            summary: 'Separable equations, integrating factors, homogeneous and non-homogeneous linear ODEs with constant coefficients.',
            keyPoints: [
              'Harmonic oscillators, damping regimes (underdamped, critical, overdamped)',
              'Method of undetermined coefficients and variation of parameters',
              'Lotka-Volterra predator-prey differential modeling'
            ]
          }
        ]
      },
      {
        id: 'mth-m4',
        moduleNumber: 4,
        title: 'Laplace Transforms & Fourier Analysis',
        duration: '2.5 Weeks · 4 Lessons',
        lessons: [
          {
            id: 'mth-l6',
            title: 'Laplace Transformations for Initial Value Problems & Circuits',
            duration: '56 min',
            summary: 'Converting time-domain differential equations into algebraic frequency domains.',
            keyPoints: [
              'Step functions (Heaviside) and Dirac delta distributions',
              'Convolution theorem and inverse Laplace transfer functions',
              'Fourier series expansion of periodic square and triangular waveforms'
            ]
          }
        ]
      },
      {
        id: 'mth-m5',
        moduleNumber: 5,
        title: 'Probability, Random Variables & Statistics',
        duration: '2.5 Weeks · 3 Lessons',
        lessons: [
          {
            id: 'mth-l7',
            title: 'Bayes Theorem, Joint Distributions, and the Central Limit Theorem',
            duration: '54 min',
            summary: 'Discrete and continuous distributions (Binomial, Poisson, Gaussian) with hypothesis testing.',
            keyPoints: [
              'Conditional probability and Bayesian parameter updates',
              'Mathematical proof and visual verification of Central Limit Theorem',
              'Z-tests, t-tests, and p-value statistical significance in research'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bsc-nursing-clinical',
    code: 'NUR-401',
    title: 'BSc Nursing Clinical Practice & Patient Care',
    subtitle: 'Comprehensive foundation in human anatomy, physiology, pharmacology, medical-surgical nursing, critical emergency protocols, and bedside care.',
    category: 'healthcare',
    categoryLabel: 'Nursing & Health Sciences',
    image: '/src/assets/images/subject_bsc_nursing_1792858333842.jpg',
    instructor: 'Sudharshan Reddy K R & Senior Nursing Council Faculty',
    instructorTitle: 'Founder & CEO, REDDY ONLINE EDUCATION / Healthcare Educational Directorate',
    totalModules: 5,
    totalLessons: 25,
    durationWeeks: 16,
    rating: 4.98,
    enrolledStudentsCount: 5120,
    feeINR: 5999,
    originalFeeINR: 9999,
    level: 'Undergraduate / Professional',
    certificationTitle: 'Certified Clinical Nursing Practice & Patient Care Specialist',
    prerequisites: 'Higher secondary / pre-university biology or enrolled BSc Nursing student.',
    highlights: [
      'Evidence-based clinical nursing protocols aligned with INC syllabus',
      'Interactive patient triage & ICU vital sign monitoring simulations',
      'Safe medication administration (10 Rights of Drug Administration)',
      'High-yield clinical nursing case studies and OSCE preparation guides'
    ],
    modules: [
      {
        id: 'nur-m1',
        moduleNumber: 1,
        title: 'Anatomy, Physiology & Pathophysiological Foundations',
        duration: '3 Weeks · 6 Lessons',
        lessons: [
          {
            id: 'nur-l1',
            title: 'Cardiovascular & Respiratory Systems Assessment',
            duration: '55 min',
            summary: 'Detailed hemodynamic cycles, heart auscultation landmarks, lung sound interpretation, and ABG analysis.',
            keyPoints: [
              'Normal vs abnormal heart sounds (S1, S2, Murmurs, Gallops)',
              'Adventitious lung sounds: Wheezes, Stridor, Crackles, and Rhonchi',
              'Arterial Blood Gas (ABG) interpretation using ROME mnemonic (Respiratory Opposite, Metabolic Equal)'
            ],
            codeSnippetOrClinicalCase: `CLINICAL CASE STUDY #NUR-104:
Patient: 62-year-old male admitted with dyspnea, bilateral pedal edema, and orthopnea.
Vitals: BP 158/94 mmHg, HR 112 bpm (irregular), SpO2 88% on room air, RR 26/min.
Auscultation: Bilateral fine inspiratory basilar crackles and S3 gallop.
ABG: pH 7.31, PaCO2 48 mmHg, HCO3- 24 mEq/L (Respiratory Acidosis).
Nursing Interventions:
1. Elevate head of bed to High Fowler's position immediately.
2. Administer supplemental oxygen via nasal cannula/Venturi mask to titrate SpO2 > 94%.
3. Establish 18-gauge IV access; prepare IV Furosemide as ordered by physician.
4. Insert Foley catheter for strict hourly fluid intake and output monitoring.`,
            downloadableResourceTitle: 'Cardiorespiratory Clinical Assessment Protocol'
          },
          {
            id: 'nur-l2',
            title: 'Fluid & Electrolyte Balance and Acid-Base Disorders',
            duration: '50 min',
            summary: 'Managing hyperkalemia, hyponatremia, dehydration, IV fluid osmolarity (isotonic, hypotonic, hypertonic), and shock.',
            keyPoints: [
              'ECG changes in hyperkalemia (peaked T waves, widened QRS)',
              'Calculation of IV drop rates: (Volume in mL * Drop factor) / Time in minutes',
              'Chvostek and Trousseau signs in hypocalcemia'
            ]
          }
        ],
        quiz: {
          id: 'nur-q1',
          title: 'Module 1 Assessment: Clinical Nursing Fundamentals',
          questions: [
            {
              id: 'nq1',
              question: 'When analyzing an ABG with pH 7.28 (low), PaCO2 54 mmHg (high), and HCO3- 25 mEq/L (normal), what is the condition?',
              options: [
                'Uncompensated Metabolic Acidosis',
                'Uncompensated Respiratory Acidosis',
                'Compensated Metabolic Alkalosis',
                'Respiratory Alkalosis'
              ],
              correctOptionIndex: 1,
              explanation: 'A low pH (< 7.35) indicates acidosis. An elevated PaCO2 (> 45 mmHg) with normal bicarbonate (22-26 mEq/L) identifies uncompensated respiratory acidosis.'
            },
            {
              id: 'nq2',
              question: 'Which nursing position maximizes diaphragmatic excursion and oxygenation in a patient presenting with acute pulmonary congestion?',
              options: ['Trendelenburg position', "High Fowler's position (60°–90°)", 'Prone position', 'Sims position'],
              correctOptionIndex: 1,
              explanation: "High Fowler's position allows gravity to lower abdominal organs away from the diaphragm, maximizing thoracic expansion."
            }
          ]
        }
      },
      {
        id: 'nur-m2',
        moduleNumber: 2,
        title: 'Pharmacology & Safe Drug Administration',
        duration: '3.5 Weeks · 5 Lessons',
        lessons: [
          {
            id: 'nur-l3',
            title: 'The 10 Rights of Medication Administration and Dosage Calculations',
            duration: '60 min',
            summary: 'Drug safety rules, pediatric dosage formulas (Clark’s & Young’s rules), high-alert medications (Insulin, Heparin), and adverse reactions.',
            keyPoints: [
              'Right patient, drug, dose, route, time, documentation, reason, response, refusal, education',
              'Independent double-check protocols for narrow therapeutic index medications',
              'Managing anaphylaxis: Epinephrine 1:1000 IM injection dosage and monitoring'
            ]
          }
        ]
      },
      {
        id: 'nur-m3',
        moduleNumber: 3,
        title: 'Medical-Surgical Nursing & Pre/Post-Operative Care',
        duration: '4 Weeks · 6 Lessons',
        lessons: [
          {
            id: 'nur-l4',
            title: 'Surgical Asepsis, Wound Care, and Post-Anesthesia Recovery (PACU)',
            duration: '58 min',
            summary: 'Sterile field protocols, surgical site infection prevention, Aldrete score assessment, and deep vein thrombosis prophylaxis.',
            keyPoints: [
              'Principles of surgical scrub, gowning, and gloving',
              'Stage 1 to 4 pressure ulcer staging, negative pressure wound therapy (NPWT)',
              'Early ambulation and sequential compression devices (SCD) post-surgery'
            ]
          }
        ]
      },
      {
        id: 'nur-m4',
        moduleNumber: 4,
        title: 'Maternal, Neonatal & Pediatric Nursing Care',
        duration: '3 Weeks · 4 Lessons',
        lessons: [
          {
            id: 'nur-l5',
            title: 'Stages of Labor, APGAR Scoring, and Neonatal Resuscitation',
            duration: '52 min',
            summary: 'Antenatal checkups, physiological stages of labor, APGAR evaluation at 1 & 5 minutes, and Kangaroo Mother Care (KMC).',
            keyPoints: [
              'APGAR criteria: Appearance, Pulse, Grimace, Activity, Respiration',
              'Postpartum hemorrhage (PPH) 4 Ts: Tone, Trauma, Tissue, Thrombin',
              'Neonatal phototherapy management for hyperbilirubinemia'
            ]
          }
        ]
      },
      {
        id: 'nur-m5',
        moduleNumber: 5,
        title: 'Critical Care, Emergency Triage & Ethics in Nursing',
        duration: '2.5 Weeks · 4 Lessons',
        lessons: [
          {
            id: 'nur-l6',
            title: 'BLS/ACLS Algorithms, Crash Cart Management, and Nursing Ethics',
            duration: '65 min',
            summary: 'Cardiopulmonary resuscitation (CPR) ratios, defibrillator operation, rapid response team protocols, and patient autonomy/informed consent.',
            keyPoints: [
              'High-quality chest compressions: 100-120/min, 2-2.4 inches depth, complete chest recoil',
              'Shockable (VF/pVT) vs Non-shockable (PEA/Asystole) rhythms',
              'Legal documentation, patient confidentiality, and INC code of professional conduct'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bds-dentistry-clinical',
    code: 'BDS-501',
    title: 'BDS Clinical Dentistry & Oral Maxillofacial Surgery',
    subtitle: 'From dental anatomy and oral histology to conservative endodontics, prosthodontics, periodontics, and surgical extractions.',
    category: 'dental',
    categoryLabel: 'Dental Surgery & Oral Medicine',
    image: '/src/assets/images/subject_bds_dentistry_1792858335505.jpg',
    instructor: 'Sudharshan Reddy K R & Clinical Dental Board',
    instructorTitle: 'Founder & CEO, REDDY ONLINE EDUCATION / Dental Clinical Board',
    totalModules: 5,
    totalLessons: 24,
    durationWeeks: 16,
    rating: 4.96,
    enrolledStudentsCount: 3410,
    feeINR: 6499,
    originalFeeINR: 11999,
    level: 'Advanced Clinical / Specialized',
    certificationTitle: 'Comprehensive BDS Clinical Dentistry & Operative Mastery Certification',
    prerequisites: 'Enrolled BDS student, dental intern, or pre-dental graduate.',
    highlights: [
      'High-resolution 3D tooth morphology and dental anatomy atlases',
      'Step-by-step endodontic root canal therapy (RCT) procedural guides',
      'Local anesthesia nerve blocks (Inferior Alveolar, Mental, Posterior Superior)',
      'Interactive dental radiology diagnostic quiz & clinical case conferences'
    ],
    modules: [
      {
        id: 'bds-m1',
        moduleNumber: 1,
        title: 'Dental Anatomy, Histology & Occlusion',
        duration: '3 Weeks · 5 Lessons',
        lessons: [
          {
            id: 'bds-l1',
            title: 'Crown Morphology, Pulp Chamber Anatomy & Enamel Structure',
            duration: '54 min',
            summary: 'FDI tooth numbering system, anatomical landmarks (cusps, ridges, fossae, developmental grooves), and histological enamel prism architecture.',
            keyPoints: [
              'FDI Two-Digit Numbering System for permanent and deciduous dentition',
              'Maxillary vs Mandibular molar canal configurations and variations',
              'Hunter-Schreger bands, Striae of Retzius, and dentinal tubules transmission'
            ],
            codeSnippetOrClinicalCase: `CLINICAL DENTAL CASE #BDS-209:
Patient: 28-year-old female presents with sharp, lingering pain in tooth 46 (Mandibular Right First Molar) on thermal stimulation.
Clinical Examination:
- Deep occlusal carious lesion extending into dentin.
- Cold test (Endo-Ice): Severe lingering pain lasting > 30 seconds (Positive).
- Electric Pulp Test (EPT): Exaggerated response compared to control tooth 36.
- Percussion test: Mild tenderness.
- Radiograph (IOPA): Radiolucency approximating pulp horns, normal periapical lamina dura.
Diagnosis: Symptomatic Irreversible Pulpitis with early Symptomatic Apical Periodontitis in tooth 46.
Treatment Plan:
1. Inferior Alveolar Nerve Block (2% Lignocaine with 1:80,000 Adrenaline).
2. Complete rubber dam isolation.
3. Access cavity preparation (trapezoidal outline for mandibular molar).
4. Working length determination via Electronic Apex Locator (EAL) and confirmative IOPA radiograph.
5. Biomechanical preparation using rotary NiTi files with 3% NaOCl and 17% EDTA irrigation.`,
            downloadableResourceTitle: '3D Dental Anatomy & Morphology Illustrated Atlas'
          },
          {
            id: 'bds-l2',
            title: 'Temporomandibular Joint (TMJ) Biomechanics and Occlusion Classes',
            duration: '50 min',
            summary: 'Angle’s Classification of Malocclusion (Class I, II Div 1/2, Class III), TMJ disc dynamics, and canine-guided vs group function occlusion.',
            keyPoints: [
              'Centric Relation (CR) vs Maximum Intercuspation (MIC)',
              'Bennett movement and immediate side shift in mandibular articulation',
              'Internal derangement of TMJ: Disc displacement with vs without reduction'
            ]
          }
        ],
        quiz: {
          id: 'bds-q1',
          title: 'Module 1 Assessment: Dental Anatomy & Diagnostics',
          questions: [
            {
              id: 'bq1',
              question: 'In the FDI World Dental Federation notation, what does tooth "36" designate?',
              options: [
                'Maxillary right first molar',
                'Mandibular left first permanent molar',
                'Maxillary left second premolar',
                'Mandibular right deciduous canine'
              ],
              correctOptionIndex: 1,
              explanation: 'In FDI notation: Quadrant 3 is mandibular left. Tooth 6 is the permanent first molar. Therefore, 36 is the mandibular left first permanent molar.'
            },
            {
              id: 'bq2',
              question: 'What is the classic diagnostic indicator of irreversible pulpitis over reversible pulpitis?',
              options: [
                'Pain upon mastication only',
                'Pain on cold stimuli that lingers for more than 15-30 seconds after removal',
                'Bleeding from the adjacent gingival sulcus',
                'Absence of any radiographic visible restoration'
              ],
              correctOptionIndex: 1,
              explanation: 'Lingering thermal pain (lasting > 15-30 seconds) signifies unresolving inflammation of the pulp tissue, requiring root canal therapy.'
            }
          ]
        }
      },
      {
        id: 'bds-m2',
        moduleNumber: 2,
        title: 'Conservative Dentistry & Endodontics',
        duration: '4 Weeks · 6 Lessons',
        lessons: [
          {
            id: 'bds-l3',
            title: 'Modern Root Canal Instrumentation, Irrigation Dynamics & Obturation',
            duration: '62 min',
            summary: 'Rotary NiTi file metallurgy, sonic/ultrasonic irrigation activation, smear layer removal, and warm vertical compaction techniques.',
            keyPoints: [
              'Glide path establishment and glide path rotary systems',
              'Sodium hypochlorite (NaOCl) and Chlorhexidine interaction prevention (parachloroaniline precipitate)',
              'Cold lateral condensation vs warm vertical obturation'
            ]
          }
        ]
      },
      {
        id: 'bds-m3',
        moduleNumber: 3,
        title: 'Oral & Maxillofacial Surgery and Local Anesthesia',
        duration: '3.5 Weeks · 5 Lessons',
        lessons: [
          {
            id: 'bds-l4',
            title: 'Nerve Block Techniques, Surgical Exodontia & Impacted Third Molars',
            duration: '66 min',
            summary: 'IANB, Gow-Gates, and Vazirani-Akinosi nerve block techniques, Winter’s classification, flap designs, and surgical bone guttering.',
            keyPoints: [
              'Anatomical landmarks for standard inferior alveolar nerve block (pterygomandibular raphe, coronoid notch)',
              'Winter and Pell & Gregory classifications of mandibular 3rd molar impactions',
              'Prevention and clinical management of Dry Socket (Alveolar Osteitis)'
            ]
          }
        ]
      },
      {
        id: 'bds-m4',
        moduleNumber: 4,
        title: 'Prosthodontics & Crown/Bridge Preparations',
        duration: '3 Weeks · 4 Lessons',
        lessons: [
          {
            id: 'bds-l5',
            title: 'Fixed Prosthodontic Principles, Margin Geometries & Impression Materials',
            duration: '58 min',
            summary: 'Chamfer vs shoulder finish lines, biological width preservation, digital intraoral scanning, and elastomeric impression techniques.',
            keyPoints: [
              'Taper convergence angle (6 to 10 degrees) for optimal retention and resistance form',
              'Gingival retraction cord techniques for subgingival margin exposure',
              'Zirconia vs Lithium Disilicate (E-Max) material selection'
            ]
          }
        ]
      },
      {
        id: 'bds-m5',
        moduleNumber: 5,
        title: 'Periodontics, Oral Pathology & Dental Radiology',
        duration: '2.5 Weeks · 4 Lessons',
        lessons: [
          {
            id: 'bds-l6',
            title: 'Periodontal Classification (2018 AAP/EFP), Bone Loss & Radiographic Analysis',
            duration: '52 min',
            summary: 'Staging and grading of periodontitis, clinical attachment loss (CAL), furcation involvement, and benign/malignant oral lesions.',
            keyPoints: [
              'Staging (Severity I to IV) and Grading (Rate of progression A to C)',
              'Full-mouth scaling and root planing (SRP) protocols',
              'Oral precancerous lesions: Leukoplakia, Erythroplakia, and Oral Submucous Fibrosis (OSMF)'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'aiml-engineering-mastery',
    code: 'AIML-601',
    title: 'AIML: Artificial Intelligence & Machine Learning Engineering',
    subtitle: 'From mathematical foundations to neural networks, PyTorch, computer vision, transformers, LLMs, and enterprise AI deployment.',
    category: 'technology',
    categoryLabel: 'Artificial Intelligence & Data',
    image: '/src/assets/images/subject_aiml_neural_1792858335087.jpg',
    instructor: 'Sudharshan Reddy K R & Senior AI Research Faculty',
    instructorTitle: 'Founder & CEO, REDDY ONLINE EDUCATION / AI Systems Specialist',
    totalModules: 5,
    totalLessons: 26,
    durationWeeks: 16,
    rating: 4.99,
    enrolledStudentsCount: 6240,
    feeINR: 6999,
    originalFeeINR: 12999,
    level: 'Beginner to Advanced',
    certificationTitle: 'Certified Artificial Intelligence & Machine Learning Architect',
    prerequisites: 'Basic Python programming and intermediate linear algebra & calculus.',
    highlights: [
      'Build neural networks from scratch in Python before transitioning to PyTorch',
      'Computer Vision with Convolutional Networks & YOLO object detection',
      'Transformers, Attention mechanisms, and Fine-Tuning open-source LLMs',
      'Production ML pipelines: MLflow, ONNX runtime, and FastAPI model serving'
    ],
    modules: [
      {
        id: 'aiml-m1',
        moduleNumber: 1,
        title: 'Foundations of Machine Learning & Statistical Learning',
        duration: '3 Weeks · 6 Lessons',
        lessons: [
          {
            id: 'aiml-l1',
            title: 'Supervised Learning: Linear/Logistic Regression & Cost Optimization',
            duration: '56 min',
            summary: 'Loss functions (MSE, Binary Cross-Entropy), gradient descent variants (SGD, Adam), bias-variance tradeoff, and regularizations (L1/L2).',
            keyPoints: [
              'Mathematical derivation of gradient descent update rules',
              'Overfitting mitigation with L1 Lasso (sparsity) and L2 Ridge (weight shrinkage)',
              'Evaluation metrics: Precision, Recall, F1-Score, and ROC-AUC curve interpretation'
            ],
            codeSnippetOrClinicalCase: `# PyTorch Tensor Computation & Automatic Differentiation
import torch
import torch.nn as nn

# Linear Model with Autograd
X = torch.tensor([[1.0], [2.0], [3.0], [4.0]], requires_grad=False)
y = torch.tensor([[2.0], [4.0], [6.0], [8.0]], requires_grad=False)

model = nn.Linear(in_features=1, out_features=1)
criterion = nn.MSELoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.01)

# Training Step
for epoch in range(100):
    pred = model(X)
    loss = criterion(pred, y)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

print(f"Weight: {model.weight.item():.4f}, Bias: {model.bias.item():.4f}")`,
            downloadableResourceTitle: 'Machine Learning Math & Optimization Notebook'
          },
          {
            id: 'aiml-l2',
            title: 'Decision Trees, Random Forests & Gradient Boosting (XGBoost/LightGBM)',
            duration: '60 min',
            summary: 'Gini impurity, entropy, information gain, bagging vs boosting paradigms, and hyperparameter tuning with Optuna.',
            keyPoints: [
              'Tree splitting criteria and pruning to prevent excessive depth',
              'Why Gradient Boosted Trees dominate tabular dataset competitions',
              'SHAP and LIME values for model interpretability and feature importance'
            ]
          }
        ],
        quiz: {
          id: 'aiml-q1',
          title: 'Module 1 Assessment: Machine Learning Principles',
          questions: [
            {
              id: 'aq1',
              question: 'Why does L1 regularization (Lasso) tend to induce exact zero weights (feature sparsity) unlike L2?',
              options: [
                'L1 has quadratic curvature at the origin',
                'The L1 diamond constraint boundary intersects coordinate axes at non-differentiable sharp corners',
                'L1 penalty is computationally smaller than L2 penalty',
                'L1 can only be calculated with positive gradients'
              ],
              correctOptionIndex: 1,
              explanation: 'The geometric diamond shape of the L1 norm constraint frequently intersects the loss contours along the axes where one or more parameters equal zero.'
            }
          ]
        }
      },
      {
        id: 'aiml-m2',
        moduleNumber: 2,
        title: 'Deep Learning & Neural Networks with PyTorch',
        duration: '3.5 Weeks · 5 Lessons',
        lessons: [
          {
            id: 'aiml-l3',
            title: 'Multi-Layer Perceptrons (MLPs), Backpropagation & Modern Optimizers',
            duration: '64 min',
            summary: 'Computational graphs, chain rule backprop, activation functions (ReLU, GELU, Swish), batch normalization, and dropout.',
            keyPoints: [
              'Vanishing/exploding gradient problems and weight initialization (He, Xavier)',
              'AdamW optimizer: Decoupled weight decay regularization',
              'PyTorch Dataset and DataLoader pipelines with multi-worker concurrency'
            ]
          }
        ]
      },
      {
        id: 'aiml-m3',
        moduleNumber: 3,
        title: 'Computer Vision: CNNs, ResNets & Object Detection',
        duration: '3.5 Weeks · 5 Lessons',
        lessons: [
          {
            id: 'aiml-l4',
            title: 'Convolutional Kernels, Feature Maps, and Residual Skip Connections',
            duration: '62 min',
            summary: '2D convolutions, max pooling, receptive fields, ResNet residual blocks, transfer learning, and image segmentation.',
            keyPoints: [
              'Why skip connections allow training of 100+ layer deep networks without degradation',
              'Fine-tuning pre-trained ImageNet backbones on custom medical or technical domains',
              'YOLO architecture for single-shot real-time bounding box prediction'
            ]
          }
        ]
      },
      {
        id: 'aiml-m4',
        moduleNumber: 4,
        title: 'Natural Language Processing & Transformers',
        duration: '3 Weeks · 5 Lessons',
        lessons: [
          {
            id: 'aiml-l5',
            title: 'Self-Attention, Multi-Head Scaled Dot-Product & Transformer Architecture',
            duration: '68 min',
            summary: 'Tokens, positional encodings, Query-Key-Value matrices, masked attention, and BERT vs GPT encoder/decoder differences.',
            keyPoints: [
              'Mathematical formula of Scaled Dot-Product Attention: softmax(QK^T / sqrt(d_k))V',
              'Computational complexity of self-attention (O(N^2)) and flash attention optimizations',
              'Hugging Face Transformers library workflow: tokenization to fine-tuning'
            ]
          }
        ]
      },
      {
        id: 'aiml-m5',
        moduleNumber: 5,
        title: 'Generative AI, Large Language Models & MLOps',
        duration: '3 Weeks · 5 Lessons',
        lessons: [
          {
            id: 'aiml-l6',
            title: 'LoRA Fine-Tuning, Retrieval-Augmented Generation (RAG) & Model Serving',
            duration: '66 min',
            summary: 'Parameter-efficient fine-tuning (PEFT), vector embeddings, vector databases (Chroma/FAISS), prompt engineering, and low-latency inference servers.',
            keyPoints: [
              'Low-Rank Adaptation (LoRA) matrix decomposition of weight updates',
              'Building end-to-end RAG systems with dense document retrieval',
              'Quantization techniques (4-bit/8-bit bitsandbytes and AWQ) for edge deployment'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'communication-leadership-skills',
    code: 'COMM-101',
    title: 'Executive Communication & Professional Soft Skills',
    subtitle: 'Master high-stakes public speaking, corporate presentations, business writing, interview negotiation, and cross-cultural leadership.',
    category: 'communication',
    categoryLabel: 'Communication & Leadership',
    image: '/src/assets/images/subject_comm_skills_1792858335470.jpg',
    instructor: 'Sudharshan Reddy K R & Senior Leadership Coach',
    instructorTitle: 'Founder & CEO, REDDY ONLINE EDUCATION / Leadership Communications Mentor',
    totalModules: 5,
    totalLessons: 20,
    durationWeeks: 8,
    rating: 4.94,
    enrolledStudentsCount: 3950,
    feeINR: 3499,
    originalFeeINR: 6999,
    level: 'Beginner to Advanced',
    certificationTitle: 'Executive Leadership Communication & Master Orator Certification',
    prerequisites: 'Open to students, healthcare professionals, engineers, and executives.',
    highlights: [
      'Interactive public speaking simulations and voice modulation exercises',
      'The Pyramid Principle for structured, persuasive executive presentations',
      'STAR method for acing top-tier corporate and clinical residency interviews',
      'Conflict de-escalation, active listening, and workplace negotiation tactics'
    ],
    modules: [
      {
        id: 'comm-m1',
        moduleNumber: 1,
        title: 'The Psychology of Persuasion & Confident Speaking',
        duration: '1.5 Weeks · 4 Lessons',
        lessons: [
          {
            id: 'comm-l1',
            title: 'Overcoming Stage Anxiety, Voice Modulation & Body Language',
            duration: '46 min',
            summary: 'Techniques to harness adrenaline, command stage presence, use the power pause, and calibrate vocal pitch and pace.',
            keyPoints: [
              'Diaphragmatic breathing and physiological sigh to eliminate voice tremor',
              'Eye contact triangulation technique in small rooms vs large lecture halls',
              'Eliminating filler words ("um", "ah", "like", "you know") using intentional silence'
            ],
            codeSnippetOrClinicalCase: `EXECUTIVE PRESENTATION FRAMEWORK (The Hook, Story, Offer):
1. The 10-Second Hook:
   "In the next 45 minutes, three decisions we make in this room will decide whether we double our clinic capacity or face an operational deficit."
2. The Tension / Status Quo Gap:
   Contrast what is happening today vs what is possible with quantitative benchmarks.
3. The Three Pillar Solution:
   Always group recommendations in threes (rule of three: Cognitive processing ceiling).
4. Concrete Call to Action:
   "Approval of Phase 1 pilot by Friday 5 PM so procurement commences Monday morning."`,
            downloadableResourceTitle: 'Public Speaking Confidence Blueprint & Vocal Warm-up Guide'
          },
          {
            id: 'comm-l2',
            title: 'Storytelling for Impact: The Hero’s Journey in Business & Healthcare',
            duration: '48 min',
            summary: 'Structuring narratives that convert abstract data into emotionally resonant, unforgettable memories for stakeholders.',
            keyPoints: [
              'Character-Conflict-Resolution framework for case presentations',
              'Using data-storytelling to persuade non-technical executive boards',
              'Framing challenges as collaborative opportunities'
            ]
          }
        ],
        quiz: {
          id: 'comm-q1',
          title: 'Module 1 Assessment: Persuasion & Delivery',
          questions: [
            {
              id: 'cq1',
              question: 'When an audience asks a hostile or challenging question during a presentation, what is the best first step?',
              options: [
                'Immediately interrupt to defend your data',
                'Pause, acknowledge the question calmly, clarify the premise, and bridge back to your core objective',
                'Ignore the question and move to the conclusion slide',
                'Apologize and concede the argument unconditionally'
              ],
              correctOptionIndex: 1,
              explanation: 'A calm intentional pause and clear acknowledgment de-escalates emotional tension while giving you time to formulate a reasoned bridge to your solution.'
            }
          ]
        }
      },
      {
        id: 'comm-m2',
        moduleNumber: 2,
        title: 'Executive Business Writing & Corporate Email Etiquette',
        duration: '1.5 Weeks · 4 Lessons',
        lessons: [
          {
            id: 'comm-l3',
            title: 'The Minto Pyramid Principle & Executive Briefing Documents',
            duration: '50 min',
            summary: 'Bottom-line-up-front (BLUF) writing, eliminating verbosity, and drafting crisp technical reports and proposals.',
            keyPoints: [
              'Lead with the conclusion/recommendation, followed by mutually exclusive, collectively exhaustive (MECE) supporting arguments',
              'Subject lines that guarantee 90%+ open rates in executive teams',
              'Drafting effective meeting minutes and actionable post-meeting memos'
            ]
          }
        ]
      },
      {
        id: 'comm-m3',
        moduleNumber: 3,
        title: 'Job Interview Mastery, Salary Negotiation & Personal Branding',
        duration: '2 Weeks · 4 Lessons',
        lessons: [
          {
            id: 'comm-l4',
            title: 'STAR Method for Behavioral Interviews & Salary Anchoring',
            duration: '54 min',
            summary: 'Crafting high-impact Situation, Task, Action, Result responses, handling trick questions, and psychological anchoring in compensation talks.',
            keyPoints: [
              'Structuring 90-second STAR stories with quantified metrics',
              'How to answer "What is your biggest weakness?" with authentic growth evidence',
              'Non-aggressive compensation negotiation scripts that preserve professional goodwill'
            ]
          }
        ]
      },
      {
        id: 'comm-m4',
        moduleNumber: 4,
        title: 'Interpersonal Dynamics, Difficult Conversations & Active Listening',
        duration: '1.5 Weeks · 4 Lessons',
        lessons: [
          {
            id: 'comm-l5',
            title: 'De-escalation Strategies, Constructive Feedback & Empathy in Healthcare & Tech',
            duration: '48 min',
            summary: 'The SBI (Situation-Behavior-Impact) feedback model, radical candor, and managing high-stress team disagreements.',
            keyPoints: [
              'Separating personality from behavior in performance reviews',
              'Empathetic listening techniques for healthcare professionals with anxious patients',
              'Reflective questioning: "What I hear you saying is..." to build instant rapport'
            ]
          }
        ]
      },
      {
        id: 'comm-m5',
        moduleNumber: 5,
        title: 'Cross-Cultural Communication & Global Leadership',
        duration: '1.5 Weeks · 4 Lessons',
        lessons: [
          {
            id: 'comm-l6',
            title: 'Navigating High-Context vs Low-Context Cultures & Virtual Global Teams',
            duration: '45 min',
            summary: 'Cultural intelligence (CQ), asynchronous global communication, and leading diverse distributed teams.',
            keyPoints: [
              'Direct vs indirect negative feedback styles across North America, Europe, and Asia',
              'Leading effective hybrid meetings across different time zones',
              'Establishing inclusive norms that empower quiet team members to voice ideas'
            ]
          }
        ]
      }
    ]
  }
];
