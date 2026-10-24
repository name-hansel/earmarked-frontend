import {CloseIcon, SearchIcon} from "../../../../components/Icon.tsx";
import styles from "./EarmarksSearchToggle.module.css"

export default function EarmarksSearchToggle({open, onClick}: { open: boolean; onClick: () => void }) {
    return (
        <button
            type="button"
            className={styles.toggle}
            onClick={onClick}
            aria-label={open ? "Close search" : "Search earmarks"}
            aria-expanded={open}
        >
            {open ? <CloseIcon/> : <SearchIcon/>}
        </button>
    );
}