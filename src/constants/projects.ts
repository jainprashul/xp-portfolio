import { projects } from "@/assets/asset";

export type ProjectSection = {
    title: string;
    content: string | string[];
}

export type Project = {
    title: string;
    subtitle?: string;
    category?: 'Staff Systems' | 'Developer Tooling' | 'Product & SaaS' | 'Archive';
    tier?: 'featured' | 'flagship' | 'archive';
    company?: string;
    role?: string;
    duration: string;
    description: string;
    icon: string;
    image: string[];
    link?: string;
    github?: string;
    tags: string[];
    sections?: ProjectSection[];
}

export const Projects: Project[] = [
    {
        title: 'AI Assistant Platform & Architecture',
        category: 'Staff Systems',
        tier: 'featured',
        company: 'Highway9 Networks',
        role: 'Staff Engineer, R&D UX',
        subtitle: 'Enterprise AI assistant with principal auth, ACLs, and audit attribution',
        description: 'Modular AI Assistant architecture for a multi-tenant enterprise networking SaaS—JWT principal-based auth, ACL enablement, and via-assistant audit trails so operators can use AI safely inside production workflows.',
        icon: projects.highway9Logo,
        image: [],
        tags: ['TypeScript', 'React', 'Go', 'AI Systems', 'JWT/Auth', 'ACLs', 'Kubernetes'],
        duration: 'Ongoing · Highway9',
        sections: [
            {
                title: 'Problem Statement',
                content: 'Enabling safe, multi-tenant AI assistant interactions in an enterprise networking SaaS without security regressions or opaque execution.',
            },
            {
                title: 'Architecture & Security Model',
                content: [
                    'Modular packaging across environments (CSP/VMC)',
                    'JWT principal-based authentication for assistant actions',
                    'Granular ACL/role access control instead of global feature flags',
                    'Explicit viaAssistant audit logging for attribution',
                ],
            },
            {
                title: 'Key Impact',
                content: 'Standardized enterprise AI assistant adoption across tenant environments with end-to-end security auditability.',
            },
        ],
    },
    {
        title: 'Helm & Kubernetes Infrastructure Visualization',
        category: 'Staff Systems',
        tier: 'featured',
        company: 'Highway9 Networks',
        role: 'Staff Engineer, R&D UX',
        subtitle: 'Helm charts and live cluster state as interactive dependency graphs',
        description: 'Infrastructure reasoning tools that turn Helm chart configs and live Kubernetes cluster state into interactive system graphs so operators can debug complex deployments faster.',
        icon: projects.highway9Logo,
        image: [],
        tags: ['React', 'TypeScript', 'Go', 'Kubernetes', 'Helm', 'Graph Visualization'],
        duration: 'Ongoing · Highway9',
        sections: [
            {
                title: 'Problem Statement',
                content: 'Static Helm templates and complex Kubernetes YAML are difficult for network operators to reason about during deployment and debugging.',
            },
            {
                title: 'System Architecture',
                content: [
                    'Parse Helm charts into graph-ready resource models',
                    'Correlate chart resources with live cluster runtime state',
                    'Interactive dependency graphs for operator debugging',
                ],
            },
            {
                title: 'Key Impact',
                content: 'Accelerated deployment troubleshooting and reduced operator configuration errors by making infra relationships visible in one place.',
            },
        ],
    },
    {
        title: 'AI Grid & Cloud Shell Systems UX',
        category: 'Staff Systems',
        tier: 'featured',
        company: 'Highway9 Networks',
        role: 'Staff Engineer, R&D UX',
        subtitle: 'Cluster, node-pool, storage UX with page-scoped operator Cloud Shell',
        description: 'Operator-facing infrastructure management surfaces—clusters, node pools, storage, app catalog, live metrics—plus a resilient Cloud Shell with context separation and WebSocket connection lifecycle management.',
        icon: projects.highway9Logo,
        image: [],
        tags: ['React', 'WebSockets', 'xterm.js', 'Kubernetes', 'Redux', 'Edge Hardware'],
        duration: 'Ongoing · Highway9',
        sections: [
            {
                title: 'Problem Statement',
                content: 'Complex cloud-native edge inventory, node pools, storage, and app catalog flows required seamless command-line execution and live telemetry.',
            },
            {
                title: 'System Architecture',
                content: [
                    'AI Grid surfaces for clusters, node pools, storage, and catalog flows',
                    'Live metrics wiring via Redux workers and API type sync',
                    'Page-scoped Cloud Shell with decoupled WebSocket lifecycle',
                ],
            },
            {
                title: 'Key Impact',
                content: 'Unified operator experience across distributed edge hardware and cluster management.',
            },
        ],
    },
    {
        title: 'Realtime SaaS Performance Optimization',
        category: 'Staff Systems',
        tier: 'featured',
        company: 'Highway9 Networks',
        role: 'Staff Engineer, R&D UX',
        subtitle: 'WebSocket sync, Maps teardown, and main-thread performance under load',
        description: 'Hardened high-frequency SaaS performance: shallow-update socket patch paths, Google Maps teardown leak fixes, lazy-loaded map/graph widgets, and Highcharts redraw cleanup.',
        icon: projects.highway9Logo,
        image: [],
        tags: ['Performance Profiling', 'WebSockets', 'Google Maps API', 'React', 'Highcharts'],
        duration: 'Ongoing · Highway9',
        sections: [
            {
                title: 'Challenge & Analysis',
                content: 'Streaming telemetry and high-frequency entity patches caused multi-second main-thread stalls, Google Maps teardown leaks, and chart redraw waste.',
            },
            {
                title: 'Architectural Fixes',
                content: [
                    'Shallow-update fast path for WebSocket entity patches',
                    'Eliminated Google Maps TimerFire leaks on navigation',
                    'Lazy-loaded heavy map/graph widgets',
                    'Fixed Highcharts redraw cycles under streaming load',
                ],
            },
            {
                title: 'Results',
                content: 'Removed multi-second UI freezes and reduced unnecessary re-renders by ~50%.',
            },
        ],
    },
    {
        title: 'OpenCode PR-Review & Semantic Search',
        category: 'Developer Tooling',
        tier: 'flagship',
        role: 'Staff Engineer / Open Source',
        subtitle: 'AI code-review CI on self-hosted runners with structured review contracts',
        description: 'Automated AI review workflow on self-hosted GitHub runners with structured review-json contracts, fuzzy deduplication, resolved-thread suppression, safer publish permissions, and semantic repo indexing.',
        icon: projects.opencode,
        image: [],
        github: 'https://github.com/jainprashul/opencode-semantic-search',
        tags: ['GitHub Actions', 'TypeScript', 'Node.js', 'CI/CD', 'OpenCode'],
        duration: '2025 – Present',
        sections: [
            {
                title: 'What it solves',
                content: [
                    'Consistent AI PR reviews on self-hosted runners',
                    'Structured review output with dedupe and thread suppression',
                    'Safer publish permissions for automated comments',
                ],
            },
        ],
    },
    {
        title: 'Oma Cast — Omarchy Status Bar Plugin',
        category: 'Developer Tooling',
        tier: 'flagship',
        role: 'Open Source Maintainer',
        subtitle: 'One-click screen mirroring from the Omarchy / Hyprland status bar',
        description: 'QML bar widget and popup panel for Omarchy Linux that drives FluxCast—scan nearby TVs, pick a Hyprland monitor, and start or stop Miracast / DLNA / Chromecast mirroring with live session status and diagnostics.',
        icon: 'https://raw.githubusercontent.com/jainprashul/oma-cast/master/product.jpg',
        image: [
            'https://raw.githubusercontent.com/jainprashul/oma-cast/master/product.jpg',
            'https://raw.githubusercontent.com/jainprashul/oma-cast/master/infographic.png',
        ],
        github: 'https://github.com/jainprashul/oma-cast',
        tags: ['QML', 'Node.js', 'Omarchy', 'Hyprland', 'Miracast', 'FluxCast'],
        duration: '2026 · Open Source',
        sections: [
            {
                title: 'What it solves',
                content: [
                    '1-click scan, protocol pick, monitor select, and cast start/stop from the status bar',
                    'Multi-protocol: Miracast (WFD), DLNA fallback, experimental Chromecast via FluxCast',
                    'Hardware-aware Hyprland monitor picker with live session status and FluxCast diagnostics',
                ],
            },
        ],
    },
    {
        title: 'Crafttor — Adobe Creative Cloud Plugin',
        category: 'Product & SaaS',
        tier: 'flagship',
        role: 'Full Stack Developer',
        subtitle: 'Asset management plugin on the Adobe Exchange marketplace',
        description: 'Contract-based Adobe Creative Cloud plugin for managing, downloading, and uploading digital assets and illustrations—with auth, backend integration, and React/Redux UI.',
        duration: '4 months',
        icon: "https://exchange-assets.azureedge.net/uxp/Extensions/f98ec4b1/2e35a488-9a48-4a5b-baae-8e4529075101/icons/05f11919-e75c-4f2f-ab6b-ee27710ab52d.png",
        link: "https://exchange.adobe.com/apps/cc/f98ec4b1/crafttor",
        tags: ["React", "Redux", "Adobe UXP", "Adobe Creative Cloud"],
        image: [
            "https://exchange-assets.azureedge.net/uxp/Extensions/f98ec4b1/2e35a488-9a48-4a5b-baae-8e4529075101/screenshots/cd6565eb-684a-4173-b1a8-b40496d6236c.png",
            "https://exchange-assets.azureedge.net/uxp/Extensions/f98ec4b1/2e35a488-9a48-4a5b-baae-8e4529075101/screenshots/11c4813d-d0de-4086-9729-56ee22d671ca.png",
            "https://exchange-assets.azureedge.net/uxp/Extensions/f98ec4b1/2e35a488-9a48-4a5b-baae-8e4529075101/screenshots/ccbcb7d0-42f8-4eae-bd59-9fa587d86b9a.png",
        ],
    },
    {
        title: "Billin' Inc",
        category: 'Product & SaaS',
        tier: 'flagship',
        role: 'Full Stack Developer',
        subtitle: 'Invoicing, inventory, and accounting PWA for SMEs',
        description: 'Invoicing, accounting, and inventory management for wholesalers, retailers, and SMEs—data model and business logic, Google Drive backup, and Progressive Web App offline usage on mobile and web.',
        icon: projects.billinLogo,
        image: [projects.billin1, projects.billin2, projects.billin3, projects.billin4],
        github: 'https://github.com/jainprashul/billin-inc-v4',
        tags: ['React', 'TypeScript', 'Node.js', 'Express', 'PWA', 'GCP'],
        duration: '8 months',
    },
    {
        title: 'Order & Inventory Management System',
        category: 'Archive',
        tier: 'archive',
        role: 'Full Stack Developer',
        subtitle: 'Custom order and inventory system for the glass industry',
        description: 'Web app for estimates, orders, role-based multi-user access, inventory/stock, reports, invoices, and client/employee management for a glass industry workflow.',
        icon: projects.glassLogo,
        link: 'https://glass-calc-1.vercel.app/',
        duration: '6 months',
        tags: ['React', 'TypeScript', 'GCP', 'UI / UX'],
        image: [projects.glass1, projects.glass2, projects.glass3, projects.glass4, projects.glass5],
    },
    {
        title: 'Helping Hands',
        category: 'Archive',
        tier: 'archive',
        role: 'Full Stack Developer',
        subtitle: 'Hackathon platform connecting people in need with helpers',
        description: 'Social platform and job board to connect people who need help with people who can help—built as a React Native / Android hackathon project.',
        icon: projects.helpingHandsLogo,
        github: 'https://github.com/jainprashul/HelpingHand',
        duration: '4 days (Hackathon)',
        tags: ['Android', 'TypeScript', 'React Native', 'Postgres'],
        image: [projects.helpingHands0, projects.helpingHands1, projects.helpingHands2, projects.helpingHands3, projects.helpingHands4],
    },
]
