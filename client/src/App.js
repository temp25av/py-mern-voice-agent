import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import StatsPage from './pages/StatsPage'
import LeadsPage from './pages/LeadsPage'
import CallsPage from './pages/CallsPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: 'sans-serif' }}>

        {/* Navigation */}
        <nav style={{
          backgroundColor: '#1e293b',
          padding: '1rem 2rem',
          display: 'flex',
          gap: '2rem',
          alignItems: 'center'
        }}>
          <span style={{ color: 'white', fontWeight: 'bold', marginRight: '1rem' }}>
            Voice Agent
          </span>
          <NavLink to="/" style={navStyle} end>Stats</NavLink>
          <NavLink to="/leads" style={navStyle}>Leads</NavLink>
          <NavLink to="/calls" style={navStyle}>Calls</NavLink>
        </nav>

        {/* Page content */}
        <main style={{ padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<StatsPage />} />
            <Route path="/leads" element={<LeadsPage />} />
            <Route path="/calls" element={<CallsPage />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  )
}

// NavLink gets an isActive prop automatically from react-router
const navStyle = ({ isActive }) => ({
  color: isActive ? '#60a5fa' : '#94a3b8',
  textDecoration: 'none',
  fontWeight: isActive ? '600' : '400'
})

export default App