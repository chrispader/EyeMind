import { NavLink } from 'react-router'

export function AnalysisPage(): React.ReactElement {
  return (
    <div className="main-view" id="main-view">
      <div className="row">
        <NavLink to="/eye-tracking" id="eye-tracking" className="btn eye-tracking">
          Eye-tracking
        </NavLink>
        <NavLink to="/analysis" id="analysis" className="btn analysis">
          Analysis
        </NavLink>
      </div>
    </div>
  )
}
