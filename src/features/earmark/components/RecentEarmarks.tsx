import {useRecentEarmarks} from "../hooks/useFetchEarmarks.ts";

export default function RecentEarmarks() {
    const {data: earmarks, isPending, isError, refetch} = useRecentEarmarks();

    if (isPending) {
        return <p>Loading earmarks...</p>;
    }

    if (isError) {
        return (
            <div>
                <p role="alert">Couldn't load your earmarks.</p>
                <button type="button" onClick={() => refetch()}>Retry</button>
            </div>
        );
    }

    if (earmarks.length === 0) {
        return <p>No earmarks yet. Search for an album to add one.</p>;
    }

    return <section>
        <h2>Recent earmarks</h2>
        <ul>
            {
                earmarks.map((earmark) => <li key={earmark.id}>{earmark.spotifyAlbumId}</li>)
            }
        </ul>
    </section>
}