import {useParams} from "react-router";
import EditEarmarkContent from "../components/editEarmark/EditEarmarkContent.tsx";
import styles from "./EditEarmarkPage.module.css";
import {useDocumentTitle} from "../../../hooks/useDocumentTitle.ts";
import Page from "../../../components/page/Page.tsx";

export default function EditEarmarkPage() {
    const {spotifyAlbumId} = useParams();
    useDocumentTitle("Edit earmark");

    if (!spotifyAlbumId) {
        return <Page>
            <p className={styles.alert} role="alert">Missing album</p>
        </Page>
    }

    return <Page>
        <EditEarmarkContent spotifyAlbumId={spotifyAlbumId}/>
    </Page>
}