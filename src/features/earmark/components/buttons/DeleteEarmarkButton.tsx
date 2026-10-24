import DeleteEarmarkDialog from "../editEarmark/DeleteEarmarkDialog.tsx";
import {TrashIcon} from "../../../../components/Icon.tsx";
import styles from "./DeleteEarmarkButton.module.css"
import {useAlbumEarmark} from "../../hooks/useAlbumEarmark.ts";
import {useDeleteEarmark} from "../../hooks/useDeleteEarmark.ts";
import {toast} from "sonner";
import {getEarmarkRemovedMessage} from "../../../../utils/formatEarmarkToastMessage.ts";
import {getErrorMessage} from "../../../../lib/errors.ts";

export default function DeleteEarmarkButton({spotifyAlbumId, albumName, withConfirmation = false}: {
    spotifyAlbumId: string;
    albumName: string | undefined;
    withConfirmation?: boolean;
}) {
    const {isPending, mutate: deleteEarmark} = useDeleteEarmark(spotifyAlbumId);
    const {data} = useAlbumEarmark(spotifyAlbumId);

    if (!data?.earmark) return null;

    const earmarkId = data.earmark.id;

    function handleConfirm() {
        if (!earmarkId) return;

        deleteEarmark(earmarkId, {
            onSuccess: () => toast.success(getEarmarkRemovedMessage(albumName)),
            onError: (error) => toast.error(getErrorMessage(error))
        });
    }

    if (withConfirmation) {
        return <DeleteEarmarkDialog onConfirm={handleConfirm} isDeleting={isPending} disabled={isPending}/>
    }

    return <button
        className={styles.button}
        type="button"
        disabled={isPending}
        aria-label="Remove earmark"
        title="Remove earmark"
        onClick={handleConfirm}
    >
        <TrashIcon className={styles.icon}/>
    </button>
}