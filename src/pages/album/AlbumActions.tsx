import type {SpotifyAlbumDetails} from "../../features/spotify/api/spotify.ts";
import QuickEarmarkButton from "../../features/earmark/components/buttons/QuickEarmarkButton.tsx";
import DeleteEarmarkButton from "../../features/earmark/components/buttons/DeleteEarmarkButton.tsx";
import CreateOrEditEarmarkButton from "../../features/earmark/components/buttons/CreateOrEditEarmarkButton.tsx";
import styles from "./AlbumPage.module.css"
import EarmarkDate from "../../features/earmark/components/EarmarkDate.tsx";
import ListenedEarmarkButton from "../../features/earmark/components/buttons/ListenedEarmarkButton.tsx";
import {useAlbumEarmark} from "../../features/earmark/hooks/useAlbumEarmark.ts";

export default function AlbumActions({album}: { album: SpotifyAlbumDetails }) {
    const {data} = useAlbumEarmark(album.id);

    return <div className={styles.actions}>
        <div className={styles.earmarkStatus}>
            {data?.earmark && <EarmarkDate earmark={data.earmark} showIcon={false}/>}
            <QuickEarmarkButton spotifyAlbumId={album.id} label="Quick earmark" albumName={album.name}/>
            <ListenedEarmarkButton spotifyAlbumId={album.id} albumName={album.name}/>
        </div>
        <div className={styles.iconGroup}>
            <CreateOrEditEarmarkButton spotifyAlbumId={album.id}/>
            {
                data?.earmark && <DeleteEarmarkButton spotifyAlbumId={album.id} albumName={album.name} withConfirmation
                                                      earmark={data.earmark}/>
            }
        </div>
    </div>
}