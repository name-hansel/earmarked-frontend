export function formatDate(isoDate: string): string {
    return new Date(isoDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}