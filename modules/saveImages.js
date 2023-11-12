const fs = require("fs");

async function saveImage(img){
    let time =  Date.now();
    let src =  `./public/images/stories/${time}.jpg`

    await fs.writeFile(src, img, {encoding: 'base64'}, function(err) {
        console.log('File created');
        console.log(err)
    });
    return src;
}

module.exports = saveImage;