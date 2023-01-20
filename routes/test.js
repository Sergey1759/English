const express = require('express');
const router = express.Router();
const ApiWords = require('../api/word');
const ApiTest = require('../api/test');
const Token = require('../modules/token')

router.get('/createTest', async function(req, res, next) {
    let verified = Token.verify(req.cookies.token);
    const allWords = await ApiWords.getByUserId(verified.user.id);
    res.render('create-test', { title: 'Express' , allWords});
});

router.get('/all', async function(req, res, next) {
    let verified = Token.verify(req.cookies.token);
    const tests = await ApiTest.getAllTestsByUserId(verified.user.id);
    res.render('allTests', { title: 'Express' , tests});
});

router.post('/createTest', async function(req, res, next) {
    let verified = Token.verify(req.cookies.token);
    const body = req.body;
    let test = new ApiTest(body.title,body.imageUrl,body.description,body.words,verified.user.id)
    const result = await test.createTest();
    res.send({ title: 'Express' });
});

router.get('/testingText/:id', async function(req, res, next) {
    let verified = Token.verify(req.cookies.token);
    const test = await ApiTest.getByIdUserAndTestID(verified.user.id, req.params.id);
    let JsonWords = JSON.stringify(test.words);
    res.render('testing-text', { title: 'Express' , JsonWords});
});

module.exports = router;