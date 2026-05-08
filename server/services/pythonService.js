const axios = require('axios')

// This reads PYTHON_URL from your .env file
const pythonAPI = axios.create({
    baseURL: process.env.PYTHON_URL || 'http://localhost:5000',
    timeout: 10000, // if Python doesn't respond in 10 seconds, give up
})

// Each function below is a wrapper around one Python endpoint
// They all return the data, or throw an error for the route to handle

const getStats = async () => {
    const response = await pythonAPI.get('/api/stats')
    return response.data
}

const getLeads = async () => {
    const response = await pythonAPI.get('/api/leads')
    return response.data
}

const addLead = async (leadData) => {
    const response = await pythonAPI.post('/api/leads/add', leadData)
    return response.data
}

const makCall = async (callData) => {
    const response = await pythonAPI.post('/api/call/make', callData)
    return response.data
}

const getActiveCalls = async () => {
    const response = await pythonAPI.get('/api/active-calls')
    return response.data
}

module.exports = { getStats, getLeads, addLead, makCall, getActiveCalls }