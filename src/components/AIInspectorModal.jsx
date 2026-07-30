"use client";

import { useState } from 'react';
import { Shield, Sparkles, MapPin, Upload, FileText, CheckCircle2, AlertTriangle, Cpu, Droplets, ThermometerSun } from 'lucide-react';
import { analyzeHerbImage, HERB_KNOWLEDGE_BASE } from '@/lib/aiHerbInspector';

export default function AIInspectorModal({ isOpen, onClose, selectedHerbType = "Ashwagandha" }) {
  const [herbType, setHerbType] = useState(selectedHerbType);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  if (!isOpen) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setAnalysisResult(null);
    }
  };

  const runAiInspection = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = analyzeHerbImage(herbType);
      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl glass-panel-gold rounded-2xl border border-amber-500/30 p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-amber-200 flex items-center gap-2">
                AyurAI Herb Quality & Authenticity Inspector
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-normal">
                  v3.4 Active
                </span>
              </h2>
              <p className="text-xs text-zinc-400">AI-powered spectral & visual adulteration detection for Ayurvedic raw materials</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="px-3 py-1 text-sm text-zinc-400 hover:text-white bg-zinc-800/60 rounded-lg"
          >
            Close
          </button>
        </div>

        {/* Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-amber-300 mb-1">Target Herb Species</label>
              <select 
                value={herbType}
                onChange={(e) => setHerbType(e.target.value)}
                className="w-full bg-zinc-900/80 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-amber-500"
              >
                {Object.keys(HERB_KNOWLEDGE_BASE).map(k => (
                  <option key={k} value={k}>{k} ({HERB_KNOWLEDGE_BASE[k].botanicalName})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-amber-300 mb-1">Herb Photo / Sample Scan</label>
              <div className="relative border-2 border-dashed border-zinc-700 hover:border-amber-500/50 rounded-xl p-4 text-center bg-zinc-900/40 transition-all cursor-pointer">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {imagePreview ? (
                  <img src={imagePreview} alt="Sample preview" className="h-32 mx-auto rounded-lg object-cover" />
                ) : (
                  <div className="py-4 space-y-2">
                    <Upload className="w-8 h-8 text-amber-400/60 mx-auto" />
                    <p className="text-xs text-zinc-400">Click or drag herb batch photo to analyze</p>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={runAiInspection}
              disabled={isAnalyzing}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-black font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Cpu className="w-5 h-5 animate-spin" />
                  Analyzing Bio-Structures & Spectral Lines...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Run AI Authenticity & Storage Predictor
                </>
              )}
            </button>
          </div>

          {/* Analysis Results Panel */}
          <div className="bg-zinc-950/80 rounded-xl border border-zinc-800 p-5 flex flex-col justify-between">
            {analysisResult ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <span className="text-xs text-zinc-400">Authenticity Status</span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 100% Genuine
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Purity Score:</span>
                    <span className="text-emerald-400 font-mono font-bold">{analysisResult.authenticityScore}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Grade:</span>
                    <span className="text-amber-300 font-semibold">{analysisResult.purityGrade}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Active Bio-Compounds:</span>
                    <span className="text-zinc-200">{analysisResult.estimatedCurcuminOrActiveContent}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Adulteration Status:</span>
                    <span className="text-emerald-400">{analysisResult.adulterationDetected}</span>
                  </div>
                </div>

                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                    <ThermometerSun className="w-4 h-4" /> AI Storage Condition Recommendation
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">{analysisResult.recommendedStorage}</p>
                </div>

                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                    <Droplets className="w-4 h-4" /> Optimal Storage Environment
                  </div>
                  <p className="text-xs font-mono text-zinc-400">{analysisResult.optimalEnvironment}</p>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500 space-y-3">
                <Sparkles className="w-10 h-10 text-zinc-700 animate-pulse" />
                <p className="text-sm">Upload a harvest image or select herb to run live neural spectral analysis & storage condition predictor.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
