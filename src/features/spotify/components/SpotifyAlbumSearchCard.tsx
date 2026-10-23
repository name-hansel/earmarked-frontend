import type {SpotifyAlbum} from "../api/spotify.ts";
import {Link, useLocation} from "react-router";
import QuickEarmarkButton from "../../earmark/components/QuickEarmarkButton.tsx";
import styles from "./SpotifyAlbumSearchCard.module.css";
import {formatReleaseDate} from "../../../utils/formatReleaseDate.ts";
import {pickImage} from "../../../utils/pickImage.ts";
import SpotifyLink from "../../../components/spotify/SpotifyLink.tsx";
import CoverImage from "../../../components/CoverImage.tsx";
import QuickDeleteEarmarkButton from "../../earmark/components/QuickDeleteEarmarkButton.tsx";

export default function SpotifyAlbumSearchCard({album}: {
    album: SpotifyAlbum
}) {
    const location = useLocation();
    const albumCover = pickImage(album.images, 300);

    return <li className={styles.card}>
        <CoverImage className={styles.cover} image={albumCover} alt={`Cover for ${album.name}`}/>
        <div className={styles.body}>
            <Link className={styles.link} to={`/albums/${album.id}`} state={{fromSearch: location.search}}
                  title={`${album.name} — ${album.artists.join(", ")}`}>
                {album.name}
            </Link>
            <span className={styles.artists}>{album.artists.join(", ")}</span>
            <div className={styles.meta}>
                <span>{formatReleaseDate(album.releaseDate)}</span>
                <span className={styles.type}>{album.albumType}</span>
            </div>
            <div className={styles.action}>
                <div className={styles.earmarkTools}>
                    <QuickEarmarkButton spotifyAlbumId={album.id} compact/>
                    <QuickDeleteEarmarkButton spotifyAlbumId={album.id}/>
                </div>
                <SpotifyLink className={styles.spotify} url={album.spotifyUrl}/>
            </div>
        </div>
    </li>
}