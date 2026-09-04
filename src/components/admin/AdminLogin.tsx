import React, { useState } from 'react';
import { Shield, Lock, Mail, Eye, EyeOff, ArrowLeft, KeyRound, AlertCircle, CheckCircle2, Terminal } from 'lucide-react';
import { authenticateAdmin, ADMIN_CREDENTIALS } from '../../lib/adminStorage';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onExit: () => void;
  darkMode: boolean;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onExit, darkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const result = authenticateAdmin(email, password);
      setIsLoading(false);
      if (result.success) {
        onLoginSuccess();
      } else {
        setError(result.error || 'Authentication failed. Please verify credentials.');
      }
    }, 450);
  };

  const handleQuickFill = () => {
    setEmail(ADMIN_CREDENTIALS.email);
    setPassword(ADMIN_CREDENTIALS.password);
    setError(null);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 ${
      darkMode ? 'bg-[#080808] text-zinc-100' : 'bg-[#FAFAFA] text-zinc-900'
    }`}>
      {/* Back button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={onExit}
          className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-full border transition-all cursor-pointer ${
            darkMode 
              ? 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-zinc-700' 
              : 'border-zinc-200 bg-white text-zinc-600 hover:text-zinc-950 hover:border-zinc-300 shadow-xs'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Website</span>
        </button>
      </div>

      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 text-indigo-400 shadow-inner mb-4">
            <Shield className="w-7 h-7" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-indigo-500 text-[11px] font-bold uppercase tracking-[0.3em]">
              Solita Solutions
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              Internal Systems
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Admin Backend Portal
          </h1>
          <p className={`text-xs sm:text-sm mt-1.5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Authorized access for systems engineering & client operations
          </p>
        </div>

        {/* Login Card */}
        <div className={`rounded-3xl border p-8 shadow-2xl relative backdrop-blur-sm ${
          darkMode
            ? 'bg-[#0E0E0E]/90 border-zinc-800 shadow-black/60'
            : 'bg-white border-zinc-200 shadow-zinc-200/50'
        }`}>
          {/* Quick-Fill Helper Banner */}
          <div className={`mb-6 p-3.5 rounded-2xl border flex items-center justify-between text-xs ${
            darkMode ? 'bg-indigo-950/20 border-indigo-900/40 text-indigo-300' : 'bg-indigo-50 border-indigo-200 text-indigo-800'
          }`}>
            <div className="flex items-center gap-2.5">
              <KeyRound className="w-4 h-4 text-indigo-400 shrink-0" />
              <div className="leading-tight">
                <div className="font-semibold font-mono text-[11px]">Authorized Admin Key</div>
                <div className="text-[10px] opacity-80">{ADMIN_CREDENTIALS.email}</div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleQuickFill}
              className="px-3 py-1 rounded-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-mono text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Quick Fill
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-bold mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  id="admin-email-input"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="help.solita@gmail.com"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-1 ${
                    darkMode
                      ? 'bg-zinc-900/70 border-zinc-800 text-white placeholder-zinc-600 focus:border-indigo-500 focus:ring-indigo-500'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-indigo-600 focus:ring-indigo-600'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-bold mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="admin-password-input"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className={`w-full pl-10 pr-11 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-1 ${
                    darkMode
                      ? 'bg-zinc-900/70 border-zinc-800 text-white placeholder-zinc-600 focus:border-indigo-500 focus:ring-indigo-500'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-indigo-600 focus:ring-indigo-600'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              id="admin-submit-login-btn"
              disabled={isLoading}
              className="w-full mt-2 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-xs uppercase tracking-widest shadow-md shadow-indigo-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authenticate Session</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Encrypted Session</span>
            </div>
            <span>v2.4 Enterprise</span>
          </div>
        </div>

        {/* Footnote */}
        <div className="text-center mt-6">
          <p className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
            Confidential Internal Tooling • Solita Solutions Operations
          </p>
        </div>
      </div>
    </div>
  );
};
