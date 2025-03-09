export function Home(): React.ReactElement {
  return (
    <div className="main-view" id="main-view">
      <div className="row">
        <button id="eye-tracking" className="btn eye-tracking">
          Eye-tracking
        </button>
        <button id="analysis" className="btn analysis">
          Analysis
        </button>
      </div>
    </div>
  )
}
