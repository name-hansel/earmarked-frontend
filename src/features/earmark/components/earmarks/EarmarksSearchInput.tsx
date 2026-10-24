import styles from "./EarmarksSearchInput.module.css"
import {CloseIcon} from "../../../../components/Icon.tsx";

export function EarmarkSearchInput({value, onChange, onClose}: {
    value: string;
    onChange: (v: string) => void;
    onClose: () => void
}) {
    return (
        <div className={styles.field}>
            <input
                className={styles.input}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && onClose()}
                placeholder="Search album, artist or note"
                aria-label="Search earmarks"
                maxLength={100}
                autoFocus
            />
            <button type="button" className={styles.close} onClick={onClose}
                    aria-label="Close search">
                <CloseIcon/>
            </button>
        </div>
    );
}