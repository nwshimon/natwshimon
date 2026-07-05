import type { ReactNode } from 'react'
import styles from './richText.module.css'

// Parses **bold**, *italic*, [text](url), and ==accent== inline markup into React nodes.
export function renderRichText(text: string): ReactNode[] {
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\)|==[^=]+==|__[^_]+__)/g)

    return parts.map((part, i) => {
        const bold = part.match(/^\*\*([^*]+)\*\*$/)
        if (bold) {
            return <strong key={i}>{bold[1]}</strong>
        }

        const italic = part.match(/^\*([^*]+)\*$/)
        if (italic) {
            return <em key={i}>{italic[1]}</em>
        }

        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (link) {
            return (
                <a key={i} className={styles.link} href={link[2]} target="_blank" rel="noopener noreferrer">
                    {link[1]}
                </a>
            )
        }

        const accent = part.match(/^==([^=]+)==$/)
        if (accent) {
            return <span key={i} className={styles.accent}>{accent[1]}</span>
        }

        const underline = part.match(/^__([^_]+)__$/)
        if (underline) {
            return <u key={i}>{underline[1]}</u>
        }

        return part
    })
}
