import {useState} from "react";
import {useDebounce} from "../../../hooks/useDebounce.ts";
import {useAlbumSearch} from "../hooks/useAlbumSearch.ts";

export default function SpotifyAlbumSearch() {
    const [input, setInput] = useState("");
    const debouncedInput = useDebounce(input);
    const {data: albums, isFetching, isError} = useAlbumSearch(debouncedInput);

    return <section>
        <input type="search" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search albums..."
               aria-label="Search albums"/>
        {isFetching && <p>Searching...</p>}
        {isError && <p>Something went wrong. Please try again.</p>}
        {!isFetching && albums?.length === 0 && <p>No albums found.</p>}
    </section>
}