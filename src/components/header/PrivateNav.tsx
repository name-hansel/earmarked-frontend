import {Link} from "react-router";
import {useLogout} from "../../features/auth/hooks/useLogout.ts";

export default function PrivateNav({username}: { username: string }) {
    const logout = useLogout();

    return <>
        <span>{username}</span>
        <Link to="/delete-account">Delete account</Link>
        <Link to="/change-password">Change password</Link>
        <button type="button"
                onClick={() => logout.mutate()}
                disabled={logout.isPending}>
            {
                logout.isPending ? "Logging out..." : "Log out"
            }
        </button>
    </>
}