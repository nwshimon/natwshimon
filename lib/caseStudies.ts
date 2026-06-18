export interface CaseStudy {
    slug: string
    title: string
    dek: string
    issueNumber: number
    category: string
    dateRange: string
    heroImage: string
    heroImageAlt: string
    problem: string
    role: string
    stack: string[]
    body: string
    externalLink?: string
    externalLinkLabel?: string
}

export const caseStudies: CaseStudy[] = [
    {
        slug: 'm-genie',
        title: 'M-Genie',
        dek: 'A full-stack AI assistant that streamlines maintenance request workflows for University of Michigan facilities staff — from natural-language intake to auto-dispatched work orders.',
        issueNumber: 1,
        category: 'AI / UX Design',
        dateRange: '2023–24',
        heroImage: '/photos/m-genie.png',
        heroImageAlt: 'Screenshot of M-Genie, a digital workspace for U-M facilities staff',
        problem:
            'Facilities staff were spending hours each week parsing and manually triaging emailed maintenance requests — a process prone to delay, miscategorisation, and duplicate tickets.',
        role: 'Lead designer and full-stack developer. Responsible for user research, information architecture, UI design, and React/Next.js implementation.',
        stack: ['Next.js', 'TypeScript', 'OpenAI API', 'PostgreSQL', 'Tailwind CSS'],
        body: '',
    },
    {
        slug: 'm-lead',
        title: 'M-LEAD',
        dek: 'An accessibility audit and remediation effort improving site navigability for 1,000+ students across the University of Michigan leadership development platform.',
        issueNumber: 2,
        category: 'Accessibility / UX Research',
        dateRange: '2023',
        heroImage: '/photos/m-lead.png',
        heroImageAlt: 'M-LEAD platform accessibility audit findings',
        problem:
            'The M-LEAD portal — used by over a thousand U-M students to track leadership milestones — had never undergone a formal accessibility review, leaving screen-reader users and keyboard navigators unable to complete core flows.',
        role: 'Sole accessibility auditor and UX researcher. Conducted WCAG 2.1 AA evaluation, produced a prioritised remediation report, and collaborated with the dev team on implementation.',
        stack: ['WCAG 2.1 AA', 'axe DevTools', 'NVDA', 'VoiceOver', 'Figma'],
        body: '',
    },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
    return caseStudies.find((cs) => cs.slug === slug)
}
