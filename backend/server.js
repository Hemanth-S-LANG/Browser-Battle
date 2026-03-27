import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Contact from './models/Contact.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }))

// ── MongoDB Connection ───────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err.message))

// ── Contact Form — Save to DB ────────────────────────────
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    // Validation
    if (!name?.trim())    return res.status(400).json({ error: 'Name is required' })
    if (!email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
                          return res.status(400).json({ error: 'Valid email is required' })
    if (!subject?.trim()) return res.status(400).json({ error: 'Subject is required' })
    if (!message?.trim() || message.length < 10)
                          return res.status(400).json({ error: 'Message must be at least 10 characters' })

    const contact = await Contact.create({ name, email, subject, message })
    res.status(201).json({ success: true, message: 'Message received! We will get back to you soon.', id: contact._id })
  } catch (err) {
    console.error('Contact error:', err.message)
    res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
})

// ── Get all contact submissions (admin) ──────────────────
app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    res.json(contacts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`))
