import { ModItem } from '../../types/mod.ts';

export const YOKAI_WATCH_MODS: ModItem[] = [
  // ==================== YO-KAI WATCH 1 ====================
  {
    id: 'yw1-undub-mod',
    title: 'Yo-kai Watch 1: Japanese Undub & Restored Anime Openings',
    shortDesc: 'Возвращение оригинальной японской озвучки персонажей, оригинального саундтрека и культового опенинга «Gera Gera Po».',
    fullDesc: 'Патч для первой части Yo-kai Watch. Восстанавливает аутентичную японскую озвучку всех 200+ йо-каев, оригинальные реплики Нейта (Кейты), шепот Шепота (Виспер) и выкрики Джибаньяна, сохраняя английский или русский текст.',
    category: 'luma-plugins',
    categoryName: 'Luma3DS Plugins',
    gameId: 'yokai-watch',
    gameTitle: 'Yo-kai Watch 1, 2 & 3',
    author: 'UndubCommunity & GameBanana',
    version: 'v2.0',
    rating: 4.96,
    ratingCount: 1420,
    downloadsCount: 320000,
    releaseDate: '2020-05-10',
    updateDate: '2023-09-15',
    fileSizeFormatted: '185 MB',
    fileSizeBytes: 193986560,
    fileName: 'YW1_Undub_Luma.zip',
    downloadFileName: 'YokaiWatch1_Undub_v2.0.zip',
    tags: ['Yo-kai Watch', 'Undub', 'Gera Gera Po', 'Озвучка', 'GameBanana'],
    source: 'GameBanana',
    compatibility: 'both',
    titleId: '0004000000164600',
    sdCardPath: 'sdmc:/luma/titles/0004000000164600/romfs/sound/',
    sdCardTree: [
      {
        name: 'sdmc:',
        type: 'folder',
        children: [
          {
            name: 'luma',
            type: 'folder',
            children: [
              {
                name: 'titles',
                type: 'folder',
                children: [
                  {
                    name: '0004000000164600',
                    type: 'folder',
                    note: 'TitleID Yo-kai Watch 1 (EUR)',
                    children: [
                      {
                        name: 'romfs',
                        type: 'folder',
                        children: [{ name: 'sound', type: 'folder', highlight: true }]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    installSteps: [
      'Распакуйте папку sound в sdmc:/luma/titles/0004000000164600/romfs/',
      'Зажмите [Select] при включении 3DS, включите "Enable game patching" и нажмите Start.'
    ],
    requirements: ['Luma3DS CFW v9.0+']
  },
  {
    id: 'yw1-rus-translation',
    title: 'Русификатор Yo-kai Watch 1 (Полная локализация текста)',
    shortDesc: 'Качественный русский перевод от команды фанатов: все сюжетные задания, диалоги, профили 200+ йо-каев и описания предметов.',
    fullDesc: 'Огромная работа русскоязычного сообщества. Полностью переведен сюжет знакомства Нейта с Виспером и Джибаньяном, названия локаций Спрингдейла, реплики прохожих и описания способностей йо-каев.',
    category: 'rus-translations',
    categoryName: 'Русификаторы',
    gameId: 'yokai-watch',
    gameTitle: 'Yo-kai Watch 1, 2 & 3',
    author: 'Команда перевода Yo-kai Watch & Alliance',
    version: 'v1.5',
    rating: 4.95,
    ratingCount: 1680,
    downloadsCount: 290000,
    releaseDate: '2021-02-14',
    updateDate: '2023-10-20',
    fileSizeFormatted: '48 MB',
    fileSizeBytes: 50331648,
    fileName: 'YW1_Russian_Patch.zip',
    downloadFileName: 'YokaiWatch1_Rus_v1.5.zip',
    tags: ['Yo-kai Watch', 'Русский язык', 'Локализация', 'Джибаньян'],
    source: 'Community',
    compatibility: 'both',
    titleId: '0004000000164600',
    sdCardPath: 'sdmc:/luma/titles/0004000000164600/romfs/',
    sdCardTree: [
      {
        name: 'sdmc:',
        type: 'folder',
        children: [
          {
            name: 'luma',
            type: 'folder',
            children: [
              {
                name: 'titles',
                type: 'folder',
                children: [
                  {
                    name: '0004000000164600',
                    type: 'folder',
                    children: [{ name: 'romfs', type: 'folder', highlight: true }]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    installSteps: [
      'Скопируйте папку romfs в sdmc:/luma/titles/0004000000164600/',
      'Запустите игру с включенным game patching.'
    ],
    requirements: ['Luma3DS v9+']
  },
  {
    id: 'yw1-60fps-pandanoko',
    title: 'Yo-kai Watch 1: 60 FPS Patch & Pandanoko StreetPass Enabler',
    shortDesc: 'Патч снятия ограничения 30 FPS и мгновенное появление редчайшего йо-кая Панданоко в Wayfarer Manor без реального StreetPass.',
    fullDesc: 'Разблокирует плавные 60 кадров/сек в битвах и исследовании Спрингдейла. Также включает алгоритм гарантированного спавна легендарного Панданоко в гостинице Уэйферер Манор, которого без мода практически невозможно получить.',
    category: 'luma-plugins',
    categoryName: 'Luma3DS Plugins',
    gameId: 'yokai-watch',
    gameTitle: 'Yo-kai Watch 1, 2 & 3',
    author: 'KazoWAR & YW Community',
    version: 'v1.3',
    rating: 4.93,
    ratingCount: 980,
    downloadsCount: 175000,
    releaseDate: '2021-06-18',
    updateDate: '2023-04-12',
    fileSizeFormatted: '11 MB',
    fileSizeBytes: 11534336,
    fileName: 'YW1_60FPS_Pandanoko.zip',
    downloadFileName: 'YW1_60FPS_Pandanoko_Patch.zip',
    tags: ['GameBanana', 'Yo-kai Watch', '60 FPS', 'Pandanoko', 'StreetPass'],
    source: 'GameBanana',
    compatibility: 'both',
    titleId: '0004000000164600',
    sdCardPath: 'sdmc:/luma/titles/0004000000164600/code.bps',
    sdCardTree: [
      {
        name: 'sdmc:',
        type: 'folder',
        children: [
          {
            name: 'luma',
            type: 'folder',
            children: [
              {
                name: 'titles',
                type: 'folder',
                children: [
                  {
                    name: '0004000000164600',
                    type: 'folder',
                    children: [{ name: 'code.bps', type: 'file', highlight: true }]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    installSteps: ['Поместите code.bps в sdmc:/luma/titles/0004000000164600/'],
    requirements: ['Luma3DS CFW']
  },
  {
    id: 'yw1-100-save-medallium',
    title: '100% Сохранение Yo-kai Watch 1 (Весь Медаллиум и легендарные)',
    shortDesc: 'Полностью собранный Медаллиум из 223 йо-каев, все легендарные (Шогуньян, Гилгаро), 999 999 $ и открытый Инфернал Инфинити.',
    fullDesc: 'Максимальный сейв-файл для Checkpoint. Пройден бесконечный тоннель Инфернал Инфинити, побежден Войд, все любимые йо-каи прокачаны до 99 уровня.',
    category: 'cheats-saves',
    categoryName: 'Читы/Сохранения',
    gameId: 'yokai-watch',
    gameTitle: 'Yo-kai Watch 1, 2 & 3',
    author: 'YW Speedrun Club',
    version: 'v1.0',
    rating: 4.88,
    ratingCount: 740,
    downloadsCount: 165000,
    releaseDate: '2020-04-05',
    updateDate: '2022-11-10',
    fileSizeFormatted: '1.2 MB',
    fileSizeBytes: 1258291,
    fileName: 'YW1_100_Save.zip',
    downloadFileName: 'YokaiWatch1_100_Medallium.zip',
    tags: ['Сохранение', '100%', 'Медаллиум', 'Шогуньян', 'Checkpoint'],
    source: 'Community',
    compatibility: 'both',
    titleId: '0004000000164600',
    sdCardPath: 'sdmc:/3ds/Checkpoint/saves/0x01646 Yokai Watch 1/100_Medallium/head.bin',
    sdCardTree: [
      {
        name: 'sdmc:',
        type: 'folder',
        children: [
          {
            name: '3ds',
            type: 'folder',
            children: [
              {
                name: 'Checkpoint',
                type: 'folder',
                children: [
                  {
                    name: 'saves',
                    type: 'folder',
                    children: [
                      {
                        name: '0x01646 Yokai Watch 1',
                        type: 'folder',
                        children: [
                          {
                            name: '100_Medallium',
                            type: 'folder',
                            highlight: true,
                            children: [{ name: 'head.bin', type: 'file', highlight: true }]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    installSteps: ['Восстановите через Checkpoint кнопкой [R].'],
    requirements: ['Checkpoint Save Manager']
  },

  // ==================== YO-KAI WATCH 2 ====================
  {
    id: 'yw2-version-exclusives-unlocked',
    title: 'Yo-kai Watch 2: Version Exclusives & Trade Unlocker Mod',
    shortDesc: 'Все эксклюзивы Bony Spirits, Fleshy Souls и Psychic Specters доступны в одной игре без необходимости обменов!',
    fullDesc: 'Убирает искусственное разделение контента между тремя версиями Yo-kai Watch 2. Позволяет завершить Медаллиум на 100% в любой редакции игры, делая доступными всех эксклюзивных боссов и йо-каев.',
    category: 'luma-plugins',
    categoryName: 'Luma3DS Plugins',
    gameId: 'yokai-watch',
    gameTitle: 'Yo-kai Watch 1, 2 & 3',
    author: 'Level5Modding & GameBanana',
    version: 'v2.2',
    rating: 4.98,
    ratingCount: 2100,
    downloadsCount: 380000,
    releaseDate: '2020-08-14',
    updateDate: '2023-11-05',
    fileSizeFormatted: '34 MB',
    fileSizeBytes: 35651584,
    fileName: 'YW2_AllExclusives_Mod.zip',
    downloadFileName: 'YW2_All_Version_Exclusives_v2.2.zip',
    tags: ['GameBanana', 'Yo-kai Watch 2', 'Bony Spirits', 'Fleshy Souls', 'Psychic Specters'],
    source: 'GameBanana',
    compatibility: 'both',
    titleId: '00040000001B4600',
    sdCardPath: 'sdmc:/luma/titles/00040000001B4600/romfs/',
    sdCardTree: [
      {
        name: 'sdmc:',
        type: 'folder',
        children: [
          {
            name: 'luma',
            type: 'folder',
            children: [
              {
                name: 'titles',
                type: 'folder',
                children: [
                  {
                    name: '00040000001B4600',
                    type: 'folder',
                    note: 'TitleID Psychic Specters EUR',
                    children: [{ name: 'romfs', type: 'folder', highlight: true }]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    installSteps: [
      'Скопируйте в sdmc:/luma/titles/[TitleID]/ (для Bony Spirits: 0004000000199900, Fleshy: 0004000000199A00).',
      'Запустите с "Enable game patching".'
    ],
    requirements: ['Luma3DS CFW']
  },
  {
    id: 'yw2-rus-translation',
    title: 'Русификатор Yo-kai Watch 2: Души / Скелеты / Спектры',
    shortDesc: 'Масштабная русская локализация второй части: путешествия во времени на 60 лет назад, Ховернян, сюжетные ролики и диалоги.',
    fullDesc: 'Перевод захватывающей истории о создании первых часов Yo-kai Watch дедушкой героя. Полностью переведены сюжетные миссии в прошлом и настоящем, диалоги Джибаньяна и Ховерняна, меню и описания предметов.',
    category: 'rus-translations',
    categoryName: 'Русификаторы',
    gameId: 'yokai-watch',
    gameTitle: 'Yo-kai Watch 1, 2 & 3',
    author: 'Alliance Team & YW Fans',
    version: 'v1.4',
    rating: 4.96,
    ratingCount: 1840,
    downloadsCount: 310000,
    releaseDate: '2021-07-22',
    updateDate: '2023-12-01',
    fileSizeFormatted: '64 MB',
    fileSizeBytes: 67108864,
    fileName: 'YW2_Russian_Translation.zip',
    downloadFileName: 'YokaiWatch2_Rus_v1.4.zip',
    tags: ['Yo-kai Watch 2', 'Русский язык', 'Ховернян', 'Локализация'],
    source: 'Community',
    compatibility: 'both',
    titleId: '00040000001B4600',
    sdCardPath: 'sdmc:/luma/titles/00040000001B4600/romfs/',
    sdCardTree: [
      {
        name: 'sdmc:',
        type: 'folder',
        children: [
          {
            name: 'luma',
            type: 'folder',
            children: [
              {
                name: 'titles',
                type: 'folder',
                children: [
                  {
                    name: '00040000001B4600',
                    type: 'folder',
                    children: [{ name: 'romfs', type: 'folder', highlight: true }]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    installSteps: ['Распакуйте в sdmc:/luma/titles/00040000001B4600/'],
    requirements: ['Luma3DS v9+']
  },
  {
    id: 'yw2-60fps-circlepad',
    title: 'Yo-kai Watch 2: 60 FPS & Circle Pad Camera Mod',
    shortDesc: 'Разблокировка плавных 60 FPS и свободное вращение камеры в городе с помощью второго стика New 3DS C-Stick.',
    fullDesc: 'Модификация с GameBanana. Снимает лок 30 кадров и назначает ручное вращение камеры на правый аналог C-Stick, что делает исследование улиц Спрингдейла и Харрисавилля максимально кинематографичным.',
    category: 'luma-plugins',
    categoryName: 'Luma3DS Plugins',
    gameId: 'yokai-watch',
    gameTitle: 'Yo-kai Watch 1, 2 & 3',
    author: 'Nanquitas & GameBanana Modders',
    version: 'v1.2',
    rating: 4.94,
    ratingCount: 1150,
    downloadsCount: 220000,
    releaseDate: '2021-09-10',
    updateDate: '2023-06-18',
    fileSizeFormatted: '9.4 MB',
    fileSizeBytes: 9856614,
    fileName: 'YW2_60FPS_CStick.zip',
    downloadFileName: 'YW2_60FPS_FreeCam_Patch.zip',
    tags: ['GameBanana', 'Yo-kai Watch 2', '60 FPS', 'C-Stick', 'Camera'],
    source: 'GameBanana',
    compatibility: 'new-3ds-only',
    titleId: '00040000001B4600',
    sdCardPath: 'sdmc:/luma/plugins/00040000001B4600/plugin.plg',
    sdCardTree: [
      {
        name: 'sdmc:',
        type: 'folder',
        children: [
          {
            name: 'luma',
            type: 'folder',
            children: [
              {
                name: 'plugins',
                type: 'folder',
                children: [
                  {
                    name: '00040000001B4600',
                    type: 'folder',
                    children: [{ name: 'plugin.plg', type: 'file', highlight: true }]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    installSteps: [
      'Поместите plugin.plg в sdmc:/luma/plugins/00040000001B4600/',
      'Включите Plugin Loader в меню Rosalina (L + Вниз + Select).'
    ],
    requirements: ['New Nintendo 3DS']
  },
  {
    id: 'yw2-100-save-psychic',
    title: '100% Сохранение Yo-kai Watch 2: Psychic Specters',
    shortDesc: 'Все 450 йо-каев в Медаллиуме, все темные Wickeds, максимальный ранг Blasters T, 999 999 $ и все Crank-монеты.',
    fullDesc: 'Ультимативное сохранение: разблокированы Кабукидроид, Гаргарос, Орочи, Кьюби, все легендарные покемоны и открыты секретные экспресс-поезда в потусторонний мир.',
    category: 'cheats-saves',
    categoryName: 'Читы/Сохранения',
    gameId: 'yokai-watch',
    gameTitle: 'Yo-kai Watch 1, 2 & 3',
    author: 'YW Save Vault',
    version: 'v1.0',
    rating: 4.91,
    ratingCount: 890,
    downloadsCount: 195000,
    releaseDate: '2020-09-01',
    updateDate: '2023-01-15',
    fileSizeFormatted: '1.4 MB',
    fileSizeBytes: 1468006,
    fileName: 'YW2_100_Save.zip',
    downloadFileName: 'YokaiWatch2_Psychic_100_Save.zip',
    tags: ['Сохранение', '100%', 'Psychic Specters', 'Checkpoint'],
    source: 'Community',
    compatibility: 'both',
    titleId: '00040000001B4600',
    sdCardPath: 'sdmc:/3ds/Checkpoint/saves/0x01B46 Yokai Watch 2/100_Save/head.bin',
    sdCardTree: [
      {
        name: 'sdmc:',
        type: 'folder',
        children: [
          {
            name: '3ds',
            type: 'folder',
            children: [
              {
                name: 'Checkpoint',
                type: 'folder',
                children: [
                  {
                    name: 'saves',
                    type: 'folder',
                    children: [
                      {
                        name: '0x01B46 Yokai Watch 2',
                        type: 'folder',
                        children: [{ name: '100_Save', type: 'folder', highlight: true }]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    installSteps: ['Восстановите через Checkpoint кнопкой [R].'],
    requirements: ['Checkpoint Save Manager']
  },

  // ==================== YO-KAI WATCH 3 ====================
  {
    id: 'yw3-sukiyaki-restoration',
    title: 'Yo-kai Watch 3: Sukiyaki Content & Enma Expansion (GameBanana)',
    shortDesc: 'Разблокировка контента японского издания Sukiyaki в европейской/американской версиях: Дворец Энмы, Deva Yo-kai и секретные подземелья.',
    fullDesc: 'Главный мод сообщества на GameBanana для Yo-kai Watch 3. Разблокирует эксклюзивные квесты лорда Энмы, заблокированных Deva-йокаев, уникальное оружие для режима Blasters T и секретные арены.',
    category: 'luma-plugins',
    categoryName: 'Luma3DS Plugins',
    gameId: 'yokai-watch',
    gameTitle: 'Yo-kai Watch 1, 2 & 3',
    author: 'YW3 Community & GameBanana',
    version: 'v3.1',
    rating: 4.99,
    ratingCount: 2890,
    downloadsCount: 410000,
    releaseDate: '2020-11-20',
    updateDate: '2024-02-10',
    fileSizeFormatted: '145 MB',
    fileSizeBytes: 152043520,
    fileName: 'YW3_Sukiyaki_Expansion.zip',
    downloadFileName: 'YokaiWatch3_Sukiyaki_Content_v3.1.zip',
    tags: ['GameBanana', 'Yo-kai Watch 3', 'Sukiyaki', 'Lord Enma', 'Deva'],
    source: 'GameBanana',
    compatibility: 'both',
    titleId: '00040000001D4100',
    sdCardPath: 'sdmc:/luma/titles/00040000001D4100/romfs/',
    sdCardTree: [
      {
        name: 'sdmc:',
        type: 'folder',
        children: [
          {
            name: 'luma',
            type: 'folder',
            children: [
              {
                name: 'titles',
                type: 'folder',
                children: [
                  {
                    name: '00040000001D4100',
                    type: 'folder',
                    note: 'TitleID Yo-kai Watch 3 EUR',
                    children: [{ name: 'romfs', type: 'folder', highlight: true }]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    installSteps: [
      'Распакуйте в sdmc:/luma/titles/00040000001D4100/ (или USA: 00040000001D4200).',
      'Запустите игру с включенным game patching.'
    ],
    requirements: ['Luma3DS CFW v10+']
  },
  {
    id: 'yw3-undub-mod',
    title: 'Yo-kai Watch 3: Japanese Undub & Opening Songs',
    shortDesc: 'Оригинальная японская озвучка всех американских и японских йо-каев и возвращение культовых песен открытия.',
    fullDesc: 'Возвращает оригинальные японские голоса всем персонажам Yo-kai Watch 3, включая двух главных героев — Нейта в BBQ (США) и Хейли Энн в Японии.',
    category: 'luma-plugins',
    categoryName: 'Luma3DS Plugins',
    gameId: 'yokai-watch',
    gameTitle: 'Yo-kai Watch 1, 2 & 3',
    author: 'UndubTeam & GameBanana',
    version: 'v2.0',
    rating: 4.95,
    ratingCount: 1420,
    downloadsCount: 260000,
    releaseDate: '2021-04-10',
    updateDate: '2023-08-25',
    fileSizeFormatted: '210 MB',
    fileSizeBytes: 220200960,
    fileName: 'YW3_Undub_Patch.zip',
    downloadFileName: 'YokaiWatch3_Undub_v2.0.zip',
    tags: ['GameBanana', 'Yo-kai Watch 3', 'Undub', 'Audio', 'Озвучка'],
    source: 'GameBanana',
    compatibility: 'both',
    titleId: '00040000001D4100',
    sdCardPath: 'sdmc:/luma/titles/00040000001D4100/romfs/sound/',
    sdCardTree: [
      {
        name: 'sdmc:',
        type: 'folder',
        children: [
          {
            name: 'luma',
            type: 'folder',
            children: [
              {
                name: 'titles',
                type: 'folder',
                children: [
                  {
                    name: '00040000001D4100',
                    type: 'folder',
                    children: [
                      {
                        name: 'romfs',
                        type: 'folder',
                        children: [{ name: 'sound', type: 'folder', highlight: true }]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    installSteps: ['Скопируйте папку sound в sdmc:/luma/titles/00040000001D4100/romfs/'],
    requirements: ['Luma3DS CFW']
  },
  {
    id: 'yw3-fast-battles-qol',
    title: 'Yo-kai Watch 3: Fast Battles & Instant Dialogue Mod',
    shortDesc: 'Ускорение анимаций колеса тактики в 2 раза, мгновенный пропуск диалогов и увеличенная скорость бега в городах.',
    fullDesc: 'Качественный QoL-мод, убирающий медленные паузы в тактических битвах 3x3 сетки Yo-kai Watch 3. Колесо крутится мгновенно, спецприемы Соултимейт заряжаются быстрее, а бег не тратит стамину в мирных зонах.',
    category: 'luma-plugins',
    categoryName: 'Luma3DS Plugins',
    gameId: 'yokai-watch',
    gameTitle: 'Yo-kai Watch 1, 2 & 3',
    author: 'KazoWAR & GameBanana Modders',
    version: 'v1.5',
    rating: 4.97,
    ratingCount: 1650,
    downloadsCount: 290000,
    releaseDate: '2021-08-05',
    updateDate: '2023-11-12',
    fileSizeFormatted: '14 MB',
    fileSizeBytes: 14680064,
    fileName: 'YW3_Fast_Battles_QoL.zip',
    downloadFileName: 'YW3_Fast_Battles_v1.5.zip',
    tags: ['GameBanana', 'Yo-kai Watch 3', 'QoL', 'Fast Battles', 'Speedup'],
    source: 'GameBanana',
    compatibility: 'both',
    titleId: '00040000001D4100',
    sdCardPath: 'sdmc:/luma/titles/00040000001D4100/code.bps',
    sdCardTree: [
      {
        name: 'sdmc:',
        type: 'folder',
        children: [
          {
            name: 'luma',
            type: 'folder',
            children: [
              {
                name: 'titles',
                type: 'folder',
                children: [
                  {
                    name: '00040000001D4100',
                    type: 'folder',
                    children: [{ name: 'code.bps', type: 'file', highlight: true }]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    installSteps: ['Поместите code.bps в sdmc:/luma/titles/00040000001D4100/'],
    requirements: ['Luma3DS CFW']
  },
  {
    id: 'yw3-100-save-all-deva',
    title: '100% Сохранение Yo-kai Watch 3 (Все 700+ йо-каев и Deva)',
    shortDesc: 'Полный Медаллиум на 100%: все боги Deva Enma, Solar Enma, Umbra Enma, Infinite Stamina в Blasters T и 999 999 $ Cluphinx.',
    fullDesc: 'Абсолютный сейв-файл для Yo-kai Watch 3. Разблокированы все секретные персонажи, пройдены все уровни Blasters T и открыты все сокровища пирамиды Клуфинкс.',
    category: 'cheats-saves',
    categoryName: 'Читы/Сохранения',
    gameId: 'yokai-watch',
    gameTitle: 'Yo-kai Watch 1, 2 & 3',
    author: 'EnmaKing',
    version: 'v1.0 Final',
    rating: 4.96,
    ratingCount: 1280,
    downloadsCount: 240000,
    releaseDate: '2021-01-20',
    updateDate: '2023-05-14',
    fileSizeFormatted: '1.8 MB',
    fileSizeBytes: 1887436,
    fileName: 'YW3_100_Save.zip',
    downloadFileName: 'YokaiWatch3_AllDeva_100_Save.zip',
    tags: ['Сохранение', '100%', 'Yo-kai Watch 3', 'Deva', 'Enma'],
    source: 'Community',
    compatibility: 'both',
    titleId: '00040000001D4100',
    sdCardPath: 'sdmc:/3ds/Checkpoint/saves/0x01D41 Yokai Watch 3/100_Deva/head.bin',
    sdCardTree: [
      {
        name: 'sdmc:',
        type: 'folder',
        children: [
          {
            name: '3ds',
            type: 'folder',
            children: [
              {
                name: 'Checkpoint',
                type: 'folder',
                children: [
                  {
                    name: 'saves',
                    type: 'folder',
                    children: [
                      {
                        name: '0x01D41 Yokai Watch 3',
                        type: 'folder',
                        children: [{ name: '100_Deva', type: 'folder', highlight: true }]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    installSteps: ['Восстановите через Checkpoint кнопкой [R].'],
    requirements: ['Checkpoint Save Manager']
  },
  {
    id: 'theme-yokai-jibanyan',
    title: 'Yo-kai Watch Jibanyan & Whisper Home Theme',
    shortDesc: 'Официальная тема в ярком стиле: фоновый трек «Gera Gera Po», звуки часов Yo-kai Watch при кликах и кастомные иконки папок.',
    fullDesc: 'Красочная тема с Джибаньяном и Виспером. Верхний экран украшен анимированным городом Спрингдейл, нижний стилизован под диск часов Yo-kai Watch Model Zero.',
    category: 'custom-themes',
    categoryName: 'Custom Themes',
    gameId: 'yokai-watch',
    gameTitle: 'Yo-kai Watch 1, 2 & 3',
    author: 'Level5 & ThemePlaza',
    version: 'v1.2',
    rating: 4.95,
    ratingCount: 1410,
    downloadsCount: 275000,
    releaseDate: '2021-03-15',
    updateDate: '2023-07-10',
    fileSizeFormatted: '4.2 MB',
    fileSizeBytes: 4404019,
    fileName: 'YW_Jibanyan_Theme.zip',
    downloadFileName: 'YokaiWatch_Jibanyan_Theme.zip',
    tags: ['Yo-kai Watch', 'Джибаньян', 'Gera Gera Po', 'Кастомная тема', 'BGM'],
    source: 'Community',
    compatibility: 'both',
    sdCardPath: 'sdmc:/Themes/YokaiWatch_Jibanyan/',
    sdCardTree: [
      {
        name: 'sdmc:',
        type: 'folder',
        children: [
          {
            name: 'Themes',
            type: 'folder',
            children: [
              {
                name: 'YokaiWatch_Jibanyan',
                type: 'folder',
                highlight: true,
                children: [
                  { name: 'body_LZ.bin', type: 'file' },
                  { name: 'bgm.bcstm', type: 'file' },
                  { name: 'sfx.bin', type: 'file' }
                ]
              }
            ]
          }
        ]
      }
    ],
    installSteps: ['Скопируйте в sdmc:/Themes/ и примените в Anemone3DS.'],
    requirements: ['Anemone3DS']
  },
  {
    id: 'ywml-mod-loader',
    title: 'YWML (Yo-kai Watch Mod Loader & Manager Tool)',
    shortDesc: 'Утилита для управления, объединения и автоматической расстановки модов LayeredFS для Yo-kai Watch 1, 2, 3 и Blasters.',
    fullDesc: 'Специализированный инструмент для фанатов серии. Автоматически объединяет файлы `cpk` и `romfs`, разрешает конфликты между русификаторами, undub-патчами и текстурными модами в один клик.',
    category: 'homebrew-apps',
    categoryName: 'Homebrew Apps',
    gameId: 'yokai-watch',
    gameTitle: 'Yo-kai Watch 1, 2 & 3',
    author: 'Togenyan & YWML Team',
    version: 'v1.8.2',
    rating: 4.97,
    ratingCount: 1890,
    downloadsCount: 220000,
    releaseDate: '2021-10-14',
    updateDate: '2024-01-20',
    fileSizeFormatted: '8.4 MB',
    fileSizeBytes: 8808038,
    fileName: 'YWML_Tool.zip',
    downloadFileName: 'YoKaiWatch_ModLoader_v1.8.2.zip',
    tags: ['Yo-kai Watch', 'YWML', 'Mod Loader', 'Утилита', 'Homebrew'],
    source: 'GameBrew',
    compatibility: 'both',
    sdCardPath: 'sdmc:/3ds/YWML/YWML.3dsx',
    sdCardTree: [
      {
        name: 'sdmc:',
        type: 'folder',
        children: [
          {
            name: '3ds',
            type: 'folder',
            children: [
              {
                name: 'YWML',
                type: 'folder',
                highlight: true,
                children: [{ name: 'YWML.3dsx', type: 'file', highlight: true }]
              }
            ]
          }
        ]
      }
    ],
    installSteps: ['Поместите папку YWML в sdmc:/3ds/ и запускайте через Homebrew Launcher.'],
    requirements: ['Luma3DS Homebrew Launcher']
  }
];
