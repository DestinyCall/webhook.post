require('./config/config');
require('./db/mongoose');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Use the body-parser package in our application
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Import Route
const webhook = require('./routes');

app.use('/', webhook);

const PORT = process.env.PORT || 7001;

app.listen(PORT, () =>
{
  console.log(`Server is running on port ${PORT}.`);
});