const TelegramBot = require('node-telegram-bot-api');
const User = require('../api/user');
const Word = require('../api/word');

const translate = require('../modules/puppeteer/getContextReverso');
const getImages = require('../modules/puppeteer/getImages');
const getImagesFromIStock = require('../modules/puppeteer/getImagesFromIstock');

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});
const URLtoAuth = 'http://127.0.0.1:3000/auth';

bot.setMyCommands([
    {command:'/help' ,description:'Як це працює?'},
    {command:'/auth' ,description:'Автентифікація'}
])

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;

    switch (msg.text) {
        case '/start':
            let user = new User(msg.from.id, msg.from.first_name, msg.from.last_name, msg.from.username);
            const {username,password} = await user.createUser()
            await bot.sendMessage(chatId, `You can manage yor words here [inline URL](${URLtoAuth}) , but you must login its your username - "${username}", its your password - "${password}"`);
            break;
        case '/help':
            await bot.sendMessage(chatId, "There is will be text how it work");
            break;
        case '/auth':
            await bot.sendMessage(chatId, `visit this site [inline URL](${URLtoAuth}${msg.from.id})`);
            await bot.sendMessage(chatId, `visit this site [inline URL](${URLtoAuth}${msg.from.id})`);
            break;
        default:
            const word = msg.text.trim();
            const result = await translate(word);
            let {images} = await getImages(word);
            if(images.length == 0) {
                let buf = await getImagesFromIStock(word);
                images = buf.images;
            }

            const savedWord = new Word(word,result.meanings,result.examples,images,msg.from.id);
            await savedWord.createWord();
            let img = images[0] || 'https://previews.123rf.com/images/kaymosk/kaymosk1804/kaymosk180400006/100130939-error-404-page-not-found-error-with-glitch-effect-on-screen-vector-illustration-for-your-design-.jpg';
            await bot.sendPhoto(chatId,img,{caption: `
            <strong>${word}</strong> -- <i>${result?.meanings[0]}, ${result?.meanings[1]}, ${result?.meanings[2]}</i>
            
${result?.examples[0]?.from}
${result?.examples[0]?.to}

${result?.examples[1]?.from}
${result?.examples[1]?.to}
            `,parse_mode: 'html'})
    }
});