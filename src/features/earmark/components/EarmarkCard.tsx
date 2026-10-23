import type {Earmark} from "../api/earmark.ts";
import styles from "./EarmarkCard.module.css";
import {formatDate} from "../../../utils/formatDate.ts";
import {pickImage} from "../../../utils/pickImage.ts";
import {BookmarkIcon} from "../../../components/Icon.tsx";
import AlbumCard from "../../album/components/AlbumCard.tsx";
import QuickDeleteEarmarkButton from "./QuickDeleteEarmarkButton.tsx";

export default function EarmarkCard({earmark}: { earmark: Earmark }) {
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
        footerStart={
            <time className={styles.date}
                  dateTime={earmark.createdAt}
                  title={`Earmarked on ${formatDate(earmark.createdAt)}`}>
                <BookmarkIcon className={styles.icon}/>
                <span className={styles.srOnly}>Earmarked on </span>
                {formatDate(earmark.createdAt)}
            </time>
        }
        actions={
            <QuickDeleteEarmarkButton spotifyAlbumId={spotifyAlbumId}/>
        }>
        {earmark.note && <p className={styles.note}>{earmark.note}</p>}
    </AlbumCard>
}