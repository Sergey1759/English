let createStory = document.querySelector('#create-story');
let divStory = document.querySelector('.story');

createStory.addEventListener('click', async ()=>{
    createStory.querySelector('#svg').style.display = 'block';
    createStory.querySelector('.text').innerText = 'Loading...';

    let {chapter1, chapter2, src1, src2}  = await postData('/stories/' , {words: getWordsForStory()});

    createStory.querySelector('#svg').style.display = 'none';
    createStory.querySelector('.text').innerText = 'Create';


    createChapter(chapter1,src1, divStory);
    createChapter(chapter2,src2, divStory);

    addListenerToWords();
});
function createChapter(chapter,src,parentElement) {
    let htmlFromText = chapter.split(' ').map(word => `<span class="addToVocabulary">${word}</span>`);

    let div = document.createElement('div');
    div.innerHTML = htmlFromText.join(' ');
    parentElement.appendChild(div);

    let image = document.createElement('img');
    image.src = src;
    parentElement.appendChild(image);
}
function addListenerToWords() {
    let addToVocabulary = document.querySelectorAll('.addToVocabulary');

    for (const addToVocabularyElement of addToVocabulary) {
        addToVocabularyElement.addEventListener('click',async (evt)=>{
            evt.target.style.color = 'red';
            await postData('/stories/createWord/', {word: evt.target.innerText})
        });
    }
}

function getWordsForStory() {
    const checkBoxes = document.querySelectorAll('input[type="checkbox"]');

    let arrayWords = [];
    for (let checkBox of checkBoxes) {
        if(checkBox.checked) arrayWords.push(checkBox.value)
    }
    return  arrayWords.join(' ');
}


async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return response.json();
}

