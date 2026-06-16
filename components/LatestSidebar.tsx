import Link from 'next/link'
import styles from './LatestSidebar.module.css'

const latestItems = [
    {
        category: 'DIGITAL PROJECTS',
        headline: 'Knitpicker launches on Shimon\'s GitHub Repository',
        href: '#',
    },
    {
        category: 'DIGITAL PROJECTS',
        headline: 'M-Genie, a digital cleaning workspace for U-M staff and faculty, goes live!',
        href: '#',
    },
    {
        category: 'ARTS & ETC.',
        headline: 'Local Ann Arbor indie band, Playing Koi, wraps up their last gig',
        href: '#',
    },
]

export default function LatestSidebar() {
    return (
        <aside className={styles.sidebar}>
            <h2 className={styles.heading}>The Latest</h2>
            <ul className={styles.list}>
                {latestItems.map((item, i) => (
                    <li key={i} className={styles.item}>
                        <Link href={item.href} className={styles.itemLink}>
                            <span className={styles.category}>{item.category}</span>
                            <p className={styles.headline}>{item.headline}</p>
                            <span className={styles.pageNote}>
                                Go to page <span aria-hidden="true">&rarr;</span>
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    )
}