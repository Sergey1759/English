const express = require('express');
const router = express.Router();

const ApiTranscription = require('../api/transcription');
const puppeteerTranscription = require('../modules/puppeteer/getWooordHunt');
const isAuthenticated = require("./middleware/isAuthenticated");

router.get('/',isAuthenticated, async function(req, res, next) {
    let word = 'skyscrapers';
    let transcription = await puppeteerTranscription(word);
    let result  = await new ApiTranscription(word,transcription).createTranscription();
    console.log(result);
    res.send({ok: 'ok'})
});
router.post('/',isAuthenticated, async function(req, res, next) {
    console.log(req.params);
    const allWords = await ApiWords.limit(req.user.id,req.body.page);
    console.log(allWords)
    res.send(JSON.stringify(allWords))
});

module.exports = router;