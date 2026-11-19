import {useAlbumEarmark} from "../../hooks/useAlbumEarmark.ts";
import styles from "./EarmarkRating.module.css";
import {MusicNoteIcon} from "../../../../components/Icon.tsx";

const MAX_RATING = 3;

export default function EarmarkRating({spotifyAlbumId}: { spotifyAlbumId: string }) {
    const {data} = useAlbumEarmark(spotifyAlbumId);
    const rating = data?.earmark?.rating;

    if (rating == null) {
        return null;
    }

    return <div className={styles.rating}>
        <div className={styles.notes} role="img" aria-label={`Rated ${rating} out of ${MAX_RATING}`}>
            {Array.from({length: MAX_RATING}, (_, i) =>
                <MusicNoteIcon key={i} className={i < rating ? styles.filled : styles.empty}/>
            )}
        </div>
    </div>
}