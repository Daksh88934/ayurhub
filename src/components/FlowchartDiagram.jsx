"use client";

import { motion } from 'framer-motion';
import { 
  Leaf, 
  Truck, 
  TestTube2, 
  Factory, 
  QrCode, 
  CheckCircle2, 
  ArrowRight,
  Database,
  ShieldCheck,
  Cpu
} from 'lucide-react';

export default function FlowchartDiagram() {
  const steps = [
    {
      id: "01",
      title: "Farmer Geo-Tag Harvest",
      role: "Farmer Portal",
      desc: "Record GPS coordinates, upload harvest photos to IPFS, and mint raw herb origin transaction on Blockchain.",
      icon: Leaf,
      color: "border-emerald-500 text-emerald-500 bg-emerald-500/10"
    },
    {
      id: "02",
      title: "Cold Chain Transport",
      role: "Logistics Carrier",
      desc: "Log driver vehicle ID, arrival timestamps, and live sensor temperature logs (21°C - 24°C).",
      icon: Truck,
      color: "border-teal-500 text-teal-500 bg-teal-500/10"
    },
    {
      id: "03",
      title: "Pharmacognosy Testing",
      role: "Quality Lab",
      desc: "Analyze active alkaloids %, pesticide residue, and heavy metals. Issue IPFS Quality Certificates.",
      icon: TestTube2,
      color: "border-purple-500 text-purple-500 bg-purple-500/10"
    },
    {
      id: "04",
      title: "Medicine Formulation",
      role: "Manufacturer Hub",
      desc: "Bind certified raw harvest hashes to finished medicine batch serials & generate Smart QR Codes.",
      icon: Factory,
      color: "border-amber-500 text-amber-500 bg-amber-500/10"
    },
    {
      id: "05",
      title: "Consumer Audit Scan",
      role: "End Consumer",
      desc: "Scan QR Code on smartphone to inspect complete origin farm, lab reports, & AI authenticity score.",
      icon: QrCode,
      color: "border-emerald-400 text-emerald-400 bg-emerald-400/10"
    }
  ];

  return (
    <div className="glass-panel p-6 md:p-8 rounded-3xl space-y-8 border border-emerald-500/20 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-500 font-semibold text-xs mb-1">
            <Cpu className="w-4 h-4" /> System Architecture & Supply Flow
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            End-to-End Ayurvedic Provenance Flowchart
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
            How data flows seamlessly from origin farms to Convex Cloud DB and Polygon/Ethereum Smart Contracts
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-mono font-bold">
          <Database className="w-4 h-4" /> Convex DB + IPFS Synchronized
        </div>
      </div>

      {/* Horizontal / Vertical Stepper Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        {steps.map((step, idx) => {
          const IconComponent = step.icon;
          return (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
              className="relative glass-panel p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 flex flex-col justify-between space-y-3 hover:border-emerald-500/40 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold text-slate-400 dark:text-zinc-600">{step.id}</span>
                <div className={`p-2.5 rounded-xl border ${step.color} group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">{step.role}</div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-zinc-100">{step.title}</h4>
                <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed">{step.desc}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="w-5 h-5 text-slate-400 dark:text-zinc-600" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
