import styles from "./Earmarks.module.css";
import {DEFAULT_EARMARK_SORT, type EarmarkSort, isEarmarkSort} from "../utils/earmarkSort.ts";
import {useSearchParams} from "react-router";
import {useDebounce} from "../../../hooks/useDebounce.ts";
import EarmarksSortDropdown from "../components/earmarks/EarmarksSortDropdown.tsx";
import EarmarksContent from "../components/earmarks/EarmarksContent.tsx";
import SearchInput from "../../../components/search/SearchInput.tsx";
import {
    type EarmarkRating,
    type EarmarkStatus,
    FILTER_PARAMS,
    parseHas,
    parseRatingFilter,
    parseStatus
} from "../utils/filter.ts";
import EarmarksFilter from "../components/earmarks/EarmarksFilter.tsx";
import {useDocumentTitle} from "../../../hooks/useDocumentTitle.ts";
import Page from "../../../components/page/Page.tsx";

export default function Earmarks() {
    useDocumentTitle("Your earmarks")

    const [searchParams, setSearchParams] = useSearchParams();

    const sortInput = searchParams.get("sort");
    const searchInput = searchParams.get("q") ?? "";
    const status = parseStatus(searchParams.get("status"));
    const hasNote = parseHas(searchParams.get("hasNote"));
    const hasReview = parseHas(searchParams.get("hasReview"));
    const rating = parseRatingFilter(searchParams.get("rating"));

    const debouncedQ = useDebounce(searchInput.trim(), 500);

    const sort = isEarmarkSort(sortInput) ? sortInput : DEFAULT_EARMARK_SORT;

    const handleSortChange = (next: EarmarkSort) => updateParam("sort", next);
    const handleSearchChange = (next: string) => updateParam("q", next);
    const handleStatusChange = (next: EarmarkStatus | undefined) => updateParam(FILTER_PARAMS.status, next);
    const handleHasNoteChange = (next: boolean | undefined) => updateParam(FILTER_PARAMS.hasNote, next?.toString());
    const handleHasReviewChange = (next: boolean | undefined) => updateParam(FILTER_PARAMS.hasReview, next?.toString());
    const handleRatingChange = (next: EarmarkRating | undefined) => updateParam(FILTER_PARAMS.rating, next);

    function handleClearFilters() {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            Object.values(FILTER_PARAMS).forEach((param) => params.delete(param));

            return params;
        }, {replace: true});
    }

    function updateParam(key: string, value: string | undefined) {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);

            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }

            return params;
        }, {replace: true});
    }

    return <Page>
        <div className={styles.header}>
            <div className={styles.titleRow}>
                <h1 className={styles.title}>Your earmarks</h1>
            </div>
            <div className={styles.search}>
                <SearchInput
                    value={searchInput}
                    onChange={handleSearchChange}
                    onClear={() => handleSearchChange("")}
                    clearLabel="Clear search"
                    alwaysShowClear
                    placeholder="Search album, artist or note"
                    aria-label="Search earmarks"
                    maxLength={100}
                />
            </div>
            <div className={styles.controls}>
                <div className={styles.sort}>
                    <EarmarksSortDropdown sort={sort} handleSortChange={handleSortChange}/>
                </div>
                <EarmarksFilter
                    status={status}
                    hasNote={hasNote}
                    hasReview={hasReview}
                    rating={rating}
                    onStatusChange={handleStatusChange}
                    onHasNoteChange={handleHasNoteChange}
                    onHasReviewChange={handleHasReviewChange}
                    onRatingChange={handleRatingChange}
                    onClear={handleClearFilters}
                />
            </div>
        </div>
        <EarmarksContent sort={sort} q={debouncedQ} status={status} hasNote={hasNote} hasReview={hasReview}
                         rating={rating}/>
    </Page>
}

