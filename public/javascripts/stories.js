let createStory = document.querySelector('#create-story');
let divStory = document.querySelector('.story');

createStory.addEventListener('click', async ()=>{
    let {story, src}  = await postData('/stories/' , {words: getWordsForStory()});

    let htmlFromText = story.split(' ').map(word => `<span class="addToVocabulary">${word}</span>`);

    let div = document.createElement('div');
    div.innerHTML = htmlFromText.join(' ');
    divStory.appendChild(div);

    let image = document.createElement('img');
    image.src = src;
    divStory.appendChild(image);

    addListenerToWords();
});

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

