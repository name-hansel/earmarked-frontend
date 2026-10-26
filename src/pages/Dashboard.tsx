import styles from "./Dashboard.module.css";
import SpotifyAlbumSearch from "../features/spotify/components/SpotifyAlbumSearch.tsx";
import RecentEarmarks from "../features/earmark/components/RecentEarmarks.tsx";
import {useDocumentTitle} from "../hooks/useDocumentTitle.ts";
import {useState} from "react";
import {useSearchParams} from "react-router";

export default function Dashboard({username}: { username: string }) {
    useDocumentTitle("Dashboard");
    const [searchParams] = useSearchParams();
    const [input, setInput] = useState(searchParams.get("q") ?? "");
    const isSearching = input.trim().length > 1;

    return <section className={styles.dashboard}>
        <div className={styles.intro}>
            <h1 className={styles.title}>Welcome back, {username}!</h1>
            <SpotifyAlbumSearch input={input} onInputChange={setInput}/>
        </div>
        {!isSearching && <RecentEarmarks/>}
    </section>
}