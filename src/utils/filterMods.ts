import { GameId, ModCategory, ModCompatibility, ModItem, SortOption } from '../types/mod.ts';

export interface FilterOptions {
  category: ModCategory;
  gameId: GameId;
  searchQuery: string;
  sortBy: SortOption;
  compatibility?: ModCompatibility | 'all';
}

export function filterMods(mods: ModItem[], options: FilterOptions): ModItem[] {
  const { category, gameId, searchQuery, sortBy, compatibility } = options;
  const query = searchQuery.trim().toLowerCase();

  const filtered = mods.filter((mod) => {
    // Category filter
    if (category !== 'all' && mod.category !== category) {
      return false;
    }

    // Game filter
    if (gameId !== 'all' && mod.gameId !== gameId) {
      return false;
    }

    // Compatibility filter
    if (compatibility && compatibility !== 'all') {
      if (compatibility === 'new-3ds-only' && mod.compatibility !== 'new-3ds-only') {
        return false;
      }
      if (compatibility === 'old-3ds-only' && mod.compatibility !== 'old-3ds-only' && mod.compatibility !== 'both') {
        return false;
      }
    }

    // Search query filter
    if (query) {
      const matchTitle = mod.title.toLowerCase().includes(query);
      const matchShortDesc = mod.shortDesc.toLowerCase().includes(query);
      const matchAuthor = mod.author.toLowerCase().includes(query);
      const matchGameTitle = mod.gameTitle.toLowerCase().includes(query);
      const matchTags = mod.tags.some((tag) => tag.toLowerCase().includes(query));
      const matchTitleId = mod.titleId ? mod.titleId.toLowerCase().includes(query) : false;

      if (!matchTitle && !matchShortDesc && !matchAuthor && !matchGameTitle && !matchTags && !matchTitleId) {
        return false;
      }
    }

    return true;
  });

  // Sorting
  return filtered.sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.downloadsCount - a.downloadsCount;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime();
      case 'size-desc':
        return b.fileSizeBytes - a.fileSizeBytes;
      case 'size-asc':
        return a.fileSizeBytes - b.fileSizeBytes;
      case 'name':
        return a.title.localeCompare(b.title, 'ru', { sensitivity: 'base' });
      default:
        return 0;
    }
  });
}
