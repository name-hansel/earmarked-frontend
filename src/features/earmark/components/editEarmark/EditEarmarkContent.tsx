import {useAlbumEarmark} from "../../hooks/useAlbumEarmark.ts";
import EditEarmarkForm from "./EditEarmarkForm.tsx";
import styles from "./EditEarmarkContent.module.css";

export default function EditEarmarkContent({spotifyAlbumId}: { spotifyAlbumId: string }) {
    const {data, isPending, isError, refetch} = useAlbumEarmark(spotifyAlbumId);

    if (isPending) {
        return <p className={styles.status}>Loading...</p>
    }

    if (isError) {
        return (
            <div className={styles.error}>
                <p className={styles.alert} role="alert">Couldn't load earmark status.</p>
                <button className={styles.retry} type="button" onClick={() => refetch()}>Retry</button>
            </div>
        );
    }

    return <EditEarmarkForm spotifyAlbumId={spotifyAlbumId} earmark={data.earmark}/>
}