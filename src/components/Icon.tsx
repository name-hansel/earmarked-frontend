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

export const TrashIcon = (props: SVGProps<SVGSVGElement>) =>
    <Icon {...props}>
        <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v5M14 11v5"/>
    </Icon>;

export const PencilIcon = (props: SVGProps<SVGSVGElement>) =>
    <Icon {...props}>
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </Icon>;

export const SearchIcon = (props: SVGProps<SVGSVGElement>) =>
    <Icon {...props}>
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.3-4.3"/>
    </Icon>;

export const ArrowRightIcon = (props: SVGProps<SVGSVGElement>) =>
    <Icon {...props}>
        <path d="M5 12h14"/>
        <path d="m13 6 6 6-6 6"/>
    </Icon>;

export const HeadphonesIcon = (props: SVGProps<SVGSVGElement>) =>
    <Icon {...props}>
        <path
            d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>
    </Icon>;

export const MusicNoteIcon = (props: SVGProps<SVGSVGElement>) =>
    <Icon {...props}>
        <path d="M9 18V5l12-2v13"/>
        <circle cx="6" cy="18" r="3"/>
        <circle cx="18" cy="16" r="3"/>
    </Icon>;

export const MusicNoteOffIcon = (props: SVGProps<SVGSVGElement>) =>
    <Icon {...props}>
        <path d="M9 18V5l12-2v13"/>
        <circle cx="6" cy="18" r="3"/>
        <circle cx="18" cy="16" r="3"/>
        <path d="M3 3l18 18"/>
    </Icon>;

export const NoteIcon = (props: SVGProps<SVGSVGElement>) =>
    <Icon {...props}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <path d="M8 9h8M8 13h5"/>
    </Icon>;

export const FilterOffIcon = (props: SVGProps<SVGSVGElement>) =>
    <Icon {...props}>
        <path d="M13.013 3H2l8 9.46V19l4 2v-8.54l.9-1.055"/>
        <path d="m22 3-5 5"/>
        <path d="m17 3 5 5"/>
    </Icon>;