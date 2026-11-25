export type EarmarkStatus = "TO_LISTEN" | "LISTENED";
export const EARMARK_RATING_FILTERS = ["NO_RATING", "ZERO", "ONE", "TWO", "THREE"] as const;
export type EarmarkRating = (typeof EARMARK_RATING_FILTERS)[number];

export const EARMARK_RATING_FILTER_LABELS: Record<EarmarkRating, string> = {
    ZERO: "Rated 0",
    ONE: "Rated 1",
    TWO: "Rated 2",
    THREE: "Rated 3",
    NO_RATING: "No rating",
};

export function parseStatus(value: string | null): EarmarkStatus | undefined {
    return value === "TO_LISTEN" || value === "LISTENED" ? value : undefined;
}

export function parseHas(value: string | null): boolean | undefined {
    if (value === "true") return true;
    if (value === "false") return false;
    return undefined;
}

export function parseRatingFilter(value: string | null): EarmarkRating | undefined {
    return EARMARK_RATING_FILTERS.find((filter) => filter === value);
}