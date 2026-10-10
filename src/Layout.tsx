import {Link, Outlet} from "react-router";
import {Toaster} from "sonner";

export default function Layout() {
    return <>
        <nav>
            <Link to="/">Home</Link> | <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
        </nav>
        <main>
            <Outlet/>
        </main>
        <Toaster/>
    </>
}