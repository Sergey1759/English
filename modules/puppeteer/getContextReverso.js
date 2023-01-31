const puppeteer = require("puppeteer");

const url = 'https://context.reverso.net/%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D0%B4/%D0%B0%D0%BD%D0%B3%D0%BB%D0%B8%D0%B9%D1%81%D0%BA%D0%B8%D0%B9-%D1%83%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B9/';
async function getInfo(word) {
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();

    await page.goto(`${url}${word}`);

    const info = await page.evaluate(()=>{
        let elements = document.querySelectorAll('.display-term');
        let meanings = [];
        for (const elem of elements) { meanings.push(elem.innerText)}

        let divExamples = document.querySelectorAll('.example');
        let examples = [];
        for (const div of divExamples) {
            examples.push({
                from : div.querySelector('.src').innerText.replaceAll('\n','').trim(),
                to : div.querySelector('.trg').innerText.replaceAll('\n','').trim()
            })
        }
        return {meanings, examples}
    })

    await browser.close();
    return info;
}

module.exports = getInfo;
