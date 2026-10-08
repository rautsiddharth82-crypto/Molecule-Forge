import React, { useState } from 'react';
import { Gauge, Sliders, RotateCcw, CheckCircle2, Sparkles, ArrowRight, Info } from 'lucide-react';
import { DEMO_ROUTES } from '../../data/mockData';

interface ForgeScorePageProps {
  onNavigate: (tab: string) => void;
}

export const ForgeScorePage: React.FC<ForgeScorePageProps> = ({ onNavigate }) => {
  // Baseline Weights: 25% Tech, 20% Econ, 20% Green, 15% Avail, 10% Scale, 10% Conf
  const [weights, setWeights] = useState({
    tech: 25,
    econ: 20,
    green: 20,
    avail: 15,
    scale: 10,
    conf: 10,
  });

  const [activePreset, setActivePreset] = useState<string>('Standard Baseline');

  // Values for Route B:
  const scoresB = {
    tech: 76,
    econ: 79,
    green: 91,
    avail: 75,
    scale: 82,
    conf: 74,
  };

  // Values for Route A:
  const scoresA = {
    tech: 84,
    econ: 88,
    green: 67,
    avail: 62,
    scale: 78,
    conf: 86,
  };

  // Values for Route C:
  const scoresC = {
    tech: 71,
    econ: 73,
    green: 78,
    avail: 92,
    scale: 80,
    conf: 69,
  };

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);

  const calculateScore = (scores: typeof scoresB) => {
    if (totalWeight === 0) return 0;
    const weightedSum =
      scores.tech * weights.tech +
      scores.econ * weights.econ +
      scores.green * weights.green +
      scores.avail * weights.avail +
      scores.scale * weights.scale +
      scores.conf * weights.conf;
    return Math.round(weightedSum / totalWeight);
  };

  const currentScoreB = calculateScore(scoresB);
  const currentScoreA = calculateScore(scoresA);
  const currentScoreC = calculateScore(scoresC);

  const handleSliderChange = (key: keyof typeof weights, value: number) => {
    setWeights(prev => ({ ...prev, [key]: value }));
    setActivePreset('Custom');
  };

  const applyPreset = (presetName: string) => {
    setActivePreset(presetName);
    switch (presetName) {
      case 'R&D Priority':
        setWeights({ tech: 35, econ: 15, green: 15, avail: 10, scale: 10, conf: 15 });
        break;
      case 'Sustainability Priority':
        setWeights({ tech: 15, econ: 15, green: 40, avail: 10, scale: 10, conf: 10 });
        break;
      case 'Cost Priority':
        setWeights({ tech: 15, econ: 40, green: 15, avail: 15, scale: 10, conf: 5 });
        break;
      case 'Import Substitution':
        setWeights({ tech: 15, econ: 15, green: 10, avail: 35, scale: 15, conf: 10 });
        break;
      case 'Scale-Up Priority':
        setWeights({ tech: 20, econ: 15, green: 15, avail: 15, scale: 25, conf: 10 });
        break;
      case 'Standard Baseline':
      default:
        setWeights({ tech: 25, econ: 20, green: 20, avail: 15, scale: 10, conf: 10 });
        break;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
          <Gauge className="w-3.5 h-3.5" />
          <span>SYNTHESIZED MULTI-CRITERIA DECISION SCORING</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Forge Score Engine
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Dynamic multi-attribute composite ranking engine. Adjust weights to test sensitivity across investment priorities.
            </p>
          </div>

          <button
            onClick={() => applyPreset('Standard Baseline')}
            className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 border border-slate-700 self-start"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Baseline Weights</span>
          </button>
        </div>
      </div>

      {/* Main Score Hero Card */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
        {/* Left: Big Circular Score Display (4 cols) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-4">
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Outer Track Ring */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#1E293B"
                strokeWidth="6"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#10B981"
                strokeWidth="6.5"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * currentScoreB) / 100}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
            </svg>

            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-5xl font-black font-mono text-white tabular-nums tracking-tight">
                {currentScoreB}
              </span>
              <span className="text-xs font-mono text-slate-400 mt-0.5">/ 100</span>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase mt-1">
                FORGE SCORE
              </span>
            </div>
          </div>

          <div className="mt-4 text-center space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-semibold">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Balanced Route — Recommended</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Active Strategy: <strong className="text-white font-mono">{activePreset}</strong>
            </p>
          </div>
        </div>

        {/* Right: Component Breakdown & Formula (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
              DECISION ALGORITHM SYNTHESIS FORMULA
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto whitespace-nowrap">
              Forge Score = ({weights.tech}% × Tech) + ({weights.econ}% × Econ) + ({weights.green}% × Green) + ({weights.avail}% × Avail) + ({weights.scale}% × Scale-up) + ({weights.conf}% × Conf)
            </div>
          </div>

          {/* Individual Dimension Gauges for Route B */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="text-slate-400 text-[10px]">TECHNICAL FEASIBILITY</div>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-white text-lg font-bold">{scoresB.tech}</span>
                <span className="text-cyan-400 text-[10px]">Weight: {weights.tech}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${scoresB.tech}%` }}></div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="text-slate-400 text-[10px]">ECONOMIC POTENTIAL</div>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-white text-lg font-bold">{scoresB.econ}</span>
                <span className="text-cyan-400 text-[10px]">Weight: {weights.econ}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-sky-500 h-full rounded-full" style={{ width: `${scoresB.econ}%` }}></div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="text-slate-400 text-[10px]">GREEN CHEMISTRY</div>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-emerald-400 text-lg font-bold">{scoresB.green}</span>
                <span className="text-cyan-400 text-[10px]">Weight: {weights.green}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${scoresB.green}%` }}></div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="text-slate-400 text-[10px]">RAW-MAT AVAILABILITY</div>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-white text-lg font-bold">{scoresB.avail}</span>
                <span className="text-cyan-400 text-[10px]">Weight: {weights.avail}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-indigo-400 h-full rounded-full" style={{ width: `${scoresB.avail}%` }}></div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="text-slate-400 text-[10px]">SCALE-UP SUITABILITY</div>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-white text-lg font-bold">{scoresB.scale}</span>
                <span className="text-cyan-400 text-[10px]">Weight: {weights.scale}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-teal-400 h-full rounded-full" style={{ width: `${scoresB.scale}%` }}></div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="text-slate-400 text-[10px]">DATA CONFIDENCE</div>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-white text-lg font-bold">{scoresB.conf}</span>
                <span className="text-cyan-400 text-[10px]">Weight: {weights.conf}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: `${scoresB.conf}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scenario Presets Bar */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Scenario Presets</span>
            </h3>
            <p className="text-xs text-slate-400">
              Select corporate priority templates to reweight the decision engine
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {[
            'Standard Baseline',
            'R&D Priority',
            'Sustainability Priority',
            'Cost Priority',
            'Import Substitution',
            'Scale-Up Priority',
          ].map(preset => (
            <button
              key={preset}
              onClick={() => applyPreset(preset)}
              className={`p-2.5 rounded-lg text-xs font-mono text-left border transition-all ${
                activePreset === preset
                  ? 'bg-cyan-950/80 border-cyan-500 text-white ring-1 ring-cyan-500/20'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="font-semibold">{preset}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Interactive Sliders for Custom Weights */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>Fine-Tune Attribute Weights</span>
            </h3>
            <span className="text-xs text-slate-400">
              Drag sliders to observe real-time impact on pathway selection
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Total Weight: <strong className="text-cyan-400">{totalWeight}%</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs font-mono">
          <div>
            <div className="flex justify-between mb-1.5 text-slate-300">
              <span>Technical Feasibility</span>
              <span className="font-bold text-cyan-400">{weights.tech}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={weights.tech}
              onChange={(e) => handleSliderChange('tech', Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1.5 text-slate-300">
              <span>Economic Potential</span>
              <span className="font-bold text-cyan-400">{weights.econ}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={weights.econ}
              onChange={(e) => handleSliderChange('econ', Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1.5 text-slate-300">
              <span>Green Chemistry &amp; E-Factor</span>
              <span className="font-bold text-emerald-400">{weights.green}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={weights.green}
              onChange={(e) => handleSliderChange('green', Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1.5 text-slate-300">
              <span>Raw-Material Domestic Availability</span>
              <span className="font-bold text-cyan-400">{weights.avail}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={weights.avail}
              onChange={(e) => handleSliderChange('avail', Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1.5 text-slate-300">
              <span>Scale-Up &amp; Safety Suitability</span>
              <span className="font-bold text-cyan-400">{weights.scale}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={weights.scale}
              onChange={(e) => handleSliderChange('scale', Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1.5 text-slate-300">
              <span>Data Provenance Confidence</span>
              <span className="font-bold text-cyan-400">{weights.conf}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={weights.conf}
              onChange={(e) => handleSliderChange('conf', Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Live Re-ranking Card */}
        <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs font-mono">
            <span className="text-slate-400 block">DYNAMIC RE-RANKING RESULT:</span>
            <span className="text-white font-bold text-sm">
              {currentScoreB >= currentScoreA && currentScoreB >= currentScoreC
                ? 'Route B preserves #1 recommendation rank.'
                : currentScoreA > currentScoreB
                ? 'Route A gains #1 rank under aggressive cost/speed weight.'
                : 'Route C gains #1 rank under maximum domestic availability constraint.'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="text-center">
              <span className="text-slate-400 text-[10px] block">Route B</span>
              <span className="text-emerald-400 font-bold text-base">{currentScoreB}</span>
            </div>
            <div className="text-center">
              <span className="text-slate-400 text-[10px] block">Route A</span>
              <span className="text-sky-400 font-bold text-base">{currentScoreA}</span>
            </div>
            <div className="text-center">
              <span className="text-slate-400 text-[10px] block">Route C</span>
              <span className="text-amber-400 font-bold text-base">{currentScoreC}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
