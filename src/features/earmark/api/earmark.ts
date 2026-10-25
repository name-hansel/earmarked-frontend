import {api} from "../../../lib/client.ts";
import type {PageResponse} from "../../../lib/types.ts";
import type {SpotifyAlbum} from "../../spotify/api/spotify.ts";
import type {EarmarkSort} from "../utils/earmarkSort.ts";
import type {EarmarkStatus} from "../utils/earmarkFilters.ts";

export interface Earmark {
    id: string;
    spotifyAlbumId: string;
    note: string | null;
    createdAt: string;
    album: SpotifyAlbum | null;
    listenedAt: string | null;
    listened: boolean;
}

export interface AlbumEarmarkResponse {
    earmark: Earmark | null;
}

export const ALREADY_EARMARKED_CODE = 'EARMARK_ALREADY_EXISTS';

export async function createEarmark(spotifyAlbumId: string, note?: string): Promise<Earmark> {
    const response = await api.post<Earmark>("/earmark", {spotifyAlbumId, note});
    return response.data;
}

export async function updateEarmark(earmarkId: string, note: string, listenedAt: string | null, listened: boolean): Promise<Earmark> {
    const response = await api.patch<Earmark>(`/earmark/${earmarkId}`, {note, listenedAt, listened});
    return response.data;
}

export async function getAlbumEarmark(spotifyAlbumId: string): Promise<AlbumEarmarkResponse> {
    const response = await api.get<AlbumEarmarkResponse>(`/earmark/album/${spotifyAlbumId}`);
    return response.data;
}

export async function getAlbumEarmarks(ids: string[]) {
    const response = await api.get<Record<string, Earmark>>("/earmark/albums", {
        params: {spotifyAlbumIds: ids.join(", ")}
    });
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

export async function fetchEarmarks(
    page: number,
    size: number,
    sort: EarmarkSort,
    q: string,
    status: EarmarkStatus | undefined,
    hasNote: boolean | undefined,
) {
    const response = await api.get<PageResponse<Earmark>>("/earmark", {
        params: {page, size, sort, q: q || undefined, status, hasNote},
    });

    return response.data;
}

export async function updateListened(earmarkId: string, listened: boolean) {
    const response = await api.patch<Earmark>(`/earmark/${earmarkId}/listened`, {listened});

    return response.data;
}