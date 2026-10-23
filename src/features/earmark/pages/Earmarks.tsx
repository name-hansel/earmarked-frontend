import {useFetchEarmarks} from "../hooks/useFetchEarmarks.ts";
import EarmarkAlbumCard from "../components/EarmarkAlbumCard.tsx";
import styles from "./Earmarks.module.css";
import PageLoader from "../../../components/PageLoader.tsx";
import {DEFAULT_EARMARK_SORT, EARMARK_SORT_OPTIONS, type EarmarkSort, isEarmarkSort} from "../utils/earmarkSort.ts";
import {useSearchParams} from "react-router";

export default function Earmarks() {
    const [searchParams, setSearchParams] = useSearchParams();
    const param = searchParams.get("sort");
    const sort = isEarmarkSort(param) ? param : DEFAULT_EARMARK_SORT;

    const {
        data,
        isPending,
        isError,
        refetch,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage
    } = useFetchEarmarks(sort);

    function renderContent() {
        if (isPending) {
            return <PageLoader/>
        }

        if (isError) {
            return <div className={styles.error}>
                <p className={styles.alert} role="alert">Couldn't load your earmarks.</p>
                <button className={styles.retry} type="button" onClick={() => refetch()}>Retry</button>
            </div>
        }

        const earmarks = data.pages.flatMap(page => page.content);

        if (earmarks.length === 0) {
            return <p className={styles.empty}>No earmarks yet. Search for an album to add one.</p>;
        }

        return <>
            <ul className={styles.list}>{
                earmarks.map(earmark => <EarmarkAlbumCard key={earmark.id} earmark={earmark}/>)
            }</ul>
            {
                hasNextPage && <button className={styles.loadMore} type="button" onClick={() => fetchNextPage()}
                                       disabled={isFetchingNextPage}>
                    {isFetchingNextPage ? "Loading..." : "Load more"}
                </button>
            }
        </>
    }

    function handleSortChange(next: EarmarkSort) {
        setSearchParams(
            (prev) => {
                const params = new URLSearchParams(prev);
                params.set("sort", next);
                return params;
            },
            {replace: true},
        );
    }

    return <section className={styles.page}>
        <div className={styles.header}>
            <h1 className={styles.title}>Your earmarks</h1>
            {sortDropdown(sort, handleSortChange)}
        </div>
        {renderContent()}
    </section>
}

function sortDropdown(sort: EarmarkSort, handleSortChange: (next: EarmarkSort) => void) {
    return <label className={styles.sortLabel}>
        <span>Sort by</span>
        <select
            className={styles.sortSelect}
            value={sort}
            onChange={(e) => handleSortChange(e.target.value as EarmarkSort)}
        >
            {EARMARK_SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
            ))}
        </select>
    </label>
}