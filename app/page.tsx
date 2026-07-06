import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'
import SectionsSidebar from '@/components/SectionsSidebar'
// import ContactStub from '@/components/ContactStub'
import ProjectCard from '@/components/ProjectCard'
import { prototypeProjects } from '@/lib/prototypes'

type FeaturedBlurb = {
    href: string
    label: string
    dateRange: string
    title: string
    description: string
    imageAlt: string
    imageSrc?: string
    placeholder?: string
}

const featuredBlurbs: FeaturedBlurb[] = [
    {
        href: '/works/m-genie',
        label: 'Featured',
        dateRange: '2026',
        title: 'M-Genie',
        description: 'A web application for University of Michigan personnel, to streamline administrative workflows and declutter their digital workspaces.',
        imageSrc: '/photos/mgenie.avif',
        imageAlt: 'Cropped screenshot of M-Genie frontend interface: a dashboard with a Michigan blue colored sidebar on the left and a table containing files on the right',
    },
]

// Shorter, homepage-only blurbs — the full descriptions in lib/prototypes.ts are sized for the /works grid.
const recentWorkDescriptions: Record<string, string> = {
    'https://mlead.umich.edu/': "As a web developer for U-M's leadership hub, I maintained and enhanced the site on WordPress and Pantheon.",
    'https://github.com/nwshimon/si338-final-proj': "An accessibility-focused website redesign for Skyline High School's cross-country team.",
    'https://github.com/nwshimon/knit-picker': 'A 2D crochet grid pattern generator for tapestry crochet, at any skill level.',
}

const recentPrototypes = prototypeProjects.slice(0, 3).map((project) => ({
    ...project,
    label: 'Prototype',
    description: recentWorkDescriptions[project.href] ?? project.description,
}))

export default function Home() {
    return (
        <main className={styles.main}>
            <section className={styles.about}>
                <span className={styles.sectionLabel}>About the Publisher</span>
                <h2 className={styles.name}>Natasha Wynne Shimon</h2>
                <p className={styles.bio}>
                    A data scientist, a creative, and an aspiring product manager, always building tools at the intersection of people, data, and good design.
                </p>
            </section>

            <div className={styles.contentRow}>
                <div className={styles.sectionsCol}>
                    <SectionsSidebar />
                    {/* <div className={styles.sidebarStub}>
                        <ContactStub />
                    </div> */}
                </div>
                <div className={styles.featuredCol}>
                    <h2 className={styles.featuredHeading}>Recent Work</h2>
                    {featuredBlurbs.map((project, index) => (
                        <Link key={project.title} href={project.href} className={styles.featuredCard}>
                            <div className={styles.featuredImageWrap}>
                                {project.imageSrc ? (
                                    <Image
                                        src={project.imageSrc}
                                        alt={project.imageAlt}
                                        fill
                                        sizes="(min-width: 1280px) 520px, (min-width: 768px) 50vw, 100vw"
                                        loading={index === 0 ? 'eager' : 'lazy'}
                                        style={{ objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div className={styles.featuredPlaceholder} aria-label={project.imageAlt}>
                                        <span className={styles.featuredPlaceholderText}>{project.title}</span>
                                    </div>
                                )}
                            </div>
                            <div className={styles.featuredBody}>
                                <div className={styles.featuredMeta}>
                                    <span className={styles.featuredDate}>{project.dateRange}</span>
                                    <span className={styles.featuredLabel}>{project.label}</span>
                                </div>
                                <h3 className={styles.featuredTitle}>{project.title}</h3>
                                <p className={styles.featuredDesc}>{project.description}</p>
                                <span className={styles.featuredCta}>See the work →</span>
                            </div>
                        </Link>
                    ))}
                    <div className={styles.recentPrototypesGrid}>
                        {recentPrototypes.map((project) => (
                            <ProjectCard key={project.href} {...project} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
