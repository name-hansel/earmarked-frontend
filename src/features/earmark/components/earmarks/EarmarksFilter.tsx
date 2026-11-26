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
import {FilterOffIcon} from "../../../../components/Icon.tsx";
import Dropdown, {type DropdownOption} from "../../../../components/dropdown/Dropdown.tsx";

const STATUS_OPTIONS: DropdownOption[] = [
    {value: "", label: "All"},
    {value: "TO_LISTEN", label: "To listen"},
    {value: "LISTENED", label: "Listened"},
];

const HAS_NOTE_OPTIONS: DropdownOption[] = [
    {value: "", label: "Any note"},
    {value: "true", label: "Has note"},
    {value: "false", label: "No note"},
];

const HAS_REVIEW_OPTIONS: DropdownOption[] = [
    {value: "", label: "Any review"},
    {value: "true", label: "Has review"},
    {value: "false", label: "No review"},
];

const RATING_OPTIONS: DropdownOption[] = [
    {value: "", label: "Any rating"},
    ...EARMARK_RATING_FILTERS.map((filter) => ({value: filter, label: EARMARK_RATING_FILTER_LABELS[filter]})),
];

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
    const hasActiveFilters = status !== undefined || hasNote !== undefined || hasReview !== undefined || rating !== undefined;

    return <div className={styles.filters}>
        <span className={styles.groupLabel}>Filter</span>
        <div className={styles.filterRow}>
            <Dropdown ariaLabel="Filter by status" className={styles.select}
                      value={status ?? ""} options={STATUS_OPTIONS}
                      onChange={(next) => onStatusChange(parseStatus(next))}/>
            <Dropdown ariaLabel="Filter by note" className={styles.select}
                      value={hasNote === undefined ? "" : String(hasNote)} options={HAS_NOTE_OPTIONS}
                      onChange={(next) => onHasNoteChange(parseHas(next))}/>
            <Dropdown ariaLabel="Filter by rating" className={styles.select}
                      value={rating ?? ""} options={RATING_OPTIONS}
                      onChange={(next) => onRatingChange(parseRatingFilter(next))}/>
            <Dropdown ariaLabel="Filter by review" className={styles.select}
                      value={hasReview === undefined ? "" : String(hasReview)} options={HAS_REVIEW_OPTIONS}
                      onChange={(next) => onHasReviewChange(parseHas(next))}/>
        </div>
        <button type="button" className={styles.clearAll} disabled={!hasActiveFilters}
                aria-label="Clear all filters" title="Clear all filters" onClick={onClear}>
            <FilterOffIcon className={styles.clearIcon}/>
        </button>
    </div>
}