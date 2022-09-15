'use strict';
const express = require('express');
var cors = require('cors')
var request = require("request");
const path = require('path');
const serverless = require('serverless-http');
const app = express();
app.use(cors())
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
  res.send('Serverless  Express!')
});
router.get('/about', (req, res) => {
  res.send('About birds')
})
router.get('/weather/:city', (req, res) => {
  const city = req.params.city;
  console.log("req.params.city",city);
  if(city){
    console.log("encodeURI city",encodeURIComponent(city));
    var options = {
      method: "POST",
      url: "https://way.jd.com/jisuapi/weather?city="+encodeURIComponent(city)+"&appkey=1249e6ecf8b79c0c403105a14b0dc36e",
      headers: {},
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      res.send(response.body);
    });
  }else{
    res.send("未设置参数city");
  }
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
