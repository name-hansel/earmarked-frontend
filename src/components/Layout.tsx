import {Outlet} from "react-router";
import {Toaster} from "sonner";
import Header from "./header/Header.tsx";
import Footer from "./header/Footer.tsx";

export default function Layout() {
    return <>
        <Header/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
        <Toaster
            position="bottom-center"
            theme="dark"
            richColors
            style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-medium)",
                "--border-radius": "0.75rem",

                "--normal-bg": "var(--color-surface)",
                "--normal-border": "var(--color-border)",
                "--normal-text": "var(--color-text)",

                "--success-bg": "var(--color-surface)",
                "--success-border": "var(--color-success)",
                "--success-text": "var(--color-success)",

                "--error-bg": "var(--color-surface)",
                "--error-border": "var(--color-danger)",
                "--error-text": "var(--color-danger)",
            } as React.CSSProperties}
        />
    </>
}