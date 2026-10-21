import {useFetchEarmarks} from "../hooks/useFetchEarmarks.ts";
import EarmarkCard from "../components/EarmarkCard.tsx";
import styles from "./Earmarks.module.css";

export default function Earmarks() {
    const {data, isPending, isError, refetch, hasNextPage, isFetchingNextPage, fetchNextPage} = useFetchEarmarks();

    function renderContent() {
        if (isPending) {
            return <p className={styles.status}>Loading...</p>
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
                earmarks.map(earmark => <EarmarkCard key={earmark.id} earmark={earmark}/>)
            }</ul>
            {
                hasNextPage && <button className={styles.loadMore} type="button" onClick={() => fetchNextPage()}
                                       disabled={isFetchingNextPage}>
                    {isFetchingNextPage ? "Loading..." : "Load more"}
                </button>
            }
        </>
    }

    return <section className={styles.page}>
        <h1 className={styles.title}>Your earmarks</h1>
        {renderContent()}
    </section>
}