import {api} from "../../../lib/client.ts";

export type SpotifyAlbum = {
    id: string;
    name: string;
    artists: string[];
    imageUrl: string | null;
    releaseDate: string;
}

export async function searchAlbums(query: string): Promise<SpotifyAlbum[]> {
    const response = await api.get<SpotifyAlbum[]>("/spotify/albums/search", {
        params: {
            q: query
        }
    });

    return response.data;
}