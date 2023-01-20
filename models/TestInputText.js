const {Schema,model} = require('mongoose');

const textInput = new Schema({
    title: Schema.Types.String,
    image: Schema.Types.String,
    description: Schema.Types.String,
    words: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Word'
        }
    ],
    numberOfTimes: Schema.Types.Number,
    userId: {
        type: Schema.Types.Number,
        ref: 'User'
    },
});

module.exports = model('TextInput',textInput);