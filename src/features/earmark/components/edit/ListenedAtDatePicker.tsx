import {todayLocalDate} from "../../../../utils/todayLocalDate.ts";
import styles from "./ListenedAtDatePicker.module.css"
import ClearButton from "../../../../components/button/ClearButton.tsx";

export default function ListenedAtDatePicker({listenedAt, setListenedAt,}: {
    listenedAt: string | undefined,
    setListenedAt: (value: (((prevState: string) => string) | string)) => void,
}) {
    return <div className={styles.dateField}>
        <label className={styles.dateLabel} htmlFor="listenedAt">Listened on (optional)</label>
        <div className={styles.dateRow}>
            <input
                id="listenedAt"
                className={styles.dateInput}
                type="date"
                value={listenedAt ?? ""}
                max={todayLocalDate()}
                onChange={(e) => setListenedAt(e.target.value)}
            />
            <ClearButton label="Clear listened date" disabled={!listenedAt} onClick={() => setListenedAt("")}/>
        </div>
    </div>
}