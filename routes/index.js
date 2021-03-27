'use strict';

const router = require('express').Router();

const client = require("./client");

router.use('/',client);

module.exports = router;