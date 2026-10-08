import React from 'react';
import { ArrowRight, Sparkles, Layers, ShieldCheck, GitBranch, FlaskConical, Gauge, ChevronRight, FileCheck2, Cpu } from 'lucide-react';
import { ChemicalStructureSvg } from '../common/ChemicalStructureSvg';

interface OverviewPageProps {
  onNavigate: (tab: string) => void;
  onOpenAiEngine: () => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  onNavigate,
  onOpenAiEngine,
}) => {
  const workflowSteps = [
    { num: '01', title: 'Refinery Feedstock', desc: 'CCR reformate, pygas heart-cuts, & BTX aromatics', icon: Layers, tab: 'feedstocks' },
    { num: '02', title: 'Opportunity Discovery', desc: 'Screening commercial demand & import substitution', icon: Sparkles, tab: 'discovery' },
    { num: '03', title: 'Molecule Candidates', desc: 'Targeting high-margin pharma & specialty cores', icon: Cpu, tab: 'molecules' },
    { num: '04', title: 'AI Route Generation', desc: 'Constrained multi-path retrosynthetic synthesis', icon: GitBranch, tab: 'routes' },
    { num: '05', title: 'Process & Sustainability', desc: 'E-Factor, PMI, solvent burden, & TEA cost models', icon: Gauge, tab: 'sustainability' },
    { num: '06', title: 'Forge Score', desc: 'Synthesized 6-attribute decision ranking index', icon: ShieldCheck, tab: 'forge-score' },
    { num: '07', title: 'Laboratory Validation', desc: 'Gated 20-stage bench screening campaigns', icon: FlaskConical, tab: 'validation' },
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 border border-slate-800/80 p-6 md:p-10 shadow-2xl">
        {/* Subtle background industrial grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>REFINERY-TO-CHEMICALS DECISION PLATFORM</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
            From Refinery Feedstock to High-Value Molecule
          </h1>

          <p className="text-base md:text-lg text-slate-300 max-w-3xl leading-relaxed text-balance">
            Molecule Forge combines AI-assisted retrosynthesis, process screening, sustainability metrics, supply-chain intelligence and preliminary economics to identify chemical opportunities worth validating.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('discovery')}
              className="px-5 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm flex items-center gap-2 transition-all shadow-lg shadow-cyan-900/30"
            >
              <span>Explore Opportunities</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('routes')}
              className="px-5 py-3 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-sm flex items-center gap-2 transition-all"
            >
              <span>Start Route Analysis</span>
              <GitBranch className="w-4 h-4 text-cyan-400" />
            </button>

            <button
              onClick={onOpenAiEngine}
              className="px-4 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-mono text-xs flex items-center gap-2 transition-colors ml-auto sm:ml-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Simulate AI Reasoning</span>
            </button>
          </div>
        </div>

        {/* Hero Interactive Pathway Visual */}
        <div className="mt-10 pt-8 border-t border-slate-800/70">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>Synthesis Pathway Architecture Preview: Benzene Transformation Chain</span>
            <span className="text-cyan-400">Route B (Recommended · 4 Steps · Forge Score 81)</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 md:p-6 overflow-x-auto">
            <div className="flex items-center justify-between min-w-[700px] gap-2">
              {/* Node 1: Feedstock */}
              <div
                onClick={() => onNavigate('feedstocks')}
                className="flex-1 bg-slate-900/90 border border-slate-700 hover:border-cyan-500/60 p-3.5 rounded-lg text-center cursor-pointer transition-all group"
              >
                <div className="flex justify-center mb-1">
                  <ChemicalStructureSvg moleculeKey="benzene" width={80} height={70} />
                </div>
                <div className="text-xs font-mono font-bold text-white group-hover:text-cyan-300">
                  Benzene
                </div>
                <div className="text-[10px] text-slate-400 font-mono">Refinery Feedstock</div>
                <div className="mt-1.5 text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 inline-block">
                  C₆H₆ · 99.8%
                </div>
              </div>

              {/* Glowing Arrow 1 */}
              <div className="flex flex-col items-center px-2">
                <div className="text-[9px] font-mono text-slate-400 mb-1">TS-1 / H₂O₂</div>
                <div className="h-0.5 w-10 md:w-16 bg-gradient-to-r from-cyan-500 to-sky-400 relative">
                  <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-sky-400 rotate-45"></div>
                </div>
                <div className="text-[9px] font-mono text-emerald-400 mt-1">85% Yield</div>
              </div>

              {/* Node 2: Intermediate 1 */}
              <div
                onClick={() => onNavigate('routes')}
                className="flex-1 bg-slate-900/90 border border-slate-700 hover:border-cyan-500/60 p-3.5 rounded-lg text-center cursor-pointer transition-all group"
              >
                <div className="flex justify-center mb-1">
                  <ChemicalStructureSvg moleculeKey="phenol" width={80} height={70} />
                </div>
                <div className="text-xs font-mono font-bold text-white group-hover:text-cyan-300">
                  Phenol / Anisole
                </div>
                <div className="text-[10px] text-slate-400 font-mono">Intermediate 1</div>
                <div className="mt-1.5 text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 inline-block">
                  Regioselective Handle
                </div>
              </div>

              {/* Glowing Arrow 2 */}
              <div className="flex flex-col items-center px-2">
                <div className="text-[9px] font-mono text-slate-400 mb-1">HMTA / MSA</div>
                <div className="h-0.5 w-10 md:w-16 bg-gradient-to-r from-sky-400 to-emerald-400 relative">
                  <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-emerald-400 rotate-45"></div>
                </div>
                <div className="text-[9px] font-mono text-emerald-400 mt-1">81% Yield</div>
              </div>

              {/* Node 3: Intermediate 2 */}
              <div
                onClick={() => onNavigate('routes')}
                className="flex-1 bg-slate-900/90 border border-slate-700 hover:border-cyan-500/60 p-3.5 rounded-lg text-center cursor-pointer transition-all group"
              >
                <div className="flex justify-center mb-1">
                  <ChemicalStructureSvg moleculeKey="toluene" width={80} height={70} />
                </div>
                <div className="text-xs font-mono font-bold text-white group-hover:text-cyan-300">
                  Aromatic Oxime
                </div>
                <div className="text-[10px] text-slate-400 font-mono">Intermediate 2</div>
                <div className="mt-1.5 text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 inline-block">
                  Green N-Coupling
                </div>
              </div>

              {/* Glowing Arrow 3 */}
              <div className="flex flex-col items-center px-2">
                <div className="text-[9px] font-mono text-slate-400 mb-1">Cu(OAc)₂ Cat.</div>
                <div className="h-0.5 w-10 md:w-16 bg-gradient-to-r from-emerald-400 to-cyan-400 relative">
                  <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-cyan-400 rotate-45"></div>
                </div>
                <div className="text-[9px] font-mono text-emerald-400 mt-1">86% Yield</div>
              </div>

              {/* Node 4: Target Molecule */}
              <div
                onClick={() => onNavigate('molecules')}
                className="flex-1 bg-gradient-to-b from-cyan-950/40 to-slate-900 border border-cyan-500/60 hover:border-cyan-400 p-3.5 rounded-lg text-center cursor-pointer transition-all group shadow-md shadow-cyan-950/50"
              >
                <div className="flex justify-center mb-1">
                  <ChemicalStructureSvg moleculeKey="target" width={90} height={70} />
                </div>
                <div className="text-xs font-mono font-bold text-cyan-300 group-hover:text-white">
                  Demo Intermediate A
                </div>
                <div className="text-[10px] text-emerald-400 font-mono font-semibold">Target Molecule</div>
                <div className="mt-1.5 text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-900/50 text-cyan-200 border border-cyan-700/50 inline-block">
                  ₹820/kg · Score 81
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Operational Statistics */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
          <div className="text-[11px] font-mono text-slate-400">ACTIVE FEEDSTOCKS</div>
          <div className="text-3xl font-bold font-mono text-white mt-1">07</div>
          <div className="text-[10px] text-slate-400 mt-1">Refinery streams profiled</div>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
          <div className="text-[11px] font-mono text-slate-400">PRODUCT OPPORTUNITIES</div>
          <div className="text-3xl font-bold font-mono text-white mt-1">24</div>
          <div className="text-[10px] text-cyan-400 mt-1">Specialty & Pharma cores</div>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
          <div className="text-[11px] font-mono text-slate-400">CANDIDATE ROUTES</div>
          <div className="text-3xl font-bold font-mono text-white mt-1">68</div>
          <div className="text-[10px] text-slate-400 mt-1">Retrosynthetic pathways</div>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
          <div className="text-[11px] font-mono text-slate-400">ROUTES UNDER REVIEW</div>
          <div className="text-3xl font-bold font-mono text-amber-400 mt-1">14</div>
          <div className="text-[10px] text-slate-400 mt-1">Active R&D screening</div>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl col-span-2 sm:col-span-1">
          <div className="text-[11px] font-mono text-slate-400">AVG FORGE SCORE</div>
          <div className="text-3xl font-bold font-mono text-emerald-400 mt-1">82.4</div>
          <div className="text-[10px] text-slate-400 mt-1">Benchmark quality index</div>
        </div>
      </section>

      {/* Mandatory Disclaimer */}
      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5">
        <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold shrink-0 mt-0.5">
          DISCLAIMER
        </span>
        <p className="leading-relaxed">
          Decision-support prototype. All AI predictions, costs and sustainability values shown in this demonstration are simulated and require expert/laboratory validation. AI-generated routes are hypotheses, not validated manufacturing processes.
        </p>
      </div>

      {/* Industrial Storytelling Workflow Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              End-to-End Decision Architecture
            </h2>
            <p className="text-xs text-slate-400">
              How Molecule Forge filters hundreds of raw chemical ideas down to verified high-margin pilot targets
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {workflowSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                onClick={() => onNavigate(step.tab)}
                className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">{step.num}</span>
                    <Icon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center text-[11px] font-mono text-cyan-400 group-hover:text-cyan-300">
                  <span>Explore Module</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
