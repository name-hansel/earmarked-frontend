export const EARMARK_SORT_OPTIONS = [
    {value: "ALBUM_NAME_ASC", label: "Album name (A–Z)"},
    {value: "ALBUM_NAME_DESC", label: "Album name (Z–A)"},
    {value: "RELEASE_DATE_DESC", label: "Release date (newest)"},
    {value: "RELEASE_DATE_ASC", label: "Release date (oldest)"},
    {value: "EARMARKED_DESC", label: "Earmarked (newest)"},
    {value: "EARMARKED_ASC", label: "Earmarked (oldest)"},
    {value: "LISTENED_DESC", label: "Listened (newest)"},
    {value: "LISTENED_ASC", label: "Listened (oldest)"},
    {value: "RATING_DESC", label: "Rating (high to low)"},
    {value: "RATING_ASC", label: "Rating (low to high)"},
] as const;

export type EarmarkSort = (typeof EARMARK_SORT_OPTIONS)[number]["value"];
export const DEFAULT_EARMARK_SORT: EarmarkSort = "EARMARKED_DESC";

export function isEarmarkSort(value: string | null): value is EarmarkSort {
    return EARMARK_SORT_OPTIONS.some((o) => o.value === value);
}