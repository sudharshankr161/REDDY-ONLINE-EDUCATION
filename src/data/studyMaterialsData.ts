import { StudyMaterial } from '../types';

export const STUDY_MATERIALS_DATA: StudyMaterial[] = [
  {
    id: 'mat-py-01',
    courseId: 'python-core-advanced',
    courseTitle: 'Python Programming & Software Engineering',
    title: 'Python 3.12 Comprehensive Quick Reference & Object-Oriented Architecture',
    category: 'Cheat Sheet & Architecture',
    fileType: 'PDF',
    fileSize: '4.8 MB',
    downloadsCount: 3820,
    description: 'Complete synthesis of syntax, memory management, OOP dunder methods, generator protocols, and concurrency patterns.',
    sampleContent: `=============================================================================
REDDY ONLINE EDUCATION
FOUNDER & CEO: SUDHARSHAN REDDY K R
STUDY MATERIAL: PYTHON PROGRAMMING & SOFTWARE ENGINEERING (PY-301)
=============================================================================

1. CORE MEMORY & IDENTITY
-----------------------------------------------------------------------------
In Python, variables are named references bound to objects in the heap.
- id(x): returns unique memory address
- is: identity check (same memory address)
- ==: equality check (calls __eq__)

Mutable types: list, dict, set, bytearray
Immutable types: int, float, str, tuple, frozenset, bytes

2. ESSENTIAL DECORATOR PATTERN
-----------------------------------------------------------------------------
import functools
import time

def timing_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        duration = time.perf_counter() - start
        print(f"[{func.__name__}] executed in {duration:.6f}s")
        return result
    return wrapper

3. ASYNC I/O ARCHITECTURE WITH FASTAPI
-----------------------------------------------------------------------------
import asyncio
from fastapi import FastAPI, Depends

app = FastAPI(title="Reddy Online Education Microservice")

@app.get("/api/v1/health")
async def health_check():
    return {"status": "HEALTHY", "founder": "Sudharshan Reddy K R"}

=============================================================================
(c) 2026 REDDY ONLINE EDUCATION. All Rights Reserved. Authorized for enrolled students.
=============================================================================`
  },
  {
    id: 'mat-py-02',
    courseId: 'python-core-advanced',
    courseTitle: 'Python Programming & Software Engineering',
    title: 'FastAPI Production Microservice Starter Repo & Docker Compose',
    category: 'Code Repository',
    fileType: 'Code Repository',
    fileSize: '2.1 MB',
    downloadsCount: 2950,
    description: 'Boilerplate repository with asynchronous SQLAlchemy 2.0, Alembic migrations, PyTest test suites, and Docker setup.',
    sampleContent: `# REDDY ONLINE EDUCATION - FASTAPI BOILERPLATE
# Starter template created by Sudharshan Reddy K R

project_root/
  ├── app/
  │   ├── api/
  │   ├── core/config.py
  │   ├── db/session.py
  │   ├── models/
  │   └── main.py
  ├── tests/
  ├── Dockerfile
  └── docker-compose.yml`
  },
  {
    id: 'mat-math-01',
    courseId: 'higher-applied-mathematics',
    courseTitle: 'Higher & Applied Mathematics for Engineers and Scientists',
    title: 'Applied Calculus & Engineering Linear Algebra Formula Atlas',
    category: 'Formula Atlas',
    fileType: 'Formula Atlas',
    fileSize: '6.2 MB',
    downloadsCount: 3410,
    description: 'Over 120 verified formulas, step-by-step vector identities, Laplace transforms tables, and differential equations solution templates.',
    sampleContent: `=============================================================================
REDDY ONLINE EDUCATION
FOUNDER & CEO: SUDHARSHAN REDDY K R
APPLIED MATHEMATICS & ENGINEERING FORMULA ATLAS (MATH-202)
=============================================================================

1. VECTOR CALCULUS IDENTITIES
-----------------------------------------------------------------------------
- Gradient: ∇f = (∂f/∂x)i + (∂f/∂y)j + (∂f/∂z)k
- Divergence: ∇ · F = (∂F_x/∂x) + (∂F_y/∂y) + (∂F_z/∂z)
- Curl: ∇ × F = det([i, j, k; ∂/∂x, ∂/∂y, ∂/∂z; F_x, F_y, F_z])
- Divergence Theorem: ∯_S (F · n) dS = ∭_V (∇ · F) dV
- Stokes' Theorem: ∮_C (F · dr) = ∬_S (∇ × F · n) dS

2. LAPLACE TRANSFORM PAIRS
-----------------------------------------------------------------------------
f(t)                    L{f(t)} = F(s)
-----------------------------------------------------------------------------
1                       1/s
t^n                     n! / s^(n+1)
e^(at)                  1 / (s - a)
sin(wt)                 w / (s^2 + w^2)
cos(wt)                 s / (s^2 + w^2)
e^(at) sin(wt)          w / ((s-a)^2 + w^2)

3. MATRIX EIGENVALUE THEOREMS
-----------------------------------------------------------------------------
For n×n matrix A:
- Trace(A) = ∑ λ_i
- Det(A) = ∏ λ_i
- A is diagonalizable iff it has n linearly independent eigenvectors.

=============================================================================
(c) 2026 REDDY ONLINE EDUCATION. Academic Board of Mathematics.
=============================================================================`
  },
  {
    id: 'mat-nur-01',
    courseId: 'bsc-nursing-clinical',
    courseTitle: 'BSc Nursing Clinical Practice & Patient Care',
    title: 'Clinical Nursing Assessment Handbook & Pharmacology Dosage Protocols',
    category: 'Clinical Protocol',
    fileType: 'Clinical Protocol',
    fileSize: '8.4 MB',
    downloadsCount: 4620,
    description: 'Evidence-based hospital nursing protocols, pediatric and adult drug calculation rules, ICU crash cart guidelines, and OSCE clinical rubrics.',
    sampleContent: `=============================================================================
REDDY ONLINE EDUCATION
FOUNDER & CEO: SUDHARSHAN REDDY K R
CLINICAL NURSING PRACTICE & DRUG DOSAGE PROTOCOL (NUR-401)
=============================================================================

1. THE TEN RIGHTS OF MEDICATION ADMINISTRATION
-----------------------------------------------------------------------------
1. Right Patient (Check 2 identifiers: Name & MRN)
2. Right Medication (Verify label 3 times against MAR)
3. Right Dose (Perform independent dual calculation for high-alert drugs)
4. Right Route (Oral, IV, IM, SC, Topical, Inhalation)
5. Right Time (Within 30-min window for time-critical medications)
6. Right Documentation (Immediate charting post-administration)
7. Right Indication (Confirm rationale matches patient diagnosis)
8. Right Response (Assess clinical therapeutic and adverse response)
9. Right to Refuse (Respect autonomy; educate & notify physician)
10. Right Patient Education (Explain drug name, purpose & side effects)

2. IV FLOW RATE CALCULATION FORMULAS
-----------------------------------------------------------------------------
Formula:
  Flow Rate (drops/min) = [Total Volume (mL) * Drop Factor (gtt/mL)] / Time (min)

Example:
  Infuse 1000 mL Normal Saline over 8 hours using 15 gtt/mL macro-drip.
  Time in min = 8 * 60 = 480 min
  Flow Rate = (1000 * 15) / 480 = 15000 / 480 = 31.25 -> 31 gtt/min

3. ARTERIAL BLOOD GAS (ABG) REFERENCE VALUES
-----------------------------------------------------------------------------
- pH: 7.35 - 7.45
- PaCO2: 35 - 45 mmHg (Respiratory parameter)
- HCO3-: 22 - 26 mEq/L (Metabolic parameter)
- PaO2: 80 - 100 mmHg
- SaO2: 95% - 100%

=============================================================================
(c) 2026 REDDY ONLINE EDUCATION. Directorate of Clinical Nursing Education.
=============================================================================`
  },
  {
    id: 'mat-bds-01',
    courseId: 'bds-dentistry-clinical',
    courseTitle: 'BDS Clinical Dentistry & Oral Maxillofacial Surgery',
    title: '3D Dental Anatomy, Tooth Morphology & Root Canal Protocol Atlas',
    category: 'Clinical Protocol',
    fileType: 'Clinical Protocol',
    fileSize: '11.5 MB',
    downloadsCount: 3180,
    description: 'High-yield illustrated dental surgery atlas showing pulp anatomy, root canal curvature handling, surgical flap designs, and local anesthesia landmarks.',
    sampleContent: `=============================================================================
REDDY ONLINE EDUCATION
FOUNDER & CEO: SUDHARSHAN REDDY K R
BDS CLINICAL DENTISTRY & ROOT CANAL ATLAS (BDS-501)
=============================================================================

1. PERMANENT MANDIBULAR FIRST MOLAR (TOOTH 46 / 36)
-----------------------------------------------------------------------------
Crown Morphology:
- 5 cusps (Mesiobuccal, Distobuccal, Distal, Mesiolingual, Distolingual)
- Largest cusp: Mesiobuccal; Smallest cusp: Distal
- Y-shaped groove pattern

Canal Anatomy:
- Mesial root: 2 canals (Mesiobuccal & Mesiolingual) in 90%+ cases
- Distal root: 1 or 2 canals (Distobuccal & Distolingual, or large oval canal)
- Access cavity outline: Trapezoidal / Rhomboid with base towards mesial.

2. LOCAL ANESTHESIA: INFERIOR ALVEOLAR NERVE BLOCK (IANB)
-----------------------------------------------------------------------------
Target: Inferior alveolar nerve before it enters the mandibular foramen.
Anatomical Landmarks:
1. Coronoid notch (greatest concavity of anterior border of ramus)
2. Pterygomandibular raphe
3. Occlusal plane of mandibular posterior teeth (6-10 mm above)

Technique:
- Needle syringe positioned over contralateral premolars.
- Penetrate 20-25 mm until bone contact is made.
- Aspirate in 2 planes to prevent intravascular injection.
- Deposit 1.5 - 1.8 mL 2% Lignocaine with 1:80,000 Adrenaline.

=============================================================================
(c) 2026 REDDY ONLINE EDUCATION. Department of Oral & Maxillofacial Sciences.
=============================================================================`
  },
  {
    id: 'mat-aiml-01',
    courseId: 'aiml-engineering-mastery',
    courseTitle: 'AIML: Artificial Intelligence & Machine Learning Engineering',
    title: 'Modern Deep Learning with PyTorch & Transformer Attention Blueprint',
    category: 'PDF',
    fileType: 'PDF',
    fileSize: '7.3 MB',
    downloadsCount: 4890,
    description: 'In-depth mathematical formulation of backprop, attention tensors, LoRA parameters, FlashAttention equations, and MLOps serving best practices.',
    sampleContent: `=============================================================================
REDDY ONLINE EDUCATION
FOUNDER & CEO: SUDHARSHAN REDDY K R
AIML & DEEP LEARNING ARCHITECTURE BLUEPRINT (AIML-601)
=============================================================================

1. SCALED DOT-PRODUCT ATTENTION MATHEMATICS
-----------------------------------------------------------------------------
Given Queries (Q), Keys (K), and Values (V):
  Attention(Q, K, V) = softmax( (Q * K^T) / sqrt(d_k) ) * V

Why scale by sqrt(d_k)?
For large values of d_k, the dot products grow large in magnitude, pushing the
softmax function into regions with extremely small gradients (vanishing gradients).

2. LOW-RANK ADAPTATION (LoRA) EQUATION
-----------------------------------------------------------------------------
For a pre-trained weight matrix W_0 in R^(d x k):
  W = W_0 + ΔW = W_0 + (B * A) * (alpha / r)
where:
  B in R^(d x r) initialized to zero
  A in R^(r x k) initialized with Gaussian distribution
  r << min(d, k) is the rank (typically 8, 16, or 32)
  alpha is a constant scaling hyperparameter

This reduces trainable parameters by up to 99.8% while preserving model fidelity!

=============================================================================
(c) 2026 REDDY ONLINE EDUCATION. AI Systems & Deep Learning Division.
=============================================================================`
  },
  {
    id: 'mat-comm-01',
    courseId: 'communication-leadership-skills',
    courseTitle: 'Executive Communication & Professional Soft Skills',
    title: 'Executive Presentation Playbook & High-Stakes Interview Question Bank',
    category: 'Worksheet',
    fileType: 'Worksheet',
    fileSize: '3.9 MB',
    downloadsCount: 3640,
    description: 'The Minto Pyramid Principle framework, 50 behavioral STAR question templates, salary negotiation scripts, and public speaking warm-ups.',
    sampleContent: `=============================================================================
REDDY ONLINE EDUCATION
FOUNDER & CEO: SUDHARSHAN REDDY K R
EXECUTIVE COMMUNICATION & LEADERSHIP PLAYBOOK (COMM-101)
=============================================================================

1. THE MINTO PYRAMID PRINCIPLE
-----------------------------------------------------------------------------
Standard Narrative:
  Background -> Data -> Analysis -> More Data -> Conclusion (Listener falls asleep)

The Executive Pyramid Structure:
  1. Governing Thought (The Core Recommendation / Decision)
  2. Core Key Line Arguments (Why this works - Max 3 pillars)
  3. Inductive/Deductive Supporting Data

2. THE STAR INTERVIEW RESPONSE BLUEPRINT
-----------------------------------------------------------------------------
S - Situation (15 seconds): Clear context, company, team size, stakes.
T - Task (15 seconds): Your explicit mandate and the roadblock encountered.
A - Action (45 seconds): The strategic decision and specific technical/clinical actions YOU took.
R - Result (15 seconds): Quantifiable business or patient health outcome achieved.

Example:
"By redesigning the clinical triage intake protocol with the nursing staff,
we reduced patient ER waiting times by 38% and eliminated prescription transcription errors."

=============================================================================
(c) 2026 REDDY ONLINE EDUCATION. Center for Leadership & Communication Mastery.
=============================================================================`
  }
];
