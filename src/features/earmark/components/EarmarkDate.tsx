import {formatDate} from "../../../utils/formatDate.ts";
import {BookmarkIcon, HeadphonesIcon} from "../../../components/Icon.tsx";
import styles from "./EarmarkDate.module.css"
import type {Earmark} from "../api/earmark.ts";

export default function EarmarkDate({earmark, showIcon = true}: { earmark: Earmark, showIcon: boolean }) {
    const {createdAt, listened, listenedAt} = earmark;

    if (listened && !listenedAt) {
        return <span className={styles.date} title="Listened">
            {showIcon
                ? <>
                    <HeadphonesIcon className={styles.icon}/>
                    <span className={styles.srOnly}>Listened</span>
                </>
                : "Listened"}
        </span>;
    }

    const date = listenedAt ?? createdAt;
    const label = listenedAt ? "Listened on" : "Earmarked on";
    const formatted = listenedAt
        ? formatDate(`${listenedAt}T00:00:00`)
        : formatDate(createdAt);

    return <time className={styles.date}
                 dateTime={date}
                 title={`${label} ${formatted}`}>
        {showIcon && (listened
            ? <HeadphonesIcon className={styles.icon}/>
            : <BookmarkIcon className={styles.icon}/>)}
        <span className={showIcon ? styles.srOnly : undefined}>{label} </span>
        {formatted}
    </time>
}