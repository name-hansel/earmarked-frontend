import {useCreateEarmark} from "../hooks/useCreateEarmark.ts";
import {useAlbumEarmark} from "../hooks/useAlbumEarmark.ts";
import {getErrorMessage} from "../../../lib/errors.ts";

export default function QuickEarmarkButton({spotifyAlbumId}: {
    spotifyAlbumId: string
}) {
    const {mutate, isPending: isCreating, error, isError} = useCreateEarmark();
    const {
        data: albumEarmarkResponse,
        isPending: isStatusPending,
        isError: isStatusError,
        refetch
    } = useAlbumEarmark(spotifyAlbumId);

    const errorMessage = isError && getErrorMessage(error);

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

    return <div>
        <button type="button" disabled={isStatusPending} onClick={() => mutate(spotifyAlbumId)}>
            {albumEarmarkResponse.earmark ? "Earmarked" : isCreating ? "Earmarking..." : "Earmark"}
        </button>
        {/*TODO change to toast*/}
        {
            errorMessage && <p role="alert">{errorMessage}</p>
        }
    </div>
} 