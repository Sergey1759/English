const puppeteer = require("puppeteer");

const url = 'https://wooordhunt.ru/word/';

async function getTranscription(word) {
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();

    await page.goto(`${url}${word}`);

    await page.waitForSelector('#us_tr_sound');

    const transcription = await page.evaluate(()=>{
        const tryCatch = (func) => {try{ func();} catch (e) {console.log(e);}};  // error in browser Chromium

        let result = {US:{},UK:{}};
        let US = document.querySelector('#us_tr_sound');
        let UK = document.querySelector('#uk_tr_sound');

        tryCatch(()=>{ result.US.transcription = US.querySelector('.transcription').innerText});
        tryCatch(()=>{ result.US.audio = US.querySelector('audio source').src});

        tryCatch(()=>{ result.UK.transcription = UK.querySelector('.transcription').innerText});
        tryCatch(()=>{ result.UK.audio = UK.querySelector('audio source').src});

        return result;
    });

    await browser.close();
    return transcription;
}

module.exports = getTranscription;