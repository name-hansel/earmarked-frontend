import {useQuery} from "@tanstack/react-query";
import {spotifyKeys} from "../queryKeys.ts";
import {getAlbum} from "../api/spotify.ts";

export function useSpotifyAlbum(id: string | undefined) {
    return useQuery({
        queryKey: spotifyKeys.album(id ?? ""),
        queryFn: () => getAlbum(id!),
        enabled: !!id,
        staleTime: 60 * 60 * 1000,
        retry: false
    });
}