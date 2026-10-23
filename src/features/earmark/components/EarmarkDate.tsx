import {formatDate} from "../../../utils/formatDate.ts";
import {BookmarkIcon} from "../../../components/Icon.tsx";
import styles from "./EarmarkDate.module.css"
import {useAlbumEarmark} from "../hooks/useAlbumEarmark.ts";

export default function EarmarkDate({spotifyAlbumId, showIcon = true}: { spotifyAlbumId: string, showIcon: boolean }) {
    const {data} = useAlbumEarmark(spotifyAlbumId);

    if (!data?.earmark) {
        return null;
    }

    const createdAt = data.earmark.createdAt;

    return <time className={styles.date}
                 dateTime={createdAt}
                 title={`Earmarked on ${formatDate(createdAt)}`}>
        {showIcon && <BookmarkIcon className={styles.icon}/>}
        <span className={styles.srOnly}>Earmarked on </span>
        {formatDate(createdAt)}
    </time>
}