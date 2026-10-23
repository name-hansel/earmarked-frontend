import type {ComponentProps, ReactNode} from "react";
import {Link, type LinkProps} from "react-router";
import styles from "./AlbumCard.module.css";
import CoverImage from "../../../components/CoverImage.tsx";
import SpotifyLink from "../../../components/spotify/SpotifyLink.tsx";
import {formatReleaseDate} from "../../../utils/formatReleaseDate.ts";


export default function AlbumCard({
                                      to, linkState, linkTitle, name, artists, unavailable,
                                      cover, coverAlt, releaseDate, albumType, spotifyUrl,
                                      footerStart, children
                                  }: {
    to: string;
    linkState?: LinkProps["state"];
    linkTitle?: string | undefined;
    name: string;
    artists?: string | undefined;
    unavailable?: boolean;
    cover: ComponentProps<typeof CoverImage>["image"];
    coverAlt: string;
    releaseDate?: string | undefined;
    albumType?: string | undefined;
    spotifyUrl?: string | undefined;
    footerStart?: ReactNode;
    children?: ReactNode;
}) {
    const meta = [releaseDate && formatReleaseDate(releaseDate), albumType]
        .filter(Boolean)
        .join(" · ");

    return <li className={styles.card}>
        <div className={styles.main}>
            <CoverImage className={styles.cover} image={cover} alt={coverAlt}/>
            <div className={styles.body}>
                <Link className={unavailable ? `${styles.link} ${styles.unavailable}` : styles.link}
                      to={to}
                      state={linkState}
                      title={linkTitle}>
                    {name}
                </Link>
                {artists && <span className={styles.artists}>{artists}</span>}
                {children}
            </div>
        </div>
        <div className={styles.footer}>
            {footerStart}
            <div className={styles.footerEnd}>
                {meta && <p className={styles.meta}>{meta}</p>}
                {spotifyUrl && <SpotifyLink className={styles.spotify} url={spotifyUrl}/>}
            </div>
        </div>
    </li>
}