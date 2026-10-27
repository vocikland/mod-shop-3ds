import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import JSZip from 'jszip';
import confetti from 'canvas-confetti';
import { DownloadTask, ModItem } from '../types/mod.ts';

interface DownloadContextType {
  downloads: DownloadTask[];
  activeCount: number;
  isQueueOpen: boolean;
  setIsQueueOpen: (open: boolean) => void;
  startDownload: (mod: ModItem) => void;
  pauseDownload: (taskId: string) => void;
  resumeDownload: (taskId: string) => void;
  cancelDownload: (taskId: string) => void;
  clearCompleted: () => void;
  getModDownloadStatus: (modId: string) => DownloadTask | undefined;
}

const DownloadContext = createContext<DownloadContextType | undefined>(undefined);

export const DownloadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [downloads, setDownloads] = useState<DownloadTask[]>([]);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const activeTasksRef = useRef<Map<string, { intervalId: NodeJS.Timeout; mod: ModItem }>>(new Map());

  // Trigger real file download using JSZip
  const triggerRealZipDownload = async (mod: ModItem) => {
    try {
      const zip = new JSZip();

      // Create a comprehensive installation README
      const readmeContent = `=====================================================
   3DS MODSTATION — ИНСТРУКЦИЯ ПО УСТАНОВКЕ
=====================================================
Модификация: ${mod.title}
Категория:   ${mod.categoryName}
Игра:        ${mod.gameTitle}
Версия:      ${mod.version}
Автор:       ${mod.author}
TitleID:     ${mod.titleId || 'N/A'}
Целевой путь на SD: ${mod.sdCardPath}

ТРЕБОВАНИЯ:
${mod.requirements.map((r, i) => `  ${i + 1}. ${r}`).join('\n')}

ШАГИ ПО УСТАНОВКЕ:
${mod.installSteps.map((s, i) => `  ${i + 1}. ${s}`).join('\n')}

СОВЕТЫ ПО LUMA3DS:
  - Чтобы зайти в настройки Luma3DS: удерживайте [Select] при включении консоли.
  - Чтобы открыть меню Rosalina во время игры: нажмите [L] + [Вниз] + [Select].
  - Убедитесь, что в Luma3DS включена опция "Enable game patching".
  - Для плагинов .plg / .3gx проверьте, что в меню Rosalina включен "Plugin Loader".

Сгенерировано через 3DS ModStation. Приятной игры!
=====================================================
`;
      zip.file('ИНСТРУКЦИЯ_ПО_УСТАНОВКЕ.txt', readmeContent);

      // Create SD card structure in zip
      // Clean up path from "sdmc:/"
      const relativePath = mod.sdCardPath.replace(/^sdmc:\//, '');
      const parts = relativePath.split('/');
      const fileName = parts[parts.length - 1];

      // Build mock binary/payload
      const payloadText = `[3DS ModStation Data Package]
Title: ${mod.title}
Version: ${mod.version}
Build: Release
Binary payload for ${mod.gameTitle}
`;

      zip.file(relativePath, payloadText);

      // If it's a theme, add extra companion files
      if (mod.category === 'custom-themes') {
        const themeDir = relativePath.endsWith('/') ? relativePath : relativePath.substring(0, relativePath.lastIndexOf('/') + 1);
        zip.file(`${themeDir}info.smdh`, 'Nintendo 3DS Theme Icon Data');
        zip.file(`${themeDir}body_LZ.bin`, 'Compressed UI Graphics LZ11');
      }

      // Generate blob and download
      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = mod.downloadFileName || `${mod.id}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Trigger celebratory confetti
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#06b6d4', '#6366f1', '#10b981', '#f59e0b']
      });
    } catch (e) {
      console.error('Failed to generate zip:', e);
    }
  };

  const startDownload = (mod: ModItem) => {
    // Check if task exists
    const existing = downloads.find((d) => d.modId === mod.id);
    if (existing && existing.status === 'downloading') {
      setIsQueueOpen(true);
      return;
    }

    const taskId = existing ? existing.id : `task-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const totalBytes = mod.fileSizeBytes;

    const newTask: DownloadTask = {
      id: taskId,
      modId: mod.id,
      title: mod.title,
      fileName: mod.fileName,
      downloadFileName: mod.downloadFileName,
      category: mod.category,
      gameTitle: mod.gameTitle,
      totalBytes,
      downloadedBytes: 0,
      progress: 0,
      speedFormatted: '0 MB/s',
      status: 'downloading',
      startedAt: Date.now()
    };

    setDownloads((prev) => {
      const filtered = prev.filter((d) => d.id !== taskId);
      return [newTask, ...filtered];
    });

    setIsQueueOpen(true);

    // Run realistic simulation
    runSimulation(taskId, mod, 0, totalBytes);
  };

  const runSimulation = (taskId: string, mod: ModItem, initialDownloaded: number, totalBytes: number) => {
    // Clear previous if any
    if (activeTasksRef.current.has(taskId)) {
      clearInterval(activeTasksRef.current.get(taskId)!.intervalId);
      activeTasksRef.current.delete(taskId);
    }

    let currentDownloaded = initialDownloaded;
    // Download in ~3 to 5 seconds depending on file size
    const steps = 40;
    const intervalMs = 100;
    const incrementPerStep = (totalBytes - initialDownloaded) / steps;

    const intervalId = setInterval(() => {
      // Add random jitter to speed
      const jitter = 0.7 + Math.random() * 0.6;
      const stepBytes = incrementPerStep * jitter;
      currentDownloaded = Math.min(totalBytes, currentDownloaded + stepBytes);

      const progress = Math.min(100, Math.round((currentDownloaded / totalBytes) * 100));
      const speedMBs = ((stepBytes / (intervalMs / 1000)) / (1024 * 1024)).toFixed(1);

      if (currentDownloaded >= totalBytes || progress >= 100) {
        clearInterval(intervalId);
        activeTasksRef.current.delete(taskId);

        setDownloads((prev) =>
          prev.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  downloadedBytes: totalBytes,
                  progress: 100,
                  speedFormatted: 'Завершено',
                  status: 'completed',
                  completedAt: Date.now()
                }
              : t
          )
        );

        // Trigger file download
        triggerRealZipDownload(mod);
      } else {
        setDownloads((prev) =>
          prev.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  downloadedBytes: Math.floor(currentDownloaded),
                  progress,
                  speedFormatted: `${speedMBs} MB/s`
                }
              : t
          )
        );
      }
    }, intervalMs);

    activeTasksRef.current.set(taskId, { intervalId, mod });
  };

  const pauseDownload = (taskId: string) => {
    if (activeTasksRef.current.has(taskId)) {
      clearInterval(activeTasksRef.current.get(taskId)!.intervalId);
      activeTasksRef.current.delete(taskId);
    }
    setDownloads((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: 'paused', speedFormatted: 'Пауза' } : t))
    );
  };

  const resumeDownload = (taskId: string) => {
    const task = downloads.find((d) => d.id === taskId);
    if (!task) return;

    setDownloads((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: 'downloading', speedFormatted: 'Возобновление...' } : t))
    );

    // Look up mod from task.modId
    // Since we need the mod, we can find it from task
    const mockMod: ModItem = {
      id: task.modId,
      title: task.title,
      fileName: task.fileName,
      downloadFileName: task.downloadFileName,
      category: task.category,
      gameTitle: task.gameTitle,
      fileSizeBytes: task.totalBytes,
      shortDesc: '',
      fullDesc: '',
      categoryName: '',
      gameId: 'all',
      author: '',
      version: '',
      rating: 5,
      ratingCount: 0,
      downloadsCount: 0,
      releaseDate: '',
      updateDate: '',
      fileSizeFormatted: '',
      tags: [],
      imageUrl: '',
      compatibility: 'both',
      sdCardPath: `sdmc:/mods/${task.fileName}`,
      sdCardTree: [],
      installSteps: ['Распакуйте в sdmc:/'],
      requirements: ['Luma3DS']
    };

    runSimulation(taskId, mockMod, task.downloadedBytes, task.totalBytes);
  };

  const cancelDownload = (taskId: string) => {
    if (activeTasksRef.current.has(taskId)) {
      clearInterval(activeTasksRef.current.get(taskId)!.intervalId);
      activeTasksRef.current.delete(taskId);
    }
    setDownloads((prev) => prev.filter((t) => t.id !== taskId));
  };

  const clearCompleted = () => {
    setDownloads((prev) => prev.filter((t) => t.status !== 'completed'));
  };

  const getModDownloadStatus = (modId: string) => {
    return downloads.find((d) => d.modId === modId);
  };

  const activeCount = downloads.filter((d) => d.status === 'downloading' || d.status === 'queued').length;

  useEffect(() => {
    return () => {
      // Clean up intervals on unmount
      activeTasksRef.current.forEach(({ intervalId }) => clearInterval(intervalId));
      activeTasksRef.current.clear();
    };
  }, []);

  return (
    <DownloadContext.Provider
      value={{
        downloads,
        activeCount,
        isQueueOpen,
        setIsQueueOpen,
        startDownload,
        pauseDownload,
        resumeDownload,
        cancelDownload,
        clearCompleted,
        getModDownloadStatus
      }}
    >
      {children}
    </DownloadContext.Provider>
  );
};

export const useDownloads = () => {
  const context = useContext(DownloadContext);
  if (!context) {
    throw new Error('useDownloads must be used within a DownloadProvider');
  }
  return context;
};
