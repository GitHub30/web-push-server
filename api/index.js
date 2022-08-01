const app = require('express')();

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

module.exports = app;
