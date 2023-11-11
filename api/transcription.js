const transcriptionModel = require('../models/Transcription');
const {Schema} = require("mongoose");

class Transcription {
    constructor(word, object) {
        this.word = word;
        try{
            this.US = {transcription: object.US.transcription, audio: object.US.audio};
        } catch (e) {
            console.log(e);
        }
        try {
            this.UK = {transcription: object.UK.transcription, audio: object.UK.audio};
        } catch (e) {
            console.log(e);
        }
    }

    async createTranscription(){
        let {word,US,UK} = {...this};
        let recordWord = new transcriptionModel({word,US,UK});
        return await recordWord.save();
    }

    static async getAll(){
        return transcriptionModel.find();
    }

    static async getByWord(word){
        return transcriptionModel.find({word: word});
    }

}

module.exports = Transcription;