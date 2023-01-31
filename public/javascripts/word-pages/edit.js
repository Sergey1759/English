const images = document.querySelectorAll('.choose-image');
const save = document.querySelector('#save');

images.forEach(el =>{
    el.addEventListener('click', ()=>{
        clearActiveClass();
        el.classList.add('active');
    })
})

save.addEventListener('click',async ()=>{
    let values = getCurrentValues();
    let res = await postData('http://5.44.252.253:3000/word/save',values)
        .then(()=> window.location = 'http://5.44.252.253:3000/word/all');
});

function clearActiveClass() {
    document.querySelector('.active').classList.remove('active');
}

function setCurrentImage(){
    document.querySelectorAll('.choose-image').forEach(el=> {
        if(el.style.backgroundImage == `url("${window.data.image}")`) el.classList.add('active');
    });
}
function setCurrentSelect() {
    let select = document.querySelector("select");
    for (let index = 0; index < select.options.length; index++) {
        (select.options[index].text == window.data.meaning) && (select.selectedIndex = index);
    }
}
function setCurrentRadio() {
    document.querySelector(`input[data-from="${window.data.example.from}"`).checked = true;
}

function getCurrentValues() {
    let image = document.querySelector('.active').style.backgroundImage;
    image = image.slice(5,image.length-2);

    const exampleElement = document.querySelector('input[name="example"]:checked');
    const example = {};
    example.from = exampleElement.dataset.from;
    example.to = exampleElement.dataset.to;

    const select = document.querySelector("select");
    const meaning = select.options[select.selectedIndex].text;

    const id = window._id;

    return {image, meaning, example,id}
}

setCurrentImage();
setCurrentRadio();
setCurrentSelect();

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return response.json();
}