const ResultRadioModel = require('../models/ResultRadio');

class ResultRadio {
    constructor(type,testId,result,userId) {
        this.type = type;
        this.testId = testId;
        this.userId = userId;
        this.result = result;
        this.date = new Date();
    }

    async create(){
        const {type,testId,result,date,userId} = this
        let res = new ResultRadioModel({type,testId,result,date,userId})
        return await res.save();
    }

    static async getAll(){
        return ResultRadioModel.find().populate('result.variants').exec();
    }

    static async getByUserID(id){
        return ResultRadioModel.find({userId: id})
            .populate({path: 'result.question'})
            .populate({path: 'testId'})
            .populate({path: 'result.answer'})
            .populate({path: 'result.variants'})
            .exec();
    }

    static async getById(_id){
        return ResultRadioModel.findOne({_id})
            .populate({path: 'result.question'})
            .populate({path: 'result.answer'})
            .populate({path: 'result.variants'})
            .exec();
    }

    static async get(id){
        let res = await this.getByUserID(id);
        let mm = [];
        console.log(res)
    }

    static async getByID(id){
        return ResultRadioModel.findOne({_id: id}).populate('result.word').exec();
    }
}

module.exports = ResultRadio;