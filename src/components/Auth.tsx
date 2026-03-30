import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';

interface AuthProps {
  onClose: () => void;
}

export const Auth = ({ onClose }: AuthProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onClose();
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage('Check your email for the confirmation link!');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-card w-full max-w-md p-8 relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-white/60 text-sm">
            {isLogin ? 'Enter your credentials to access your portfolio.' : 'Join Vanguardia and start building your future.'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 text-sm">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {message && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start gap-3 text-emerald-400 text-sm">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{message}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 emerald-gradient text-white font-bold rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
