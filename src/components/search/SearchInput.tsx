import {CloseIcon} from "../Icon.tsx";
import {type InputHTMLAttributes, useRef} from "react";
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
}) {
    const inputRef = useRef<HTMLInputElement>(null);

    function handleClear() {
        onClear();
        inputRef.current?.focus();
    }

    return (
        <div className={styles.field}>
            <input
                {...inputProps}
                ref={inputRef}
                className={styles.input}
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={(e) => e.currentTarget.select()}
                onKeyDown={(e) => {
                    if (e.key === "Escape" && (value || alwaysShowClear)) {
                        e.preventDefault();
                        handleClear();
                    }
                }}
            />
            {(alwaysShowClear || value) && (
                <button type="button" className={styles.clear} onClick={handleClear} aria-label={clearLabel}>
                    <CloseIcon/>
                </button>
            )}
        </div>
    );
}