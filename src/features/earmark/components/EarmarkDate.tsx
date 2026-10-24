import {formatDate} from "../../../utils/formatDate.ts";
import {BookmarkIcon, HeadphonesIcon} from "../../../components/Icon.tsx";
import styles from "./EarmarkDate.module.css"
import type {Earmark} from "../api/earmark.ts";

export default function EarmarkDate({earmark, showIcon = true}: { earmark: Earmark, showIcon: boolean }) {
    const {createdAt, listenedAt} = earmark;
    const date = listenedAt ?? createdAt;
    const label = listenedAt ? "Listened on" : "Earmarked on";
    const formatted = listenedAt
        ? formatDate(`${listenedAt}T00:00:00`)
        : formatDate(createdAt);

    return <time className={styles.date}
                 dateTime={date}
                 title={`${label} ${formatted}`}>
        {showIcon && (listenedAt
            ? <HeadphonesIcon className={styles.icon}/>
            : <BookmarkIcon className={styles.icon}/>)}
        <span className={showIcon ? styles.srOnly : undefined}>{label} </span>
        {formatted}
    </time>
}