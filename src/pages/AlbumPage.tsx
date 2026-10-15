import {Link, useParams} from "react-router";
import {useSpotifyAlbum} from "../features/spotify/hooks/useSpotifyAlbum.ts";
import {isAxiosError} from "axios";
import type {ApiErrorBody} from "../lib/errors.ts";
import {formatDuration} from "../features/spotify/utils/formatDuration.ts";

export default function AlbumPage() {
    const {spotifyId} = useParams<{ spotifyId: string }>();
    const {data: album, isPending, isError, error} = useSpotifyAlbum(spotifyId);

    if (isPending) {
        return <p>Loading album...</p>
    }

    if (isError) {
        const code = isAxiosError<ApiErrorBody>(error) ? error.response?.data?.code : undefined;
        const notFound = code === "ALBUM_NOT_FOUND" || code === "VALIDATION_ERROR";

        return (
            <section>
                <p role="alert">
                    {notFound ? "Album not found." : "Couldn't load this album. Please try again."}
                </p>
                <Link to="/">Back to search</Link>
            </section>
        );
    }

    return <article>
        {album.imageUrl && <img src={album.imageUrl} alt={`Cover of ${album.name}`} width={300} height={300}/>}
        <h1>{album.name}</h1>
        <p>{album.artists.join(", ")}</p>
        <p>
            {album.releaseDate}
            {album.totalTracks != null && ` · ${album.totalTracks} tracks`}
        </p>
        <ol>
            {album.tracks.map((track) => (
                <li key={track.id}>
                    <span>{track.name}</span> <span>{formatDuration(track.durationMs)}</span>
                </li>
            ))}
        </ol>
    </article>
}