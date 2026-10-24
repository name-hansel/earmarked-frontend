import {SearchIcon} from "../../../../components/Icon.tsx";
import styles from "./EarmarksSearchToggle.module.css"

export default function EarmarksSearchToggle({onClick}: { onClick: () => void }) {
    return (
        <button type="button" className={styles.toggle} onClick={onClick}
                aria-label="Search earmarks">
            <SearchIcon/>
        </button>
    );
}