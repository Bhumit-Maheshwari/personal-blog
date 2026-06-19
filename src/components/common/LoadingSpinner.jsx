import './LoadingSpinner.css'

function LoadingSpinner() {
  return (
    <div className="loading-spinner-container" role="status" aria-label="Loading">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <p className="loading-text">Loading...</p>
    </div>
  )
}

export default LoadingSpinner