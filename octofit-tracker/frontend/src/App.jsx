import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import logo from '../../../docs/octofitapp-small.png'
import './App.css'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/activities', label: 'Activities' },
  { to: '/teams', label: 'Teams' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header border-bottom bg-white">
        <nav className="navbar navbar-expand-lg container-xxl py-3">
          <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/users">
            <img src={logo} alt="OctoFit" width="44" height="44" />
            <span>OctoFit Tracker</span>
          </NavLink>
          <div className="navbar-nav flex-row flex-wrap gap-2 ms-lg-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded-2 ${isActive ? 'active bg-primary text-white' : 'text-body'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <main className="container-xxl py-4 py-lg-5">
        <section className="mb-4">
          <p className="eyebrow text-uppercase fw-semibold mb-2">Multi-tier fitness management</p>
          <h1 className="display-5 fw-semibold mb-3">OctoFit Tracker</h1>
          <div className="api-status d-flex flex-column flex-md-row gap-2 align-items-md-center justify-content-between">
            <span className="text-secondary">API base URL</span>
            <code className="text-break">{apiBaseUrl}</code>
          </div>
        </section>

        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users apiBaseUrl={apiBaseUrl} />} />
          <Route path="/activities" element={<Activities apiBaseUrl={apiBaseUrl} />} />
          <Route path="/teams" element={<Teams apiBaseUrl={apiBaseUrl} />} />
          <Route path="/leaderboard" element={<Leaderboard apiBaseUrl={apiBaseUrl} />} />
          <Route path="/workouts" element={<Workouts apiBaseUrl={apiBaseUrl} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
