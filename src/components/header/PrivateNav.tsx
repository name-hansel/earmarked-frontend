import {Link} from "react-router";
import {useLogout} from "../../features/auth/hooks/useLogout.ts";
import styles from "./PrivateNav.module.css";
import {useEffect, useRef, useState} from "react";

export default function PrivateNav({username}: { username: string }) {
    const logout = useLogout();
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        function handlePointerDown(event: PointerEvent) {
            if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") setOpen(false);
        }

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    return <div className={styles.actions} ref={rootRef}>
        <button type="button"
                className={styles.toggle}
                aria-expanded={open}
                aria-controls="private-nav-menu"
                onClick={() => setOpen((current) => !current)}>
            <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
                <path d={open ? "M6 6l12 12M18 6L6 18" : "M4 6h16M4 12h16M4 18h16"}/>
            </svg>
            Menu
        </button>
        <div id="private-nav-menu" className={`${styles.menu} ${open ? styles.open : ""}`}>
            <span className={styles.username}>{username}</span>
            <div className={styles.buttons}>
                <Link to="/change-password" className={styles.secondary} onClick={() => setOpen(false)}>
                    Change password
                </Link>
                <Link to="/delete-account" className={styles.danger} onClick={() => setOpen(false)}>
                    Delete account
                </Link>
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
    </div>
}