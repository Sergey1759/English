const fs = require("fs");
const OpenAI = require("openai");
const path = require("path");
const dotenv = require('dotenv');
dotenv.config();

console.log('process.env.OPENAI_API_KEY');
console.log(process.env.OPENAI_API_KEY);
console.log('process.env.OPENAI_API_KEY');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});


const _output = path.resolve("./output.mp3");
console.log(_output);

async function TTS() {
    try {
        console.log("Speech synthesis initializing.");
        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: "onyx",
            input: 'Though it was challenging, Jane managed to pull it off successfully, impressing everyone with her newfound poise and organizational skills',
        });

        if (fs.existsSync(_output)) {
            fs.unlinkSync(_output);
        }

        const buffer = Buffer.from(await mp3.arrayBuffer());
        await fs.promises.writeFile(_output, buffer);
        console.log("Speech synthesis complete.");
    } catch (error) {
        console.log("Speech synthesis failed.");
        console.error(error);
    }
}
TTS();