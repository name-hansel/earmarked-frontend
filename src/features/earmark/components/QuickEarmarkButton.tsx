import {useCreateEarmark} from "../hooks/useCreateEarmark.ts";
import {useAlbumEarmark} from "../hooks/useAlbumEarmark.ts";
import {toast} from "sonner";
import {getErrorMessage} from "../../../lib/errors.ts";
import styles from "./QuickEarmarkButton.module.css";
import {BookmarkIcon} from "../../../components/Icon.tsx";

export default function QuickEarmarkButton({spotifyAlbumId, label = "Earmark", compact = false}: {
    spotifyAlbumId: string,
    label?: string,
    compact?: boolean
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

    if (albumEarmarkResponse.earmark) {
        if (compact) {
            return <span className={styles.earmarkedCompact} role="img" aria-label="Earmarked" title="Earmarked">
            <BookmarkIcon className={styles.earmarkedIcon}/>
        </span>;
        }

        return <span className={styles.earmarked}>Earmarked</span>;
    }

    function handleClick() {
        createEarmark({}, {
            onSuccess: () => toast.success("Album earmarked"),
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