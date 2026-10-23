import {useDeleteEarmark} from "../hooks/useDeleteEarmark.ts";
import {TrashIcon} from "../../../components/Icon.tsx";
import {useAlbumEarmark} from "../hooks/useAlbumEarmark.ts";
import {toast} from "sonner";
import {getErrorMessage} from "../../../lib/errors.ts";
import styles from "./QuickDeleteEarmarkButton.module.css";
import {getEarmarkRemovedMessage} from "../../../utils/formatEarmarkToastMessage.ts";

export default function QuickDeleteEarmarkButton({spotifyAlbumId, albumName}: {
    spotifyAlbumId: string;
    albumName: string | undefined
}) {
    const {data} = useAlbumEarmark(spotifyAlbumId);
    const {mutate: deleteEarmark, isPending} = useDeleteEarmark(spotifyAlbumId);

    if (!data?.earmark) return null;
    const earmarkId = data.earmark.id;

    function handleClick() {
        deleteEarmark(earmarkId, {
            onSuccess: () => toast.success(getEarmarkRemovedMessage(albumName)),
            onError: (error) => toast.error(getErrorMessage(error))
        });
    }

    return <button
        className={styles.button}
        type="button"
        disabled={isPending}
        aria-label="Remove earmark"
        title="Remove earmark"
        onClick={handleClick}
    >
        <TrashIcon className={styles.icon}/>
    </button>
}