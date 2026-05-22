import DataState from './DataState.jsx'
import useApiRecords from './useApiRecords.js'

function Workouts({ apiBaseUrl }) {
  const { endpoint, error, isLoading, records: workouts } = useApiRecords(apiBaseUrl, 'workouts')

  return (
    <DataState endpoint={endpoint} error={error} isLoading={isLoading} title="Workouts">
      <section className="data-panel">
        <div className="data-panel-header d-flex flex-column flex-md-row gap-2 justify-content-between align-items-md-center">
          <div>
            <h2 className="h4 mb-1">Workouts</h2>
            <code className="text-break">{endpoint}</code>
          </div>
          <span className="stat-pill">{workouts.length} records</span>
        </div>
        {workouts.length ? (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Workout</th>
                  <th>Difficulty</th>
                  <th>Duration</th>
                  <th>Focus</th>
                  <th>Exercises</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout) => (
                  <tr key={workout._id || workout.title}>
                    <td>
                      <div className="fw-semibold">{workout.title}</div>
                      <div className="text-secondary small">{workout.description}</div>
                    </td>
                    <td><span className="badge badge-soft text-capitalize">{workout.difficulty}</span></td>
                    <td>{workout.durationMinutes} min</td>
                    <td className="text-capitalize">{workout.targetActivityType || 'general'}</td>
                    <td>{Array.isArray(workout.exercises) ? workout.exercises.join(', ') : 'No exercises listed'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state text-secondary">No workouts found.</div>
        )}
      </section>
    </DataState>
  )
}

export default Workouts