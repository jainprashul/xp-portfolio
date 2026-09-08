# Portfolio Staff Engineer Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the Windows 11 portfolio with Staff Engineer / Systems UX & AI Tooling positioning across projects, about, tech stack, resume, and links.

**Architecture:** Extend the existing `Project` type for tiers and case-study sections; update ProjectList/ProjectDetail to render tiers and structured sections; refresh About, WinMenu, TechStack, index.html, and resume.pdf without changing the OS shell UX.

**Tech Stack:** React 18, TypeScript, Vite, CSS modules (existing)

## Global Constraints

- Keep Windows 11 desktop/mobile shell and modal patterns unchanged.
- Public title everywhere: `Staff Engineer, R&D UX`.
- Tagline focus: Systems UX & AI Tooling; core stack React, TypeScript, Go, Kubernetes.
- Remove xpWatch and Chatboi from active portfolio.
- No dead `.now.sh` URLs; portfolio URL is `https://jainprashul.vercel.app`.
- Highway9 cards may have empty `image` arrays; UI must not crash.

## File Map

| File | Responsibility |
| --- | --- |
| `src/constants/projects.ts` | Project types + curated content |
| `src/components/ProjectList.tsx` + `.module.css` | Tiered list + archive toggle |
| `src/components/ProjectDetail.tsx` + `.module.css` | Case-study sections, role/company, links |
| `src/components/TechStack.tsx` | 3-tier skill matrix + narrative |
| `src/components/About.tsx` | Staff bio copy |
| `src/components/WinMenu.tsx` | Title, skills, share URL |
| `src/components/BottomNav.tsx` | Fix mobile mailto |
| `index.html` | Title + meta |
| `public/resume.pdf` | Sync latest Staff resume |

---

### Task 1: Project schema + content

**Files:**
- Modify: `src/constants/projects.ts`
- Modify: `src/assets/asset.ts` (only if needed for icons; reuse `me` / existing logos)

**Interfaces:**
- Produces: `Project`, `ProjectSection`, `Projects: Project[]` with `tier` values `featured` | `flagship` | `archive`

- [ ] **Step 1:** Replace `projects.ts` with expanded types and the curated inventory from the design spec (4 featured Highway9, 4 flagship, 2 archive). Use `me` as icon for Highway9/OpenCode/OMA items without dedicated logos. Prefer empty `image: []` when no screenshots exist. Fix Billin link away from `.now.sh` (use GitHub or vercel if known: `https://github.com/jainprashul/billin-inc-v4`). Crafttor keeps Adobe Exchange URL. Glass + Helping Hands stay archive.

- [ ] **Step 2:** Commit `feat: refresh portfolio projects for staff systems positioning`

---

### Task 2: ProjectList + ProjectDetail UI

**Files:**
- Modify: `src/components/ProjectList.tsx`, `ProjectList.module.css`
- Modify: `src/components/ProjectDetail.tsx`, `ProjectDetail.module.css`

**Interfaces:**
- Consumes: `Project.tier`, `Project.sections`, `Project.role`, `Project.company`, `Project.github`, optional `link`/`image`

- [ ] **Step 1:** Update `ProjectList` to group by tier; featured/flagship always visible; archive behind collapsible `<details>` or local `useState` toggle. Skip image block when `image.length === 0`.

- [ ] **Step 2:** Update `ProjectDetail` to render sections (string or bullet list), role/company specs, optional link + github, hide product images section when empty.

- [ ] **Step 3:** Commit `feat: add tiered projects and case-study detail views`

---

### Task 3: Identity windows + hygiene

**Files:**
- Modify: `src/components/About.tsx`, `WinMenu.tsx`, `TechStack.tsx`, `BottomNav.tsx`, `index.html`
- Replace: `public/resume.pdf` from `d:\X\notes\daily-report\resume.pdf` if present

- [ ] **Step 1:** Update About/WinMenu copy and skills; fix share URL and mobile mailto.

- [ ] **Step 2:** Rewrite TechStack narrative + three skill groups with icons8 / existing icons where available.

- [ ] **Step 3:** Update `index.html` title and description meta.

- [ ] **Step 4:** Copy resume PDF if source exists.

- [ ] **Step 5:** Commit `feat: align about, stack, resume, and links with staff brand`

---

### Task 4: Verify build

**Files:** none (verification only)

- [ ] **Step 1:** Run `npm run build` and `npm run lint`; fix any errors.

- [ ] **Step 2:** Commit any fixes if needed.
