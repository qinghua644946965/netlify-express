'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

function updateDatabase(data) {
  return data;
}

app.use(bodyParser);
app.post('/weather', (req, res) => {
  const newValue = updateDatabase(res.body);
  res.json(newValue);
});

module.exports = app;
module.exports.handler = serverless(app);