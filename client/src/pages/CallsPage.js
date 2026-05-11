import { useState } from 'react'
import API from '../api'

function CallsPage() {
    const [mobile, setMobile] = useState('')
    const [leadName, setLeadName] = useState('')
    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState('')

    const handleCall = async () => {
        if (!mobile || mobile.length < 10) {
            setStatus('error')
            setMessage('Please enter a valid mobile number')
            return
        }

        setStatus('loading')
        setMessage('')

        try {
            await API.post('/calls/make', { mobile, leadName })
            setStatus('success')
            setMessage('Call initiated successfully!')
            setMobile('')
            setLeadName('')
        } catch (err) {
            setStatus('error')
            setMessage('Could not initiate call. Is Python running?')
        }
    }

    return (
        <div>
            <h1>Make a Call</h1>
            <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                <div>
                    <label style={{ display: 'block', marginBottom: '4px' }}>Lead Name</label>
                    <input
                        type="text"
                        value={leadName}
                        onChange={e => setLeadName(e.target.value)}
                        placeholder="Rahul Sharma"
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '4px' }}>Mobile Number *</label>
                    <input
                        type="tel"
                        value={mobile}
                        onChange={e => setMobile(e.target.value)}
                        placeholder="9876543210"
                        style={inputStyle}
                    />
                </div>

                <button
                    onClick={handleCall}
                    disabled={status === 'loading'}
                    style={{
                        padding: '10px',
                        backgroundColor: status === 'loading' ? '#ccc' : '#2563eb',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    {status === 'loading' ? 'Initiating...' : 'Make Call'}
                </button>

                {message && (
                    <p style={{ color: status === 'error' ? 'red' : 'green' }}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    )
}

const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '1rem'
}

export default CallsPage