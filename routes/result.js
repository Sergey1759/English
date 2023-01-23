const express = require('express');
const router = express.Router();
const ApiResult = require('../api/result');
const isAuthenticated = require('./middleware/isAuthenticated');

router.get('/all', isAuthenticated,async function(req, res, next) {
    const results = await ApiResult.getByUserID(req.user.id);
    res.render('result-pages/all', { title: 'Express' , results});
});

router.get('/:id', isAuthenticated, async function(req, res, next) {
    const answers = await ApiResult.getByID(req.params.id);
    res.render('result-pages/answers', { title: 'Express' , answers });
});

module.exports = router;