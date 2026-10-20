import {Outlet} from "react-router";
import {Toaster} from "sonner";
import Header from "./Header.tsx";

export default function Layout() {
    return <>
        <Header/>
        <main>
            <Outlet/>
        </main>
        <Toaster/>
    </>
}