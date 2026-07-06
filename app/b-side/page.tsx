import Image from 'next/image'
import type { CSSProperties } from 'react'
import PageTitle from '@/components/PageTitle'
import MusicWritingColumns, { type MusicWritingColumn } from './MusicWritingColumns'
import styles from './BSide.module.css'

interface IdentityTile {
    caption: string
    image?: { src: string; alt: string }
    rotation: number
    frameStyle: 'light' | 'dark'
}

const identityTiles: IdentityTile[] = [
    {
        caption: 'Chinese New Year Potluck with friends!',
        image: { src: '/photos/cny-potluck.png', alt: 'A picture of a variety of cooked food on a wide table' },
        rotation: -6,
        frameStyle: 'light',
    },
    {
        caption: 'Mory on digicam',
        image: { src: '/photos/mory-digicam.png', alt: 'Cute brown toy poodle laying on a bed, looking at the camera' },
        rotation: 4,
        frameStyle: 'dark',
    },
    {
        caption: 'Traveling to Austin for SXSW',
        image: { src: '/photos/arts-sxsw.webp', alt: 'A group photo of the "Sender" film cast in front of a big SXSW screen' },
        rotation: -3,
        frameStyle: 'light',
    },
    {
        caption: 'My first time handmaking a crochet pattern...',
        image: { src: '/photos/crochet-pc.png', alt: 'A pair of headphones with a crocheted cover set' },
        rotation: 7,
        frameStyle: 'dark',
    },
]

const musicWritingColumns: MusicWritingColumn[] = [
    {
        eyebrow: 'Music',
        headline: 'Say hello to *Playing Koi!*',
        images: [
            { src: '/photos/koi-group1.jpg', alt: 'Picture of the 5 band members of Playing Koi, standing outside of a brick building' },
            { src: '/photos/koi-group2.jpg', alt: '5 members of Playing Koi sitting in front of a wall of synthetic leaves' },
        ],
        caption: 'On September 2025, my friends and I started a band on a whim. We were a ragtag team practicing in covert locations and avoiding noise complaints to the best of our abilities. In 2026, we performed for three separate gigs.',
        captionPosition: 'top',
        linkText: 'The Playing Koi website ↗',
        linkHref: 'https://nwshimon.github.io/playing-koi/',
    },
    {
        eyebrow: 'Writing',
        headline: 'Featured at *The Michigan Daily*',
        imageAspectRatio: '90 / 45',
        images: [
            // Fill in real photos + articles: src goes in public/photos, href is the article URL,
            // caption is what appears over the dark overlay on hover.
            { src: '/photos/sxsw-daily.webp', alt: 'Illustration of SXSW event from The Michigan Daily', caption: 'South by Southwest Festival 2026 Exclusives & Interviews', href: 'https://specials.michigandaily.com/2026/festival/sxsw/' },
            { src: '/photos/mickey17-daily.webp', alt: `Two egg yolks sizzling in a black pan, a screencapture from 'The Substance'`, caption: 'On ‘Mickey 17,’ ‘The Substance,’ coercive consent and splitting the self', href: 'https://www.michigandaily.com/arts/film/on-mickey-17-the-substance-coercive-consent-and-splitting-the-self/' },
            { src: '/photos/cinetopia-daily.webp', alt: `A promo photo from ‘1969: Killers, Freaks, and Radicals’ of a woman's face in a vintage car's circular external mirror`, caption: 'Cinetopia 2025: ‘1969: Killers, Freaks, and Radicals’ challenges the true crime genre', href: 'https://www.michigandaily.com/arts/film/cinetopia-2025-1969-killers-freaks-and-radicals-challenges-the-true-crime-genre/' },
            { src: '/photos/vinyl-daily.webp', alt: `An illustration of a vinyl player from The Michigan Daily`, caption: 'Bright-pink Barbie CDs, American standards and physical media', href: 'https://www.michigandaily.com/arts/b-side/bright-pink-barbie-cds-american-standards-and-physical-media/' },
            { src: '/photos/kois-daily.webp', alt: `An illustration of 3 koi fish, playing an electric guitar, bass guitar, and drums from The Michigan Daily`, caption: 'Playing Koi and its tests, allies and enemies', href: 'https://www.michigandaily.com/arts/b-side/fish-out-of-water/' },
            { src: '/photos/readyornot-daily.webp', alt: `A screencapture from 'Ready or Not 2: Here I Come' of the a group of antagonists staring down at the two protagonists`, caption: 'SXSW 2026: ‘Ready or Not 2: Here I Come’ might be a sophomore slump, but that’s okay', href: 'https://www.michigandaily.com/arts/film/sxsw-2026-ready-or-not-2-here-i-come-might-be-a-sophomore-slump-but-thats-okay/' },
        ],
        caption: `In my free time, I also write for the Film beat of *The Michigan Daily*, a student-run news publication. I've had the amazing opportunity to attend film festivals in both Ann Arbor and Austin, engage in panels with the greats like Stephen Spielberg, and support indie films through my writing. On *The Michigan Daily* website is where you'll find my utmost appreciation and love for cinema.`,
        linkText: 'Read the archive ↗',
        linkHref: 'https://www.michigandaily.com/author/nshimon/',
    },
]

export default function BSidePage() {
    return (
        <main className={styles.page}>
            <PageTitle eyebrow="The B-Side" title="Arts & Etc." />

            <div className={styles.masthead}>
                {/* <span className={styles.byline}>By Natasha Wynne Shimon</span> */}
                <p className={styles.tagline}>Outside of building things, I spend a lot of time cooking Indonesian foods, traveling wherever I can, crocheting birthday presents and playing my guitar. Loving the arts has been a crucial part of who I am for as long as I remember, and in parallel, it shapes the same instincts I use when I think about product and code.</p>
            </div>

            <div className={styles.identityStrip}>
                {identityTiles.map((tile, i) => (
                    <div
                        key={i}
                        className={styles.identityTile}
                        style={{ '--tile-rot': `${tile.rotation}deg` } as CSSProperties}
                    >
                        <div
                            className={`${styles.identityFrame} ${tile.frameStyle === 'dark' ? styles.identityFrameDark : styles.identityFrameLight}`}
                        >
                            {tile.image && (
                                <Image
                                    src={tile.image.src}
                                    alt={tile.image.alt}
                                    fill
                                    sizes="(min-width: 1024px) 160px, 45vw"
                                    style={{ objectFit: 'cover' }}
                                />
                            )}
                        </div>
                        <span className={styles.identityCaption}>{tile.caption}</span>
                    </div>
                ))}
            </div>

            <MusicWritingColumns columns={musicWritingColumns} />
        </main>
    )
}
