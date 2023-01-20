const express = require('express');
const router = express.Router();
const ApiWords = require('../api/word');
const Token = require('../modules/token')

router.get('/createTest', async function(req, res, next) {
    let verified = Token.verify(req.cookies.token);
    const allWords = await ApiWords.getByUserId(verified.user.id);
    res.render('create-test', { title: 'Express' , allWords});
});

router.get('/testingText', async function(req, res, next) {
    let verified = Token.verify(req.cookies.token);
    const allWords = await ApiWords.getByUserId(verified.user.id);
    let JsonWords = JSON.stringify(allWords);
    res.render('testing-text', { title: 'Express' , JsonWords});
});

module.exports = router;