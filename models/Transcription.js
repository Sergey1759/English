const {Schema,model} = require('mongoose');

const transcription = new Schema({
    word: Schema.Types.String,
    US:{
        transcription: Schema.Types.String,
        audio: Schema.Types.String,
    },
    UK:{
        transcription: Schema.Types.String,
        audio: Schema.Types.String,
    }
});

module.exports = model('Transcription',transcription);