import type {SpotifyAlbum} from "../api/spotify.ts";

export default function SpotifyAlbumCard({album}: {
    album: SpotifyAlbum
}) {
    return <li>
        {album.imageUrl && <img src={album.imageUrl} alt={`Cover for ${album.name}`} width={64} height={64}/>}
        <div>
            <strong>{album.name}</strong>
            <span>{album.artists.join(", ")}</span>
            <span>{album.releaseDate}</span>
        </div>
    </li>
}