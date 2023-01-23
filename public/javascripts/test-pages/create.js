const btnCreateTest = document.querySelector('#create-test');

btnCreateTest.addEventListener('click', async (event)=>{
    event.preventDefault();
    const words = getArrayWordsId();
    const title = getTitle();
    const imageUrl = getImageUrl();
    const description = getDescription();

    if (words.length === 0) return showError('error words');
    if (title.length === 0) return showError('error title');
    if (imageUrl.length === 0) return showError('error imageUrl');
    if (description.length === 0) return showError('error description');

    await postData('http://localhost:3000/test/createTest',
        {words,title,imageUrl,description})
        .then(res => console.log(res));
})

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return response.json();
}

function getArrayWordsId() {
    let words = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
    return words.map(el=>el.id)
}

function getTitle() {
    return document.querySelector('#title').value;
}
function getImageUrl() {
    return document.querySelector('#image_url').value;
}
function getDescription() {
    return document.querySelector('#message').value;
}

function showError(msg) {
    alert(msg);
}