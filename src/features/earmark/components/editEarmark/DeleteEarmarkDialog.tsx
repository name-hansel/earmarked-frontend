import {useRef} from "react";
import styles from "./DeleteEarmarkDialog.module.css";

export default function DeleteEarmarkDialog({onConfirm, isDeleting, disabled}: {
    onConfirm: () => void;
    isDeleting: boolean;
    disabled: boolean;
}) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    return <>
        <button className={styles.trigger} type="button" disabled={disabled}
                onClick={() => dialogRef.current?.showModal()}>
            Delete earmark
        </button>
        <dialog className={styles.dialog} ref={dialogRef}>
            <p className={styles.text}>Delete this earmark?</p>
            <div className={styles.actions}>
                <button className={styles.confirm} type="button" onClick={onConfirm} disabled={isDeleting}>
                    {isDeleting ? "Deleting..." : "Delete"}
                </button>
                <button className={styles.cancel} type="button" onClick={() => dialogRef.current?.close()}
                        disabled={isDeleting}>
                    Cancel
                </button>
            </div>
        </dialog>
    </>
}