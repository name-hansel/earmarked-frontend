import {useEffect, useRef, useState} from "react";
import {useDebounce} from "../../../hooks/useDebounce.ts";
import {useSpotifyAlbumSearch} from "../hooks/useSpotifyAlbumSearch.ts";
import {getSearchErrorMessage} from "../utils/getSearchErrorMessage.ts";
import {useSearchParams} from "react-router";
import styles from "./SpotifyAlbumSearch.module.css";
import PageLoader from "../../../components/page-loader/PageLoader.tsx";
import SearchInput from "../../../components/search/SearchInput.tsx";
import SpotifySearchResults from "./SpotifySearchResults.tsx";

export default function SpotifyAlbumSearch() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [input, setInput] = useState(searchParams.get("q") ?? "");
    const debouncedInput = useDebounce(input, 500);

    const {data: albums, isFetching, isError, error} = useSpotifyAlbumSearch(debouncedInput);
    const activeQuery = input.trim().length > 1 ? debouncedInput : "";
    const isSearching = activeQuery.trim().length > 1;

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
        setInput(urlQuery);
    }, [urlQuery]);

    return <section className={styles.search}>
        <SearchInput value={input} onChange={setInput} onClear={() => setInput("")} clearLabel="Clear search"
                     placeholder="Search albums..." aria-label="Search albums"/>
        {isSearching && isFetching && <PageLoader/>}
        {isSearching && isError && <p role="alert">{getSearchErrorMessage(error)}</p>}
        {isSearching && !isFetching && albums?.length === 0 && <p>No albums found.</p>}
        {
            isSearching && albums && albums.length > 0 && <SpotifySearchResults albums={albums}/>
        }
    </section>
}