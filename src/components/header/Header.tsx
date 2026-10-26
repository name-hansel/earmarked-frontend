import {useCurrentUser} from "../../features/auth/hooks/useCurrentUser.ts";
import PublicNav from "./PublicNav.tsx";
import PrivateNav from "./PrivateNav.tsx";
import styles from "./Header.module.css";
import {BookmarkIcon} from "../Icon.tsx";
import {Link} from "react-router";

export default function Header() {
    const currentUser = useCurrentUser();

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link to="/" className={styles.logo} aria-label="earmarked home" title="Home">
                    <BookmarkIcon className={styles.logoIcon}/>
                    <span className={styles.logoText}>earmarked</span>
                </Link>
                {!currentUser.isPending &&
                    (currentUser.data
                        ? <PrivateNav username={currentUser.data.username}/>
                        : <PublicNav/>)}
            </nav>
        </header>
    );
}