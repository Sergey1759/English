const StoryModel = require('../models/Story');
const UserModel = require("../models/UserTelegram");

class Story {
    constructor(userId,paragraphs,keywords,wordIds) {
        this.date = new Date();
        this.userId = userId;
        this.paragraphs = paragraphs;
        this.keywords = keywords;
        this.wordIds = wordIds;
    }

    async create(){
        const {date,userId,paragraphs,keywords,wordIds} = this;
        let story = new StoryModel({date,userId,paragraphs,keywords,wordIds})
        return await story.save();
    }
    static async findById(_id){
        return await StoryModel.findById(_id).populate('wordIds').exec()
    }

}

module.exports = Story;