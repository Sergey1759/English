const ResultModel = require('../models/Result');

class Result {
    constructor(type,testId,result,userId) {
        this.type = type;
        this.testId = testId;
        this.userId = userId;
        this.result = result;
        this.date = new Date();
    }

    async createTest(){
        const {type,testId,result,date,userId} = this
        let res = new ResultModel({type,testId,result,date,userId})
        return await res.save();
    }

    static async getAll(){
        return ResultModel.find().populate('result.word').exec();
    }

    static async getByUserID(id){
        return ResultModel.find({userId: id}).populate('result.word').exec();
    }
    static async getByID(id){
        return ResultModel.findOne({_id: id}).populate('result.word').exec();
    }
}

module.exports = Result;