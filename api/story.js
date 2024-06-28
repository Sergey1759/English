const StoryModel = require('../models/Story');

class Story {
    constructor(userId,paragraphs,keywords) {
        this.date = new Date();
        this.userId = userId;
        this.paragraphs = paragraphs;
        this.keywords = keywords;
    }

    async create(){
        const {date,userId,paragraphs,keywords} = this;
        let story = new StoryModel({date,userId,paragraphs,keywords})
        return await story.save();
    }

}

module.exports = Story;