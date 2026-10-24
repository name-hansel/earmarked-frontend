import {useParams} from "react-router";
import EditEarmarkContent from "../components/editEarmark/EditEarmarkContent.tsx";
import styles from "./EditEarmarkPage.module.css";
import {useDocumentTitle} from "../../../hooks/useDocumentTitle.ts";

export default function EditEarmarkPage() {
    const {spotifyAlbumId} = useParams();
    useDocumentTitle("Edit earmark");

    if (!spotifyAlbumId) {
        return <div className={styles.page}>
            <p className={styles.alert} role="alert">Missing album</p>
        </div>
    }

    return <div className={styles.page}>
        <EditEarmarkContent spotifyAlbumId={spotifyAlbumId}/>
    </div>
}