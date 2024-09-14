const ramenContainerElement = document.getElementById('ramen-container');

function callRamenFindAll() {
    // HTTPリクエストの作成
    const request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:8080/ramen/findAll', true);
    request.responseType = 'json';

    // レスポンスを受け取った時の処理
    request.onload = function () {
        const data = this.response;

        for (let i = 0; i < data.length; i++) {
            const p = document.createElement('p');
            p.textContent = data[i].name + " " + data[i].shop;
            ramenContainerElement.appendChild(p);
        }
    };

    // リクエストの送信
    request.send();
}

callRamenFindAll();