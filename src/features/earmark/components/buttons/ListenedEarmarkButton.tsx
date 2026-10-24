import {useUpdateListened} from "../../hooks/useUpdateListened.ts";
import {toast} from "sonner";
import {getEarmarkUpdatedAsListened, getEarmarkUpdatedAsToListen} from "../../../../utils/formatEarmarkToastMessage.ts";
import {getErrorMessage} from "../../../../lib/errors.ts";
import styles from "./ListenedEarmarkButton.module.css"
import {ArrowRightIcon} from "../../../../components/Icon.tsx";
import type {Earmark} from "../../api/earmark.ts";

export default function ListenedEarmarkButton({spotifyAlbumId, albumName, earmark}: {
    spotifyAlbumId: string,
    albumName: string,
    earmark: Earmark
}) {
    const {mutate, isPending} = useUpdateListened(spotifyAlbumId);

    const updateListened = () => {
        mutate({
            earmarkId: earmark.id,
            listened: !earmark.listened
        }, {
            onSuccess: (updated) => toast.success(
                updated.listened
                    ? getEarmarkUpdatedAsListened(albumName)
                    : getEarmarkUpdatedAsToListen(albumName)
            ), onError: (error) => toast.error(getErrorMessage(error))
        });
    };

    return (
        <button
            type="button"
            className={styles.button}
            disabled={isPending}
            onClick={updateListened}
            aria-label={earmark.listened ? "Move back to To listen" : "Mark as listened"}
        >
            {isPending ? <span className={styles.spinner} aria-hidden="true"/> : <ArrowRightIcon/>}
            {earmark.listened ? "To listen" : "Listened"}
        </button>
    );
}