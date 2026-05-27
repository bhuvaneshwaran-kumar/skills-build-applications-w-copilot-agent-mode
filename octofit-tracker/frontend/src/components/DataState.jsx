function DataState({ children, endpoint, error, isLoading, title }) {
  if (isLoading) {
    return (
      <section className="data-panel">
        <div className="data-panel-header">
          <h2 className="h4 mb-1">{title}</h2>
          <code className="text-break">{endpoint}</code>
        </div>
        <div className="loading-state text-secondary">Loading records...</div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="data-panel">
        <div className="data-panel-header">
          <h2 className="h4 mb-1">{title}</h2>
          <code className="text-break">{endpoint}</code>
        </div>
        <div className="error-state text-danger">{error}</div>
      </section>
    )
  }

  return children
}

export default DataState