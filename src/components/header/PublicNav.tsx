import {Link} from "react-router";
import styles from "./PublicNav.module.css";

export default function PublicNav() {
    return (
        <div className={styles.actions}>
            <Link to="/register" className={styles.secondary}>Register</Link>
            <Link to="/login" className={styles.primary}>Login</Link>
        </div>
    );
}