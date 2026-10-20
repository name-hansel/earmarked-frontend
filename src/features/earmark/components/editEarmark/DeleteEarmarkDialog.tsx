import {useRef} from "react";

export default function DeleteEarmarkDialog({onConfirm, isDeleting, disabled}: {
    onConfirm: () => void;
    isDeleting: boolean;
    disabled: boolean;
}) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    return <>
        <button type="button" disabled={disabled} onClick={() => dialogRef.current?.showModal()}>
            Delete earmark
        </button>
        <dialog ref={dialogRef}>
            <p>Delete this earmark?</p>
            <button type="button" onClick={onConfirm} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete"}
            </button>
            <button type="button" onClick={() => dialogRef.current?.close()} disabled={isDeleting}>
                Cancel
            </button>
        </dialog>
    </>
}