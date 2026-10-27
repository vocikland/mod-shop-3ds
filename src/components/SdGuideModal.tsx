import React from 'react';
import {
  X,
  HardDrive,
  FolderTree,
  Folder,
  FileText,
  Key,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';

interface SdGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SdGuideModal: React.FC<SdGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Гид по файловой системе SD-карты 3DS</h2>
              <p className="text-xs text-zinc-400">Структура папок Luma3DS, Homebrew и горячие клавиши</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Key Folders Guide */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
              <FolderTree className="w-4 h-4" />
              Основные директории консоли (sdmc:/)
            </h3>
            <div className="grid gap-2.5">
              <div className="p-3 bg-zinc-900/70 rounded-xl border border-zinc-800 space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-cyan-300">
                  <Folder className="w-4 h-4 text-amber-400" />
                  sdmc:/luma/plugins/&lt;TitleID&gt;/
                </div>
                <p className="text-xs text-zinc-400 pl-6">
                  Для внутриигровых плагинов CTRPluginFramework (<code className="text-cyan-400">plugin.plg</code> или <code className="text-cyan-400">plugin.3gx</code>). Требуется активный Plugin Loader в меню Rosalina.
                </p>
              </div>

              <div className="p-3 bg-zinc-900/70 rounded-xl border border-zinc-800 space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-cyan-300">
                  <Folder className="w-4 h-4 text-amber-400" />
                  sdmc:/luma/titles/&lt;TitleID&gt;/romfs/
                </div>
                <p className="text-xs text-zinc-400 pl-6">
                  Для русификаторов и текстурных модов LayeredFS. Заменяет оригинальные игровые ресурсы без перезаписи рома игры.
                </p>
              </div>

              <div className="p-3 bg-zinc-900/70 rounded-xl border border-zinc-800 space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-cyan-300">
                  <Folder className="w-4 h-4 text-amber-400" />
                  sdmc:/Themes/
                </div>
                <p className="text-xs text-zinc-400 pl-6">
                  Для кастомных тем меню Home. Сюда закидываются папки с файлами <code className="text-zinc-300">body_LZ.bin</code>, <code className="text-zinc-300">bgm.bcstm</code> и устанавливаются через Anemone3DS.
                </p>
              </div>

              <div className="p-3 bg-zinc-900/70 rounded-xl border border-zinc-800 space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-cyan-300">
                  <Folder className="w-4 h-4 text-amber-400" />
                  sdmc:/cias/
                </div>
                <p className="text-xs text-zinc-400 pl-6">
                  Для установочных пакетов игр и утилит (<code className="text-zinc-300">.cia</code>). Устанавливаются через приложение FBI.
                </p>
              </div>

              <div className="p-3 bg-zinc-900/70 rounded-xl border border-zinc-800 space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-cyan-300">
                  <Folder className="w-4 h-4 text-amber-400" />
                  sdmc:/cheats/&lt;TitleID&gt;.txt
                </div>
                <p className="text-xs text-zinc-400 pl-6">
                  Текстовые базы чит-кодов для меню Rosalina или Gateway.
                </p>
              </div>
            </div>
          </div>

          {/* Button Combos */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3 flex items-center gap-2">
              <Key className="w-4 h-4" />
              Комбинации кнопок Nintendo 3DS
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-xl border border-zinc-800">
                <span className="text-zinc-300">Меню Rosalina (в игре):</span>
                <kbd className="px-2 py-1 bg-zinc-900 text-cyan-300 border border-zinc-700 rounded-md font-mono font-semibold">
                  L + Вниз + Select
                </kbd>
              </div>
              <div className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-xl border border-zinc-800">
                <span className="text-zinc-300">Настройки Luma3DS (при включении):</span>
                <kbd className="px-2 py-1 bg-zinc-900 text-cyan-300 border border-zinc-700 rounded-md font-mono font-semibold">
                  Удерживать [Select]
                </kbd>
              </div>
              <div className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-xl border border-zinc-800">
                <span className="text-zinc-300">Запуск GodMode9 (при включении):</span>
                <kbd className="px-2 py-1 bg-zinc-900 text-cyan-300 border border-zinc-700 rounded-md font-mono font-semibold">
                  Удерживать [Start]
                </kbd>
              </div>
            </div>
          </div>

          {/* SD Card formatting reminder */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-amber-300 font-semibold mb-0.5">
                Форматирование карт памяти больше 32 ГБ:
              </strong>
              Nintendo 3DS распознает только файловую систему FAT32. Для карт памяти 64 ГБ или 128 ГБ используйте утилиту FAT32 Format (GUIFormat) и размер кластера 32KB (или 64KB для ускорения загрузки тем).
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/70 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-zinc-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
};
