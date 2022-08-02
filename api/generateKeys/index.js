import express from 'express'
import cors from 'cors'
const app = express()
app.use(cors())
app.set('json spaces', 2)

import webpush from 'web-push'

app.get('/api/generateKeys', async (req, res) => {
  res.json(webpush.generateVAPIDKeys())
})

export default app
