import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'
import SectionsSidebar from '@/components/SectionsSidebar'
import PagePreviewCard from '@/components/PagePreviewCard'
import ContactStub from '@/components/ContactStub'

type FeaturedBlurb = {
    href: string
    label: string
    title: string
    description: string
    imageAlt: string
    imageSrc?: string
    placeholder?: string
}

const featuredBlurbs: FeaturedBlurb[] = [
    {
        href: '/works',
        label: 'Featured',
        title: 'M-Genie',
        description: 'A full-stack AI assistant streamlining maintenance workflows for University of Michigan facilities staff.',
        imageSrc: '/photos/mgenie.avif',
        imageAlt: 'M-Genie featured project placeholder',
        placeholder: 'M-Genie',
    },
    {
        href: '/works',
        label: 'Featured',
        title: 'M-LEAD',
        description: 'An accessibility remediation effort improving navigation and usability across the University of Michigan leadership platform.',
        imageSrc: '/photos/mlead.png',
        imageAlt: 'M-LEAD featured project placeholder',
    },
    // {
    //     href: '/works',
    //     label: 'Prototypes',
    //     title: 'Knitpicker',
    //     description: 'A CLI that catches mistakes in knitting patterns before you pick up your needles.',
    //     imageSrc: '/photos/knitpicker.avif',
    //     imageAlt: 'Knitpicker CLI tool interface',
    // },
]

export default function Home() {
    return (
        <main className={styles.main}>

            {/* About the Publisher */}
            <section className={styles.about}>
                <span className={styles.sectionLabel}>About the Publisher</span>
                <h2 className={styles.name}>Natasha Wynne Shimon</h2>
                <p className={styles.bio}>
                    A data scientist, a creative, and an aspiring product manager, always building tools at the intersection of people, data, and good design.
                </p>
            </section>

            {/* Latest + Featured row */}
            <div className={styles.contentRow}>
                <div className={styles.sectionsCol}>
                    <SectionsSidebar />
                    <div className={styles.sidebarStub}>
                        <ContactStub />
                    </div>
                </div>
                <div className={styles.featuredCol}>
                    <h2 className={styles.featuredHeading}>Recent Work</h2>
                    {featuredBlurbs.map((project) => (
                        <Link key={project.title} href={project.href} className={styles.featuredCard}>
                            <div className={styles.featuredImageWrap}>
                                {project.imageSrc ? (
                                    <Image
                                        src={project.imageSrc}
                                        alt={project.imageAlt}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div className={styles.featuredPlaceholder} aria-label={project.imageAlt}>
                                        <span className={styles.featuredPlaceholderText}>{project.placeholder}</span>
                                    </div>
                                )}
                            </div>
                            <div className={styles.featuredBody}>
                                <span className={styles.featuredLabel}>{project.label}</span>
                                <h3 className={styles.featuredTitle}>{project.title}</h3>
                                <p className={styles.featuredDesc}>{project.description}</p>
                                <span className={styles.featuredCta}>See the work →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </main>
    )
}
