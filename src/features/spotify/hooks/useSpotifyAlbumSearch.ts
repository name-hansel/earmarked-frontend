import {useQuery} from "@tanstack/react-query";
import {searchAlbums} from "../api/spotify.ts";
import {spotifyKeys} from "../queryKeys.ts";

export function useSpotifyAlbumSearch(query: string) {
    const trimmed = query.trim();

    return useQuery({
        queryKey: spotifyKeys.search(trimmed.toLowerCase()),
        queryFn: () => searchAlbums(trimmed),
        enabled: trimmed.length > 2,
        staleTime: 5 * 60 * 1000,
        retry: false
    });
}