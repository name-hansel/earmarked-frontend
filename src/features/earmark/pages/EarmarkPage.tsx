import {useParams} from "react-router";
import {useAlbumEarmark} from "../hooks/useAlbumEarmark.ts";
import type {Earmark} from "../api/earmark.ts";

export default function EarmarkPage() {
    const {spotifyAlbumId} = useParams();

    if (!spotifyAlbumId) {
        return <p role="alert">Missing album</p>
    }

    return <EarmarkPageContent spotifyAlbumId={spotifyAlbumId}/>
}

function EarmarkPageContent({spotifyAlbumId}: { spotifyAlbumId: string }) {
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

function EarmarkForm({spotifyAlbumId, earmark}: {
    spotifyAlbumId: string;
    earmark: Earmark | null;
}) {
    return <h1>Earmark form</h1>
}