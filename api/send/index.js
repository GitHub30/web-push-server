const express = require('express')
const app = express()
app.use(express.json({ type: '*/*' }))
const webpush = require('web-push')

const defaultVapidDetails = {
  subject: 'mailto:example@yourdomain.org',
  publicKey: 'BDd3_hVL9fZi9Ybo2UUzA284WG5FZR30_95YeZJsiApwXKpNcF1rRPF3foIiBHXRdJI2Qhumhf6_LFTeZaNndIo',
  privateKey: 'xKZKYRNdFFn8iQIF2MH54KTfUHwH105zBdzMR7SI3xI',
}

const send = o => {
  const options = {
    vapidDetails: o.vapidDetails || defaultVapidDetails
  }
  if (o.gcmAPIKey) options.gcmAPIKey = o.gcmAPIKey
  return webpush.sendNotification(o.subscription, o.payload || 'Hello', options)
}

app.get('/api/send', async (req, res) => {
  if (req.query.json) res.json(await send(JSON.parse(req.query.json)))
  else res.send()
})

app.post('/api/send', async (req, res) => {
  res.json(await send(req.body))
})

module.exports = app;
