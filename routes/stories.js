const express = require('express');
const router = express.Router();
const isAuthenticated = require('./middleware/isAuthenticated');
const Word = require('../api/word');
const Gpt = require('../modules/AI/chat-gpt')
const translate = require("../modules/puppeteer/getContextReverso");
const getImages = require("../modules/telegram/getImage");
const fs = require("fs");

const prompt = require('../modules/AI/promptForStory');

router.get('/',isAuthenticated, async function(req, res, next) {
    let words = await Word.getByUserId(req.user.id);
    res.render('stories', { title: 'Express', words});
});

router.post('/',isAuthenticated, async function(req, res, next) {
    let story = await Gpt.getStory(prompt);
    let json = JSON.parse(story);

    let img1 = await Gpt.getImage(json.image_prompts[0].description);
    let time = new Date.now();
    await fs.writeFile(`./public/images/${time}.jpg`, img1, {encoding: 'base64'}, function(err) {
        console.log('File created');
    });

    res.send({story: json.chapters[0].content, src : `/images/${time}.jpg`})
});

router.post('/createWord',isAuthenticated, async function(req, res, next) {
    const word = req.body.word;
    const result = await translate(word);
    const images = await getImages(word);

    const savedWord = new Word(word,result.meanings,result.examples,images,req.user.id);
    await savedWord.createWord();
});



module.exports = router;