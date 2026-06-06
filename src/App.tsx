import { useState } from "react"

// Bump this by one every time we push a new deploy.
// On the phone it renders as "Test N" under the button, so a refresh
// that shows the new number confirms Vercel served the latest build.
const BUILD = 3

export default function App() {
  const [wobble, setWobble] = useState(0)

  return (
    <main className="stage">
      <h1 className="title">Web Haptics — outside native apps</h1>

      <div className="button-wrap">
        <span
          key={wobble}
          className={`fancy ${wobble ? "wobble" : ""}`}
          aria-hidden="true"
        >
          Play haptic
        </span>
        {/* Real native iOS switch, layered invisibly over the pill and clipped
            to its bounds so the tap target matches the button exactly. A direct
            finger tap toggles it and fires the Taptic Engine; bumping the wobble
            counter restarts the shake on every tap. */}
        <span className="haptic-clip">
          <input
            className="haptic-switch"
            type="checkbox"
            aria-label="Play haptic"
            ref={(el) => el?.setAttribute("switch", "")}
            onChange={() => setWobble((n) => n + 1)}
          />
        </span>
      </div>

      <div className="footer">
        <span className="marker">Test {BUILD}</span>
        <p className="note">iOS 26.5+ workaround · direct-tap switch haptic</p>
      </div>
    </main>
  )
}
