import React from 'react';
import {
  Download,
  Star,
  Check,
  Eye,
  FileCode,
  HardDrive,
  Cpu,
  Palette,
  Languages,
  Terminal,
  ShieldAlert,
  Loader2,
  Gamepad2
} from 'lucide-react';
import { ModItem } from '../types/mod.ts';
import { useDownloads } from '../context/DownloadContext.tsx';

interface ModCardProps {
  mod: ModItem;
  onOpenDetails: (mod: ModItem) => void;
}

export const ModCard: React.FC<ModCardProps> = ({ mod, onOpenDetails }) => {
  const { startDownload, getModDownloadStatus } = useDownloads();
  const downloadStatus = getModDownloadStatus(mod.id);

  const isDownloading = downloadStatus?.status === 'downloading';
  const isCompleted = downloadStatus?.status === 'completed';

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    startDownload(mod);
  };

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'luma-plugins':
        return {
          badge: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
          accent: 'from-indigo-500/30 via-indigo-500/5 to-transparent',
          border: 'group-hover:border-indigo-500/40',
          icon: <Cpu className="w-3.5 h-3.5 text-indigo-400" />
        };
      case 'custom-themes':
        return {
          badge: 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30',
          accent: 'from-fuchsia-500/30 via-fuchsia-500/5 to-transparent',
          border: 'group-hover:border-fuchsia-500/40',
          icon: <Palette className="w-3.5 h-3.5 text-fuchsia-400" />
        };
      case 'rus-translations':
        return {
          badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
          accent: 'from-emerald-500/30 via-emerald-500/5 to-transparent',
          border: 'group-hover:border-emerald-500/40',
          icon: <Languages className="w-3.5 h-3.5 text-emerald-400" />
        };
      case 'homebrew-apps':
        return {
          badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
          accent: 'from-amber-500/30 via-amber-500/5 to-transparent',
          border: 'group-hover:border-amber-500/40',
          icon: <Terminal className="w-3.5 h-3.5 text-amber-400" />
        };
      case 'cheats-saves':
        return {
          badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
          accent: 'from-rose-500/30 via-rose-500/5 to-transparent',
          border: 'group-hover:border-rose-500/40',
          icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
        };
      default:
        return {
          badge: 'bg-zinc-800 text-zinc-300 border-zinc-700',
          accent: 'from-zinc-700/30 via-zinc-700/5 to-transparent',
          border: 'group-hover:border-zinc-600',
          icon: <FileCode className="w-3.5 h-3.5 text-zinc-400" />
        };
    }
  };

  const style = getCategoryStyles(mod.category);

  return (
    <div
      onClick={() => onOpenDetails(mod)}
      className={`group relative flex flex-col bg-zinc-900/60 hover:bg-zinc-900/90 rounded-2xl border border-zinc-800/90 ${style.border} transition-all duration-200 overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-cyan-950/20 hover:-translate-y-0.5`}
    >
      {/* Top Ambient Glow Strip */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${style.accent}`} />

      {/* Card Header */}
      <div className="p-4 pb-0 space-y-2.5">
        <div className="flex items-center justify-between gap-1.5">
          {/* Category Badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-medium rounded-lg border backdrop-blur-md shadow-xs ${style.badge}`}
          >
            {style.icon}
            <span>{mod.categoryName}</span>
          </span>

          <div className="flex items-center gap-1.5">
            {mod.source && (
              <span
                className={`px-2 py-0.5 text-[10px] font-semibold rounded-md border ${
                  mod.source === 'GameBanana'
                    ? 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30'
                    : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                }`}
              >
                {mod.source}
              </span>
            )}
            {/* Compatibility Pill */}
            <span
              className={`px-2 py-0.5 text-[10px] font-mono font-semibold rounded-md border ${
                mod.compatibility === 'new-3ds-only'
                  ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                  : 'bg-zinc-800 text-zinc-300 border-zinc-700/60'
              }`}
            >
              {mod.compatibility === 'new-3ds-only' ? 'New 3DS' : 'O3DS / N3DS'}
            </span>
          </div>
        </div>

        {/* Game Title & Version */}
        <div className="flex items-center justify-between text-xs text-zinc-400 pt-0.5">
          <span className="font-semibold text-zinc-300 flex items-center gap-1.5 truncate pr-2">
            <Gamepad2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">{mod.gameTitle}</span>
          </span>
          <span className="text-[10px] font-mono text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded-md border border-zinc-800 shrink-0">
            {mod.version}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-white text-base leading-snug group-hover:text-cyan-300 transition-colors line-clamp-1">
          {mod.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
          {mod.shortDesc}
        </p>

        {/* TitleID & Path preview */}
        {mod.titleId && (
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 bg-zinc-950/80 px-2.5 py-1 rounded-lg border border-zinc-800/80">
            <span className="text-zinc-400">ID:</span>
            <span className="text-cyan-400/90 truncate">{mod.titleId}</span>
            <span className="ml-auto text-zinc-600 truncate">{mod.fileName}</span>
          </div>
        )}
      </div>

      {/* Card Footer / Stats & Actions */}
      <div className="p-4 pt-3 mt-auto space-y-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {mod.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-0.5 bg-zinc-800/70 text-zinc-400 rounded-md border border-zinc-700/40"
            >
              #{tag}
            </span>
          ))}
          {mod.tags.length > 3 && (
            <span className="text-[10px] px-1.5 py-0.5 text-zinc-500 font-mono">
              +{mod.tags.length - 3}
            </span>
          )}
        </div>

        {/* Meta Stats & Author */}
        <div className="pt-2 border-t border-zinc-800/70 flex items-center justify-between text-[11px] text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-amber-400 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              {mod.rating.toFixed(2)}
            </span>
            <span className="text-zinc-500 flex items-center gap-1" title="Общее количество загрузок программы пользователями в мире">
              <Download className="w-3 h-3 text-zinc-600" />
              {mod.downloadsCount >= 1000000
                ? `${(mod.downloadsCount / 1000000).toFixed(1)} млн скачиваний`
                : `${Math.round(mod.downloadsCount / 1000)} тыс. скачиваний`}
            </span>
          </div>
          <span className="font-mono text-zinc-300 font-medium">
            {mod.fileSizeFormatted}
          </span>
        </div>

        {/* Download & Details Button Row */}
        <div className="flex items-center gap-2">
          {/* Details Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(mod);
            }}
            className="flex-1 py-2 px-3 bg-zinc-800/90 hover:bg-zinc-700/90 text-zinc-200 text-xs font-medium rounded-xl border border-zinc-700/60 transition-all flex items-center justify-center gap-1.5"
            aria-label={`Подробнее о ${mod.title}`}
          >
            <Eye className="w-3.5 h-3.5 text-zinc-400" />
            <span>Инструкция</span>
          </button>

          {/* Download Button */}
          <button
            type="button"
            onClick={handleDownloadClick}
            disabled={isDownloading}
            className={`flex-1 py-2 px-3 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm ${
              isCompleted
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25'
                : isDownloading
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 cursor-wait'
                : 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-zinc-950 font-bold shadow-cyan-500/10'
            }`}
            aria-label={`Скачать ${mod.title}`}
          >
            {isCompleted ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                <span>Загружен</span>
              </>
            ) : isDownloading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                <span>{downloadStatus?.progress || 0}%</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Скачать</span>
              </>
            )}
          </button>
        </div>

        {/* Live Progress Bar if actively downloading */}
        {isDownloading && (
          <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden -mt-1">
            <div
              className="bg-gradient-to-r from-cyan-400 to-indigo-400 h-1.5 rounded-full transition-all duration-150"
              style={{ width: `${downloadStatus?.progress || 0}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
