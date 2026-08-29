# Deploying a Web App to GitHub Pages — A Step-by-Step Guide

This guide covers deploying three kinds of projects to GitHub Pages:

1. **Plain static HTML** (a single `index.html`, maybe a few pages, no build step)
2. **HTML + vanilla JS/CSS** (multiple files, still no build step)
3. **A React (or other framework) app built with a bundler** like Vite, Create React App, or Next.js (static export) — this repo's `sap-web` is this case

Each case shares the same underlying platform (GitHub Pages) but differs in one key way: **does your project need a "build step" before it's ready to serve?** Plain HTML/JS doesn't. A React app does — the code you write isn't what a browser runs directly; a bundler (Vite, Webpack, etc.) compiles it first into plain HTML/CSS/JS.

That difference is why the deployment mechanics diverge, and it's the thread running through this whole guide.

---

## Part 1 — What GitHub Pages actually is

GitHub Pages is a **static file host** built into every GitHub repository. "Static" means: it can only serve files exactly as they are — HTML, CSS, JS, images, fonts — with no server-side code (no PHP, no Node.js server, no database queries). Whatever gets requested, GitHub Pages hands back the literal bytes of a file in your repo.

This is enough for the vast majority of front-end apps today, including single-page apps (SPAs) built with React, Vue, or Svelte — because those frameworks also compile down to static HTML/CSS/JS in the end. The "dynamic" part of a modern web app usually lives in a separate backend API that the static frontend talks to over HTTP — GitHub Pages just can't be that backend.

### Two ways GitHub Pages can get its files

| Method | How it works | Best for |
|---|---|---|
| **Deploy from a branch** | You point Pages at a branch (and optionally a folder like `/docs`) in your repo. Whatever's committed there is what gets served. | Plain HTML/JS/CSS with no build step |
| **Deploy via GitHub Actions** | A workflow (a `.yml` file) runs on GitHub's servers, builds your project (e.g. `npm run build`), and uploads the *output* of that build to Pages. | Anything with a build step — React, Vue, Vite, Webpack, etc. |

You pick one or the other in your repo's **Settings → Pages → Build and deployment → Source**.

---

## Part 2 — Deploying plain static HTML (no build step)

This is the simplest case: you have an `index.html` (and maybe `style.css`, `script.js`, images) and want it live at a URL.

### Step 1: Get the files into a GitHub repo

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

### Step 2: Turn on Pages, pointed at that branch

1. Go to your repo on GitHub → **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Under **Branch**, choose `main` (or whichever branch has your HTML) and `/ (root)` as the folder — or `/docs` if your HTML lives in a `docs/` folder.
4. Click **Save**.

### Step 3: Wait, then visit the URL

GitHub takes 1–3 minutes for the first deploy. Your site will be live at:

```
https://<your-username>.github.io/<your-repo>/
```

