import {NavLink} from "react-router";
import styles from "./PublicNav.module.css";

export default function PublicNav() {
    return (
        <div className={styles.actions}>
            <NavLink
                to="/register"
                className={({isActive}) => isActive ? `${styles.secondary} ${styles.active}` : styles.secondary}
            >
                Register
            </NavLink>
            <NavLink
                to="/login"
                className={({isActive}) => isActive ? `${styles.primary} ${styles.active}` : styles.primary}
            >
                Login
            </NavLink>
        </div>
    );
}