import {useAlbumEarmark} from "../../hooks/useAlbumEarmark.ts";
import styles from "./EarmarkRating.module.css";
import {EarmarkRating as EarmarkRatingComponent} from "../indicators/EarmarkRating.tsx";

export default function EarmarkRating({spotifyAlbumId}: { spotifyAlbumId: string }) {
    const {data} = useAlbumEarmark(spotifyAlbumId);
    const rating = data?.earmark?.rating;

    if (rating == null) {
        return null;
    }

    return <div className={styles.rating}>
        <EarmarkRatingComponent rating={rating}/>
    </div>
}