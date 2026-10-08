import React from 'react';
import { Sparkles, FlaskConical, Bell, Layers, ExternalLink } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAiEngine: () => void;
  onOpenValidationModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenAiEngine,
}) => {
  return (
    <header className="h-14 bg-slate-950/90 border-b border-slate-800/80 px-4 lg:px-6 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
      {/* Zone 1: Single Brand Wordmark in display typography */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab('overview')}
          className="text-left group flex items-center gap-2"
        >
          <div className="w-7 h-7 rounded bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-white shadow-sm shadow-cyan-500/20">
            <FlaskConical className="w-4 h-4" />
          </div>
          <span className="text-base font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
            Molecule Forge
          </span>
        </button>

        <span className="hidden sm:inline-block text-slate-700 font-mono text-xs">/</span>

        {/* Active Project Indicator */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="text-slate-500">Project:</span>
          <span className="text-slate-200 font-medium">Benzene → High-Value Aromatic Intermediate</span>
          <span className="px-1.5 py-0.5 text-[10px] bg-slate-900 border border-slate-800 text-cyan-400 rounded">
            Forge: 81
          </span>
        </div>
      </div>

      {/* Zone 2: Fast Quick Links (Clean unboxed text navigation) */}
      <nav className="hidden lg:flex items-center gap-5 text-xs font-medium text-slate-400">
        <button
          onClick={() => setActiveTab('discovery')}
          className={`hover:text-white transition-colors ${activeTab === 'discovery' ? 'text-cyan-400 font-semibold' : ''}`}
        >
          Discovery
        </button>
        <button
          onClick={() => setActiveTab('routes')}
          className={`hover:text-white transition-colors ${activeTab === 'routes' ? 'text-cyan-400 font-semibold' : ''}`}
        >
          Route Explorer
        </button>
        <button
          onClick={() => setActiveTab('comparison')}
          className={`hover:text-white transition-colors ${activeTab === 'comparison' ? 'text-cyan-400 font-semibold' : ''}`}
        >
          Comparison
        </button>
        <button
          onClick={() => setActiveTab('forge-score')}
          className={`hover:text-white transition-colors ${activeTab === 'forge-score' ? 'text-cyan-400 font-semibold' : ''}`}
        >
          Forge Score
        </button>
        <button
          onClick={() => setActiveTab('validation')}
          className={`hover:text-white transition-colors ${activeTab === 'validation' ? 'text-cyan-400 font-semibold' : ''}`}
        >
          Validation Lab
        </button>
      </nav>

      {/* Zone 3: Primary Actions */}
      <div className="flex items-center gap-2.5">
        {/* Universal DEMO DATA badge */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded text-[11px] font-mono text-amber-300">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          <span>DEMO DATA</span>
        </div>

        {/* Embedded AI Intelligence Engine Trigger */}
        <button
          onClick={onOpenAiEngine}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded text-xs font-medium transition-all shadow-sm shadow-cyan-600/30 whitespace-nowrap"
          title="Open Molecule Forge AI Decision Reasoning"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
          <span>Forge Intelligence</span>
        </button>
      </div>
    </header>
  );
};
