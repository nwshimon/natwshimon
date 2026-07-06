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
    // {
    //     href: 'https://github.com/natwshimon/knitpicker',
    //     dateRange: '2026',
    //     category: 'Software',
    //     imageSrc: '/photos/knitpicker.avif',
    //     imageAlt: 'Knitpicker CLI tool interface',
    //     title: 'Knitpicker',
    //     description: 'A CLI that catches mistakes in knitting patterns before you pick up your needles.',
    //     external: true,
    // },
    {
        href: 'https://mlead.umich.edu/',
        dateRange: '2025 - 2026',
        category: 'Web Dev',
        imageSrc: '/photos/mlead.png',
        imageAlt: 'M-Lead website homepage, showing a big header saying "Where leadership is learned" over an image of a smiling woman in helmet',
        title: 'M-Lead',
        description: "Since May 2025, I've been a web developer for the University of Michigan's leadership hub, M-Lead. Using WordPress and Pantheon WebOps, I maintain and enhance the M-Lead site.",
        external: false,
    },
    {
        href: 'https://github.com/nwshimon/si338-final-proj',
        dateRange: '2026',
        category: 'Accessibility',
        imageSrc: '/photos/xc-design.avif',
        imageAlt: 'Cross-Country Team website homepage, colored sky-blue with the Ann Arbor Skyline Cross Country logo on the top left',
        title: 'Cross-Country Team Website',
        description: "A website redesign for a highschool cross-country client, Skyline. Also, among my first attempts at an accessibility-focused site!",
        external: true,
    },
    {
        href: 'https://github.com/nwshimon/knit-picker',
        dateRange: '2025',
        category: 'AI / ML',
        imageSrc: '/photos/knitpicker.avif',
        imageAlt: 'A screenshot of a pixellated mountain scenery, proving the 2D grid tapestry crochet pattern generator works',
        title: 'Knitpicker',
        description: `A crochet 2D grid pattern generator, for all levels. As an avid crocheter myself, I wanted to get into tapestry crochet, but didn't know where to start... so to procrastinate, I made this instead.`,
        external: true,
    },
    {
        href: 'https://docs.google.com/presentation/d/1OQGAz7rHr_edOwbGtzPsm30isOf5fxEPHiEf91mYvHA/edit?usp=sharing',
        dateRange: '2025',
        category: 'Data',
        imageSrc: '/photos/datathon-2025.png',
        imageAlt: 'Green card approval trend scatterplot',
        title: 'Green Card Data Analysis',
        description: 'For the U-M Datathon 2025, my team and I conducted an exploratory analysis of USCIS approval trends across green card categories, and built our argument around a possible solution and its ethics.',
        external: false,
    },
    {
        href: 'https://www.figma.com/proto/H7QaPw1XYeEvMthXrLhPTr/Cleanify-Mock-Up?node-id=0-1&t=aOeOaqdWdLAgOBjg-1',
        dateRange: '2024',
        category: 'UX Design',
        imageSrc: '/photos/cleanify-greencart.avif',
        imageAlt: 'Mockups of the Cleanify and Greencart app screens',
        title: 'Cleanify & Greencart',
        description: 'For a consulting client, I redesigned paired apps that gamify eco-friendly shopping and household waste reduction through blockchain incentives.',
        external: false,
    },
]
