import LANG from '@renderer/LANG'

function LoadingScreen({
  message,
  visible = true,
}: {
  message: string
  visible: boolean
}) {
  return (
    <div id="wait" className="wait" style={{ display: visible ? 'block' : 'none' }}>
      <div className="centered-content">
        <div id="wait-title">{message}</div>
        <br />
        <div id="wait-progress"></div>
        <br />
        <img className="wait-icon" id="wait-icon" src="icons/loading.jpg" alt={LANG.loading} />
      </div>
    </div>
  )
}

export { LoadingScreen }
