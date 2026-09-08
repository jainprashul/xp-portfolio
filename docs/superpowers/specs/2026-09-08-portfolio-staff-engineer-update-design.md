# Portfolio Update Design Specification: Staff Engineer & Systems UX Positioning

**Date:** 2026-09-08  
**Author:** Prashul Jain & AI Assistant  
**Status:** Approved  
**Target Repository:** `xp-portfolio` (`https://jainprashul.vercel.app`)

---

## 1. Objective & Background

Following comprehensive updates to Prashul's **LinkedIn profile**, **GitHub presence**, and **Resume (`resume.md` / `resume.pdf`)**, the interactive Windows 11-style web portfolio must be modernized to reflect his current role as **Staff Engineer (R&D UX) at Highway9 Networks**.

The redesign retains the distinct Windows 11 desktop and mobile interactive experience while upgrading the narrative, project showcase depth, and skill matrix from early-career frontend/mobile work to Staff-level systems design, AI platform engineering, infrastructure visualization, and realtime SaaS performance.

---

## 2. Architecture & Data Model Changes

### 2.1 Project Schema Enhancements (`src/constants/projects.ts`)
The `Project` data type is expanded to support structured case studies, company attribution, roles, and categorized tiers:

```typescript
export type ProjectSection = {
  title: string;
  content: string | string[];
};

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
};
```

### 2.2 Component Hierarchy & Presentation
1. **`src/components/ProjectList.tsx`:**
   - Grouped layout rendering three distinct tiers:
     - **Tier 1: Featured Systems & AI Platforms (Highway9)** — Large impact cards with metrics and architecture badges.
     - **Tier 2: Flagship Developer Tools & Open Source** — Standalone tools and production applications.
     - **Tier 3: Collapsible Archive** — Clean expand/collapse toggle for older exploratory work.
2. **`src/components/ProjectDetail.tsx`:**
   - Dynamic rendering of structured sections (e.g., *Problem Statement*, *System Architecture & Security Model*, *Key Impact & Performance Metrics*).
   - Display of company, role, duration, tech tags, live links, and GitHub links.
   - Backward-compatible fallback for projects without custom sections.

---

## 3. Detailed Content Specifications

### 3.1 Featured Highway9 Systems Work (Tier 1)
1. **AI Assistant Platform & Architecture (Highway9 Networks)**
   - **Role:** Staff Engineer, R&D UX
   - **Stack:** `TypeScript`, `React`, `Go`, `AI Systems`, `JWT/Auth`, `ACLs`, `Kubernetes`
   - **Sections:**
     - *Problem Statement:* Enabling safe, multi-tenant AI assistant interactions in an enterprise networking SaaS without security regressions or opaque execution.
     - *Architecture & Security Model:* Modular packaging across environments (CSP/VMC), JWT principal-based authentication, granular ACL/role access control (vs broad global feature flags), and explicit `viaAssistant` audit logging.
     - *Key Impact:* Standardized enterprise AI assistant adoption across tenant environments with end-to-end security auditability.

2. **Helm & Kubernetes Infrastructure Visualization (Highway9 Networks)**
   - **Role:** Staff Engineer, R&D UX
   - **Stack:** `React`, `TypeScript`, `Go`, `Kubernetes`, `Helm`, `Graph Visualization`
   - **Sections:**
     - *Problem Statement:* Static Helm templates and complex Kubernetes YAML files are difficult for network operators to reason about during deployment and debugging.
     - *System Architecture:* Compiler and graph rendering engine that parses Helm charts and correlates them with live cluster runtime state into interactive dependency graphs.
     - *Key Impact:* Significantly accelerated deployment troubleshooting and reduced operator configuration errors.

3. **AI Grid & Cloud Shell Systems UX (Highway9 Networks)**
   - **Role:** Staff Engineer, R&D UX
   - **Stack:** `React`, `WebSockets`, `xterm.js`, `Kubernetes`, `Redux`, `Edge Hardware`
   - **Sections:**
     - *Problem Statement:* Complex cloud-native edge inventory, node pools, storage, and app catalog flows required seamless command-line execution and live telemetry.
     - *System Architecture:* Integrated management surfaces with live Redux metrics wiring and a page-scoped Cloud Shell with resilient WebSocket lifecycle management.
     - *Key Impact:* Unified operator experience across distributed edge hardware and cluster management.

