import DeleteEarmarkDialog from "./editEarmark/DeleteEarmarkDialog.tsx";
import {useDeleteEarmark} from "../hooks/useDeleteEarmark.ts";
import {useAlbumEarmark} from "../hooks/useAlbumEarmark.ts";
import {toast} from "sonner";
import {getErrorMessage} from "../../../lib/errors.ts";

export default function DeleteEarmarkButton({spotifyAlbumId}: { spotifyAlbumId: string }) {
    const {isPending, mutate: deleteEarmark} = useDeleteEarmark(spotifyAlbumId);
    const {data} = useAlbumEarmark(spotifyAlbumId);

    if (!data?.earmark) return null;

    const earmarkId = data.earmark.id;

    function handleDelete() {
        deleteEarmark(earmarkId, {
            onSuccess: () => toast.success("Earmark removed"),
            onError: (error) => toast.error(getErrorMessage(error))
        });
    }

    return <DeleteEarmarkDialog onConfirm={handleDelete} isDeleting={isPending} disabled={isPending}/>
}