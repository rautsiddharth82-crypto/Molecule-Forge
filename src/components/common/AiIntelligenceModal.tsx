import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, ChevronRight, Activity, Cpu, ShieldAlert, ArrowRight } from 'lucide-react';

interface AiIntelligenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToRoute: () => void;
}

export const AiIntelligenceModal: React.FC<AiIntelligenceModalProps> = ({
  isOpen,
  onClose,
  onNavigateToRoute
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const reasoningSteps = [
    {
      title: 'Analyzing feedstock compatibility...',
      detail: 'Assessing refinery aromatics stream: Benzene (purity 99.8%, abundant domestic CCR feed). Mapping potential reaction handles.',
      subMetrics: 'Thermodynamic activation delta G: -42.1 kJ/mol · Regioselectivity factor: 94.2%',
      completed: false
    },
    {
      title: 'Evaluating route complexity...',
      detail: 'Retrosynthetic decomposition into 3 candidate graphs. Screening transformation step count against maximum constraint (<= 4 steps).',
      subMetrics: 'Route A: 3 steps · Route B: 4 steps · Route C: 4 steps',
      completed: false
    },
    {
      title: 'Comparing sustainability indicators...',
      detail: 'Estimating Process Mass Intensity (PMI), E-Factor, and hazardous waste burden. Route A generates cyanide effluent (E-factor 16.4); Route B reduces E-factor to 8.4.',
      subMetrics: 'Hazard index: Route B (-54% effluent toxicity vs baseline)',
      completed: false
    },
    {
      title: 'Checking raw-material availability...',
      detail: 'Evaluating domestic supplier reliability index. Verifying commercial reagents (H2O2, DMC, HMTA, hydroxylamine sulfate) vs import dependencies.',
      subMetrics: 'Domestic sourcing: 75% for Route B · 92% for Route C · 62% for Route A',
      completed: false
    },
    {
      title: 'Calculating Forge Score...',
      detail: 'Synthesizing weighted multi-attribute decision matrix: 25% Technical + 20% Economic + 20% Green + 15% Availability + 10% Scale-Up + 10% Confidence.',
      subMetrics: 'Scores: Route B (81.0) > Route C (78.0) > Route A (77.0)',
      completed: false
    },
    {
      title: 'Generating recommendation...',
      detail: 'Synthesizing final experimental validation brief with uncertainty boundaries and laboratory risk gates.',
      subMetrics: 'Primary uncertainty: Step 3 catalytic oxidation selectivity',
      completed: false
    }
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStepIndex(0);
      setIsRunning(true);
      return;
    }

    if (currentStepIndex < reasoningSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setIsRunning(false);
    }
  }, [isOpen, currentStepIndex]);

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setIsRunning(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-cyan-950 border border-cyan-800/80 text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
                Molecule Forge Intelligence
                <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
                  Decision Engine
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                AI Retrosynthesis & Multi-Criteria Process Screening Reasoning
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800 font-mono">
            <span className="text-cyan-400 font-semibold">TARGET:</span> Demo Aromatic Intermediate A (4-H-3-MBN) · <span className="text-cyan-400 font-semibold">FEEDSTOCK:</span> Benzene (Refinery Stream)
          </div>

          {/* Sequential Reasoning Chain */}
          <div className="space-y-2.5">
            {reasoningSteps.map((step, idx) => {
              const isPast = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              const isPending = idx > currentStepIndex;

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border transition-all text-xs ${
                    isPast
                      ? 'bg-slate-950/40 border-slate-800 text-slate-300'
                      : isCurrent
                      ? 'bg-cyan-950/30 border-cyan-500/50 text-white shadow-sm ring-1 ring-cyan-500/20'
                      : 'bg-slate-950/20 border-slate-800/40 text-slate-500 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 font-medium">
                      {isPast ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : isCurrent ? (
                        <Activity className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0 flex items-center justify-center text-[9px] text-slate-500">
                          {idx + 1}
                        </div>
                      )}
                      <span className={isCurrent ? 'text-cyan-300 font-semibold' : ''}>
                        {step.title}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-slate-400">
                      {isPast ? 'COMPLETED' : isCurrent ? 'EVALUATING...' : 'QUEUED'}
                    </span>
                  </div>

                  {(isPast || isCurrent) && (
                    <div className="pl-6 space-y-1">
                      <p className="text-slate-300 leading-relaxed">{step.detail}</p>
                      <p className="text-[11px] font-mono text-cyan-400/90">{step.subMetrics}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Final Resolution Output */}
          {!isRunning && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/50 to-slate-900 border border-emerald-500/40 text-xs space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Decision Recommendation
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                Route B selected for initial validation.
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Route B achieves the highest overall Forge Score (81/100). Although it entails 4 steps vs 3 steps in Route A, it cuts E-factor waste by 49%, avoids severe cyanide regulatory liabilities, and preserves acceptable raw material economics (₹428/kg vs ₹395/kg).
              </p>
              <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-amber-300/90">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Requires Laboratory Validation: Step 3 catalytic oxidation selectivity.</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
          <button
            onClick={handleRestart}
            className="px-3 py-1.5 text-slate-400 hover:text-white transition-colors font-mono text-[11px]"
          >
            Re-run Analysis Engine
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onNavigateToRoute();
              }}
              className="px-3.5 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-medium flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>Explore Route B</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
