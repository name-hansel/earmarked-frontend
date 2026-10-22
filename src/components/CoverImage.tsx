import type {AlbumImage} from "../features/spotify/api/spotify.ts";
import {useState} from "react";
import styles from "./CoverImage.module.css"

export default function CoverImage({image, alt, className}: {
    image: AlbumImage | undefined;
    alt: string;
    className?: string | undefined;
}) {
    const [loadedUrl, setLoadedUrl] = useState<string | null>(null);
    const [failedUrl, setFailedUrl] = useState<string | null>(null);

    const failed = image !== undefined && failedUrl === image.url;
    const loaded = image !== undefined && loadedUrl === image.url;
    const state = !image || failed ? "empty" : loaded ? "loaded" : "loading";

    return <div className={`${styles.frame} ${className ?? ""}`} data-state={state}>
        {image && !failed &&
            <img className={styles.image}
                 src={image.url}
                 alt={alt}
                 width={image.width}
                 height={image.height}
                 onLoad={() => setLoadedUrl(image.url)}
                 onError={() => setFailedUrl(image.url)}/>}
    </div>
}