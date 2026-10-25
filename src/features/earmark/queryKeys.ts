import type {EarmarkSort} from "./utils/earmarkSort.ts";
import type {EarmarkStatus} from "./utils/earmarkFilters.ts";

export const earmarkKeys = {
    all: ["earmarks"] as const,
    lists: () => [...earmarkKeys.all, "list"] as const,
    album: (spotifyAlbumId: string) => [...earmarkKeys.all, "album", spotifyAlbumId] as const,
    recent: (size: number) => [...earmarkKeys.lists(), "recent", size] as const,
    paged: (sort: EarmarkSort, q: string, status: EarmarkStatus | undefined, hasNote: boolean | undefined) =>
        [...earmarkKeys.lists(), "paged", sort, q, status, hasNote] as const,
    albums: (ids: string[]) => [...earmarkKeys.all, "albums", ids] as const,
}