import type {SpotifyAlbum} from "../api/spotify.ts";
import {Link, useLocation} from "react-router";
import QuickEarmarkButton from "../../earmark/components/QuickEarmarkButton.tsx";
import styles from "./SpotifyAlbumCard.module.css";

export default function SpotifyAlbumCard({album}: {
    album: SpotifyAlbum
}) {
    const location = useLocation();

    return <li className={styles.card}>
        {album.imageUrl
            ?
            <img className={styles.cover} src={album.imageUrl} alt={`Cover for ${album.name}`} width={64} height={64}/>
            : <div className={styles.placeholder} aria-hidden="true"/>}
        <div className={styles.body}>
            <Link className={styles.link} to={`/albums/${album.id}`} state={{fromSearch: location.search}}>
                {album.name}
            </Link>
            <span className={styles.artists}>{album.artists.join(", ")}</span>
            <span className={styles.meta}>{album.releaseDate} · {album.albumType}</span>
            <div className={styles.action}>
                <QuickEarmarkButton spotifyAlbumId={album.id}/>
            </div>
        </div>
    </li>
}