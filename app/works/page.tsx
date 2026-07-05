import Image from 'next/image'
import FeaturedProjectCard from '@/components/FeaturedProjectCard'
import ProjectCard from '@/components/ProjectCard'
import TagBadge from '@/components/TagBadge'
import { caseStudies } from '@/lib/caseStudies'
import { prototypeProjects } from '@/lib/prototypes'
import styles from './Works.module.css'

const featuredProjects = caseStudies
    .filter((cs) => cs.heroImage !== null)
    .map((cs) => ({
        href: `/works/${cs.slug}`,
        category: cs.category.split(' & '),
        imageSrc: cs.heroImage as string,
        imageAlt: `${cs.title} hero image`,
        title: cs.title,
        description: cs.dek,
    }))

const teardowns = [
    {
        date: '2025',
        format: 'Presentation',
        headline: 'UNIQLO E-Commerce Heuristic Evaluation',
        description:
            "A Nielsen-based usability audit of UNIQLO's US web store, surfacing navigation friction, inconsistent affordances, and accessibility gaps across the purchase funnel.",
        imageSrc: '/photos/uniqlo-eval.png',
        imageAlt: 'Three-panel heuristic evaluation slide deck for the UNIQLO website',
        href: '#',
        ctaLabel: 'View Presentation',
    },
    {
        date: '2025',
        format: 'Article',
        headline: 'Design Patterns & Dark Patterns',
        description:
            'A Medium essay tracing how interaction patterns born from user-centered design can drift into manipulation — and what practitioners owe the people they design for.',
        imageSrc: null,
        imageAlt: null,
        href: '#',
        ctaLabel: 'Read on Medium',
    },
]

export default function WorksPage() {
    return (
        <main className={styles.page}>

            {/* ── FEATURED ── */}
            <section className={styles.section}>
                <h2 className={styles.sectionLabel}>Featured</h2>
                <div className={styles.featuredGrid}>
                    {featuredProjects.map((p) => (
                        <FeaturedProjectCard key={p.href} {...p} />
                    ))}
                </div>
            </section>

            {/* ── PROTOTYPES ── */}
            <section className={styles.section}>
                <h2 className={styles.sectionLabel}>Prototypes</h2>
                <div className={styles.prototypesGrid}>
                    {prototypeProjects.map((p) => (
                        <ProjectCard key={p.href} {...p} />
                    ))}
                </div>
            </section>

            {/* ── TEARDOWNS ── */}
            <section className={styles.section}>
                <h2 className={styles.sectionLabel}>Teardowns</h2>
                <div className={styles.teardownsList}>
                    {teardowns.map((t) => (
                        <article key={t.headline} className={styles.teardownItem}>
                            <div className={styles.teardownMeta}>
                                <span className={styles.teardownDate}>{t.date}</span>
                                <TagBadge label={t.format} />
                            </div>
                            {t.imageSrc ? (
                                <div className={styles.teardownWithImage}>
                                    <div className={styles.teardownImageWrap}>
                                        <Image
                                            src={t.imageSrc}
                                            alt={t.imageAlt ?? ''}
                                            fill
                                            sizes="(min-width: 1280px) 420px, (min-width: 768px) 50vw, 100vw"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className={styles.teardownBody}>
                                        <h3 className={styles.teardownHeadline}>{t.headline}</h3>
                                        <p className={styles.teardownDescription}>{t.description}</p>
                                        <a
                                            href={t.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.externalLink}
                                        >
                                            {t.ctaLabel} ↗
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.teardownBody}>
                                    <h3 className={styles.teardownHeadline}>{t.headline}</h3>
                                    <p className={styles.teardownDescription}>{t.description}</p>
                                    <a
                                        href={t.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.externalLink}
                                    >
                                        {t.ctaLabel} ↗
                                    </a>
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            </section>

        </main>
    )
}
