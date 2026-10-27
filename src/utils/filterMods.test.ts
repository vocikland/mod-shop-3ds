import test from 'node:test';
import assert from 'node:assert/strict';
import { filterMods, FilterOptions } from './filterMods.ts';
import { ModItem } from '../types/mod.ts';

const mockMods: ModItem[] = [
  {
    id: 'ctgp-7',
    title: 'CTGP-7 (Custom Track Grand Prix)',
    shortDesc: 'Огромный мод для Mario Kart 7 с 90+ кастомными трассами',
    fullDesc: 'Полное описание',
    category: 'luma-plugins',
    categoryName: 'Luma3DS Plugins',
    gameId: 'mario-kart-7',
    gameTitle: 'Mario Kart 7',
    author: 'PabloMK7',
    version: 'v1.4.3',
    rating: 4.95,
    ratingCount: 1420,
    downloadsCount: 520000,
    releaseDate: '2021-05-10',
    updateDate: '2024-02-15',
    fileSizeFormatted: '450 MB',
    fileSizeBytes: 471859200,
    fileName: 'CTGP-7.zip',
    downloadFileName: 'CTGP-7_v1.4.3.zip',
    tags: ['Трассы', 'Персонажи', 'Online', 'Custom Tracks'],
    imageUrl: '',
    compatibility: 'both',
    titleId: '0004000000030800',
    sdCardPath: 'sdmc:/CTGP-7/',
    sdCardTree: [],
    installSteps: [],
    requirements: ['Luma3DS v10+']
  },
  {
    id: 'zelda-oot-rus',
    title: 'Русификатор Zelda: Ocarina of Time 3D',
    shortDesc: 'Полный профессиональный перевод текста и текстур',
    fullDesc: 'Описание русификатора',
    category: 'rus-translations',
    categoryName: 'Русификаторы',
    gameId: 'zelda-oot-3d',
    gameTitle: 'The Legend of Zelda: Ocarina of Time 3D',
    author: 'Shedevr Team',
    version: 'v2.1',
    rating: 4.88,
    ratingCount: 890,
    downloadsCount: 185000,
    releaseDate: '2020-03-12',
    updateDate: '2023-11-20',
    fileSizeFormatted: '38 MB',
    fileSizeBytes: 39845888,
    fileName: 'zelda_oot_rus.zip',
    downloadFileName: 'zelda_oot_3d_rus_v2.1.zip',
    tags: ['Русский язык', 'Текстуры', 'Шедевр'],
    imageUrl: '',
    compatibility: 'both',
    titleId: '0004000000033500',
    sdCardPath: 'sdmc:/luma/titles/0004000000033500/romfs/',
    sdCardTree: [],
    installSteps: [],
    requirements: ['Luma3DS Game Patching']
  },
  {
    id: 'vapecord-acnl',
    title: 'Vapecord ACNL Plugin',
    shortDesc: 'Плагин читов и редактора мира для Animal Crossing: New Leaf',
    fullDesc: 'Описание плагина',
    category: 'luma-plugins',
    categoryName: 'Luma3DS Plugins',
    gameId: 'animal-crossing',
    gameTitle: 'Animal Crossing: New Leaf',
    author: 'RedShyGuy',
    version: 'v3.0.4',
    rating: 4.75,
    ratingCount: 650,
    downloadsCount: 310000,
    releaseDate: '2022-01-15',
    updateDate: '2023-08-01',
    fileSizeFormatted: '12 MB',
    fileSizeBytes: 12582912,
    fileName: 'vapecord.plg',
    downloadFileName: 'vapecord_acnl_v3.0.4.zip',
    tags: ['Читы', 'Plugin', 'Редактор'],
    imageUrl: '',
    compatibility: 'both',
    titleId: '0004000000086300',
    sdCardPath: 'sdmc:/luma/plugins/0004000000086300/plugin.plg',
    sdCardTree: [],
    installSteps: [],
    requirements: ['Luma3DS Plugin Loader']
  }
];

test('filterMods by category', () => {
  const options: FilterOptions = {
    category: 'rus-translations',
    gameId: 'all',
    searchQuery: '',
    sortBy: 'popular'
  };
  const result = filterMods(mockMods, options);
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'zelda-oot-rus');
});

test('filterMods by gameId', () => {
  const options: FilterOptions = {
    category: 'all',
    gameId: 'mario-kart-7',
    searchQuery: '',
    sortBy: 'popular'
  };
  const result = filterMods(mockMods, options);
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'ctgp-7');
});

test('filterMods by search query across title, author, and tags', () => {
  const options1: FilterOptions = {
    category: 'all',
    gameId: 'all',
    searchQuery: 'PabloMK7',
    sortBy: 'popular'
  };
  const res1 = filterMods(mockMods, options1);
  assert.equal(res1.length, 1);
  assert.equal(res1[0].id, 'ctgp-7');

  const options2: FilterOptions = {
    category: 'all',
    gameId: 'all',
    searchQuery: 'текстуры',
    sortBy: 'popular'
  };
  const res2 = filterMods(mockMods, options2);
  assert.equal(res2.length, 1);
  assert.equal(res2[0].id, 'zelda-oot-rus');
});

test('filterMods sorting by popularity and size', () => {
  const byPop = filterMods(mockMods, {
    category: 'all',
    gameId: 'all',
    searchQuery: '',
    sortBy: 'popular'
  });
  assert.equal(byPop[0].id, 'ctgp-7');
  assert.equal(byPop[1].id, 'vapecord-acnl');
  assert.equal(byPop[2].id, 'zelda-oot-rus');

  const bySizeAsc = filterMods(mockMods, {
    category: 'all',
    gameId: 'all',
    searchQuery: '',
    sortBy: 'size-asc'
  });
  assert.equal(bySizeAsc[0].id, 'vapecord-acnl'); // 12 MB
  assert.equal(bySizeAsc[1].id, 'zelda-oot-rus'); // 38 MB
  assert.equal(bySizeAsc[2].id, 'ctgp-7'); // 450 MB
});

test('MODS_DATA integrity and Yo-kai Watch coverage', async () => {
  const { MODS_DATA } = await import('../data/modsData.ts');
  assert.ok(MODS_DATA.length >= 200, `Expected at least 200 mods in catalog, found ${MODS_DATA.length}`);

  // Test ID uniqueness
  const ids = new Set<string>();
  for (const mod of MODS_DATA) {
    assert.ok(mod.id, 'Mod must have an id');
    assert.ok(!ids.has(mod.id), `Duplicate mod ID found: ${mod.id}`);
    ids.add(mod.id);
    assert.ok(mod.title, `Mod ${mod.id} missing title`);
    assert.ok(mod.downloadFileName, `Mod ${mod.id} missing downloadFileName`);
    assert.ok(mod.sdCardPath, `Mod ${mod.id} missing sdCardPath`);
  }

  // Test Yo-kai Watch mods
  const yokaiMods = MODS_DATA.filter(m => m.gameId === 'yokai-watch');
  assert.ok(yokaiMods.length >= 12, `Expected >= 12 Yo-kai Watch mods, found ${yokaiMods.length}`);

  // Verify all categories have mods
  const categories = ['luma-plugins', 'custom-themes', 'rus-translations', 'homebrew-apps', 'cheats-saves'] as const;
  for (const cat of categories) {
    const inCat = MODS_DATA.filter(m => m.category === cat);
    assert.ok(inCat.length >= 10, `Category ${cat} should have at least 10 mods, found ${inCat.length}`);
  }
});

