const express = require('express');
const router = express.Router();
const isAuthenticated = require('./middleware/isAuthenticated');
require('../modules/telegram/telegram');
require('../modules/connectMongo');

router.get('/', isAuthenticated ,function(req, res, next) {
  if(req.user) return res.redirect('word/all')
});

module.exports = router;
