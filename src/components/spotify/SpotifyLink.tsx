import styles from "./SpotifyLink.module.css";
import spotifyIcon from "../../assets/spotify/spotify-icon-white.svg";

export default function SpotifyLink({url, className}: { url: string; className?: string | undefined }) {
    return <a
        className={`${styles.link} ${className ?? ""}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open in Spotify"
        title="Open in Spotify"
    >
        <img className={styles.icon} src={spotifyIcon} alt="" width={24} height={24}/>
    </a>
}