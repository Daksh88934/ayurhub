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
  ShieldAlert,
  Lock,
  Mail,
  UserCheck
} from 'lucide-react';

export default function AdminDashboardSection({ harvests, batches, logs, users = [] }) {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <section className="py-8 space-y-6">
      {/* Secret Admin Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-[#C8A96A]/40 bg-[#C8A96A]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#C8A96A] font-bold text-xs mb-1 font-mono">
            <Lock className="w-4 h-4" /> Restricted Master Admin Control Center
          </div>
          <h2 className="text-2xl font-bold text-[#1B1B1B] dark:text-white">
            AyurChain Governance Portal (admin@gmail.com)
          </h2>
          <p className="text-xs text-[#4A5568] dark:text-zinc-400 mt-1">
            System level user registrations, registered accounts in Convex DB, and immutable blockchain network metrics.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-full bg-[#2E7D32]/10 border border-[#2E7D32]/30 text-[#2E7D32] dark:text-[#66BB6A] text-xs font-mono font-bold">
          Master Session Verified
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1.5 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'users' ? 'bg-[#2E7D32] text-white shadow-md' : 'text-[#4A5568] dark:text-zinc-400'
          }`}
        >
          Registered Accounts ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('harvests')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'harvests' ? 'bg-[#2E7D32] text-white shadow-md' : 'text-[#4A5568] dark:text-zinc-400'
          }`}
        >
          Geo-Tagged Harvests ({harvests.length})
        </button>
        <button
          onClick={() => setActiveTab('batches')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'batches' ? 'bg-[#2E7D32] text-white shadow-md' : 'text-[#4A5568] dark:text-zinc-400'
          }`}
        >
          Medicine Batches ({batches.length})
        </button>
      </div>

      {/* Dynamic View Panels */}
      {activeTab === 'users' && (
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="text-base font-bold text-[#1B1B1B] dark:text-white flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <span>Convex DB Registered Accounts</span>
            <span className="text-xs font-mono text-[#2E7D32] dark:text-[#66BB6A]">Live User Directory</span>
          </h3>

          {users.length > 0 ? (
            <div className="space-y-3">
              {users.map((u) => (
                <div key={u._id} className="p-4 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <div className="font-bold text-[#1B1B1B] dark:text-white flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#2E7D32]" /> {u.email}
                    </div>
                    <div className="text-zinc-500">Name: {u.name} | Role: <span className="text-[#C8A96A] font-semibold uppercase">{u.role}</span></div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#43A047]/10 text-[#43A047] font-mono font-bold">
                    Active Account
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-zinc-400 text-xs font-medium">
              No registered user accounts found yet in Convex DB. Create an account via the Sign In modal!
            </div>
          )}
        </div>
      )}

      {activeTab === 'harvests' && (
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="text-base font-bold text-[#1B1B1B] dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-3">
            Registered Raw Herb Batches
          </h3>
          <div className="space-y-3">
            {harvests.map(h => (
              <div key={h.harvestId} className="p-4 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <div className="font-bold text-[#1B1B1B] dark:text-white text-sm">{h.farmerName} • <span className="text-[#2E7D32] font-mono">{h.harvestId}</span></div>
                  <div className="text-[#4A5568] dark:text-zinc-400">{h.herbType} | {h.farmLocation}</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#43A047]/10 text-[#43A047] font-mono font-bold">
                  {h.weightKg} kg
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
