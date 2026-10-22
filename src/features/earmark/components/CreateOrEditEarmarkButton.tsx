import {useAlbumEarmark} from "../hooks/useAlbumEarmark.ts";
import {useNavigate} from "react-router";
import styles from "./CreateOrEditEarmarkButton.module.css";
import {PencilIcon} from "../../../components/Icon.tsx";

export default function CreateOrEditEarmarkButton({spotifyAlbumId}: { spotifyAlbumId: string }) {
    const navigate = useNavigate();
    const {data} = useAlbumEarmark(spotifyAlbumId);

    if (!data) {
        return null;
    }

    const isEdit = Boolean(data.earmark);

    return <button className={isEdit ? `${styles.button} ${styles.iconOnly}` : styles.button}
                   type="button"
                   data-icon-only={isEdit ? "" : undefined}
                   aria-label={isEdit ? "Edit earmark" : undefined}
                   title={isEdit ? "Edit earmark" : undefined}
                   onClick={() => navigate(`/albums/${spotifyAlbumId}/earmark`)}>
        {isEdit ? <PencilIcon className={styles.icon}/> : "Earmark..."}
    </button>;

}