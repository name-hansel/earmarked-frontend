const MAX_NOTE_LENGTH = 256;
import styles from "./EarmarkNoteField.module.css";
import formStyles from "../../../../styles/Form.module.css";

export default function EarmarkNoteField({value, onChange}: {
    value: string;
    onChange: (value: string) => void;
}) {
    return <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor="earmark-note">Note</label>
        <textarea className={styles.textarea} id="earmark-note" value={value}
                  onChange={(event) => onChange(event.target.value)}
                  maxLength={MAX_NOTE_LENGTH} rows={5}/>
        <p className={styles.counter}>{value.length}/{MAX_NOTE_LENGTH}</p>
    </div>
}