import {useId, useRef} from "react";
import styles from "./DeleteEarmarkDialog.module.css";
import {CloseIcon, TrashIcon} from "../../../../components/Icon.tsx";

export default function DeleteEarmarkDialog({onConfirm, isDeleting, disabled, hasNote}: {
    onConfirm: () => void;
    isDeleting: boolean;
    disabled: boolean;
    hasNote: boolean;
}) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const titleId = useId();

    return <>
        <button className={styles.trigger} type="button" disabled={disabled}
                aria-label="Delete earmark" title="Delete earmark"
                onClick={() => dialogRef.current?.showModal()}>
            <TrashIcon className={styles.icon}/>
        </button>
        <dialog className={styles.dialog} ref={dialogRef} aria-labelledby={titleId}>
            <div className={styles.header}>
                <h2 className={styles.title} id={titleId}>Delete earmark</h2>
                <button className={styles.close} type="button" aria-label="Close"
                        onClick={() => dialogRef.current?.close()} disabled={isDeleting}>
                    <CloseIcon className={styles.closeIcon}/>
                </button>
            </div>
            {
                hasNote && <p className={styles.text}>This will also remove your note.</p>
            }
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