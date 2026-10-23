import {Link} from "react-router";
import type {Earmark} from "../api/earmark.ts";
import styles from "./EarmarkCard.module.css";
import {formatDate} from "../../../utils/formatDate.ts";
import {pickImage} from "../../../utils/pickImage.ts";
import {BookmarkIcon} from "../../../components/Icon.tsx";
import SpotifyLink from "../../../components/spotify/SpotifyLink.tsx";
import CoverImage from "../../../components/CoverImage.tsx";
import {formatReleaseDate} from "../../../utils/formatReleaseDate.ts";

export default function EarmarkCard({earmark}: { earmark: Earmark }) {
    const {album, spotifyAlbumId} = earmark;

    const albumCover = album ? pickImage(album.images, 300) : undefined;

    return <li className={styles.card}>
        <div className={styles.main}>
            <CoverImage className={styles.cover} image={albumCover} alt={album ? `Cover of ${album.name}` : ""}/>
            <div className={styles.body}>
                <Link className={album ? styles.link : `${styles.link} ${styles.unavailable}`}
                      to={`/albums/${spotifyAlbumId}`}
                      title={album ? `${album.name} — ${album.artists.join(", ")}` : undefined}>
                    {album ? album.name : "Album unavailable"}
                </Link>
                {album && <span className={styles.artists}>{album.artists.join(", ")}</span>}
                {earmark.note && <p className={styles.note}>{earmark.note}</p>}
            </div>
        </div>
        <div className={styles.footer}>
            <time className={styles.date}
                  dateTime={earmark.createdAt}
                  title={`Earmarked on ${formatDate(earmark.createdAt)}`}>
                <BookmarkIcon className={styles.icon}/>
                <span className={styles.srOnly}>Earmarked on </span>
                {formatDate(earmark.createdAt)}
            </time>
            <div className={styles.footerEnd}>
                {album &&
                    <p className={styles.meta}>
                        {[formatReleaseDate(album.releaseDate), album.albumType].filter(Boolean).join(" · ")}
                    </p>}
                {album && <SpotifyLink className={styles.spotify} url={album.spotifyUrl}/>}
            </div>
        </div>
    </li>
}