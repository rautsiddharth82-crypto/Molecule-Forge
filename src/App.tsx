import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { AiIntelligenceModal } from './components/common/AiIntelligenceModal';

// Pages
import { OverviewPage } from './components/pages/OverviewPage';
import { CommandCenterPage } from './components/pages/CommandCenterPage';
import { DiscoveryPage } from './components/pages/DiscoveryPage';
import { FeedstocksPage } from './components/pages/FeedstocksPage';
import { MoleculeExplorerPage } from './components/pages/MoleculeExplorerPage';
import { RouteExplorerPage } from './components/pages/RouteExplorerPage';
import { RouteComparisonPage } from './components/pages/RouteComparisonPage';
import { ForgeScorePage } from './components/pages/ForgeScorePage';
import { SustainabilityPage } from './components/pages/SustainabilityPage';
import { EconomicsPage } from './components/pages/EconomicsPage';
import { SupplyChainPage } from './components/pages/SupplyChainPage';
import { ValidationLabPage } from './components/pages/ValidationLabPage';
import { ReportsPage } from './components/pages/ReportsPage';

import { Menu, ShieldAlert } from 'lucide-react';
import { OpportunityItem, Molecule } from './types/chemistry';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);

  // Selected state passed across views
  const [selectedOpportunity, setSelectedOpportunity] = useState<OpportunityItem | null>(null);

  const handleSelectOpportunity = (opp: OpportunityItem) => {
    setSelectedOpportunity(opp);
  };

  const handleSelectMolecule = (mol: Molecule) => {
    // Navigate to route explorer
    setActiveTab('routes');
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewPage
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenAiEngine={() => setIsAiModalOpen(true)}
          />
        );
      case 'command-center':
        return (
          <CommandCenterPage
            onSelectOpportunity={handleSelectOpportunity}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        );
      case 'discovery':
        return (
          <DiscoveryPage
            onSelectOpportunity={handleSelectOpportunity}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        );
      case 'feedstocks':
        return (
          <FeedstocksPage
            onNavigate={(tab) => setActiveTab(tab)}
            onSelectFeedstockForRoutes={() => setActiveTab('routes')}
          />
        );
      case 'molecules':
        return (
          <MoleculeExplorerPage
            onSelectMolecule={handleSelectMolecule}
            onNavigateToRoutes={handleSelectMolecule}
          />
        );
      case 'routes':
        return (
          <RouteExplorerPage
            onNavigate={(tab) => setActiveTab(tab)}
          />
        );
      case 'comparison':
        return (
          <RouteComparisonPage
            onNavigate={(tab) => setActiveTab(tab)}
          />
        );
      case 'forge-score':
        return (
          <ForgeScorePage
            onNavigate={(tab) => setActiveTab(tab)}
          />
        );
      case 'sustainability':
        return (
          <SustainabilityPage
            onNavigate={(tab) => setActiveTab(tab)}
          />
        );
      case 'economics':
        return (
          <EconomicsPage
            onNavigate={(tab) => setActiveTab(tab)}
          />
        );
      case 'supply-chain':
        return (
          <SupplyChainPage
            onNavigate={(tab) => setActiveTab(tab)}
          />
        );
      case 'validation':
        return (
          <ValidationLabPage
            onNavigateToReports={() => setActiveTab('reports')}
          />
        );
      case 'reports':
        return <ReportsPage />;
      default:
        return (
          <OverviewPage
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenAiEngine={() => setIsAiModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiEngine={() => setIsAiModalOpen(true)}
      />

      {/* Mobile Bar for Hamburger Toggle */}
      <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-white p-1 rounded bg-slate-900 border border-slate-800"
        >
          <Menu className="w-4 h-4 text-cyan-400" />
          <span>Navigation Menu</span>
        </button>

        <span className="text-[11px] font-mono text-cyan-300 font-semibold uppercase">
          {activeTab.replace('-', ' ')}
        </span>
      </div>

      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Persistent Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpenMobile={isMobileMenuOpen}
          setIsOpenMobile={setIsMobileMenuOpen}
        />

        {/* Scrollable Main Viewport Stage */}
        <main className="flex-1 overflow-y-auto bg-slate-950 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
          {renderActivePage()}

          {/* Footer Disclaimer */}
          <footer className="mt-12 pt-6 border-t border-slate-900 text-xs font-mono text-slate-400 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-slate-300 font-semibold">Molecule Forge</span>
                <span>·</span>
                <span>Refinery-to-Chemicals Screening Platform</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  DEMO DATA MODE
                </span>
                <span>R&amp;D Analyst Edition</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Molecule Forge is a human-in-the-loop decision-support platform. AI-generated routes are hypotheses, not validated manufacturing processes. Predicted yields may not transfer directly to industrial conditions. Laboratory experimentation is required before scale-up.
            </p>
          </footer>
        </main>
      </div>

      {/* Molecule Forge AI Intelligence Modal */}
      <AiIntelligenceModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onNavigateToRoute={() => {
          setActiveTab('routes');
        }}
      />
    </div>
  );
}
