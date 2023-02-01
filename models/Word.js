const {Schema,model} = require('mongoose');

const word = new Schema({
    word: Schema.Types.String,
    examples: Schema.Types.Array,
    meanings: Schema.Types.Array,
    images: Schema.Types.Array,
    created: Schema.Types.Date,
    current:{
        image: Schema.Types.String,
        example: Object,
        meaning: Schema.Types.String
    },
    userId: {
        type:Schema.Types.String,
        ref: 'User'
    }
});

module.exports = model('Word',word);