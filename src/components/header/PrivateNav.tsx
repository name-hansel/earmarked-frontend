import {Link} from "react-router";
import {useLogout} from "../../features/auth/hooks/useLogout.ts";
import styles from "./PrivateNav.module.css";

export default function PrivateNav({username}: { username: string }) {
    const logout = useLogout();

    return <div className={styles.actions}>
        <span className={styles.username}>{username}</span>
        <div className={styles.buttons}>
            <Link to="/change-password" className={styles.secondary}>Change password</Link>
            <Link to="/delete-account" className={styles.danger}>Delete account</Link>
            <button type="button"
                    className={styles.logout}
                    onClick={() => logout.mutate()}
                    disabled={logout.isPending}>
                {
                    logout.isPending ? "Logging out..." : "Log out"
                }
            </button>
        </div>
    </div>
}