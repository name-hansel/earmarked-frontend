import PageLoader from "../../../../components/PageLoader.tsx";
import {useFetchEarmarks} from "../../hooks/useFetchEarmarks.ts";
import EarmarkAlbumCard from "../EarmarkAlbumCard.tsx";
import type {EarmarkSort} from "../../utils/earmarkSort.ts";
import styles from "./EarmarksContent.module.css"

export default function EarmarksContent({sort, debouncedQ}: {
    sort: EarmarkSort;
    debouncedQ: string;
}) {
    const {
        data,
        isPending,
        isError,
        refetch,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage
    } = useFetchEarmarks(sort, debouncedQ);

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