function getParagraphs(text) {
    return text.split('\n').reduce((result, line) => {
        if (line.trim().length > 1) {
            result.push(line);
        }
        return result;
    }, []);
}

function getSentences(text) {
    let arrayOfParagraphs = getParagraphs(text);
    let sentences = [];
    for (const paragraph of arrayOfParagraphs) {
        let buf = splitText(paragraph);
        buf.length = buf.length - 1; // delete last empty string
        sentences.push(buf)
    }
    return sentences;
}

function splitText(text) {
    const regex = /(?<!\b(?:Mr|Mrs|Dr|Ms|Prof|Sr|Jr|St))\.(?=\s|$)/;
    return text.split(regex).map(sentence => sentence.trim());
}

module.exports = getSentences;
