const ramenWrapperElement = document.getElementById('ramen-wrapper');

function callRamenFindByFilter() {
    // URLのクエリパラメータを取得
    const params = window.location.search;

    // HTTPリクエストの作成
    const request = new XMLHttpRequest();
     request.open('GET', `http://localhost:8080/ramen/findByFilter${params}`, true);
//    request.open('GET', `http://localhost:8080/ramen/findAll${params}`, true);
    request.responseType = 'json';

    // レスポンスを受け取った時の処理
    request.onload = function () {
        const data = this.response;
        console.log(data.content.length);
        for (let i = 0; i < data.content.length; i++) {
            const p = createRamenElement(data.content[i]);
            ramenWrapperElement.appendChild(p);
        }
    };

    // リクエストの送信
    request.send();
}

function createRamenElement(ramen) {
    const container = document.createElement('div');
    container.classList.add('ramen-container');
    container.innerHTML = `
        <p class="ramen-name">${ramen.name}</p>
        <p>店名: ${ramen.shopName}</p>
        <p>評価: ${"★".repeat(ramen.evaluation)}</p>
    `;
    return container;
}

callRamenFindByFilter();