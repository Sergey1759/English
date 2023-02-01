const TestModel = require('../models/TestInputText');
const {log} = require("debug");

class Test {
    constructor(title,image,description,words,userId) {
        this.title = title;
        this.image = image;
        this.description = description;
        this.words = words;
        this.numberOfTimes = 0;
        this.userId = userId;
    }

    async createTest(){
        const {title,image,description,words,numberOfTimes,userId} = this
        let test = new TestModel({title,image,description,words,numberOfTimes,userId})
        return await test.save();
    }

    static async getAllTestsByUserId(userId){
        console.log(userId)
        return await TestModel.find({userId : userId}).populate('words').exec();
    }
    static async getByIdUserAndTestID(userId,_id){
        return await TestModel.findOne({userId : userId, _id : _id }).populate('words').exec();
    }
    static async getById(_id){
        return await TestModel.findOne({ _id }).populate('words').exec();
    }

    static async CheckResult(userId,_id, answers){
        let res = await  this.getByIdUserAndTestID(userId,_id);
        return this.checkAnswersText(res,answers)
    }
    static checkAnswersText(test, answers){
        let words = test.words;
        let res = [];
        for (const word of words) {
            if(answers[word._id.toString()]) {
                console.log('---------------------------')
                console.log(answers[word._id.toString()]);
                console.log(word.current.meaning);
                console.log((answers[word._id.toString()] == word.current.meaning));
                console.log('---------------------------')
                res.push({
                    word : word._id ,
                    isCorrect : (answers[word._id.toString()].trim().toLowerCase() == word.current.meaning.trim().toLowerCase()),
                    answer: answers[word._id.toString()]
                });
            }
        }


        console.log(res);
        return res;
    }
}

module.exports = Test;