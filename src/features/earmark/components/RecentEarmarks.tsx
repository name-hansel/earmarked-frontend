import {useRecentEarmarks} from "../hooks/useFetchRecentEarmarks.ts";
import EarmarkAlbumCard from "./EarmarkAlbumCard.tsx";
import {Link} from "react-router";
import styles from "./RecentEarmarks.module.css";
import PageLoader from "../../../components/PageLoader.tsx";

export default function RecentEarmarks() {
    const {data: earmarks, isPending, isError, refetch} = useRecentEarmarks();

    if (isPending) {
        return <PageLoader label="Loading earmarks..."/>;
    }

    if (isError) {
        return (
            <div className={styles.error}>
                <p className={styles.alert} role="alert">Couldn't load your earmarks.</p>
                <button className={styles.retry} type="button" onClick={() => refetch()}>Retry</button>
            </div>
        );
    }

    if (earmarks.length === 0) {
        return <p className={styles.empty}>No earmarks yet. Search for an album to add one.</p>;
    }


    return <section className={styles.section}>
        <div className={styles.header}>
            <h2 className={styles.title}>Recent earmarks</h2>
            <span className={styles.dot} aria-hidden="true">·</span>
            <Link className={styles.viewAll} to="/earmarks">View all</Link>
        </div>
        <ul className={styles.list}>
            {
                earmarks.map((earmark) => <EarmarkAlbumCard key={earmark.id} earmark={earmark}/>)
            }
        </ul>
    </section>
}