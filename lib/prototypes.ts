export interface PrototypeProject {
    href: string
    dateRange: string
    category: string
    imageSrc: string
    imageAlt: string
    title: string
    description: string
    external?: boolean
}

export const prototypeProjects: PrototypeProject[] = [
    {
        href: 'https://github.com/natwshimon/knitpicker',
        dateRange: '2024',
        category: 'Software',
        imageSrc: '/photos/knitpicker.avif',
        imageAlt: 'Knitpicker CLI tool interface',
        title: 'Knitpicker',
        description: 'A CLI that catches mistakes in knitting patterns before you pick up your needles.',
        external: true,
    },
    {
        href: 'https://github.com/natwshimon/xc-website',
        dateRange: '2023',
        category: 'Software',
        imageSrc: '/photos/xc-design.avif',
        imageAlt: 'Cross-Country Team website homepage',
        title: 'Cross-Country Team Website',
        description: "Responsive site for U-M's club cross-country team — events, roster, and results.",
        external: true,
    },
    {
        href: 'https://github.com/natwshimon/cleanify',
        dateRange: '2022–23',
        category: 'Software',
        imageSrc: '/photos/cleanify-greencart.avif',
        imageAlt: 'Cleanify and Greencart app screens',
        title: 'Cleanify & Greencart',
        description: 'Paired apps that gamify eco-friendly shopping and household waste reduction.',
        external: true,
    },
    {
        href: 'https://github.com/natwshimon/dog-breed-mystery',
        dateRange: '2022',
        category: 'AI / ML',
        imageSrc: '/photos/dog-ml.avif',
        imageAlt: 'Dog Breed Mystery classification app',
        title: 'Dog Breed Mystery',
        description: 'Computer vision classifier that identifies dog breeds from uploaded photos.',
        external: true,
    },
    {
        href: 'https://github.com/natwshimon/green-card-analysis',
        dateRange: '2022',
        category: 'Data',
        imageSrc: '/photos/datathon-2025.png',
        imageAlt: 'Green card approval trend charts',
        title: 'Green Card Data Analysis',
        description: 'Exploratory analysis of USCIS approval trends across green card categories.',
        external: true,
    },
]
