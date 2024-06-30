const express = require('express');
const router = express.Router();
const isAuthenticated = require('./middleware/isAuthenticated');
const Word = require('../api/word');
const Story = require('../api/story');
const Gpt = require('../modules/AI/chat-gpt')
const translate = require("../modules/puppeteer/getContextReverso");
const getImages = require("../modules/telegram/getImage");
const getSentences = require("../modules/txtTosentences");
const getTranslating = require("../modules/translating");

const saveImage = require("../modules/saveImages");
const prompt = require('../modules/AI/promptForStory');

router.get('/',isAuthenticated, async function(req, res, next) {
    let words = await Word.getByUserId(req.user.id);
    res.render('stories', { title: 'Express', words});
});

router.get('/story',isAuthenticated, async function(req, res, next) {
    let story = await Story.findById('667f5b70ad4abf59bb8da7e4');
    let wordsToFind = story.wordIds.reduce((acc, Word) => {
        console.log(Word.variantsOfWord)
        Word.variantsOfWord[0] = capitalizeFirstLetter(Word.variantsOfWord[0]);
        acc.push({idAndClass: Word.variantsOfWord[0], variants : Word.variantsOfWord});
        return acc;
    },[])
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    console.log(wordsToFind)
    res.render('story', { title: 'Express', story, wordsToFind: wordsToFind});
});

router.post('/',isAuthenticated, async function(req, res, next) {
    let words = req.body.words.split(' ');
    let promptForGpt = prompt(words);
    let story = await Gpt.getStory(promptForGpt);
    let arrayOfSentences = getSentences(story);

    let paragraphs = []
    for (const paragraph of arrayOfSentences) {
        let sentences = []
        for (const sentence of paragraph) {
            sentences.push({sentence: sentence, translate: await getTranslating('en','uk', sentence)});
        }
        paragraphs.push(sentences);
    }


    res.send({story : paragraphs})

    let storyDB = new Story(req.user.id,paragraphs,words,req.body.ids);
    await storyDB.create();
});





router.post('/createWord',isAuthenticated, async function(req, res, next) {
    const word = req.body.word;
    const result = await translate(word);
    const images = await getImages(word);

    const savedWord = new Word(word,result.meanings,result.examples,images,req.user.id);
    await savedWord.createWord();
});



module.exports = router;