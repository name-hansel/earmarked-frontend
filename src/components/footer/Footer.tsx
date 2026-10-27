import SpotifyLogoLink from "../spotify/SpotifyLogoLink.tsx";
import styles from "./Footer.module.css";

export default function Footer() {
    return <footer className={styles.footer}>
        <SpotifyLogoLink url="https://www.spotify.com"/>
        <p className={styles.text}>Album data and cover art provided by Spotify.</p>
    </footer>
}