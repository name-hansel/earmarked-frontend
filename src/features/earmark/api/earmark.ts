import {api} from "../../../lib/client.ts";
import type {PageResponse} from "../../../lib/types.ts";
import type {SpotifyAlbum} from "../../spotify/api/spotify.ts";

export interface Earmark {
    id: string;
    spotifyAlbumId: string;
    note: string | null;
    createdAt: string;
    album: SpotifyAlbum | null;
}

interface AlbumEarmarkResponse {
    earmark: Earmark | null;
}

export const ALREADY_EARMARKED_CODE = 'EARMARK_ALREADY_EXISTS';

export async function createEarmark(spotifyAlbumId: string): Promise<Earmark> {
    const response = await api.post<Earmark>("/earmark", {spotifyAlbumId});
    return response.data;
}

export async function getAlbumEarmark(spotifyAlbumId: string): Promise<AlbumEarmarkResponse> {
    const response = await api.get<AlbumEarmarkResponse>(`/earmark/album/${spotifyAlbumId}`);
    return response.data;
}

export async function deleteEarmark(earmarkUuid: string): Promise<void> {
    await api.delete(`/earmark/${earmarkUuid}`);
}

export async function fetchRecentEarmarks(size: number): Promise<Earmark[]> {
    const response = await api.get<PageResponse<Earmark>>("/earmark", {
        params: {page: 0, size},
    });

    return response.data.content;
}

export async function fetchEarmarks(page: number, size: number) {
    const response = await api.get<PageResponse<Earmark>>("/earmark", {
        params: {page, size},
    });

    return response.data;
}