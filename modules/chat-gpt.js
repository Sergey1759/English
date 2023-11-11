const OpenAI = require('openai');
const dotenv = require('dotenv');
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY, // defaults to process.env["OPENAI_API_KEY"]
});

async function main(query) {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: query }],
        model: 'gpt-3.5-turbo',
    });

    return chatCompletion.choices[0].message.content;
}


module.exports = main;