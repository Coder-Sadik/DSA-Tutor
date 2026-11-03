# Golpe Golpe DSA (গল্পে গল্পে ডেটা স্ট্রাকচার ও অ্যালগরিদম)

An interactive, bilingual (Bengali + English) technical ebook designed to teach Data Structures and Algorithms to beginners through warm everyday stories, intuitive mental models, and interactive visual animations.

## Tech Stack
- **Framework**: Next.js (App Router, Turbopack, static site generation)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom CSS variable design tokens (light & dark modes)
- **Typography**: `Bricolage Grotesque` (headings) and `Hind Siliguri` (body & Bengali text)
- **Content**: MDX (`next-mdx-remote` & `gray-matter`)
- **Animation**: React state & hooks + Framer Motion (respects `prefers-reduced-motion`)
- **Testing**: Vitest for deterministic step-generator unit tests

---

## Getting Started

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. The root `/` route will automatically redirect to `/bn` (or `/en` based on `Accept-Language` headers).

### Testing
```bash
npm test
```
Runs the Vitest suite validating pure algorithm step generation across edge cases.

### Production Build
```bash
npm run build
```
Generates a fully pre-rendered static build with static parameters for both languages and all ready chapters.

---

## How to Add a New Chapter

Follow this 4-step checklist to write and publish a new chapter:

### 1. Create the MDX Content Files
Create one MDX file per language in `content/`:
- Bengali: `content/bn/chapter-XX.mdx`
- English: `content/en/chapter-XX.mdx`
*(where `XX` is the zero-padded two-digit chapter number, e.g. `chapter-02.mdx`)*

### 2. Define the Frontmatter
At the very top of each MDX file, specify the frontmatter:
```yaml
---
order: 2
slug: "array"
title: "অ্যারে (Array)"
storyHook: "সারিবদ্ধ নম্বর দেওয়া লকারের গল্প"
status: "ready"
---
```
*(In the English file, use English values for `title` and `storyHook`)*

### 3. Follow the Standard Chapter Template
Every chapter includes:
1. **Kicker**: `"Chapter N"` or `"অধ্যায় N"`
2. **Story**: `<Story>` component with 4–8 sentences set in a relatable Bangladeshi context.
3. **Concept & Definitions**: Plain words with `<Definition term="..." english="...">` callout.
4. **Interactive Lab**: Embed the custom interactive lab component (e.g. `<ArrayLockerLab />`).
5. **Real-world uses**: 2–3 bullet points.
6. **Code Tabs**: `<CodeTabs js="..." py="..." />` with copy buttons.
7. **What to Remember**: `<Remember>` summary box with 3 key takeaways.
8. **Quiz**: `<Quiz questions={[...]} />` with 3 multiple-choice questions, instant feedback, explanations, and score summary.
9. **Next Chapter Teaser**: A concluding sentence previewing the upcoming chapter.

### 4. Update the Chapter Registry
Open `src/lib/chapters.ts`:
1. Find the chapter by its `order` / `slug`.
2. Change its `status` from `'soon'` to `'ready'`.
3. Verify `titleBn`, `titleEn`, `hookBn`, and `hookEn` match your MDX frontmatter.

### 5. Verify Build & Tests
Run:
```bash
npm test
npm run build
```
Once the build succeeds, the new chapter will automatically appear as clickable in the Table of Contents on both `/bn` and `/en` and be statically generated at `/[lang]/chapter/[slug]`.
