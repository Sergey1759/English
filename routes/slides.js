const express = require('express');
const router = express.Router();
const isAuthenticated = require('./middleware/isAuthenticated');
const Word = require('../api/word');
const User = require('../api/user');



router.get('/',isAuthenticated, async function(req, res, next) {
    let words = await Word.getByUserId(req.user.id);
    console.log(words.length);
    words = words.filter((word) => word.slidesCheck < 5);
    console.log(words.length);
    let user = await User.findById(req.user._id)
    let numberOnArraysWords = user.passedSlides;
    if(user.passedSlides % 5 === 0){
        words = words.sort((a,b) => a.slidesCheck - b.slidesCheck);
        numberOnArraysWords = 0;
        console.log(words[0].word)
    } else if(user.passedSlides >= words.length){
        await User.updatePassedSlides(req.user._id, 0);
        numberOnArraysWords = 0;
    }

    res.render('slides', { title: 'Express' , word : words[numberOnArraysWords]});
});

router.post('/know',isAuthenticated, async function(req, res, next) {
    let updatedWord  = await Word.updateWordCheckSlides(req.body.word_id);
    let user = await User.findById(req.user._id);
    let resultUser = await User.updatePassedSlides(req.user._id, user.passedSlides + 1);
    res.send({ok:"OK"});
});

router.post('/dont',isAuthenticated, async function(req, res, next) {
    let user = await User.findById(req.user._id);
    let resultUser = await User.updatePassedSlides(req.user._id, user.passedSlides + 1);
    res.send({ok:"OK"});
});


module.exports = router;