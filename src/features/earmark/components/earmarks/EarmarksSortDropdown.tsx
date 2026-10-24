import {EARMARK_SORT_OPTIONS, type EarmarkSort} from "../../utils/earmarkSort.ts";
import styles from "./EarmarksSortDropdown.module.css"

export default function EarmarksSortDropdown({sort, handleSortChange}: {
    sort: EarmarkSort;
    handleSortChange: (next: EarmarkSort) => void
}) {
    return <label className={styles.sortLabel}>
        <span>Sort by</span>
        <select
            className={styles.sortSelect}
            value={sort}
            onChange={(e) => handleSortChange(e.target.value as EarmarkSort)}
        >
            {EARMARK_SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
            ))}
        </select>
    </label>
}