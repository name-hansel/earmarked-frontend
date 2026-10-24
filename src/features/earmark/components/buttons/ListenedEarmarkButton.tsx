import {useAlbumEarmark} from "../../hooks/useAlbumEarmark.ts";
import {todayLocalDate} from "../../../../utils/todayLocalDate.ts";
import {useUpdateListened} from "../../hooks/useUpdateListened.ts";
import {toast} from "sonner";
import {getEarmarkUpdatedAsListened, getEarmarkUpdatedAsToListen} from "../../../../utils/formatEarmarkToastMessage.ts";
import {getErrorMessage} from "../../../../lib/errors.ts";
import styles from "./ListenedEarmarkButton.module.css"
import {ArrowRightIcon} from "../../../../components/Icon.tsx";

export default function ListenedEarmarkButton({spotifyAlbumId, albumName}: {
    spotifyAlbumId: string,
    albumName: string
}) {
    const {data} = useAlbumEarmark(spotifyAlbumId);
    const {mutate, isPending} = useUpdateListened(spotifyAlbumId);
    const earmark = data?.earmark;

    if (!earmark) return null;

    const isListened = earmark.listenedAt !== null;

    const updateListened = () => {
        mutate({
            earmarkId: earmark.id,
            listenedAt: isListened ? null : todayLocalDate(),
        }, {
            onSuccess: () => toast.success(earmark.listenedAt ? getEarmarkUpdatedAsToListen(albumName) : getEarmarkUpdatedAsListened(albumName)),
            onError: (error) => toast.error(getErrorMessage(error))
        });
    };

    return (
        <button
            type="button"
            className={styles.button}
            disabled={isPending}
            onClick={updateListened}
            aria-label={isListened ? "Move back to To listen" : "Mark as listened"}
        >
            {isPending ? <span className={styles.spinner} aria-hidden="true"/> : <ArrowRightIcon/>}
            {isListened ? "To listen" : "Listened"}
        </button>
    );
}