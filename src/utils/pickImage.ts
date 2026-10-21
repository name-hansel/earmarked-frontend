import type {AlbumImage} from "../features/spotify/api/spotify.ts";

export function pickImage(images: AlbumImage[], minWidth: number): AlbumImage | undefined {
    const bySize = [...images].sort((a, b) => a.width - b.width);

    return bySize.find((image) => image.width >= minWidth) ?? bySize.at(-1);
}