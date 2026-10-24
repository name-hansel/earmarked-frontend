import styles from "./Dashboard.module.css";
import SpotifyAlbumSearch from "../features/spotify/components/SpotifyAlbumSearch.tsx";
import RecentEarmarks from "../features/earmark/components/RecentEarmarks.tsx";
import {useDocumentTitle} from "../hooks/useDocumentTitle.ts";

export default function Dashboard({username}: { username: string }) {
    useDocumentTitle("Dashboard")

    return <section className={styles.dashboard}>
        <div className={styles.intro}>
            <h1 className={styles.title}>Welcome back, {username}!</h1>
            <SpotifyAlbumSearch/>
        </div>
        <RecentEarmarks/>
    </section>
}