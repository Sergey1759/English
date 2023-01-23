let getImages = require('../modules/puppeteer/getImagesFromUnsplash');
jest.setTimeout(10000);

test('first',async ()=>{
    let images = await getImages('word');
    expect(images).not.toBeNull();
    expect(images).toBeInstanceOf(Object);
    expect(images.images).toBeInstanceOf(Array);
    expect(images.images.length).toBeGreaterThan(0);
})