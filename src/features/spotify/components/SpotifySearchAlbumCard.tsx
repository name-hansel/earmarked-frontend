import type {SpotifyAlbum} from "../api/spotify.ts";
import {useLocation} from "react-router";
import {pickImage} from "../../../utils/pickImage.ts";
import AlbumCard from "../../album/components/AlbumCard.tsx";
import QuickEarmarkButton from "../../earmark/components/buttons/QuickEarmarkButton.tsx";
import EarmarkDate from "../../earmark/components/EarmarkDate.tsx";
import DeleteEarmarkButton from "../../earmark/components/buttons/DeleteEarmarkButton.tsx";
import {useAlbumEarmark} from "../../earmark/hooks/useAlbumEarmark.ts";

export default function SpotifySearchAlbumCard({album}: {
    album: SpotifyAlbum
}) {
    const location = useLocation();
    const albumCover = pickImage(album.images, 300);
    const {data} = useAlbumEarmark(album.id);
    const earmark = data?.earmark;

    return <AlbumCard
        to={`/albums/${album.id}`}
        linkState={{from: location.pathname + location.search}}
        linkTitle={`${album.name} — ${album.artists.join(", ")}`}
        name={album.name}
        artists={album.artists.join(", ")}
        cover={albumCover}
        coverAlt={`Cover for ${album.name}`}
        releaseDate={album.releaseDate}
        albumType={album.albumType}
        spotifyUrl={album.spotifyUrl}
        footerStart={earmark && <EarmarkDate earmark={earmark} showIcon/>}
        actions={
            <>
                <QuickEarmarkButton spotifyAlbumId={album.id} compact albumName={album.name}/>
                {
                    earmark && <DeleteEarmarkButton spotifyAlbumId={album.id} albumName={album.name} earmark={earmark}/>
                }
            </>
        }
    />
}