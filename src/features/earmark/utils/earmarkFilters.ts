export type EarmarkStatus = "TO_LISTEN" | "LISTENED";

export function parseStatus(value: string | null): EarmarkStatus | undefined {
    return value === "TO_LISTEN" || value === "LISTENED" ? value : undefined;
}

export function parseHasNote(value: string | null): boolean | undefined {
    if (value === "true") return true;
    if (value === "false") return false;
    return undefined;
}