import type { ReactNode } from 'react'
import styles from './richText.module.css'

// Parses **bold** and [text](url) inline markup into React nodes.
export function renderRichText(text: string): ReactNode[] {
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g)

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

        return part
    })
}
