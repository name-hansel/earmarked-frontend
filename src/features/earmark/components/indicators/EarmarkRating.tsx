import {MusicNoteIcon, MusicNoteOffIcon} from "../../../../components/Icon";
import styles from "./EarmarkRating.module.css"
import {MAX_RATING} from "../../constants.ts";

export function EarmarkRating({rating, size = "md"}: {
    rating: number,
    size?: "sm" | "md" | "lg"
}) {
    const label = rating === 0 ? "Didn't like it" : `Rated ${rating} out of ${MAX_RATING}`;

    return <span className={styles.notes} data-size={size} role="img" aria-label={label} title={label}>
        {rating === 0
            ? <MusicNoteOffIcon className={`${styles.icon} ${styles.empty}`}/>
            : Array.from({length: MAX_RATING}, (_, i) =>
                <MusicNoteIcon key={i} className={`${styles.icon} ${i < rating ? styles.filled : styles.empty}`}/>
            )}
    </span>;
}