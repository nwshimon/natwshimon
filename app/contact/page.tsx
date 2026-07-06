import PageTitle from '@/components/PageTitle'
import ContactGallery from './ContactGallery'
import styles from './Contact.module.css'

const MAX_GALLERY_PHOTOS = 3

const photos = [
    { src: '/photos/panda-nat.png', alt: 'Full-body photo of Natasha with a large panda statue, posing similarly.' },
    { src: '/photos/koi-group.JPG', alt: 'Natasha playing her electric guitar with her bandmates' },
    { src: '/photos/sxsw-group-selfie.png', alt: 'Selfie of Natasha and two other friends at SXSW film festival' },
].slice(0, MAX_GALLERY_PHOTOS)

export default function ContactPage() {
    return (
        <main className={styles.page}>
            <PageTitle eyebrow="Get In Touch" title="Hi there! I'm Nat." />

            <p className={styles.bio}>
                I'm a rising senior studying Data Science and UX Design at the University of Michigan, with a backlog of experiences that's bounced between project management, data analysis, and software engineering; first in Ann Arbor, then Jakarta, then Hong Kong. Across every role, I look for places where my technical depth, engineering skills, and design sense can grow. <br /><br />Outside of this, though, you can probably find me vinyl hunting, visiting film festivals, or watching bad horror movies.
            </p>

            <ContactGallery photos={photos} />

            {/* <p className={styles.caption}>Traveling around the world, playing in a band, and visiting film festivals.</p> */}

            <blockquote className={styles.callout}>
                I'm currently looking for product roles starting in 2027. If you&apos;re building something interesting, or
                just want to talk shop: Say hello, I&apos;d love to hear from you!
            </blockquote>

            <a href="mailto:nshimon@umich.edu" className={styles.emailText}>nshimon@umich.edu</a>

            <div className={styles.buttonRow}>
                <a
                    href="https://www.linkedin.com/in/natasha-shimon/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.button}
                >
                    LinkedIn
                </a>
                <a
                    href="https://github.com/nwshimon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.button}
                >
                    GitHub
                </a>
            </div>

        </main>
    )
}
