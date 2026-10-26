import {api} from "../../../lib/client.ts";

export type AlbumImage = { url: string; width: number; height: number };

export type SpotifyAlbum = {
    id: string;
    name: string;
    artists: string[];
    images: AlbumImage[];
    releaseDate: string;
    releaseDatePrecision: string;
    albumType: string;
    spotifyUrl: string;
}

export type SpotifyTrack = {
    id: string;
    name: string;
    trackNumber: number | null;
    durationMs: number | null;
    artists: string[];
}

export type SpotifyAlbumDetails = SpotifyAlbum & {
    totalTracks: number | null;
    tracks: SpotifyTrack[];
}

export async function searchAlbums(query: string): Promise<SpotifyAlbum[]> {
    const response = await api.get<SpotifyAlbum[]>("/spotify/albums/search", {
        params: {
            q: query
        }
    });

    return response.data;
}

export async function getAlbum(id: string): Promise<SpotifyAlbumDetails> {
    const response = await api.get<SpotifyAlbumDetails>(`/spotify/albums/${id}`);
    return response.data;
}