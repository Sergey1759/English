const {Schema,model, Types} = require('mongoose');

const story = new Schema({
    date: Schema.Types.Date,
    userId: Schema.Types.String,
    paragraphs: Schema.Types.Array,
    keywords: Schema.Types.Array,
    wordIds: [{type:Schema.Types.ObjectId, ref: 'Word'}],
});

module.exports = model('Story',story);