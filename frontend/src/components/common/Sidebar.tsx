import React from 'react';
import {
  Compass,
  LayoutDashboard,
  Search,
  Layers,
  Atom,
  GitBranch,
  GitCompare,
  Gauge,
  Leaf,
  Coins,
  Truck,
  FlaskConical,
  FileText,
  ShieldCheck,
  User,
  X
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpenMobile,
  setIsOpenMobile,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Compass, group: 'Discovery' },
    { id: 'command-center', label: 'Executive Dashboard', icon: LayoutDashboard, group: 'Discovery' },
    { id: 'discovery', label: 'Opportunity Discovery', icon: Search, badge: '5 New', group: 'Discovery' },
    { id: 'feedstocks', label: 'Feedstocks', icon: Layers, group: 'Chemical Assets' },
    { id: 'molecules', label: 'Molecules', icon: Atom, group: 'Chemical Assets' },
    { id: 'routes', label: 'Route Explorer', icon: GitBranch, group: 'Synthesis' },
    { id: 'comparison', label: 'Route Comparison', icon: GitCompare, group: 'Synthesis' },
    { id: 'forge-score', label: 'Forge Score Engine', icon: Gauge, badge: '81', group: 'Analysis' },
    { id: 'sustainability', label: 'Sustainability', icon: Leaf, group: 'Analysis' },
    { id: 'economics', label: 'Economics', icon: Coins, group: 'Analysis' },
    { id: 'supply-chain', label: 'Supply Chain', icon: Truck, group: 'Analysis' },
    { id: 'validation', label: 'Validation Lab', icon: FlaskConical, badge: '4/20', group: 'Execution' },
    { id: 'reports', label: 'Reports', icon: FileText, group: 'Execution' },
  ];

  const handleSelect = (id: string) => {
    setActiveTab(id);
    setIsOpenMobile(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:h-[calc(100vh-3.5rem)] ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Header in Drawer */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 lg:hidden">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white tracking-tight">Molecule Forge</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded">
              DEMO DATA
            </span>
          </div>
          <button
            onClick={() => setIsOpenMobile(false)}
            className="p-1 text-slate-400 hover:text-white rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const showHeader = idx === 0 || navItems[idx - 1].group !== item.group;

            return (
              <React.Fragment key={item.id}>
                {showHeader && (
                  <div className="pt-3 pb-1.5 px-3 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    {item.group}
                  </div>
                )}
                <button
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-md transition-all group ${
                    isActive
                      ? 'bg-cyan-950/60 text-cyan-300 font-medium border border-cyan-800/50 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                        isActive
                          ? 'bg-cyan-900/60 text-cyan-300 border-cyan-700/60'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {/* Bottom Status Block */}
        <div className="p-3.5 border-t border-slate-800/80 bg-slate-950/80 text-xs font-mono space-y-2">
          {/* Operational Status */}
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-300">System Status:</span>
            </span>
            <span className="text-emerald-400 font-medium">Operational</span>
          </div>

          {/* Data Mode */}
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span>Data Mode:</span>
            <span className="px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] rounded">
              DEMO DATA
            </span>
          </div>

          {/* User Profile */}
          <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                <User className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-tight">
                <div className="text-slate-200 text-[11px] font-medium font-sans">R&D Analyst</div>
                <div className="text-slate-400 text-[9px]">Aromatics Division</div>
              </div>
            </div>
            <span title="R&D Clearance Level 3">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
