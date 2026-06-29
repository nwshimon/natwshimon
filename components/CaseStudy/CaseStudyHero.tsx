import Image from 'next/image'
import styles from './CaseStudyHero.module.css'

interface CaseStudyHeroProps {
    heroType: 'device-frame' | 'plain' | 'none'
    heroImage: string | null
    title: string
    heroLink?: string | null
    addressBarText?: string | null
}

export default function CaseStudyHero({ heroType, heroImage, title, heroLink, addressBarText }: CaseStudyHeroProps) {
    if (heroType === 'none' || !heroImage) return null

    if (heroType === 'device-frame') {
        const frame = (
            <div className={`${styles.deviceFrame} ${heroLink ? styles.deviceFrameClickable : ''}`}>
                <div className={styles.browserChrome} aria-hidden="true">
                    <span className={styles.chromeDot} />
                    <span className={styles.chromeDot} />
                    <span className={styles.chromeDot} />
                    <div className={styles.addressBar}>
                        {addressBarText ? (
                            <span className={styles.addressBarText}>
                                {addressBarText.split('–').map((part, i) =>
                                    i === 0 ? (
                                        <span key={i}>{part.trim()}</span>
                                    ) : (
                                        <span key={i}> – <em>{part.trim()}</em></span>
                                    )
                                )}
                            </span>
                        ) : null}
                    </div>
                </div>
                <div className={styles.screen}>
                    <Image
                        src={heroImage}
                        alt={`${title} — product screenshot`}
                        width={1200}
                        height={900}
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                        priority
                    />
                    {heroLink && (
                        <div className={styles.hoverOverlay} aria-hidden="true">
                            <span className={styles.hoverLabel}>Visit site ↗</span>
                        </div>
                    )}
                </div>
            </div>
        )

        return (
            <div className={styles.deviceFrameWrap}>
                {heroLink ? (
                    <a
                        href={heroLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.deviceFrameLink}
                        aria-label={`Visit ${title} live site`}
                    >
                        {frame}
                    </a>
                ) : frame}
            </div>
        )
    }

    return (
        <div className={styles.plainWrap}>
            <Image
                src={heroImage}
                alt={`${title} — hero image`}
                width={1200}
                height={900}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                priority
            />
        </div>
    )
}
