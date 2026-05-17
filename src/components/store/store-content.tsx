"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { GameGrid } from "@/components/games/game-grid";
import { Input } from "@/components/ui/input";
import { games, getGenres } from "@/data/games";
import { ru } from "@/lib/i18n/ru";

type SortOption = "rating" | "price-asc" | "price-desc" | "title";

export function StoreContent() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [sort, setSort] = useState<SortOption>("rating");
  const genres = getGenres();

  const filtered = useMemo(() => {
    let result = [...games];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.genre.toLowerCase().includes(q) ||
          g.developer.toLowerCase().includes(q)
      );
    }

    if (genre !== "all") {
      result = result.filter((g) => g.genre === genre);
    }

    result.sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "title":
          return a.title.localeCompare(b.title, "ru");
        default:
          return b.rating - a.rating;
      }
    });

    return result;
  }, [search, genre, sort]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={ru.store.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="h-10 rounded-lg border border-white/10 bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="all">{ru.store.allGenres}</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="h-10 rounded-lg border border-white/10 bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="rating">{ru.store.sortRating}</option>
            <option value="price-asc">{ru.store.sortPriceAsc}</option>
            <option value="price-desc">{ru.store.sortPriceDesc}</option>
            <option value="title">{ru.store.sortTitle}</option>
          </select>
        </div>
      </div>
      {filtered.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">{ru.store.noResults}</p>
      ) : (
        <GameGrid games={filtered} />
      )}
    </div>
  );
}
