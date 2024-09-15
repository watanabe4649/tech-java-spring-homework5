const ramenNameElement = document.getElementById('ramenName');
const shopNameElement = document.getElementById('shopName');
const ramenPostButtonElement = document.getElementById('ramenPostButton');

function postRamen() {
    // HTTPリクエストの作成

    ramen = {
        name: ramenNameElement.value,
        shopName: shopNameElement.value
    }

    const request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:8080/ramen/insert', true);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.responseType = 'json';

    // レスポンスを受け取った時の処理
    request.onload = function () {
    };

    // リクエストの送信
    request.send(JSON.stringify(ramen));
}

ramenPostButtonElement.addEventListener('click', postRamen);
