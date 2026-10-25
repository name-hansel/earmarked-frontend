import type {SpotifyAlbum} from "../api/spotify.ts";
import {useAlbumEarmarks} from "../../earmark/hooks/useAlbumEarmarks.ts";
import PageLoader from "../../../components/page-loader/PageLoader.tsx";
import SpotifySearchAlbumCard from "./SpotifySearchAlbumCard.tsx";
import styles from "./SpotifySearchResults.module.css"

export default function SpotifySearchResults({albums}: { albums: SpotifyAlbum[] }) {
    const ids = albums.map((album) => album.id);

    // One batch request fills the per-album earmark cache entries (earmarkKeys.album),
    // which is what the cards read, so no card fetches its own earmark.
    // The result isn't passed down: the cards must follow the cache, so they
    // update when an earmark is created or deleted.
    const {isPending} = useAlbumEarmarks(ids);

    if (isPending) {
        return <PageLoader/>
    }

    return <ul className={styles.results}>
        {albums.map((album) => <SpotifySearchAlbumCard key={album.id} album={album}/>)}
    </ul>
}