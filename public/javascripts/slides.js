let language = document.querySelector('.language');
let buttons = language.querySelectorAll('.btn');

for (const button of buttons) {
    button.addEventListener('click',(evt)=>{
        clearChosen()
        evt.target.classList.add('chosen');
    })
}

function clearChosen() {
    for (const btn of buttons) {
        btn.classList.remove('chosen')
    }
}


let translate = document.querySelector('.translate');
let word = document.querySelector('.word');

//data from backend stored on page in hidden inputs
let word_text = document.querySelector('#word').value;
let word_id = document.querySelector('#word_id').value;
let word_meaning = document.querySelector('#word_meaning').value;

translate.addEventListener('click', ()=>{
    word.innerText = `${word_text} - ${word_meaning}`
})


let know = document.querySelector('#know');
let dont = document.querySelector('#dont');

know.addEventListener('click', async ()=>{
    await postData('/slides/know', {word_id});
    location.reload();
});

dont.addEventListener('click', async ()=>{
    try {
        let res  = await postData('/slides/dont', {word_id});
        console.log(res);
        location.reload();
    }catch (e) {
        console.log(e);
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