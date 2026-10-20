import {useAlbumEarmark} from "../hooks/useAlbumEarmark.ts";
import {useNavigate} from "react-router";
import styles from "./CreateOrEditEarmarkButton.module.css";

export default function CreateOrEditEarmarkButton({spotifyAlbumId}: { spotifyAlbumId: string }) {
    const navigate = useNavigate();
    const {data} = useAlbumEarmark(spotifyAlbumId);

    if (!data) {
        return null;
    }

    return (
        <button className={styles.button} type="button" onClick={() => navigate(`/albums/${spotifyAlbumId}/earmark`)}>
            {data.earmark ? "Edit earmark" : "Earmark..."}
        </button>
    );
}