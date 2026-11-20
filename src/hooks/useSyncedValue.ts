import {useState} from "react";

export function useSyncedValue<T>(value: T) {
    const [local, setLocal] = useState(value);
    const [previous, setPrevious] = useState(value);

    if (value !== previous) {
        setPrevious(value);
        setLocal(value);
    }
    
    return [local, setLocal] as const;
}