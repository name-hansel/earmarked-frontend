import {useQuery} from "@tanstack/react-query";
import {earmarkKeys} from "../queryKeys.ts";
import {getAlbumEarmark} from "../api/earmark.ts";

export function useAlbumEarmark(spotifyAlbumId: string) {
    return useQuery({queryKey: earmarkKeys.album(spotifyAlbumId), queryFn: () => getAlbumEarmark(spotifyAlbumId)});
}