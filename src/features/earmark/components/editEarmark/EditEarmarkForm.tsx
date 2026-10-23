import type {Earmark} from "../../api/earmark.ts";
import {useCreateEarmark} from "../../hooks/useCreateEarmark.ts";
import {useRef, useState} from "react";
import {Link, useNavigate} from "react-router";
import {useDeleteEarmark} from "../../hooks/useDeleteEarmark.ts";
import {useUpdateEarmark} from "../../hooks/useUpdateEarmark.ts";
import {toast} from "sonner";
import {getErrorMessage} from "../../../../lib/errors.ts";
import EarmarkAlbumSummary from "./EarmarkAlbumSummary.tsx";
import EarmarkNoteField from "./EarmarkNoteField.tsx";
import formStyles from "../../../../styles/Form.module.css";
import styles from "./EditEarmarkForm.module.css";
import DeleteEarmarkDialog from "./DeleteEarmarkDialog.tsx";
import {useSpotifyAlbum} from "../../../spotify/hooks/useSpotifyAlbum.ts";
import {
    getEarmarkAddedMessage,
    getEarmarkRemovedMessage,
    getEarmarkUpdatedMessage
} from "../../../../utils/formatEarmarkToastMessage.ts";

export default function EditEarmarkForm({spotifyAlbumId, earmark}: {
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

    const {data: album} = useSpotifyAlbum(spotifyAlbumId);

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const trimmedNote = note.trim();

        if (earmark) {
            updateEarmark({earmarkId: earmark.id, note: trimmedNote}, {
                onSuccess: () => {
                    toast.success(getEarmarkUpdatedMessage(album?.name));
                    navigate(albumPath);
                },
                onError: (error) => toast.error(getErrorMessage(error))
            });
        } else {
            createEarmark({note: trimmedNote}, {
                onSuccess: () => {
                    toast.success(getEarmarkAddedMessage(album?.name));
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
                toast.success(getEarmarkRemovedMessage(album?.name));
                navigate(albumPath);
            },
            onError: (error) => {
                dialogRef.current?.close();
                toast.error(getErrorMessage(error));
            }
        });
    }

    const submitLabel = earmark
        ? (isUpdating ? "Saving..." : "Save")
        : (isCreating ? "Earmarking..." : "Earmark");

    const isUnchanged = earmark ? note === (earmark.note ?? "") : false;

    return <section className={styles.earmarkForm}>
        <Link className={styles.back} to={albumPath}><span aria-hidden="true">←</span> Back</Link>
        <h1 className={styles.srOnly}>{earmark ? "Edit earmark" : "Earmark album"}</h1>

        <div className={styles.layout}>
            <div className={styles.album}>
                <EarmarkAlbumSummary spotifyAlbumId={spotifyAlbumId}/>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
                <EarmarkNoteField value={note} onChange={setNote}/>
                <div className={styles.actions}>
                    <button className={formStyles.submit} type="submit"
                            disabled={isBusy || isUnchanged}>{submitLabel}</button>
                    <Link className={styles.cancel} to={albumPath}>Cancel</Link>
                    {earmark &&
                        <DeleteEarmarkDialog onConfirm={handleDelete} isDeleting={isDeleting} disabled={isBusy}/>}
                </div>
            </form>
        </div>
    </section>
}