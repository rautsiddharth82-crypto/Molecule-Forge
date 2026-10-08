import React, { useState } from 'react';

interface RadarChartProps {
  className?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({ className = '' }) => {
  const [activeRoute, setActiveRoute] = useState<'all' | 'route-a' | 'route-b' | 'route-c'>('all');
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

  const dimensions = [
    { key: 'tech', label: 'Technical Feasibility', a: 84, b: 76, c: 71 },
    { key: 'econ', label: 'Economic Potential', a: 88, b: 79, c: 73 },
    { key: 'green', label: 'Green Chemistry', a: 67, b: 91, c: 78 },
    { key: 'avail', label: 'Raw-Mat Availability', a: 62, b: 75, c: 92 },
    { key: 'scale', label: 'Scale-Up Suitability', a: 78, b: 82, c: 80 },
    { key: 'conf', label: 'Data Confidence', a: 86, b: 74, c: 69 },
  ];

  const size = 320;
  const center = size / 2;
  const radius = 115;
  const total = dimensions.length;

  const getCoordinates = (value: number, index: number) => {
    const angle = (Math.PI * 2 / total) * index - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const getPolygonPoints = (key: 'a' | 'b' | 'c') => {
    return dimensions
      .map((dim, idx) => {
        const { x, y } = getCoordinates(dim[key], idx);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  };

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Route Filter Segmented Control */}
      <div className="flex items-center gap-1.5 p-1 mb-2 bg-slate-900/90 border border-slate-800 rounded-lg text-xs">
        <button
          onClick={() => setActiveRoute('all')}
          className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
            activeRoute === 'all'
              ? 'bg-slate-800 text-white font-medium shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Compare All
        </button>
        <button
          onClick={() => setActiveRoute('route-b')}
          className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeRoute === 'route-b'
              ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-500/40 font-medium'
              : 'text-slate-400 hover:text-emerald-400'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          Route B (Rec.)
        </button>
        <button
          onClick={() => setActiveRoute('route-a')}
          className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeRoute === 'route-a'
              ? 'bg-sky-950/70 text-sky-400 border border-sky-500/40 font-medium'
              : 'text-slate-400 hover:text-sky-400'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-sky-400"></span>
          Route A
        </button>
        <button
          onClick={() => setActiveRoute('route-c')}
          className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeRoute === 'route-c'
              ? 'bg-amber-950/70 text-amber-400 border border-amber-500/40 font-medium'
              : 'text-slate-400 hover:text-amber-400'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          Route C
        </button>
      </div>

      <div className="relative">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Circular/Polygonal Grid Lines (20%, 40%, 60%, 80%, 100%) */}
          {[20, 40, 60, 80, 100].map((level) => {
            const points = dimensions
              .map((_, idx) => {
                const { x, y } = getCoordinates(level, idx);
                return `${x},${y}`;
              })
              .join(' ');
            return (
              <polygon
                key={level}
                points={points}
                fill="none"
                stroke="#1E293B"
                strokeWidth={level === 100 ? '1.5' : '1'}
                strokeDasharray={level === 100 ? 'none' : '2 2'}
              />
            );
          })}

          {/* Radial Spokes */}
          {dimensions.map((dim, idx) => {
            const { x, y } = getCoordinates(100, idx);
            const isHovered = hoveredMetric === dim.key;
            return (
              <g key={dim.key}>
                <line
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke={isHovered ? '#38BDF8' : '#334155'}
                  strokeWidth={isHovered ? '1.5' : '1'}
                />
              </g>
            );
          })}

          {/* Route A Polygon */}
          {(activeRoute === 'all' || activeRoute === 'route-a') && (
            <polygon
              points={getPolygonPoints('a')}
              fill="#38BDF8"
              fillOpacity={activeRoute === 'route-a' ? '0.35' : '0.12'}
              stroke="#38BDF8"
              strokeWidth="2"
              className="transition-all duration-300"
            />
          )}

          {/* Route C Polygon */}
          {(activeRoute === 'all' || activeRoute === 'route-c') && (
            <polygon
              points={getPolygonPoints('c')}
              fill="#F59E0B"
              fillOpacity={activeRoute === 'route-c' ? '0.35' : '0.12'}
              stroke="#F59E0B"
              strokeWidth="2"
              className="transition-all duration-300"
            />
          )}

          {/* Route B Polygon (Recommended - Highlighted) */}
          {(activeRoute === 'all' || activeRoute === 'route-b') && (
            <polygon
              points={getPolygonPoints('b')}
              fill="#10B981"
              fillOpacity={activeRoute === 'route-b' ? '0.45' : '0.24'}
              stroke="#10B981"
              strokeWidth="2.8"
              className="transition-all duration-300"
            />
          )}

          {/* Data Points on vertices for Route B */}
          {dimensions.map((dim, idx) => {
            const ptB = getCoordinates(dim.b, idx);
            return (
              <circle
                key={`pt-b-${idx}`}
                cx={ptB.x}
                cy={ptB.y}
                r="3.5"
                fill="#10B981"
                stroke="#022C22"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Axis Labels */}
          {dimensions.map((dim, idx) => {
            const angle = (Math.PI * 2 / total) * idx - Math.PI / 2;
            const labelRadius = radius + 22;
            const lx = center + labelRadius * Math.cos(angle);
            const ly = center + labelRadius * Math.sin(angle);
            const isHovered = hoveredMetric === dim.key;

            return (
              <text
                key={dim.key}
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isHovered ? '#38BDF8' : '#94A3B8'}
                fontSize="9"
                fontFamily="IBM Plex Mono"
                fontWeight={isHovered ? '600' : '400'}
                className="cursor-pointer transition-colors"
                onMouseEnter={() => setHoveredMetric(dim.key)}
                onMouseLeave={() => setHoveredMetric(null)}
              >
                {dim.label}
              </text>
            );
          })}
        </svg>

        {/* Hover info readout */}
        {hoveredMetric && (
          <div className="absolute top-2 right-2 bg-slate-900/95 border border-slate-700 p-2 rounded text-[11px] font-mono shadow-lg pointer-events-none">
            {dimensions.find(d => d.key === hoveredMetric) && (
              <div>
                <div className="text-white font-medium mb-1">
                  {dimensions.find(d => d.key === hoveredMetric)?.label}
                </div>
                <div className="text-emerald-400">Route B: {dimensions.find(d => d.key === hoveredMetric)?.b}/100</div>
                <div className="text-sky-400">Route A: {dimensions.find(d => d.key === hoveredMetric)?.a}/100</div>
                <div className="text-amber-400">Route C: {dimensions.find(d => d.key === hoveredMetric)?.c}/100</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-slate-400 mt-1">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <span className="w-2.5 h-0.5 bg-emerald-400"></span> Route B (Rec: 81)
        </span>
        <span className="flex items-center gap-1.5 text-sky-400">
          <span className="w-2.5 h-0.5 bg-sky-400"></span> Route A (77)
        </span>
        <span className="flex items-center gap-1.5 text-amber-400">
          <span className="w-2.5 h-0.5 bg-amber-400"></span> Route C (78)
        </span>
      </div>
    </div>
  );
};
