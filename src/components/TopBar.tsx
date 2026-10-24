import React from 'react';
import { CHAPTERS, ChapterId } from '../data/portfolioData';

interface TopBarProps {
  activeChapter: ChapterId;
  onSelectChapter: (chapter: ChapterId) => void;
  onOpenCommission: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeChapter,
  onSelectChapter,
  onOpenCommission,
}) => {
  return (
    <header
      role="banner"
      className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between gap-8 px-6 py-3.5 bg-[#040610]/92 border-b border-sky-400/20"
    >
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#origin"
        onClick={(e) => {
          e.preventDefault();
          onSelectChapter('origin');
        }}
        className="font-display text-xl font-semibold tracking-tight text-white hover:text-sky-400 transition-colors whitespace-nowrap shrink-0"
      >
        Mohammad Saad
      </a>

      {/* Zone 2: 5 concise single-line text navigation links */}
      <nav aria-label="Exhibition Chapters" className="hidden md:flex items-center gap-7 text-sm font-medium">
        {CHAPTERS.map((chapter) => {
          const isActive = chapter.id === activeChapter;
          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => onSelectChapter(chapter.id)}
              className={`relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-sm ${
                isActive
                  ? 'text-sky-400 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {chapter.navLabel}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-400 via-purple-400 to-amber-400"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center shrink-0">
        <button
          type="button"
          onClick={onOpenCommission}
          className="px-4 py-2 text-xs font-semibold text-[#030308] bg-gradient-to-r from-amber-400 via-amber-300 to-sky-300 hover:brightness-110 transition-all rounded-lg whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-md"
        >
          Commission Inquiry
        </button>
      </div>
    </header>
  );
};
