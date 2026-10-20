import {Link, useNavigate, useParams} from "react-router";
import {useAlbumEarmark} from "../hooks/useAlbumEarmark.ts";
import type {Earmark} from "../api/earmark.ts";
import {type SubmitEvent, useRef, useState} from "react";
import {useCreateEarmark} from "../hooks/useCreateEarmark.ts";
import {useUpdateEarmark} from "../hooks/useUpdateEarmark.ts";
import {useDeleteEarmark} from "../hooks/useDeleteEarmark.ts";
import {toast} from "sonner";
import {getErrorMessage} from "../../../lib/errors.ts";
import EarmarkAlbumHeader from "../components/EarmarkAlbumHeader.tsx";

export default function EarmarkPage() {
    const {spotifyAlbumId} = useParams();

    if (!spotifyAlbumId) {
        return <p role="alert">Missing album</p>
    }

    return <EarmarkPageContent spotifyAlbumId={spotifyAlbumId}/>
}

function EarmarkPageContent({spotifyAlbumId}: { spotifyAlbumId: string }) {
    const {data, isPending, isError, refetch} = useAlbumEarmark(spotifyAlbumId);

    if (isPending) {
        return <p>Loading...</p>
    }

    if (isError) {
        return (
            <div>
                <p role="alert">Couldn't load earmark status.</p>
                <button type="button" onClick={() => refetch()}>Retry</button>
            </div>
        );
    }

    return <EarmarkForm spotifyAlbumId={spotifyAlbumId} earmark={data.earmark}/>
}

function EarmarkForm({spotifyAlbumId, earmark}: {
    spotifyAlbumId: string;
    earmark: Earmark | null;
}) {
    const albumPath = `/albums/${spotifyAlbumId}`;
    const [note, setNote] = useState(earmark?.note ?? "");
    const navigate = useNavigate();
    const dialogRef = useRef<HTMLDialogElement>(null);

    const {mutate: createEarmark, isPending: isCreating} = useCreateEarmark(spotifyAlbumId);
    const {mutate: updateEarmark, isPending: isUpdating} = useUpdateEarmark(spotifyAlbumId);
    const {mutate: deleteEarmark, isPending: isDeleting} = useDeleteEarmark(spotifyAlbumId);
    const isBusy = isCreating || isUpdating || isDeleting;

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const trimmedNote = note.trim();

        if (earmark) {
            updateEarmark({earmarkId: earmark.id, note: trimmedNote}, {
                onSuccess: () => {
                    toast.success("Earmark updated");
                    navigate(albumPath);
                },
                onError: (error) => toast.error(getErrorMessage(error))
            });
        } else {
            createEarmark({note: trimmedNote}, {
                onSuccess: () => {
                    toast.success("Album earmarked");
                    navigate(albumPath);
                },
                onError: (error) => toast.error(getErrorMessage(error))
            });
        }
    }

    function handleDelete() {
        if (!earmark) return;

        deleteEarmark(earmark.id, {
            onSuccess: () => {
                toast.success("Earmark removed");
                navigate(albumPath);
            },
            onError: (error) => {
                dialogRef.current?.close();
                toast.error(getErrorMessage(error));
            }
        });
    }

    return <section>
        <Link to={albumPath}>Back</Link>
        <EarmarkAlbumHeader spotifyAlbumId={spotifyAlbumId}/>
        <h1>{earmark ? "Edit earmark" : "Earmark album"}</h1>

        <form onSubmit={handleSubmit}>
            <label htmlFor="earmark-note">Note</label>
            <textarea id="earmark-note" value={note} onChange={(event) => setNote(event.target.value)} maxLength={256}
                      rows={5}/>
            <p>{note.length}/256</p>

            <button type="submit" disabled={isBusy}>
                {
                    earmark ? (isUpdating ? "Saving..." : "Save") : (isCreating ? "Earmarking..." : "Earmark")
                }
            </button>
            <Link to={albumPath}>Cancel</Link>
        </form>
        {
            earmark &&
            <>
                <button type="button" disabled={isBusy} onClick={() => dialogRef.current?.showModal()}>
                    Delete earmark
                </button>
                <dialog ref={dialogRef}>
                    <p>Delete this earmark?</p>
                    <button type="button" onClick={handleDelete} disabled={isDeleting}>
                        {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                    <button type="button" onClick={() => dialogRef.current?.close()} disabled={isDeleting}>
                        Cancel
                    </button>
                </dialog>
            </>

        }
    </section>
}