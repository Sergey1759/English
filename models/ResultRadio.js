const {Schema,model} = require('mongoose');

const resultRadio = new Schema({
    type: Schema.Types.String,
    date: Schema.Types.Date,
    testId: {
        type: Schema.Types.ObjectId,
        ref: 'TextInput'
    },
    userId: Schema.Types.String,
    result:[
        {
            question:{
                type: Schema.Types.ObjectId,
                ref: 'Word'
            },
            answer: {
                type: Schema.Types.ObjectId,
                ref: 'Word'
            },
            variants: [{
                type: Schema.Types.ObjectId,
                ref: 'Word'
            }]
        }
    ]
});

module.exports = model('ResultRadio',resultRadio);