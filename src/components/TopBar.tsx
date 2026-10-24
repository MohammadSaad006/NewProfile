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
      className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between gap-8 px-6 py-3.5 bg-[#07070B]/95 border-b border-[#D4AF37]/20"
    >
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#origin"
        onClick={(e) => {
          e.preventDefault();
          onSelectChapter('origin');
        }}
        className="font-display text-xl font-semibold tracking-tight text-[#F4F1EA] hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0"
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
              className={`relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-sm ${
                isActive
                  ? 'text-[#D4AF37] font-semibold'
                  : 'text-[#A1A1AA] hover:text-[#F4F1EA]'
              }`}
            >
              {chapter.navLabel}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#D4AF37]"
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
          className="px-4 py-2 text-xs font-semibold text-[#060609] bg-[#D4AF37] hover:bg-[#E5C358] transition-colors rounded-md whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F1EA]"
        >
          Commission Inquiry
        </button>
      </div>
    </header>
  );
};
