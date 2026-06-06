// Bump this by one every time we push a new deploy.
// On the phone it renders as "Test N" under the button, so a refresh
// that shows the new number confirms Vercel served the latest build.
const BUILD = 1

export default function App() {
  return (
    <main className="stage">
      <button className="fancy" type="button">
        Click me
      </button>
      <span className="marker">Test {BUILD}</span>
    </main>
  )
}
