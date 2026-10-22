import {useRef} from "react";
import styles from "./EarmarkNoteField.module.css";
import formStyles from "../../../../styles/Form.module.css";

const MAX_NOTE_LENGTH = 256;

export default function EarmarkNoteField({value, onChange}: {
    value: string;
    onChange: (value: string) => void;
}) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    return <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor="earmark-note">Note</label>
        <textarea ref={textareaRef} className={styles.textarea} id="earmark-note" value={value}
                  onChange={(event) => onChange(event.target.value)}
                  maxLength={MAX_NOTE_LENGTH} rows={5}/>
        <div className={styles.footer}>
            {value &&
                <button className={styles.clear} type="button" aria-label="Clear note"
                        onClick={() => {
                            onChange("");
                            textareaRef.current?.focus();
                        }}>
                    Clear
                </button>}
            <p className={styles.counter}>{value.length}/{MAX_NOTE_LENGTH}</p>
        </div>
    </div>
}