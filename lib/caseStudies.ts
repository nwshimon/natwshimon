export type ContentBlock =
    | { type: 'paragraph'; content: string }
    | { type: 'image'; src: string; alt: string; caption?: string }

export interface CaseStudy {
    slug: string
    title: string
    dek: string
    issueNumber: number
    category: string
    dateRange: string
    heroType: 'device-frame' | 'plain' | 'none'
    heroImage: string | null
    problem: string
    role: string
    body: ContentBlock[]
    externalLink: string
    externalLinkLabel: string
}

export const caseStudies: CaseStudy[] = [
    {
        slug: 'm-genie',
        title: 'M-Genie',
        dek: 'A full-stack AI assistant that streamlines maintenance request workflows for University of Michigan facilities staff — from natural-language intake to auto-dispatched work orders.',
        issueNumber: 1,
        category: 'Full-Stack & UX Design',
        dateRange: '2026',
        heroType: 'device-frame',
        heroImage: '/photos/mgenie.avif',
        problem:
            'Facilities staff were spending hours each week parsing and manually triaging emailed maintenance requests — a process prone to delay, miscategorisation, and duplicate tickets.',
        role: 'Lead designer and full-stack developer. Responsible for user research, information architecture, UI design, and React/Next.js implementation.',
        body: [
            // TODO: Add opening context paragraph — describe the facilities management setting and why the email-based intake process was breaking down
            {
                type: 'paragraph',
                content:
                    'University of Michigan facilities teams receive hundreds of maintenance requests each week through a fragmented mix of email threads and phone calls. Before M-Genie, a coordinator had to read each message, interpret the problem, identify the right trade team, and manually create a work order in a legacy system — a loop that introduced delays, duplicate tickets, and frequent miscategorisation.',
            },
            // TODO: Add paragraph describing the discovery/research phase — user interviews, shadowing sessions, pain points surfaced
            {
                type: 'paragraph',
                content:
                    '// TODO: Describe the research phase — how many staff were interviewed, what shadowing revealed about the intake workflow, and which failure modes were most costly.',
            },
            // TODO: Insert audit screenshot here once available
            // { type: 'image', src: '/photos/mgenie-flow.png', alt: 'M-Genie intake flow diagram', caption: 'Early-stage flow diagram mapping the existing triage process' },
            {
                type: 'paragraph',
                content:
                    'M-Genie processes incoming requests through a natural-language pipeline: the system reads the message, classifies the issue type, extracts location and urgency signals, and surfaces a draft work order for staff review. In internal testing the parser scanned over 2,818 archived request files and correctly categorised them at a rate that would have saved the team an estimated two hours of manual triage per day.',
            },
            // TODO: Add paragraph on the Clean Up Suggestions UI feature — what it does, how staff interact with it, any usability testing results
            {
                type: 'paragraph',
                content:
                    '// TODO: Describe the Clean Up Suggestions UI — how it surfaces ambiguous requests to staff for one-click resolution, and how that design decision reduced cognitive load compared to the prior free-text triage screen.',
            },
            // TODO: Add a paragraph on outcomes / what changed after deployment or pilot
            {
                type: 'paragraph',
                content:
                    '// TODO: Outcomes paragraph — pilot results, staff feedback, any measurable reduction in triage time or error rate.',
            },
        ],
        externalLink: 'https://github.com/natwshimon/m-genie',
        externalLinkLabel: 'View on GitHub',
    },
    {
        slug: 'm-lead',
        title: 'M-LEAD',
        dek: 'An accessibility audit and remediation effort improving site navigability for 1,000+ students across the University of Michigan leadership development platform.',
        issueNumber: 2,
        category: 'Accessibility / UX Research',
        dateRange: '2023',
        heroType: 'plain',
        heroImage: '/photos/mlead.png',
        problem:
            'The M-LEAD portal — used by over a thousand U-M students to track leadership milestones — had never undergone a formal accessibility review, leaving screen-reader users and keyboard navigators unable to complete core flows.',
        role: 'Sole accessibility auditor and UX researcher. Conducted WCAG 2.1 AA evaluation, produced a prioritised remediation report, and collaborated with the dev team on implementation.',
        body: [
            // TODO: Add context paragraph — what M-LEAD is, who uses it, why accessibility mattered here
            {
                type: 'paragraph',
                content:
                    'M-LEAD is the University of Michigan\'s online platform for tracking and validating student leadership development. More than a thousand students across campus log milestones, request verifications, and document co-curricular experiences through the portal each semester. Despite its broad reach, the site had never been evaluated against any accessibility standard before this project began.',
            },
            // TODO: Add paragraph describing methodology — axe DevTools scan, NVDA + VoiceOver manual passes, keyboard-only navigation
            {
                type: 'paragraph',
                content:
                    '// TODO: Methodology paragraph — describe the three-pass audit structure: automated scan with axe DevTools, manual keyboard-only navigation run, and assistive-technology testing with NVDA on Windows and VoiceOver on macOS. Note any scope constraints (pages audited, flows prioritised).',
            },
            // TODO: Insert axe DevTools screenshot once available
            // { type: 'image', src: '/photos/mlead-axe-scan.png', alt: 'axe DevTools scan results for the M-LEAD dashboard page', caption: 'Automated scan output — axe DevTools flagged 34 violations on the dashboard alone' },
            {
                type: 'paragraph',
                content:
                    '// TODO: Findings summary paragraph — headline numbers from the audit (violations by severity, WCAG criteria failed), and which user flows were most affected. Pull from the remediation report once available.',
            },
            // TODO: Insert screenshot of the remediation report or prioritisation matrix
            // { type: 'image', src: '/photos/mlead-report.png', alt: 'Page from the M-LEAD accessibility remediation report', caption: 'Excerpt from the prioritised remediation report delivered to the dev team' },
            {
                type: 'paragraph',
                content:
                    '// TODO: Remediation paragraph — describe the prioritised fix list, how issues were ranked (impact × effort), and which items the dev team addressed during the collaboration period.',
            },
            // TODO: Add closing paragraph on outcomes or what this project changed
            {
                type: 'paragraph',
                content:
                    '// TODO: Outcomes paragraph — what shipped, what was deferred, and what this project demonstrated about building accessibility reviews into product cycles earlier.',
            },
        ],
        externalLink: 'https://github.com/natwshimon/m-lead',
        externalLinkLabel: 'View on GitHub',
    },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
    return caseStudies.find((cs) => cs.slug === slug)
}
