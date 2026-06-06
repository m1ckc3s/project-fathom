import { useState } from "react"

// Bump this by one every time we push a new deploy.
// On the phone it renders as "Test N" under the button, so a refresh
// that shows the new number confirms Vercel served the latest build.
const BUILD = 2

export default function App() {
  const [wobble, setWobble] = useState(0)

  return (
    <main className="stage">
      <h1 className="title">Web Haptics — outside native apps</h1>

      {/* Button sits centered in the space between the title and the footer. */}
      <div className="center">
        <div className="button-wrap">
          <span
            key={wobble}
            className={`fancy ${wobble ? "wobble" : ""}`}
            aria-hidden="true"
          >
            Play haptic
          </span>
          {/* Real native iOS switch layered invisibly over the pill — a direct
              finger tap toggles it and fires the Taptic Engine. Bumping the
              wobble counter restarts the shake on every tap. */}
          <input
            className="haptic-switch"
            type="checkbox"
            aria-label="Play haptic"
            ref={(el) => el?.setAttribute("switch", "")}
            onChange={() => setWobble((n) => n + 1)}
          />
        </div>
      </div>

      <div className="footer">
        <span className="marker">Test {BUILD}</span>
        <p className="note">iOS 26.5+ workaround · direct-tap switch haptic</p>
      </div>
    </main>
  )
}
