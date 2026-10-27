import React from 'react';
import {
  X,
  Download,
  Pause,
  Play,
  Trash2,
  CheckCircle2,
  FileArchive,
  ArrowDownCircle,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import { useDownloads } from '../context/DownloadContext.tsx';
import { ModItem } from '../types/mod.ts';

interface DownloadQueueDrawerProps {
  allMods: ModItem[];
  onOpenModDetails: (mod: ModItem) => void;
}

export const DownloadQueueDrawer: React.FC<DownloadQueueDrawerProps> = ({
  allMods,
  onOpenModDetails
}) => {
  const {
    downloads,
    isQueueOpen,
    setIsQueueOpen,
    pauseDownload,
    resumeDownload,
    cancelDownload,
    clearCompleted,
    startDownload
  } = useDownloads();

  if (!isQueueOpen) return null;

  const activeDownloads = downloads.filter(
    (d) => d.status === 'downloading' || d.status === 'queued' || d.status === 'paused'
  );
  const completedDownloads = downloads.filter((d) => d.status === 'completed');

  const formatBytes = (bytes: number) => {
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
    return `${(bytes / 1024).toFixed(0)} KB`;
  };

  const handleOpenMod = (modId: string) => {
    const target = allMods.find((m) => m.id === modId);
    if (target) {
      setIsQueueOpen(false);
      onOpenModDetails(target);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div
        className="fixed inset-0"
        onClick={() => setIsQueueOpen(false)}
      />

      <div className="relative w-full max-w-md h-full bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col z-10 overflow-hidden">
        {/* Drawer Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Очередь загрузок</h3>
              <p className="text-[11px] text-zinc-400">
                {activeDownloads.length} активно, {completedDownloads.length} завершено
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {completedDownloads.length > 0 && (
              <button
                type="button"
                onClick={clearCompleted}
                className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-zinc-800/80 rounded-lg transition-colors text-xs flex items-center gap-1"
                title="Очистить завершенные"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsQueueOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
              aria-label="Закрыть панель загрузок"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Body / Scrollable List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {downloads.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
                <ArrowDownCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-300">Загрузок пока нет</p>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                  Нажмите кнопку «Скачать» на любой карточке мода, чтобы запустить скачивание архива с файлами для SD-карты.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Active Downloads Section */}
              {activeDownloads.length > 0 && (
                <div className="space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block px-1">
                    Активные задачи ({activeDownloads.length})
                  </span>
                  {activeDownloads.map((task) => (
                    <div
                      key={task.id}
                      className="p-3.5 bg-zinc-900/90 rounded-xl border border-zinc-800/90 space-y-2.5 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">
                            {task.title}
                          </h4>
                          <span className="text-[11px] text-zinc-400 block truncate">
                            {task.gameTitle} • {task.fileName}
                          </span>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-1 shrink-0">
                          {task.status === 'downloading' ? (
                            <button
                              type="button"
                              onClick={() => pauseDownload(task.id)}
                              className="p-1.5 text-zinc-400 hover:text-amber-400 hover:bg-zinc-800 rounded-lg transition-colors"
                              title="Пауза"
                            >
                              <Pause className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => resumeDownload(task.id)}
                              className="p-1.5 text-zinc-400 hover:text-cyan-400 hover:bg-zinc-800 rounded-lg transition-colors"
                              title="Возобновить"
                            >
                              <Play className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => cancelDownload(task.id)}
                            className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 rounded-lg transition-colors"
                            title="Отменить"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1">
                        <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-2 rounded-full transition-all duration-150"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                          <span>
                            {formatBytes(task.downloadedBytes)} / {formatBytes(task.totalBytes)} ({task.progress}%)
                          </span>
                          <span className="text-cyan-400 font-semibold">{task.speedFormatted}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Completed Downloads Section */}
              {completedDownloads.length > 0 && (
                <div className="space-y-3 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block px-1">
                    Завершенные ({completedDownloads.length})
                  </span>
                  {completedDownloads.map((task) => {
                    const mod = allMods.find((m) => m.id === task.modId);
                    return (
                      <div
                        key={task.id}
                        className="p-3 bg-zinc-900/50 rounded-xl border border-zinc-800/60 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-semibold text-zinc-200 truncate">
                              {task.title}
                            </h4>
                            <span className="text-[10px] text-zinc-500 font-mono block truncate">
                              {formatBytes(task.totalBytes)} • Готов к установке
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleOpenMod(task.modId)}
                            className="px-2.5 py-1 text-[11px] font-medium text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-lg border border-cyan-500/30 transition-colors"
                          >
                            Инструкция
                          </button>
                          {mod && (
                            <button
                              type="button"
                              onClick={() => startDownload(mod)}
                              className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                              title="Скачать повторно"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom Helper Note */}
        <div className="p-3 bg-zinc-900/90 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
          <span>Архивы скачиваются в папку «Загрузки» браузера</span>
        </div>
      </div>
    </div>
  );
};
