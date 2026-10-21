import {Link} from "react-router";
import {useCurrentUser} from "../../features/auth/hooks/useCurrentUser.ts";
import PublicNav from "./PublicNav.tsx";
import PrivateNav from "./PrivateNav.tsx";
import styles from "./Header.module.css";

export default function Header() {
    const currentUser = useCurrentUser();

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link to="/" className={styles.home} aria-label="Home" title="Home">
                    <svg className={styles.homeIcon} viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>
                    </svg>
                </Link>
                {!currentUser.isPending &&
                    (currentUser.data
                        ? <PrivateNav username={currentUser.data.username}/>
                        : <PublicNav/>)}
            </nav>
        </header>
    );
}