import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'
import LatestSidebar from '@/components/LatestSidebar'
import PagePreviewCard from '@/components/PagePreviewCard'
import ContactStub from '@/components/ContactStub'

export default function Home() {
    return (
        <main className={styles.main}>

            {/* About the Publisher */}
            <section className={styles.about}>
                <span className={styles.sectionLabel}>About the Publisher</span>
                <h2 className={styles.name}>Natasha Wynne Shimon</h2>
                <p className={styles.bio}>
                    Data scientist and aspiring product manager building products at the intersection of people, data, and good design.
                </p>
            </section>

            {/* Latest + Featured row */}
            <div className={styles.contentRow}>
                <div className={styles.latestCol}>
                    <LatestSidebar />
                </div>
                <div className={styles.featuredCol}>
                    <Link href="/works/m-genie" className={styles.featuredCard}>
                        <div className={styles.featuredImageWrap}>
                            <Image
                                src="/photos/m-genie.png"
                                alt="Screenshot of M-Genie"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className={styles.featuredBody}>
                            <span className={styles.featuredLabel}>Featured</span>
                            <h3 className={styles.featuredTitle}>M-Genie</h3>
                            <p className={styles.featuredDesc}>
                                A full-stack AI assistant streamlining maintenance workflows for University of Michigan facilities staff.
                            </p>
                            <span className={styles.featuredCta}>Read the case study →</span>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Preview cards */}
            <section className={styles.previewSection}>
                <PagePreviewCard
                    href="/works"
                    label="Digital Projects"
                    headline="Where late-night ideas turn into shipped products."
                    teaser="Browse code, builds, and product experiments."
                    imageSrc="/photos/knitpicker.avif"
                />
                <PagePreviewCard
                    href="/b-side"
                    label="Arts & Etc."
                    headline="Vinyl, film, and the things made just for fun."
                    teaser="A look at music, writing, and creative detours."
                    imageSrc="/photos/arts-sxsw.webp"
                />
                <ContactStub />
            </section>

        </main>
    )
}
