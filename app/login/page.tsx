'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// Note: If you don't have lucide-react, install it or replace with your preferred icon library
import { Eye, EyeOff, Lock, User, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Clear any old session when visiting login page
  useEffect(() => {
    fetch('/api/logout', { method: 'POST' }).catch(() => {});
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/');
        router.refresh();
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg px-4 relative overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-[440px] bg-dark-surface/60 backdrop-blur-xl border border-dark-border/80 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-black/40">
        
        {/* Header/Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 mb-4">
            <span className="text-xl font-black text-primary tracking-wider">M</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            MKM CRM
          </h1>
          <p className="text-sm text-gray-400 mt-1.5">
            Welcome back. Please sign in to your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username Field */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider ml-0.5">
              Username
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors">
                <User className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-dark-bg/80 border border-dark-border rounded-xl pl-10 pr-4 py-3.5 text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
                placeholder="name@company.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-0.5">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Password
              </label>
              <a href="#" className="text-xs font-medium text-primary hover:underline transition-all">
                Forgot?
              </a>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-dark-bg/80 border border-dark-border rounded-xl pl-10 pr-11 py-3.5 text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium text-center animate-fade-in">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-black font-semibold py-3.5 rounded-xl text-sm transition-all disabled:opacity-50 active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-primary/10 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-dark-border/40">
          <p className="text-xs text-gray-500">
            Authorized personnel only. Secure connection active.
          </p>
        </div>
      </div>
    </div>
  );
}