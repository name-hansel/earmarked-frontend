import type {Earmark} from "../../api/earmark.ts";
import {formatDate} from "../../../../utils/formatDate.ts";
import styles from "./EarmarkDateLabel.module.css";
import type {ReactNode} from "react";

export default function EarmarkDateLabel({earmark}: { earmark: Earmark }) {
    const {createdAt, listened, listenedAt} = earmark;

    if (listened && !listenedAt) {
        return <DateLabel label="Listened"/>;
    }

    const date = listenedAt ?? createdAt;
    const label = listenedAt ? "Listened on" : "Earmarked on";
    const formatted = listenedAt
        ? formatDate(`${listenedAt}T00:00:00`)
        : formatDate(createdAt);

    return <DateLabel label={label}>
        <time dateTime={date}>{formatted}</time>
    </DateLabel>;
}

function DateLabel({label, children}: { label: string, children?: ReactNode, }) {
    return <span className={styles.label}>
        <span>{label}</span>
        {children}
    </span>;
}