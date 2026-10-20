import {useCreateEarmark} from "../hooks/useCreateEarmark.ts";
import {useAlbumEarmark} from "../hooks/useAlbumEarmark.ts";
import {toast} from "sonner";
import {getErrorMessage} from "../../../lib/errors.ts";

export default function QuickEarmarkButton({spotifyAlbumId, label = "Earmark"}: {
    spotifyAlbumId: string,
    label?: string
}) {
    const {mutate: createEarmark, isPending: isCreating} = useCreateEarmark();
    const {
        data: albumEarmarkResponse,
        isPending: isStatusPending,
        isError: isStatusError,
        refetch
    } = useAlbumEarmark(spotifyAlbumId);

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

    if (albumEarmarkResponse.earmark) {
        return <span>Earmarked</span>;
    }

    function handleClick() {
        createEarmark(spotifyAlbumId, {
            onError: (error) => toast.error(getErrorMessage(error))
        })
    }

    return <button
        type="button"
        disabled={isCreating}
        onClick={handleClick}
    >
        {isCreating ? "Earmarking..." : label}
    </button>
} 