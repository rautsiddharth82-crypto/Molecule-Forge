import React, { useState } from 'react';
import { MOLECULES_LIST } from '../../data/mockData';
import { Molecule } from '../../types/chemistry';
import { ChemicalStructureSvg } from '../common/ChemicalStructureSvg';
import { Search, Filter, Atom, ArrowRight, X, ExternalLink, Sparkles } from 'lucide-react';

interface MoleculeExplorerPageProps {
  onSelectMolecule: (mol: Molecule) => void;
  onNavigateToRoutes: (mol: Molecule) => void;
}

export const MoleculeExplorerPage: React.FC<MoleculeExplorerPageProps> = ({
  onSelectMolecule,
  onNavigateToRoutes,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFeedstock, setSelectedFeedstock] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minForgeScore, setMinForgeScore] = useState(70);

  // Detail Modal / Profile state
  const [activeProfileMolecule, setActiveProfileMolecule] = useState<Molecule | null>(null);

  const filteredMolecules = MOLECULES_LIST.filter(mol => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      mol.name.toLowerCase().includes(term) ||
      mol.formula.toLowerCase().includes(term) ||
      mol.smiles.toLowerCase().includes(term) ||
      mol.applications.some(a => a.toLowerCase().includes(term));

    const matchesFeedstock = selectedFeedstock === 'all' || mol.startingFeedstock === selectedFeedstock;
    const matchesCategory = selectedCategory === 'all' || mol.category === selectedCategory;
    const matchesScore = mol.forgeScore >= minForgeScore;

    return matchesSearch && matchesFeedstock && matchesCategory && matchesScore;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
          <Atom className="w-3.5 h-3.5" />
          <span>CHEMICAL REPO & MOLECULAR PROFILES</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Molecule Explorer
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Explore target molecules, investigate 2D structure representations, and evaluate retrosynthetic readiness.
        </p>
      </div>

      {/* Filter and Search Bar Section */}
      <section className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search molecule name, formula (e.g. C8H7NO2), SMILES or therapeutic application..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 font-mono focus:border-cyan-500 focus:outline-hidden"
          />
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="text-slate-400 font-mono text-[11px] block mb-1">FEEDSTOCK ORIGIN</label>
            <select
              value={selectedFeedstock}
              onChange={(e) => setSelectedFeedstock(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:border-cyan-500"
            >
              <option value="all">All Feedstocks</option>
              <option value="benzene">Benzene</option>
              <option value="phenol">Phenol</option>
              <option value="toluene">Toluene</option>
              <option value="xylene">Xylene</option>
              <option value="hexane">Hexane</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 font-mono text-[11px] block mb-1">PRODUCT CATEGORY</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:border-cyan-500"
            >
              <option value="all">All Categories</option>
              <option value="Pharmaceutical Intermediate">Pharmaceutical Intermediate</option>
              <option value="Specialty Chemical">Specialty Chemical</option>
              <option value="Polymer Additive">Polymer Additive</option>
              <option value="Advanced Material">Advanced Material</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 font-mono text-[11px] block mb-1">
              MIN FORGE SCORE: <span className="text-cyan-400 font-bold">{minForgeScore}</span>
            </label>
            <input
              type="range"
              min="65"
              max="90"
              value={minForgeScore}
              onChange={(e) => setMinForgeScore(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedFeedstock('all');
                setSelectedCategory('all');
                setMinForgeScore(70);
              }}
              className="w-full py-1.5 px-3 rounded bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors text-center text-xs font-mono"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </section>

      {/* Grid of Molecule Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMolecules.map((mol) => (
          <div
            key={mol.id}
            onClick={() => setActiveProfileMolecule(mol)}
            className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-5 flex flex-col justify-between transition-all cursor-pointer group"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800">
                  {mol.category}
                </span>
                <span className="text-xs font-mono font-bold text-cyan-400">
                  Forge: {mol.forgeScore}
                </span>
              </div>

              {/* Molecule 2D SVG structure placeholder */}
              <div className="h-32 bg-slate-950/70 border border-slate-800/80 rounded-lg p-2 flex items-center justify-center mb-3">
                <ChemicalStructureSvg moleculeKey={mol.id} width={140} height={110} interactive={true} />
              </div>

              {/* Title & Formula */}
              <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                {mol.name}
              </h3>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-1">
                <span>{mol.formula}</span>
                <span>·</span>
                <span>MW: {mol.molecularWeight} g/mol</span>
              </div>

              {/* Applications snippet */}
              <div className="mt-3 text-xs text-slate-300">
                <span className="text-[10px] font-mono text-slate-400 block mb-0.5">APPLICATIONS:</span>
                <p className="line-clamp-2">{mol.applications.join(', ')}</p>
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 capitalize">
                Feed: <strong className="text-slate-200">{mol.startingFeedstock}</strong>
              </span>
              <span className="text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>{mol.candidateRoutesCount} Routes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Detailed Molecular Profile Modal / Drawer */}
      {activeProfileMolecule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                  MOLECULAR TARGET PROFILE
                </span>
                <h2 className="text-base font-bold text-white">{activeProfileMolecule.name}</h2>
              </div>
              <button
                onClick={() => setActiveProfileMolecule(null)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Structure Display Area */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col items-center">
                <ChemicalStructureSvg moleculeKey={activeProfileMolecule.id} width={220} height={160} />
                <span className="text-[10px] font-mono text-slate-400 mt-2">
                  Chemical structure visualization (Demonstration vector renderer)
                </span>
              </div>

              {/* Specifications Matrix */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
                  <div className="text-slate-400 text-[10px]">FORMULA</div>
                  <div className="text-white font-bold mt-0.5">{activeProfileMolecule.formula}</div>
                </div>
                <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
                  <div className="text-slate-400 text-[10px]">MOLECULAR WEIGHT</div>
                  <div className="text-white font-bold mt-0.5">{activeProfileMolecule.molecularWeight} g/mol</div>
                </div>
                <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
                  <div className="text-slate-400 text-[10px]">MARKET PRICE</div>
                  <div className="text-cyan-400 font-bold mt-0.5">{activeProfileMolecule.marketPriceRange}</div>
                </div>
                <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
                  <div className="text-slate-400 text-[10px]">FORGE SCORE</div>
                  <div className="text-emerald-400 font-bold mt-0.5">{activeProfileMolecule.forgeScore} / 100</div>
                </div>
              </div>

              {/* SMILES */}
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  CANONICAL SMILES STRING
                </label>
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs text-cyan-300 break-all select-all">
                  {activeProfileMolecule.smiles}
                </div>
              </div>

              {/* Functional Groups & Description */}
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-semibold">
                    Key Functional Handles
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProfileMolecule.keyFunctionalGroups.map(fg => (
                      <span key={fg} className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/80 text-cyan-300 text-xs font-mono">
                        {fg}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-semibold">
                    Chemical &amp; Commercial Overview
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-800">
                    {activeProfileMolecule.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 text-[11px]">
                {activeProfileMolecule.candidateRoutesCount} Retrosynthetic Routes Available
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveProfileMolecule(null)}
                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const mol = activeProfileMolecule;
                    setActiveProfileMolecule(null);
                    onNavigateToRoutes(mol);
                  }}
                  className="px-4 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-medium flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Launch Route Explorer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
