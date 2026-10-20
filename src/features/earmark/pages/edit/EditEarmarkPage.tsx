import {useParams} from "react-router";
import EditEarmarkContent from "../../components/EditEarmarkContent.tsx";

export default function EditEarmarkPage() {
    const {spotifyAlbumId} = useParams();

    if (!spotifyAlbumId) {
        return <p role="alert">Missing album</p>
    }

    return <EditEarmarkContent spotifyAlbumId={spotifyAlbumId}/>
}