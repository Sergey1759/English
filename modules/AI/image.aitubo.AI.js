let data = {
    "prompt": "A cat sleeps on the plane",
    "modelId": "64c8a7f5195275f7d27c2f96"
}

async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer api-d8afaea380d811ee98b02a2542f44598',
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

postData("https://creator.aitubo.ai/api/job/create", { data }).then((data) => {
    console.log(data);
});
