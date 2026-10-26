import {useLocation, useParams} from "react-router";
import {useSpotifyAlbum} from "../../features/spotify/hooks/useSpotifyAlbum.ts";
import {isAxiosError} from "axios";
import type {ApiErrorBody} from "../../lib/errors.ts";
import EarmarkNote from "../../features/earmark/components/EarmarkNote.tsx";
import styles from "./AlbumPage.module.css";
import {pickImage} from "../../utils/pickImage.ts";
import SpotifyLogoLink from "../../components/spotify/SpotifyLogoLink.tsx";
import PageLoader from "../../components/page-loader/PageLoader.tsx";
import CoverImage from "../../components/image/CoverImage.tsx";
import AlbumTracks from "./AlbumTracks.tsx";
import AlbumActions from "./AlbumActions.tsx";
import AlbumMetadata from "./AlbumMetadata.tsx";
import {useDocumentTitle} from "../../hooks/useDocumentTitle.ts";
import BackLink from "../../components/back-link/BackLink.tsx";
import Page from "../../components/page/Page.tsx";

export default function AlbumPage() {
    const location = useLocation();
    const {spotifyAlbumId} = useParams<{ spotifyAlbumId: string }>();
    const {data: album, isPending, isError, error} = useSpotifyAlbum(spotifyAlbumId);
    const backTo = (location.state as { from?: string } | null)?.from ?? "/";

    useDocumentTitle(album?.name)

    if (isPending) {
        return <Page>
            <PageLoader label="Loading album..."/>
        </Page>
    }

    if (isError) {
        const code = isAxiosError<ApiErrorBody>(error) ? error.response?.data?.code : undefined;
        const notFound = code === "ALBUM_NOT_FOUND" || code === "VALIDATION_ERROR";

        return (
            <Page>
                <BackLink backTo={backTo}/>
                <p className={styles.alert} role="alert">
                    {notFound ? "Album not found." : "Couldn't load this album. Please try again."}
                </p>
            </Page>
        );
    }

    return <Page>
        <BackLink backTo={backTo}/>
        <div className={styles.hero}>
            <div className={styles.imageRow}>
                <CoverImage image={pickImage(album.images, 640)} alt={`Cover of ${album.name}`}
                            className={styles.cover}/>
                <SpotifyLogoLink className={styles.spotify} url={album.spotifyUrl}/>
            </div>
            <div className={styles.info}>
                <AlbumMetadata album={album}/>
                <EarmarkNote spotifyAlbumId={album.id}/>
                <AlbumActions album={album}/>
            </div>
        </div>
        <AlbumTracks album={album}/>
    </Page>
}