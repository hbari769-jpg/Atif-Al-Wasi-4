import React, { useState, useEffect, useRef } from 'react';
import { AestificArchIcon, AestificWordmark } from './AestificLogo';
import { SpatialAtmosphere } from './SpatialAtmosphere';
import { Mail, Lock, User as UserIcon, ArrowRight, ArrowLeft, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { setAuthToken } from '../lib/api';
import { updatePageSEO } from '../lib/seo';

interface SignupPageProps {
  onRegister: (name: string, email: string, pass: string, confirm: string) => Promise<{ requiresVerification?: boolean; email?: string } | void>;
  onLogin: (email: string, pass: string, remember: boolean) => Promise<{ requiresVerification?: boolean; email?: string } | void>;
  onBackToHome: () => void;
  onOpenLogin: () => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({
  onRegister,
  onLogin,
  onBackToHome,
  onOpenLogin,
}) => {
  const [subMode, setSubMode] = useState<'register' | 'login' | 'verify'>('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  useEffect(() => {
    updatePageSEO('signup');
  }, []);

  const handleGoogleAuth = () => {
    setError(null);
    setSuccessInfo(null);
    setOauthLoading(true);

    const width = 500;
    const height = 640;
    const left = Math.max(0, Math.round(window.screenX + (window.outerWidth - width) / 2));
    const top = Math.max(0, Math.round(window.screenY + (window.outerHeight - height) / 2.5));
    const features = `width=${width},height=${height},left=${left},top=${top},status=no,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=yes`;

    const targetUrl = `/api/auth/google?origin=${encodeURIComponent(window.location.origin)}`;
    const popup = window.open(targetUrl, 'aestific_google_oauth_popup', features);

    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      setOauthLoading(false);
      setError('Pop-up was blocked by your browser. Please allow pop-ups for this site to continue with Google.');
      return;
    }

    const pollTimer = setInterval(() => {
      try {
        if (!popup || popup.closed) {
          clearInterval(pollTimer);
          setOauthLoading(false);
        }
      } catch {
        clearInterval(pollTimer);
        setOauthLoading(false);
      }
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessInfo(null);
    setLoading(true);

    try {
      if (subMode === 'register') {
        if (!name.trim()) {
          setError('Please enter your name.');
          setLoading(false);
          return;
        }
        if (!email.trim() || !password) {
          setError('Please fill in all required fields.');
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError('Passwords do not match.');
          setLoading(false);
          return;
        }
        const res = await onRegister(name, email, password, confirmPassword);
        if (res && res.requiresVerification) {
          setSubMode('verify');
          setSuccessInfo('Verification code sent to your email.');
        }
      } else if (subMode === 'login') {
        if (!email.trim() || !password) {
          setError('Please enter your email and password.');
          setLoading(false);
          return;
        }
        const res = await onLogin(email, password, true);
        if (res && res.requiresVerification) {
          setSubMode('verify');
          setSuccessInfo('Verification code sent to your email.');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col w-screen h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 overflow-y-auto font-sans selection:bg-zinc-800 selection:text-white">
      <SpatialAtmosphere />

      {/* Top Navigation Bar */}
      <header className="h-16 px-4 sm:px-8 border-b border-zinc-200 dark:border-white/10 bg-white/90 dark:bg-zinc-950/80 backdrop-blur-md flex items-center justify-between z-20 shrink-0">
        <button
          type="button"
          onClick={onBackToHome}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors border border-zinc-200 dark:border-white/15 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Aestific</span>
        </button>

        <div className="flex items-center gap-2.5">
          <AestificArchIcon size={24} className="text-black dark:text-white" />
          <AestificWordmark height={16} />
        </div>

        <div className="text-xs text-zinc-500 font-medium">
          Secure Authentication
        </div>
      </header>

      {/* Main Content Centered Form Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[440px] bg-white dark:bg-[#0d0d0f] border border-zinc-200/90 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative"
        >
          {/* Brand Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative mb-3 flex items-center justify-center">
              <div className="absolute -inset-3 rounded-full bg-zinc-100 dark:bg-white/[0.05] blur-lg pointer-events-none" />
              <AestificArchIcon size={44} className="relative z-10 text-black dark:text-white" />
            </div>

            <div className="flex flex-col items-center mt-1">
              <AestificWordmark height={20} />
            </div>

            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white mt-3">
              {subMode === 'register' ? 'Create your Aestific account' : subMode === 'login' ? 'Sign in to Aestific' : 'Verify Your Email'}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-xs leading-relaxed">
              {subMode === 'register'
                ? 'Step into a world of possibilities with Aestific AI.'
                : subMode === 'login'
                ? 'Welcome back. Sign in to your workspace.'
                : 'Enter the verification code sent to your email.'}
            </p>
          </div>

          {/* Mode Switch Tabs */}
          {subMode !== 'verify' && (
            <div className="flex p-1 bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => { setSubMode('register'); setError(null); setSuccessInfo(null); }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  subMode === 'register'
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                }`}
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => { setSubMode('login'); setError(null); setSuccessInfo(null); }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  subMode === 'login'
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                }`}
              >
                Sign In
              </button>
            </div>
          )}

          {/* Error / Success Banners */}
          {error && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs leading-relaxed flex items-start gap-2.5">
              <span className="font-bold">Error:</span>
              <span>{error}</span>
            </div>
          )}

          {successInfo && (
            <div className="mb-5 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs leading-relaxed flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>{successInfo}</span>
            </div>
          )}

          {/* Google OAuth Button */}
          {subMode !== 'verify' && (
            <>
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={oauthLoading}
                className="w-full h-11 px-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-white/15 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-all font-medium text-xs sm:text-sm flex items-center justify-center gap-3 cursor-pointer shadow-xs active:scale-[0.99] disabled:opacity-50"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.15v3.15C3.15 21.32 7.22 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.15C.42 8.08 0 9.71 0 11.5s.42 3.42 1.15 4.89l4.12-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.22 0 3.15 2.68 1.15 6.61l4.12 3.15c.95-2.85 3.6-4.96 6.73-4.96z"
                  />
                </svg>
                <span>{oauthLoading ? 'Connecting to Google...' : 'Continue with Google'}</span>
              </button>

              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-zinc-200 dark:border-white/10" />
                <span className="px-3 text-[11px] uppercase tracking-widest text-zinc-400 font-medium">or email</span>
                <div className="flex-1 border-t border-zinc-200 dark:border-white/10" />
              </div>
            </>
          )}

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {subMode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Your Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Atif Al Wasi"
                    required
                    className="w-full h-11 pl-10 pr-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder-zinc-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                  />
                </div>
              </div>
            )}

            {subMode !== 'verify' && (
              <>
                <div>
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                      className="w-full h-11 pl-10 pr-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder-zinc-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full h-11 pl-10 pr-11 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder-zinc-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {subMode === 'register' && (
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        required
                        className="w-full h-11 pl-10 pr-11 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder-zinc-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 mt-2 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-semibold text-xs sm:text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
            >
              <span>{loading ? 'Please wait...' : subMode === 'register' ? 'Create Account' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Already have an account footer link */}
          <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-white/10 text-center text-xs text-zinc-500">
            {subMode === 'register' ? (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setSubMode('login');
                    setError(null);
                  }}
                  className="font-semibold text-black dark:text-white hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </p>
            ) : (
              <p>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setSubMode('register');
                    setError(null);
                  }}
                  className="font-semibold text-black dark:text-white hover:underline cursor-pointer"
                >
                  Sign up
                </button>
              </p>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};
