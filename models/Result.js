const {Schema,model} = require('mongoose');

const result = new Schema({
    type: Schema.Types.String,
    date: Schema.Types.Date,
    testId: {
        type: Schema.Types.ObjectId,
        ref: 'TextInput'
    },
    userId: Schema.Types.String,
    result:[
        {
            word:{
                type: Schema.Types.ObjectId,
                ref: 'Word'
            },
            isCorrect: Schema.Types.Boolean,
            answer: Schema.Types.String
        }
    ]
});

module.exports = model('Result',result);