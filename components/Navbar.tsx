import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.taglineStrip}>
                    <span className={styles.taglineText}>DATA SCIENCE · UX DESIGN · EST. 2005</span>
                    <span className={styles.taglineText}>ANN ARBOR, MI</span>
                </div>

                <div className={styles.masthead}>
                    <Link href="/" className={styles.mastheadTitle}>
                        natwshimon
                    </Link>
                    <p className={styles.mastheadSubtitle}>A Portfolio Website</p>
                    <div className={styles.socialIcons}>
                        <a href="https://linkedin.com/in/natasha-shimon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <img src="/icons/linkedin.svg" alt="" aria-hidden="true" className={styles.socialIcon} />
                        </a>
                        <a href="mailto:nshimon@umich.edu" aria-label="Email">
                            <img src="/icons/gmail.webp" alt="" aria-hidden="true" className={styles.socialIcon} />
                        </a>
                        <a href="https://github.com/YOUR_USERNAME" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <img src="/icons/github.svg" alt="" aria-hidden="true" className={styles.socialIcon} />
                        </a>
                    </div>
                </div>
            </header>

            <nav className={styles.nav}>
                <div className={styles.navInner}>
                    <Link href="/" className={styles.navLink}>Home</Link>
                    <Link href="/works" className={styles.navLink}>Digital Projects</Link>
                    {/* <Link href="/b-side" className={styles.navLink}>Arts & Etc.</Link> */}
                    <Link href="/contact" className={styles.navLink}>Get In Touch</Link>
                </div>
            </nav>
        </>
    )
}