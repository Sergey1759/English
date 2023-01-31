class Helper {

    constructor(bot) {
        this.bot = bot
        this.task = {};

    }

    logTASK(){
        console.log(this.task)
    }
    createUser(idUser){
        this.task[idUser] = {
            answers : [],
            currentPosition : 0,
            testLength : 0,
            test : null,
            messages: []
        }
    }

    pushMessageId(idUser,message_id){
        this.task[idUser].messages.push(message_id)
    }

    createAnswers(idUser) {
        let buf = this.task[idUser].answers.map(el => {
            let word = el.question.split(' is ')[1].trim()
            let testWord = this.task[idUser].test.words.filter(element => {
                return word == element.word
            });
            return {isRight : el.answer == testWord[0].current.meaning, rightAnswer : testWord[0].current.meaning, ...el}
        });
        return  this.jsonToText(buf)
    }
    jsonToText(arr) {
        let result = '';
        let buf =[...arr]
        buf = buf.filter(el => !el.isRight)
        buf.forEach(el => result+=`
        ${el.question}
        Your answer is ${el.answer}
        Right answer is ${el.rightAnswer}\n
    `)
        return result
    }

    async sendQuestion(chatId,TEST,idUser){
        let Question = this.getQuestion(TEST,idUser);
        let buttons = this.creteButtons(Question.answers);
        await this.bot.sendMessage(chatId, Question.question, buttons).then(res=>{
            this.pushMessageId(idUser,res.message_id)
        });
        this.task[idUser].answers.push({...Question});
    }
    getQuestion(TEST,idUser) {
        let buf = this.getVariants(TEST,idUser);
        return {
            question: `What is ${this.task[idUser].test.words[this.task[idUser].currentPosition].word}`,
            answers: [
                buf[0].current.meaning,
                buf[1].current.meaning,
                buf[2].current.meaning,
            ]
        }
    }

    getVariants(TEST,idUser) {
        let words = this.task[idUser].test.words;
        let filtered = words.filter(element => {
            let current = this.task[idUser].currentPosition;
            return element._id.toString() !== words[current]._id.toString()
        });
        const variants = new Set();
        while (variants.size < 2){
            let random =Math.floor(Math.random() * ((filtered.length-1) - 0 + 1) + 0)
            variants.add(filtered[random])
        }
        return this.shuffle([...variants,words[this.task[idUser].currentPosition]]);
    }
    shuffle(array) {
        let currentIndex = array.length; let randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }
    creteButtons(answers){
        let response = answers.map(el => {return { text: el, callback_data: el}})
        return  {
            reply_markup: JSON.stringify({
                inline_keyboard:[
                    response
                ]
            })
        }
    }

    creteButtonsTest(tests){
        let response = tests.map(el => {return { text: el.title, callback_data: `test:${el._id.toString()}`}});
        return  {
            reply_markup: JSON.stringify({
                inline_keyboard:[
                    response
                ]
            })
        }
    }
}

module.exports = Helper