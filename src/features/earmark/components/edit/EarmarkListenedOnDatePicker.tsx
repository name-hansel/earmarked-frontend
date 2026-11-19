import {todayLocalDate} from "../../../../utils/todayLocalDate.ts";
import styles from "./EarmarkListenedOnDatePicker.module.css"

export default function EarmarkListenedOnDatePicker({listenedAt, setListenedAt, listened, setListened}: {
    listenedAt: string | undefined,
    setListenedAt: (value: (((prevState: string) => string) | string)) => void,
    listened: boolean,
    setListened: (next: boolean) => void
}) {
    return <div className={styles.listenedField}>
        <label className={styles.checkbox}>
            <input
                type="checkbox"
                checked={listened}
                onChange={(e) => setListened(e.target.checked)}
            />
            Listened
        </label>

        {listened && (
            <div className={styles.dateField}>
                <label className={styles.dateLabel} htmlFor="listenedAt">Listened on (optional)</label>
                <input
                    id="listenedAt"
                    className={styles.dateInput}
                    type="date"
                    value={listenedAt}
                    max={todayLocalDate()}
                    onChange={(e) => setListenedAt(e.target.value)}
                />
            </div>
        )}
    </div>
}