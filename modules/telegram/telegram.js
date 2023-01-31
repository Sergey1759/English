const TelegramBot = require('node-telegram-bot-api');
const Bot = require("./Bot");

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});

bot.setMyCommands([
    // {command:'help' ,description:'Як це працює?'},
    // {command:'auth' ,description:'Автентифікація'},
    {command:'mytests' ,description:'Мої тести'}
])

let _bot = new Bot(bot);

bot.on('message', async (msg) => {


    await _bot.commandStart(msg) || // return true if called
    await _bot.commandMyTests(msg) || // return true if called
    await _bot.commandWord(msg); // mast be last called
});

bot.on('callback_query',async (msg)=>{
    try {
        await _bot.loopTesting(msg,msg.from.id);
    } catch (e) {
        await bot.sendMessage(msg.message.chat.id, 'something wrong');
        // await _bot.deleteUser(msg);
        console.log(e)
    }
})