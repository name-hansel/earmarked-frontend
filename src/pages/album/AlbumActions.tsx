import type {SpotifyAlbumDetails} from "../../features/spotify/api/spotify.ts";
import QuickEarmarkButton from "../../features/earmark/components/QuickEarmarkButton.tsx";
import DeleteEarmarkButton from "../../features/earmark/components/DeleteEarmarkButton.tsx";
import CreateOrEditEarmarkButton from "../../features/earmark/components/CreateOrEditEarmarkButton.tsx";
import styles from "./AlbumPage.module.css"
import EarmarkDate from "../../features/earmark/components/EarmarkDate.tsx";

export default function AlbumActions({album}: { album: SpotifyAlbumDetails }) {
    return <div className={styles.actions}>
        <div className={styles.earmarkStatus}>
            <EarmarkDate spotifyAlbumId={album.id} showIcon={false}/>
            <QuickEarmarkButton spotifyAlbumId={album.id} label="Quick earmark"/>
        </div>
        <div className={styles.iconGroup}>
            <CreateOrEditEarmarkButton spotifyAlbumId={album.id}/>
            <DeleteEarmarkButton spotifyAlbumId={album.id}/>
        </div>
    </div>
}