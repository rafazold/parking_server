const express = require('express');
const bodyParser = require('body-parser');
const slotRoutes = require('./routes/slots');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
   console.log(`CALL: ${req.method} - ${req.url}`);
   next();
});

slotRoutes(app);

app.listen(3000, () => {
    console.log('server is up')
});