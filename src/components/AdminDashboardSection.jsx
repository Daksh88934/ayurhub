"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Factory, 
  Sprout, 
  Database, 
  MapPin, 
  CheckCircle2, 
  TrendingUp,
  Activity,
  Plus
} from 'lucide-react';

export default function AdminDashboardSection({ harvests, batches, logs }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <section className="py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-[#2E7D32] dark:text-[#66BB6A] text-xs font-bold font-mono">
            <Activity className="w-4 h-4 text-[#43A047]" /> Network Authority & Admin Control
          </div>
          <h2 className="text-2xl font-bold text-[#1B1B1B] dark:text-white">
            AyurChain Admin Control Center
          </h2>
        </div>

        {/* Admin Tabs */}
        <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'overview' ? 'bg-[#2E7D32] text-white shadow-md' : 'text-[#4A5568] dark:text-zinc-400'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('farmers')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'farmers' ? 'bg-[#2E7D32] text-white shadow-md' : 'text-[#4A5568] dark:text-zinc-400'
            }`}
          >
            Farmers ({harvests.length})
          </button>
          <button
            onClick={() => setActiveTab('manufacturers')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'manufacturers' ? 'bg-[#2E7D32] text-white shadow-md' : 'text-[#4A5568] dark:text-zinc-400'
            }`}
          >
            Batches ({batches.length})
          </button>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-[#2E7D32]">
            <Users className="w-5 h-5" />
            <span className="text-xs font-bold text-[#43A047] font-mono">+12 Active</span>
          </div>
          <div className="text-2xl font-black text-[#1B1B1B] dark:text-white font-mono">{harvests.length}</div>
          <div className="text-xs text-[#4A5568] dark:text-zinc-400">Registered Farmers</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-[#C8A96A]">
            <Factory className="w-5 h-5" />
            <span className="text-xs font-bold text-[#C8A96A] font-mono">100% Certified</span>
          </div>
          <div className="text-2xl font-black text-[#1B1B1B] dark:text-white font-mono">{batches.length}</div>
          <div className="text-xs text-[#4A5568] dark:text-zinc-400">Manufacturer Batches</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-[#43A047]">
            <Sprout className="w-5 h-5" />
            <span className="text-xs font-bold text-[#43A047] font-mono">Grade A+</span>
          </div>
          <div className="text-2xl font-black text-[#1B1B1B] dark:text-white font-mono">18,450 kg</div>
          <div className="text-xs text-[#4A5568] dark:text-zinc-400">Total Herb Volume</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-[#2E7D32]">
            <Database className="w-5 h-5" />
            <span className="text-xs font-bold text-[#43A047] font-mono">Synced</span>
          </div>
          <div className="text-2xl font-black text-[#1B1B1B] dark:text-white font-mono">{logs.length}</div>
          <div className="text-xs text-[#4A5568] dark:text-zinc-400">Blockchain Transactions</div>
        </div>
      </div>

      {/* Admin Tables View */}
      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <h3 className="text-base font-bold text-[#1B1B1B] dark:text-white flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <span>Registered Supply Chain Entities</span>
          <span className="text-xs font-mono text-[#2E7D32] dark:text-[#66BB6A]">Real-Time Convex DB Feed</span>
        </h3>

        <div className="space-y-3">
          {harvests.map(h => (
            <div key={h.harvestId} className="p-4 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <div className="font-bold text-[#1B1B1B] dark:text-white text-sm">{h.farmerName} • <span className="text-[#2E7D32] font-mono">{h.harvestId}</span></div>
                <div className="text-[#4A5568] dark:text-zinc-400">{h.herbType} | {h.farmLocation}</div>
              </div>
              <div className="flex items-center gap-3 font-mono">
                <span className="text-[#C8A96A]">{h.weightKg} kg</span>
                <span className="px-2.5 py-1 rounded-full bg-[#43A047]/10 text-[#43A047] font-bold border border-[#43A047]/30">
                  {h.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
