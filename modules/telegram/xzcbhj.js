const TelegramBot = require('node-telegram-bot-api');
const User = require('../../api/user');
const Word = require('../../api/word');
const ApiTest = require('../../api/test');

const getDescription = require('./imageDescription');
const getImages = require('./getImage');

const translate = require('../puppeteer/getContextReverso');

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});
const URLtoAuth = 'http://5.44.252.253:3000/auth';

bot.setMyCommands([
    {command:'/help' ,description:'Як це працює?'},
    {command:'/auth' ,description:'Автентифікація'}
])

// let TEST;


// let currentPosition = 0;
// let testLength;
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;

    switch (msg.text) {
        case '/start':
            const nickForAuth = msg.from.username || `${msg.from.first_name}${msg.from.id}`
            let user = new User(msg.from.id, msg.from.first_name, msg.from.last_name, nickForAuth);
            const {username,password} = await user.createUser()
            await bot.sendMessage(chatId, `You can manage yor words here [inline URL](${URLtoAuth}) , but you must login its your username - "${username}", its your password - "${password}"`);
            break;
        case '/myTests':
            // let tests = await ApiTest.getAllTestsByUserId(msg.from.id);
            // console.log(tests)
            // let Question = getQuestion(TEST);
            // let buttons = creteButtons(Question.answers);
            // await bot.sendMessage(chatId, Question.question, buttons);
            await bot.sendMessage(chatId, 'sdasdasd');
            break;
        default:
        // const word = msg.text.trim();
        // const result = await translate(word);
        // const images = await getImages(word);
        //
        // const savedWord = new Word(word,result.meanings,result.examples,images,msg.from.id);
        // await savedWord.createWord();
        //
        // const baseImage = 'https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png';
        // let img = images[0] || baseImage;
        // const imageDescription = getDescription(word,result);
        //
        // await bot.sendPhoto(chatId,img,{caption: imageDescription,parse_mode: 'html'})
    }
});

// bot.on('callback_query',async (msg)=>{
//     let data = msg.data;
//     let chatId = msg.message.chat.id;
//
//     if(currentPosition == testLength-1) {
//         currentPosition = 0
//         for (let i = 0; i < 7; i++) {
//             await bot.deleteMessage(chatId,msg.message.message_id-i)
//         }
//         return await bot.sendMessage(chatId,'finish');
//     }
//     currentPosition++
//     try {
//         let Question = getQuestion(TEST);
//         let buttons = creteButtons(Question.answers);
//         await bot.sendMessage(chatId, Question.question, buttons);
//     } catch (e) {
//         console.log(e)
//     }
//
// })

// async function start(id) {
//     let tests = await ApiTest.getAllTestsByUserId(id);
//     TEST = tests[0]
//     testLength = TEST.words.length;
//     console.log(testLength)
// }
//
// function getQuestion(TEST) {
//     let buf = getVariants(TEST);
//     return {
//         question: `What is ${TEST.words[currentPosition].word}`,
//         answers: [
//             buf[0].current.meaning,
//             buf[1].current.meaning,
//             buf[2].current.meaning,
//         ]
//     }
// }
//
// function getVariants(TEST) {
//     let words = TEST.words;
//     let filters = words.filter(el => el._id !== words[currentPosition]._id);
//     const set = new Set();
//     while (set.size < 2){
//         let random =Math.floor(Math.random() * ((filters.length-1) - 0 + 1) + 0)
//         set.add(filters[random])
//     }
//     return shuffle([...set,words[currentPosition]]);
// }
// function shuffle(array) {
//     let currentIndex = array.length,  randomIndex;
//     while (currentIndex != 0) {
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex--;
//         [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
//     }
//     return array;
// }
// function creteButtons(answers){
//     let response = answers.map(el => {return { text: el, callback_data: el}})
//     return  {
//         reply_markup: JSON.stringify({
//             inline_keyboard:[
//                 response
//             ]
//         })
//     }
// }