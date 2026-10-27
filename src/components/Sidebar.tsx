import React from 'react';
import {
  LayoutGrid,
  Cpu,
  Palette,
  Languages,
  Terminal,
  ShieldAlert,
  Gamepad2,
  Flame,
  Trophy,
  Shield,
  Eye,
  Trees,
  Swords,
  Compass,
  Target,
  Sliders,
  CheckCircle2,
  Info,
  Crosshair,
  Scale,
  Zap,
  Crown,
  Sparkles,
  Ghost
} from 'lucide-react';
import { GameId, ModCategory, ModCompatibility, ModItem } from '../types/mod.ts';
import { CATEGORIES, POPULAR_GAMES } from '../data/modsData.ts';

interface SidebarProps {
  selectedCategory: ModCategory;
  onSelectCategory: (category: ModCategory) => void;
  selectedGame: GameId;
  onSelectGame: (gameId: GameId) => void;
  compatibilityFilter: ModCompatibility | 'all';
  onSelectCompatibility: (comp: ModCompatibility | 'all') => void;
  allMods: ModItem[];
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedGame,
  onSelectGame,
  compatibilityFilter,
  onSelectCompatibility,
  allMods,
  isMobileOpen,
  onCloseMobile
}) => {
  // Compute counts
  const getCategoryCount = (catId: ModCategory) => {
    if (catId === 'all') return allMods.length;
    return allMods.filter((m) => m.category === catId).length;
  };

  const getGameCount = (gId: GameId) => {
    if (gId === 'all') return allMods.length;
    return allMods.filter((m) => m.gameId === gId).length;
  };

  const renderCategoryIcon = (iconName: string, active: boolean) => {
    const className = `w-4 h-4 transition-colors ${active ? 'text-cyan-400' : 'text-zinc-400'}`;
    switch (iconName) {
      case 'LayoutGrid':
        return <LayoutGrid className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      case 'Palette':
        return <Palette className={className} />;
      case 'Languages':
        return <Languages className={className} />;
      case 'Terminal':
        return <Terminal className={className} />;
      case 'ShieldAlert':
        return <ShieldAlert className={className} />;
      default:
        return <LayoutGrid className={className} />;
    }
  };

  const renderGameIcon = (icon: string, active: boolean) => {
    const className = `w-4 h-4 transition-colors ${active ? 'text-indigo-400' : 'text-zinc-500'}`;
    switch (icon) {
      case 'Gamepad2':
        return <Gamepad2 className={className} />;
      case 'Flame':
        return <Flame className={className} />;
      case 'Trophy':
        return <Trophy className={className} />;
      case 'Shield':
        return <Shield className={className} />;
      case 'Eye':
        return <Eye className={className} />;
      case 'Trees':
        return <Trees className={className} />;
      case 'Swords':
        return <Swords className={className} />;
      case 'Compass':
        return <Compass className={className} />;
      case 'Target':
        return <Target className={className} />;
      case 'Crosshair':
        return <Crosshair className={className} />;
      case 'Scale':
        return <Scale className={className} />;
      case 'Zap':
        return <Zap className={className} />;
      case 'Crown':
        return <Crown className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Ghost':
        return <Ghost className={className} />;
      case 'Sliders':
        return <Sliders className={className} />;
      default:
        return <Gamepad2 className={className} />;
    }
  };

  const content = (
    <div className="flex flex-col h-full overflow-y-auto pr-1 select-none space-y-6">
      {/* Compatibility Switcher */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Консоль
          </span>
          <span className="text-[10px] text-zinc-500 font-mono">CFW Luma3DS</span>
        </div>
        <div className="grid grid-cols-3 gap-1 bg-zinc-900/90 p-1 rounded-xl border border-zinc-800">
          <button
            type="button"
            onClick={() => onSelectCompatibility('all')}
            className={`py-1 text-xs font-medium rounded-lg transition-all ${
              compatibilityFilter === 'all'
                ? 'bg-zinc-800 text-white shadow-xs'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Все
          </button>
          <button
            type="button"
            onClick={() => onSelectCompatibility('both')}
            className={`py-1 text-xs font-medium rounded-lg transition-all ${
              compatibilityFilter === 'both'
                ? 'bg-zinc-800 text-cyan-400 shadow-xs'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            O3DS
          </button>
          <button
            type="button"
            onClick={() => onSelectCompatibility('new-3ds-only')}
            className={`py-1 text-xs font-medium rounded-lg transition-all ${
              compatibilityFilter === 'new-3ds-only'
                ? 'bg-zinc-800 text-indigo-400 shadow-xs'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            N3DS
          </button>
        </div>
      </div>

      {/* Categories Filter */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
            Категории модов
          </span>
          <span className="text-[11px] text-zinc-500">
            {CATEGORIES.length - 1} видов
          </span>
        </div>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count = getCategoryCount(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  onSelectCategory(cat.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-950/80 to-zinc-900 text-cyan-300 border border-cyan-800/40 shadow-sm shadow-cyan-950/40'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {renderCategoryIcon(cat.iconName, isActive)}
                  <span className="truncate">{cat.name}</span>
                </div>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300'
                      : 'bg-zinc-800/80 text-zinc-500 group-hover:text-zinc-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Games Filter */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
            Фильтр по играм
          </span>
          <span className="text-[11px] text-zinc-500">
            {POPULAR_GAMES.length - 1} тайтлов
          </span>
        </div>
        <div className="space-y-1">
          {POPULAR_GAMES.map((game) => {
            const isActive = selectedGame === game.id;
            const count = getGameCount(game.id);
            return (
              <button
                key={game.id}
                type="button"
                onClick={() => {
                  onSelectGame(game.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-950/80 to-zinc-900 text-indigo-300 border border-indigo-800/40 shadow-sm shadow-indigo-950/40'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {renderGameIcon(game.icon, isActive)}
                  <span className="truncate">{game.name}</span>
                </div>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                    isActive
                      ? 'bg-indigo-500/20 text-indigo-300'
                      : 'bg-zinc-800/80 text-zinc-500 group-hover:text-zinc-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3DS Console Status & Rosalina Shortcut Widget */}
      <div className="p-3.5 bg-zinc-900/60 rounded-2xl border border-zinc-800/80 space-y-2.5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-semibold text-zinc-300">CFW Готов к установке</span>
        </div>
        <div className="text-[11px] text-zinc-400 space-y-1 leading-relaxed font-mono">
          <div className="flex justify-between">
            <span className="text-zinc-500">Меню Rosalina:</span>
            <span className="text-zinc-300">L + Down + Select</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Luma меню:</span>
            <span className="text-zinc-300">Select при старте</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Путь SD:</span>
            <span className="text-cyan-400">sdmc:/</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 h-[calc(100vh-4rem)] sticky top-16 p-4 border-r border-zinc-800/80 bg-zinc-950/50">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-zinc-950 border-r border-zinc-800 p-4 shadow-2xl z-50 overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800">
              <span className="font-bold text-white text-sm">Фильтры каталога</span>
              <button
                type="button"
                onClick={onCloseMobile}
                className="text-zinc-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
};
