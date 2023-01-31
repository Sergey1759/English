// Html elements
let allEl = document.querySelector('#all');
let nowEl = document.querySelector('#now');

let testId = document.querySelector('#idTest').value;

// Button next
let nextBtn = document.querySelector('#next');

let currentPosition = 0;
let answers = {};
answers.idTest = testId;
answers.questions = [];
let currentLabelValues;
nextBtn.addEventListener('click',async ()=>{

    if( document.querySelectorAll('input:checked').length == 0) return showError('error');
    if(currentPosition == window.words.length-1) {
        updateObjectResult();
        await postData('/test/checkTestRadio',answers)
            .then((result) => {
                window.location = `/result/radio/${result.id}`
            })
    } else {
        updateObjectResult();
        currentPosition++;
        updateSlide();
        clear();
    }
});

function clear(){
    document.querySelector('input:checked').checked = false;
}

function checkedLabel() {
    return document.querySelector('input:checked').value;
}
function updateSlide() {
    const element = window.words[currentPosition];
    document.querySelector('.image').style.backgroundImage = `url("${element.current.image}")`;
    document.querySelector('#word').innerText = `(${element.word} is...)`;
    allEl.innerText = window.words.length
    setLabels();
    nowEl.innerText = currentPosition+1;
}
updateSlide();

function updateObjectResult() {
    answers.questions.push({
        question: window.words[currentPosition]._id,
            variants : currentLabelValues.map(el => el._id),
        answer: checkedLabel()
    })
}
function setLabels() {
    currentLabelValues = getVariants();
    document.querySelectorAll('label').forEach((el,index) => {
        document.querySelector(`input[id='${el.htmlFor}']`).value = currentLabelValues[index]._id;
        el.innerText = currentLabelValues[index].current.meaning;
        el.value = currentLabelValues[index]._id;
    })
}
function getVariants() {
    let words = window.words;
    let filters = words.filter(el => el._id !== words[currentPosition]._id);
    const set = new Set();
    while (set.size < 2){
        let random =Math.floor(Math.random() * ((filters.length-1) - 0 + 1) + 0)
        set.add(filters[random])
    }
    return shuffle([...set,words[currentPosition]]);
}
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function showError(msg){
    alert(msg);
}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return response.json();
}