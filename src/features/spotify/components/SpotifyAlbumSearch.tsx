import {useEffect, useRef, useState} from "react";
import {useDebounce} from "../../../hooks/useDebounce.ts";
import {useSpotifyAlbumSearch} from "../hooks/useSpotifyAlbumSearch.ts";
import SpotifyAlbumCard from "./SpotifyAlbumCard.tsx";
import {getSearchErrorMessage} from "../utils/getSearchErrorMessage.ts";
import {useSearchParams} from "react-router";

export default function SpotifyAlbumSearch() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [input, setInput] = useState(searchParams.get("q") ?? "");
    const debouncedInput = useDebounce(input);

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

    return <section>
        <input type="search" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search albums..."
               aria-label="Search albums"/>
        {
            input && <button type="button" onClick={() => setInput("")}>Clear</button>
        }

        {isSearching && isFetching && <p>Searching...</p>}
        {isSearching && isError && <p role="alert">{getSearchErrorMessage(error)}</p>}
        {isSearching && !isFetching && albums?.length === 0 && <p>No albums found.</p>}

        {
            isSearching && albums && albums.length > 0 &&
            <ul>
                {albums.map((album) => <SpotifyAlbumCard key={album.id} album={album}/>)}
            </ul>
        }
    </section>
}