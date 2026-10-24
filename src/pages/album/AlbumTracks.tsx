import type {SpotifyAlbumDetails} from "../../features/spotify/api/spotify";
import styles from "./AlbumTracks.module.css";
import {formatDuration} from "../../features/spotify/utils/formatDuration.ts";

export default function AlbumTracks({album}: { album: SpotifyAlbumDetails }) {
    const albumArtists = new Set(album.artists);

    return <ol className={styles.tracks}>
        {album.tracks.map((track) => {
            const differs = track.artists.length !== albumArtists.size
                || track.artists.some((artist) => !albumArtists.has(artist));

            return (
                <li className={styles.track} key={track.id}>
                    <div className={styles.trackInfo}
                         title={`${track.name} · ${track.artists.join(", ")}`}>
                        <span className={styles.trackName}>{track.name}</span>
                        {differs && (
                            <span className={styles.trackArtists}>
                                {`\u00A0·\u00A0${track.artists.join(", ")}`}
                            </span>
                        )}
                    </div>
                    <span className={styles.duration}>{formatDuration(track.durationMs)}</span>
                </li>
            );
        })}
    </ol>;
}