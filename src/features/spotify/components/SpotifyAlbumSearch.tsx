import {useEffect, useRef} from "react";
import {useDebounce} from "../../../hooks/useDebounce.ts";
import {useSpotifyAlbumSearch} from "../hooks/useSpotifyAlbumSearch.ts";
import {getSearchErrorMessage} from "../utils/getSearchErrorMessage.ts";
import {useSearchParams} from "react-router";
import styles from "./SpotifyAlbumSearch.module.css";
import PageLoader from "../../../components/page-loader/PageLoader.tsx";
import SearchInput from "../../../components/search/SearchInput.tsx";
import SpotifySearchResults from "./SpotifySearchResults.tsx";

export default function SpotifyAlbumSearch({input, onInputChange}: {
    input: string;
    onInputChange: (value: string) => void;
}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const debouncedInput = useDebounce(input, 500);

    const {data: albums, isFetching, isError, error} = useSpotifyAlbumSearch(debouncedInput);
    const isSearching = input.trim().length > 1;
    const isPendingSearch = isSearching && (isFetching || debouncedInput.trim() !== input.trim());

    const urlQuery = searchParams.get("q") ?? "";
    const lastWrittenRef = useRef(urlQuery);

    // debounced input -> URL
    useEffect(() => {
        const next = debouncedInput.trim();
        if (next !== input.trim()) return;
        if (next === lastWrittenRef.current) return;

        lastWrittenRef.current = next;
        setSearchParams(next ? {q: next} : {}, {replace: true});
    }, [debouncedInput, input, setSearchParams]);

    // URL -> input: only for changes we didn't make (Home link, back/forward)
    useEffect(() => {
        if (urlQuery === lastWrittenRef.current) return;
        lastWrittenRef.current = urlQuery;
        onInputChange(urlQuery);
    }, [urlQuery]);

    return <section className={styles.search}>
        <SearchInput value={input} onChange={onInputChange} onClear={() => onInputChange("")} clearLabel="Clear search"
                     placeholder="Search albums..." aria-label="Search albums"/>
        {isPendingSearch && <PageLoader/>}
        {isSearching && isError && <p role="alert">{getSearchErrorMessage(error)}</p>}
        {isSearching && !isPendingSearch && albums?.length === 0 && <p>No albums found.</p>}
        {
            isSearching && albums && albums.length > 0 && <SpotifySearchResults albums={albums}/>
        }
    </section>
}