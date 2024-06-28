const translate = require('@iamtraction/google-translate');


async function translating(from, to, text) {
    return translate(text, { from: from, to: to }).then(res => {
        return res.text// OUTPUT: You are amazing!
    }).catch(err => {
        console.error(err);
    });
}

module.exports = translating;