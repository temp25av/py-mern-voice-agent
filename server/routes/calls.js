const express = require('express')
const router = express.Router()
const { makCall, getActiveCalls } = require('../services/pythonService')

// GET /api/calls/active — get currently active calls
router.get('/active', async (req, res) => {
    try {
        const calls = await getActiveCalls()
        res.json(calls)
    } catch (error) {
        console.error('Active calls error:', error.message)
        res.status(500).json({ error: 'Could not fetch active calls' })
    }
})

// POST /api/calls/make — trigger an outbound call
router.post('/make', async (req, res) => {
    try {
        const { mobile, leadName } = req.body

        if (!mobile) {
            return res.status(400).json({ error: 'Mobile number is required' })
        }

        const result = await makCall({ mobile, lead_name: leadName })
        res.status(200).json(result)
    } catch (error) {
        console.error('Make call error:', error.message)
        res.status(500).json({ error: 'Could not initiate call' })
    }
})

module.exports = router