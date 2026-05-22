import DataState from './DataState.jsx'
import { getDisplayName } from './api.js'
import useApiRecords from './useApiRecords.js'

function Teams({ apiBaseUrl }) {
  const { endpoint, error, isLoading, records: teams } = useApiRecords(apiBaseUrl, 'teams')

  return (
    <DataState endpoint={endpoint} error={error} isLoading={isLoading} title="Teams">
      <section className="data-panel">
        <div className="data-panel-header d-flex flex-column flex-md-row gap-2 justify-content-between align-items-md-center">
          <div>
            <h2 className="h4 mb-1">Teams</h2>
            <code className="text-break">{endpoint}</code>
          </div>
          <span className="stat-pill">{teams.length} records</span>
        </div>
        {teams.length ? (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Team</th>
                  <th>Description</th>
                  <th>Members</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team._id || team.name}>
                    <td className="fw-semibold">{team.name}</td>
                    <td>{team.description || 'No description'}</td>
                    <td>{Array.isArray(team.members) ? team.members.map(getDisplayName).join(', ') : 'No members'}</td>
                    <td>{team.totalPoints ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state text-secondary">No teams found.</div>
        )}
      </section>
    </DataState>
  )
}

export default Teams