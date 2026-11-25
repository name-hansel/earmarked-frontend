import {useAlbumEarmark} from "../../hooks/useAlbumEarmark.ts";
import {EarmarkRating as EarmarkRatingNotes} from "../indicators/EarmarkRating.tsx";
import styles from "./EarmarkReview.module.css"

export default function EarmarkReview({spotifyAlbumId}: { spotifyAlbumId: string }) {
    const {data} = useAlbumEarmark(spotifyAlbumId);

    const rating = data?.earmark?.rating;
    const review = data?.earmark?.review;

    if (rating == null && !review) {
        return null;
    }

    return <section className={styles.review}>
        <div className={styles.header}>
            <h2 className={styles.title}>{review ? "Your review" : "Your rating"}</h2>
            {rating != null && <EarmarkRatingNotes rating={rating} size="lg"/>}
        </div>
        {review && <p className={styles.text}>{review}</p>}
    </section>
}