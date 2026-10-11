import {Link, Outlet} from "react-router";
import {Toaster} from "sonner";
import {useCurrentUser} from "./hooks/useCurrentUser.ts";
import {useLogout} from "./hooks/useLogout.ts";

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