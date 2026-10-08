import React, { useState } from 'react';
import { TOP_OPPORTUNITIES, FEEDSTOCKS } from '../../data/mockData';
import { OpportunityItem, FeedstockId, ProductCategory } from '../../types/chemistry';
import { ChemicalStructureSvg } from '../common/ChemicalStructureSvg';
import { Search, Sparkles, Filter, Sliders, CheckCircle2, ArrowRight, Activity, Info } from 'lucide-react';

interface DiscoveryPageProps {
  onSelectOpportunity: (opp: OpportunityItem) => void;
  onNavigate: (tab: string) => void;
}

export const DiscoveryPage: React.FC<DiscoveryPageProps> = ({
  onSelectOpportunity,
  onNavigate,
}) => {
  const [activeMode, setActiveMode] = useState<'feedstock' | 'target'>('feedstock');

  // Feedstock-first state
  const [selectedFeedstock, setSelectedFeedstock] = useState<string>('benzene');

  // Target-first state
  const [targetName, setTargetName] = useState('4-Hydroxy-3-methoxybenzonitrile');
  const [targetSmiles, setTargetSmiles] = useState('COC1=C(O)C=CC(=C1)C#N');
  const [targetCategory, setTargetCategory] = useState<ProductCategory>('Pharmaceutical Intermediate');

  // Constraint filters
  const [maxSteps, setMaxSteps] = useState(4);
  const [sustainabilityPriority, setSustainabilityPriority] = useState('High Green (Low E-Factor)');
  const [costPriority, setCostPriority] = useState('Feedstock Integration Margin');
  const [rawMaterialPref, setRawMaterialPref] = useState('Domestic Bulk Sourcing');
  const [scaleUpPref, setScaleUpPref] = useState('Atmospheric / Mild Pressures');
  const [hazardFilter, setHazardFilter] = useState('Strict (Avoid Cyanide / Phosgene)');

  // Simulation loading state
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [discoveryStepIndex, setDiscoveryStepIndex] = useState(0);
  const [hasDiscovered, setHasDiscovered] = useState(true);

  const discoverySequence = [
    'Mapping feedstock chemistry...',
    'Searching reaction knowledge...',
    'Screening commercial relevance...',
    'Evaluating process constraints...',
    'Ranking opportunities...'
  ];

  const handleStartDiscovery = () => {
    setIsDiscovering(true);
    setDiscoveryStepIndex(0);

    const interval = setInterval(() => {
      setDiscoveryStepIndex(prev => {
        if (prev >= discoverySequence.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDiscovering(false);
            setHasDiscovered(true);
          }, 400);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
  };

  const candidateOpportunities = TOP_OPPORTUNITIES.slice(0, 5);

  return (
    <div className="space-y-8 pb-12">
      {/* Page Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI RETROSYNTHETIC REPERTOIRE ENGINE</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Opportunity Discovery
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Find higher-value chemical opportunities connected to available refinery feedstocks.
        </p>
      </div>

      {/* Discovery Mode Selection & Configuration Card */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden p-5 space-y-6">
        {/* Mode Selector Tabs */}
        <div className="flex items-center border-b border-slate-800 pb-3 gap-2">
          <button
            onClick={() => setActiveMode('feedstock')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all ${
              activeMode === 'feedstock'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Start with a Feedstock (Feedstock-First)
          </button>
          <button
            onClick={() => setActiveMode('target')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all ${
              activeMode === 'target'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Start with a Target (Target-First)
          </button>
        </div>

        {/* Mode Content */}
        {activeMode === 'feedstock' ? (
          <div className="space-y-3">
            <label className="text-xs font-mono text-slate-300 block">
              SELECT REFINERY FEEDSTOCK STREAM:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {[
                { id: 'benzene', label: 'Benzene', stream: 'CCR Reformate' },
                { id: 'phenol', label: 'Phenol', stream: 'Cumene Heart' },
                { id: 'toluene', label: 'Toluene', stream: 'Reformate Cut' },
                { id: 'xylene', label: 'Xylene', stream: 'BTX Loop' },
                { id: 'hexane', label: 'Hexane', stream: 'Light Naphtha' },
                { id: 'sulphur', label: 'Sulphur-Stream', stream: 'Claus Unit' },
                { id: 'carbon-black', label: 'Carbon Black Feed', stream: 'FCC Slurry Oil' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFeedstock(f.id)}
                  className={`p-3 rounded-lg text-left border transition-all text-xs ${
                    selectedFeedstock === f.id
                      ? 'bg-cyan-950/70 border-cyan-500/70 text-white shadow-sm ring-1 ring-cyan-500/20'
                      : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold">{f.label}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{f.stream}</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1">TARGET MOLECULE NAME</label>
              <input
                type="text"
                value={targetName}
                onChange={(e) => setTargetName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:border-cyan-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1">TARGET SMILES STRING</label>
              <input
                type="text"
                value={targetSmiles}
                onChange={(e) => setTargetSmiles(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-cyan-300 font-mono focus:border-cyan-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1">PRODUCT CATEGORY</label>
              <select
                value={targetCategory}
                onChange={(e) => setTargetCategory(e.target.value as ProductCategory)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:border-cyan-500 focus:outline-hidden"
              >
                <option value="Pharmaceutical Intermediate">Pharmaceutical Intermediate</option>
                <option value="Specialty Chemical">Specialty Chemical</option>
                <option value="Agrochemical Intermediate">Agrochemical Intermediate</option>
                <option value="Polymer Additive">Polymer Additive</option>
                <option value="Specialty Solvent">Specialty Solvent</option>
                <option value="Advanced Material">Advanced Material</option>
                <option value="Resin / Monomer">Resin / Monomer</option>
              </select>
            </div>
          </div>
        )}

        {/* Multi-Criteria Filters Grid */}
        <div className="pt-4 border-t border-slate-800/80">
          <div className="text-xs font-mono text-slate-400 mb-3 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>PROCESS SCREENING CONSTRAINTS & PREFERENCES</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="text-slate-400 font-mono text-[11px] block mb-1">
                MAXIMUM ROUTE STEPS: <span className="text-cyan-400 font-bold">{maxSteps} STEPS</span>
              </label>
              <input
                type="range"
                min="2"
                max="6"
                value={maxSteps}
                onChange={(e) => setMaxSteps(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>2 steps (Direct)</span>
                <span>4 steps (Optimal)</span>
                <span>6 steps (Complex)</span>
              </div>
            </div>

            <div>
              <label className="text-slate-400 font-mono text-[11px] block mb-1">SUSTAINABILITY PRIORITY</label>
              <select
                value={sustainabilityPriority}
                onChange={(e) => setSustainabilityPriority(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:border-cyan-500"
              >
                <option value="High Green (Low E-Factor)">High Green (Low E-Factor &lt; 10)</option>
                <option value="Zero Toxic Solvents">Zero Toxic Solvents (No DMF/DCM)</option>
                <option value="Balanced Commercial">Balanced Commercial Guidelines</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 font-mono text-[11px] block mb-1">COST PRIORITY</label>
              <select
                value={costPriority}
                onChange={(e) => setCostPriority(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:border-cyan-500"
              >
                <option value="Feedstock Integration Margin">Feedstock Integration Margin (&gt;4x Multiplier)</option>
                <option value="OPEX Minimization">OPEX &amp; Catalyst Recovery Focus</option>
                <option value="Capital Expenditure Cap">Low CAPEX Unit Operations</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 font-mono text-[11px] block mb-1">RAW-MATERIAL AVAILABILITY</label>
              <select
                value={rawMaterialPref}
                onChange={(e) => setRawMaterialPref(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:border-cyan-500"
              >
                <option value="Domestic Bulk Sourcing">Domestic Bulk Sourcing (Make in India)</option>
                <option value="Global Specialty Allowed">Global Specialty Reagents Allowed</option>
                <option value="Refinery Captive Only">Refinery Captive Reagents Only</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 font-mono text-[11px] block mb-1">SCALE-UP PREFERENCE</label>
              <select
                value={scaleUpPref}
                onChange={(e) => setScaleUpPref(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:border-cyan-500"
              >
                <option value="Atmospheric / Mild Pressures">Atmospheric / Mild Pressures (&lt;5 bar)</option>
                <option value="Continuous Flow Capable">Continuous Flow Micro-Reactor</option>
                <option value="Standard Batch Agitated Glass">Standard Agitated Batch Reactor</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 font-mono text-[11px] block mb-1">HAZARD RESTRICTIONS</label>
              <select
                value={hazardFilter}
                onChange={(e) => setHazardFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:border-cyan-500"
              >
                <option value="Strict (Avoid Cyanide / Phosgene)">Strict (Avoid Cyanide / Phosgene / Azide)</option>
                <option value="Standard Industrial Protocols">Standard Chemical Hygiene Protocols</option>
                <option value="High Hazard Tolerant (Engineered Enclosures)">Engineered Enclosure Permitted</option>
              </select>
            </div>
          </div>
        </div>

        {/* Discovery Action Button */}
        <div className="pt-2 flex items-center justify-between">
          <div className="text-[11px] text-slate-400 font-mono">
            Screening across 14,000+ literature reactions &amp; captive refinery streams.
          </div>
          <button
            onClick={handleStartDiscovery}
            disabled={isDiscovering}
            className="px-6 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-800 text-white font-medium text-xs flex items-center gap-2 transition-all shadow-md shadow-cyan-900/30"
          >
            {isDiscovering ? (
              <>
                <Activity className="w-4 h-4 animate-spin text-cyan-200" />
                <span>Running Screening...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Discover Opportunities</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* Simulated Multi-Step Loading Animation */}
      {isDiscovering && (
        <div className="p-6 bg-slate-900/90 border border-cyan-500/50 rounded-xl shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-cyan-400 animate-spin" />
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
              Autonomous Retrosynthesis Pipeline
            </h3>
          </div>

          <div className="space-y-2">
            {discoverySequence.map((step, idx) => {
              const isDone = idx < discoveryStepIndex;
              const isCurrent = idx === discoveryStepIndex;
              return (
                <div
                  key={step}
                  className={`flex items-center gap-2 text-xs font-mono transition-opacity ${
                    isDone ? 'text-emerald-400' : isCurrent ? 'text-cyan-300 font-semibold' : 'text-slate-400'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : isCurrent ? (
                    <div className="w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin shrink-0"></div>
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-slate-700 shrink-0"></div>
                  )}
                  <span>{step}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5 Ranked Candidate Opportunity Cards */}
      {hasDiscovered && !isDiscovering && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Identified Downstream Opportunities (5 Ranked Candidates)
              </h2>
              <p className="text-xs text-slate-400">
                Screened against {maxSteps}-step ceiling, high-sustainability prioritization, and domestic supply constraints.
              </p>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/40">
              5 Opportunities Screened
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {candidateOpportunities.map((opp, idx) => (
              <div
                key={opp.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl p-5 flex flex-col justify-between transition-all group"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                      RANK #{idx + 1}
                    </span>
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      Forge: {opp.forgeScore}/100
                    </span>
                  </div>

                  {/* Molecular Structure Representation */}
                  <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3 flex items-center justify-center mb-3">
                    <ChemicalStructureSvg moleculeKey={opp.id} width={130} height={100} interactive={true} />
                  </div>

                  {/* Title & Metadata */}
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {opp.moleculeName}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono mt-1">
                    <span>{opp.formula}</span>
                    <span>·</span>
                    <span className="capitalize">{opp.feedstockId} feed</span>
                    <span>·</span>
                    <span>{opp.stepsCount} steps</span>
                  </div>

                  <div className="text-xs text-slate-300 mt-2 line-clamp-2">
                    {opp.application}
                  </div>

                  {/* Metric Chips */}
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800/70 text-xs font-mono">
                    <div>
                      <div className="text-[10px] text-slate-400">Market Price</div>
                      <div className="text-white font-medium">{opp.targetPriceINR}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Sustainability</div>
                      <div className="text-emerald-400 font-medium">{opp.sustainabilityScore}/100</div>
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400">
                    Conf: {opp.routeConfidence}%
                  </span>
                  <button
                    onClick={() => {
                      onSelectOpportunity(opp);
                      onNavigate('routes');
                    }}
                    className="px-3 py-1.5 rounded bg-slate-800 group-hover:bg-cyan-700 text-slate-200 group-hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <span>View Opportunity</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
