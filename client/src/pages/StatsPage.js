import { useState, useEffect } from 'react'
import API from '../api'

function StatsPage() {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await API.get('/stats')
                setStats(res.data)
            } catch (err) {
                setError('Could not load stats')
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    if (loading) return <p>Loading stats...</p>
    if (error) return <p style={{ color: 'red' }}>{error}</p>

    return (
        <div>
            <h1>Dashboard</h1>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <StatCard label="Total Leads" value={stats?.total_leads} />
                <StatCard label="Calls Today" value={stats?.calls_today} />
                <StatCard label="Hot Leads" value={stats?.hot_leads} />
            </div>
        </div>
    )
}

function StatCard({ label, value }) {
    return (
        <div style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px', minWidth: '140px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{value ?? '—'}</div>
            <div style={{ color: '#666', marginTop: '4px' }}>{label}</div>
        </div>
    )
}

export default StatsPage