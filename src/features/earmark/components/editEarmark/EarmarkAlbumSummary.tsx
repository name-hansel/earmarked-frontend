import {useSpotifyAlbum} from "../../../spotify/hooks/useSpotifyAlbum.ts";
import styles from "./EarmarkAlbumSummary.module.css";
import {formatReleaseDate} from "../../../../utils/formatReleaseDate.ts";
import {pickImage} from "../../../../utils/pickImage.ts";
import SpotifyLogoLink from "../../../../components/spotify/SpotifyLogoLink.tsx";
import PageLoader from "../../../../components/page-loader/PageLoader.tsx";
import CoverImage from "../../../../components/image/CoverImage.tsx";

export default function EarmarkAlbumSummary({spotifyAlbumId}: { spotifyAlbumId: string }) {
    const {data: album, isPending, isError} = useSpotifyAlbum(spotifyAlbumId);

    if (isPending) {
        return <PageLoader label="Loading album..."/>
    }

    if (isError) {
        return <p className={styles.alert} role="alert">Couldn't load album details.</p>;
    }

    const releaseDate = album.releaseDate;

    const meta = [releaseDate && formatReleaseDate(releaseDate, album.releaseDatePrecision), album.albumType]
        .filter(Boolean)
        .join(" · ");

    return <header className={styles.header}>
        <CoverImage image={pickImage(album.images, 240)} alt={`Cover of ${album.name}`} className={styles.cover}/>
        <div className={styles.info}>
            <h2 className={styles.name} title={album.name}>{album.name}</h2>
            <p className={styles.artists} title={album.artists.join(", ")}>{album.artists.join(", ")}</p>
            {meta && <p className={styles.meta}>{meta}</p>}
            <SpotifyLogoLink className={styles.spotify} url={album.spotifyUrl}/>
        </div>
    </header>
}