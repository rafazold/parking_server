const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
   console.log(`CALL: ${req.method} - ${req.url}`);
   next();
});

// add my routes here

app.listen(3000, () => {
    console.log('server is up')
});