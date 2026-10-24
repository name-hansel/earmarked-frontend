import {CloseIcon} from "../Icon.tsx";
import type {InputHTMLAttributes, KeyboardEventHandler} from "react";
import styles from "./SearchInput.module.css"

export default function SearchInput({
                                        value,
                                        onChange,
                                        onClear,
                                        clearLabel,
                                        alwaysShowClear = false,
                                        ...inputProps
                                    }: Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "className" | "type"> & {
    value: string;
    onChange: (value: string) => void;
    onClear: () => void;
    clearLabel: string;
    alwaysShowClear?: boolean;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}) {
    return (
        <div className={styles.field}>
            <input
                {...inputProps}
                className={styles.input}
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {(alwaysShowClear || value) && (
                <button type="button" className={styles.clear} onClick={onClear} aria-label={clearLabel}>
                    <CloseIcon/>
                </button>
            )}
        </div>
    );
}