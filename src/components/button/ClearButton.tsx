import styles from "./ClearButton.module.css"

export default function ClearButton({onClick, label, disabled}: {
    onClick: () => void;
    label?: string;
    disabled?: boolean
}) {
    return <button type="button" className={styles.button} aria-label={label} onClick={onClick} disabled={disabled}>
        Clear
    </button>;
}