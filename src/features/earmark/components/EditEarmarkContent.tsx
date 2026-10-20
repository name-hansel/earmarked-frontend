import {useAlbumEarmark} from "../hooks/useAlbumEarmark.ts";
import EarmarkForm from "./EditEarmarkForm.tsx";

export default function EditEarmarkContent({spotifyAlbumId}: { spotifyAlbumId: string }) {
    const {data, isPending, isError, refetch} = useAlbumEarmark(spotifyAlbumId);

    if (isPending) {
        return <p>Loading...</p>
    }

    if (isError) {
        return (
            <div>
                <p role="alert">Couldn't load earmark status.</p>
                <button type="button" onClick={() => refetch()}>Retry</button>
            </div>
        );
    }

    return <EarmarkForm spotifyAlbumId={spotifyAlbumId} earmark={data.earmark}/>
}