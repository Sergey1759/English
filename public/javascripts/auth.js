const btn_submit = document.querySelector('button[type="submit"]');

btn_submit.addEventListener('click', async (event)=>{
    event.preventDefault();
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;
    await postData('http://127.0.0.1:3000/auth/login', { username,password})
        .then((data) => {
            if(data.err) {
                alert('Wrong data');
            } else {
                document.cookie = `token=${data.token}`
            }
        }).then(() => window.location.href = `http://127.0.0.1:3000/word/all`);
})

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return response.json();
}

