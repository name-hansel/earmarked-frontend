import PageLoader from "../../../../components/page-loader/PageLoader.tsx";
import {useFetchEarmarks} from "../../hooks/useFetchEarmarks.ts";
import EarmarkAlbumCard from "../card/EarmarkAlbumCard.tsx";
import type {EarmarkSort} from "../../utils/earmarkSort.ts";
import styles from "./EarmarksContent.module.css"
import type {EarmarkRating, EarmarkStatus} from "../../utils/filter.ts";

export default function EarmarksContent({sort, q, status, hasNote, rating}: {
    sort: EarmarkSort;
    q: string;
    status: EarmarkStatus | undefined;
    hasNote: boolean | undefined;
    rating: EarmarkRating | undefined;
}) {
    const {
        data,
        isPending,
        isError,
        refetch,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
        isPlaceholderData
    } = useFetchEarmarks(sort, q, status, hasNote, rating);

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
    const total = data.pages.at(-1)!.page.totalElements;

    if (earmarks.length === 0) {
        if (q) {
            return <p className={styles.empty}>No earmarks match “{q}”.</p>;
        }

        if (status !== undefined || hasNote !== undefined || rating !== undefined) {
            return <p className={styles.empty}>No earmarks match these filters.</p>;
        }

        return <p className={styles.empty}>You haven't earmarked anything yet.</p>;
    }

    return <>
        <p className={styles.count}>{total} {total === 1 ? "earmark" : "earmarks"}</p>
        <ul className={isPlaceholderData ? `${styles.list} ${styles.refreshing}` : styles.list}>
            {
                earmarks.map(earmark => <EarmarkAlbumCard key={earmark.id} earmark={earmark} sort={sort}/>)
            }
        </ul>
        {
            hasNextPage && <button className={styles.loadMore} type="button" onClick={() => fetchNextPage()}
                                   disabled={isFetchingNextPage}>
                {isFetchingNextPage ? "Loading..." : "Load more"}
            </button>
        }
    </>
}