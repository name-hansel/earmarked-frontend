import type {Earmark} from "../api/earmark.ts";
import styles from "./EarmarkAlbumCard.module.css";
import {pickImage} from "../../../utils/pickImage.ts";
import AlbumCard from "../../album/components/AlbumCard.tsx";
import EarmarkDate from "./EarmarkDate.tsx";
import DeleteEarmarkButton from "./DeleteEarmarkButton.tsx";

export default function EarmarkAlbumCard({earmark}: { earmark: Earmark }) {
    const {album, spotifyAlbumId} = earmark;

    const albumCover = album ? pickImage(album.images, 300) : undefined;

    return <AlbumCard
        to={`/albums/${spotifyAlbumId}`}
        linkTitle={album ? `${album.name} — ${album.artists.join(", ")}` : undefined}
        name={album ? album.name : "Album unavailable"}
        artists={album?.artists.join(", ")}
        unavailable={!album}
        cover={albumCover}
        coverAlt={album ? `Cover of ${album.name}` : ""}
        releaseDate={album?.releaseDate}
        albumType={album?.albumType}
        spotifyUrl={album?.spotifyUrl}
        footerStart={<EarmarkDate spotifyAlbumId={spotifyAlbumId} showIcon/>}
        actions={
            <DeleteEarmarkButton spotifyAlbumId={spotifyAlbumId} albumName={album?.name}/>
        }>
        {earmark.note && <p className={styles.note}>{earmark.note}</p>}
    </AlbumCard>
}