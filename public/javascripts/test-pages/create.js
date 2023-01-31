const btnCreateTest = document.querySelector('#create-test');

btnCreateTest.addEventListener('click', async (event)=>{
    event.preventDefault();
    const words = getArrayWordsId();
    const title = getTitle();
    const description = getDescription();

    if (words.length <= 2) return showError('error words');
    if (title.length === 0) return showError('error title');
    if (description.length === 0) return showError('error description');

    await postData('http://5.44.252.253:3000/test/createTest',
        {words,title,description})
        .then(res => window.location = 'http://5.44.252.253:3000/test/all');
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
function getDescription() {
    return document.querySelector('#message').value;
}

function showError(msg) {
    alert(msg);
}