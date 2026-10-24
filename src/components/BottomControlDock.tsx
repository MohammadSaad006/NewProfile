import React from 'react';
import {
  CHAPTERS,
  CameraViewMode,
  ChapterId,
  FINISH_PRESETS,
  FinishPresetId,
} from '../data/portfolioData';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Layers, Compass, Sparkles } from 'lucide-react';

interface BottomControlDockProps {
  activeChapter: ChapterId;
  onSelectChapter: (chapter: ChapterId) => void;
  onStepChapter: (delta: number) => void;
  explodeFactor: number;
  onChangeExplodeFactor: (val: number) => void;
  finishPreset: FinishPresetId;
  onChangeFinishPreset: (preset: FinishPresetId) => void;
  cameraViewMode: CameraViewMode;
  onChangeCameraViewMode: (mode: CameraViewMode) => void;
  isZenMode: boolean;
  onToggleZenMode: () => void;
  onOpenVault: () => void;
}

export const BottomControlDock: React.FC<BottomControlDockProps> = ({
  activeChapter,
  onSelectChapter,
  onStepChapter,
  explodeFactor,
  onChangeExplodeFactor,
  finishPreset,
  onChangeFinishPreset,
  cameraViewMode,
  onChangeCameraViewMode,
  isZenMode,
  onToggleZenMode,
  onOpenVault,
}) => {
  return (
    <div
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-30 w-auto max-w-[96vw] flex flex-col items-center pointer-events-none"
      role="region"
      aria-label="3D Exhibition Controls"
    >
      {/* Top Collapse / Expand Toggle Button for Cinema / Zen Mode */}
      <button
        type="button"
        onClick={onToggleZenMode}
        aria-expanded={!isZenMode}
        className="pointer-events-auto mb-1 flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium text-[#E4E4E7] bg-[#0B0B10]/95 border border-[#D4AF37]/30 hover:border-[#D4AF37] rounded-t-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-lg"
      >
        {isZenMode ? (
          <>
            <ChevronUp className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Show Controls (H)</span>
          </>
        ) : (
          <>
            <ChevronDown className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Hide Controls · Cinema Mode (H)</span>
          </>
        )}
      </button>

      {/* Main Unified Horizontal Control Dock */}
      <div
        className={`pointer-events-auto w-full bg-[#09090F]/95 border border-[#D4AF37]/25 rounded-xl px-2.5 py-2 shadow-2xl transition-all duration-200 ${
          isZenMode
            ? 'opacity-0 translate-y-8 pointer-events-none h-0 py-0 overflow-hidden border-0'
            : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2">
          {/* Row 1 on mobile / Left group on desktop: Chapter Stepper & Quick Jump */}
          <div className="flex items-center gap-0.5 bg-[#11111A] p-1 rounded-lg border border-white/5 shrink-0">
            <button
              type="button"
              onClick={() => onStepChapter(-1)}
              aria-label="Previous Chapter"
              className="p-1 text-[#A1A1AA] hover:text-[#F4F1EA] hover:bg-white/5 rounded-md transition-colors cursor-pointer shrink-0"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {CHAPTERS.map((chap) => {
              const active = chap.id === activeChapter;
              return (
                <button
                  key={chap.id}
                  type="button"
                  onClick={() => onSelectChapter(chap.id)}
                  className={`px-1.5 sm:px-2 py-1 text-[11px] font-mono-tabular rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#D4AF37] text-[#060609] font-semibold'
                      : 'text-[#A1A1AA] hover:text-[#F4F1EA]'
                  }`}
                >
                  <span className="hidden lg:inline">{chap.index}. </span>
                  {chap.navLabel}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => onStepChapter(1)}
              aria-label="Next Chapter"
              className="p-1 text-[#A1A1AA] hover:text-[#F4F1EA] hover:bg-white/5 rounded-md transition-colors cursor-pointer shrink-0"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Row 2 on mobile / Right group on desktop: Explode Slider, Finishes, Camera & Vault */}
          <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
            {/* Exploded Calibre Mechanism Slider */}
            <div className="flex items-center gap-1.5 bg-[#11111A] px-2 py-1 rounded-lg border border-white/5 shrink-0">
              <Layers className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <label
                htmlFor="explode-calibre-slider"
                className="text-[11px] font-medium text-[#D4D4D8] whitespace-nowrap shrink-0"
              >
                Explode
              </label>
              <input
                id="explode-calibre-slider"
                type="range"
                min={0}
                max={100}
                value={Math.round(explodeFactor * 100)}
                onChange={(e) => onChangeExplodeFactor(Number(e.target.value) / 100)}
                className="w-14 sm:w-16 accent-[#D4AF37] cursor-pointer"
              />
              <span className="font-mono-tabular text-[11px] text-[#D4AF37] w-7 text-right shrink-0">
                {Math.round(explodeFactor * 100)}%
              </span>
            </div>

            {/* Material Finish Presets */}
            <div className="hidden md:flex items-center gap-1 bg-[#11111A] p-1 rounded-lg border border-white/5 shrink-0" role="group" aria-label="Material Finish Presets">
              {FINISH_PRESETS.map((preset) => {
                const active = preset.id === finishPreset;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => onChangeFinishPreset(preset.id)}
                    className={`flex items-center gap-1.5 px-2 py-1 text-[11px] font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-white/15 text-[#F4F1EA] border border-[#D4AF37]/50'
                        : 'text-[#A1A1AA] hover:text-[#F4F1EA]'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="w-2.5 h-2.5 rounded-sm border border-white/30 shrink-0"
                      style={{ backgroundColor: preset.swatchHex }}
                    />
                    <span>{preset.shortLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Camera Framing Preset */}
            <div className="hidden lg:flex items-center gap-0.5 bg-[#11111A] p-1 rounded-lg border border-white/5 shrink-0" role="group" aria-label="Camera Framing Mode">
              <Compass className="w-3.5 h-3.5 text-[#D4AF37] ml-1 mr-0.5 shrink-0" />
              {(['gallery', 'macro', 'aerial'] as CameraViewMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => onChangeCameraViewMode(mode)}
                  className={`px-2 py-1 text-[11px] font-medium capitalize rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    cameraViewMode === mode
                      ? 'bg-[#D4AF37] text-[#060609] font-semibold'
                      : 'text-[#A1A1AA] hover:text-[#F4F1EA]'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Open Full 1,214+ Works & Credentials Vault */}
            <button
              type="button"
              onClick={onOpenVault}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-semibold text-[#F4F1EA] bg-[#181824] hover:bg-[#222232] border border-[#D4AF37]/40 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>1,214+ Works Vault</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
