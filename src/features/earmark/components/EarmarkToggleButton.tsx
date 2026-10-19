import {useCreateEarmark} from "../hooks/useCreateEarmark.ts";
import {useAlbumEarmark} from "../hooks/useAlbumEarmark.ts";
import {useDeleteEarmark} from "../hooks/useDeleteEarmark.ts";
import {toast} from "sonner";
import {getErrorMessage} from "../../../lib/errors.ts";

export default function EarmarkToggleButton({spotifyAlbumId}: {
    spotifyAlbumId: string
}) {
    const {mutate: createEarmark, isPending: isCreating} = useCreateEarmark();
    const {
        data: albumEarmarkResponse,
        isPending: isStatusPending,
        isError: isStatusError,
        refetch
    } = useAlbumEarmark(spotifyAlbumId);
    const {mutate: deleteEarmark, isPending: isDeleting} = useDeleteEarmark(spotifyAlbumId);

    const earmark = albumEarmarkResponse?.earmark;

    if (isStatusPending) {
        return <button type="button" disabled>Earmark</button>;
    }

    if (isStatusError) {
        return (
            <div>
                <p role="alert">Couldn't load earmark status.</p>
                <button type="button" onClick={() => refetch()}>Retry</button>
            </div>
        );
    }

    function handleClick() {
        if (earmark) {
            deleteEarmark(earmark.id, {
                onSuccess: () => toast.success("Earmark removed"),
                onError: (error) => toast.error(getErrorMessage(error))
            });
        } else {
            createEarmark(spotifyAlbumId, {
                onError: (error) => toast.error(getErrorMessage(error))
            })
        }
    }

    return <div>
        <button type="button" disabled={isCreating || isDeleting || isStatusPending}
                aria-label={earmark ? "Remove earmark" : undefined}
                onClick={handleClick}
        >
            {
                earmark ? (isDeleting ? "Removing..." : "Earmarked") : (isCreating ? "Earmarking..." : "Earmark")
            }
        </button>
    </div>
} 