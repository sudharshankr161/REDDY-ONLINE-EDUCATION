import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  X, 
  GraduationCap, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Building, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSuccess }) => {
  const { login, switchDemoUser } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  
  const [email, setEmail] = useState('ananya.sharma@reddyeducation.online');
  const [name, setName] = useState('Ananya Sharma');
  const [phone, setPhone] = useState('+91 98450 71234');
  const [college, setCollege] = useState('Bangalore University');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, name);
    onSuccess();
    onClose();
  };

  const handleSelectDemo = (type: 'tech' | 'medical') => {
    switchDemoUser(type);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 pb-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                {mode === 'login' ? 'Student Portal Login' : 'New Student Registration'}
              </h2>
              <div className="text-xs text-slate-400">
                REDDY ONLINE EDUCATION
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

        {/* Quick Demo Credentials Strip */}
        <div className="bg-slate-50 p-4 border-b border-slate-200 space-y-2">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Instant Demo Profile Quick-Switch:</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleSelectDemo('tech')}
              className="p-2 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-300 rounded-xl text-left text-xs transition-colors cursor-pointer"
            >
              <div className="font-bold text-slate-900">Ananya Sharma</div>
              <div className="text-[10px] text-slate-500">Python & AIML (Certified)</div>
            </button>

            <button
              onClick={() => handleSelectDemo('medical')}
              className="p-2 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-300 rounded-xl text-left text-xs transition-colors cursor-pointer"
            >
              <div className="font-bold text-slate-900">Dr. Karthik Reddy</div>
              <div className="text-[10px] text-slate-500">BDS & BSc Nursing</div>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Registered Student Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@student.reddyeducation.online"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                defaultValue="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">College / Dept</label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors shadow-md shadow-red-600/20 flex items-center justify-center gap-1.5 cursor-pointer mt-2"
          >
            <span>{mode === 'login' ? 'Sign In to Student Portal' : 'Create Student Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center pt-2 text-xs text-slate-500">
            {mode === 'login' ? (
              <span>
                New to Reddy Online Education?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-bold text-red-600 hover:underline cursor-pointer"
                >
                  Create an account
                </button>
              </span>
            ) : (
              <span>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-red-600 hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </span>
            )}
          </div>

        </form>

      </div>

    </div>
  );
};
