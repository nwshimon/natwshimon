import Image from 'next/image'
import Link from 'next/link'
import PageTitle from '@/components/PageTitle'
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
        date: '2026',
        format: 'Article',
        headline: 'Spotter: A Company Analysis Memo',
        description:
            "As part of my submission for the Contrary Research Fellowship 2026, I wrote a company memo for Spotter, a startup in the entertainment industry that specializes in the creator economy.",
        imageSrc: '/photos/spotter-logo.png',
        imageAlt: `The Spotter logo: the company's name in sans-serif font with an asterisk as the 'o' in 'Spotter'`,
        href: 'https://root-sesame-fbc.notion.site/Company-Memo-Spotter-37fae5d300c480e093c4cfc31e5e98dc?pvs=74',
        ctaLabel: 'View Presentation',
    },
    {
        date: '2025',
        format: 'Presentation',
        headline: 'UNIQLO E-Commerce Heuristic Evaluation',
        description:
            "A Nielsen-based usability audit of UNIQLO's web store, surfacing navigation friction, inconsistent affordances, and accessibility gaps across the purchase funnel.",
        imageSrc: '/photos/uniqlo-heuristic.png',
        imageAlt: 'A screenshot in one of the slide panels of the UNIQLO website',
        href: 'https://simplebooklet.com/si110flex2_heuristicevaluat#page=1',
        ctaLabel: 'View Presentation',
    },
    {
        date: '2025',
        format: 'Article',
        headline: 'Design Patterns & How Tech Companies Leave You in the Dark',
        description:
            'A Medium essay I wrote as part of my product journey, tracing how interaction patterns born from user-centered design can drift into manipulation in a concept called "dark patterns," and how to spot them.',
        imageSrc: '/photos/medium.png',
        imageAlt: 'The Medium website logo',
        href: 'https://medium.com/@natashawshimon/design-patterns-how-tech-companies-leave-you-in-the-dark-2f34a23896ff',
        ctaLabel: 'Read on Medium',
    },
]

export default function WorksPage() {
    return (
        <main className={styles.page}>

            <PageTitle
                eyebrow="Digital Projects"
                title="Selected Work"
                description="Here, you'll find my proudest works in digital design and development, some from my professional life, some from my academics, and some from my own personal passions."
            />

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
                        <Link
                            key={t.headline}
                            href={t.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.teardownItem}
                        >
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
                                        <span className={styles.teardownCta}>
                                            {t.ctaLabel} <span aria-hidden="true">↗</span>
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.teardownBody}>
                                    <h3 className={styles.teardownHeadline}>{t.headline}</h3>
                                    <p className={styles.teardownDescription}>{t.description}</p>
                                    <span className={styles.teardownCta}>
                                        {t.ctaLabel} <span aria-hidden="true">↗</span>
                                    </span>
                                </div>
                            )}
                        </Link>
                    ))}
                </div>
            </section>

        </main>
    )
}
