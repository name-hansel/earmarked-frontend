import type {SpotifyAlbumDetails} from "../../features/spotify/api/spotify.ts";
import styles from "./AlbumPage.module.css"
import {formatDuration} from "../../features/spotify/utils/formatDuration.ts";

export default function AlbumTracks({album}: { album: SpotifyAlbumDetails }) {
    return <ol className={styles.tracks}>
        {album.tracks.map((track) => (
            <li className={styles.track} key={track.id}>
                <span className={styles.trackName}>{track.name}</span>
                <span className={styles.duration}>{formatDuration(track.durationMs)}</span>
            </li>
        ))}
    </ol>;
}