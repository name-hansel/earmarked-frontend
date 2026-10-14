import {useState} from "react";
import {useDebounce} from "../../../hooks/useDebounce.ts";
import {useAlbumSearch} from "../hooks/useAlbumSearch.ts";
import SpotifyAlbumCard from "./SpotifyAlbumCard.tsx";
import {getSearchErrorMessage} from "../utils/getSearchErrorMessage.ts";

export default function SpotifyAlbumSearch() {
    const [input, setInput] = useState("");
    const debouncedInput = useDebounce(input);
    const {data: albums, isFetching, isError, error} = useAlbumSearch(debouncedInput);

    return <section>
        <input type="search" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search albums..."
               aria-label="Search albums"/>
        
        {isFetching && <p>Searching...</p>}
        {isError && <p role="alert">{getSearchErrorMessage(error)}</p>}
        {!isFetching && albums?.length === 0 && <p>No albums found.</p>}

        {
            albums && albums.length > 0 &&
            <ul>
                {albums.map((album) => <SpotifyAlbumCard key={album.id} album={album}/>)}
            </ul>
        }
    </section>
}