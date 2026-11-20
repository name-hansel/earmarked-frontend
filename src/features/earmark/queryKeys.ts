import type {EarmarkSort} from "./utils/earmarkSort.ts";
import type {EarmarkRating, EarmarkStatus} from "./utils/filter.ts";

export const earmarkKeys = {
    all: ["earmarks"] as const,
    lists: () => [...earmarkKeys.all, "list"] as const,
    album: (spotifyAlbumId: string) => [...earmarkKeys.all, "album", spotifyAlbumId] as const,
    recent: (size: number) => [...earmarkKeys.lists(), "recent", size] as const,
    paged: (sort: EarmarkSort, q: string, status: EarmarkStatus | undefined, hasNote: boolean | undefined, rating: EarmarkRating | undefined) =>
        [...earmarkKeys.lists(), "paged", sort, q, status, hasNote, rating] as const,
    albums: (ids: string[]) => [...earmarkKeys.all, "albums", ids] as const,
}