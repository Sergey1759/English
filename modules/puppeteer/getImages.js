const puppeteer = require("puppeteer");

const url = 'https://unsplash.com/s/photos/';
async function getImages(word) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`${url}${word}`);

    const images = await page.evaluate(()=>{
        let elements = document.querySelectorAll('a[itemprop="contentUrl"] img');
        let images = [];
        for (const elem of elements) { images.push(elem.src)}

        return {images}
    })

    await browser.close();
    return images;
}

module.exports = getImages;
