import { notFound } from 'next/navigation'
import { caseStudies, getCaseStudy } from '@/lib/caseStudies'
import CaseStudyHero from '@/components/CaseStudy/CaseStudyHero'
import { MetaCards } from '@/components/CaseStudy/MetaCards'
import { ProseBody } from '@/components/CaseStudy/ProseBody'
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
                {cs.dek && <p className={styles.dek}>{cs.dek}</p>}
            </header>

            {/* 3 — Hero */}
            <CaseStudyHero
                heroType={cs.heroType}
                heroImage={cs.heroImage}
                title={cs.title}
                heroLink={cs.heroLink}
                addressBarText={cs.addressBarText}
            />

            {/* 3b — Hero subtitle */}
            {cs.heroSubtitle && (
                <p className={styles.heroSubtitle}>{cs.heroSubtitle}</p>
            )}

            {/* 4 — MetaCards */}
            <div className={styles.metaCardsWrap}>
                <MetaCards cards={cs.metaCards} />
            </div>

            {/* 5 — Body */}
            <ProseBody blocks={cs.body} />

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
