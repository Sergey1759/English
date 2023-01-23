let getImagesFromIstock = require('../modules/puppeteer/getImagesFromIstock');
let getImagesFromUnsplash = require('../modules/puppeteer/getImagesFromUnsplash');
jest.setTimeout(10000);

describe('testing get images by puppeteer',()=>{
    test('From Istock',async ()=>{
        let images = await getImagesFromIstock('word');
        expect(images).not.toBeNull();
        expect(images).toBeInstanceOf(Array);
        expect(images.length).toBeGreaterThan(0);
    })
    test('From Unsplash',async ()=>{
        let images = await getImagesFromUnsplash('word');
        expect(images).not.toBeNull();
        expect(images).toBeInstanceOf(Array);
        expect(images.length).toBeGreaterThan(0);
    })
})