let createStory = document.querySelector('#create-story');
let divStory = document.querySelector('.story');

createStory.addEventListener('click', async ()=>{
    createStory.querySelector('#svg').style.display = 'block';
    createStory.querySelector('.text').innerText = 'Loading...';

    let {story}  = await postData('/stories/' , {words: getWordsForStory()});

    createStory.querySelector('#svg').style.display = 'none';
    createStory.querySelector('.text').innerText = 'Create';

    for (const paragraph of story) {
        let parentDiv = document.createElement('div');
        parentDiv.classList.add('paragraph');
        for (const paragraphElement of paragraph) {
            console.log(paragraphElement)
            let sentenceP = document.createElement('p');
            sentenceP.innerText = paragraphElement.sentence;
            sentenceP.classList.add('sentance');

            let translateP = document.createElement('p');
            translateP.innerText = paragraphElement.translate;
            translateP.classList.add('translate');

            parentDiv.appendChild(sentenceP);
            parentDiv.appendChild(translateP);
        }
        document.body.appendChild(parentDiv);
    }


    // addListenerToWords();
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

