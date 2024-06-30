const translate = require("./puppeteer/getContextReverso");
const getImages = require("./telegram/getImage");
const Word = require("../api/word");
const puppeteerTranscription = require("./puppeteer/getWooordHunt");
const ApiTranscription = require("../api/transcription");

const gpt = require("../modules/AI/chat-gpt");

async function saveWord(_word, userIdTelegram){
    let word = _word.trim();
    try {
        const result = await translate(word);
        const images = await getImages(word);

        let gptAnswer = await gpt.getStory(`give me only all variants of this word "${word}" that can be exist in some text in one string split by ,`);
        let variantsOfWord = gptAnswer.split(',')
        console.log(variantsOfWord)
        const savedWord = new Word(word,variantsOfWord,result.meanings,result.examples,images,userIdTelegram);
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