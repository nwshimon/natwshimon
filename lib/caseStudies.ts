import type { MetaCard } from '@/components/CaseStudy/MetaCards'
import type { Cause } from '@/components/CaseStudy/TwoColumnCauses'
import type { RevealTileData } from '@/components/CaseStudy/RevealTile'
import type { CompareCard, CompareCriterion } from '@/components/CaseStudy/CompareContrast'
import type { OutcomeEntry } from '@/components/CaseStudy/OutcomeGallery'
import type { AccordionColumnData } from '@/components/CaseStudy/AccordionColumns'

export type { RevealTileData, CompareCard, CompareCriterion, OutcomeEntry, AccordionColumnData }

export type SideItem =
    | { type: 'callout'; content: string }
    | { type: 'image'; src: string; alt: string; caption?: string }

export interface PhaseMediaImage {
    src: string
    alt: string
    caption: string
}

export interface PhotoStackImage {
    src: string
    alt: string
}

export interface PhotoStackGroup {
    label: string
    photos: PhotoStackImage[]
}

export type TimelineBlock =
    | { type: 'paragraph'; content: string }
    | { type: 'bullets'; items: string[] }
    | { type: 'media'; images: PhaseMediaImage[]; layout?: 'column' | 'gallery' }

export interface TimelinePhaseData {
    eyebrow: string
    title: string
    blocks: TimelineBlock[]
    filled?: boolean
    isLast?: boolean
}

