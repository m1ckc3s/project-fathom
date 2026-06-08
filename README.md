# Project Fathom — a web button that plays a native iOS haptic

> I wanted a button on a *web page* that plays a haptic on tap — something I'd
> personally never seen. Turns out other repos and packages had added haptics on
> the web too, and Apple recently patched the usual approach in **iOS 26.5**.
> This is a small UX trick that still works: disguise a native control as a
> button so a real tap fires the haptic.

No native app, no plugin, no permission prompt. Verified on a physical iPhone
running iOS 26.5.

## How it works

iOS has never shipped the web [Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate).
But WebKit's native switch control — `<input type="checkbox" switch>` (Safari
17.4 / iOS 18+) — makes the **system** play a haptic tick when it's toggled.

So I lay a real, native switch invisibly over a normal-looking button
(`opacity: 0`, clipped to the button's bounds) so your finger directly toggles
the control and iOS plays the tick. The visible pill is just decoration; the
thing you actually tap is the switch.

The catch: as of iOS 26.5, only a **direct tap** fires the haptic — it can't be
triggered from script anymore. That's exactly what a button needs, so it works.

### Sizing the tap target

The overlaid switch has to cover the whole button. Size it with
`width/height: 100%` so it fills the button regardless of the control's
intrinsic shape (otherwise the small native control leaves dead zones — most
visible on non-WebKit browsers, where `switch` falls back to a tiny checkbox).

Then round the **hit** area with `clip-path`. This is the part people get wrong:
`overflow: hidden` + `border-radius` only clip *paint*, not hit-testing, so the
rectangular hit box still fires when you tap the corners just outside a pill or
circle. `clip-path` clips hit-testing too.

```css
.haptic-switch {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;                    /* fill the button — no intrinsic-size guesswork */
  opacity: 0;
  clip-path: inset(0 round 999px); /* match the button radius; clips hits, not just paint */
}
```

## Limitations

- **System tick only** — not custom Core Haptics waveforms.
- **Native appearance required** — stripping the control's look disables the haptic.
- **WebKit only** — iOS Safari and Chrome. On Android, use `navigator.vibrate()`.
- **Direct taps only** — no script-triggered haptics on iOS 26.5+.

## Running it

```bash
npm install
npm run dev
```

Vite + React + TypeScript. The on-screen `version X.Y` marker just confirms a
fresh deploy is live after a phone refresh. The technique lives in
[`src/App.tsx`](src/App.tsx) and [`src/index.css`](src/index.css).
