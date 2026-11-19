import type {Earmark} from "../../api/earmark.ts";
import type {EarmarkSort} from "../../utils/earmarkSort.ts";
import {formatDate} from "../../../../utils/formatDate.ts";
import styles from "./EarmarkSortHeader.module.css"

export default function EarmarkSortHeader({earmark, sort}: {
    earmark: Earmark;
    sort: EarmarkSort;
}) {
    const text = getText(earmark, sort);

    if (!text) {
        return null;
    }

    return <div className={styles.header} data-card-header>{text}</div>;
}

function getText({createdAt, listened, listenedAt}: Earmark, sort: EarmarkSort) {
    if (sort.startsWith("EARMARKED")) {
        return `Earmarked on ${formatDate(createdAt)}`;
    }

    if (sort.startsWith("LISTENED")) {
        if (!listened) {
            return "To listen";
        }

        return listenedAt ? `Listened on ${formatDate(`${listenedAt}T00:00:00`)}` : "Listened";
    }

    return null;
}