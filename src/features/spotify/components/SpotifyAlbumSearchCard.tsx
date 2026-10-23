import type {SpotifyAlbum} from "../api/spotify.ts";
import {useLocation} from "react-router";
import QuickEarmarkButton from "../../earmark/components/QuickEarmarkButton.tsx";
import styles from "./SpotifyAlbumSearchCard.module.css";
import {pickImage} from "../../../utils/pickImage.ts";
import QuickDeleteEarmarkButton from "../../earmark/components/QuickDeleteEarmarkButton.tsx";
import AlbumCard from "../../album/components/AlbumCard.tsx";

export default function SpotifyAlbumSearchCard({album}: {
    album: SpotifyAlbum
}) {
    const location = useLocation();
    const albumCover = pickImage(album.images, 300);

    return <AlbumCard
        to={`/albums/${album.id}`}
        linkState={{fromSearch: location.search}}
        linkTitle={`${album.name} — ${album.artists.join(", ")}`}
        name={album.name}
        artists={album.artists.join(", ")}
        cover={albumCover}
        coverAlt={`Cover for ${album.name}`}
        releaseDate={album.releaseDate}
        albumType={album.albumType}
        spotifyUrl={album.spotifyUrl}>
        <div className={styles.action}>
            <div className={styles.earmarkTools}>
                <QuickEarmarkButton spotifyAlbumId={album.id} compact/>
                <QuickDeleteEarmarkButton spotifyAlbumId={album.id}/>
            </div>
        </div>
    </AlbumCard>
}