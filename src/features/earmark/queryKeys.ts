export const earmarkKeys = {
    all: ["earmarks"] as const,
    lists: () => [...earmarkKeys.all, "list"] as const,
    album: (spotifyAlbumId: string) => [...earmarkKeys.all, "album", spotifyAlbumId] as const,
    recent: (size: number) => [...earmarkKeys.lists(), "recent", size] as const,
    paged: () => [...earmarkKeys.lists(), "paged"] as const,
}