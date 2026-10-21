import {Link} from "react-router";
import {useCurrentUser} from "../../features/auth/hooks/useCurrentUser.ts";
import PublicNav from "./PublicNav.tsx";
import PrivateNav from "./PrivateNav.tsx";
import styles from "./Header.module.css";
import {HomeIcon} from "../Icon.tsx";

export default function Header() {
    const currentUser = useCurrentUser();

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link to="/" className={styles.home} aria-label="Home" title="Home">
                    <HomeIcon className={styles.homeIcon}/>
                </Link>
                {!currentUser.isPending &&
                    (currentUser.data
                        ? <PrivateNav username={currentUser.data.username}/>
                        : <PublicNav/>)}
            </nav>
        </header>
    );
}