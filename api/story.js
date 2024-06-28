const StoryModel = require('../models/Story');

class Story {
    constructor(userId,paragraphs) {
        this.date = new Date();
        this.userId = userId;
        this.paragraphs = paragraphs;
    }

    async create(){
        const {date,userId,paragraphs} = this;
        let story = new StoryModel({date,userId,paragraphs})
        return await story.save();
    }

}

module.exports = Story;