import type {SpotifyAlbumDetails} from "../../features/spotify/api/spotify.ts";
import styles from "./AlbumPage.module.css"
import {formatReleaseDate} from "../../utils/formatReleaseDate.ts";
import {formatDuration} from "../../utils/formatDuration.ts";

export default function AlbumMetadata({album}: { album: SpotifyAlbumDetails }) {
    const stats = [
        album.totalTracks != null && `${album.totalTracks} ${album.totalTracks === 1 ? "track" : "tracks"}`,
        album.totalDurationMs != null && formatDuration(album.totalDurationMs)
    ]
        .filter(Boolean)
        .join(" · ");

    return <>
        <h1 className={styles.title}>{album.name}</h1>
        <p className={styles.artists}>{album.artists.join(", ")}</p>
        <p className={styles.meta}>
            {`${formatReleaseDate(album.releaseDate, album.releaseDatePrecision)} · `}
            <span className={styles.albumType}>{album.albumType}</span>
        </p>
        {stats && <p className={styles.stats}>{stats}</p>}
    </>;
}