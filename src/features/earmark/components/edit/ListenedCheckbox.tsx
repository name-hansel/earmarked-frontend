import styles from "./ListenedCheckbox.module.css"

export default function ListenedCheckbox({listened, setListened}: {
    listened: boolean;
    setListened: (value: boolean) => void;
}) {
    return <label className={styles.checkbox}>
        <input
            type="checkbox"
            checked={listened}
            onChange={(e) => setListened(e.target.checked)}
        />
        Listened
    </label>
}