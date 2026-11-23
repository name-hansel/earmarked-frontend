import type {Earmark} from "../../api/earmark.ts";
import {useCreateEarmark} from "../../hooks/useCreateEarmark.ts";
import {useRef, useState} from "react";
import {Link, useNavigate} from "react-router";
import {useDeleteEarmark} from "../../hooks/useDeleteEarmark.ts";
import {useUpdateEarmark} from "../../hooks/useUpdateEarmark.ts";
import {toast} from "sonner";
import {getErrorMessage} from "../../../../lib/errors.ts";
import EarmarkAlbumSummary from "./EarmarkAlbumSummary.tsx";
import EarmarkTextField from "./EarmarkTextField.tsx";
import formStyles from "../../../../styles/Form.module.css";
import styles from "./EditEarmarkForm.module.css";
import DeleteEarmarkDialog from "./DeleteEarmarkDialog.tsx";
import {useSpotifyAlbum} from "../../../spotify/hooks/useSpotifyAlbum.ts";
import {
    getEarmarkAddedMessage,
    getEarmarkRemovedMessage,
    getEarmarkUpdatedMessage
} from "../../../../utils/formatEarmarkToastMessage.ts";
import ListenedAtDatePicker from "./ListenedAtDatePicker.tsx";
import BackLink from "../../../../components/back-link/BackLink.tsx";
import RatingInput from "./RatingInput.tsx";
import ListenedCheckbox from "./ListenedCheckbox.tsx";

export default function EditEarmarkForm({spotifyAlbumId, earmark}: {
    spotifyAlbumId: string;
    earmark: Earmark | null;
}) {
    const albumPath = `/albums/${spotifyAlbumId}`;
    const [note, setNote] = useState(earmark?.note ?? null);
    const [listenedAt, setListenedAt] = useState(earmark?.listenedAt ?? null);
    const [listened, setListened] = useState(earmark?.listened ?? false);
    const [rating, setRating] = useState(earmark?.rating ?? null);
    const [review, setReview] = useState(earmark?.review ?? null);

    const navigate = useNavigate();
    const dialogRef = useRef<HTMLDialogElement>(null);

    const {mutate: createEarmark, isPending: isCreating} = useCreateEarmark(spotifyAlbumId);
    const {mutate: updateEarmark, isPending: isUpdating} = useUpdateEarmark(spotifyAlbumId);
    const {mutate: deleteEarmark, isPending: isDeleting} = useDeleteEarmark(spotifyAlbumId);
    const isBusy = isCreating || isUpdating || isDeleting;

    const {data: album} = useSpotifyAlbum(spotifyAlbumId);

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const trimmedNote = note?.trim() ?? null;
        const trimmedReview = review?.trim() ?? null;

        if (earmark) {
            updateEarmark({
                earmarkId: earmark.id,
                note: trimmedNote,
                listened,
                listenedAt,
                rating: rating,
                review: trimmedReview
            }, {
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

    function handleListenedChange(next: boolean) {
        setListened(next);
        if (!next) {
            setListenedAt(null);
            setRating(null);
            setReview(null);
        }
    }

    const submitLabel = earmark
        ? (isUpdating ? "Saving..." : "Save")
        : (isCreating ? "Earmarking..." : "Earmark");

    const isUnchanged = earmark
        ? note === (earmark.note ?? "")
        && listened === earmark.listened
        && listenedAt === (earmark.listenedAt ?? "")
        && rating === (earmark?.rating ?? null)
        && review === (earmark?.review ?? null)
        : false;

    return <section className={styles.earmarkForm}>
        <BackLink backTo={albumPath}/>
        <div className={styles.layout}>
            <div className={styles.album}>
                <EarmarkAlbumSummary spotifyAlbumId={spotifyAlbumId}/>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.heading}>{earmark ? "Edit earmark" : "Earmark album"}</h1>
                <div className={styles.note}>
                    <EarmarkTextField value={note} onChange={setNote} label={"Note"}/>
                </div>
                <div className={styles.listenedField}>
                    <ListenedCheckbox listened={listened} setListened={handleListenedChange}/>
                    {
                        listened && <>
                            <ListenedAtDatePicker
                                listenedAt={listenedAt}
                                setListenedAt={setListenedAt}/>
                            <RatingInput value={rating} onChange={setRating}/>
                            <EarmarkTextField value={review} onChange={setReview} label={"Review"}/>
                        </>
                    }
                </div>
                <div className={styles.actions}>
                    <button className={formStyles.submit} type="submit"
                            disabled={isBusy || isUnchanged}>{submitLabel}</button>
                    <Link className={styles.cancel} to={albumPath}>Cancel</Link>
                    {earmark &&
                        <DeleteEarmarkDialog onConfirm={handleDelete} isDeleting={isDeleting} disabled={isBusy}
                                             hasNote={Boolean(earmark.note)}/>}
                </div>
            </form>
        </div>
    </section>
}