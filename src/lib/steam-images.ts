/** Steam CDN paths for game artwork (app IDs from store.steampowered.com). */
export function steamAssets(appId: number) {
  const base = `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}`;
  return {
    coverImage: `${base}/library_600x900.jpg`,
    bannerImage: `${base}/header.jpg`,
    screenshots: [
      `${base}/capsule_616x353.jpg`,
      `${base}/library_hero.jpg`,
      `${base}/header.jpg`,
    ],
  };
}
