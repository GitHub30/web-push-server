const app = require('express')();
const { v4 } = require('uuid');

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

module.exports = app;
