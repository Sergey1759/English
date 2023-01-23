const express = require('express');
const router = express.Router();
const ApiWords = require('../api/word');
const ApiTest = require('../api/test');
const ApiResult = require('../api/result');
const isAuthenticated = require('./middleware/isAuthenticated');

router.get('/createTest', isAuthenticated,async function(req, res, next) {
    const allWords = await ApiWords.getByUserId(req.user.id);
    res.render('test-pages/create', { title: 'Express' , allWords});
});

router.get('/all', isAuthenticated,async function(req, res, next) {
    const tests = await ApiTest.getAllTestsByUserId(req.user.id);
    res.render('test-pages/all', { title: 'Express' , tests});
});

router.get('/testingText/:id', isAuthenticated,async function(req, res, next) {
    const test = await ApiTest.getByIdUserAndTestID(req.user.id, req.params.id);
    let JsonWords = JSON.stringify(test.words);
    res.render('test-pages/testing-text', { title: 'Express' , JsonWords,idTest : test._id});
});

router.post('/createTest', isAuthenticated, async function(req, res, next) {
    const {title,imageUrl,description,words} = req.body;
    let test = new ApiTest(title,imageUrl,description,words,req.user.id)
    await test.createTest();
    res.send({ title: 'Express' });
});
router.post('/checkTest', isAuthenticated,async function(req, res, next) {
    const {id,data} = req.body;
    let test = await ApiTest.CheckResult(req.user.id,id,data);
    let result = new ApiResult('text',id,test,req.user.id);
    const response = await result.create();
    console.log(response)
    res.send({ id: response._id.toString() });
});

module.exports = router;