export const spotifyKeys = {
    all: ["spotify"] as const,
    search: (query: string) => [...spotifyKeys.all, "search", query] as const,
}