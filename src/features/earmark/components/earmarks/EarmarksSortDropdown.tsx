import {type EarmarkSort, joinSort, SORT_FIELDS, type SortDirection, splitSort} from "../../utils/earmarkSort.ts";
import styles from "./EarmarksSortDropdown.module.css"
import Dropdown from "../../../../components/dropdown/Dropdown.tsx";
import {ArrowDownIcon, ArrowUpIcon} from "../../../../components/Icon.tsx";

const FIELD_OPTIONS = SORT_FIELDS.map(({value, label}) => ({value, label}));

export default function EarmarksSortDropdown({sort, handleSortChange}: {
    sort: EarmarkSort;
    handleSortChange: (next: EarmarkSort) => void
}) {
    const {field, direction} = splitSort(sort);
    const config = SORT_FIELDS.find((f) => f.value === field)!;
    const nextDirection: SortDirection = direction === "ASC" ? "DESC" : "ASC";
    const DirectionIcon = direction === "ASC" ? ArrowUpIcon : ArrowDownIcon;

    function handleFieldChange(next: string) {
        const nextField = SORT_FIELDS.find((f) => f.value === next)!;
        handleSortChange(joinSort(nextField.value, nextField.defaultDirection));
    }

    return <div className={styles.sortGroup}>
        <span className={styles.sortLabel}>Sort by</span>
        <div className={styles.sortControls}>
            <Dropdown ariaLabel="Sort by" className={styles.sortSelect}
                      value={field} options={FIELD_OPTIONS} onChange={handleFieldChange}/>
            <button type="button" className={styles.directionButton}
                    title={`Switch to ${config.directionLabels[nextDirection]}`}
                    aria-label={`${config.directionLabels[direction]}. Switch to ${config.directionLabels[nextDirection]}`}
                    onClick={() => handleSortChange(joinSort(field, nextDirection))}>
                <span>{config.directionLabels[direction]}</span>
                <DirectionIcon className={styles.directionIcon}/>
            </button>
        </div>
    </div>
}