"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ayurStore } from '@/lib/blockchain';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import InteractiveMapSection from '@/components/InteractiveMapSection';
import TraceabilityTimelineSection from '@/components/TraceabilityTimelineSection';
import AdminDashboardSection from '@/components/AdminDashboardSection';

import FarmerPortal from '@/components/FarmerPortal';
import TransportPortal from '@/components/TransportPortal';
import ProcessingLabPortal from '@/components/ProcessingLabPortal';
import ManufacturerPortal from '@/components/ManufacturerPortal';
import ConsumerPortal from '@/components/ConsumerPortal';
import BlockchainExplorer from '@/components/BlockchainExplorer';
import AIInspectorModal from '@/components/AIInspectorModal';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import FlowchartDiagram from '@/components/FlowchartDiagram';

import { 
  ShieldCheck, 
  Leaf, 
  Truck, 
  TestTube2, 
  Factory, 
  QrCode, 
  Database, 
  Sparkles, 
  ChevronRight,
  Wallet,
  Sun,
  Moon,
  BarChart3,
  Eye,
  LayoutDashboard,
  Compass,
  GitCommit
} from 'lucide-react';

export default function AyurChainMain() {
  const [activeTab, setActiveTab] = useState('home');
  const [harvests, setHarvests] = useState([]);
  const [batches, setBatches] = useState([]);
  const [logs, setLogs] = useState([]);
  const [walletConnected, setWalletConnected] = useState(true);
  const [walletAddress, setWalletAddress] = useState('0x71C...88f2');
  const [showAiGlobalModal, setShowAiGlobalModal] = useState(false);
  const [searchTargetBatch, setSearchTargetBatch] = useState('');
  const [theme, setTheme] = useState('light');
  
  // Real-time reach & visitor counter state
  const [reachCount, setReachCount] = useState(12850);

  useEffect(() => {
    setHarvests(ayurStore.getHarvests());
    setBatches(ayurStore.getBatches());
    setLogs(ayurStore.getLogs());

    // Simulate real-time reach increments
    const interval = setInterval(() => {
      setReachCount(prev => prev + Math.floor(1 + Math.random() * 3));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  };

  const handleHarvestCreated = (newHarvestData) => {
    const created = ayurStore.addHarvest(newHarvestData);
    setHarvests([...ayurStore.getHarvests()]);
    setLogs([...ayurStore.getLogs()]);
    return created;
  };

  const handleTransportUpdated = (harvestId, transportData) => {
    ayurStore.updateTransport(harvestId, transportData);
    setHarvests([...ayurStore.getHarvests()]);
    setLogs([...ayurStore.getLogs()]);
  };

  const handleLabReportSubmitted = (harvestId, labData) => {
    ayurStore.addLabReport(harvestId, labData);
    setHarvests([...ayurStore.getHarvests()]);
    setLogs([...ayurStore.getLogs()]);
  };

  const handleBatchCreated = (batchData) => {
    const created = ayurStore.createMedicineBatch(batchData);
    setBatches([...ayurStore.getBatches()]);
    setHarvests([...ayurStore.getHarvests()]);
    setLogs([...ayurStore.getLogs()]);
    return created;
  };

  const toggleWallet = () => {
    if (!walletConnected) {
      setWalletConnected(true);
      setWalletAddress('0x71C' + Array.from({length: 4}, () => Math.floor(Math.random()*16).toString(16)).join('') + '...88f2');
    } else {
      setWalletConnected(false);
    }
  };

  return (
    <div className="min-h-screen pb-16 transition-colors duration-300">
      {/* Top Navbar with Earthy Aesthetics */}
      <header className="sticky top-0 z-40 glass-panel border-b border-[#2E7D32]/15 px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            onClick={() => setActiveTab('home')}
            className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#2E7D32] to-[#C8A96A] p-0.5 shadow-lg cursor-pointer glow-forest"
          >
            <div className="w-full h-full bg-white dark:bg-zinc-950 rounded-[14px] flex items-center justify-center">
              <Leaf className="w-5 h-5 text-[#2E7D32] dark:text-[#66BB6A] animate-pulse" />
            </div>
          </div>
          <div onClick={() => setActiveTab('home')} className="cursor-pointer">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight font-sans text-[#1B1B1B] dark:text-white">
                Ayur<span className="text-[#2E7D32] dark:text-[#66BB6A]">Chain</span>
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#2E7D32]/10 text-[#2E7D32] dark:text-[#66BB6A] border border-[#2E7D32]/20">
                Polygon / Convex Live
              </span>
            </div>
            <p className="text-[11px] text-[#4A5568] dark:text-zinc-400 font-medium">Farm-to-Medicine Herbal Provenance</p>
          </div>
        </div>

        {/* Live Reach Metric & Controls */}
        <div className="flex items-center gap-3">
          {/* Live Visitor / Reach Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#2E7D32]/10 border border-[#2E7D32]/25 text-[#2E7D32] dark:text-[#66BB6A] text-xs font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-[#43A047] animate-ping" />
            <Eye className="w-3.5 h-3.5" />
            <span>{reachCount.toLocaleString()} Total Reached</span>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[#1B1B1B] dark:text-zinc-200 hover:scale-105 transition-all shadow-sm"
            title="Toggle Earthy Light / Dark Mode"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#C8A96A]" /> : <Moon className="w-4 h-4 text-[#2E7D32]" />}
          </button>

          <button
            onClick={() => setShowAiGlobalModal(true)}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#C8A96A]/15 hover:bg-[#C8A96A]/25 border border-[#C8A96A]/40 text-[#C8A96A] text-xs font-bold transition-all shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#C8A96A]" />
            AyurAI Inspector
          </button>

          <button
            onClick={toggleWallet}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all ${
              walletConnected
                ? 'bg-[#2E7D32]/10 border-[#2E7D32]/30 text-[#2E7D32] dark:text-[#66BB6A]'
                : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-[#1B1B1B] dark:text-zinc-300'
            }`}
          >
            <Wallet className="w-4 h-4 text-[#2E7D32]" />
            {walletConnected ? (
              <span className="font-mono">{walletAddress}</span>
            ) : (
              'Connect MetaMask'
            )}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 space-y-8">
        {/* Navigation Tabs Bar */}
        <nav className="glass-panel p-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-1 shadow-sm">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'home'
                ? 'bg-[#2E7D32] text-white shadow-md'
                : 'text-[#4A5568] dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/50'
            }`}
          >
            <Leaf className="w-3.5 h-3.5" /> Home
          </button>

          <button
            onClick={() => setActiveTab('farmer')}
            className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'farmer'
                ? 'bg-[#2E7D32] text-white shadow-md'
                : 'text-[#4A5568] dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/50'
            }`}
          >
            <Leaf className="w-3.5 h-3.5" /> 1. Farmer
          </button>

          <button
            onClick={() => setActiveTab('transport')}
            className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'transport'
                ? 'bg-[#43A047] text-white shadow-md'
                : 'text-[#4A5568] dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/50'
            }`}
          >
            <Truck className="w-3.5 h-3.5" /> 2. Transport
          </button>

          <button
            onClick={() => setActiveTab('lab')}
            className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'lab'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-[#4A5568] dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/50'
            }`}
          >
            <TestTube2 className="w-3.5 h-3.5" /> 3. Quality Lab
          </button>

          <button
            onClick={() => setActiveTab('manufacturer')}
            className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'manufacturer'
                ? 'bg-[#C8A96A] text-[#1B1B1B] font-extrabold shadow-md'
                : 'text-[#4A5568] dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/50'
            }`}
          >
            <Factory className="w-3.5 h-3.5" /> 4. Manufacturer
          </button>

          <button
            onClick={() => setActiveTab('consumer')}
            className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'consumer'
                ? 'bg-gradient-to-r from-[#2E7D32] to-[#43A047] text-white shadow-lg'
                : 'text-[#2E7D32] dark:text-[#66BB6A] hover:bg-[#2E7D32]/10'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" /> 5. QR Scan
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'map'
                ? 'bg-[#2E7D32] text-white shadow-md'
                : 'text-[#4A5568] dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/50'
            }`}
          >
            <Compass className="w-3.5 h-3.5" /> Live Map
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'admin'
                ? 'bg-[#2E7D32] text-white shadow-md'
                : 'text-[#4A5568] dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/50'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" /> Admin
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'analytics'
                ? 'bg-[#C8A96A] text-[#1B1B1B] font-extrabold shadow-md'
                : 'text-[#4A5568] dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/50'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-[#C8A96A]" /> Analytics
          </button>

          <button
            onClick={() => setActiveTab('blockchain')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'blockchain'
                ? 'bg-[#2E7D32] text-white shadow-md'
                : 'text-[#4A5568] dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/50'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-[#43A047]" /> Ledger
          </button>
        </nav>

        {/* Dynamic Animated Content Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {activeTab === 'home' && (
              <>
                <HeroSection 
                  onGetStarted={() => setActiveTab('farmer')}
                  onScanClick={() => setActiveTab('consumer')}
                />
                <HowItWorksSection onSelectStep={(stepKey) => setActiveTab(stepKey)} />
                <InteractiveMapSection harvests={harvests} />
                <FlowchartDiagram />
              </>
            )}

            {activeTab === 'farmer' && (
              <FarmerPortal 
                harvests={harvests} 
                onHarvestCreated={handleHarvestCreated} 
              />
            )}

            {activeTab === 'transport' && (
              <TransportPortal 
                harvests={harvests} 
                onTransportUpdated={handleTransportUpdated} 
              />
            )}

            {activeTab === 'lab' && (
              <ProcessingLabPortal 
                harvests={harvests} 
                onLabReportSubmitted={handleLabReportSubmitted} 
              />
            )}

            {activeTab === 'manufacturer' && (
              <ManufacturerPortal 
                harvests={harvests} 
                batches={batches} 
                onBatchCreated={handleBatchCreated} 
              />
            )}

            {activeTab === 'consumer' && (
              <>
                <ConsumerPortal 
                  harvests={harvests} 
                  batches={batches}
                  initialSearchQuery={searchTargetBatch}
                />
                <TraceabilityTimelineSection 
                  selectedBatch={batches[0]} 
                  harvest={harvests[0]} 
                />
              </>
            )}

            {activeTab === 'map' && (
              <InteractiveMapSection harvests={harvests} />
            )}

            {activeTab === 'admin' && (
              <AdminDashboardSection harvests={harvests} batches={batches} logs={logs} />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsDashboard />
            )}

            {activeTab === 'blockchain' && (
              <BlockchainExplorer 
                logs={logs} 
                batches={batches} 
                harvests={harvests} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <AIInspectorModal 
        isOpen={showAiGlobalModal} 
        onClose={() => setShowAiGlobalModal(false)} 
      />
    </div>
  );
}