4. **Realtime SaaS Performance & Main-Thread Optimization (Highway9 Networks)**
   - **Role:** Staff Engineer, R&D UX
   - **Stack:** `Performance Profiling`, `WebSockets`, `Google Maps API`, `React`, `Highcharts`
   - **Sections:**
     - *Challenge & Analysis:* Streaming telemetry and high-frequency entity patches caused multi-second main-thread stalls, Google Maps teardown leaks, and chart redraw waste.
     - *Architectural Fixes:* Implemented shallow-update fast paths for socket patches, eliminated Google Maps `TimerFire` memory leaks upon navigation, and lazy-loaded heavy graph widgets.
     - *Results:* Removed multi-second UI freezes and reduced unnecessary re-renders by ~50%.

### 3.2 Flagship Tools & Open Source (Tier 2)
1. **OpenCode PR-Review GitHub Action & Semantic Search**
   - Automated AI review workflow on self-hosted runners with structured JSON review contracts, deduplication, thread suppression, and semantic repo indexing.
   - *Tags:* `GitHub Actions`, `TypeScript`, `Node.js`, `CI/CD`, `OpenCode`
2. **Crafttor — Adobe Creative Cloud Plugin**
   - Asset management plugin published on the Adobe Exchange marketplace with authentication, backend sync, and React/Redux UI.
   - *Tags:* `React`, `Redux`, `Adobe UXP`, `Adobe Creative Cloud`
3. **Billin’ Inc v4**
   - Progressive Web App (PWA) for invoicing, accounting, and inventory for SMEs with offline storage and cloud backup.
   - *Tags:* `TypeScript`, `React`, `Node.js`, `Express`, `PWA`, `GCP`
4. **OMA-Cast & Peer Media Sync**
   - Real-time peer-to-peer media synchronization and playback streaming tools using WebRTC and WebSockets.
   - *Tags:* `WebRTC`, `WebSockets`, `TypeScript`, `P2P`

### 3.3 Collapsible Archive (Tier 3)
- Custom Glass Industry ERP & Order Management System.
- Helping Hands (Hackathon Community Platform).
*(Note: Early hobby projects `xpWatch` and `Chatboi` are removed from the active portfolio to sharpen focus).*

---

## 4. System Windows & Component Updates

### 4.1 `src/components/TechStack.tsx`
- **Narrative Update:**
  > *"I build systems that reduce complexity in data and infrastructure. My work focuses on turning static configurations, fragmented workflows, and raw telemetry into tools engineers can actually reason about."*
- **Categorization Matrix:**
  - **Core Daily Stack:** `TypeScript`, `React`, `Go`, `Node.js`, `Kubernetes`, `Helm`, `Docker`, `GitHub Actions`, `WebSockets`, `Redux`.
  - **Backend, Data & Cloud:** `Python`, `PostgreSQL`, `MongoDB`, `JWT/Auth & ACLs`, `REST APIs`, `Google Cloud (GCP)`, `AWS`.
  - **Systems & Platform Engineering:** `Infra & Helm Visualization`, `AI Assistant Platforms`, `Performance Profiling & Memory Optimization`, `UI/UX Design Systems`, `CI/CD Automation`.

### 4.2 `src/components/WinMenu.tsx` (Start Menu) & `src/components/About.tsx`
- **Title:** `Staff Engineer, R&D UX` (Highway9 Networks).
- **Bio Copy:** Grounded in cloud-native enterprise networking, AI platform surfaces, and infrastructure tools.
- **Experience Counter:** Synchronized to `{new Date().getFullYear() - 2019}+ Years` (~7+ years).
- **Skills Summary:** Updated to `TypeScript, React, Go, Kubernetes, Helm, Docker, GitHub Actions, JWT/Auth, WebSockets, Python, Cloud (AWS/GCP)`.
- **Share Target:** Fixed to `https://jainprashul.vercel.app`.

### 4.3 Navigation & Hygiene
- **`src/components/BottomNav.tsx`:** Fix mobile nav email from `mailto:jainprashul.now.sh` to `mailto:jainprashul@gmail.com`.
- **`public/resume.pdf`:** Synchronized with the latest generated Staff Engineer PDF from `d:\X\notes\daily-report\resume.pdf`.
- **`index.html`:** Updated page title (`Prashul Jain | Staff Engineer — Systems UX & AI Tooling`) and metadata.

---

## 5. Verification & Testing Criteria
1. **Compilation & Type Check:** `npm run build` (`tsc && vite build`) passes with zero TypeScript and build errors.
2. **Linting:** `npm run lint` passes without warnings or errors.
3. **Interactive Validation:**
   - Desktop and Mobile layouts render correctly.
   - All modal dialogs (Projects, About, Tech Stack, Settings, Resume) open and close cleanly.
   - Project tiering and structured case studies display clearly.
   - All links (GitHub, LinkedIn, Resume, Email, Calendly) resolve to active destinations without 404s or dead `.now.sh` URLs.
