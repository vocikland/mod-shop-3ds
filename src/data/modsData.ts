import { GameId, ModCategory, ModItem } from '../types/mod.ts';
import { LUMA_PLUGINS_MODS } from './mods/lumaPlugins.ts';
import { RUS_TRANSLATIONS_MODS } from './mods/rusTranslations.ts';
import { HOMEBREW_APPS_MODS } from './mods/homebrewApps.ts';
import { CUSTOM_THEMES_MODS } from './mods/customThemes.ts';
import { CHEATS_SAVES_MODS } from './mods/cheatsSaves.ts';
import { YOKAI_WATCH_MODS } from './mods/yokaiWatchMods.ts';

export interface CategoryMeta {
  id: ModCategory;
  name: string;
  description: string;
  iconName: string;
  badgeColor: string;
}

export interface GameMeta {
  id: GameId;
  name: string;
  icon: string;
  coverColor: string;
  releaseYear: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'all',
    name: 'Все категории',
    description: 'Все доступные модификации, плагины и утилиты',
    iconName: 'LayoutGrid',
    badgeColor: 'bg-zinc-700/50 text-zinc-200 border-zinc-600/40'
  },
  {
    id: 'luma-plugins',
    name: 'Luma3DS Plugins',
    description: 'Плагины CTRPluginFramework, 60 FPS патчи и геймплейные моды с GameBanana',
    iconName: 'Cpu',
    badgeColor: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
  },
  {
    id: 'custom-themes',
    name: 'Custom Themes',
    description: 'Кастомные темы оформления для меню Home с музыкой BGM и звуками SFX',
    iconName: 'Palette',
    badgeColor: 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30'
  },
  {
    id: 'rus-translations',
    name: 'Русификаторы',
    description: 'Качественные русские локализации текста, озвучки и текстур от фанатских команд',
    iconName: 'Languages',
    badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
  },
  {
    id: 'homebrew-apps',
    name: 'Homebrew Apps',
    description: 'Приложения из каталога GameBrew: файловые менеджеры, эмуляторы, порты и NAND-утилиты',
    iconName: 'Terminal',
    badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30'
  },
  {
    id: 'cheats-saves',
    name: 'Читы/Сохранения',
    description: 'Базы кодов Sharkive, готовые 100% сохранения и скрипты PKSM',
    iconName: 'ShieldAlert',
    badgeColor: 'bg-rose-500/15 text-rose-300 border-rose-500/30'
  }
];

export const POPULAR_GAMES: GameMeta[] = [
  { id: 'all', name: 'Все игры', icon: 'Gamepad2', coverColor: 'from-slate-700 to-zinc-800', releaseYear: '2011-2024' },
  { id: 'yokai-watch', name: 'Yo-kai Watch 1, 2 & 3', icon: 'Ghost', coverColor: 'from-amber-500 to-red-600', releaseYear: '2013-2018' },
  { id: 'mario-kart-7', name: 'Mario Kart 7', icon: 'Trophy', coverColor: 'from-red-600 to-rose-800', releaseYear: '2011' },
  { id: 'pokemon-usum', name: 'Pokémon Ultra Sun/Moon', icon: 'Flame', coverColor: 'from-amber-600 to-orange-800', releaseYear: '2017' },
  { id: 'zelda-oot-3d', name: 'Zelda: Ocarina of Time 3D', icon: 'Shield', coverColor: 'from-emerald-600 to-teal-800', releaseYear: '2011' },
  { id: 'zelda-mm-3d', name: 'Zelda: Majora’s Mask 3D', icon: 'Eye', coverColor: 'from-purple-600 to-violet-900', releaseYear: '2015' },
  { id: 'mario-3d-land', name: 'Super Mario 3D Land', icon: 'Sparkles', coverColor: 'from-amber-500 to-red-700', releaseYear: '2011' },
  { id: 'animal-crossing', name: 'Animal Crossing: New Leaf', icon: 'Trees', coverColor: 'from-green-600 to-emerald-800', releaseYear: '2012' },
  { id: 'smash-bros', name: 'Super Smash Bros. for 3DS', icon: 'Swords', coverColor: 'from-blue-600 to-indigo-800', releaseYear: '2014' },
  { id: 'fire-emblem', name: 'Fire Emblem: Awakening / Fates', icon: 'Compass', coverColor: 'from-sky-600 to-cyan-800', releaseYear: '2012' },
  { id: 'monster-hunter', name: 'Monster Hunter 4 Ultimate', icon: 'Target', coverColor: 'from-yellow-600 to-amber-900', releaseYear: '2014' },
  { id: 'metroid', name: 'Metroid: Samus Returns', icon: 'Crosshair', coverColor: 'from-orange-600 to-amber-800', releaseYear: '2017' },
  { id: 'kid-icarus', name: 'Kid Icarus: Uprising', icon: 'Zap', coverColor: 'from-sky-500 to-indigo-700', releaseYear: '2012' },
  { id: 'dragon-quest', name: 'Dragon Quest VIII', icon: 'Crown', coverColor: 'from-blue-600 to-amber-700', releaseYear: '2015' },
  { id: 'ace-attorney', name: 'Ace Attorney Series', icon: 'Scale', coverColor: 'from-blue-700 to-sky-900', releaseYear: '2013' },
  { id: 'xenoblade', name: 'Xenoblade Chronicles 3D', icon: 'Flame', coverColor: 'from-red-700 to-rose-950', releaseYear: '2015' },
  { id: 'system', name: 'GameBrew Утилиты & Система', icon: 'Sliders', coverColor: 'from-zinc-600 to-zinc-900', releaseYear: 'System' }
];

export const MODS_DATA: ModItem[] = [
  ...YOKAI_WATCH_MODS,
  ...LUMA_PLUGINS_MODS,
  ...RUS_TRANSLATIONS_MODS,
  ...HOMEBREW_APPS_MODS,
  ...CUSTOM_THEMES_MODS,
  ...CHEATS_SAVES_MODS
];
