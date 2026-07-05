import Link from 'next/link'
import styles from './SectionsSidebar.module.css'

const sectionsItems = [
    {
        category: 'Digital Projects',
        subtitle: 'Browse my code, builds, and product experiments. Alternatively titled: "What I do instead of sleeping."',
        href: '/works',
    },
    {
        category: 'Arts & Etc.',
        subtitle: 'Ever wonder what side quests look like? Take a look at my music, writing, and creative detours.',
        href: '/b-side',
    },
]

export default function SectionsSidebar() {
    return (
        <aside className={styles.sidebar}>
            <h2 className={styles.heading}>The Sections</h2>
            <ul className={styles.list}>
                {sectionsItems.map((item, i) => (
                    <li key={i} className={styles.item}>
                        <Link href={item.href} className={styles.itemLink}>
                            <p className={styles.headline}>{item.category}</p>
                            <span className={styles.subtitle}>{item.subtitle}</span>
                            <span className={styles.pageNote}>
                                Go to page <span aria-hidden="true">&rarr;</span>
                            </span>
                        </Link>
                    </li>
                ))}
                <li className={styles.item}>
                    <Link href="/contact" className={styles.stubLink}>
                        <span className={styles.cornerTL} aria-hidden="true" />
                        <span className={styles.cornerTR} aria-hidden="true" />
                        <span className={styles.cornerBL} aria-hidden="true" />
                        <span className={styles.cornerBR} aria-hidden="true" />
                        <div className={styles.stubInner}>
                            <span className={styles.innerCornerTL} aria-hidden="true" />
                            <span className={styles.innerCornerTR} aria-hidden="true" />
                            <span className={styles.innerCornerBL} aria-hidden="true" />
                            <span className={styles.innerCornerBR} aria-hidden="true" />
                            <span className={styles.stubEyebrow}>Have Something to Say?</span>
                            <p className={styles.stubHeadline}>Get in touch!</p>
                            {/* <span className={styles.stubDivider} aria-hidden="true" /> */}
                            {/* <p className={styles.stubDescription}>Roles, collaborations, or anything on this site.</p> */}
                            {/* <span className={styles.stubCloser}> */}
                                {/* Go to page <span aria-hidden="true">&rarr;</span> */}
                            {/* </span> */}
                        </div>
                    </Link>
                </li>
            </ul>
        </aside>
    )
}