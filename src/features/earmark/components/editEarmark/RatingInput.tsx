import styles from "./RatingInput.module.css"
import {MusicNoteIcon, MusicNoteOffIcon} from "../../../../components/Icon.tsx";

//TODO: Move to central place
const MAX_RATING = 3;

export default function RatingInput({value, onChange}: {
    value: number | null,
    onChange: (next: number | null) => void
}) {
    return <div className={styles.field}>
        <span className={styles.label} id="rating-label">Rating (optional)</span>
        <div className={styles.controls} role="group" aria-labelledby="rating-label">
            <button type="button" className={value === 0 ? styles.zeroButtonActive : styles.zeroButton}
                    aria-label="0 out of 3, didn't like it" title="Didn't like it"
                    aria-pressed={value === 0} onClick={() => onChange(value === 0 ? null : 0)}>
                <MusicNoteOffIcon className={value === 0 ? styles.zeroIcon : styles.empty}/>
            </button>
            <div className={styles.notes}>
                {Array.from({length: MAX_RATING}, (_, i) => {
                    const filled = value !== null && i < value;
                    return <button key={i} type="button" className={styles.noteButton}
                                   aria-label={`${i + 1} out of ${MAX_RATING}`}
                                   aria-pressed={value === i + 1}
                                   onClick={() => onChange(i + 1)}>
                        <MusicNoteIcon className={filled ? styles.filled : styles.empty}/>
                    </button>;
                })}
            </div>
            {value !== null &&
                <button type="button" className={styles.textButton} onClick={() => onChange(null)}>
                    Clear
                </button>}
        </div>
    </div>
}