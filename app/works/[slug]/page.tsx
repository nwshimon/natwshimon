import { notFound } from 'next/navigation'
import Image from 'next/image'
import { caseStudies, getCaseStudy } from '@/lib/caseStudies'
import CaseStudyHero from '@/components/CaseStudyHero'
import styles from './CaseStudyPage.module.css'

export async function generateStaticParams() {
    return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const cs = getCaseStudy(slug)
    if (!cs) return {}
    return {
        title: `${cs.title} — natwshimon`,
        description: cs.dek,
    }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const cs = getCaseStudy(slug)
    if (!cs) notFound()

    return (
        <article className={styles.page}>

            {/* 1 — Metadata strip */}
            <div className={styles.metaStrip}>
                <span className={styles.metaLeft}>
                    Issue N° {cs.issueNumber} · {cs.category}
                </span>
                <span className={styles.metaRight}>{cs.dateRange}</span>
            </div>

            {/* 2 — Headline block */}
            <header className={styles.headline}>
                <h1 className={styles.title}>{cs.title}</h1>
                <p className={styles.dek}>{cs.dek}</p>
            </header>

            {/* 3 — Hero */}
            <CaseStudyHero
                heroType={cs.heroType}
                heroImage={cs.heroImage}
                title={cs.title}
            />

            {/* 4 — Two-column fact row */}
            <div className={styles.factRow}>
                <div className={styles.factCol}>
                    <span className={styles.factLabel}>The Problem</span>
                    <p className={styles.factText}>{cs.problem}</p>
                </div>
                <div className={styles.factDivider} aria-hidden="true" />
                <div className={styles.factCol}>
                    <span className={styles.factLabel}>My Role</span>
                    <p className={styles.factText}>{cs.role}</p>
                </div>
            </div>

            {/* 5 — Body */}
            <div className={styles.body}>
                {cs.body.map((block, i) => {
                    if (block.type === 'paragraph') {
                        return <p key={i} className={styles.prose}>{block.content}</p>
                    }
                    return (
                        <figure key={i} className={styles.inlineImageFigure}>
                            <div className={styles.inlineImageWrap}>
                                <Image
                                    src={block.src}
                                    alt={block.alt}
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            {block.caption && (
                                <figcaption className={styles.caption}>{block.caption}</figcaption>
                            )}
                        </figure>
                    )
                })}
            </div>

            {/* 6 — Closing CTA */}
            <div className={styles.ctaWrap}>
                <a
                    href={cs.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cta}
                >
                    {cs.externalLinkLabel} <span aria-hidden="true">↗</span>
                </a>
            </div>

        </article>
    )
}
