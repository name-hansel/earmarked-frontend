import {useAlbumEarmark} from "../hooks/useAlbumEarmark.ts";

export default function EarmarkNote({spotifyAlbumId}: { spotifyAlbumId: string }) {
    const {data} = useAlbumEarmark(spotifyAlbumId);

    if (!data) {
        return null;
    }

    const note = data.earmark?.note;

    return note && <section>
        <h2>Your note</h2>
        <p style={{whiteSpace: "pre-wrap"}}>{data.earmark?.note}</p>
    </section>
}