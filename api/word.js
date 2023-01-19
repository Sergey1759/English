const WordModel = require('../models/Word');

class Word {
    constructor(word,meanings,examples,images,userId) {
        this.word = word;
        this.examples = examples || [];
        this.meanings = meanings || [];
        this.images = images || [];
        this.userId = userId;
    }

    async createWord(){
        let {word,examples,meanings,images,userId} = {...this};
        images = Array.from(new Set(images));
        let notFound = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png';
        const current = {example : examples[0], meaning : meanings[0], image : images[0] || notFound}
        let recordWord = new WordModel({word,examples,meanings,images,userId,current});
        let result = await recordWord.save();
        return result;
    }

    static async getAll(){
        return await WordModel.find();
    }

    static async getById(_id){
        return await WordModel.findOne({_id});
    }
    static async getByUserId(id){
        return await WordModel.find({userId: id});
    }
    static async changeCurrent(objValues){
        let current = {example: objValues.example, meaning: objValues.meaning, image: objValues.image}
        return await WordModel.findByIdAndUpdate(objValues.id, {current})
    }
}

module.exports = Word;