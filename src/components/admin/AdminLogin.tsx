import { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { storageService } from '../../services/storageService';

interface AdminLoginProps {
  onSuccess: () => void;
  onCancel: () => void;
  isFullPage?: boolean;
}

export function AdminLogin({ onSuccess, onCancel, isFullPage = false }: AdminLoginProps) {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) {
      setError('Please enter your admin password.');
      return;
    }
    const success = storageService.loginAdmin(pin);
    if (success) {
      onSuccess();
    } else {
      setError('Invalid PIN or password. Try default: admin123');
    }
  };

  const loginCard = (
    <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
      {/* Top back action */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <button
          onClick={onCancel}
          className="text-xs font-semibold text-slate-500 hover:text-[#0F766E] dark:text-slate-400 dark:hover:text-teal-400 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Public Website</span>
        </button>
        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#E6F4F1] dark:bg-teal-950/70 text-[#0F766E] dark:text-teal-300 border border-[#0F766E]/30 dark:border-teal-800">
          Admin Portal
        </span>
      </div>

      <div className="text-center mb-6">
        <div className="w-14 h-14 rounded-2xl bg-[#E6F4F1] dark:bg-teal-950 text-[#0F766E] dark:text-teal-400 border border-[#0F766E]/30 flex items-center justify-center mx-auto mb-3.5 shadow-xs">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-[#0F2747] dark:text-white tracking-tight">
          Admin Authentication
        </h2>
        <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1 max-w-xs mx-auto">
          Sign in to update Muhammad Salman's profile, career history, skills, and settings.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {error && (
          <div className="p-3 text-xs rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 animate-in fade-in duration-200">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-[#1F2937] dark:text-slate-300 mb-1.5">
            Admin Password / PIN
          </label>
          <div className="relative">
            <input
              type={showPin ? 'text' : 'password'}
              autoFocus
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(null);
              }}
              placeholder="Enter password (default: admin123)"
              className="w-full pl-3.5 pr-10 py-2.5 text-xs rounded-lg bg-[#F4F6F8] dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[#1F2937] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              tabIndex={-1}
            >
              {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Credentials reminder */}
        <div className="p-3 rounded-xl bg-[#F4F6F8] dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-[11px] text-[#64748B] dark:text-slate-400 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-[#1F2937] dark:text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0F766E]" />
            <span>Default access credential:</span>
          </div>
          <div className="flex items-center justify-between pt-0.5">
            <span>Password:</span>
            <code className="font-mono bg-white dark:bg-slate-700 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-600 text-[#0F766E] dark:text-teal-400 font-bold">
              admin123
            </code>
          </div>
        </div>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#0F766E] hover:bg-[#0c625c] active:bg-[#0a4f4a] text-white text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
        >
          <span>Login to Admin Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );

  if (isFullPage) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col">
        {/* Full-Page Admin Top Bar */}
        <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-slate-900 to-emerald-950 text-emerald-400 font-bold flex items-center justify-center text-sm border border-emerald-500/30">
              MS
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white block leading-tight">
                Muhammad Salman
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                Accountant Profile Administration
              </span>
            </div>
          </div>

          <button
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Website</span>
          </button>
        </header>

        {/* Center Container */}
        <div className="flex-1 flex items-center justify-center p-4">
          {loginCard}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      {loginCard}
    </div>
  );
}
