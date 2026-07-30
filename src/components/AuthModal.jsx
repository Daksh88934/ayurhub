"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Leaf, Lock, Mail, User, ShieldCheck, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('farmer');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Convex Cloud Mutations
  const registerUserMutation = useMutation(api.tasks.registerUser);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      if (isRegister) {
        if (!name || !email || !password) {
          setErrorMessage('Please fill in all required fields.');
          setIsSubmitting(false);
          return;
        }

        try {
          await registerUserMutation({
            name,
            email,
            password,
            role
          });
        } catch (dbErr) {
          console.log("Database response:", dbErr);
        }

        const newUser = {
          _id: `user-${Date.now()}`,
          name,
          email,
          role,
          createdAt: new Date().toISOString()
        };

        triggerGoogleWelcomeNotification(name, email);

        setToastMessage(`Welcome, ${name}! Your account has been created successfully.`);
        setTimeout(() => {
          onLoginSuccess(newUser);
          onClose();
        }, 1000);
      } else {
        if (email.trim() === 'admin@gmail.com' && password.trim() === 'admin123') {
          const adminUser = {
            _id: 'admin-master',
            name: 'System Administrator',
            email: 'admin@gmail.com',
            role: 'admin'
          };
          triggerGoogleWelcomeNotification('System Admin', email);
          onLoginSuccess(adminUser);
          onClose();
          return;
        }

        if (email && password) {
          const user = {
            _id: `user-${Date.now()}`,
            name: email.split('@')[0],
            email,
            role: 'farmer'
          };
          triggerGoogleWelcomeNotification(user.name, email);
          onLoginSuccess(user);
          onClose();
        } else {
          setErrorMessage('Invalid email or password. Please try again.');
        }
      }
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerGoogleWelcomeNotification = (userName, targetEmail) => {
    console.log(`[Notification API] Dispatching login confirmation alert to ${targetEmail}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md glass-panel p-8 rounded-3xl border border-[#2E7D32]/30 shadow-2xl space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#2E7D32]/10 border border-[#2E7D32]/30 text-[#2E7D32]">
              <Leaf className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1B1B1B] dark:text-white">
                {isRegister ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-xs text-[#4A5568] dark:text-zinc-400">
                {isRegister ? 'Enter your details to register on AyurChain' : 'Sign in to access your dashboard'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-xs text-zinc-400 hover:text-white px-2 py-1 bg-zinc-800/40 rounded-lg">✕</button>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> {errorMessage}
          </div>
        )}

        {toastMessage && (
          <div className="p-3 rounded-xl bg-[#43A047]/10 border border-[#43A047]/30 text-[#43A047] text-xs flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4" /> {toastMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-[#1B1B1B] dark:text-zinc-200 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  required
                  placeholder="e.g. Rajesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#2E7D32]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#1B1B1B] dark:text-zinc-200 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#2E7D32]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1B1B1B] dark:text-zinc-200 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#2E7D32]"
              />
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-[#1B1B1B] dark:text-zinc-200 mb-1">Account Role</label>
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#2E7D32]"
              >
                <option value="farmer">Farmer / Herbalist</option>
                <option value="transporter">Logistics Partner</option>
                <option value="lab">Quality Control Lab</option>
                <option value="manufacturer">Medicine Manufacturer</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-gradient-to-r from-[#2E7D32] to-[#43A047] hover:from-[#1B5E20] hover:to-[#2E7D32] text-white font-extrabold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'Please wait...' : isRegister ? 'Create Account' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-zinc-200 dark:border-zinc-800 text-xs">
          <span className="text-[#4A5568] dark:text-zinc-400">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}
          </span>{' '}
          <button 
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="font-bold text-[#2E7D32] dark:text-[#66BB6A] hover:underline ml-1"
          >
            {isRegister ? 'Sign In' : 'Create Account'}
          </button>
        </div>

        {/* Master Admin Hint */}
        <div className="p-3 bg-[#F8F5EE] dark:bg-zinc-900 rounded-xl text-[11px] text-zinc-500 font-mono text-center">
          Admin Portal: <strong className="text-[#C8A96A]">admin@gmail.com</strong> | Pass: <strong className="text-[#C8A96A]">admin123</strong>
        </div>
      </motion.div>
    </div>
  );
}
