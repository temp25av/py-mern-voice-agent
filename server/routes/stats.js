const express = require('express')
const router = express.Router()
const { getStats } = require('../services/pythonService')

// GET /api/stats
router.get('/', async (req, res) => {
    try {
        const stats = await getStats()
        res.json(stats)
    } catch (error) {
        console.error('Stats error:', error.message)
        res.status(500).json({ error: 'Could not fetch stats from Python service' })
    }
})

module.exports = router