import {useFetchEarmarks} from "../hooks/useFetchEarmarks.ts";
import EarmarkAlbumCard from "../components/EarmarkAlbumCard.tsx";
import styles from "./Earmarks.module.css";
import PageLoader from "../../../components/PageLoader.tsx";
import {DEFAULT_EARMARK_SORT, type EarmarkSort, isEarmarkSort} from "../utils/earmarkSort.ts";
import {useSearchParams} from "react-router";
import EarmarkSearch from "../components/EarmarkSearch.tsx";
import {useDebounce} from "../../../hooks/useDebounce.ts";
import EarmarksSortDropdown from "../components/earmarks/EarmarksSortDropdown.tsx";

export default function Earmarks() {
    const [searchParams, setSearchParams] = useSearchParams();

    const sortInput = searchParams.get("sort");
    const searchInput = searchParams.get("q") ?? "";
    const debouncedQ = useDebounce(searchInput.trim(), 500);

    const sort = isEarmarkSort(sortInput) ? sortInput : DEFAULT_EARMARK_SORT;

    const {
        data,
        isPending,
        isError,
        refetch,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage
    } = useFetchEarmarks(sort, debouncedQ);

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

                if (next) {
                    params.set("sort", next);
                } else {
                    params.delete("sort");
                }

                return params;
            },
            {replace: true});
    }

    function handleSearchChange(next: string) {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);

            if (next) {
                params.set("q", next);
            } else {
                params.delete("q");
            }

            return params;
        }, {replace: true});
    }

    return <section className={styles.page}>
        <div className={styles.header}>
            <h1 className={styles.title}>Your earmarks</h1>
            <EarmarkSearch value={searchInput} onChange={handleSearchChange}/>
            <EarmarksSortDropdown sort={sort} handleSortChange={handleSortChange}/>
        </div>
        {renderContent()}
    </section>
}

