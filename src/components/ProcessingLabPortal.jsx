"use client";

import { useState } from 'react';
import { TestTube2, CheckCircle2, ShieldCheck, Sparkles, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { generateAutomatedLabReport } from '@/lib/aiHerbInspector';

export default function ProcessingLabPortal({ harvests, onLabReportSubmitted }) {
  const [selectedHarvestId, setSelectedHarvestId] = useState(harvests[0]?.harvestId || '');
  const [labName, setLabName] = useState('Ayush Certified Central Quality Hub');
  const [activeAlkaloidsPercent, setActiveAlkaloidsPercent] = useState('4.8');
  const [pesticideResidue, setPesticideResidue] = useState('ND (Not Detected)');
  const [heavyMetals, setHeavyMetals] = useState('Pass (Below 0.01 ppm)');
  const [moistureContent, setMoistureContent] = useState('6.2%');
  const [qualityGrade, setQualityGrade] = useState('Grade A+ (Export Quality)');
  const [testedBy, setTestedBy] = useState('Dr. Ananya Rao (Senior Pharmacognosist)');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const selectedHarvest = harvests.find(h => h.harvestId === selectedHarvestId) || harvests[0];

  const handleAutoGenerateAiReport = () => {
    if (!selectedHarvest) return;
    const aiReport = generateAutomatedLabReport(selectedHarvest.herbType, selectedHarvest.farmerName);
    setLabName(aiReport.labName);
    setActiveAlkaloidsPercent(aiReport.activeAlkaloidsPercent.toString());
    setPesticideResidue(aiReport.pesticideResidue);
    setHeavyMetals(aiReport.heavyMetals);
    setMoistureContent(aiReport.moistureContent);
    setQualityGrade(aiReport.qualityGrade);
    setTestedBy(aiReport.testedBy);
  };

  const handleLabSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const labData = {
        labName,
        testDate: new Date().toISOString().split('T')[0],
        activeAlkaloidsPercent: parseFloat(activeAlkaloidsPercent),
        pesticideResidue,
        heavyMetals,
        moistureContent,
        qualityGrade,
        testedBy
      };

      onLabReportSubmitted(selectedHarvestId, labData);
      setIsSubmitting(false);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-purple-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm mb-1">
            <TestTube2 className="w-4 h-4" /> Stage 3: Quality Testing & Processing Unit
          </div>
          <h2 className="text-2xl font-bold text-white">Pharmacognosy Quality Certificate</h2>
          <p className="text-xs text-zinc-400 mt-1">Upload lab test reports (active alkaloid %, heavy metals, pesticides) and attach IPFS verification hashes</p>
        </div>

        <button 
          onClick={handleAutoGenerateAiReport}
          className="px-4 py-2.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md"
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          Auto-Generate AI Quality Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl space-y-6">
          <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2 border-b border-purple-500/20 pb-3">
            <FileSpreadsheet className="w-5 h-5 text-purple-400" />
            Submit Lab Test Report
          </h3>

          <form onSubmit={handleLabSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Target Harvest Batch</label>
              <select 
                value={selectedHarvestId}
                onChange={(e) => setSelectedHarvestId(e.target.value)}
                className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-purple-500 font-mono"
              >
                {harvests.map((h) => (
                  <option key={h.harvestId} value={h.harvestId}>
                    {h.harvestId} - {h.herbType} ({h.farmerName})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Accredited Lab Name</label>
                <input 
                  type="text"
                  required
                  value={labName}
                  onChange={(e) => setLabName(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Certified Inspector / Chemist</label>
                <input 
                  type="text"
                  required
                  value={testedBy}
                  onChange={(e) => setTestedBy(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Active Alkaloid / Curcumin %</label>
                <input 
                  type="text"
                  required
                  value={activeAlkaloidsPercent}
                  onChange={(e) => setActiveAlkaloidsPercent(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Moisture Level %</label>
                <input 
                  type="text"
                  required
                  value={moistureContent}
                  onChange={(e) => setMoistureContent(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Heavy Metals Status</label>
                <input 
                  type="text"
                  required
                  value={heavyMetals}
                  onChange={(e) => setHeavyMetals(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Pesticide Residue Analysis</label>
                <input 
                  type="text"
                  required
                  value={pesticideResidue}
                  onChange={(e) => setPesticideResidue(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Awarded Quality Grade</label>
                <select 
                  value={qualityGrade}
                  onChange={(e) => setQualityGrade(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-purple-500 font-semibold text-emerald-400"
                >
                  <option value="Grade A+ (Export Quality)">Grade A+ (Export Quality)</option>
                  <option value="Grade A (Organic Certified)">Grade A (Organic Certified)</option>
                  <option value="Grade B (Domestic Standard)">Grade B (Domestic Standard)</option>
                  <option value="Rejected / Contaminated">Rejected / Contaminated</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <TestTube2 className="w-5 h-5 animate-spin" />
                  Generating IPFS Certificate & Mining Smart Contract...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  Issue & Mint Certified Lab Report
                </>
              )}
            </button>

            {successMsg && (
              <div className="p-3 bg-purple-500/20 border border-purple-500/40 rounded-xl text-purple-300 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Lab Certificate immutably attached to Harvest on Blockchain!
              </div>
            )}
          </form>
        </div>

        {/* Existing Certificate View */}
        <div className="lg:col-span-5 space-y-6">
          {selectedHarvest && (
            <div className="glass-panel p-6 rounded-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div>
                  <div className="text-xs font-mono text-purple-400 font-bold">{selectedHarvest.harvestId}</div>
                  <h4 className="text-lg font-bold text-white">{selectedHarvest.herbType}</h4>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                  {selectedHarvest.labReport ? "Lab Certified" : "Awaiting Testing"}
                </span>
              </div>

              {selectedHarvest.labReport ? (
                <div className="p-4 bg-purple-950/20 rounded-xl border border-purple-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Active Certificate
                    </span>
                    <span className="text-xs font-bold text-emerald-400 font-mono">
                      {selectedHarvest.labReport.qualityGrade}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Testing Lab:</span>
                      <span className="text-zinc-200">{selectedHarvest.labReport.labName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Active Compound:</span>
                      <span className="font-mono text-emerald-400 font-bold">{selectedHarvest.labReport.activeAlkaloidsPercent}% Bio-active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Pesticide Residue:</span>
                      <span className="text-zinc-200">{selectedHarvest.labReport.pesticideResidue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Heavy Metals:</span>
                      <span className="text-zinc-200">{selectedHarvest.labReport.heavyMetals}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">IPFS Cert CID:</span>
                      <span className="font-mono text-amber-300 truncate max-w-[160px]">{selectedHarvest.labReport.ipfsCertificateCid}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-zinc-900/50 rounded-xl border border-zinc-800 text-center text-zinc-500 text-xs">
                  No lab test report submitted yet for this harvest batch. Fill out the form on the left to issue certificate.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
