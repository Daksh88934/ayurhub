"use client";

import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { 
  Users, Sprout, Truck, ShieldCheck, Activity, TreePine, Flame, TrendingUp 
} from 'lucide-react';
import { INITIAL_ANALYTICS } from '@/lib/blockchain';

const chartData = [
  { month: 'Jan', harvests: 45, verifiedScans: 1200 },
  { month: 'Feb', harvests: 68, verifiedScans: 2300 },
  { month: 'Mar', harvests: 92, verifiedScans: 4100 },
  { month: 'Apr', harvests: 120, verifiedScans: 6800 },
  { month: 'May', harvests: 155, verifiedScans: 9500 },
  { month: 'Jun', harvests: 190, verifiedScans: 12840 },
];

export default function AnalyticsDashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-emerald-500/20 space-y-1">
          <div className="flex items-center justify-between text-emerald-500">
            <Users className="w-5 h-5" />
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 font-bold">+12%</span>
          </div>
          <div className="text-xl font-black">{INITIAL_ANALYTICS.totalFarmers}</div>
          <div className="text-[11px] text-slate-500 dark:text-zinc-400">Registered Farmers</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-emerald-500/20 space-y-1">
          <div className="flex items-center justify-between text-emerald-500">
            <Sprout className="w-5 h-5" />
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 font-bold">+24%</span>
          </div>
          <div className="text-xl font-black">{INITIAL_ANALYTICS.totalHarvestKg.toLocaleString()} kg</div>
          <div className="text-[11px] text-slate-500 dark:text-zinc-400">Geo-Tagged Harvest</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-teal-500/20 space-y-1">
          <div className="flex items-center justify-between text-teal-500">
            <Truck className="w-5 h-5" />
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/10 font-bold">Active</span>
          </div>
          <div className="text-xl font-black">{INITIAL_ANALYTICS.activeLogisticsUnits}</div>
          <div className="text-[11px] text-slate-500 dark:text-zinc-400">Cold-Chain Units</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-purple-500/20 space-y-1">
          <div className="flex items-center justify-between text-purple-500">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 font-bold">100%</span>
          </div>
          <div className="text-xl font-black">{INITIAL_ANALYTICS.verifiedConsumerScans.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500 dark:text-zinc-400">Consumer Scans</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-amber-500/20 space-y-1">
          <div className="flex items-center justify-between text-amber-500">
            <Activity className="w-5 h-5" />
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 font-bold">Top</span>
          </div>
          <div className="text-xl font-black">{INITIAL_ANALYTICS.authenticityRate}</div>
          <div className="text-[11px] text-slate-500 dark:text-zinc-400">Authenticity Score</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-emerald-500/20 space-y-1">
          <div className="flex items-center justify-between text-emerald-600">
            <TreePine className="w-5 h-5" />
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 font-bold">Eco</span>
          </div>
          <div className="text-xs font-bold truncate text-emerald-500">{INITIAL_ANALYTICS.co2SavedKg}</div>
          <div className="text-[11px] text-slate-500 dark:text-zinc-400">Sustainability Index</div>
        </div>
      </div>

      {/* Visual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 glass-panel p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                Monthly Provenance & Consumer Audits Growth
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">Real-time scan verifications and farm harvest entries</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderColor: '#10b981', 
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }} 
                />
                <Area type="monotone" dataKey="verifiedScans" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorScans)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 glass-panel p-6 rounded-2xl space-y-4">
          <h3 className="text-base font-bold flex items-center gap-2 text-amber-500">
            <Flame className="w-5 h-5" />
            Herb Distribution Share
          </h3>
          
          <div className="space-y-3 pt-2 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Ashwagandha (Withania somnifera)</span>
                <span className="text-emerald-500">45%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[45%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Krishna Tulsi (Ocimum sanctum)</span>
                <span className="text-teal-500">30%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-teal-500 h-full w-[30%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Curcuma Longa (Organic Turmeric)</span>
                <span className="text-amber-500">15%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[15%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Giloy Stems (Tinospora cordifolia)</span>
                <span className="text-purple-500">10%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full w-[10%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
