const translate = require("./puppeteer/getContextReverso");
const getImages = require("./telegram/getImage");
const Word = require("../api/word");
const puppeteerTranscription = require("./puppeteer/getWooordHunt");
const ApiTranscription = require("../api/transcription");

async function saveWord(_word, userIdTelegram){
    let word = _word.trim();
    try {
        const result = await translate(word);
        const images = await getImages(word);

        const savedWord = new Word(word,result.meanings,result.examples,images,userIdTelegram);
        const wordDB = await savedWord.createWord();

        const transcription = await puppeteerTranscription(word);
        const transcriptionDB  = await new ApiTranscription(word,transcription).createTranscription();

        return { wordDB, transcriptionDB}
    } catch (e) {
        console.log(e);
        return false
    }

}

module.exports = saveWord;