import {Link} from "react-router";
import styles from "./NotFound.module.css";

export default function NotFound() {
    return <section className={styles.page}>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.text}>The page you're looking for doesn't exist or has moved.</p>
        <Link className={styles.home} to="/">Go home</Link>
    </section>
}