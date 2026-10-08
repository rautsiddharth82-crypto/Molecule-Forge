import React, { useState } from 'react';
import { DEMO_ROUTES } from '../../data/mockData';
import { SynthesisRoute, ReactionStep } from '../../types/chemistry';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { ChemicalStructureSvg } from '../common/ChemicalStructureSvg';
import {
  GitBranch,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info,
  Thermometer,
  Gauge,
  FlaskConical,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface RouteExplorerPageProps {
  onNavigate: (tab: string) => void;
}

export const RouteExplorerPage: React.FC<RouteExplorerPageProps> = ({ onNavigate }) => {
  const [selectedRouteId, setSelectedRouteId] = useState<'route-a' | 'route-b' | 'route-c'>('route-b');
  const activeRoute = DEMO_ROUTES.find(r => r.id === selectedRouteId) || DEMO_ROUTES[1];

  const [selectedStepNumber, setSelectedStepNumber] = useState<number>(1);
  const activeStep: ReactionStep = activeRoute.steps.find(s => s.stepNumber === selectedStepNumber) || activeRoute.steps[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Title & Metadata Top Banner */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
          <GitBranch className="w-3.5 h-3.5" />
          <span>SYNTHESIS RETROSYNTHETIC REPERTOIRE</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              AI-Assisted Route Explorer
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Interactive reaction pathway analysis with step-level conditions, catalytic parameters, and provenance auditing.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('comparison')}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs flex items-center gap-1.5 transition-colors"
            >
              <span>Compare All 3 Routes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('forge-score')}
              className="px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>Inspect Forge Score</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Target & Boundary Constraints Card */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
        <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
          <div className="text-slate-400 text-[10px]">TARGET MOLECULE</div>
          <div className="text-cyan-300 font-bold text-sm mt-0.5">Demo Aromatic Intermediate A</div>
          <div className="text-slate-400 text-[10px] mt-0.5">C₈H₇NO₂ · CAS 4-H-3-MBN</div>
        </div>

        <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
          <div className="text-slate-400 text-[10px]">STARTING FEEDSTOCK</div>
          <div className="text-white font-bold text-sm mt-0.5">Benzene (C₆H₆)</div>
          <div className="text-emerald-400 text-[10px] mt-0.5">Refinery Reformate Cut (99.8%)</div>
        </div>

        <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 lg:col-span-2">
          <div className="text-slate-400 text-[10px]">ACTIVE SCREENING CONSTRAINTS</div>
          <div className="text-slate-300 text-[11px] mt-1 space-x-2">
            <span>• Max 4 major steps</span>
            <span>• Lower solvent burden</span>
            <span>• Prefer accessible inputs</span>
            <span>• Avoid extreme pressure</span>
          </div>
        </div>
      </section>

      {/* Route Selector Tabs (3 candidate routes) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {DEMO_ROUTES.map((route) => {
          const isSelected = route.id === selectedRouteId;
          return (
            <button
              key={route.id}
              onClick={() => {
                setSelectedRouteId(route.id);
                setSelectedStepNumber(1);
              }}
              className={`p-4 rounded-xl border text-left transition-all relative ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500 shadow-md ring-1 ring-cyan-500/20'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              {route.isRecommended && (
                <div className="inline-block px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-[9px] font-bold tracking-wider mb-2">
                  RECOMMENDED FOR INITIAL VALIDATION
                </div>
              )}

              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">{route.name}</h3>
                <span className="font-mono text-xs font-bold text-cyan-400">
                  {route.forgeScore}/100
                </span>
              </div>

              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                {route.tagline}
              </p>

              <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 mt-3 pt-2 border-t border-slate-800/80">
                <span>{route.stepsCount} steps</span>
                <span>·</span>
                <span>Yield: {route.estimatedYieldOverall}%</span>
                <span>·</span>
                <span>E-Factor: {route.eFactor}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Pathway Canvas & Step Inspector Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols): Interactive Reaction Flow Nodes */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                {activeRoute.name} Flowchart
              </h2>
              <span className="text-xs text-slate-400">
                Click any transformation step node to inspect conditions
              </span>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              {activeRoute.stepsCount} Major Steps
            </span>
          </div>

          {/* Reaction Steps Pathway Flow */}
          <div className="space-y-4 pt-2">
            {activeRoute.steps.map((step, idx) => {
              const isSelected = step.stepNumber === selectedStepNumber;
              const isLast = idx === activeRoute.steps.length - 1;

              return (
                <React.Fragment key={step.stepNumber}>
                  {/* Step Card Node */}
                  <div
                    onClick={() => setSelectedStepNumber(step.stepNumber)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-slate-950 border-cyan-500 shadow-md ring-1 ring-cyan-500/20'
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center">
                          {step.stepNumber}
                        </span>
                        <h4 className="text-xs md:text-sm font-bold text-white">
                          {step.title}
                        </h4>
                      </div>
                      <ProvenanceBadge provenance={step.provenance} />
                    </div>

                    {/* Chemical Reactants -> Products */}
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-300 my-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400">{step.reactant}</span>
                      <span className="text-cyan-400 font-bold">→</span>
                      <span className="text-cyan-300 font-semibold">{step.product}</span>
                    </div>

                    {/* Quick Metric Bar */}
                    <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400 pt-1">
                      <span>Temp: <strong className="text-white">{step.temperature}</strong></span>
                      <span>Pressure: <strong className="text-white">{step.pressure}</strong></span>
                      <span>Est. Yield: <strong className="text-emerald-400">{step.estimatedYield}%</strong></span>
                      <span>Confidence: <strong className="text-cyan-400">{step.confidence}%</strong></span>
                    </div>

                    {step.riskFlags.length > 0 && (
                      <div className="mt-2 text-[10px] font-mono text-amber-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                        <span>{step.riskFlags[0]}</span>
                      </div>
                    )}
                  </div>

                  {/* Flow Connector Line */}
                  {!isLast && (
                    <div className="flex justify-center py-1">
                      <div className="flex flex-col items-center">
                        <div className="h-6 w-0.5 bg-gradient-to-b from-cyan-500 to-sky-400"></div>
                        <div className="w-2 h-2 border-b-2 border-r-2 border-sky-400 rotate-45 -mt-1.5"></div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Right Column (5 cols): Step Condition Inspector Drawer */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-5 sticky top-20">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                STEP {activeStep.stepNumber} PARAMETER AUDIT
              </span>
              <h3 className="text-base font-bold text-white">{activeStep.title}</h3>
            </div>
            <ProvenanceBadge provenance={activeStep.provenance} />
          </div>

          {/* Core Reaction Conditions Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg">
              <span className="text-[10px] text-slate-400 block mb-0.5">REACTION CLASS</span>
              <span className="text-white font-medium">{activeStep.reactionClass}</span>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg">
              <span className="text-[10px] text-slate-400 block mb-0.5">REAGENT CATEGORY</span>
              <span className="text-cyan-300 font-medium">{activeStep.reagentCategory}</span>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg">
              <span className="text-[10px] text-slate-400 block mb-0.5">CATALYST</span>
              <span className="text-white font-medium">{activeStep.catalyst}</span>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg">
              <span className="text-[10px] text-slate-400 block mb-0.5">SOLVENT SYSTEM</span>
              <span className="text-white font-medium">{activeStep.solvent}</span>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg">
              <span className="text-[10px] text-slate-400 block mb-0.5">TEMPERATURE</span>
              <span className="text-amber-300 font-bold">{activeStep.temperature}</span>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg">
              <span className="text-[10px] text-slate-400 block mb-0.5">OPERATING PRESSURE</span>
              <span className="text-white font-bold">{activeStep.pressure}</span>
            </div>
          </div>

          {/* Reagents & Formula Strings */}
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                STOICHIOMETRIC REAGENTS
              </span>
              <div className="p-2.5 bg-slate-950 border border-slate-800 rounded font-mono text-slate-200">
                {activeStep.reagents}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-1">
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">EST. YIELD</span>
                <span className="text-emerald-400 font-bold">{activeStep.estimatedYield}%</span>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">CONFIDENCE</span>
                <span className="text-cyan-400 font-bold">{activeStep.confidence}%</span>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">ATOM ECON</span>
                <span className="text-white font-bold">{activeStep.atomEconomy}%</span>
              </div>
            </div>
          </div>

          {/* Risk Flags */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block font-semibold flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>SAFETY &amp; PROCESS RISK FLAGS</span>
            </span>
            <div className="space-y-1.5">
              {activeStep.riskFlags.map((risk, i) => (
                <div key={i} className="p-2.5 rounded bg-amber-950/30 border border-amber-900/50 text-xs text-amber-200 font-mono">
                  ⚠ {risk}
                </div>
              ))}
            </div>
          </div>

          {/* Validation Requirement */}
          <div className="p-3.5 rounded-lg bg-cyan-950/40 border border-cyan-800/60 space-y-1 text-xs">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-semibold">
              LABORATORY VALIDATION REQUIREMENT
            </span>
            <p className="text-slate-300 font-mono">
              {activeStep.validationRequirement}
            </p>
          </div>

          {/* Action to Jump to Lab Plan */}
          <button
            onClick={() => onNavigate('validation')}
            className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center justify-center gap-2 transition-colors border border-slate-700 font-mono"
          >
            <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open in Validation Lab Checklist</span>
          </button>
        </div>
      </div>
    </div>
  );
};
