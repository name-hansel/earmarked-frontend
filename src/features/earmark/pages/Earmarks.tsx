import {useFetchEarmarks} from "../hooks/useFetchEarmarks.ts";
import EarmarkCard from "../components/EarmarkCard.tsx";

export default function Earmarks() {
    const {data, isPending, isError, refetch, hasNextPage, isFetchingNextPage, fetchNextPage} = useFetchEarmarks();

    if (isPending) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <div>
            <p role="alert">Couldn't load your earmarks.</p>
            <button type="button" onClick={() => refetch()}>Retry</button>
        </div>
    }

    const earmarks = data.pages.flatMap(page => page.content);

    if (earmarks.length === 0) {
        return <p>No earmarks yet. Search for an album to add one.</p>;
    }

    return <section>
        <h1>Your earmarks</h1>
        <ul>{
            earmarks.map(earmark => <EarmarkCard key={earmark.id} earmark={earmark}/>)
        }</ul>
        {
            hasNextPage && <button type="button" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                {isFetchingNextPage ? "Loading..." : "Load more"}
            </button>
        }
    </section>
}