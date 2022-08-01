const express = require('express')
const app = express()
app.use(express.json({type: '*/*'}))
const webpush = require('web-push')

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
  console.log(req.body);
  res.send('Got a POST request: ' + typeof req.body)
})

module.exports = app;
