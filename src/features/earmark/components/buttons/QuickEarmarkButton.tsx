import {useCreateEarmark} from "../../hooks/useCreateEarmark.ts";
import {useAlbumEarmark} from "../../hooks/useAlbumEarmark.ts";
import {toast} from "sonner";
import {getErrorMessage} from "../../../../lib/errors.ts";
import styles from "./QuickEarmarkButton.module.css";
import {getEarmarkAddedMessage} from "../../../../utils/formatEarmarkToastMessage.ts";

export default function QuickEarmarkButton({spotifyAlbumId, label = "Earmark", compact = false, albumName}: {
    spotifyAlbumId: string,
    label?: string,
    compact?: boolean,
    albumName: string
}) {
    const {mutate: createEarmark, isPending: isCreating} = useCreateEarmark(spotifyAlbumId);
    const {
        data: albumEarmarkResponse,
        isPending: isStatusPending,
        isError: isStatusError,
        refetch
    } = useAlbumEarmark(spotifyAlbumId);

    const buttonClass = compact ? `${styles.button} ${styles.buttonCompact}` : styles.button;

    if (isStatusPending) {
        return <button className={buttonClass} type="button" disabled>Earmark</button>;
    }

    if (isStatusError) {
        return (
            <div className={styles.error}>
                <p className={styles.errorText} role="alert">Couldn't load earmark status.</p>
                <button className={styles.retry} type="button" onClick={() => refetch()}>Retry</button>
            </div>
        );
    }

    const earmark = albumEarmarkResponse.earmark;
    if (earmark) {
        if (compact) {
            return null;
        }

        return <span className={styles.earmarked}>{earmark.listened ? 'Listened' : 'Earmarked'}</span>;
    }

    function handleClick() {
        createEarmark({}, {
            onSuccess: () => toast.success(getEarmarkAddedMessage(albumName)),
            onError: (error) => toast.error(getErrorMessage(error))
        })
    }

    return <button
        className={buttonClass}
        type="button"
        disabled={isCreating}
        aria-label={isCreating ? "Earmarking..." : undefined}
        data-loading={isCreating && compact ? "" : undefined}
        onClick={handleClick}
    >
        {isCreating && !compact ? "Earmarking..." : label}
    </button>
} 