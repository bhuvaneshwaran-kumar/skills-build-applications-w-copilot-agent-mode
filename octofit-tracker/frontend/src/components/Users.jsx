import DataState from './DataState.jsx'
import { getDisplayName } from './api.js'
import useApiRecords from './useApiRecords.js'

function Users({ apiBaseUrl }) {
  const { endpoint, error, isLoading, records: users } = useApiRecords(apiBaseUrl, 'users')

  return (
    <DataState endpoint={endpoint} error={error} isLoading={isLoading} title="Users">
      <section className="data-panel">
        <div className="data-panel-header d-flex flex-column flex-md-row gap-2 justify-content-between align-items-md-center">
          <div>
            <h2 className="h4 mb-1">Users</h2>
            <code className="text-break">{endpoint}</code>
          </div>
          <span className="stat-pill">{users.length} records</span>
        </div>
        {users.length ? (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Team</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id || user.email}>
                    <td className="fw-semibold">{user.displayName || user.username}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{getDisplayName(user.team)}</td>
                    <td>{user.totalPoints ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state text-secondary">No users found.</div>
        )}
      </section>
    </DataState>
  )
}

export default Users