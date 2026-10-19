import {Link} from "react-router";
import type {Earmark} from "../api/earmark.ts";

export default function EarmarkCard({earmark}: { earmark: Earmark }) {
    const {album, spotifyAlbumId} = earmark;

    return <li>
        <Link to={`/albums/${spotifyAlbumId}`}>
            {
                album?.imageUrl &&
                <img src={album.imageUrl} alt={`Cover of ${album.name}`} width={64} height={64}/>
            }
            <span>{album ? album.name : "Album unavailable"}</span>
            {album && <span>{album.artists.join(", ")}</span>}
        </Link>
    </li>
}