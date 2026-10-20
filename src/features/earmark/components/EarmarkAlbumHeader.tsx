import {useSpotifyAlbum} from "../../spotify/hooks/useSpotifyAlbum.ts";

export default function EarmarkAlbumHeader({spotifyAlbumId}: { spotifyAlbumId: string }) {
    const {data: album, isPending, isError} = useSpotifyAlbum(spotifyAlbumId);

    if (isPending) {
        return <p>Loading album...</p>
    }

    if (isError) {
        return <p role="alert">Couldn't load album details.</p>;
    }

    return <header>
        {album.imageUrl && (
            <img src={album.imageUrl} alt={`Cover of ${album.name}`} width={120} height={120}/>
        )}
        <h2>{album.name}</h2>
        <p>{album.artists.join(", ")}</p>
        <p>{album.releaseDate}</p>
    </header>
}