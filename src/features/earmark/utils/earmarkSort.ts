export type SortField = "EARMARKED" | "ALBUM_NAME" | "RELEASE_DATE" | "LISTENED" | "RATING";
export type SortDirection = "ASC" | "DESC";

type SortFieldConfig = {
    value: SortField;
    label: string;
    defaultDirection: SortDirection;
    directionLabels: Record<SortDirection, string>;
};

const NEWEST_OLDEST = {DESC: "Newest", ASC: "Oldest"};

export const SORT_FIELDS: SortFieldConfig[] = [
    {value: "EARMARKED", label: "Earmarked date", defaultDirection: "DESC", directionLabels: NEWEST_OLDEST},
    {
        value: "ALBUM_NAME",
        label: "Album name",
        defaultDirection: "ASC",
        directionLabels: {ASC: "A to Z", DESC: "Z to A"}
    },
    {value: "RELEASE_DATE", label: "Release date", defaultDirection: "DESC", directionLabels: NEWEST_OLDEST},
    {value: "LISTENED", label: "Listened date", defaultDirection: "DESC", directionLabels: NEWEST_OLDEST},
    {value: "RATING", label: "Rating", defaultDirection: "DESC", directionLabels: {DESC: "Highest", ASC: "Lowest"}},
];

export const EARMARK_SORT_OPTIONS = [
    "ALBUM_NAME_ASC", "ALBUM_NAME_DESC",
    "RELEASE_DATE_DESC", "RELEASE_DATE_ASC",
    "EARMARKED_DESC", "EARMARKED_ASC",
    "LISTENED_DESC", "LISTENED_ASC",
    "RATING_DESC", "RATING_ASC",
] as const;

export function splitSort(sort: EarmarkSort): { field: SortField; direction: SortDirection } {
    const index = sort.lastIndexOf("_");
    return {field: sort.slice(0, index) as SortField, direction: sort.slice(index + 1) as SortDirection};
}

export function joinSort(field: SortField, direction: SortDirection): EarmarkSort {
    return `${field}_${direction}`;
}

export type EarmarkSort = (typeof EARMARK_SORT_OPTIONS)[number];
export const DEFAULT_EARMARK_SORT: EarmarkSort = "EARMARKED_DESC";

export function isEarmarkSort(value: string | null): value is EarmarkSort {
    return EARMARK_SORT_OPTIONS.some((option) => option === value);
}