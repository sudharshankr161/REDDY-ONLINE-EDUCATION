import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, 
  User, 
  LogOut, 
  Sparkles, 
  Globe, 
  Radio, 
  BookOpen, 
  FileText, 
  CheckCircle,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  onOpenPortal: () => void;
  onOpenLive: () => void;
  onOpenMaterials: () => void;
  onOpenLinks: () => void;
  onOpenAuth: () => void;
  onScrollToFounder: () => void;
  onScrollToCourses: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPortal,
  onOpenLive,
  onOpenMaterials,
  onOpenLinks,
  onOpenAuth,
  onScrollToFounder,
  onScrollToCourses
}) => {
  const { user, logout, switchDemoUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          
          {/* Zone 1: Brand Title (One Line) */}
          <div className="flex items-center gap-3 shrink-0">
            <a 
              href="#top" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center text-white shadow-sm shadow-red-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-tight text-slate-900 whitespace-nowrap leading-tight">
                  REDDY ONLINE EDUCATION
                </span>
                <span className="text-[11px] font-medium text-slate-500 whitespace-nowrap">
                  Founder & CEO: Sudharshan Reddy K R
                </span>
              </div>
            </a>
          </div>

          {/* Zone 2: Clean 4-5 Navigation Links (Single-Line) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            <button
              onClick={onScrollToCourses}
              className="hover:text-red-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              Courses
            </button>
            <button
              onClick={onOpenLive}
              className="hover:text-red-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer relative"
            >
              <Radio className="w-4 h-4 text-red-500" />
              Live Classes
              <span className="inline-flex items-center px-1.5 py-0.2 text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 rounded">
                LIVE
              </span>
            </button>
            <button
              onClick={onOpenMaterials}
              className="hover:text-red-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-slate-400" />
              Study Materials
            </button>
            <button
              onClick={onOpenLinks}
              className="hover:text-red-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Globe className="w-4 h-4 text-slate-400" />
              Official Links
            </button>
            <button
              onClick={onScrollToFounder}
              className="hover:text-red-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              Founder Desk
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action Area */}
          <div className="flex items-center gap-3 shrink-0">
            
            {/* Quick Demo Switcher (Helpful for reviewing student dashboards) */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setDemoMenuOpen(!demoMenuOpen)}
                className="text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer"
                title="Switch demo account to preview different student states"
              >
                Demo Profile ▾
              </button>
              {demoMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-xs"
                  onClick={() => setDemoMenuOpen(false)}
                >
                  <div className="px-3 py-1 font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                    Switch Student Account
                  </div>
                  <button
                    onClick={() => switchDemoUser('tech')}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between text-slate-800"
                  >
                    <span>Ananya (Python & AIML)</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">Certified</span>
                  </button>
                  <button
                    onClick={() => switchDemoUser('medical')}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between text-slate-800"
                  >
                    <span>Dr. Karthik (BDS & Nursing)</span>
                    <span className="text-[10px] text-blue-600 font-semibold">Clinical</span>
                  </button>
                  <button
                    onClick={() => switchDemoUser('fresh')}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between text-slate-600"
                  >
                    <span>Guest Mode (Logged Out)</span>
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenPortal}
                  className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                    {user.name.charAt(0)}
                  </div>
                  <span className="max-w-[110px] truncate">{user.name}</span>
                  <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-amber-400">
                    Dashboard
                  </span>
                </button>
                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-red-600/20 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <User className="w-3.5 h-3.5" />
                Student Login
              </button>
            )}

            {/* Mobile hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => { setMobileMenuOpen(false); onScrollToCourses(); }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-slate-400" />
            Courses Catalog
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenLive(); }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-red-500" />
              Live Virtual Classes
            </span>
            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">LIVE NOW</span>
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenMaterials(); }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-slate-400" />
            Download Study Materials
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenLinks(); }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
          >
            <Globe className="w-4 h-4 text-slate-400" />
            Official Website Links
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onScrollToFounder(); }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            Founder & CEO Desk
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenPortal(); }}
            className="w-full text-center py-2.5 mt-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
          >
            Open Student Dashboard
          </button>
        </div>
      )}
    </header>
  );
};
