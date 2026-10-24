import styles from "./Earmarks.module.css";
import {DEFAULT_EARMARK_SORT, type EarmarkSort, isEarmarkSort} from "../utils/earmarkSort.ts";
import {useSearchParams} from "react-router";
import {useDebounce} from "../../../hooks/useDebounce.ts";
import EarmarksSortDropdown from "../components/earmarks/EarmarksSortDropdown.tsx";
import EarmarksContent from "../components/earmarks/EarmarksContent.tsx";
import {useState} from "react";
import {EarmarkSearchInput} from "../components/earmarks/EarmarksSearchInput.tsx";
import EarmarksSearchToggle from "../components/earmarks/EarmarksSearchToggle.tsx";

export default function Earmarks() {
    const [searchParams, setSearchParams] = useSearchParams();

    const sortInput = searchParams.get("sort");
    const searchInput = searchParams.get("q") ?? "";

    const [searchOpen, setSearchOpen] = useState(searchInput !== "");
    const debouncedQ = useDebounce(searchInput.trim(), 500);

    const sort = isEarmarkSort(sortInput) ? sortInput : DEFAULT_EARMARK_SORT;

    function handleSortChange(next: EarmarkSort) {
        setSearchParams(
            (prev) => {
                const params = new URLSearchParams(prev);

                if (next) {
                    params.set("sort", next);
                } else {
                    params.delete("sort");
                }

                return params;
            },
            {replace: true});
    }

    function handleSearchChange(next: string) {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);

            if (next) {
                params.set("q", next);
            } else {
                params.delete("q");
            }

            return params;
        }, {replace: true});
    }

    function toggleSearch() {
        if (searchOpen) handleSearchChange("");
        setSearchOpen(!searchOpen);
    }

    return <section className={styles.page}>
        <div className={styles.header}>
            <div className={styles.titleRow}>
                <h1 className={styles.title}>Your earmarks</h1>
                <EarmarksSearchToggle open={searchOpen} onClick={toggleSearch}/>
            </div>
            <EarmarksSortDropdown sort={sort} handleSortChange={handleSortChange}/>
        </div>
        {searchOpen && (
            <EarmarkSearchInput value={searchInput} onChange={handleSearchChange} onClose={toggleSearch}/>
        )}
        <EarmarksContent sort={sort} q={debouncedQ}/>
    </section>
}

