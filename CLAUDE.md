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
