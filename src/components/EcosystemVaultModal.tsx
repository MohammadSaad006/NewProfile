import React, { useState } from 'react';
import {
  CERTIFICATIONS,
  CertificationRecord,
  PROJECT_STATISTICS,
  StatCategory,
  calculateTotalCreations,
  filterStatisticsByCategory,
} from '../data/portfolioData';
import { Search, ShieldCheck, X } from 'lucide-react';

interface EcosystemVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCert: (cert: CertificationRecord) => void;
}

const CATEGORY_TABS: Array<{ id: StatCategory; label: string }> = [
  { id: 'all', label: 'All 19 Ecosystems' },
  { id: 'systems', label: 'Systems & Code' },
  { id: 'engines', label: '3D & Game Engines' },
  { id: 'hardware', label: 'Hardware & Robotics' },
  { id: 'ai', label: 'AI & Cloud' },
];

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#09090F] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="text-xs font-mono-tabular text-[#D4AF37]">
              COMPLETE ARCHIVE · {grandTotal.toLocaleString()}+ VERIFIED CREATIONS ACROSS 19 ECOSYSTEMS
            </div>
            <h2 className="font-display text-3xl font-semibold text-[#F4F1EA]">
              Mohammad Saad Engineering Ledger & Certifications
            </h2>
            <p className="text-sm text-[#A1A1AA]">
              Filter all 19 development, 3D modeling, game engine, and embedded robotics ecosystems from Mohammad Saad’s portfolio.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Engineering Vault"
            className="p-2 text-[#A1A1AA] hover:text-[#F4F1EA] bg-[#14141F] hover:bg-[#1E1E2E] rounded-lg border border-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Filter Controls & Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Filter Ecosystems by Domain"
            className="flex flex-wrap items-center gap-1 p-1 bg-[#12121C] rounded-lg border border-white/10"
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
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#D4AF37] text-[#060609] font-semibold'
                      : 'text-[#A1A1AA] hover:text-[#F4F1EA]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 flex-1 sm:flex-initial">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#A1A1AA] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                aria-label="Search Ecosystems"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Unreal, Blender, Wokwi..."
                className="w-full pl-8 pr-3 py-1.5 text-xs text-[#F4F1EA] bg-[#12121C] border border-white/15 rounded-lg focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div className="font-mono-tabular text-xs text-[#D4AF37] whitespace-nowrap shrink-0">
              Showing {filteredStats.length} · {filteredTotal}+ Builds
            </div>
          </div>
        </div>

        {/* 19 Project Statistics Grid */}
        {filteredStats.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-[#111119] border border-white/10 space-y-2">
            <p className="text-sm font-medium text-[#F4F1EA]">
              No ecosystems match "{searchQuery}"
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-3 py-1.5 text-xs font-semibold text-[#060609] bg-[#D4AF37] rounded-md cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredStats.map((stat) => (
              <div
                key={stat.id}
                className="p-4 rounded-xl bg-[#111119] border border-white/10 hover:border-[#D4AF37]/40 transition-colors flex flex-col justify-between space-y-2"
              >
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-semibold text-[#F4F1EA]">
                      {stat.label}
                    </span>
                    <span className="font-mono-tabular text-xl font-bold text-[#D4AF37]">
                      {stat.count}+
                    </span>
                  </div>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">
                    {stat.descriptor}
                  </p>
                </div>
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono-tabular text-[#A1A1AA]">
                  <span className="capitalize">{stat.category} Domain</span>
                  <span>·</span>
                  <span>{stat.unit}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Verified Technical Certifications Archive */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-2xl font-semibold text-[#F4F1EA]">
                Verified Certifications & Credentials
              </h3>
              <p className="text-xs text-[#A1A1AA]">
                Select any certificate below to open its full verification plate.
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
                className="text-left p-4 rounded-xl bg-[#111119] hover:bg-[#171723] border border-white/10 hover:border-[#D4AF37]/50 transition-colors cursor-pointer space-y-1.5"
              >
                <div className="flex items-center gap-1.5 text-[11px] font-mono-tabular text-[#D4AF37]">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>{cert.index}</span>
                  <span aria-hidden="true">·</span>
                  <span>{cert.year}</span>
                </div>
                <div className="text-sm font-semibold text-[#F4F1EA]">
                  {cert.title}
                </div>
                <div className="text-xs text-[#A1A1AA]">
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
