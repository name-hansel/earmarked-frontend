import SpotifyAlbumSearch from "../features/spotify/components/SpotifyAlbumSearch.tsx";
import RecentEarmarks from "../features/earmark/components/RecentEarmarks.tsx";

export default function Dashboard() {
    return <section>
        <h1>Dashboard</h1>
        <SpotifyAlbumSearch/>
        <RecentEarmarks/>
    </section>
}