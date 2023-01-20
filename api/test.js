const TestModel = require('../models/TestInputText');

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
        return await TestModel.find({userId});
    }
    static async getByIdUser(){
        return await TestModel.find({userId: 556451309}).populate('words').exec((err,res) =>{
            console.log(res[0].words)
        });
    }
}

module.exports = Test;