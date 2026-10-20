const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatReleaseDate(releaseDate: string): string {
    if (!releaseDate) return "";

    const [year, month, day] = releaseDate.split("-");
    const monthName = month ? MONTHS[Number(month) - 1] : undefined;

    if (!monthName) return year ? year : "";
    
    return day ? `${day} ${monthName} ${year}` : `${monthName} ${year}`;
}