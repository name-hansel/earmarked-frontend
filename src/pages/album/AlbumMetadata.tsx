import type {SpotifyAlbumDetails} from "../../features/spotify/api/spotify.ts";
import styles from "./AlbumPage.module.css"
import {formatReleaseDate} from "../../utils/formatReleaseDate.ts";

export default function AlbumMetadata({album}: { album: SpotifyAlbumDetails }) {
    return <>
        <h1 className={styles.title}>{album.name}</h1>
        <p className={styles.artists}>{album.artists.join(", ")}</p>
        <p className={styles.meta}>
            {`${formatReleaseDate(album.releaseDate)} · `}
            <span className={styles.albumType}>{album.albumType}</span>
            {album.totalTracks != null && ` · ${album.totalTracks} ${album.totalTracks === 1 ? "track" : "tracks"}`}
        </p>
    </>;
}