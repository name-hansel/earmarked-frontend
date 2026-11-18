import {useAlbumEarmark} from "../hooks/useAlbumEarmark.ts";
import styles from "./EarmarkNote.module.css";

export default function EarmarkNote({spotifyAlbumId}: { spotifyAlbumId: string }) {
    const {data} = useAlbumEarmark(spotifyAlbumId);
    const note = data?.earmark?.note;

    if (note == null) {
        return null;
    }

    return <section className={styles.note}>
        <h2 className={styles.title}>Your note</h2>
        <p className={styles.text}>{note}</p>
    </section>
}