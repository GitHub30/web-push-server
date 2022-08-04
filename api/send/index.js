import express from 'express'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json({ type: '*/*' }))

import webpush from 'web-push'

const defaultVapidDetails = {
  subject: 'mailto:example@yourdomain.org',
  publicKey: 'BDd3_hVL9fZi9Ybo2UUzA284WG5FZR30_95YeZJsiApwXKpNcF1rRPF3foIiBHXRdJI2Qhumhf6_LFTeZaNndIo',
  privateKey: 'xKZKYRNdFFn8iQIF2MH54KTfUHwH105zBdzMR7SI3xI',
}

const send = o => webpush.sendNotification(o.subscription, JSON.stringify(o.payload || { title: 'Hello' }), {
  vapidDetails: { ...defaultVapidDetails, ...o.vapidDetails },
  headers: { Urgency: 'high' },
  TTL: 0
})

app.get('/api/send', async (req, res) => {
  if (req.query.json) res.json(await send(JSON.parse(req.query.json)))
  else res.send()
})

app.post('/api/send', async (req, res) => {
  res.json(await send(req.body))
})

export default app
