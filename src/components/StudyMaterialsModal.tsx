import React, { useState } from 'react';
import { StudyMaterial } from '../types';
import { STUDY_MATERIALS_DATA } from '../data/studyMaterialsData';
import { 
  X, 
  FileText, 
  Download, 
  Search, 
  BookOpen, 
  CheckCircle, 
  Sparkles,
  Eye,
  FileCode,
  ShieldCheck
} from 'lucide-react';

interface StudyMaterialsModalProps {
  onClose: () => void;
}

export const StudyMaterialsModal: React.FC<StudyMaterialsModalProps> = ({ onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewMaterial, setPreviewMaterial] = useState<StudyMaterial | null>(null);

  const categories = [
    { id: 'all', label: 'All Subjects' },
    { id: 'python-core-advanced', label: 'Python' },
    { id: 'higher-applied-mathematics', label: 'Mathematics' },
    { id: 'bsc-nursing-clinical', label: 'BSc Nursing' },
    { id: 'bds-dentistry-clinical', label: 'BDS Dentistry' },
    { id: 'aiml-engineering-mastery', label: 'AIML' },
    { id: 'communication-leadership-skills', label: 'Communication' }
  ];

  const filteredMaterials = STUDY_MATERIALS_DATA.filter((mat) => {
    const matchesCategory = selectedCategory === 'all' || mat.courseId === selectedCategory;
    const matchesSearch =
      mat.title.toLowerCase().includes(search.toLowerCase()) ||
      mat.description.toLowerCase().includes(search.toLowerCase()) ||
      mat.courseTitle.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (mat: StudyMaterial) => {
    const blob = new Blob([mat.sampleContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Reddy_Education_${mat.title.replace(/\s+/g, '_').slice(0, 30)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Downloadable Study Materials & Clinical Handbooks
              </h2>
              <div className="text-xs text-slate-400">
                REDDY ONLINE EDUCATION · Academic Directorate of CEO Sudharshan Reddy K R
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

        {/* Search & Subject Tabs Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search formula sheets, dental atlases, ICU protocols, PyTorch blueprints..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Materials List & Preview Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {previewMaterial ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <button
                    onClick={() => setPreviewMaterial(null)}
                    className="text-xs text-red-600 hover:underline font-semibold flex items-center gap-1 mb-1 cursor-pointer"
                  >
                    ← Back to Catalog
                  </button>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {previewMaterial.title}
                  </h3>
                  <div className="text-xs text-slate-500">
                    {previewMaterial.courseTitle} · {previewMaterial.fileType} ({previewMaterial.fileSize})
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(previewMaterial)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Document</span>
                </button>
              </div>

              {/* Text Preview Display */}
              <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 shadow-inner">
                <pre className="whitespace-pre-wrap">{previewMaterial.sampleContent}</pre>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMaterials.map((mat) => (
                <div
                  key={mat.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-500">{mat.fileType}</span>
                      <span className="text-[11px] font-mono text-slate-400">{mat.fileSize}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {mat.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {mat.description}
                    </p>

                    <div className="text-[11px] text-slate-500 pt-1">
                      Subject: <strong>{mat.courseTitle}</strong>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-slate-400 tabular-nums">
                      {mat.downloadsCount.toLocaleString()} downloads
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPreviewMaterial(mat)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Preview
                      </button>

                      <button
                        onClick={() => handleDownload(mat)}
                        className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
