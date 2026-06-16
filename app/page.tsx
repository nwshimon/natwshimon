'use client'

import { useState } from 'react'
import styles from './page.module.css'
import PhotoStack from '@/components/PhotoStack'
import LatestSidebar from '@/components/LatestSidebar'
import PagePreviewCard from '@/components/PagePreviewCard'
import ContactStub from '@/components/ContactStub'

export default function Home() {
    const [photoOrder, setPhotoOrder] = useState([0, 1, 2])

    const handlePhotoClick = (photoIndex: number) => {
        console.log('photo clicked', photoIndex)
        setPhotoOrder((prev) => {
            if (prev[0] === photoIndex) return prev
            const rest = prev.filter((i) => i !== photoIndex)
            return [photoIndex, ...rest]
        })
    }

    return (
        <main className={styles.main}>

            {/* Desktop: sidebar + content grid */}
            <div className={styles.pageGrid}>

                <div className={styles.sidebar}>
                    <LatestSidebar />
                </div>

                <div className={styles.contentArea}>

                    <section className={styles.about}>
                        <span className={styles.sectionLabel}>About the Publisher</span>
                        <h2 className={styles.name}>
                            Natasha<br />
                            Wynne<br />
                            Shimon
                        </h2>
                        <p className={styles.bio}>
                            An avid collector of vinyl records and ambitious pursuer of
                            creative and fun tech projects, Natasha (&quot;Nat&quot;) Shimon
                            is a University of Michigan student who spends her time tinkering
                            with code, writing about film, and occasionally making things
                            that she&apos;s pretty proud of. With her sights set on{' '}
                            <strong>product management</strong>, Nat is excited to show you
                            her proudest works.
                        </p>

                        {/* Mobile: photo stack below bio */}
                        <div className={styles.photoMobile}>
                            <PhotoStack order={photoOrder} onPhotoClick={handlePhotoClick} />
                        </div>
                    </section>

                    <div className={styles.photoDesktop}>
                        <PhotoStack order={photoOrder} onPhotoClick={handlePhotoClick} />
                    </div>

                </div>

                <div className={styles.latestMobile}>
                    <LatestSidebar />
                </div>

            </div>

            <section className={styles.previewSection}>
                <PagePreviewCard
                    href="/works"
                    label="Digital Projects"
                    headline="Where late-night ideas turn into shipped products."
                    teaser="Browse code, builds, and product experiments."
                    imageSrc="/photos/knitpicker.avif"
                    animationDelay="0.55s"
                />
                <PagePreviewCard
                    href="/b-side"
                    label="Arts & Etc."
                    headline="Vinyl, film, and the things made just for fun."
                    teaser="A look at music, writing, and creative detours."
                    imageSrc="/photos/arts-sxsw.webp"
                    animationDelay="0.65s"
                />
                <ContactStub animationDelay="0.75s" />
            </section>

        </main>
    )
}