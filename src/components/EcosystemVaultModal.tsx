import React, { useState } from 'react';
import {
  CERTIFICATIONS,
  CertificationRecord,
  PROJECT_STATISTICS,
  StatCategory,
  calculateTotalCreations,
  filterStatisticsByCategory,
} from '../data/portfolioData';
import { Cpu, Gamepad2, Globe, Search, ShieldCheck, Sparkles, Terminal, X } from 'lucide-react';

interface EcosystemVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCert: (cert: CertificationRecord) => void;
}

const CATEGORY_TABS: Array<{ id: StatCategory; label: string; accent: string }> = [
  { id: 'all', label: 'All 19 Ecosystems', accent: 'from-amber-400 to-sky-400' },
  { id: 'systems', label: 'Systems & Code', accent: 'from-sky-400 to-indigo-400' },
  { id: 'engines', label: '3D & Game Engines', accent: 'from-purple-400 to-pink-400' },
  { id: 'hardware', label: 'Hardware & Robotics', accent: 'from-emerald-400 to-teal-400' },
  { id: 'ai', label: 'AI & Cloud', accent: 'from-amber-400 to-rose-400' },
];

const CATEGORY_STYLE: Record<
  Exclude<StatCategory, 'all'>,
  {
    topBar: string;
    numColor: string;
    barFill: string;
    label: string;
    Icon: React.FC<{ className?: string }>;
  }
> = {
  systems: {
    topBar: 'from-sky-400 via-cyan-300 to-indigo-500',
    numColor: 'text-sky-400',
    barFill: 'bg-gradient-to-r from-sky-400 to-indigo-400',
    label: 'Systems & Full-Stack',
    Icon: Terminal,
  },
  engines: {
    topBar: 'from-purple-400 via-fuchsia-400 to-pink-500',
    numColor: 'text-purple-400',
    barFill: 'bg-gradient-to-r from-purple-400 to-pink-400',
    label: '3D & Game Engines',
    Icon: Gamepad2,
  },
  hardware: {
    topBar: 'from-emerald-400 via-teal-300 to-cyan-500',
    numColor: 'text-emerald-400',
    barFill: 'bg-gradient-to-r from-emerald-400 to-teal-400',
    label: 'Hardware & Robotics',
    Icon: Cpu,
  },
  ai: {
    topBar: 'from-amber-400 via-orange-400 to-rose-500',
    numColor: 'text-amber-400',
    barFill: 'bg-gradient-to-r from-amber-400 to-rose-400',
    label: 'AI & Data Science',
    Icon: Globe,
  },
};

