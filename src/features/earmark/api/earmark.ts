import {api} from "../../../lib/client.ts";

export interface Earmark {
    id: string;
    spotifyAlbumId: string;
    note: string | null;
    createdAt: string;
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