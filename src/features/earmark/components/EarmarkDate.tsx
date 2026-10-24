import {formatDate} from "../../../utils/formatDate.ts";
import {BookmarkIcon, HeadphonesIcon} from "../../../components/Icon.tsx";
import styles from "./EarmarkDate.module.css"
import {useAlbumEarmark} from "../hooks/useAlbumEarmark.ts";

export default function EarmarkDate({spotifyAlbumId, showIcon = true}: { spotifyAlbumId: string, showIcon: boolean }) {
    const {data} = useAlbumEarmark(spotifyAlbumId);

    if (!data?.earmark) {
        return null;
    }

    const {createdAt, listenedAt} = data.earmark;
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