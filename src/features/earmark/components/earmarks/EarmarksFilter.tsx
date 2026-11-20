import {
    EARMARK_RATING_FILTER_LABELS,
    EARMARK_RATING_FILTERS,
    type EarmarkRating,
    type EarmarkStatus,
    parseHasNote,
    parseRatingFilter,
    parseStatus
} from "../../utils/filter.ts";
import styles from "./EarmarksFilter.module.css"

export default function EarmarksFilter({status, hasNote, rating, onStatusChange, onHasNoteChange, onRatingChange}: {
    status: EarmarkStatus | undefined;
    hasNote: boolean | undefined;
    rating: EarmarkRating | undefined;
    onStatusChange: (next: EarmarkStatus | undefined) => void;
    onHasNoteChange: (next: boolean | undefined) => void;
    onRatingChange: (next: EarmarkRating | undefined) => void;
}) {
    return <div className={styles.filters}>
        <span className={styles.groupLabel}>Filter</span>
        <select aria-label="Filter by status"
                className={styles.select}
                value={status ?? ""}
                onChange={(e) => onStatusChange(parseStatus(e.target.value))}
        >
            <option value="">All</option>
            <option value="TO_LISTEN">To listen</option>
            <option value="LISTENED">Listened</option>
        </select>

        <select aria-label="Filter by note"
                className={styles.select}
                value={hasNote === undefined ? "" : String(hasNote)}
                onChange={(e) => onHasNoteChange(parseHasNote(e.target.value))}
        >
            <option value="">Any note</option>
            <option value="true">Has note</option>
            <option value="false">No note</option>
        </select>

        <select aria-label="Filter by rating"
                className={styles.select}
                value={rating ?? ""}
                onChange={(e) => onRatingChange(parseRatingFilter(e.target.value))}
        >
            <option value="">Any rating</option>
            {EARMARK_RATING_FILTERS.map((filter) =>
                <option key={filter} value={filter}>{EARMARK_RATING_FILTER_LABELS[filter]}</option>
            )}
        </select>
    </div>
}