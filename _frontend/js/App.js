const ramenWrapperElement = document.getElementById('ramen-wrapper');

//function callRamenFindAll() {
function callRamenFindAll() {
    // URLのクエリパラメータを取得
    const minMaxEval = window.location.search;
    // HTTPリクエストの作成
    const request = new XMLHttpRequest();
//    request.open('GET', 'http://localhost:8080/ramen/findAll', true);
    request.open('GET', `http://localhost:8080/ramen/findByFilter${minMaxEval}`, true);
    request.responseType = 'json';

    // レスポンスを受け取った時の処理
    request.onload = function () {
        const data = this.response;

        for (let i = 0; i < data.length; i++) {
            const p = createRamenElement(data[i]);
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
        <p class="ramenName">${ramen.name}</p>
        <p>店名: ${ramen.shopName}</p>
        <p>評価: ${"★".repeat(ramen.evaluation)}</p>
    `;
    return container;
}

// 回答例
// function createRamenElement(ramen){
//     const container = document.createElement('div');
//     container.classList.add('ramen-container');
//     const ramenNameElement = document.createElement('p');
//     const shopNameElement = document.createElement('p');
//     const evalElement = document.createElement('p');
//     ramenNameElement.textContent = `${ramen.name}`;
//     shopNameElement.textContent = `店名: ${ramen.shopName}`;
//     evalElement.textContent = `評価: ${ramen.eval}`;
//     container.appendChild(ramenNameElement);
//     container.appendChild(shopNameElement);
//     container.appendChild(evalElement);
//     return container;
// }

callRamenFindAll();