import {api} from "../../../lib/client.ts";

export type SpotifyAlbumSearch = {
    id: string;
    name: string;
    artists: string[];
    imageUrl: string | null;
    releaseDate: string;
}

export async function searchAlbums(query: string): Promise<SpotifyAlbumSearch[]> {
    const response = await api.get<SpotifyAlbumSearch[]>("/spotify/albums/search", {
        params: {
            q: query
        }
    });

    return response.data;
}