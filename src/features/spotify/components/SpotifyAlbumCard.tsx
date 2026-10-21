import type {SpotifyAlbum} from "../api/spotify.ts";
import {Link, useLocation} from "react-router";
import QuickEarmarkButton from "../../earmark/components/QuickEarmarkButton.tsx";
import styles from "./SpotifyAlbumCard.module.css";
import {formatReleaseDate} from "../../../utils/formatReleaseDate.ts";
import {pickImage} from "../../../utils/pickImage.ts";

export default function SpotifyAlbumCard({album}: {
    album: SpotifyAlbum
}) {
    const location = useLocation();
    const albumCover = pickImage(album.images, 300);

    return <li className={styles.card}>
        {albumCover
            ?
            <img className={styles.cover} src={albumCover.url} alt={`Cover for ${album.name}`} width={64} height={64}/>
            : <div className={styles.placeholder} aria-hidden="true"/>}
        <div className={styles.body}>
            <Link className={styles.link} to={`/albums/${album.id}`} state={{fromSearch: location.search}}>
                {album.name}
            </Link>
            <span className={styles.artists}>{album.artists.join(", ")}</span>
            <div className={styles.meta}>
                <span>{formatReleaseDate(album.releaseDate)}</span>
                <span className={styles.type}>{album.albumType}</span>
            </div>
            <div className={styles.action}>
                <QuickEarmarkButton spotifyAlbumId={album.id}/>
            </div>
        </div>
    </li>
}