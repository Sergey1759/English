const UnsplashImages = require("../puppeteer/getImagesFromUnsplash");
const IStockImages = require("../puppeteer/getImagesFromIstock");

module.exports = async function getImages(word) {
    let images = await IStockImages(word);
    if(images.length > 0)  return images
    images = await UnsplashImages(word);
    return images
}