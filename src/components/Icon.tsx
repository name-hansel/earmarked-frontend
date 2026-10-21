import type {SVGProps} from "react";

function Icon(props: SVGProps<SVGSVGElement>) {
    return <svg
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
    />
}

export const HomeIcon = (props: SVGProps<SVGSVGElement>) =>
    <Icon {...props}>
        <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>
    </Icon>;

export const BookmarkIcon = (props: SVGProps<SVGSVGElement>) =>
    <Icon {...props}>
        <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/>
    </Icon>;

export const MenuIcon = (props: SVGProps<SVGSVGElement>) =>
    <Icon {...props}>
        <path d="M4 6h16M4 12h16M4 18h16"/>
    </Icon>;

export const CloseIcon = (props: SVGProps<SVGSVGElement>) =>
    <Icon {...props}>
        <path d="M6 6l12 12M18 6L6 18"/>
    </Icon>;