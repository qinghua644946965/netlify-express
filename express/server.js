'use strict';
const express = require('express');
const serverless = require('serverless-http');
var cors = require('cors')
var request = require("request");
const app = express();
app.use(cors())
const bodyParser = require('body-parser');

var ds = {};

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!!!!!!!!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));
router.get('/set/:key/:value', (req, res) => {
    var key = req.params.key;
    var value = req.params.value;
    console.log("req.params",req.params);
    ds[key]=value;
    res.send("设置成功！");
});

router.get('/get/:key', (req, res) => {
    var key = req.params.key;
    res.send(ds[key]);
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
