import DeleteEarmarkDialog from "../editEarmark/DeleteEarmarkDialog.tsx";
import {TrashIcon} from "../../../../components/Icon.tsx";
import styles from "./DeleteEarmarkButton.module.css"
import {useDeleteEarmark} from "../../hooks/useDeleteEarmark.ts";
import {toast} from "sonner";
import {getEarmarkRemovedMessage} from "../../../../utils/formatEarmarkToastMessage.ts";
import {getErrorMessage} from "../../../../lib/errors.ts";
import type {Earmark} from "../../api/earmark.ts";

export default function DeleteEarmarkButton({spotifyAlbumId, albumName, withConfirmation = false, earmark}: {
    spotifyAlbumId: string;
    albumName: string | undefined;
    withConfirmation?: boolean;
    earmark: Earmark
}) {
    const {isPending, mutate: deleteEarmark} = useDeleteEarmark(spotifyAlbumId);

    function handleConfirm() {
        if (!earmark.id) return;

        deleteEarmark(earmark.id, {
            onSuccess: () => toast.success(getEarmarkRemovedMessage(albumName)),
            onError: (error) => toast.error(getErrorMessage(error))
        });
    }

    if (withConfirmation) {
        return <DeleteEarmarkDialog onConfirm={handleConfirm} isDeleting={isPending} disabled={isPending}
                                    hasNote={Boolean(earmark.note)}/>
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