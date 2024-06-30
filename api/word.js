const WordModel = require('../models/Word');

class Word {
    constructor(word,variantsOfWord,meanings,examples,images,userId) {
        this.word = word;
        this.variantsOfWord = variantsOfWord;
        this.created = new Date();
        this.examples = examples || [];
        this.meanings = meanings || [];
        this.images = images || [];
        this.userId = userId;
        this.slidesCheck = 0;
    }

    async createWord(){
        let {word,examples,meanings,images,userId,created,slidesCheck, variantsOfWord} = {...this};
        images = Array.from(new Set(images));
        let notFound = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png';
        const current = {example : examples[0], meaning : meanings[0], image : images[0] || notFound}
        let recordWord = new WordModel({word,variantsOfWord,examples,meanings,images,userId,current,created,slidesCheck});
        let result = await recordWord.save();
        return result;
    }

    static async getAll(){
        return await WordModel.find();
    }

    static async getAll(){
        return await WordModel.find();
    }
    static async remove(_id){
        return await WordModel.findOneAndDelete({_id});
    }
    static async getById(_id){
        return await WordModel.findOne({_id});
    }
    static async getByUserId(id, limit = 0){
        return await WordModel.find({userId: id}).sort({created: 'desc'}).limit(limit).exec();
    }
    static async limit(id,page,limit = 0){
        return await WordModel.find({userId: id}).limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
    }

    static async updateWordCheckSlides(_id){
        let word = await Word.getById(_id);
        return await WordModel.findByIdAndUpdate(_id, {slidesCheck : word.slidesCheck + 1})
    }

    static async changeCurrent(objValues){
        let current = {example: objValues.example, meaning: objValues.meaning, image: objValues.image}
        return await WordModel.findByIdAndUpdate(objValues.id, {current})
    }
}

module.exports = Word;