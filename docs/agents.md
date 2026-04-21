\# Agents Instructions — Social Comment Generator



\## Purpose



These instructions guide Codex/Cloud Code when generating, editing, or extending the Social Comment Generator project.



The goal is to produce a polished, bilingual, scalable MVP using Next.js, Tailwind, and TypeScript, while preserving strict product scope and clean architecture.



\---



\## 1. Core Product Context



The project is an independent web app that generates social comment mockups inspired by TikTok and Instagram.



It is:

\- a mockup generator

\- bilingual (English / Spanish)

\- dark mode only

\- designed for creators, agencies, and marketers

\- optimized for PNG export with transparent background

\- intended to be portfolio-grade from the MVP



It is not:

\- an official social media integration

\- a feed viewer

\- a real comment publishing tool

\- a backend-heavy social platform



\---



\## 2. Technical Stack Rules



Use:

\- Next.js

\- TypeScript

\- Tailwind CSS

\- App Router

\- Supabase Auth for Google sign-in

\- localStorage for recent mockups and local preferences



Avoid introducing:

\- unnecessary backend complexity

\- large state libraries unless truly necessary

\- premature payment logic

\- heavy dependencies without clear value

\- permanent cloud archival in the MVP



\---



\## 3. Product Scope Rules



\### MVP Includes

\- landing page

\- bilingual support

\- TikTok-style mockup

\- Instagram-style mockup

\- generator form

\- optional reply

\- predefined avatar picker

\- verified badge for logged-in users only

\- anonymous watermark

\- no watermark for logged-in users

\- daily usage limits

\- local recent history

\- reusable recent mockups

\- PNG transparent export



\### MVP Excludes

\- premium billing

\- avatar upload

\- WhatsApp mockups

\- admin dashboard

\- permanent cloud history

\- advanced analytics dashboards



Do not add excluded features unless explicitly requested.



\---



\## 4. UX Priorities



Prioritize:

1\. visual polish

2\. responsiveness

3\. speed of generation

4\. simple export flow

5\. clear bilingual UX

6\. realistic mockup rendering

7\. maintainable code



Every interface should feel:

\- modern

\- premium

\- app-like

\- clean

\- intentional



\---



\## 5. Architecture Rules



\### General

\- keep components modular

\- separate rendering logic by platform

\- isolate export logic into reusable utilities

\- isolate localStorage logic into dedicated helpers

\- isolate usage-limit logic into dedicated helpers

\- isolate auth setup from UI concerns



\### Rendering

Build separate mockup renderer components:

\- TikTokCommentMockup

\- InstagramCommentMockup



If they share structure, use a shared shell component, but do not over-abstract too early.



\### Data

Use browser storage only for:

\- recent mockups

\- user preferences

\- local draft state if needed



Use server/database only for:

\- auth-linked usage tracking

\- plan metadata

\- basic account metadata



\---



\## 6. Styling Rules



Use Tailwind as the primary styling system.



Guidelines:

\- dark mode first

\- smooth spacing

\- strong typography hierarchy

\- rounded corners where appropriate

\- minimal clutter

\- no inconsistent shadows or arbitrary styling

\- keep the interface elegant and production-like



The public website should feel like a modern SaaS/tool landing page.



The mockups themselves should be visually close to the target social patterns, while keeping the product interface distinct from official platform branding.



\---



\## 7. Bilingual Rules



Support both:

\- English

\- Spanish



Requirements:

\- no hardcoded UI strings inside reusable components

\- centralize dictionaries

\- preserve UTF-8 compatibility

\- structure routes or translation loading cleanly

\- default copy should be concise and product-focused



\---



\## 8. Export Rules



The export flow must:

\- export only the mockup area

\- support transparent PNG

\- be reusable across platforms

\- avoid coupling export logic to one specific renderer



If export quality needs tuning, prioritize:

1\. text clarity

2\. spacing fidelity

3\. transparent background correctness

4\. stable behavior across viewport sizes



\---



\## 9. Local History Rules



The recent-history feature must:

\- store only the last 5 mockups

\- persist in localStorage

\- include enough data to re-render a preview

\- allow “reuse this mockup”

\- be easy to reset or overwrite



Do not create server-stored history in the MVP.



\---



\## 10. Usage Limit Rules



\### Anonymous Users

\- 10 generations/day

\- watermark shown

\- verified badge unavailable



\### Logged-in Users

\- 20 generations/day

\- no watermark

\- verified badge available



Implement logic cleanly so premium limits can be added later without major rewrites.



\---



\## 11. Auth Rules



Use Google login via Supabase Auth.



Auth should be used to:

\- identify user session

\- enable no-watermark export

\- enable verified badge

\- support usage tracking



Do not implement email/password auth unless explicitly requested.



\---



\## 12. Code Quality Rules



Always prefer:

\- clear naming

\- small reusable functions

\- typed interfaces

\- readable component props

\- minimal duplication with sensible abstraction

\- comments only where useful



Avoid:

\- giant monolithic components

\- tangled state

\- hidden side effects

\- style logic mixed with storage logic

\- over-engineering



\---



\## 13. File and Naming Conventions



Use clear file names that describe purpose.



Examples:

\- `CommentEditorForm.tsx`

\- `RecentMockups.tsx`

\- `exportToPng.ts`

\- `recentMockups.ts`



Do not use vague names like:

\- `helper.ts`

\- `misc.ts`

\- `thing.tsx`



\---



\## 14. Sequence of Implementation



When building from scratch, follow this order:



1\. project scaffold

2\. Tailwind setup

3\. global layout

4\. bilingual foundation

5\. landing page shell

6\. generator page shell

7\. platform tabs

8\. editor form

9\. preview renderer

10\. TikTok mockup renderer

11\. Instagram mockup renderer

12\. export logic

13\. local recent-history

14\. watermark behavior

15\. auth integration

16\. usage-limit logic

17\. SEO metadata

18\. legal pages

19\. cleanup/refinement

20\. responsive polishing



Do not jump to phase-2 features before phase-1 completeness.



\---



\## 15. What to Do When Unsure



If visual or product details are ambiguous:

\- preserve current project scope

\- choose the simpler implementation

\- keep extension points ready

\- avoid inventing monetization or admin systems not in scope



If a reference image later exists, prefer matching the reference while keeping the code maintainable.



\---



\## 16. Deliverable Standard



Any generated code should be:

\- runnable

\- organized

\- production-minded

\- easy to continue in Codex

\- aligned with the brief

\- visually polished enough for a public demo



All output must preserve the project’s central identity:

a lightweight, elegant, realistic social comment mockup generator.

