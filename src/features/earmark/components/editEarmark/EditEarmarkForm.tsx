import type {Earmark} from "../../api/earmark.ts";
import {useCreateEarmark} from "../../hooks/useCreateEarmark.ts";
import {useRef, useState} from "react";
import {Link, useNavigate} from "react-router";
import {useDeleteEarmark} from "../../hooks/useDeleteEarmark.ts";
import {useUpdateEarmark} from "../../hooks/useUpdateEarmark.ts";
import {toast} from "sonner";
import {getErrorMessage} from "../../../../lib/errors.ts";
import EarmarkAlbumHeader from "../EarmarkAlbumHeader.tsx";
import EarmarkNoteField from "./EarmarkNoteField.tsx";
import DeleteEarmarkDialog from "./DeleteEarmarkDialog.tsx";
import formStyles from "../../../../styles/Form.module.css";
import styles from "./EditEarmarkForm.module.css";

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

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
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

    const submitLabel = earmark
        ? (isUpdating ? "Saving..." : "Save")
        : (isCreating ? "Earmarking..." : "Earmark");

    return <section className={styles.earmarkForm}>
        <Link className={styles.back} to={albumPath}><span aria-hidden="true">←</span> Back</Link>
        <EarmarkAlbumHeader spotifyAlbumId={spotifyAlbumId}/>
        <h1 className={styles.title}>{earmark ? "Edit earmark" : "Earmark album"}</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
            <EarmarkNoteField value={note} onChange={setNote}/>
            <div className={styles.actions}>
                <button className={formStyles.submit} type="submit" disabled={isBusy}>{submitLabel}</button>
                <Link className={styles.cancel} to={albumPath}>Cancel</Link>
            </div>
        </form>

        {earmark &&
            <DeleteEarmarkDialog onConfirm={handleDelete} isDeleting={isDeleting} disabled={isBusy}/>}
    </section>
}