# Design: Migrate tinycl from Contentful to Supabase

**Date:** 2026-03-04

## Goal

Replace Contentful as the data source for links on tinycl.com with a Supabase `links` table. No admin UI — links are managed directly via the Supabase dashboard.

## Supabase Table

Table name: `links`

| Column | Type |
|--------|------|
| id | int |
| display_name | text |
| url | text |
| redirectpath | text |
| createdby | text |
| createdat | timestamp |

## Architecture

Single page site (`pages/index.tsx`) that fetches all links from Supabase at build time via `getStaticProps`. Short URL redirects (e.g. `tinycl.com/ig` → actual URL) are generated at build time by `scripts/prebuild.js` into a Netlify `_redirects` file.

## Changes

| File | Change |
|------|--------|
| `utils/supabase.ts` | New — initializes and exports Supabase JS client |
| `utils/index.ts` | Replace `fetchContentful` + `pageQuery` with `fetchLinks()` using Supabase client |
| `pages/index.tsx` | Update `getStaticProps` to use `fetchLinks()`, remove page-grouping logic |
| `scripts/prebuild.js` | Replace Contentful fetch with Supabase client to get `redirectpath` + `url` |
| `pages/[page].tsx` | Delete — multi-page structure no longer needed |
| `.env.local` | Add `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_ANON_KEY` |

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-project-url>
SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

## Data Flow

**Page render:**
`getStaticProps` → `fetchLinks()` → Supabase `links` table → `{ display_name, url }[]` → props → `Layout` → renders buttons

**Redirects:**
`prebuild.js` → Supabase `links` table → `{ redirectpath, url }[]` → writes `out/_redirects`
