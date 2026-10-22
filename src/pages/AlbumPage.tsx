import {Link, useLocation, useParams} from "react-router";
import {useSpotifyAlbum} from "../features/spotify/hooks/useSpotifyAlbum.ts";
import {isAxiosError} from "axios";
import type {ApiErrorBody} from "../lib/errors.ts";
import {formatDuration} from "../features/spotify/utils/formatDuration.ts";
import QuickEarmarkButton from "../features/earmark/components/QuickEarmarkButton.tsx";
import EarmarkNote from "../features/earmark/components/EarmarkNote.tsx";
import styles from "./AlbumPage.module.css";
import {formatReleaseDate} from "../utils/formatReleaseDate.ts";
import {pickImage} from "../utils/pickImage.ts";
import SpotifyLogoLink from "../components/spotify/SpotifyLogoLink.tsx";
import DeleteEarmarkButton from "../features/earmark/components/DeleteEarmarkButton.tsx";
import CreateOrEditEarmarkButton from "../features/earmark/components/CreateOrEditEarmarkButton.tsx";
import PageLoader from "../components/PageLoader.tsx";

export default function AlbumPage() {
    const location = useLocation();
    const {spotifyAlbumId} = useParams<{ spotifyAlbumId: string }>();
    const {data: album, isPending, isError, error} = useSpotifyAlbum(spotifyAlbumId);
    const fromSearch = (location.state as { fromSearch?: string })?.fromSearch ?? "";
    const backTo = `/${fromSearch}`

    if (isPending) {
        return <section className={styles.page}>
            <PageLoader label="Loading album..."/>
        </section>
    }

    if (isError) {
        const code = isAxiosError<ApiErrorBody>(error) ? error.response?.data?.code : undefined;
        const notFound = code === "ALBUM_NOT_FOUND" || code === "VALIDATION_ERROR";

        return (
            <section className={styles.page}>
                <p className={styles.alert} role="alert">
                    {notFound ? "Album not found." : "Couldn't load this album. Please try again."}
                </p>
                <Link className={styles.back} to={backTo}><span aria-hidden="true">←</span> Back</Link>
            </section>
        );
    }

    const albumCover = pickImage(album.images, 640);

    return <article className={styles.page}>
        <Link className={styles.back} to={backTo}><span aria-hidden="true">←</span> Back</Link>
        <div className={styles.hero}>
            <div className={styles.imageRow}>
                {albumCover
                    ? <img className={styles.cover} src={albumCover.url} alt={`Cover of ${album.name}`} width={300}
                           height={300}/>
                    : <div className={styles.placeholder} aria-hidden="true"/>}
                <SpotifyLogoLink className={styles.spotify} url={album.spotifyUrl}/>
            </div>
            <div className={styles.info}>
                <h1 className={styles.title}>{album.name}</h1>
                <p className={styles.artists}>{album.artists.join(", ")}</p>
                <p className={styles.meta}>
                    {formatReleaseDate(album.releaseDate)}
                    {album.totalTracks != null && ` · ${album.totalTracks} tracks`}
                </p>
                <EarmarkNote spotifyAlbumId={album.id}/>
                <div className={styles.actions}>
                    <QuickEarmarkButton spotifyAlbumId={album.id} label="Quick earmark"/>
                    <div className={styles.iconGroup}>
                        <CreateOrEditEarmarkButton spotifyAlbumId={album.id}/>
                        <DeleteEarmarkButton spotifyAlbumId={album.id}/>
                    </div>
                </div>
            </div>
        </div>
        <ol className={styles.tracks}>
            {album.tracks.map((track) => (
                <li className={styles.track} key={track.id}>
                    <span className={styles.trackName}>{track.name}</span>
                    <span className={styles.duration}>{formatDuration(track.durationMs)}</span>
                </li>
            ))}
        </ol>
    </article>
}