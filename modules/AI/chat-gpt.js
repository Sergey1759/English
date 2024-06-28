const OpenAI = require('openai');
const dotenv = require('dotenv');
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});

async function getStory(query) {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: query }],
        model: 'gpt-4o',
    });

    return chatCompletion.choices[0].message.content;
}
async function getImage(prompt) {
    const chatCompletion = await openai.images.generate({
        prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json',
    });

    return chatCompletion.data[0].b64_json;
}




module.exports = {getStory,getImage};