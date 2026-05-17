import type { Game } from "@/types";
import { steamAssets } from "@/lib/steam-images";

export const games: Game[] = [
  {
    id: "terraria",
    title: "Terraria",
    description: "Песочница с исследованием, строительством и битвами с боссами в 2D-мире.",
    longDescription:
      "Копайте, стройте и сражайтесь в огромном процедурном мире. Сотни предметов, десятки боссов и бесконечный кооператив — одна из самых влиятельных инди-игр десятилетия.",
    price: 369,
    genre: "Песочница",
    developer: "Re-Logic",
    rating: 4.9,
    ...steamAssets(105600),
    systemRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core 2 Duo E4400",
      memory: "4 GB RAM",
      graphics: "NVIDIA GeForce 7600 GT",
      storage: "2 GB",
    },
    featured: true,
    isNew: false,
    releaseDate: "2011-05-16",
  },
  {
    id: "stardew-valley",
    title: "Stardew Valley",
    description: "Уютная ферма, деревня и отношения в духе классических RPG.",
    longDescription:
      "Унаследовав старую ферму, вы восстанавливаете хозяйство, заводите друзей и исследуете пещеры. Спокойный геймплей, глубокий сюжет и сотни часов контента.",
    price: 419,
    genre: "Симулятор",
    developer: "ConcernedApe",
    rating: 4.9,
    ...steamAssets(413150),
    systemRequirements: {
      os: "Windows 10",
      processor: "Intel Core 2 Duo E4400",
      memory: "2 GB RAM",
      graphics: "256 MB VRAM",
      storage: "500 MB",
    },
    featured: true,
    onSale: true,
    originalPrice: 524,
    releaseDate: "2016-02-26",
  },
  {
    id: "hollow-knight",
    title: "Hollow Knight",
    description: "Мрачный метроидвания с точным боем и огромным рукотворным миром.",
    longDescription:
      "Исследуйте павшее королевство насекомых Hallownest. Точные бои, нелинейные локации и атмосферный саундтрек — эталон современного инди-экшена.",
    price: 419,
    genre: "Метроидвания",
    developer: "Team Cherry",
    rating: 4.9,
    ...steamAssets(367520),
    systemRequirements: {
      os: "Windows 10",
      processor: "Intel Core 2 Duo E5200",
      memory: "4 GB RAM",
      graphics: "GeForce 9800 GT",
      storage: "9 GB",
    },
    featured: true,
    isNew: false,
    releaseDate: "2017-02-24",
  },
  {
    id: "hades",
    title: "Hades",
    description: "Рогалик от Supergiant с динамичными боями и живым сюжетом.",
    longDescription:
      "Сын Аида пытается сбежать из подземного мира. Каждая смерть продвигает историю, а билды и оружие делают забеги уникальными.",
    price: 1049,
    genre: "Рогалик",
    developer: "Supergiant Games",
    rating: 4.9,
    ...steamAssets(1145360),
    systemRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5-3570",
      memory: "8 GB RAM",
      graphics: "GTX 650",
      storage: "15 GB",
    },
    featured: true,
    onSale: true,
    originalPrice: 1299,
    releaseDate: "2020-09-17",
  },
  {
    id: "celeste",
    title: "Celeste",
    description: "Сложный платформер о восхождении на гору и преодолении себя.",
    longDescription:
      "Помогите Мэдлин покорить гору Селеста. Пиксельная графика, идеальная физика прыжков и трогательная история о тревоге и надежде.",
    price: 315,
    genre: "Платформер",
    developer: "Maddy Makes Games",
    rating: 4.8,
    ...steamAssets(504230),
    systemRequirements: {
      os: "Windows 10",
      processor: "Intel Core i3",
      memory: "2 GB RAM",
      graphics: "512 MB VRAM",
      storage: "1.2 GB",
    },
    releaseDate: "2018-01-25",
  },
  {
    id: "cuphead",
    title: "Cuphead",
    description: "Run-and-gun в стиле мультфильмов 1930-х с эпичными боссами.",
    longDescription:
      "Cuphead и Mugman должны отработать долг дьяволу. Ручная анимация, джазовый саундтрек и одни из лучших босс-файтов в истории игр.",
    price: 419,
    genre: "Экшен",
    developer: "Studio MDHR",
    rating: 4.7,
    ...steamAssets(268910),
    systemRequirements: {
      os: "Windows 10",
      processor: "Intel Core i3-3450",
      memory: "4 GB RAM",
      graphics: "GTX 660",
      storage: "4 GB",
    },
    releaseDate: "2017-09-29",
  },
  {
    id: "undertale",
    title: "Undertale",
    description: "RPG, где можно пройти игру, не убив ни одного врага.",
    longDescription:
      "Падение в подземелье монстров. Уникальный юмор, запоминающиеся персонажи и выборы, которые действительно влияют на сюжет.",
    price: 419,
    genre: "RPG",
    developer: "tobyfox",
    rating: 4.9,
    ...steamAssets(391540),
    systemRequirements: {
      os: "Windows 10",
      processor: "Intel Core 2 Duo",
      memory: "2 GB RAM",
      graphics: "128 MB VRAM",
      storage: "200 MB",
    },
    isNew: false,
    releaseDate: "2015-09-15",
  },
  {
    id: "dead-cells",
    title: "Dead Cells",
    description: "Рогалик-метроидвания с быстрым боем и процедурными уровнями.",
    longDescription:
      "Исследуйте меняющийся замок, открывайте способности и находите идеальные синергии оружия. Высокий темп и сотни часов мастерства.",
    price: 629,
    genre: "Рогалик",
    developer: "Motion Twin",
    rating: 4.8,
    ...steamAssets(588650),
    systemRequirements: {
      os: "Windows 10",
      processor: "Intel i5",
      memory: "4 GB RAM",
      graphics: "GTX 460",
      storage: "2 GB",
    },
    onSale: true,
    originalPrice: 839,
    releaseDate: "2018-08-07",
  },
  {
    id: "rimworld",
    title: "RimWorld",
    description: "Колонийный симулятор с драмой, генерируемой ИИ-рассказчиком.",
    longDescription:
      "Спасите трёх выживших на краю мира. Стройте базу, управляйте настроением колонистов и переживайте уникальные истории каждой партии.",
    price: 1049,
    genre: "Стратегия",
    developer: "Ludeon Studios",
    rating: 4.8,
    ...steamAssets(294100),
    systemRequirements: {
      os: "Windows 10",
      processor: "Intel Core i3",
      memory: "4 GB RAM",
      graphics: "Intel HD 3000",
      storage: "1 GB",
    },
    isNew: true,
    releaseDate: "2018-10-17",
  },
  {
    id: "dont-starve-together",
    title: "Don't Starve Together",
    description: "Кооперативное выживание в мрачном стиле Тима Бёртона.",
    longDescription:
      "Вместе с друзьями исследуйте странный мир, крафтите предметы и переживайте смену сезонов. Хардкор, юмор и бесконечные моды.",
    price: 419,
    genre: "Выживание",
    developer: "Klei Entertainment",
    rating: 4.7,
    ...steamAssets(322330),
    systemRequirements: {
      os: "Windows 10",
      processor: "Intel Core i3",
      memory: "4 GB RAM",
      graphics: "GTX 560",
      storage: "4 GB",
    },
    onSale: true,
    originalPrice: 524,
    releaseDate: "2016-04-21",
  },
  {
    id: "vampire-survivors",
    title: "Vampire Survivors",
    description: "Рогалик-автошутер: один герой против тысяч монстров.",
    longDescription:
      "Автоматические атаки, безумные билды и 30-минутные забеги. Простое управление, глубокий прогресс и аддиктивный геймплей.",
    price: 189,
    genre: "Рогалик",
    developer: "poncle",
    rating: 4.7,
    ...steamAssets(1794680),
    systemRequirements: {
      os: "Windows 10",
      processor: "Intel Core i3",
      memory: "4 GB RAM",
      graphics: "Intel HD 4000",
      storage: "500 MB",
    },
    releaseDate: "2022-10-20",
  },
  {
    id: "dave-the-diver",
    title: "Dave the Diver",
    description: "Дайвинг днём и управление суши-рестораном ночью.",
    longDescription:
      "Дэйв исследует Голубую дыру, ловит рыбу и помогает вечером в ресторане. Смесь приключения, менеджмента и пиксельного шарма.",
    price: 629,
    genre: "Приключения",
    developer: "MINTROCKET",
    rating: 4.8,
    ...steamAssets(1868140),
    systemRequirements: {
      os: "Windows 10",
      processor: "Intel Core i3",
      memory: "8 GB RAM",
      graphics: "GTX 750",
      storage: "3 GB",
    },
    isNew: true,
    releaseDate: "2023-06-28",
  },
  {
    id: "doki-doki-literature-club",
    title: "Doki Doki Literature Club!",
    description: "Визуальная новелла о школьном литературном клубе. Или нет?",
    longDescription:
      "Знакомьтесь с участницами клуба, пишите стихи и… открывайте то, что скрыто за милым фасадом. Культовая бесплатная инди-история.",
    price: 0,
    genre: "Визуальная новелла",
    developer: "Team Salvato",
    rating: 4.6,
    ...steamAssets(698780),
    systemRequirements: {
      os: "Windows 10",
      processor: "Intel Core 2 Duo",
      memory: "4 GB RAM",
      graphics: "128 MB VRAM",
      storage: "3 GB",
    },
    releaseDate: "2017-09-22",
  },
  {
    id: "slime-rancher",
    title: "Slime Rancher",
    description: "Собирайте слаймов на далёкой планете и развивайте ранчо.",
    longDescription:
      "Беатрикс ЛеБо исследует Дальний Дальний Далёкий край, смешивает слаймов и строит империю пленок. Уютно, смешно и затягивающе.",
    price: 419,
    genre: "Симулятор",
    developer: "Monomi Park",
    rating: 4.7,
    ...steamAssets(433340),
    systemRequirements: {
      os: "Windows 10",
      processor: "Intel Core i3",
      memory: "4 GB RAM",
      graphics: "GTX 560",
      storage: "2 GB",
    },
    releaseDate: "2017-08-01",
  },
];

export function getGameById(id: string): Game | undefined {
  return games.find((g) => g.id === id);
}

export function getFeaturedGames(): Game[] {
  return games.filter((g) => g.featured);
}

export function getGenres(): string[] {
  return [...new Set(games.map((g) => g.genre))].sort();
}

export function getNewReleases(limit = 8): Game[] {
  return [...games]
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .slice(0, limit);
}

export function getTopRated(limit = 8): Game[] {
  return [...games].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

export function getOnSale(): Game[] {
  return games.filter((g) => g.onSale);
}

export function getFreeGames(): Game[] {
  return games.filter((g) => g.price === 0);
}

export function getGamesByGenre(genre: string): Game[] {
  return games.filter((g) => g.genre === genre);
}

export function getSpotlightGame(): Game {
  return getFeaturedGames()[0] ?? games[0];
}
