import type {CSSProperties} from "react";
import {Toaster} from "sonner";

const toasterStyle = {
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
} as CSSProperties;

export default function AppToaster() {
    return <Toaster
        position="bottom-center"
        theme="dark"
        richColors
        closeButton
        style={toasterStyle}
    />
}