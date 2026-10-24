import styles from "./PageLoader.module.css";

export default function PageLoader({label = "Loading..."}: {
    label?: string | undefined
}) {
    return <div className={styles.loader} role="status">
        <span className={styles.spinner} aria-hidden="true"/>
        <span className={styles.label}>{label}</span>
    </div>
}