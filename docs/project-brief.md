\# Social Comment Generator — Project Brief



\## 1. Project Overview



Social Comment Generator is a bilingual web app (English / Spanish) that allows users to create highly realistic social media comment mockups inspired by TikTok and Instagram, with WhatsApp-style chat mockups planned for a later phase.



The product is not an official integration with any social platform. It is an independent mockup-generation tool designed for creators, agencies, marketers, content editors, and general users who need visually convincing comment/reply assets for content creation, storytelling, presentations, concept testing, and social media visuals.



The initial goal is to create a polished portfolio-grade product with strong organic discovery potential and a future path to monetization.



\## 2. Primary Goals



\### MVP Goals

\- Ship a polished, responsive, bilingual mockup generator.

\- Support TikTok-style and Instagram-style comment mockups.

\- Allow PNG export with transparent background.

\- Offer a premium-feeling interface suitable for portfolio use.

\- Validate demand through free usage with basic account-based upgrades.



\### Business Goals

\- Build a product that can serve as a portfolio piece.

\- Enable future monetization via premium subscriptions.

\- Grow organically through SEO, sharing, and creator adoption.

\- Keep the product lightweight and affordable to run.



\## 3. Product Positioning



Social Comment Generator is positioned as:

\- a social comment mockup tool

\- a creator utility

\- a lightweight content design tool

\- an agency-friendly asset generator



It is \*\*not\*\* positioned as an official TikTok, Instagram, or Meta product.



\## 4. Target Users



\### Primary

\- Content creators

\- Marketing agencies

\- Social media managers

\- Designers

\- Video editors

\- Meme and storytelling creators



\### Secondary

\- General users who want realistic social comment visuals



\## 5. Supported Platforms



\### MVP

\- TikTok-style comments

\- Instagram-style comments



\### Future

\- WhatsApp-style chats/comments

\- Additional social mockup styles

\- More layout variations



\## 6. Core MVP Features



\- Platform selector (TikTok-style / Instagram-style)

\- Username field

\- Comment text field

\- Optional reply field

\- Predefined avatar picker (around 60 avatars)

\- Verified badge toggle (logged-in users only)

\- Emoji support

\- Dark mode only

\- PNG export with transparent background

\- Small watermark for anonymous users

\- No watermark for logged-in users

\- Daily usage limit for anonymous users

\- Higher daily usage limit for logged-in users

\- Local recent-history storage (5 recent mockups)

\- Miniature previews in recent history

\- “Reuse mockup” action from recent history

\- Bilingual interface from day one



\## 7. Feature Rules



\### Anonymous Users

\- Can generate up to 10 mockups per day

\- Export includes a very small watermark

\- Cannot use verified badge

\- No premium-only features



\### Logged-in Users

\- Can generate up to 20 mockups per day

\- No watermark

\- Can use verified badge

\- Can access account-linked usage tracking



\### Premium Users (future phase)

\- Unlimited generations

\- Can upload their own profile image/avatar

\- May get higher-resolution export or extra styles later



\## 8. Visual Direction



The visual style of the product website should be:

\- modern

\- premium

\- app-like

\- dark-mode first

\- clean and creative

\- high polish, suitable for portfolio presentation



The mockups themselves should aim to be \*\*as visually close as possible\*\* to current TikTok and Instagram comment aesthetics without presenting the product as official.



\## 9. Branding



\### Product Name

Social Comment Generator



\### Initial Brand Direction

\- Minimal and modern

\- Utility-oriented

\- Slightly creative rather than corporate

\- Watermark/logo can initially be a subtle comment bubble mark

\- Watermark must be visually small and unobtrusive



\## 10. Internationalization



The product must support:

\- English

\- Spanish



This support starts in the MVP.



\### Requirements

\- UTF-8 encoding

\- Translation-ready UI strings

\- Locale-aware routes if possible

\- No hardcoded language assumptions in reusable components



\## 11. Technical Architecture



\### Recommended Stack

\- Next.js

\- TypeScript

\- Tailwind CSS

\- Supabase Auth

\- localStorage for recent mockups and local preferences

\- Vercel for deployment

\- GitHub for version control



\### Why

\- Next.js provides app structure, routing, and future backend flexibility

\- Tailwind CSS provides fast, modern styling

\- Supabase Auth simplifies Google login

\- localStorage avoids unnecessary server persistence for recent mockups

\- Vercel is ideal for deploying a Next.js app



