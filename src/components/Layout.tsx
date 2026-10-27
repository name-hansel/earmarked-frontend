import {Outlet} from "react-router";
import Header from "./header/Header.tsx";
import Footer from "./footer/Footer.tsx";
import AppToaster from "./toast/AppToaster.tsx";

export default function Layout() {
    return <>
        <Header/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
        <AppToaster/>
    </>
}