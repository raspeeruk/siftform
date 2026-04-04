# Sift — AI-Powered Unstructured Data Extraction

## What is this?

Sift is a platform where businesses define a schema, embed a widget, and end users describe their situation in free text. AI extracts structured data, asks for missing required fields, and delivers data via dashboard + webhook.

## Stack

- Next.js 15 + Tailwind 4 + TypeScript
- Neon (PostgreSQL via Netlify integration)
- Drizzle ORM
- NextAuth v5 (Resend magic links + Google OAuth)
- Claude Sonnet (AI extraction)
- Stripe (billing)
- Preact widget (embeddable, Shadow DOM)

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run db:generate  # Generate Drizzle migrations
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio
```

## Architecture

- `src/lib/db/schema.ts` — Drizzle schema (all tables)
- `src/lib/auth/` — NextAuth configuration
- `src/lib/ai/` — AI extraction engine
- `src/app/(dashboard)/` — Authenticated dashboard pages
- `src/app/(marketing)/` — Public marketing pages
- `src/app/api/v1/` — Public API (widget + developer API)
- `src/components/` — Shared UI components

## Key Rules

- Two API key types: `iq_pub_` (widget, public) and `iq_live_` (API, private)
- Widget keys can only call extract + confirm endpoints
- All API endpoints return CORS headers for widget embedding
- Files processed in memory, never persisted to disk
- Extraction cost tracking: increment org.extractionsUsed on every extraction
