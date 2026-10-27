export type ModCategory =
  | 'all'
  | 'luma-plugins'
  | 'custom-themes'
  | 'rus-translations'
  | 'homebrew-apps'
  | 'cheats-saves';

export type GameId =
  | 'all'
  | 'pokemon-usum'
  | 'mario-kart-7'
  | 'mario-3d-land'
  | 'zelda-oot-3d'
  | 'zelda-mm-3d'
  | 'animal-crossing'
  | 'smash-bros'
  | 'fire-emblem'
  | 'monster-hunter'
  | 'metroid'
  | 'ace-attorney'
  | 'xenoblade'
  | 'kid-icarus'
  | 'dragon-quest'
  | 'yokai-watch'
  | 'system';

export type ModCompatibility = 'both' | 'new-3ds-only' | 'old-3ds-only';

export type SortOption =
  | 'popular'
  | 'rating'
  | 'newest'
  | 'size-desc'
  | 'size-asc'
  | 'name';

export interface SdTreeNode {
  name: string;
  type: 'folder' | 'file';
  highlight?: boolean;
  note?: string;
  children?: SdTreeNode[];
}

export interface ModItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: ModCategory;
  categoryName: string;
  gameId: GameId;
  gameTitle: string;
  author: string;
  version: string;
  rating: number;
  ratingCount: number;
  downloadsCount: number;
  releaseDate: string;
  updateDate: string;
  fileSizeFormatted: string;
  fileSizeBytes: number;
  fileName: string;
  downloadFileName: string;
  tags: string[];
  imageUrl?: string;
  previewImages?: string[];
  source?: 'GameBanana' | 'GameBrew' | 'Community' | string;
  compatibility: ModCompatibility;
  titleId?: string;
  sdCardPath: string;
  sdCardTree: SdTreeNode[];
  installSteps: string[];
  requirements: string[];
  changelog?: { version: string; date: string; notes: string[] }[];
  fileContentsMock?: Record<string, string>;
}

export interface DownloadTask {
  id: string;
  modId: string;
  title: string;
  fileName: string;
  downloadFileName: string;
  category: ModCategory;
  gameTitle: string;
  totalBytes: number;
  downloadedBytes: number;
  progress: number; // 0 - 100
  speedFormatted: string;
  status: 'queued' | 'downloading' | 'paused' | 'completed' | 'failed';
  error?: string;
  startedAt: number;
  completedAt?: number;
}
