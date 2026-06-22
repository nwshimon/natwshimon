import Image from 'next/image'
import styles from './CaseStudyHero.module.css'

interface CaseStudyHeroProps {
    heroType: 'device-frame' | 'plain' | 'none'
    heroImage: string | null
    title: string
}

export default function CaseStudyHero({ heroType, heroImage, title }: CaseStudyHeroProps) {
    if (heroType === 'none' || !heroImage) return null

    if (heroType === 'device-frame') {
        return (
            <div className={styles.deviceFrameWrap}>
                <div className={styles.deviceFrame}>
                    <div className={styles.browserChrome} aria-hidden="true">
                        <span className={styles.chromeDot} />
                        <span className={styles.chromeDot} />
                        <span className={styles.chromeDot} />
                        <span className={styles.addressBar} />
                    </div>
                    <div className={styles.screen}>
                        <Image
                            src={heroImage}
                            alt={`${title} — product screenshot`}
                            fill
                            style={{ objectFit: 'cover', objectPosition: 'top' }}
                            priority
                        />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.plainWrap}>
            <Image
                src={heroImage}
                alt={`${title} — hero image`}
                fill
                style={{ objectFit: 'contain' }}
                priority
            />
        </div>
    )
}
