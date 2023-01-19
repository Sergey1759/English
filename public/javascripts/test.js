// Html elements
let allEl = document.querySelector('#all');
let nowEl = document.querySelector('#now');
let answerEl = document.querySelector('#answer');

// Button next
let nextBtn = document.querySelector('#next');

let currentPosition = 0;

nextBtn.addEventListener('click',()=>{
    if(!answerEl.value.trim()) return alert('enter data to input')
    if(currentPosition == window.words.length-1) {
        //there will be a post request to the server
    } else {
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