import {useState} from "react";
import {useDebounce} from "../../../hooks/useDebounce.ts";
import {useSpotifyAlbumSearch} from "../hooks/useSpotifyAlbumSearch.ts";
import SpotifyAlbumCard from "./SpotifyAlbumCard.tsx";
import {getSearchErrorMessage} from "../utils/getSearchErrorMessage.ts";

export default function SpotifyAlbumSearch() {
    const [input, setInput] = useState("");
    const debouncedInput = useDebounce(input);
    const {data: albums, isFetching, isError, error} = useSpotifyAlbumSearch(debouncedInput);
    const activeQuery = input.trim().length > 1 ? debouncedInput : "";
    const isSearching = activeQuery.trim().length > 1;

    function handleClear() {
        setInput("");
    }

    return <section>
        <input type="search" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search albums..."
               aria-label="Search albums"/>
        {
            input && <button type="button" onClick={handleClear}>Clear</button>
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