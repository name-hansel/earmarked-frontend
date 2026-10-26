const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatReleaseDate(releaseDate: string, precision: string | undefined): string {
    if (!releaseDate) return "";

    const [year = "", month, day] = releaseDate.split("-");
    const monthName = month ? MONTHS[Number(month) - 1] : undefined;

    if (precision === "year" || !monthName) return year;
    if (precision === "month" || !day) return `${monthName} ${year}`;

    return `${Number(day)} ${monthName} ${year}`;
}