export interface Game {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  genre: string;
  developer: string;
  rating: number;
  coverImage: string;
  bannerImage: string;
  screenshots: string[];
  systemRequirements: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
  featured?: boolean;
  isNew?: boolean;
  onSale?: boolean;
  originalPrice?: number;
  releaseDate: string;
}

export interface LibraryEntry {
  gameId: string;
  purchasedAt: string;
  hoursPlayed: number;
  installed: boolean;
}

export interface User {
  username: string;
  email: string;
  avatar: string;
}

export type LibrarySort = "title" | "hours" | "recent";
export type LibraryFilter = "all" | "installed" | "not-installed";