(If your repo is named exactly `<your-username>.github.io`, it's served from the domain root instead, with no `/repo-name/` in the path — this is the special "user/organization site" case.)

### That's the whole process for static HTML

Every time you `git push` a change to that branch, GitHub Pages picks it up automatically and republishes within a minute or two. No build step, no extra config.

### One gotcha: relative links

Since your project site is served from a **subfolder** (`/<repo-name>/`), not the domain root, any absolute link like `<img src="/logo.png">` will break — the browser looks for `/logo.png` at the domain root, not inside `/<repo-name>/logo.png`. Fix by using **relative** paths instead: `<img src="logo.png">` or `<img src="./logo.png">`, or a path relative to the current file (`../images/logo.png`).

---

## Part 3 — Deploying HTML + vanilla JS/CSS (multi-file, still no build)

Identical to Part 2. GitHub Pages doesn't care how many files you have or how they reference each other — as long as there's no compilation step, "deploy from a branch" works exactly the same way. Just make sure:

- Your entry point is named `index.html` at the root of whatever folder you pointed Pages at (GitHub Pages looks for `index.html` by default when someone visits the bare URL).
- All your `<script src="...">` and `<link href="...">` tags use relative paths, per the gotcha above.

If your JS makes `fetch()` calls to an API, remember GitHub Pages itself can't run that API — you'd need a separate backend host (a serverless function, a small server elsewhere, etc.) and just call it via its own URL from your static JS.

---

## Part 4 — Deploying a build-step app (React, Vite, Webpack, etc.)

This is the more involved case, because there's a step GitHub doesn't know about by default: **turning your source code into the static files Pages can serve.** That's what `npm run build` does — it produces a `dist/` (or `build/`) folder full of plain HTML/CSS/JS, ready to be hosted anywhere static.

You have two options here:

- **Option A — build locally, push the output.** Simple but manual — you have to remember to rebuild and push every time.
- **Option B — let GitHub Actions build it automatically on every push.** More setup up front, but after that it's fully automatic. **This is the recommended approach**, and it's what this repo (`sap-web`) actually uses.

We'll cover Option B in full detail, since it's the durable solution.

### Step 1: Make sure your build tool knows about the subfolder

Just like Part 2's relative-links gotcha, but at the build-tool level: your bundler needs to know the app will live at `https://<username>.github.io/<repo-name>/`, not the domain root, so it can prefix all the asset URLs it generates correctly.

**For Vite** (what this repo uses), set `base` in `vite.config.ts`:

```ts
export default defineConfig({
  base: '/<repo-name>/',
  // ...
})
```

**For Create React App**, set `"homepage"` in `package.json`:

```json
{
  "homepage": "https://<username>.github.io/<repo-name>"
}
```

**For Next.js (static export)**, set `basePath` in `next.config.js`:

```js
module.exports = {
  output: 'export',
  basePath: '/<repo-name>',
}
```

> **Tip used in this repo:** rather than hard-coding the subfolder path permanently (which would break local development, where the app runs at the domain root), `sap-web`'s `vite.config.ts` only applies the subfolder path when a `GITHUB_PAGES` environment variable is set — and only the deploy workflow sets that variable. `npm run dev` and a normal `npm run build` are unaffected.

### Step 2: Handle client-side routing (single-page apps only)

If your app uses a router (React Router, Vue Router, etc.) that changes the URL without a full page reload — e.g. `/profile`, `/settings` — there's a real problem: GitHub Pages has **no server to rewrite requests**. If a user directly loads `https://yoursite.com/repo/profile` (via a bookmark, a refresh, or a shared link), GitHub Pages looks for an actual file at that path, finds nothing, and returns its 404 page — even though your JavaScript router knows exactly what `/profile` should show.

**The fix:** copy your built `index.html` to `404.html` after the build. GitHub Pages serves `404.html` for any URL it can't otherwise resolve — and since that file *is* your app's entry point, the browser loads your JS, your router reads the real URL from the address bar (which never actually changed), and renders the right page. The user never even sees an error.

```bash
cp dist/index.html dist/404.html
```

(Skip this step entirely if your project has no client-side router — a plain multi-page site doesn't need it.)

### Step 3: Write the GitHub Actions workflow

Create a file at exactly this path in your repo — GitHub only looks here for workflows:

```
.github/workflows/deploy.yml
```

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:      # lets you also trigger it manually from the Actions tab

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci
      - run: npm run build
        env:
          GITHUB_PAGES: "true"   # only relevant if your build config checks for this, per Step 1's tip

      - run: cp dist/index.html dist/404.html   # skip if no client-side router

      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist   # or "build" for Create React App, "out" for Next.js export

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Swap `npm ci` / `npm run build` for your project's actual install/build commands if you're not using npm (e.g. `pnpm install` / `pnpm build`, or `yarn install` / `yarn build`).

### Step 4: Tell GitHub Pages to use this workflow

1. Go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions** (not "Deploy from a branch" — that's the other method from Part 2, and the two are mutually exclusive).

If you'd rather do this from the command line instead of the web UI (useful for scripting, or if you're using the `gh` CLI):

```bash
gh api repos/<owner>/<repo>/pages -X POST -f build_type=workflow
```

### Step 5: Push and watch it deploy

```bash
git add .github/workflows/deploy.yml vite.config.ts   # or whichever files you changed
git commit -m "Add GitHub Pages deployment"
git push
```

Go to your repo's **Actions** tab — you'll see the workflow run start automatically. It typically takes 1–3 minutes. Once it finishes, your app is live at:

```
https://<username>.github.io/<repo-name>/
```

From now on, **every push to `main` triggers a fresh build and deploy automatically** — no manual steps needed.

---

## Part 5 — A GitHub-account gotcha: private repos

GitHub Pages for a **private** repository requires a paid GitHub plan (Pro, Team, or Enterprise) — the free plan only supports Pages on **public** repos. If you try to enable Pages on a private repo on the free plan, you'll get an error like:

```
Your current plan does not support GitHub Pages for this repository.
```

Your options if you hit this:
- Make the repo public (free, but the source code and history become world-visible — fine for demos/prototypes, not for anything with secrets or proprietary code).
- Upgrade to a paid GitHub plan.
- Use a different static host that supports private repos on free tiers — Vercel and Netlify both do, and both deploy from the same kind of build output.

---

## Part 6 — Custom domains (optional)

If you own a domain (e.g. `myapp.com`) and want the site there instead of `github.io`:

1. In **Settings → Pages**, enter your domain under **Custom domain**. GitHub creates a `CNAME` file in your repo automatically.
2. At your domain registrar, add a DNS record pointing to GitHub:
   - For an apex domain (`myapp.com`): four `A` records pointing to GitHub's Pages IPs (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`).
   - For a subdomain (`www.myapp.com` or `app.myapp.com`): a `CNAME` record pointing to `<username>.github.io`.
3. Wait for DNS to propagate (can take minutes to a day), then check **Enforce HTTPS** in the Pages settings once GitHub shows the domain as verified.

> If you're using a build-step app with a `base`/`basePath` config (Part 4, Step 1), remember to change it back to `/` once you're on a custom domain at the root — the subfolder-prefix problem only exists because `github.io/<repo-name>/` isn't your domain's root.

---

## Part 7 — Quick troubleshooting checklist

| Symptom | Likely cause |
|---|---|
| Page loads but is unstyled / missing images | Asset paths are absolute (`/style.css`) instead of relative, or the bundler's `base`/`homepage` config is missing or wrong (Parts 2 and 4) |
| Blank white page, console shows 404s for `.js`/`.css` files | Same as above — check the built `index.html`'s `<script>`/`<link>` tags for the actual URLs being requested |
| Refreshing on `/some/route` shows a 404 | Missing the `404.html` copy trick for client-side routing (Part 4, Step 2) |
| "Your current plan does not support GitHub Pages" | Repo is private on the free plan (Part 5) |
| Workflow runs but the site doesn't update | Check the Actions tab for the run's logs — a failed `npm run build` step (a TypeScript error, etc.) still shows as a failed run even if Pages itself is configured correctly |
| 404 on the whole site, even the homepage | Pages Source setting doesn't match your deployment method — "Deploy from a branch" and "GitHub Actions" are mutually exclusive; make sure the one you configured matches Part 2 or Part 4 |

---

## Summary: which path am I on?

```
Does your project need a build step (npm run build, or similar)?
│
├── No — it's plain HTML/CSS/JS
│   └── Part 2/3: Settings → Pages → "Deploy from a branch" → push and done
│
└── Yes — React, Vue, Vite, Webpack, Next.js, etc.
    └── Part 4: configure base path → add 404.html copy (if using a router)
        → write a GitHub Actions workflow → Settings → Pages → "GitHub Actions"
        → push, and every future push auto-deploys
```

This repo (`sap-web`) is the second case — see `.github/workflows/deploy-pages.yml` and `vite.config.ts` in this project for a working, real example of everything in Part 4.
