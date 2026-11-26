import {useSyncedValue} from "../../hooks/useSyncedValue.ts";
import styles from "./Dropdown.module.css";

export type DropdownOption = { value: string; label: string };

export default function Dropdown({value, onChange, options, ariaLabel, className}: {
    value: string;
    onChange: (next: string) => void;
    options: ReadonlyArray<DropdownOption>;
    ariaLabel?: string | undefined;
    className?: string | undefined;
}) {
    const [local, setLocal] = useSyncedValue(value);

    return <select
        aria-label={ariaLabel}
        className={className ? `${styles.dropdown} ${className}` : styles.dropdown}
        value={local}
        onChange={(e) => {
            setLocal(e.target.value);
            onChange(e.target.value);
        }}
    >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>;
}