export type ContentBlock =
    | { type: 'section'; title: string; label?: string }
    | { type: 'subsection'; title: string }
    | { type: 'paragraph'; content: string; calloutAbove?: string; image?: { src: string; alt: string; caption?: string; position: 'left' | 'right' }; sideColumn?: { position: 'left' | 'right'; items: SideItem[] } }
    | { type: 'twoParagraphs'; left: string; right: string }
    | { type: 'proseCallout'; prose: string; callout: string; calloutPosition?: 'left' | 'right' }
    | { type: 'callout'; content: string; variant?: 'default' | 'centered'; image?: { src: string; alt: string; caption?: string; position: 'left' | 'right' } }
    | { type: 'bullets'; items: string[] }
    | { type: 'bulletsWithPhotoStack'; items: string[]; photoStacks: PhotoStackGroup[] }
    | { type: 'causes'; items: Cause[] }
    | { type: 'image'; src: string; alt: string; caption?: string }
    | { type: 'timelineGroup'; phases: TimelinePhaseData[] }
    | { type: 'revealTiles'; tiles: RevealTileData[] }
    | { type: 'compareContrast'; left: CompareCard; right: CompareCard; criteria: CompareCriterion[] }
    | { type: 'outcomeGallery'; entries: OutcomeEntry[] }
    | { type: 'accordionColumns'; columns: AccordionColumnData[] }

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
            // ── BACKGROUND ──────────────────────────────────────────────────────
            { type: 'section', title: 'The Lede', label: 'An Overview' },
            // {
            //     type: 'callout',
            //     content: '',
            // },
            {
                type: 'paragraph',
                content: `Updating a few file permissions on Google Drive is simple. Managing them across thousands and thousands of files in a large workspace is not. Such is the reality of administrative procedures at almost every large institution — and the [University of Michigan](https://obp.umich.edu/wp-content/uploads/pubdata/factsfigures/facstaffsumm_umaa.pdf) is no exception.`,
            },
            { 
                type: 'callout', 
                variant: 'centered', 
                content: `Removing a single user from your Google Drive files shouldn't take days. ==At U-M's scale, it did.==`,
            },

            {
                type: 'paragraph',
                content: `I was officially brought on as a Frontend Developer, but my day-to-day responsibilities ultimately extended into product territory:`,
            },
            {
                type: 'bullets',
                items: [
                    '**UX design and wireframing:** Co-led the dashboard layout direction, owning the Figma wireframing and contributing to iterative design sessions with our CAEN sponsors.',
                    '**Engineering requirements:** Independently drafted the full engineering requirements document, synthesizing input across frontend, backend, and DevOps into a single reference the team built against.',
                    '**Technical coordination:** Ran regular check-ins with both subteams via GitHub Issues, tracking implementation progress and flagging integration dependencies before they became blockers.',
                    // '**Frontend development:** Implemented features including file filtering functionality and accessibility improvements.',
                    // `**Sponsor management:** Flagged potential scope creep early and facilitated weekly realignment between the team and sponsors' expectations. Coordinated with our mentor and sponsor for status updates and sign-offs on major design decisions.`,
                ],
            },

            // ── PROBLEM ─────────────────────────────────────────────────────────
            { type: 'section', title: 'In Brief', label: 'The Problem' },
            {
                type: 'paragraph',
                content: `For our sponsor, CAEN, the tedious file management problem surfaced in the form of a seemingly simple administrative task: **remove all permissions of a recently-retired senior staff member**, who had worked in the organization for 20+ years, from any and all files.`,
            },
            {
                type: 'paragraph',
                content: `Many of you are probably thinking: "It can't be *that* bad." This was certainly what I thought, too. Yet, when the team began their scavenger hunt of shared files, what they thought would be a boring couple of hours became **days and days of frustration**.`,
            },
            {
                type: 'paragraph',
                content: `Could this be attributed to the tens of thousands of files that a staff member inevitably accrues when they've been on the organization since its founding days? Perhaps. But this isn't an uncommon story for U-M by any means. U-M's [strong tenure](https://provost.umich.edu/resources-policies/faculty-resources/promotion-tenure-review/) for professors and long-term appointments of staff makes retirement events such as these a common occurrence.`,
            },
            {
                type: 'paragraph',
                content: `With this in mind, it becomes clear that the issue here is no longer about an edge case. Instead, it's a **debilitating pain point** in U-M employees' day-to-day workflow. The result is a process — tedious and repetitive, albeit necessary — that hinders them from carrying out their jobs more efficiently.`,
            },
            // {
            //     type: 'bullets',
            //     items: [
            //         '// TODO: Problem bullet 1 — scope/scale of the issue at U-M',
            //         '// TODO: Problem bullet 2 — frequency (not a one-off; U-M tenure culture means regular retirement events)',
            //         '// TODO: Problem bullet 3 — stakes (data privacy, file access control requirements)',
            //     ],
            // },

            // ── PROCESS ─────────────────────────────────────────────────────────
            { type: 'section', title: 'Field Notes', label: 'Our Process' },

            // Research
            {
                type: 'paragraph',
                content: `Our research of existing solutions and Google Drive's API documentation surfaced three compounding problems, each ruling out a different category of off-the-shelf fix:`,
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
                        body: `Tools like [BetterCloud](https://www.bettercloud.com/) or [GAT+](https://gatlabs.com/products/gat/) exist for workspace management, but deploying them at a public university means navigating a lengthy procurement process and, more importantly, **data privacy concerns.**`,
                    },
                ],
            },
            {
                type: 'proseCallout',
                callout: `Developing an in-house tool is the most logical choice for U-M's case.`,
                prose: `After discussing with current U-M staff, I mapped out a [user diagram workflow](https://medium.com/design-bootcamp/the-ultimate-guide-to-user-flow-diagram-b108d7de10d) to illustrate the average offboarding process that existing employees must conduct when a community member leaves.`,
                calloutPosition: `left`,
            },
            {
                type: 'image',
                src: '/photos/mgenie-before-after.png',
                alt: `User flow diagram comparing the Google Drive native UI and the ideal M-Genie workflow for staff offboarding. Left shows Drive's manual multi-step process; right shows M-Genie's streamlined flow with system-handled decisions.`,
                caption: 'A user flow diagram comparing the Google Drive native UI and the ideal solution on M-Genie',
            },

            // Implementation
            // { type: 'subsection', title: 'Implementation' },
            {
                type: 'callout',
                variant: 'centered',
                content: 'From there, I owned two decisions ==(and one unexpected detour)== that shaped what became the final product.' 
            },
            // {
            //     type: 'revealTiles',
            //     tiles: [
            //         {
            //             pillar: 'Empathy over assumption',
            //             title: 'Mapping the ideal user pathway',
            //             description: '// TODO: Nat to write — describe the user flow diagram work and what it revealed about the gap between Drive\'s actual UX and the ideal offboarding flow.',
            //             images: [
            //                 {
            //                     src: '/photos/wireframing1.png',
            //                     alt: 'User flow diagram comparing Google Drive native UI and the ideal M-Genie workflow for staff offboarding',
            //                     caption: 'User flow diagram — Google Drive native UI vs. M-Genie ideal workflow',
            //                 },
            //                 {
            //                     src: '/photos/wireframing2.png',
            //                     alt: 'Wireframe of the M-Genie dashboard layout, showing the file tree and permission details',
            //                     caption: 'Wireframe — M-Genie dashboard layout with file tree and permission details',
            //                 }
            //             ],
            //         },
            //         {
            //             pillar: 'Feasibility as design constraint',
            //             title: 'Scoping the API',
            //             description: '// TODO: Nat to write — describe the rate-limit research (60 files/min/user threshold) and how that ceiling shaped decisions about what the system could and could not automate.',
            //             images: [
            //                 {
            //                     src: '/photos/whiteboard1-phase1.png',
            //                     alt: 'Whiteboard session — early dashboard layout ideation',
            //                     caption: 'Whiteboard session — early dashboard layout ideation',
            //                 },
            //                 {
            //                     src: '/photos/whiteboard2-phase1.png',
            //                     alt: 'Whiteboard session — API constraints and performance requirements',
            //                     caption: 'Whiteboard session — API constraints and performance requirements',
            //                 },
            //                 {
            //                     src: '/photos/whiteboard3-phase1.png',
            //                     alt: 'Whiteboard session — offboarding flow and edge case mapping',
            //                     caption: 'Whiteboard session — offboarding flow and edge case mapping',
            //                 },
            //             ],
            //         },
            //     ],
            // },

            // Integration
            // { type: 'subsection', title: 'Integration' },
            {
                type: 'accordionColumns',
                columns: [
                    {
                        eyebrow: 'Decision 1',
                        title: 'Engineering Requirements',
                        content: `I drafted the engineering requirements. From the team's literature review, I built a comprehensive [requirements document](https://docs.google.com/spreadsheets/d/1E9EROx-AEpkINdS66mGNw0q7l1hOfCs6Heimi-I93uo/edit?usp=sharing), which became a living source of truth between sponsors and the engineering team.`,
                        bullets: [
                            'Calculating the API rate limits of the Google Drive API for the Functional Requirements (FR) surfaced **realistic constraints** on what the system could and could not automate, which shaped the final product scope.',
                            'I periodically **checked in with frontend, backend and DevOps** to ensure that the specifications outlined are SMART enough to be actionable by the end of the year.',
                            'After approval of requirements, I continuously **realigned expectations** with sponsors on system behavior and interface design.',
                        ],
                        images: [
                            {
                                src: '/photos/reqs1.png',
                                caption: 'Snippet of original Engineering Requirements document, pre-implementation.',
                                alt: 'A screenshot of the M-Genie Engineering Requirements in Google Docs with a version history.',
                            },
                            {
                                src: '/photos/reqs2.png',
                                caption: 'Updates to the Engineering Requirements document, post-implementation.',
                                alt: 'Updates to the Engineering Requirements document, in slide format.',
                            },
                        ],
                    },
                    {
                        eyebrow: 'Decision 2',
                        title: `Dashboard Design`,
                        content: `Optimizing user efficiency is M-Genie's whole thing. For this, I co-led the design of M-Genie's dashboard to be modeled after Google Drive's native UI.`,
                        bullets: [
                            `To reduce user onboarding friction as much as possible, our goal was to strike that balance between **familiarity** and **distinction**. We adopted Drive's classic table-view UI interface while also integrating the idea of an "Expanded View" to show more file metadata details.`,
                            `A design iteration session with sponsors prompted us to close a gap we had initially, which was the lack of **system feedback to users**. The "Files Loaded" progress bar and confirmation modal was added shortly after.`,
                            'View our [Figma prototype mock-up](https://www.figma.com/proto/DIsMAiUy1vYKvEEwToFMGa/UI-Wireframing-v1?node-id=0-1&t=FwWsKhDRGQPLoPz3-1) here!',
                        ],
                        images: [
                            {
                                src: '/photos/whiteboard1-phase1.png',
                                alt: 'A snapshot of a whiteboard session showing early dashboard layout ideation',
                                caption: 'Whiteboard session — early dashboard layout ideation in messy sprawls',
                            },
                            {
                                src: '/photos/wireframing1.png',
                                alt: 'Wireframe of the M-Genie user flow, from login to landing page to data overview',
                            },
                            {
                                src: '/photos/wireframing2.png',
                                alt: 'Wireframe of the M-Genie dashboard layout in Google File cleaner, showing file tree and table view',
                                caption: 'Wireframes shown to sponsors for feedback on the dashboard layout and file tree/table view, pre-Figma mockups'
                            },
                        ],
                    },
                ],
            },
            {
                type: 'paragraph',
                content: `By the midway point, two interfaces had been built in parallel. The first was a **backend testing build** generated by an AI model from our Figma wireframes; the second was a **production prototype** built by the frontend team. As the member most familiar with both the design and the requirements, I took it upon myself to integrate our two versions into a single, cohesive product.`,
            },
            {
                type: 'paragraph',
                content: `Below, you can find my compare-and-contrast analysis of the two builds, and the tradeoffs I had to consider when prioritizing features from each version.`,
            },
            {
                type: 'compareContrast',
                left: {
                    src: '/photos/mgenie-ai-build.png',
                    alt: 'Screenshot of the AI-generated backend testing build',
                    primaryLabel: 'Backend testing build',
                    secondaryLabel: 'AI-generated from team Figma wireframes for backend testing purposes.',
                },
                right: {
                    src: '/photos/mgenie-frontend-build.png',
                    alt: 'Screenshot of the production frontend built and merged by the team',
                    primaryLabel: 'Frontend production build',
                    secondaryLabel: 'Built by the frontend team',
                },
                criteria: [
                    {
                        key: 'accessibility',
                        label: 'Accessibility',
                        leftPass: false,
                        rightPass: true,
                        explanation: `AI-generated frontends usually default to overusing ARIA labels, skip mobile-first interaction entirely, and lean on color alone to distinguish elements. Meanwhile, the production build had the appropriate alt text and semantic structure in mind. Having taken UX classes, I flagged these misalignments early and made sure to prioritize accessibility alongside aesthetic features.`,
                    },
                    {
                        key: 'component-ownership',
                        label: 'Component Ownership',
                        leftPass: false,
                        rightPass: true,
                        explanation: `Since this is a two-scope, year-long project, maintainability and extensibility of our code is of utmost importance. No one on the team could tell where a given component or TypeScript file lived in the AI-generated build; the AI's conception of the codebase had drifted far from what the frontend team had already envisioned and planned for.`,
                    },
                    {
                        key: 'time-to-ship',
                        label: 'Time to Ship',
                        leftPass: true,
                        rightPass: false,
                        explanation: `The AI-generated build was already wired to backend endpoints and would have gotten a deliverable out the door fastest. The production build was developed independently of the system it would eventually plug into, which cost time up front.`,
                    },
                    {
                        key: 'brand-fit',
                        label: 'Brand Fit',
                        leftPass: false,
                        rightPass: true,
                        explanation: `The AI-generated build was more polished at first glance but had none of the U-M-specific identity the product needed to actually feel like it belonged to the university. The production build was slower to look "finished," but it incorporated more elements of the original design the sponsor and engineering team had agreed on.`,
                    },
                    {
                        key: 'feature-discovery',
                        label: 'Feature Discovery',
                        leftPass: true,
                        rightPass: false,
                        explanation: `The AI-generated build surfaced a feature nobody had planned, which was the automated cleanup suggestions. The backend team had wired up the appropriate API endpoints to execute the actions and the functionality had been seamless. I made sure to include this in the merge, which became one of the most differentiating features of M-Genie's file cleaner.`,
                    },
                ],
            },

            // ── OUTCOME ─────────────────────────────────────────────────────────
            { type: 'section', title: 'In Print', label: 'What Shipped' },
            {
                type: 'paragraph',
                content: `The result: a fully integrated, production-ready M-Genie web application that is, as of Summer 2026, deployed and handed off to CAEN for usability testing. The following is a snapshot of the shipped product, with a few feature breakdowns and their use cases.`,
            },
            {
                type: 'outcomeGallery',
                entries: [
                    {
                        kind: 'simple',
                        images: [
                            {
                                src: '/photos/mgenie-integrated1.png',
                                alt: 'M-Genie File Cleaner — Old Files view with two stale files selected, showing the Delete, Edit Permission, and Move bulk-action bar',
                                caption: `The final dashboard layout`,
                            },
                            {
                                src: '/photos/mgenie-integrated2.png',
                                alt: 'M-Genie File Cleaner — Duplicate Files view with the Clean Up menu open, showing Smart Suggestions, Duplicate Files, and Old Files categories',
                                caption: `The "Clean Up" dropdown menu`,
                            },
                        ],
                    },
                ],
            },
            {
                type: 'paragraph',
                content: `For the final product, we landed on a merge between the two builds:`,
            },
            {
                type: 'bullets',
                items: [
                    `The overall dashboard layout (left) follows our Figma wireframes and production build where it features a **"Navigation" / "Filter" left sidebar** and a **file table view** for the main content. Upon selecting a file, a bulk action bar appears at the bottom, allowing users to delete, edit permissions, or move files.`,
                    `Above the main table view is a **"Clean Up" menu**, which is a feature surfaced by the AI-generated build. It allows users to quickly filter files by three categories: Smart Suggestions, Duplicate Files, and Old Files. The "Smart Suggestions" category is powered by a custom algorithm that flags files for review based on their last modified date, size, and other metadata.`,
                    `A notable merged feature is also the the two **filtering methods** that exist. The "Filters" option on the left sidebar is a more traditional filter that applies to the entire file tree, while the pill-shaped filters above the table view are quick filters that apply to the current view. This distinction allows users to quickly narrow down their file list without losing the content of their current view.`,
                ],
            },
            {
                type: 'outcomeGallery',
                entries: [
                    {
                        kind: 'sequence',
                        eyebrow: 'Manage Permissions',
                        heading: `Remove someone's access (regardless of permission inheritance)`,
                        rows: [
                            {
                                label: 'SINGLE-FILE FLOW',
                                actionLabel: 'permissions.delete() via Drive API',
                                steps: [
                                    {
                                        src: '/photos/mgenie-perm-single1.png',
                                        alt: 'Manage Permissions panel open for one file, an editor selected for removal with a Remove confirmation prompt',
                                        caption: 'One-file permissions panel, with an editor flagged for removal and a Yes/No confirmation prompt',
                                    },
                                    {
                                        src: '/photos/mgenie-perm-single2.png',
                                        alt: 'Activity log confirming access was restricted for the removed editor',
                                        caption: 'Activity log on Drive native UI confirming editor was removed from the file.',
                                    },
                                ],
                            },
                            {
                                label: 'BULK-FILE FLOW',
                                actionLabel: 'permissions.delete() × 3 files',
                                steps: [
                                    {
                                        src: '/photos/mgenie-perm-bulk1.jpg',
                                        alt: 'Manage Permissions panel in Bulk mode with three files selected, showing one shared list of collaborators',
                                        caption: 'Bulk-file permissions panel for 3 files, with a confirmation modal to remove one user from all.',
                                    },
                                    {
                                        src: '/photos/mgenie-perm-bulk2.jpg',
                                        alt: 'Activity log confirming access was restricted across the selected files',
                                        caption: 'Update log on execution of removal; 1 file marked as succeeded, 2 files marked as failed because user was never given access',
                                    },
                                ],
                            },
                        ],
                        explanation: [
                            `One of the very first catalysts of this project, the "Manage Permissions" feature is our answer to the messy, tedious permissions management flow in the Google Drive native UI. M-Genie abstracts users' complicated permission roles into 3 simple clicks: select the files, input the target collaborator, and then hit "Remove," prompting M-Genie to remove the collaborator's access across the selected files regardless of inheritance through Google Drive's [permissions.delete()](https://developers.google.com/workspace/drive/api/reference/rest/v3/permissions/delete) method. Alternatively, the user could also manage collaborators' permissions per file, updating their access level or removing them entirely.`,
                            `Post-action user feedback is then immediately surfaced on the UI, logging each action's success or failure.`,
                        ],
                    },
                    {
                        kind: 'sequence',
                        eyebrow: 'Delete Files',
                        heading: 'Navigate with full autonomy and informed decisions',
                        rows: [
                            {
                                actionLabel: 'files.delete()',
                                steps: [
                                    {
                                        src: '/photos/mgenie-delete2.png',
                                        alt: 'Activity log confirming a flagged file was moved to the trash',
                                        caption: 'An "Are you sure?" confirmation prompt appears before any deletion action.',
                                    },
                                    {
                                        src: '/photos/mgenie-delete3.png',
                                        alt: 'Move to Trash confirmation modal for the selected files',
                                        caption: 'Activity log on native UI confirming that file has been moved to Trash.',
                                    },
                                ],
                            },
                        ],
                        explanation: `The need for M-Genie stems from user data protection and privacy. Needless to say, being transparent about M-Genie's authority behind the scenes is crucial to keeping user trust. Most actions that users take within the system are padded with a pre- and post-confirmation modal to ensure transparency first and foremost, and all results after system execution are logged immediately on the UI for visibility and stored within the account history for future reference. This is especially important as an in-app "Undo" rollback feature is explicitly set out of scope.`,
                    },
                ],
            },

            // ── REFLECTIONS ─────────────────────────────────────────────────────
            { type: 'section', title: 'Postscript', label: 'Reflections & Takeaways' },
            {
                type: 'paragraph',
                content: 'Although M-Genie as a project has yet to be fully completed, the first semester had already yielded a number of lessons learned that I will be sure to carry forward into future projects and even in my daily collaboration work.',
            },
            {
                type: 'bullets',
                items: [
                    '**Convergence, not parallel work.** Our team was split into two with the intention of eventual integration; however, we kept pushing off our merge that we eventually built two working versions of the same product, and merging the two became its own project, which is the exact failure mode that [continuous integration](https://www.atlassian.com/continuous-delivery/continuous-integration) exists to prevent. The "divide and conquer" method should be anchored around a specified convergence point, rather than delayed or pushed back.',
                    '**Accessibility as a design foundation.** More than [90%](https://www.deque.com/axe-con/sessions/accessibility-at-an-inflection-point-regulation-ai-agents-and-what-comes-next/) of public web pages and mobile apps fail to adhere to WCAG 2.0 standards. When AI is trained on such error-prone data, it comes as no surprise that AI-generated frontend builds almost always come with accessibility issues. We built M-Genie with accessibility as a design constraint, which makes post-build remediation seamless and efficient rather than a costly and time-consuming afterthought.',
                    `**Proactive communication is key.** While GitHub's CI/CD pipeline is not hard to learn, the amount of effort needed for cross-team coordination is. This usually includes communicating clearly about what's in a pull request, when it's ready to merge, and who needs to weigh in before it does. The tooling's effectiveness only goes as far as your team's communication skills are.`,
                    `**Keep the ceiling low so the floor holds.** Being deliberate about requirements meant being honest about what the MVP actually needed to do, and resisting the pull to promise more than that. Our sponsors' technical background really helped as they kept the goal explicit throughout the project, steering clear of any scope creep and keeping us on track with the timeline.`,
                ]
            }
        ],
        externalLink: 'https://mgenie.engin.umich.edu/login',
        externalLinkLabel: 'View the App',
    },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
    return caseStudies.find((cs) => cs.slug === slug)
}
