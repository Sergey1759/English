const Helper = require("./Helper");
const User = require("../../api/user");
const ApiTest = require("../../api/test");
const translate = require("../puppeteer/getContextReverso");
const getImages = require("./getImage");
const Word = require("../../api/word");
const ApiResult = require("../../api/result-radio");
const getDescription = require("./imageDescription");

class Bot extends Helper{
    constructor(bot) {
        super(bot);
    }

    async commandStart(msg){
        if(msg.text !== `/start`) return false
        const nickForAuth = msg.from.username || `${msg.from.first_name}${msg.from.id}`
        let user = new User(msg.from.id, msg.from.first_name, msg.from.last_name, nickForAuth);
        const {username,password} = await user.createUser()
        await this.bot.sendMessage(msg.chat.id, `You can manage yor words here [inline URL]($'''}) , but you must login its your username - "${username}", its your password - "${password}"`);
        return true
    }
    async commandMyTests(msg){
        if(msg.text !== `/mytests`) return false
        this.createUser(msg.from.id);
        const tests = await ApiTest.getAllTestsByUserId(msg.from.id);
        let buttons = this.creteButtonsTest(tests)
        await this.bot.sendMessage(msg.chat.id, 'Choose your test', buttons);
        return true
    }
    async commandWord(msg){
        const word = msg.text.trim();
        const result = await translate(word);
        const images = await getImages(word);

        const savedWord = new Word(word,result.meanings,result.examples,images,msg.from.id);
        await savedWord.createWord();

        let img = images[0] || 'https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png';
        const imageDescription = getDescription(word,result);

        await this.bot.sendPhoto(msg.chat.id,img,{caption: imageDescription,parse_mode: 'html'})
        return true
    }


    async startTesting(msg,idUser) {
        let id  = msg.data.split(':')[1];
        this.task[idUser].test = await ApiTest.getById(id);
        this.task[idUser].testLength = this.task[idUser].test.words.length;
        await this.sendQuestion(msg.message.chat.id,this.task[idUser].test,idUser)
    }

    async  loopTesting(msg,idUser){
        if(msg.data.indexOf('test') != -1){
            await this.startTesting(msg,idUser);
        } else {
            if(this.task[idUser].currentPosition == this.task[idUser].testLength-1) {
                await this.finishLoop(msg,idUser);
            } else {
                await this.loop(msg,idUser);
            }
        }

    }

    async loop (msg){
        this.task[msg.from.id].answers[this.task[msg.from.id].currentPosition].answer = msg.data;
        this.task[msg.from.id].currentPosition++
        await this.deleteMessages(msg).then(async ()=>{
            await this.sendQuestion(msg.message.chat.id,this.test,msg.from.id)

        });
    }
    async finishLoop(msg){
        this.task[msg.from.id].answers[this.task[msg.from.id].currentPosition].answer = msg.data;
        this.currentPosition = 0;
        await this.deleteMessages(msg);
        let text = this.createAnswers(msg.from.id);
        // console.log(this.task[msg.from.id].answers);
        let DATA = await this.DataToDB(this.task[msg.from.id]);
        console.log(DATA);
        let createResult = new ApiResult('radio', this.task[msg.from.id].test._id,DATA,msg.from.id);
        await createResult.create();
        return await this.bot.sendMessage(msg.message.chat.id,text);
    }

    async DataToDB(task){
        let buf = {...task}
        let answers = buf.answers;
        let words = buf.test.words;
        let result = answers.map(el => {
            let question_word = el.question.split(' is ')[1];
            let question = (get(words,question_word))._id;
            let variants = el.answers.map(element => {
                return (getVariants(words,element))._id;
            });
            let answer = (getVariants(words,el.answer))._id;
            return {question,variants,answer}
        });
        return result;
        function get(words, word){
            let buf = [...words];
            let res = buf.filter(el => el.word == word);
            return res[0];
        }
        function getVariants(words, word){
            let buf = [...words];
            let res = buf.filter(el => el.current.meaning == word);
            return res[0];
        }
    }

    async deleteUser(msg){
        delete this.task[msg.from.id];
    }
    async deleteMessages(msg){
        let messages = new Set(this.task[msg.from.id].messages);
        messages = Array.from(messages);
        for (const messageID of messages) {
            await this.bot.deleteMessage(msg.message.chat.id,messageID);
            this.task[msg.from.id].messages.pop();
        }
    }

}

module.exports = Bot;