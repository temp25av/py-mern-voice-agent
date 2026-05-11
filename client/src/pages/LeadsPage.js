import { useState, useEffect } from 'react'
import API from '../api'

function LeadsPage() {
    const [leads, setLeads] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        API.get('/leads')
            .then(res => {
                setLeads(res.data)
                setLoading(false)
            })
            .catch(err => {
                setError('Could not load leads')
                setLoading(false)
            })
    }, [])

    if (loading) return <p>Loading leads...</p>
    if (error) return <p style={{ color: 'red' }}>{error}</p>

    return (
        <div>
            <h1>Leads</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                        <th style={th}>Name</th>
                        <th style={th}>Mobile</th>
                        <th style={th}>Interested In</th>
                        <th style={th}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.length === 0 ? (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>
                                No leads found
                            </td>
                        </tr>
                    ) : (
                        leads.map((lead, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={td}>{lead.name}</td>
                                <td style={td}>{lead.mobile}</td>
                                <td style={td}>{lead.interested_model}</td>
                                <td style={td}>{lead.temperature}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

// Inline styles as variables — cleaner than repeating objects
const th = { padding: '12px', textAlign: 'left', fontWeight: '600' }
const td = { padding: '12px' }

export default LeadsPage