const {Schema,model} = require('mongoose');

const textInput = new Schema({
    title: Schema.Types.String,
    words: {},
    numberOfTimes: Schema.Types.Number,
    userId: {
        type: Schema.Types.Number,
        ref: 'User'
    },
});

module.exports = model('TextInput',textInput);