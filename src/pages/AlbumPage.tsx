import {useParams} from "react-router";

export default function AlbumPage() {
    const {spotifyId} = useParams<{ spotifyId: string }>();

    return <section>
        <h1>Album</h1>
        <p>{spotifyId}</p>
    </section>
}