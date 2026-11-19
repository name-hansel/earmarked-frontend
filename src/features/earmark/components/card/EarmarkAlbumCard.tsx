import type {Earmark} from "../../api/earmark.ts";
import {pickImage} from "../../../../utils/pickImage.ts";
import AlbumCard from "../../../album/components/AlbumCard.tsx";
import DeleteEarmarkButton from "../buttons/DeleteEarmarkButton.tsx";
import {useLocation} from "react-router";
import EarmarkSortHeader from "./EarmarkSortHeader.tsx";

export default function EarmarkAlbumCard({earmark}: {
    earmark: Earmark;
}) {
    const {album, spotifyAlbumId} = earmark;
    const albumCover = album ? pickImage(album.images, 300) : undefined;
    const location = useLocation();

    return <AlbumCard
        to={`/albums/${spotifyAlbumId}`}
        linkState={{from: location.pathname + location.search}}
        linkTitle={album ? `${album.name} — ${album.artists.join(", ")}` : undefined}
        name={album ? album.name : "Album unavailable"}
        artists={album?.artists.join(", ")}
        unavailable={!album}
        cover={albumCover}
        coverAlt={album ? `Cover of ${album.name}` : ""}
        releaseDate={album?.releaseDate}
        releaseDatePrecision={album?.releaseDatePrecision}
        albumType={album?.albumType}
        spotifyUrl={album?.spotifyUrl}
        earmark={earmark}
        actions={
            <DeleteEarmarkButton spotifyAlbumId={spotifyAlbumId} albumName={album?.name} earmark={earmark}/>
        }
        header={<EarmarkSortHeader earmark={earmark} sort={"EARMARKED_DESC"}/>}
    />
}