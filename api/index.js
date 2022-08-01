const app = require('express')();

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.get("/api", (req, res) => {
  res.send("Express on Vercel from api");
});

module.exports = app;
