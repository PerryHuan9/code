const xmr = new XMLHttpRequest();

xmr.open('GET', '/get/user', true);

xmr.onreadystatechange = function () {
    if (xmr.readyState === 4 && xmr.status === 200) {
        console.log(xmr.response);

    }
}

xmr.send();