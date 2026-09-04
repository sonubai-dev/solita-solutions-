import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { LogOut, CheckCircle2, AlertCircle } from 'lucide-react';
import { googleSignIn, logout } from '../lib/workspaceAuth';

interface GoogleSignInButtonProps {
  user: User | null;
  onUserChanged: (user: User | null) => void;
  compact?: boolean;
  darkMode: boolean;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  user,
  onUserChanged,
  compact = false,
  darkMode
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await googleSignIn();
      if (res) {
        onUserChanged(res.user);
      }
    } catch (err: any) {
      console.error('Sign-in failure:', err);
      // If popup closed by user, don't show loud error
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(err.message || 'Google authentication failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      onUserChanged(null);
    } catch (err: any) {
      console.error('Sign out error:', err);
    }
  };

  if (user) {
    return (
      <div
        className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border transition-all ${
          darkMode
            ? 'bg-slate-900/90 border-slate-700/80 text-slate-200'
            : 'bg-white border-slate-200 text-slate-800 shadow-sm'
        }`}
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || 'Google User'}
            referrerPolicy="no-referrer"
            className="w-6 h-6 rounded-full border border-indigo-500/40 object-cover"
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
            {(user.displayName || user.email || 'G')[0].toUpperCase()}
          </div>
        )}

        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-xs font-semibold max-w-[120px] sm:max-w-[160px] truncate">
              {user.displayName || user.email?.split('@')[0]}
            </span>
            <span className="inline-flex items-center gap-0.5 text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-2.5 h-2.5" />
              <span>Workspace</span>
            </span>
          </div>
          {!compact && user.email && (
            <span className={`text-[10px] font-mono truncate max-w-[140px] sm:max-w-[180px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {user.email}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          title="Sign out of Google Workspace"
          className={`p-1 rounded-lg border transition-colors cursor-pointer ml-1 ${
            darkMode
              ? 'border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800'
              : 'border-slate-200 text-slate-500 hover:text-black hover:bg-slate-100'
          }`}
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        id="gsi-workspace-signin-btn"
        type="button"
        disabled={loading}
        onClick={handleSignIn}
        className="gsi-material-button cursor-pointer transition-all active:scale-[0.98]"
        aria-label="Sign in with Google to enable Gmail & Google Forms integrations"
      >
        <div className="gsi-material-button-state"></div>
        <div className="gsi-material-button-content-wrapper">
          <div className="gsi-material-button-icon">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              style={{ display: 'block' }}
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              ></path>
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              ></path>
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              ></path>
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              ></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
          </div>
          <span className="gsi-material-button-contents font-medium text-xs sm:text-sm">
            {loading ? 'Connecting...' : 'Sign in with Google'}
          </span>
        </div>
      </button>

      {error && (
        <div className="flex items-center gap-1.5 text-rose-400 text-[11px] font-mono mt-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
