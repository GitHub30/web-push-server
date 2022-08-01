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
  // VAPID keys should be generated only once.
  const vapidKeys = {
    publicKey: 'BDd3_hVL9fZi9Ybo2UUzA284WG5FZR30_95YeZJsiA' +
      'pwXKpNcF1rRPF3foIiBHXRdJI2Qhumhf6_LFTeZaNndIo',
    privateKey: 'xKZKYRNdFFn8iQIF2MH54KTfUHwH105zBdzMR7SI3xI',
  };

  //webpush.setGCMAPIKey('973975048110');
  webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );

  // This is the same output of calling JSON.stringify on a PushSubscription
  const pushSubscription ={
      "endpoint": "https://fcm.googleapis.com/fcm/send/coL3MKSd90E:APA91bEolR9tqMHVfVcY0GpYQyOijLMqPEFHQGpKsu2XQJmhSqL_4Ux13YXsDRlYfeBZ5GJ7JJznAh2DHynIXItHt10mO3L3Sd01qtwhESOf3bYe801aXwB17gtg-HWFjc6ngovhrC9F",
      "expirationTime": null,
      "keys": {
        "p256dh": "BJxnaXF1Nwqslt0lsgdmc3fCPPFTLYrUI9pzHvY_E7L5Ts9TaTSZMw7No4QhrbQO5EVLSYYCdBt625IYgUj0Z9Q",
        "auth": "ldThH2W3BXgXuXrW2apKtw"
      }
    };

  res.json(await webpush.sendNotification(pushSubscription, '2Your Push Payload Text'));
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
