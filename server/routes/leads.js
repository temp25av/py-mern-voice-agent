const express = require('express')
const router = express.Router()
const { getLeads, addLead } = require('../services/pythonService')

// GET /api/leads — fetch all leads
router.get('/', async (req, res) => {
    try {
        const leads = await getLeads()
        res.json(leads)
    } catch (error) {
        console.error('Leads fetch error:', error.message)
        res.status(500).json({ error: 'Could not fetch leads' })
    }
})

// POST /api/leads — add a new lead
router.post('/', async (req, res) => {
    try {
        // req.body contains whatever React sent us
        const { name, mobile, interestedModel } = req.body

        // Basic validation — don't forward garbage to Python
        if (!name || !mobile) {
            return res.status(400).json({ error: 'Name and mobile are required' })
        }

        const result = await addLead({ name, mobile, interested_model: interestedModel })
        res.status(201).json(result)
    } catch (error) {
        console.error('Add lead error:', error.message)
        res.status(500).json({ error: 'Could not add lead' })
    }
})

module.exports = router