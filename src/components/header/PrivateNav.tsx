import {NavLink} from "react-router";
import {useLogout} from "../../features/auth/hooks/useLogout.ts";
import styles from "./PrivateNav.module.css";
import {useEffect, useRef, useState} from "react";
import {CloseIcon, MenuIcon} from "../Icon.tsx";

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
            {open ? <CloseIcon className={styles.icon}/> : <MenuIcon className={styles.icon}/>}
            Menu
        </button>
        <div id="private-nav-menu" className={`${styles.menu} ${open ? styles.open : ""}`}>
            <span className={styles.username}>{username}</span>
            <div className={styles.buttons}>
                <NavLink
                    to="/change-password"
                    className={({isActive}) => isActive ? `${styles.secondary} ${styles.active}` : styles.secondary}
                    onClick={() => setOpen(false)}
                >
                    Change password
                </NavLink>
                <NavLink
                    to="/delete-account"
                    className={({isActive}) => isActive ? `${styles.danger} ${styles.active}` : styles.danger}
                    onClick={() => setOpen(false)}
                >
                    Delete account
                </NavLink>
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