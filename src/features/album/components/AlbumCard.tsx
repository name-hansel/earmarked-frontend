import type {ComponentProps, ReactNode} from "react";
import {Link, type LinkProps} from "react-router";
import styles from "./AlbumCard.module.css";
import CoverImage from "../../../components/image/CoverImage.tsx";
import SpotifyLink from "../../../components/spotify/SpotifyLink.tsx";
import {formatReleaseDate} from "../../../utils/formatReleaseDate.ts";
import EarmarkIndicators from "../../earmark/components/indicators/EarmarkIndicators.tsx";
import type {Earmark} from "../../earmark/api/earmark.ts";


export default function AlbumCard({
                                      to, linkState, linkTitle, name, artists, unavailable,
                                      cover, coverAlt, releaseDate, releaseDatePrecision, albumType, spotifyUrl,
                                      actions, children, earmark, header
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
    releaseDatePrecision: string | undefined;
    albumType?: string | undefined;
    spotifyUrl?: string | undefined;
    actions?: ReactNode;
    children?: ReactNode;
    earmark: Earmark | undefined;
    header?: ReactNode
}) {
    const meta = [releaseDate && formatReleaseDate(releaseDate, releaseDatePrecision), albumType]
        .filter(Boolean)
        .join(" · ");

    return <li className={styles.item}>
        {header}
        <div className={styles.card}>
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
                    {
                        actions && <div className={styles.action}>
                            <div className={styles.earmarkTools}>{actions}</div>
                        </div>
                    }
                </div>
            </div>
            <div className={styles.footer}>
                <EarmarkIndicators earmark={earmark}/>
                <div className={styles.footerEnd}>
                    {meta && <p className={styles.meta}>{meta}</p>}
                    {spotifyUrl && <SpotifyLink className={styles.spotify} url={spotifyUrl}/>}
                </div>
            </div>
        </div>
    </li>
}