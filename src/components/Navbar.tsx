import React from 'react';
import {
  Download,
  Search,
  HardDrive,
  Sparkles,
  Menu,
  X,
  SlidersHorizontal
} from 'lucide-react';
import { useDownloads } from '../context/DownloadContext.tsx';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenSdGuide: () => void;
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
  totalModsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
  onOpenSdGuide,
  onToggleMobileMenu,
  isMobileMenuOpen,
  totalModsCount
}) => {
  const { activeCount, setIsQueueOpen, downloads } = useDownloads();

  return (
    <header className="sticky top-0 z-30 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-4 lg:px-6 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-colors"
            aria-label="Переключить меню"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5 group cursor-pointer select-none">
            {/* 3DS Console Badge Icon */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-[1px] shadow-lg shadow-cyan-500/10">
              <div className="w-full h-full bg-zinc-950 rounded-[11px] flex flex-col items-center justify-center gap-[3px] p-1.5 transition-transform group-hover:scale-105">
                {/* Top Screen */}
                <div className="w-5 h-2.5 bg-gradient-to-r from-cyan-400 to-indigo-400 rounded-xs opacity-90 shadow-xs" />
                {/* Bottom Screen */}
                <div className="w-4 h-2 bg-zinc-700 rounded-xs flex items-center justify-center">
                  <div className="w-1.5 h-1 bg-cyan-400/80 rounded-[1px]" />
                </div>
              </div>
              {/* StreetPass LED Indicator */}
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-zinc-950" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-white text-lg">
                  3DS <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">ModStation</span>
                </span>
                <span className="hidden sm:inline-flex px-1.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded">
                  CFW Vault
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 hidden sm:block">
                Каталог плагинов, тем и русификаторов
              </p>
            </div>
          </div>
        </div>

        {/* Center: Search input */}
        <div className="flex-1 max-w-md mx-2 sm:mx-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-cyan-400 transition-colors">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по названию, автору, тегу или TitleID..."
              className="w-full pl-9 pr-8 py-2 bg-zinc-900/90 text-sm text-zinc-100 placeholder-zinc-500 border border-zinc-800 rounded-xl focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-zinc-400 hover:text-white"
                aria-label="Очистить поиск"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* SD Card Guide Button */}
          <button
            type="button"
            onClick={onOpenSdGuide}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-800/90 hover:text-white border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all"
            title="Инструкция по структуре папок SD-карты"
          >
            <HardDrive className="w-4 h-4 text-cyan-400" />
            <span>Гид по SD-карте</span>
          </button>

          {/* Downloads Queue Button */}
          <button
            type="button"
            onClick={() => setIsQueueOpen(true)}
            className={`relative flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl border transition-all ${
              activeCount > 0
                ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800/90 hover:text-white hover:border-zinc-700'
            }`}
            aria-label="Открыть очередь загрузок"
          >
            <div className="relative">
              <Download
                className={`w-4 h-4 ${
                  activeCount > 0 ? 'text-cyan-400 animate-bounce' : 'text-zinc-400'
                }`}
              />
              {activeCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                </span>
              )}
            </div>
            <span className="hidden sm:inline">Загрузки</span>
            {downloads.length > 0 && (
              <span
                className={`px-1.5 py-0.2 text-[10px] font-mono font-bold rounded-md ${
                  activeCount > 0
                    ? 'bg-cyan-500 text-zinc-950'
                    : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {activeCount > 0 ? activeCount : downloads.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
