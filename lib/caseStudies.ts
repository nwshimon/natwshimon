import type { MetaCard } from '@/components/CaseStudy/MetaCards'
import type { Cause } from '@/components/CaseStudy/TwoColumnCauses'

export type SideItem =
    | { type: 'callout'; content: string }
    | { type: 'image'; src: string; alt: string; caption?: string }

export type ContentBlock =
    | { type: 'section'; title: string }
    | { type: 'paragraph'; content: string; calloutAbove?: string; image?: { src: string; alt: string; caption?: string; position: 'left' | 'right' }; sideColumn?: { position: 'left' | 'right'; items: SideItem[] } }
    | { type: 'callout'; content: string; image?: { src: string; alt: string; caption?: string; position: 'left' | 'right' } }
    | { type: 'bullets'; items: string[] }
    | { type: 'causes'; items: Cause[] }
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
    heroLink?: string | null
    addressBarText?: string | null
    heroSubtitle?: string | null
    metaCards: MetaCard[][]
    body: ContentBlock[]
    externalLink: string
    externalLinkLabel: string
}

export const caseStudies: CaseStudy[] = [
    {
        slug: 'm-genie',
        title: 'M-Genie',
        dek: `To many, Google Workspace is a productivity tool. To large organizations like University of Michigan, it's the only thing standing between a functioning institution and total administrative chaos.`,
        issueNumber: 1,
        category: 'Full-Stack & UX Design',
        dateRange: '2026',
        heroType: 'device-frame',
        heroImage: '/photos/mgenie-mockup.png',
        heroLink: 'https://mgenie.engin.umich.edu/login',
        addressBarText: 'm-genie.engin.umich.edu – Only accessible through valid U-M account',
        heroSubtitle: `M-Genie is an in-house web application that lets U-M Google users manage file permissions and execute bulk actions, built to address both the friction of native Drive workflows and the university's data privacy requirements.`,
        metaCards: [
            [
                {
                    label: 'My Role',
                    value: 'Frontend Dev + product contributions',
                    detail:
                        'Officially a Frontend Developer, with day-to-day responsibilities extending into UX design, requirements synthesis, and cross-team coordination.'
                },
                {
                    label: 'Our Sponsor',
                    value: 'U-M CAEN',
                    detail:
                        'The U-M [Engineering and IT Services hub](https://caen.engin.umich.edu/) of the University of Michigan is our client and holds final decision-making authority on features.'
                }
            ],
            [
                {
                    label: 'The Timeline',
                    value: 'Jan 2026 – Dec 2026',
                    detail:
                        'A year-long [MDP](https://mdp.engin.umich.edu/) project across two semesters, each scoped to a distinct feature set under the same platform and architecture.'
                },
                {
                    label: 'Tech Stack',
                    value: 'React, FastAPI, AWS',
                    detail:
                        'React frontend. FastAPI Python backend. AWS App Runner for deployment. GitHub for version control and CI-CD workflows.'
                }
            ],
            [
                {
                    label: 'The Team',
                    value: '7 engineers',
                    detail:
                        '4 frontend developers and 3 backend engineers across undergraduate and graduate levels, coordinated across two subteams.'
                },
                {
                    label: 'Current Status',
                    value: 'Deployed & In Development',
                    detail:
                        'Core functionality working and live. Integration polish and the Out-of-Office Manager scope continuing into fall semester.'
                }
            ]
        ],
        body: [
            { type: 'section', title: 'Problem' },
            {
                type: 'paragraph',
                content:
                    `While updating a few file permissions is simple, managing them across an entire university workspace, at the scale of thousands of files per departing employee, is not. For CAEN, this came to a head when offboarding a senior staff member of 20+ years. What *should* have taken a few hours stretched into days of manual file hunting.`,
            },
            {
                type: 'paragraph',
                content:
                    `Could this be attributed to the tens of thousands of files that a staff member inevitably accrues when they've been on the organization since its founding days? Perhaps. But this isn't an uncommon story for U-M by any means. U-M, a public school known for its [strong tenure](https://provost.umich.edu/resources-policies/faculty-resources/promotion-tenure-review/) for professors and long-term staff appointments, regularly encounters retirement events such as these.`,
            },
            {  
                type: 'paragraph',
                content:
                    `Our research of existing solutions and Google Drive's API documents surfaced the following problems:`,
            },
            {
                type: 'causes',
                items: [
                    {
                        label: 'The interface',
                        statement: 'The Drive native UI offloads its system complexity onto the user.',
                        body: `[Permissions](https://developers.google.com/workspace/drive/api/guides/manage-sharing) can be direct or inherited from a parent folder, and the two behave differently in the interface. Controls that work on one file are greyed out on another with no clear reason why. **Every judgment call** falls back on the person doing the cleanup.`,
                    },
                    {
                        label: 'The API',
                        statement: "Google's own API offers no shortcut.",
                        body: `There is [no bulk permissions endpoint.](https://developers.google.com/workspace/drive/api/guides/manage-sharing) **Every removal requires a separate API call** per file, per user — which makes scripted workarounds unsustainable at the scale of a large organization's shared workspace.`,
                    },
                    {
                        label: 'Third-party tools',
                        statement: 'External tools trade one friction for another.',
                        body: `Tools like [BetterCloud](https://www.bettercloud.com/) or [GAT+](https://gatlabs.com/products/gat/) exist for workspace management, but deploying them at a public university means navigating a lengthy procurement and data privacy review.`,
                    },
                ],
            },
            // {
            //     type: 'paragraph',
            //     content: `In designing M-Genie, we asked ourselves: How do we make sure that our system handles most of the repetitive, tedious work? What do we want our users to control, and what would our users want to delegate to the system?`,
            //     calloutAbove: `Developing an in-house tool is the most logical choice for U-M's case.`,
            //     sideColumn: {
            //         position: 'right',
            //         items: [
            //             {
            //                 type: 'image',
            //                 src: '/photos/mgenie-before-after.png',
            //                 alt: 'Google Drive permissions management, before and after triage flow comparison',
            //                 caption: 'Left: Google Drive Native user workflow. Right: M-Genie user workflow.',
            //             },
            //         ],
            //     },
            // },
            { 
                type: 'paragraph',
                content: `All things considered, developing an in-house tool is the most logical choice for U-M's case. After discussing with current U-M staff, I mapped out a [user diagram workflow](https://medium.com/design-bootcamp/the-ultimate-guide-to-user-flow-diagram-b108d7de10d) to illustrate the average offboarding process that existing employees must conduct when a community member leaves.`,
            },
            {
                type: 'image',
                src: '/photos/mgenie-before-after.png',
                alt: `Using staff offboarding as an example, this is a user flow diagram comparing how users use Google Drive versus M-Genie to update others' permissions on their files. Left is the user flow on Google Drive's UI, with the direct vs. inherited permissions decision node split into more nodes to indicate more user manual interaction. Right is the M-Genie ideal user flow, with a clean even split between direct vs. inherited permissions indicating heavier offloading to the system.`,
                caption: 'A user flow diagram comparing the Google Drive native UI and the ideal solution on M-Genie',
            },
            // {
            //     type: 'paragraph',
            //     content: `Therefore, developing an in-house tool is the most logical choice for U-M, and an initiative naturally spearheaded by CAEN as the Engineering School's IT department. In designing M-Genie, we asked ourselves: How do we make sure that our system handles most of the repetitive, tedious work? What do we want our users to control, and what would our users want to delegate to the system? Below is a user flow diagram illustrating our proposed solution and the ideal process, before and after M-Genie.`,
            // },
            { type: 'section', title: 'Role' },
            {
                type: 'paragraph',
                content:
                    `Though officially brought on as a Frontend Developer, my day-to-day responsibilities extended into product territory. My contributions spanned both sides of the project:`,
            },
            {
                type: 'bullets',
                items: [
                    '**UX design and wireframing:** I co-led the dashboard layout direction with my co-PM, owning the Figma wireframing and contributing to iterative design sessions with our CAEN sponsors.',
                    '**Engineering requirements:** Independently, I drafted the full engineering requirements document, synthesizing input across frontend, backend, and DevOps into a single reference the team built against.',
                    '**Technical coordination:** I ran regular check-ins with both subteams via GitHub Issues, tracking implementation progress and flagging integration dependencies before they became blockers.',
                    '**Frontend development:** Contributed directly as a developer, implementing features including the file filtering functionality as well as accessibility features.',
                    `**Sponsor management:** During sprint meetings, I flagged potential scope creep early and facilitated weekly realignment between the team and sponsors' expectations. I regularly coordinated with our mentor and sponsor for status updates and sign-offs on major design decisions.`,
                ],
            },
            { type: 'section', title: 'Process' },
            {
                type: 'paragraph',
                content:
                    '// TODO: Describe the research phase — how many staff were interviewed, what shadowing revealed about the intake workflow, and which failure modes were most costly.',
            },
            {
                type: 'paragraph',
                content:
                    '// TODO: Describe the Clean Up Suggestions UI — how it surfaces ambiguous requests to staff for one-click resolution, and how that design decision reduced cognitive load compared to the prior free-text triage screen.',
            },

            { type: 'section', title: 'Outcome' },
            {
                type: 'paragraph',
                content:
                    '// TODO: Outcomes paragraph — pilot results, staff feedback, any measurable reduction in triage time or error rate.',
            },
            {
                type: 'paragraph',
                content:
                    'M-Genie processes incoming requests through a natural-language pipeline: the system reads the message, classifies the issue type, extracts location and urgency signals, and surfaces a draft work order for staff review. In internal testing the parser scanned over 2,818 archived request files and correctly categorised them at a rate that would have saved the team an estimated two hours of manual triage per day.',
            },

            { type: 'section', title: 'Reflections' },
            {
                type: 'paragraph',
                content:
                    '// TODO: Reflections — what you would do differently, what this project taught you about building for institutional users, and what the limits of NLP-based triage revealed.',
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
        metaCards: [
            [
                {
                    label: 'Role',
                    value: 'Accessibility Auditor · UX Researcher',
                    detail: 'Sole auditor. Conducted the full WCAG 2.1 AA evaluation, produced the prioritised remediation report, and collaborated with the dev team on fixes.'
                }
            ],
            [
                {
                    label: 'Timeline',
                    value: '2023',
                    detail: 'Single-semester project conducted during the Winter 2023 term.'
                }
            ],
            [
                {
                    label: 'Scope',
                    value: '1,000+ students affected',
                    detail: 'The M-LEAD portal serves over a thousand U-M students each semester for tracking leadership milestones and co-curricular experiences.'
                }
            ]
        ],
        body: [
            { type: 'section', title: 'Overview' },
            {
                type: 'paragraph',
                content:
                    `M-LEAD is the University of Michigan's online platform for tracking and validating student leadership development. More than a thousand students across campus log milestones, request verifications, and document co-curricular experiences through the portal each semester. Despite its broad reach, the site had never been evaluated against any accessibility standard before this project began.`,
            },

            { type: 'section', title: 'Problem' },
            {
                type: 'paragraph',
                content:
                    'The M-LEAD portal — used by over a thousand U-M students to track leadership milestones — had never undergone a formal accessibility review, leaving screen-reader users and keyboard navigators unable to complete core flows.',
            },

            { type: 'section', title: 'Role' },
            {
                type: 'paragraph',
                content:
                    'Sole accessibility auditor and UX researcher. Conducted WCAG 2.1 AA evaluation, produced a prioritised remediation report, and collaborated with the dev team on implementation.',
            },

            { type: 'section', title: 'Process' },
            {
                type: 'paragraph',
                content:
                    '// TODO: Methodology paragraph — describe the three-pass audit structure: automated scan with axe DevTools, manual keyboard-only navigation run, and assistive-technology testing with NVDA on Windows and VoiceOver on macOS. Note any scope constraints (pages audited, flows prioritised).',
            },
            {
                type: 'paragraph',
                content:
                    '// TODO: Findings summary paragraph — headline numbers from the audit (violations by severity, WCAG criteria failed), and which user flows were most affected. Pull from the remediation report once available.',
            },
            {
                type: 'paragraph',
                content:
                    '// TODO: Remediation paragraph — describe the prioritised fix list, how issues were ranked (impact × effort), and which items the dev team addressed during the collaboration period.',
            },

            { type: 'section', title: 'Outcome' },
            {
                type: 'paragraph',
                content:
                    '// TODO: Outcomes paragraph — what shipped, what was deferred, and what this project demonstrated about building accessibility reviews into product cycles earlier.',
            },

            { type: 'section', title: 'Reflections' },
            {
                type: 'paragraph',
                content:
                    '// TODO: Reflections — what this project taught you about institutional accessibility debt and how to make the case for proactive audits.',
            },
        ],
        externalLink: 'https://github.com/natwshimon/m-lead',
        externalLinkLabel: 'View on GitHub',
    },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
    return caseStudies.find((cs) => cs.slug === slug)
}
