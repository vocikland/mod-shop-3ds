import React, { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  Flame,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle,
  HardDrive
} from 'lucide-react';
import { DownloadProvider } from './context/DownloadContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import { ModCard } from './components/ModCard.tsx';
import { ModModal } from './components/ModModal.tsx';
import { DownloadQueueDrawer } from './components/DownloadQueueDrawer.tsx';
import { SdGuideModal } from './components/SdGuideModal.tsx';
import { EmptyState } from './components/EmptyState.tsx';
import { QuickGameSelector } from './components/QuickGameSelector.tsx';
import { MODS_DATA, CATEGORIES, POPULAR_GAMES } from './data/modsData.ts';
import { filterMods } from './utils/filterMods.ts';
import { GameId, ModCategory, ModCompatibility, ModItem, SortOption } from './types/mod.ts';

export function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ModCategory>('all');
  const [selectedGame, setSelectedGame] = useState<GameId>('all');
  const [compatibilityFilter, setCompatibilityFilter] = useState<ModCompatibility | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  const [selectedModForModal, setSelectedModForModal] = useState<ModItem | null>(null);
  const [isSdGuideOpen, setIsSdGuideOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Compute filtered & sorted mods
  const filteredMods = useMemo(() => {
    return filterMods(MODS_DATA, {
      category: selectedCategory,
      gameId: selectedGame,
      searchQuery,
      sortBy,
      compatibility: compatibilityFilter
    });
  }, [selectedCategory, selectedGame, searchQuery, sortBy, compatibilityFilter]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedGame('all');
    setCompatibilityFilter('all');
    setSortBy('popular');
  };

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);
  const activeGameObj = POPULAR_GAMES.find((g) => g.id === selectedGame);
  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedGame !== 'all' ||
    compatibilityFilter !== 'all' ||
    searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-zinc-950">
      {/* Top Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenSdGuide={() => setIsSdGuideOpen(true)}
        onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
        isMobileMenuOpen={isMobileMenuOpen}
        totalModsCount={MODS_DATA.length}
      />

      {/* Main Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Left Sidebar */}
        <Sidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedGame={selectedGame}
          onSelectGame={setSelectedGame}
          compatibilityFilter={compatibilityFilter}
          onSelectCompatibility={setCompatibilityFilter}
          allMods={MODS_DATA}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Right Content Area */}
        <main className="flex-1 p-4 lg:p-6 min-w-0">
          {/* Quick Header Banner */}
          <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-indigo-950/30 border border-zinc-800/80 shadow-lg relative overflow-hidden">
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    Nintendo 3DS / New 3DS CFW Repository
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {selectedGame !== 'all' ? activeGameObj?.name : 'Каталог модификаций и софта'}
                </h1>
                <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                  {selectedCategory !== 'all'
                    ? activeCategoryObj?.description
                    : 'Загружайте плагины Luma3DS, русские переводы, темы и утилиты с готовой структурой папок для SD-карты.'}
                </p>
              </div>

              {/* Quick Actions / SD Card trigger */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsSdGuideOpen(true)}
                  className="px-3 py-2 bg-zinc-800/90 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold rounded-xl border border-zinc-700/80 flex items-center gap-1.5 transition-colors"
                >
                  <HardDrive className="w-4 h-4 text-cyan-400" />
                  <span>Куда копировать?</span>
                </button>
              </div>
            </div>

            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Quick Game Selector with smooth scroll and controls */}
          <QuickGameSelector
            selectedGame={selectedGame}
            onSelectGame={setSelectedGame}
            gamesList={POPULAR_GAMES}
          />

          {/* Controls Bar: Results count, active filter chips, Sorting */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-zinc-800/80">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-zinc-400">
                Найдено:{' '}
                <strong className="text-white font-mono">{filteredMods.length}</strong>{' '}
                {filteredMods.length === 1 ? 'мод' : filteredMods.length < 5 ? 'мода' : 'модов'}
              </span>

              {/* Active Filter Badges */}
              {hasActiveFilters && (
                <>
                  <span className="text-zinc-600">|</span>
                  {selectedCategory !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded-md">
                      {activeCategoryObj?.name}
                      <button
                        type="button"
                        onClick={() => setSelectedCategory('all')}
                        className="hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedGame !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 rounded-md">
                      {activeGameObj?.name}
                      <button
                        type="button"
                        onClick={() => setSelectedGame('all')}
                        className="hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {compatibilityFilter !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-md">
                      {compatibilityFilter === 'new-3ds-only' ? 'New 3DS' : 'O3DS'}
                      <button
                        type="button"
                        onClick={() => setCompatibilityFilter('all')}
                        className="hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-md">
                      «{searchQuery}»
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-[11px] text-zinc-500 hover:text-cyan-400 underline underline-offset-2 ml-1"
                  >
                    Сбросить
                  </button>
                </>
              )}
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs text-zinc-400 flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
                Сортировка:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-500/60"
              >
                <option value="popular">По популярности</option>
                <option value="rating">По рейтингу</option>
                <option value="newest">Сначала новые</option>
                <option value="size-desc">По размеру (большие)</option>
                <option value="size-asc">По размеру (маленькие)</option>
                <option value="name">По алфавиту (А-Я)</option>
              </select>
            </div>
          </div>

          {/* Cards Grid or Empty State */}
          {filteredMods.length === 0 ? (
            <EmptyState onReset={handleResetFilters} searchQuery={searchQuery} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredMods.map((mod) => (
                <ModCard
                  key={mod.id}
                  mod={mod}
                  onOpenDetails={(item) => setSelectedModForModal(item)}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Detail Modal for Selected Mod */}
      <ModModal
        mod={selectedModForModal}
        onClose={() => setSelectedModForModal(null)}
      />

      {/* Slide-over Downloads Queue Drawer */}
      <DownloadQueueDrawer
        allMods={MODS_DATA}
        onOpenModDetails={(mod) => setSelectedModForModal(mod)}
      />

      {/* SD Card Guide Modal */}
      <SdGuideModal
        isOpen={isSdGuideOpen}
        onClose={() => setIsSdGuideOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <DownloadProvider>
      <AppContent />
    </DownloadProvider>
  );
}
