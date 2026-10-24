import {todayLocalDate} from "../../../../utils/todayLocalDate.ts";
import styles from "./EarmarkListenedOnDatePicker.module.css"

export default function EarmarkListenedOnDatePicker({listenedAt, setListenedAt}: {
    listenedAt: string | undefined,
    setListenedAt: (value: (((prevState: string) => string) | string)) => void
}) {
    return <div className={styles.dateField}>
        <label className={styles.dateLabel} htmlFor="listenedAt">Listened on</label>
        <div className={styles.dateRow}>
            <input
                id="listenedAt"
                className={styles.dateInput}
                type="date"
                value={listenedAt}
                max={todayLocalDate()}
                onChange={(e) => setListenedAt(e.target.value)}
            />
            {
                listenedAt &&
                <button className={styles.dateClear} type="button" onClick={() => setListenedAt("")}>
                    Clear
                </button>
            }
        </div>
    </div>
}