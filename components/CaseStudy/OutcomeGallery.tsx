import { renderRichText } from '@/lib/renderRichText'
import styles from './OutcomeGallery.module.css'

export interface OutcomeSimpleImage {
    src: string
    alt: string
    caption?: string
}

export interface OutcomeSimpleEntry {
    kind: 'simple'
    images: OutcomeSimpleImage[]
}

export interface OutcomeSequenceStep {
    src: string
    alt: string
    caption: string
}

export interface OutcomeSequenceRow {
    label?: string
    actionLabel: string
    steps: [OutcomeSequenceStep, OutcomeSequenceStep]
}

export interface OutcomeSequenceEntry {
    kind: 'sequence'
    eyebrow: string
    heading: string
    rows: OutcomeSequenceRow[]
    explanation: string | string[]
}

export type OutcomeEntry = OutcomeSimpleEntry | OutcomeSequenceEntry

interface OutcomeGalleryProps {
    entries: OutcomeEntry[]
    onImageClick: (src: string, alt: string) => void
}

function Arrow() {
    return (
        <svg className={styles.arrowIcon} viewBox="0 0 48 16" fill="none" aria-hidden="true">
            <line x1="0" y1="8" x2="38" y2="8" stroke="currentColor" strokeWidth="1.5" />
            <path
                d="M32 2 L42 8 L32 14"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function SimpleEntry({
    entry,
    onImageClick,
}: {
    entry: OutcomeSimpleEntry
    onImageClick: (src: string, alt: string) => void
}) {
    return (
        <div className={styles.simpleImages}>
            {entry.images.map((image, idx) => (
                <figure key={idx} className={styles.simpleEntry}>
                    <button
                        type="button"
                        className={styles.imageBtn}
                        onClick={() => onImageClick(image.src, image.alt)}
                        aria-label="Open image fullscreen"
                    >
                        <div className={styles.imageWrap}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={image.src} alt={image.alt} className={styles.image} />
                        </div>
                    </button>
                    {image.caption && <figcaption className={styles.caption}>{image.caption}</figcaption>}
                </figure>
            ))}
        </div>
    )
}

function SequenceEntry({
    entry,
    onImageClick,
}: {
    entry: OutcomeSequenceEntry
    onImageClick: (src: string, alt: string) => void
}) {
    return (
        <div className={styles.sequenceEntry}>
            <p className={styles.eyebrow}>{entry.eyebrow}</p>
            <p className={styles.heading}>{entry.heading}</p>

            {entry.rows.map((row, rowIdx) => (
                <div key={rowIdx} className={styles.rowGroup}>
                    {row.label && <p className={styles.rowLabel}>{row.label}</p>}
                    <div className={styles.stepsRow}>
                        <figure className={styles.step}>
                            <button
                                type="button"
                                className={styles.imageBtn}
                                onClick={() => onImageClick(row.steps[0].src, row.steps[0].alt)}
                                aria-label="Open image fullscreen"
                            >
                                <div className={styles.imageWrap}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={row.steps[0].src} alt={row.steps[0].alt} className={styles.image} />
                                </div>
                            </button>
                            <figcaption className={styles.stepCaption}>{row.steps[0].caption}</figcaption>
                        </figure>

                        <div className={styles.arrowCol}>
                            <Arrow />
                            <p className={styles.actionLabel}>{row.actionLabel}</p>
                        </div>

                        <figure className={styles.step}>
                            <button
                                type="button"
                                className={styles.imageBtn}
                                onClick={() => onImageClick(row.steps[1].src, row.steps[1].alt)}
                                aria-label="Open image fullscreen"
                            >
                                <div className={styles.imageWrap}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={row.steps[1].src} alt={row.steps[1].alt} className={styles.image} />
                                </div>
                            </button>
                            <figcaption className={styles.stepCaption}>{row.steps[1].caption}</figcaption>
                        </figure>
                    </div>
                </div>
            ))}

            {(Array.isArray(entry.explanation) ? entry.explanation : [entry.explanation]).map((paragraph, idx) => (
                <p key={idx} className={styles.explanation}>{renderRichText(paragraph)}</p>
            ))}
        </div>
    )
}

export function OutcomeGallery({ entries, onImageClick }: OutcomeGalleryProps) {
    return (
        <div className={styles.gallery}>
            {entries.map((entry, i) =>
                entry.kind === 'simple' ? (
                    <SimpleEntry key={i} entry={entry} onImageClick={onImageClick} />
                ) : (
                    <SequenceEntry key={i} entry={entry} onImageClick={onImageClick} />
                )
            )}
        </div>
    )
}
