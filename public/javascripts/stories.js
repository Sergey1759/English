let createStory = document.querySelector('#create-story');
let divStory = document.querySelector('.story');
let checkBoxes = document.querySelectorAll('input[type="checkbox"]');

for (let checkBox of checkBoxes) {
    if(checkBox.checked) console.log(checkBox)
}

createStory.addEventListener('click', async ()=>{
    let arrayWords = [];
    for (let checkBox of checkBoxes) {
        if(checkBox.checked) arrayWords.push(checkBox.value)
    }
    let stringWords = arrayWords.join(' ');

    let story  = await postData('/stories/' , {words: stringWords});
    let buf = story.story.split(' ');
    console.log(buf);
    buf = buf.map(word => `<span class="addToVocabulary">${word}</span>`);
    console.log(buf);
    let div = document.createElement('div');
    div.innerHTML = buf.join(' ');
    divStory.appendChild(div);
    let addToVocabulary = document.querySelectorAll('.addToVocabulary');
    for (const addToVocabularyElement of addToVocabulary) {
        addToVocabularyElement.addEventListener('click',async (evt)=>{
            evt.target.style.color = 'red';
            await postData('/stories/createWord/', {word: evt.target.innerText})
        });
    }
});

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return response.json();
}

