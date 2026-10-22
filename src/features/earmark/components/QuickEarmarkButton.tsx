import {useCreateEarmark} from "../hooks/useCreateEarmark.ts";
import {useAlbumEarmark} from "../hooks/useAlbumEarmark.ts";
import {toast} from "sonner";
import {getErrorMessage} from "../../../lib/errors.ts";
import styles from "./QuickEarmarkButton.module.css";

export default function QuickEarmarkButton({spotifyAlbumId, label = "Earmark"}: {
    spotifyAlbumId: string,
    label?: string
}) {
    const {mutate: createEarmark, isPending: isCreating} = useCreateEarmark(spotifyAlbumId);
    const {
        data: albumEarmarkResponse,
        isPending: isStatusPending,
        isError: isStatusError,
        refetch
    } = useAlbumEarmark(spotifyAlbumId);

    if (isStatusPending) {
        return <button className={styles.button} type="button" disabled>Earmark</button>;
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
        return <span className={styles.earmarked}>Earmarked</span>;
    }

    function handleClick() {
        createEarmark({}, {
            onSuccess: () => toast.success("Album earmarked"),
            onError: (error) => toast.error(getErrorMessage(error))
        })
    }

    return <button
        className={styles.button}
        type="button"
        disabled={isCreating}
        onClick={handleClick}
    >
        {isCreating ? "Earmarking..." : label}
    </button>
} 