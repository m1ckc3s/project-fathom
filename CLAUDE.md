# Project Fathom — experiment notes

A deliberately tiny React app used as a sandbox for one specific experiment.
Keep the surface area minimal so the experiment is the only interesting thing here.

## What this is right now

- Vite + React + TypeScript single-page app.
- One centered, pretty "Click me" button.
- A small `Test N` marker under the button (see `BUILD` in `src/App.tsx`).

## The `Test N` marker — how we verify deploys on a phone

Testing happens on a physical phone against the live Vercel deployment, not
locally. To confirm the phone is actually showing the newest build after a
push, bump the `BUILD` constant in `src/App.tsx` by one with every deploy.
The screen renders it as "Test 1", "Test 2", etc. — if the number changes
after a refresh, the new build is live.

**Always increment `BUILD` when pushing a change meant to be tested on-device.**

### When to bump the build (do this automatically)

Bump the marker on ANY action that produces a new deployment the owner can
refresh on their phone — judge by intent, don't wait for an exact phrase.
This includes (non-exhaustive):

- "push a build", "push this to test", "ship it"
- "commit this to main" / "let's commit this to main"
- "open a PR" / "let's PR this" / "raise a PR for this"
- merging a PR into `main`

**Rule of thumb:** if your next action creates a commit that will land on
`main` (directly, or via a PR that gets merged), bump first.

Every time, do all three:

1. Increment the `BUILD` constant in `src/App.tsx` by exactly one.
2. Stage + commit (Conventional Commits) — fold the bump into the same commit
   as the change being tested whenever possible.
3. Push (to `main`, or to the PR branch if working through a PR).

Why: the `Test N` marker must change with every deploy, so a phone refresh
showing the next number proves the new build is live. Never push a test build
without bumping `BUILD` first.

### Vercel deploy targets — important

- Pushes/merges to `main` → the **production** URL (what you test on your phone).
- PR branches → a separate **per-PR preview** URL, *not* the production URL.
  The bump still applies; just know it's a different link than production.

### Caveat

These are instructions to the assistant, followed best-effort — **not** an
automated hook. They only take effect when the assistant makes the commit in a
session that has loaded this file. For a hard, mechanical guarantee (bump on
every commit no matter who/what triggers it), add a git pre-commit or Claude
Code hook instead — ask the owner if that's wanted.

## Deploy flow

- `main` is connected to Vercel. Every push to `main` triggers a new deploy.
- The build command is `vite build` (intentionally *not* `tsc && vite build`)
  so TypeScript errors never block a deploy mid-experiment. Run `npm run
  typecheck` manually if you want type checking.

## The experiment

> TODO: the actual goal goes here. The owner will describe what we're trying
> to achieve with the button. Expect it to be something that sounds impossible
> at first — the point is to find a clever technique that makes it work,
> verified on a real phone.

## Conventions

- Keep dependencies near zero unless the experiment genuinely needs one.
- Commits: Conventional Commits (`feat:`, `fix:`, `style:`, `chore:`,
  `refactor:`).
