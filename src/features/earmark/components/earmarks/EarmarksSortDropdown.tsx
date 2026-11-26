import {EARMARK_SORT_OPTIONS, type EarmarkSort} from "../../utils/earmarkSort.ts";
import styles from "./EarmarksSortDropdown.module.css"
import Dropdown from "../../../../components/dropdown/Dropdown.tsx";

export default function EarmarksSortDropdown({sort, handleSortChange}: {
    sort: EarmarkSort;
    handleSortChange: (next: EarmarkSort) => void
}) {
    return <label className={styles.sortLabel}>
        <span>Sort by</span>
        <Dropdown className={styles.sortSelect} value={sort} options={EARMARK_SORT_OPTIONS}
                  onChange={(next) => handleSortChange(next as EarmarkSort)}/>
    </label>
}