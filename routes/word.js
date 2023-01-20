const express = require('express');
const router = express.Router();
const ApiWords = require('../api/word');
const Token = require('../modules/token')

router.get('/all', async function(req, res, next) {
    let verified = Token.verify(req.cookies.token);
    const allWords = await ApiWords.getByUserId(verified.user.id);
    res.render('word', { title: 'Express' , allWords});
});


router.post('/save', async function(req, res, next) {
    console.log(req.body);
    let result = await ApiWords.changeCurrent(req.body);
    res.send({ok : 'OK'});
});

router.get('/edit/:id', async function(req, res, next) {
    const word = await ApiWords.getById(req.params.id);
    console.log(word);
    let {current} = word;
    current = JSON.stringify(current);
    res.render('edit', { title: 'Express' , word,current});
});

module.exports = router;