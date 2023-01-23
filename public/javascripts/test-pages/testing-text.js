// Html elements
let allEl = document.querySelector('#all');
let nowEl = document.querySelector('#now');
let answerEl = document.querySelector('#answer');

let testId = document.querySelector('#idTest').value;

// Button next
let nextBtn = document.querySelector('#next');

let currentPosition = 0;
let answers = {};
nextBtn.addEventListener('click',async ()=>{
    if(!answerEl.value.trim()) return alert('enter data to input')
    if(currentPosition == window.words.length-1) {
        answers[window.words[currentPosition]._id] = answerEl.value;
        await postData('http://localhost:3000/test/checkTest',{data : answers, id : testId})
    } else {
        answers[window.words[currentPosition]._id] = answerEl.value;
        currentPosition++;
        updateSlide();
        answerEl.value = '';
    }
});
function updateSlide() {
    const element = window.words[currentPosition];
    document.querySelector('.image').style.backgroundImage = `url("${element.current.image}")`;
    document.querySelector('#word').innerText = `(${element.word} is...)`;
    allEl.innerText = window.words.length;
    nowEl.innerText = currentPosition+1;
}
updateSlide();

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return response.json();
}