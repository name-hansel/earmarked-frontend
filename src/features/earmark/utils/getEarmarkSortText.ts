import type {Earmark} from "../api/earmark.ts";
import type {EarmarkSort} from "./earmarkSort.ts";
import {formatDate} from "../../../utils/formatDate.ts";

export function getEarmarkSortText({createdAt, listened, listenedAt}: Earmark, sort: EarmarkSort) {
    if (sort.startsWith("EARMARKED")) {
        return `Earmarked on ${formatDate(createdAt)}`;
    }

    if (sort.startsWith("LISTENED")) {
        if (!listened) {
            return "Not listened yet";
        }
        return listenedAt ? `Listened on ${formatDate(`${listenedAt}T00:00:00`)}` : "Listened";
    }

    return null;
}