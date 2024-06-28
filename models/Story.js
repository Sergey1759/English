const {Schema,model} = require('mongoose');

const story = new Schema({
    date: Schema.Types.Date,
    userId: Schema.Types.String,
    paragraphs: Schema.Types.Array,
    keywords: Schema.Types.Array,
});

module.exports = model('Story',story);