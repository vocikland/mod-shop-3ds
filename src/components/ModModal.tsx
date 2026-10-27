import React, { useState } from 'react';
import {
  X,
  Download,
  FolderTree,
  Check,
  Copy,
  Info,
  Calendar,
  User,
  HardDrive,
  FileCode,
  ShieldCheck,
  Star,
  ExternalLink,
  ChevronRight,
  Folder,
  File,
  HelpCircle,
  Clock,
  Sparkles,
  Loader2,
  Gamepad2,
  Cpu,
  Layers,
  Terminal,
  Languages,
  Palette,
  ShieldAlert
} from 'lucide-react';
import { ModItem, SdTreeNode } from '../types/mod.ts';
import { useDownloads } from '../context/DownloadContext.tsx';

interface ModModalProps {
  mod: ModItem | null;
  onClose: () => void;
}

export const ModModal: React.FC<ModModalProps> = ({ mod, onClose }) => {
  const { startDownload, getModDownloadStatus } = useDownloads();
  const [activeTab, setActiveTab] = useState<'overview' | 'sd-guide' | 'changelog'>('overview');
  const [copiedPath, setCopiedPath] = useState(false);

  if (!mod) return null;

  const downloadStatus = getModDownloadStatus(mod.id);
  const isDownloading = downloadStatus?.status === 'downloading';
  const isCompleted = downloadStatus?.status === 'completed';

  const handleCopyPath = () => {
    navigator.clipboard.writeText(mod.sdCardPath);
    setCopiedPath(true);
    setTimeout(() => setCopiedPath(false), 2000);
  };

  const renderCategoryIcon = (category: string) => {
    switch (category) {
      case 'luma-plugins':
        return <Cpu className="w-4 h-4 text-indigo-400" />;
      case 'custom-themes':
        return <Palette className="w-4 h-4 text-fuchsia-400" />;
      case 'rus-translations':
        return <Languages className="w-4 h-4 text-emerald-400" />;
      case 'homebrew-apps':
        return <Terminal className="w-4 h-4 text-amber-400" />;
      case 'cheats-saves':
        return <ShieldAlert className="w-4 h-4 text-rose-400" />;
      default:
        return <FileCode className="w-4 h-4 text-cyan-400" />;
    }
  };

  const renderTreeNodes = (nodes: SdTreeNode[], depth = 0) => {
    return (
      <div className="space-y-1">
        {nodes.map((node, index) => {
          const isFolder = node.type === 'folder';
          return (
            <div key={index} className="flex flex-col">
              <div
                className={`flex items-center gap-2 py-1 px-2 rounded-lg text-xs font-mono transition-colors ${
                  node.highlight
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold'
                    : 'text-zinc-300 hover:bg-zinc-800/60'
                }`}
                style={{ paddingLeft: `${depth * 18 + 8}px` }}
              >
                {isFolder ? (
                  <Folder className={`w-3.5 h-3.5 shrink-0 ${node.highlight ? 'text-cyan-400' : 'text-amber-400'}`} />
                ) : (
                  <File className={`w-3.5 h-3.5 shrink-0 ${node.highlight ? 'text-cyan-400' : 'text-zinc-400'}`} />
                )}
                <span className="truncate">{node.name}</span>
                {node.note && (
                  <span className="ml-auto text-[10px] text-zinc-500 font-sans italic truncate">
                    — {node.note}
                  </span>
                )}
              </div>
              {node.children && node.children.length > 0 && renderTreeNodes(node.children, depth + 1)}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="relative p-5 sm:p-6 border-b border-zinc-800/90 bg-gradient-to-r from-zinc-900 to-zinc-950">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors"
            aria-label="Закрыть модальное окно"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2 pr-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-lg bg-zinc-900 text-zinc-200 border border-zinc-800">
              {renderCategoryIcon(mod.category)}
              <span>{mod.categoryName}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-lg bg-zinc-800 text-zinc-300 border border-zinc-700">
              <Gamepad2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{mod.gameTitle}</span>
            </span>
            <span className="px-2 py-0.5 text-xs font-mono font-semibold rounded-lg bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
              {mod.version}
            </span>
            <span className="px-2 py-0.5 text-xs font-mono rounded-lg bg-zinc-900 text-zinc-400 border border-zinc-800">
              {mod.compatibility === 'new-3ds-only' ? 'New 3DS only' : 'O3DS & N3DS'}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
            {mod.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-zinc-500" />
              Автор: <strong className="text-zinc-200">{mod.author}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" />
              Обновлено: <span className="text-zinc-300">{mod.updateDate}</span>
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <strong>{mod.rating.toFixed(2)}</strong> ({mod.ratingCount} оценок)
            </span>
            <span className="flex items-center gap-1 text-zinc-400">
              <Download className="w-3.5 h-3.5 text-zinc-500" />
              Популярность: <strong className="text-zinc-200">
                {mod.downloadsCount >= 1000000
                  ? `${(mod.downloadsCount / 1000000).toFixed(1)} млн загрузок`
                  : `${Math.round(mod.downloadsCount / 1000)} тыс. загрузок`}
              </strong>
            </span>
            {mod.titleId && (
              <span className="font-mono text-[11px] bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 text-zinc-400">
                TitleID: {mod.titleId}
              </span>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center px-6 border-b border-zinc-800 bg-zinc-900/50">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>Обзор и описание</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sd-guide')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'sd-guide'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span>Установка на SD-карту</span>
            <span className="px-1.5 py-0.2 text-[10px] bg-cyan-500/20 text-cyan-300 rounded font-mono">
              Важно
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('changelog')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'changelog'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>История версий</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Package Summary Card (Clean, no image) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 space-y-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 block">
                    Размер архива
                  </span>
                  <span className="font-mono text-sm font-bold text-white">
                    {mod.fileSizeFormatted}
                  </span>
                </div>
                <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 space-y-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 block">
                    Имя файла
                  </span>
                  <span className="font-mono text-xs font-medium text-cyan-400 truncate block">
                    {mod.downloadFileName}
                  </span>
                </div>
                <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 space-y-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 block">
                    Формат
                  </span>
                  <span className="font-mono text-xs font-medium text-zinc-300">
                    ZIP Archive
                  </span>
                </div>
                <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 space-y-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 block">
                    CFW Совместимость
                  </span>
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Luma3DS v9+
                  </span>
                </div>
              </div>

              {/* Full Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Описание модификации
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/60">
                  {mod.fullDesc}
                </p>
              </div>

              {/* Tags */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Теги
                </h4>
                <div className="flex flex-wrap gap-2">
                  {mod.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 bg-zinc-900 text-zinc-300 rounded-lg border border-zinc-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="p-4 bg-zinc-900/70 rounded-xl border border-zinc-800 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Системные требования и зависимости
                </h4>
                <ul className="space-y-1.5 text-xs text-zinc-400">
                  {mod.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'sd-guide' && (
            <div className="space-y-6">
              {/* Target SD Path banner with copy button */}
              <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                    <HardDrive className="w-4 h-4 text-cyan-400" />
                    Целевой путь на SD-карте
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyPath}
                    className="flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 px-2.5 py-1 rounded-lg border border-cyan-500/30 transition-all"
                  >
                    {copiedPath ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Скопировано!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Скопировать путь</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="font-mono text-xs sm:text-sm text-cyan-300 bg-zinc-950 p-3 rounded-lg border border-zinc-800 break-all select-all">
                  {mod.sdCardPath}
                </div>
              </div>

              {/* Interactive File System Visualizer */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                  <FolderTree className="w-4 h-4 text-amber-400" />
                  Структура папок на SD-карте
                </h4>
                <div className="p-3 bg-zinc-900/90 rounded-xl border border-zinc-800 max-h-60 overflow-y-auto">
                  {mod.sdCardTree.length > 0 ? (
                    renderTreeNodes(mod.sdCardTree)
                  ) : (
                    <div className="text-xs font-mono text-cyan-400 py-1">
                      {mod.sdCardPath}
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-zinc-500 mt-1.5">
                  * Подсвеченные голубым файлы и папки будут помещены в соответствующие директории.
                </p>
              </div>

              {/* Step-by-Step Instructions */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-3">
                  Пошаговая инструкция по установке
                </h4>
                <div className="space-y-2.5">
                  {mod.installSteps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-zinc-900/60 rounded-xl border border-zinc-800/80 text-xs text-zinc-300"
                    >
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-[11px] shrink-0">
                        {index + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rosalina & Hotkeys Cheat Note */}
              <div className="p-3.5 bg-indigo-950/30 border border-indigo-900/50 rounded-xl text-xs text-indigo-200 space-y-1">
                <span className="font-semibold block text-indigo-300">
                  Полезная комбинация клавиш:
                </span>
                <p className="text-zinc-400">
                  Для вызова меню <strong className="text-white">Rosalina</strong> в любой момент игры зажмите{' '}
                  <kbd className="px-1.5 py-0.5 bg-zinc-900 text-zinc-200 border border-zinc-700 rounded font-mono text-[11px]">
                    L + Вниз + Select
                  </kbd>
                  . Там можно включить Plugin Loader или активировать читы.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'changelog' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                История изменений
              </h4>
              {mod.changelog && mod.changelog.length > 0 ? (
                <div className="space-y-3">
                  {mod.changelog.map((log, index) => (
                    <div
                      key={index}
                      className="p-3.5 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-cyan-400">
                          {log.version}
                        </span>
                        <span className="text-[11px] text-zinc-500">{log.date}</span>
                      </div>
                      <ul className="text-xs text-zinc-300 space-y-1 list-disc list-inside">
                        {log.notes.map((note, ni) => (
                          <li key={ni}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-zinc-500 bg-zinc-900/40 rounded-xl border border-zinc-800">
                  Актуальная стабильная версия {mod.version}. Все файлы проверены на совместимость с Luma3DS.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer / Action bar */}
        <div className="p-4 sm:p-5 border-t border-zinc-800 bg-zinc-900/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-zinc-400 text-center sm:text-left">
            <span className="block text-zinc-300 font-medium">
              Архив готов к распаковке на SD
            </span>
            <span className="font-mono text-zinc-500">
              {mod.downloadFileName} ({mod.fileSizeFormatted})
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 rounded-xl transition-colors"
            >
              Закрыть
            </button>

            <button
              type="button"
              onClick={() => startDownload(mod)}
              disabled={isDownloading}
              className={`flex-1 sm:flex-initial px-6 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg ${
                isCompleted
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                  : isDownloading
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 cursor-wait'
                  : 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-zinc-950 shadow-cyan-500/20'
              }`}
            >
              {isCompleted ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                  <span>Скачано повторно</span>
                </>
              ) : isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                  <span>Скачивание ({downloadStatus?.progress}%)</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Скачать модификацию</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
