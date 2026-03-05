# Contentful to Supabase Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace Contentful as the data source with a Supabase `links` table, simplifying the site to a single page.

**Architecture:** Install the Supabase JS client, create a typed client singleton, replace `fetchContentful` with `fetchLinks`, update `getStaticProps` in `index.tsx`, update `prebuild.js` for redirects, and delete the now-unused `[page].tsx`.

**Tech Stack:** Next.js 13, TypeScript, `@supabase/supabase-js`

---

### Task 1: Add Supabase env vars

**Files:**
- Modify: `.env.local`

**Step 1: Add the two required variables**

Open `.env.local` and add:

```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-project-url>
SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

Find these in the Supabase dashboard under **Project Settings → API**:
- `NEXT_PUBLIC_SUPABASE_URL` = "Project URL"
- `SUPABASE_ANON_KEY` = "anon public" key

**Step 2: Verify**

Run:
```bash
yarn dev
```
Expected: Server starts without crashing (even if Contentful still fails — we just want no env-related crash).

---

### Task 2: Install Supabase JS client

**Files:**
- Modify: `package.json` (via yarn)

**Step 1: Install**

```bash
yarn add @supabase/supabase-js
```

**Step 2: Verify**

```bash
grep '"@supabase/supabase-js"' package.json
```
Expected: Line showing the package and version.

**Step 3: Commit**

```bash
git add package.json yarn.lock
git commit -m "feat: add @supabase/supabase-js dependency"
```

---

### Task 3: Create Supabase client

**Files:**
- Create: `utils/supabase.ts`

**Step 1: Create the file**

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

**Step 2: Verify no TypeScript errors**

Check the IDE diagnostics panel — no red underlines in the new file.

**Step 3: Commit**

```bash
git add utils/supabase.ts
git commit -m "feat: add supabase client singleton"
```

---

### Task 4: Replace fetchContentful with fetchLinks in utils/index.ts

**Files:**
- Modify: `utils/index.ts`

**Step 1: Read the current file**

Current contents of `utils/index.ts` for reference — it exports `capitalize`, `Link`, `PageProps`, `pageQuery`, and `fetchContentful`.

**Step 2: Remove the debug log added earlier**

The file currently has a temporary `console.log` in `fetchContentful`. We'll remove all of that as part of this replacement.

**Step 3: Rewrite the file**

Replace the entire contents with:

```typescript
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export interface Link {
  displayName: string;
  url: string;
  redirectPath: string;
}

export interface PageProps {
  pageName: string;
  pages: string[];
  links: Link[];
}

export async function fetchLinks(): Promise<Link[]> {
  const { supabase } = await import('./supabase');
  const { data, error } = await supabase
    .from('links')
    .select('display_name, url, redirectpath');

  if (error) {
    console.error('Supabase error:', error);
    return [];
  }

  return (data ?? []).map(row => ({
    displayName: row.display_name,
    url: row.url,
    redirectPath: row.redirectpath,
  }));
}
```

**Step 4: Verify**

Check IDE diagnostics — no errors in `utils/index.ts`.

**Step 5: Commit**

```bash
git add utils/index.ts
git commit -m "feat: replace fetchContentful with fetchLinks using supabase"
```

---

### Task 5: Update pages/index.tsx

**Files:**
- Modify: `pages/index.tsx`

**Step 1: Rewrite the file**

```typescript
import { GetStaticProps } from 'next';
import React from 'react';
import Layout from '../components/Layout';
import { fetchLinks, Link, PageProps } from '../utils';

export default function Home({ pageName, links, pages }: PageProps): JSX.Element {
  return (
    <Layout pageName={pageName} links={links} pages={pages} />
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const links = await fetchLinks();
  return {
    props: {
      pageName: '',
      links,
      pages: [],
    },
  };
};
```

**Step 2: Run dev server and verify**

```bash
yarn dev
```

Open `http://localhost:3000` — the page should render with links from Supabase as buttons.

**Step 3: Commit**

```bash
git add pages/index.tsx
git commit -m "feat: update index.tsx to fetch links from supabase"
```

---

### Task 6: Delete pages/[page].tsx

**Files:**
- Delete: `pages/[page].tsx`

**Step 1: Delete the file**

```bash
git rm pages/\[page\].tsx
```

**Step 2: Verify dev server still works**

```bash
yarn dev
```

Open `http://localhost:3000` — should still render correctly. Visiting any other route (e.g. `/home`) should now show the 404 page.

**Step 3: Commit**

```bash
git commit -m "feat: remove [page].tsx — site is now single-page"
```

---

### Task 7: Update scripts/prebuild.js

**Files:**
- Modify: `scripts/prebuild.js`

**Step 1: Rewrite the file**

```javascript
const { writeFileSync } = require('fs');
const path = require('path');
require('dotenv').config({ path: `${__dirname}/../.env.local` });

const main = async () => {
  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
  );

  const { data, error } = await supabase
    .from('links')
    .select('redirectpath, url');

  if (error) {
    console.error('Supabase error:', error);
    process.exit(1);
  }

  const redirects = (data ?? []).reduce((acc, { redirectpath, url }) => {
    return `${acc}/${redirectpath} ${url}\n`;
  }, '');

  writeFileSync(path.resolve(__dirname, '../out/_redirects'), redirects);
  console.log('_redirects written successfully');
};

main();
```

**Step 2: Test the build**

```bash
yarn build
```

Expected: Build completes, `out/_redirects` exists and contains redirect rules.

```bash
cat out/_redirects
```

Expected: Lines like `/ig https://instagram.com/...`

**Step 3: Commit**

```bash
git add scripts/prebuild.js
git commit -m "feat: update prebuild.js to fetch redirects from supabase"
```

---

### Task 8: Remove unused Contentful env vars from .env.local

**Files:**
- Modify: `.env.local`

**Step 1: Remove the old variables**

Delete these lines from `.env.local`:
```
SPACE_ID=...
ACCESS_TOKEN=...
```

**Step 2: Verify**

```bash
yarn dev
```

Expected: Dev server starts and page renders correctly — no references to old env vars remain.

**Step 3: Commit**

Note: Do NOT commit `.env.local` itself (it's in `.gitignore`). But if there is a `.env.example` or similar file that documents env vars, update it.

```bash
git status
```

If `.env.example` exists, update it and commit. Otherwise nothing to commit here.

---
