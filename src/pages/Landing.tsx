import styles from "./Landing.module.css";

export function Landing() {
    return <section className={styles.hero}>
        <h1 className={styles.title}>earmarked</h1>
        <p className={styles.tagline}>Search for albums and keep track of the ones you have to listen to.</p>
    </section>
}