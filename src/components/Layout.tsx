import {Link, Outlet} from "react-router";
import {Toaster} from "sonner";
import {useCurrentUser} from "../features/auth/hooks/useCurrentUser.ts";
import {useLogout} from "../features/auth/hooks/useLogout.ts";

export default function Layout() {
    const currentUser = useCurrentUser();
    let logout = useLogout();

    return <>
        <nav>
            <Link to="/">Home</Link>
            {!currentUser.isPending &&
                (currentUser.data ?
                        <>
                            <span>{currentUser.data.username}</span>
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
                        :
                        <>
                            <Link to="/register">Register</Link>
                            <Link to="/login">Login</Link>
                        </>
                )}
        </nav>
        <main>
            <Outlet/>
        </main>
        <Toaster/>
    </>
}