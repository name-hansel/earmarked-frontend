import {EarmarkRating} from "./EarmarkRating.tsx";
import type {Earmark} from "../../api/earmark.ts";
import type {EarmarkSort} from "../../utils/earmarkSort.ts";
import {formatDate} from "../../../../utils/formatDate.ts";

export default function EarmarkHeaderSortLabel({earmark, sort}: {
    earmark: Earmark,
    sort: EarmarkSort
}) {
    const {createdAt, listened, listenedAt, rating} = earmark;

    if (sort.startsWith("EARMARKED")) {
        return `Earmarked on ${formatDate(createdAt)}`;
    }

    if (sort.startsWith("LISTENED")) {
        if (!listened) {
            return "Not listened yet";
        }
        return listenedAt ? `Listened on ${formatDate(`${listenedAt}T00:00:00`)}` : "Listened";
    }

    if (sort.startsWith("RATING")) {
        return rating == null ? "Not rated" : <EarmarkRating rating={rating} size="sm"/>;
    }

    return null;
}