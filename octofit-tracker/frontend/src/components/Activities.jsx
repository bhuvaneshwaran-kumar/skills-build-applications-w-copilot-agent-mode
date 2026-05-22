import DataState from './DataState.jsx'
import { formatDate, getDisplayName } from './api.js'
import useApiRecords from './useApiRecords.js'

function Activities({ apiBaseUrl }) {
  const { endpoint, error, isLoading, records: activities } = useApiRecords(apiBaseUrl, 'activities')

  return (
    <DataState endpoint={endpoint} error={error} isLoading={isLoading} title="Activities">
      <section className="data-panel">
        <div className="data-panel-header d-flex flex-column flex-md-row gap-2 justify-content-between align-items-md-center">
          <div>
            <h2 className="h4 mb-1">Activities</h2>
            <code className="text-break">{endpoint}</code>
          </div>
          <span className="stat-pill">{activities.length} records</span>
        </div>
        {activities.length ? (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>User</th>
                  <th>Duration</th>
                  <th>Distance</th>
                  <th>Calories</th>
                  <th>Points</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity._id || `${activity.activityType}-${activity.completedAt}`}>
                    <td className="fw-semibold text-capitalize">{activity.activityType}</td>
                    <td>{getDisplayName(activity.user)}</td>
                    <td>{activity.durationMinutes} min</td>
                    <td>{activity.distanceMiles ?? 0} mi</td>
                    <td>{activity.caloriesBurned ?? 0}</td>
                    <td>{activity.points ?? 0}</td>
                    <td>{formatDate(activity.completedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state text-secondary">No activities found.</div>
        )}
      </section>
    </DataState>
  )
}

export default Activities