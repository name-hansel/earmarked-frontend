import {useState} from "react";
import styles from "./EarmarkSearch.module.css"
import {CloseIcon} from "../../../components/Icon.tsx";

function SearchIcon() {
    return null;
}

export default function EarmarkSearch({value, onChange}: {
    value: string;
    onChange: (value: string) => void;
}) {
    const [open, setOpen] = useState(value !== "");

    function toggle() {
        if (open) {
            onChange("");
        }

        setOpen(!open);
    }

    return <div className={styles.search}>
        {open && (
            <input
                className={styles.input}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && toggle()}
                placeholder="Search album, artist or note"
                aria-label="Search earmarks"
                maxLength={100}
                autoFocus
            />
        )}
        <button
            type="button"
            className={styles.toggle}
            onClick={toggle}
            aria-label={open ? "Close search" : "Search earmarks"}
            aria-expanded={open}
        >
            {open ? <CloseIcon/> : <SearchIcon/>}
        </button>
    </div>
}