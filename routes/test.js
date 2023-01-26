const express = require('express');
const router = express.Router();
const ApiWords = require('../api/word');
const ApiTest = require('../api/test');
const ApiResult = require('../api/result');
const ApiResultRadio = require('../api/result-radio');
const isAuthenticated = require('./middleware/isAuthenticated');

const getImages = require('../modules/puppeteer/getImagesFromUnsplash');

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

router.get('/testingRadio/:id', isAuthenticated,async function(req, res, next) {
    const test = await ApiTest.getByIdUserAndTestID(req.user.id, req.params.id);
    let JsonWords = JSON.stringify(test.words);
    res.render('test-pages/testing-radio', { title: 'Express' , JsonWords,idTest : test._id});
});

router.post('/createTest', isAuthenticated, async function(req, res, next) {
    const {title,description,words} = req.body;
    let images = await getImages('exam');
    const imageUrl = images[Math.floor(Math.random() * ((images.length-1) - 0 + 1) + 0)];
    let test = new ApiTest(title,imageUrl,description,words,req.user.id)
    await test.createTest();
    res.send({ title: 'Express' });
});
router.post('/checkTest', isAuthenticated,async function(req, res, next) {
    const {id,data} = req.body;
    let test = await ApiTest.CheckResult(req.user.id,id,data);
    let result = new ApiResult('text',id,test,req.user.id);
    const response = await result.create();
    res.send({ id: response._id.toString() });
});

router.post('/checkTestRadio', isAuthenticated,async function(req, res, next) {
    let radio =  new ApiResultRadio('radio',req.body.idTest,req.body.questions,req.user.id);
    let r = await radio.create();
    res.send({ id : r._id});
});
module.exports = router;