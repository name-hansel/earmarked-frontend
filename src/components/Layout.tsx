import {Outlet} from "react-router";
import {Toaster} from "sonner";
import Header from "./header/Header.tsx";

export default function Layout() {
    return <>
        <Header/>
        <main>
            <Outlet/>
        </main>
        <Toaster/>
    </>
}