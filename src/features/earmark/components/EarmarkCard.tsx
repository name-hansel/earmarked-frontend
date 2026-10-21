import {Link} from "react-router";
import type {Earmark} from "../api/earmark.ts";
import styles from "./EarmarkCard.module.css";
import {formatDate} from "../../../utils/formatDate.ts";
import {pickImage} from "../../../utils/pickImage.ts";

export default function EarmarkCard({earmark}: { earmark: Earmark }) {
    const {album, spotifyAlbumId} = earmark;

    const albumCover = album ? pickImage(album.images, 300) : undefined;

    return <li className={styles.card}>
        <Link className={styles.link} to={`/albums/${spotifyAlbumId}`}>
            {album && albumCover
                ? <img className={styles.cover} src={albumCover.url} alt={`Cover of ${album.name}`} width={64}
                       height={64}/>
                : <div className={styles.placeholder} aria-hidden="true"/>}
            <div className={styles.body}>
                <span className={album ? styles.name : `${styles.name} ${styles.unavailable}`}>
                    {album ? album.name : "Album unavailable"}
                </span>
                {album && <span className={styles.artists}>{album.artists.join(", ")}</span>}
                {earmark.note && <p className={styles.note}>{earmark.note}</p>}
                <time className={styles.date}
                      dateTime={earmark.createdAt}
                      title={`Earmarked on ${formatDate(earmark.createdAt)}`}>
                    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/>
                    </svg>
                    <span className={styles.srOnly}>Earmarked on </span>
                    {formatDate(earmark.createdAt)}
                </time>
            </div>
        </Link>
    </li>
}