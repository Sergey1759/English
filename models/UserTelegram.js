const {Schema,model} = require('mongoose');

const user = new Schema({
    id : {
        type:Schema.Types.Number,
        ref: 'Word'
    },
    first_name: Schema.Types.String,
    last_name: Schema.Types.String,
    username: Schema.Types.String,
    password: Schema.Types.String,
    passedSlides: Schema.Types.Number,
});

module.exports = model('User',user);