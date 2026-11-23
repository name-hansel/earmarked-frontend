import {useRef} from "react";
import styles from "./EarmarkTextField.module.css";
import formStyles from "../../../../styles/Form.module.css";
import ClearButton from "../../../../components/button/ClearButton.tsx";

const MAX_TEXT_LENGTH = 256;

export default function EarmarkTextField({value, onChange, label}: {
    value: string | null;
    onChange: (value: string) => void;
    label: string
}) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const id = `earmark-${label}`;

    return <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor={id}>{label}</label>
        <textarea ref={textareaRef} className={styles.textarea} id={id} value={value ?? ""}
                  onChange={(event) => onChange(event.target.value)}
                  maxLength={MAX_TEXT_LENGTH} rows={5}/>
        <div className={styles.footer}>
            <p className={styles.counter}>{value == null ? 0 : value.length}/{MAX_TEXT_LENGTH}</p>
            <ClearButton onClick={() => {
                onChange("");
                textareaRef.current?.focus();
            }} label={`Clear ${label}`} disabled={value === null}/>
        </div>
    </div>
}