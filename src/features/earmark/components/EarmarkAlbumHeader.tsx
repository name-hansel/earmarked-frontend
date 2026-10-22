import {useSpotifyAlbum} from "../../spotify/hooks/useSpotifyAlbum.ts";
import styles from "./EarmarkAlbumHeader.module.css";
import {formatReleaseDate} from "../../../utils/formatReleaseDate.ts";
import {pickImage} from "../../../utils/pickImage.ts";
import SpotifyLogoLink from "../../../components/spotify/SpotifyLogoLink.tsx";

export default function EarmarkAlbumHeader({spotifyAlbumId}: { spotifyAlbumId: string }) {
    const {data: album, isPending, isError} = useSpotifyAlbum(spotifyAlbumId);

    if (isPending) {
        return <p className={styles.status}>Loading album...</p>
    }

    if (isError) {
        return <p className={styles.alert} role="alert">Couldn't load album details.</p>;
    }

    const albumCover = pickImage(album.images, 240);

    return <header className={styles.header}>
        {albumCover
            ? <img className={styles.cover} src={albumCover.url} alt={`Cover of ${album.name}`}
                   width={albumCover.width} height={albumCover.height}/>
            : <div className={styles.placeholder} aria-hidden="true"/>}
        <div className={styles.info}>
            <h2 className={styles.name} title={album.name}>{album.name}</h2>
            <p className={styles.artists} title={album.artists.join(", ")}>{album.artists.join(", ")}</p>
            <p className={styles.date}>{formatReleaseDate(album.releaseDate)}</p>
            <SpotifyLogoLink className={styles.spotify} url={album.spotifyUrl}/>
        </div>
    </header>
}