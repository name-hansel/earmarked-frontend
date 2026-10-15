export const spotifyKeys = {
    all: ["spotify"] as const,
    search: (query: string) => [...spotifyKeys.all, "search", query] as const,
    album: (id: string) => [...spotifyKeys.all, "album", id] as const,
}