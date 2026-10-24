import styles from "./EarmarksSearchInput.module.css"

export function EarmarkSearchInput({value, onChange, onClose}: {
    value: string;
    onChange: (v: string) => void;
    onClose: () => void
}) {
    return (
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
    );
}