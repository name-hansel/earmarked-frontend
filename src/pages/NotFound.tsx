import {Link} from "react-router";
import styles from "./NotFound.module.css";
import {useDocumentTitle} from "../hooks/useDocumentTitle.ts";

export default function NotFound() {
    useDocumentTitle("Page not found")

    return <section className={styles.page}>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.text}>The page you're looking for doesn't exist or has moved.</p>
        <Link className={styles.home} to="/">Go home</Link>
    </section>
}