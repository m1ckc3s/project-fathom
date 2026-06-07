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

### Sizing the tap target (read before copying this)

The overlaid switch has to cover the whole button. The CSS in this repo uses a
quick `transform: scale()` hack — fine for this throwaway test. For a real
implementation, size it with `width/height: 100%` instead. Either way, you
**must** clip: the switch's hit box is a rectangle, so on a pill or circle the
corners outside the visible shape stay tappable and the haptic fires when you
tap just *next to* the button.

What this repo uses (quick test):

```css
.haptic-switch {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(6); /* over-cover, then let the clip trim it */
  opacity: 0;
}
.haptic-clip {
  overflow: hidden;
  border-radius: 999px;
}
```

Recommended for production:

```css
.haptic-switch {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; /* fill the button directly — no magic scale factor */
  opacity: 0;
}
.haptic-clip {
  overflow: hidden;
  border-radius: 999px; /* clip the hit area to the visible shape */
}
```

Use the `width/height: 100%` version — it's cleaner and self-fitting to any
button size. **In both cases keep the clip**, or the rectangular hit box makes
the area outside a rounded button tappable.

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