\## 12. Data Strategy



\### Stored in Browser (localStorage)

\- 5 recent mockups

\- thumbnail references or serialized preview data

\- last used platform

\- last used settings/preferences

\- re-usable mockup data



\### Stored in Server/Database

\- user id

\- auth identity

\- username

\- plan tier

\- daily usage count

\- total usage count

\- basic generation activity metadata



\### Not Stored in MVP

\- full permanent mockup archive on the server

\- uploaded personal avatars

\- payment details

\- complex admin data



\## 13. Authentication



\### MVP

\- Google login only



\### Purpose

\- identify users

\- apply daily limits

\- unlock no-watermark export

\- unlock verified badge



\## 14. Export Logic



\### MVP Export

\- PNG with transparent background

\- export from rendered mockup component

\- export handled client-side where possible



\### Notes

\- the export flow should be isolated in reusable utility logic

\- the export should prioritize visual consistency and speed



\## 15. SEO Strategy



The site should be optimized for both English and Spanish organic discovery.



\### Example keyword themes

\- social comment generator

\- comment mockup generator

\- TikTok comment mockup

\- Instagram comment generator

\- generador de comentarios

\- mockup de comentarios

\- comentario estilo TikTok

\- comentario estilo Instagram



\### SEO Pages

\- home landing page

\- generator page

\- terms

\- privacy

\- future blog or templates pages



\## 16. Legal / Product Boundaries



The product must clearly present itself as:

\- an independent mockup-generation tool

\- not affiliated with TikTok, Instagram, Meta, or WhatsApp



The landing page/footer/terms should include a brief disclaimer making this clear.



The product should avoid suggesting official partnership or authorization.



\## 17. MVP Routes



\### Public

\- `/\[locale]`

\- `/\[locale]/generator`

\- `/\[locale]/login`

\- `/\[locale]/terms`

\- `/\[locale]/privacy`



\### Internal / API

\- `/api/usage`

\- `/api/auth/callback`

\- `/api/health`



\## 18. Core Components



\### Layout

\- Navbar

\- Footer

\- LanguageSwitcher



\### Landing

\- Hero

\- FeatureGrid

\- UseCases

\- PlatformPreview

\- CTASection



\### Generator

\- PlatformTabs

\- CommentEditorForm

\- AvatarPicker

\- VerifiedToggle

\- EmojiPicker

\- ReplyToggle

\- PreviewCanvas

\- ExportButton

\- UsageCounter

\- WatermarkLayer

\- RecentMockups



\### Mockup Renderers

\- TikTokCommentMockup

\- InstagramCommentMockup

\- SharedMockupShell



\### Auth

\- LoginButton

\- LogoutButton

\- AuthGate



\## 19. Usage Limits



\### Anonymous

\- 10 per day



\### Logged-in

\- 20 per day



\### Premium

\- unlimited (future)



Limits should be simple in the MVP and robust enough for practical use, while acknowledging that anonymous-client-side restrictions are less secure than authenticated server-side checks.



\## 20. Roadmap



\### Phase 1 — MVP

\- landing page

\- bilingual setup

\- TikTok and Instagram mockups

\- dark mode

\- export PNG transparent

\- recent history in localStorage

\- Google login

\- usage limits

\- anonymous watermark

\- no watermark for logged-in users

\- verified badge for logged-in users



\### Phase 2

\- premium plan

\- personal avatar upload

\- better analytics

\- stronger account controls

\- improved visual fidelity

\- more template flexibility



\### Phase 3

\- WhatsApp-style mockups

\- payment integration

\- more social formats

\- advanced export options

\- better dashboard/admin options



\## 21. Success Criteria for MVP



The MVP is successful if:

\- the product looks polished enough for public portfolio use

\- it works well on desktop and mobile

\- users can generate convincing social comment mockups quickly

\- bilingual support works cleanly

\- usage limits and login gating work reliably

\- the export experience feels fast and simple



\## 22. Non-Goals for MVP



\- full subscription system

\- admin dashboard

\- permanent cloud history

\- uploaded personal avatars

\- WhatsApp support

\- advanced template packs

\- team collaboration

\- payment workflows



\## 23. Development Principles



\- keep components small and reusable

\- separate business rules from presentation

\- keep mockup rendering modular by platform

\- make export logic reusable and isolated

\- use localStorage only for user convenience data

\- keep account/state logic easy to upgrade later

\- prioritize polish, clarity, and responsiveness

