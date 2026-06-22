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
            </ul>
        </aside>
    )
}