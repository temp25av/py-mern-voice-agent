const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()


const statsRouter = require('./routes/stats')
const leadsRouter = require('./routes/leads')
const callsRouter = require('./routes/calls')


// Middleware — these run on every request before it hits your routes
app.use(cors({ origin: 'http://localhost:3000' }))  // allow React to call us
app.use(express.json())                              // let us read JSON request bodies

app.use('/api/stats', statsRouter)
app.use('/api/leads', leadsRouter)
app.use('/api/calls', callsRouter)

app.get('/', (req, res) => {
    res.json({ message: 'Voice Agent API is running' })
})

// Connect to MongoDB, then start the server
const PORT = process.env.PORT || 4000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/voice-agent'

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connected')
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
    })
    .catch((err) => {
        console.error('MongoDB connection failed:', err.message)
    })