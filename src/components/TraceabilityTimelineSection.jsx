"use client";

import { motion } from 'framer-motion';
import { 
  UserCheck, 
  MapPin, 
  TestTube2, 
  Factory, 
  Truck, 
  Store, 
  QrCode,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function TraceabilityTimelineSection({ selectedBatch, harvest }) {
  const journeySteps = [
    {
      role: "Farmer Registration",
      actor: harvest?.farmerName || "Rajesh Kumar Sharma",
      detail: `${harvest?.farmLocation || "Wayanad, Kerala"} • Aadhaar: ${harvest?.aadhaarId || "XXXX-8921"}`,
      status: "Verified Farm Soil",
      icon: UserCheck,
      color: "bg-[#2E7D32] text-white"
    },
    {
      role: "Geo-Tag Harvest Collection",
      actor: harvest?.herbType || "Ashwagandha (Withania somnifera)",
      detail: `GPS: ${harvest?.lat || 11.6854}° N, ${harvest?.lng || 76.1320}° E | Weight: ${harvest?.weightKg || 150} kg`,
      status: "IPFS CID Minted",
      icon: MapPin,
      color: "bg-[#43A047] text-white"
    },
    {
      role: "Cold Chain Transport",
      actor: harvest?.transport?.transporterName || "Kerala Green Logistics",
      detail: `Vehicle: ${harvest?.transport?.vehicleNo || "KL-12-AE-4091"} | Temp: ${harvest?.transport?.tempMaintained || "22°C - 24°C"}`,
      status: "In Transit / Delivered",
      icon: Truck,
      color: "bg-[#66BB6A] text-white"
    },
    {
      role: "Pharmacognosy Lab Testing",
      actor: harvest?.labReport?.labName || "Ayush Certified Central Lab",
      detail: `Active Alkaloids: ${harvest?.labReport?.activeAlkaloidsPercent || 4.8}% | Heavy Metals: Passed`,
      status: harvest?.labReport?.qualityGrade || "Grade A+ Export Quality",
      icon: TestTube2,
      color: "bg-purple-600 text-white"
    },
    {
      role: "Medicine Manufacturing",
      actor: selectedBatch?.manufacturerName || "Patanjali Herbals & Research Labs",
      detail: `Batch Serial: ${selectedBatch?.batchId || "AYUR-2026-ASH88"} | Vol: ${selectedBatch?.quantity || "5,000 Bottles"}`,
      status: "Smart Contract Sealed",
      icon: Factory,
      color: "bg-[#C8A96A] text-white"
    },
    {
      role: "Distributor & Pharmacy",
      actor: "Central Ayush Supply Network",
      detail: "Sealed distribution chain with tamper-proof QR tags",
      status: "Distributed to Retail",
      icon: Store,
      color: "bg-[#2E7D32] text-white"
    },
    {
      role: "Customer QR Scan",
      actor: "End Consumer Verification",
      detail: "Scanned via mobile device for origin & purity transparency",
      status: "Verified 100% Genuine",
      icon: QrCode,
      color: "bg-[#43A047] text-white"
    }
  ];

  return (
    <section className="py-8 space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <div>
          <span className="text-xs font-mono font-bold text-[#C8A96A]">FULL SUPPLY CHAIN</span>
          <h2 className="text-2xl font-bold text-[#1B1B1B] dark:text-white">
            End-to-End Traceability Timeline
          </h2>
        </div>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl">
        <div className="relative border-l-2 border-[#2E7D32]/30 pl-6 sm:pl-8 ml-3 space-y-8">
          {journeySteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={step.role}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.3 }}
                className="relative space-y-1.5"
              >
                {/* Node Bullet */}
                <div className={`absolute -left-[37px] sm:-left-[45px] top-0 w-7 h-7 rounded-full ${step.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#2E7D32] dark:text-[#66BB6A]">{step.role}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#43A047]/10 text-[#43A047] text-[11px] font-mono font-bold border border-[#43A047]/30">
                    {step.status}
                  </span>
                </div>

                <h4 className="text-base font-bold text-[#1B1B1B] dark:text-white">{step.actor}</h4>
                <p className="text-xs text-[#4A5568] dark:text-zinc-400 font-mono">{step.detail}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
