const express = require('express')
const app = express()
app.use(express.json({ type: '*/*' }))
const webpush = require('web-push')

const defaultVapidDetails = {
  subject: 'mailto:example@yourdomain.org',
  publicKey: 'BDd3_hVL9fZi9Ybo2UUzA284WG5FZR30_95YeZJsiApwXKpNcF1rRPF3foIiBHXRdJI2Qhumhf6_LFTeZaNndIo',
  privateKey: 'xKZKYRNdFFn8iQIF2MH54KTfUHwH105zBdzMR7SI3xI',
}

app.get('/api/send', async (req, res) => {
  console.log(req.query)
  if (req.query.json) console.log(JSON.parse(req.query.json))
  res.send('Hello')
})

app.post('/api/send', async (req, res) => {
  console.log(req.body)
  // https://github.com/web-push-libs/web-push/blob/master/README.md#sendnotificationpushsubscription-payload-options
  const options = {
    vapidDetails: req.body.vapidDetails || defaultVapidDetails
  }
  if (req.body.gcmAPIKey) options.gcmAPIKey = req.body.gcmAPIKey
  res.json(await webpush.sendNotification(req.body.subscription, req.body.payload || 'Hello', options))
})

module.exports = app;
