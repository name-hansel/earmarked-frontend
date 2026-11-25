import {
    EARMARK_RATING_FILTER_LABELS,
    EARMARK_RATING_FILTERS,
    type EarmarkRating,
    type EarmarkStatus,
    parseHas,
    parseRatingFilter,
    parseStatus
} from "../../utils/filter.ts";
import styles from "./EarmarksFilter.module.css"
import {useSyncedValue} from "../../../../hooks/useSyncedValue.ts";
import {FilterOffIcon} from "../../../../components/Icon.tsx";

export default function EarmarksFilter({
                                           status,
                                           hasNote,
                                           hasReview,
                                           rating,
                                           onStatusChange,
                                           onHasNoteChange,
                                           onHasReviewChange,
                                           onRatingChange,
                                           onClear
                                       }: {
    status: EarmarkStatus | undefined;
    hasNote: boolean | undefined;
    hasReview: boolean | undefined;
    rating: EarmarkRating | undefined;
    onStatusChange: (next: EarmarkStatus | undefined) => void;
    onHasNoteChange: (next: boolean | undefined) => void;
    onHasReviewChange: (next: boolean | undefined) => void;
    onRatingChange: (next: EarmarkRating | undefined) => void;
    onClear: () => void
}) {
    const [statusValue, setStatusValue] = useSyncedValue(status ?? "");
    const [noteValue, setNoteValue] = useSyncedValue(hasNote === undefined ? "" : String(hasNote));
    const [reviewValue, setReviewValue] = useSyncedValue(hasReview === undefined ? "" : String(hasReview));
    const [ratingValue, setRatingValue] = useSyncedValue(rating ?? "");

    const hasActiveFilters = status !== undefined || hasNote !== undefined || hasReview !== undefined || rating !== undefined;

    return <div className={styles.filters}>
        <span className={styles.groupLabel}>Filter</span>
        <div className={styles.filterRow}>
            <select aria-label="Filter by status"
                    className={styles.select}
                    value={statusValue}
                    onChange={(e) => {
                        setStatusValue(e.target.value);
                        onStatusChange(parseStatus(e.target.value));
                    }}
            >
                <option value="">All</option>
                <option value="TO_LISTEN">To listen</option>
                <option value="LISTENED">Listened</option>
            </select>

            <select aria-label="Filter by note"
                    className={styles.select}
                    value={noteValue}
                    onChange={(e) => {
                        setNoteValue(e.target.value);
                        onHasNoteChange(parseHas(e.target.value));
                    }}
            >
                <option value="">Any note</option>
                <option value="true">Has note</option>
                <option value="false">No note</option>
            </select>

            <select aria-label="Filter by rating"
                    className={styles.select}
                    value={ratingValue}
                    onChange={(e) => {
                        setRatingValue(e.target.value);
                        onRatingChange(parseRatingFilter(e.target.value));
                    }}
            >
                <option value="">Any rating</option>
                {EARMARK_RATING_FILTERS.map((filter) =>
                    <option key={filter} value={filter}>{EARMARK_RATING_FILTER_LABELS[filter]}</option>
                )}
            </select>

            <select aria-label="Filter by review"
                    className={styles.select}
                    value={reviewValue}
                    onChange={(e) => {
                        setReviewValue(e.target.value);
                        onHasReviewChange(parseHas(e.target.value));
                    }}
            >
                <option value="">Any review</option>
                <option value="true">Has review</option>
                <option value="false">No review</option>
            </select>
        </div>
        <button type="button" className={styles.clearAll} disabled={!hasActiveFilters}
                aria-label="Clear all filters" title="Clear all filters" onClick={onClear}>
            <FilterOffIcon className={styles.clearIcon}/>
        </button>
    </div>
}