const express = require('express');
const router = express.Router();
const ApiWords = require('../api/word');
const isAuthenticated = require("./middleware/isAuthenticated");

router.get('/all',isAuthenticated, async function(req, res, next) {
    console.log(req.user)
    const allWords = await ApiWords.getByUserId(req.user.id);
    res.render('word-pages/all', { title: 'Express' , allWords});
});

router.get('/edit/:id', isAuthenticated, async function(req, res, next) {
    const word = await ApiWords.getById(req.params.id);
    let {current} = word;
    current = JSON.stringify(current);
    res.render('word-pages/edit', { title: 'Express' , word,current});
});

router.post('/save', isAuthenticated, async function(req, res, next) {
    await ApiWords.changeCurrent(req.body);
    res.send({ok : 'OK'});
});

module.exports = router;