import type {SpotifyAlbum} from "../api/spotify.ts";
import {Link} from "react-router";

export default function SpotifyAlbumCard({album}: {
    album: SpotifyAlbum
}) {
    return <li>
        {album.imageUrl && <img src={album.imageUrl} alt={`Cover for ${album.name}`} width={64} height={64}/>}
        <div>
            <Link to={`/albums/${album.id}`}>
                <strong>{album.name}</strong>
            </Link>
            <span>{album.artists.join(", ")}</span>
            <span>{album.releaseDate}</span>
            <span>{album.albumType}</span>
        </div>
    </li>
}