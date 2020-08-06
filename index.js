require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const slotRoutes = require('./routes/slots');
const rateLimit = require("express-rate-limit");
console.log(process.env.RATELIMIT);
 
const limiter = rateLimit({
  windowMs: 1000 * 10 * 100, 
  max: process.env.RATELIMIT || 10,
  message: {
    error: "Too many requests"
  }
});
 
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`CALL: ${req.method} - ${req.url}`);
    next();
});

app.use(limiter);

slotRoutes(app);

app.listen(3000, () => {
    console.log('server is up')
});