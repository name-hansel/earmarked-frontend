import {useAlbumEarmark} from "../hooks/useAlbumEarmark.ts";
import {useNavigate} from "react-router";

export default function EarmarkPageButton({spotifyAlbumId}: { spotifyAlbumId: string }) {
    const navigate = useNavigate();
    const {data} = useAlbumEarmark(spotifyAlbumId);

    if (!data) {
        return null;
    }

    return (
        <button type="button" onClick={() => navigate(`/albums/${spotifyAlbumId}/earmark`)}>
            {data.earmark ? "Edit earmark" : "Earmark..."}
        </button>
    );
}