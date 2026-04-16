# namelifyAI — Next.js App

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React (icons)
- Google Fonts: Syne (display) + DM Sans (body)

## Structure

```
app/
  layout.tsx       — Root layout with fonts + metadata
  page.tsx         — Main page (assembles all sections)
  globals.css      — Global styles + Tailwind directives

components/
  Sidebar.tsx      — Collapsible sidebar (desktop fixed, mobile drawer)
  Header.tsx       — Sticky header with hamburger menu
  GeneratorPanel.tsx — Main AI name generator form
  ArchetypeCards.tsx — Generated name result cards
  FeatureGrid.tsx  — Feature highlights grid

tailwind.config.ts — Custom color palette (namelify.*)
```

## Custom Colors

| Token             | Hex       | Usage                 |
| ----------------- | --------- | --------------------- |
| `bg`              | `#0D0B14` | Page background       |
| `namelify-panel`  | `#110F1A` | Sidebar, right panel  |
| `namelify-card`   | `#161221` | Card backgrounds      |
| `namelify-input`  | `#1A1628` | Input fields          |
| `namelify-accent` | `#7C5CFC` | Primary purple accent |
| `namelify-muted`  | `#7B7592` | Secondary text        |

## Responsive Behaviour

- **Mobile**: Sidebar hidden, hamburger in header opens drawer overlay
- **Tablet (md)**: Nav links visible in header
- **Desktop (lg)**: Sidebar fixed on left, main content shifts right
- **Wide (xl)**: Right panel with saved names appears
