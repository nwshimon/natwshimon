import { renderRichText } from '@/lib/renderRichText'
import { PhaseMedia } from './PhaseMedia'
import styles from './TimelinePhase.module.css'
import type { TimelinePhaseData } from '@/lib/caseStudies'

export function TimelinePhase({ eyebrow, title, blocks, filled = false, isLast = false }: TimelinePhaseData) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.rail}>
                <div className={filled ? styles.nodeFilled : styles.nodeHollow} />
                {!isLast && <div className={styles.line} />}
            </div>
            <div className={`${styles.content} ${isLast ? styles.contentLast : ''}`}>
                <p className={styles.eyebrow}>{eyebrow}</p>
                <h3 className={styles.title}>{title}</h3>
                {blocks.map((block, i) => {
                    if (block.type === 'paragraph') {
                        return <p key={i} className={styles.prose}>{renderRichText(block.content)}</p>
                    }
                    if (block.type === 'bullets') {
                        return (
                            <ul key={i} className={styles.bullets}>
                                {block.items.map((item, idx) => (
                                    <li key={idx} className={styles.bulletItem}>{renderRichText(item)}</li>
                                ))}
                            </ul>
                        )
                    }
                    if (block.type === 'media') {
                        return <PhaseMedia key={i} images={block.images} />
                    }
                    return null
                })}
            </div>
        </div>
    )
}
