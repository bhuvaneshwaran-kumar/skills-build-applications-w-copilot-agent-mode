import DataState from './DataState.jsx'
import { getDisplayName } from './api.js'
import useApiRecords from './useApiRecords.js'

function Leaderboard({ apiBaseUrl }) {
  const { endpoint, error, isLoading, records: leaderboard } = useApiRecords(apiBaseUrl, 'leaderboard')

  return (
    <DataState endpoint={endpoint} error={error} isLoading={isLoading} title="Leaderboard">
      <section className="data-panel">
        <div className="data-panel-header d-flex flex-column flex-md-row gap-2 justify-content-between align-items-md-center">
          <div>
            <h2 className="h4 mb-1">Leaderboard</h2>
            <code className="text-break">{endpoint}</code>
          </div>
          <span className="stat-pill">{leaderboard.length} records</span>
        </div>
        {leaderboard.length ? (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Team</th>
                  <th>Period</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry) => (
                  <tr key={entry._id || `${entry.rank}-${entry.period}`}>
                    <td className="fw-semibold">#{entry.rank}</td>
                    <td>{getDisplayName(entry.user)}</td>
                    <td>{getDisplayName(entry.team)}</td>
                    <td><span className="badge badge-soft text-capitalize">{entry.period || 'weekly'}</span></td>
                    <td>{entry.points ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state text-secondary">No leaderboard entries found.</div>
        )}
      </section>
    </DataState>
  )
}

export default Leaderboard