export const EcosystemVaultModal: React.FC<EcosystemVaultModalProps> = ({
  isOpen,
  onClose,
  onSelectCert,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<StatCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredStats = filterStatisticsByCategory(selectedCategory, searchQuery, PROJECT_STATISTICS);
  const filteredTotal = calculateTotalCreations(filteredStats);
  const grandTotal = calculateTotalCreations(PROJECT_STATISTICS);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Complete Engineering Ecosystem Matrix and Certifications Vault"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#02030A]/88"
      onClick={onClose}
    >
      <div
        className="no-scrollbar relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#060814] border border-sky-400/35 shadow-[0_0_80px_rgba(56,189,248,0.18)] p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Multi-Color Galaxy Accent Ribbon */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-purple-500 to-amber-400"
        />

        {/* Cosmic Command Deck Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-mono-tabular text-sky-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>GALAXY ARCHIVE · {grandTotal.toLocaleString()}+ VERIFIED CREATIONS ACROSS 19 ECOSYSTEMS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              Mohammad Saad Cosmic Engineering Ledger & Credentials
            </h2>
            <p className="text-sm text-slate-300/90">
              Interactive star-map of all 19 software, 3D game engine, AI, and embedded robotics ecosystems.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Engineering Vault"
            className="p-2.5 text-slate-300 hover:text-white bg-[#10152B] hover:bg-[#192142] rounded-xl border border-sky-400/30 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Color Galaxy Domain Telemetry Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#0B0F22] border border-sky-400/25 space-y-1">
            <div className="flex items-center justify-between text-xs text-sky-300 font-medium">
              <span>Systems & Code</span>
              <span className="font-mono-tabular font-bold text-sky-400">686+</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full w-[56%] bg-gradient-to-r from-sky-400 to-indigo-400" />
            </div>
            <div className="text-[11px] text-slate-400">GitHub · Unofficial · Code.org · Expo</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0B0F22] border border-purple-400/25 space-y-1">
            <div className="flex items-center justify-between text-xs text-purple-300 font-medium">
              <span>3D & Game Engines</span>
              <span className="font-mono-tabular font-bold text-purple-400">328+</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full w-[38%] bg-gradient-to-r from-purple-400 to-pink-400" />
            </div>
            <div className="text-[11px] text-slate-400">Blender · Unreal · Unity · CryEngine · Godot</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0B0F22] border border-emerald-400/25 space-y-1">
            <div className="flex items-center justify-between text-xs text-emerald-300 font-medium">
              <span>Hardware & Robotics</span>
              <span className="font-mono-tabular font-bold text-emerald-400">135+</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full w-[24%] bg-gradient-to-r from-emerald-400 to-teal-400" />
            </div>
            <div className="text-[11px] text-slate-400">Wokwi ESP32 · Webots · Cisco · Tinkercad</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0B0F22] border border-amber-400/25 space-y-1">
            <div className="flex items-center justify-between text-xs text-amber-300 font-medium">
              <span>AI & Research Notebooks</span>
              <span className="font-mono-tabular font-bold text-amber-400">65+</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full w-[18%] bg-gradient-to-r from-amber-400 to-rose-400" />
            </div>
            <div className="text-[11px] text-slate-400">Google Colab · ECO AI Cognitive Core</div>
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Filter Ecosystems by Domain"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#0B0F22] rounded-xl border border-white/10"
          >
            {CATEGORY_TABS.map((tab) => {
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? `bg-gradient-to-r ${tab.accent} text-[#030308] shadow-md`
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 flex-1 sm:flex-initial">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                aria-label="Search Ecosystems"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Unreal, Blender, Wokwi..."
                className="w-full pl-8 pr-3 py-2 text-xs text-white bg-[#0B0F22] border border-sky-400/25 rounded-xl focus:outline-none focus:border-sky-400"
              />
            </div>
            <div className="font-mono-tabular text-xs text-amber-400 whitespace-nowrap shrink-0">
              Showing {filteredStats.length} · {filteredTotal}+ Builds
            </div>
          </div>
        </div>

        {/* 19 Project Statistics Cosmic Bento Grid */}
        {filteredStats.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-[#0B0F22] border border-white/10 space-y-2">
            <p className="text-sm font-medium text-white">
              No ecosystems match "{searchQuery}"
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-1.5 text-xs font-semibold text-[#030308] bg-amber-400 rounded-lg cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredStats.map((stat) => {
              const style = CATEGORY_STYLE[stat.category];
              const DomainIcon = style.Icon;
              const barPercent = Math.min(100, Math.max(12, Math.round((stat.count / 300) * 100)));

              return (
                <div
                  key={stat.id}
                  className="relative overflow-hidden p-4 rounded-2xl bg-[#0B0F22]/95 border border-white/10 hover:border-sky-400/45 transition-all flex flex-col justify-between space-y-3 shadow-lg"
                >
                  {/* Domain-Colored Top Cosmic Hairline */}
                  <div
                    aria-hidden="true"
                    className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${style.topBar}`}
                  />

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <DomainIcon className={`w-4 h-4 ${style.numColor} shrink-0`} />
                        <span className="text-sm font-semibold text-white">
                          {stat.label}
                        </span>
                      </div>
                      <span className={`font-mono-tabular text-2xl font-bold ${style.numColor}`}>
                        {stat.count}+
                      </span>
                    </div>
                    <p className="text-xs text-slate-300/90 leading-relaxed">
                      {stat.descriptor}
                    </p>
                  </div>

                  {/* Proportional Cosmic Telemetry Meter + Unboxed Metadata */}
                  <div className="space-y-2 pt-1">
                    <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className={`h-full ${style.barFill}`}
                        style={{ width: `${barPercent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono-tabular text-slate-400">
                      <span>{style.label}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-300">{stat.unit}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Verified Technical Certifications Archive */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-2xl font-semibold text-white">
                Verified Certifications & Starlight Credentials
              </h3>
              <p className="text-xs text-slate-400">
                Select any credential below to inspect its holographic verification plate.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CERTIFICATIONS.map((cert) => (
              <button
                key={cert.id}
                type="button"
                onClick={() => {
                  onClose();
                  onSelectCert(cert);
                }}
                className="relative overflow-hidden text-left p-4 rounded-2xl bg-[#0B0F22] hover:bg-[#131936] border border-purple-400/25 hover:border-amber-400/60 transition-all cursor-pointer space-y-1.5"
              >
                <div className="flex items-center gap-1.5 text-[11px] font-mono-tabular text-amber-400">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>{cert.index}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-sky-400">{cert.year}</span>
                </div>
                <div className="text-sm font-semibold text-white">
                  {cert.title}
                </div>
                <div className="text-xs text-slate-400">
                  {cert.issuer} · {cert.domain}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
