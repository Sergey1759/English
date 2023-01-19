const express = require('express');
const router = express.Router();

require('../modules/telegram');
require('../modules/connectMongo');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
