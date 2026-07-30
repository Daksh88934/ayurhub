"use client";

import { motion } from 'framer-motion';
import { 
  UserCheck, 
  MapPin, 
  Database, 
  TestTube2, 
  Factory, 
  QrCode, 
  ArrowRight,
  CheckCircle2,
  Sprout
} from 'lucide-react';

export default function HowItWorksSection({ onSelectStep }) {
  const steps = [
    {
      num: "01",
      title: "Farmer Collection",
      subtitle: "Farmer Creates Account",
      desc: "Farmer registers Aadhaar/ID, farm location, and harvest details into the AyurChain system.",
      icon: UserCheck,
      color: "border-[#2E7D32] text-[#2E7D32] bg-[#2E7D32]/10",
      tabKey: "farmer"
    },
    {
      num: "02",
      title: "Geo-Tagging & Photos",
      subtitle: "GPS Coordinates Recorded",
      desc: "Live GPS location and harvest photos uploaded to decentralized IPFS storage.",
      icon: MapPin,
      color: "border-[#43A047] text-[#43A047] bg-[#43A047]/10",
      tabKey: "farmer"
    },
    {
      num: "03",
      title: "Blockchain Record",
      subtitle: "Immutable Transaction",
      desc: "Every raw collection is stored as an unchangeable smart contract record.",
      icon: Database,
      color: "border-[#66BB6A] text-[#66BB6A] bg-[#66BB6A]/10",
      tabKey: "blockchain"
    },
    {
      num: "04",
      title: "Quality Testing",
      subtitle: "Accredited Lab Audit",
      desc: "Manufacturer receives herbs & uploads pesticide, heavy metal, and active compound reports.",
      icon: TestTube2,
      color: "border-purple-500 text-purple-500 bg-purple-500/10",
      tabKey: "lab"
    },
    {
      num: "05",
      title: "Medicine Manufacturing",
      subtitle: "Batch Linking & QR",
      desc: "Links each medicine batch to raw herb hashes & generates a unique consumer QR code.",
      icon: Factory,
      color: "border-[#C8A96A] text-[#C8A96A] bg-[#C8A96A]/10",
      tabKey: "manufacturer"
    },
    {
      num: "06",
      title: "Consumer Verification",
      subtitle: "Scan & Audit Journey",
      desc: "Customer scans QR code to inspect origin farm 🗺️, date 📅, lab report 🧪, & batch 📦.",
      icon: QrCode,
      color: "border-[#2E7D32] text-[#2E7D32] bg-[#2E7D32]/10",
      tabKey: "consumer"
    }
  ];

  return (
    <section className="py-12 space-y-8">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] dark:text-[#66BB6A] text-xs font-bold font-mono">
          <Sprout className="w-3.5 h-3.5" /> End-to-End Workflow
        </div>
        <h2 className="text-3xl font-extrabold text-[#1B1B1B] dark:text-white">
          How AyurChain Works
        </h2>
        <p className="text-sm text-[#4A5568] dark:text-zinc-400">
          Step-by-step transparent provenance journey from farm soil to retail customer verification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.3 }}
              onClick={() => onSelectStep(s.tabKey)}
              className="glass-panel p-6 rounded-2xl space-y-4 hover:border-[#2E7D32]/50 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-[#C8A96A]">STAGE {s.num}</span>
                <div className={`p-3 rounded-2xl border ${s.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#1B1B1B] dark:text-white group-hover:text-[#2E7D32] dark:group-hover:text-[#66BB6A] transition-colors">
                  {s.title}
                </h3>
                <div className="text-xs font-semibold text-[#2E7D32] dark:text-[#66BB6A]">{s.subtitle}</div>
                <p className="text-xs text-[#4A5568] dark:text-zinc-400 leading-relaxed pt-1">{s.desc}</p>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-[#C8A96A] pt-2">
                <span>Explore Stage</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
