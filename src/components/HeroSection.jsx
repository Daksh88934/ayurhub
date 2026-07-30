"use client";

import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Sprout, 
  ArrowRight, 
  QrCode, 
  MapPin, 
  CheckCircle2, 
  Globe2, 
  Cpu, 
  Sparkles,
  Lock
} from 'lucide-react';

export default function HeroSection({ onGetStarted, onScanClick }) {
  return (
    <section className="relative overflow-hidden py-12 lg:py-20">
      {/* Subtle Botanical Ambient Lights */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#2E7D32]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-[#C8A96A]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column - Headline & Actions */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2E7D32]/10 border border-[#2E7D32]/25 text-[#2E7D32] dark:text-[#66BB6A] text-xs font-bold font-mono">
            <Sprout className="w-4 h-4 animate-bounce text-[#43A047]" />
            Blockchain + Geo-Tagging + AI Powered Herbal Provenance
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1B1B1B] dark:text-white leading-[1.15]">
            From Farm to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E7D32] via-[#43A047] to-[#C8A96A]">Formulation</span>
          </h1>

          <p className="text-base sm:text-lg text-[#4A5568] dark:text-zinc-300 max-w-2xl leading-relaxed">
            Eliminate fake or low-quality Ayurvedic herbs. Every raw harvest is geo-tagged at the farm, tested in accredited bio-labs, immutably recorded on Blockchain, and verified via Smart QR Codes.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onGetStarted}
              className="px-7 py-3.5 bg-gradient-to-r from-[#2E7D32] to-[#43A047] hover:from-[#1B5E20] hover:to-[#2E7D32] text-white font-extrabold rounded-2xl shadow-xl glow-forest transition-all flex items-center gap-2"
            >
              Get Started (Launch Workflow)
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onScanClick}
              className="px-6 py-3.5 glass-panel-gold hover:bg-[#C8A96A]/20 text-[#1B1B1B] dark:text-[#C8A96A] font-bold rounded-2xl transition-all flex items-center gap-2"
            >
              <QrCode className="w-5 h-5 text-[#C8A96A]" />
              Verify Product QR Code
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#2E7D32]/15">
            <div>
              <div className="text-2xl font-black text-[#2E7D32] dark:text-[#66BB6A] font-mono">100%</div>
              <div className="text-xs text-[#4A5568] dark:text-zinc-400 font-medium">Immutable Records</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#C8A96A] font-mono">GPS</div>
              <div className="text-xs text-[#4A5568] dark:text-zinc-400 font-medium">Farm Geo-Tagging</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#43A047] font-mono">AI</div>
              <div className="text-xs text-[#4A5568] dark:text-zinc-400 font-medium">Spectral Purity Scans</div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Hero Visual Glass Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="glass-panel p-6 rounded-3xl space-y-5 border border-[#2E7D32]/25 shadow-2xl relative z-10">
            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] dark:text-[#66BB6A]">
                <ShieldCheck className="w-4 h-4 text-[#43A047]" /> Live Smart Contract Verification
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#43A047]/10 text-[#43A047] text-[11px] font-mono font-bold">
                Mainnet Active
              </span>
            </div>

            {/* Product Card Showcase */}
            <div className="relative rounded-2xl overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80" 
                alt="Ashwagandha Harvest"
                className="w-full h-48 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end">
                <span className="text-[11px] font-mono text-[#C8A96A] font-bold">HARVEST-101 • Organic Ashwagandha</span>
                <h4 className="text-white text-base font-bold">Wayanad Bio-Valley Farm, Kerala</h4>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="p-3.5 bg-[#F8F5EE] dark:bg-zinc-950 rounded-xl space-y-2 text-xs border border-zinc-200 dark:border-zinc-800 font-mono">
              <div className="flex justify-between">
                <span className="text-[#4A5568] dark:text-zinc-400">GPS Coordinates:</span>
                <span className="text-[#2E7D32] dark:text-[#66BB6A] font-bold">11.6854° N, 76.1320° E</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4A5568] dark:text-zinc-400">IPFS CID:</span>
                <span className="text-[#C8A96A] truncate max-w-[150px]">QmXoypizjW3WknFiJnKL...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4A5568] dark:text-zinc-400">Active Compound:</span>
                <span className="text-[#43A047] font-bold">4.8% Withanolides (Grade A+)</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
