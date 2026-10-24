import {type EarmarkStatus, parseHasNote, parseStatus} from "../../utils/earmarkFilters.ts";
import styles from "./EarmarksFilter.module.css"

export default function EarmarksFilter({status, hasNote, onStatusChange, onHasNoteChange}: {
    status: EarmarkStatus | undefined;
    hasNote: boolean | undefined;
    onStatusChange: (next: EarmarkStatus | undefined) => void;
    onHasNoteChange: (next: boolean | undefined) => void;
}) {
    return <div className={styles.filters}>
        <span className={styles.groupLabel}>Filter</span>
        <select aria-label="Filter by status"
                className={styles.select}
                value={status ?? ""}
                onChange={(e) => onStatusChange(parseStatus(e.target.value))}
        >
            <option value="">All</option>
            <option value="TO_LISTEN">To listen</option>
            <option value="LISTENED">Listened</option>
        </select>

        <select aria-label="Filter by note"
                className={styles.select}
                value={hasNote === undefined ? "" : String(hasNote)}
                onChange={(e) => onHasNoteChange(parseHasNote(e.target.value))}
        >
            <option value="">Any note</option>
            <option value="true">Has note</option>
            <option value="false">No note</option>
        </select>
    </div>
}