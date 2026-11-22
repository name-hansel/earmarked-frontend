import styles from "./ClearButton.module.css"

export default function ClearButton({onClick, label}: { onClick: () => void; label?: string }) {
    return <button type="button" className={styles.button} aria-label={label} onClick={onClick}>
        Clear
    </button>;
}