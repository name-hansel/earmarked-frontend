import {useSpotifyAlbum} from "../../spotify/hooks/useSpotifyAlbum.ts";
import styles from "./EarmarkAlbumHeader.module.css";
import {formatReleaseDate} from "../../../utils/formatReleaseDate.ts";

export default function EarmarkAlbumHeader({spotifyAlbumId}: { spotifyAlbumId: string }) {
    const {data: album, isPending, isError} = useSpotifyAlbum(spotifyAlbumId);

    if (isPending) {
        return <p className={styles.status}>Loading album...</p>
    }

    if (isError) {
        return <p className={styles.alert} role="alert">Couldn't load album details.</p>;
    }

    return <header className={styles.header}>
        {album.imageUrl
            ?
            <img className={styles.cover} src={album.imageUrl} alt={`Cover of ${album.name}`} width={120} height={120}/>
            : <div className={styles.placeholder} aria-hidden="true"/>}
        <div className={styles.info}>
            <h2 className={styles.name}>{album.name}</h2>
            <p className={styles.artists}>{album.artists.join(", ")}</p>
            <p className={styles.date}>{formatReleaseDate(album.releaseDate)}</p>
        </div>
    </header>
}