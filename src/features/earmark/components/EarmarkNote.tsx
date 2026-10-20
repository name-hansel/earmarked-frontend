import {useAlbumEarmark} from "../hooks/useAlbumEarmark.ts";
import styles from "./EarmarkNote.module.css";

export default function EarmarkNote({spotifyAlbumId}: { spotifyAlbumId: string }) {
    const {data} = useAlbumEarmark(spotifyAlbumId);

    if (!data) {
        return null;
    }

    const note = data.earmark?.note;

    return note && <section className={styles.note}>
        <h2 className={styles.title}>Your note</h2>
        <p className={styles.text}>{data.earmark?.note}</p>
    </section>
}